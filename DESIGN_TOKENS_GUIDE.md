# Design Tokens: Figma to iOS Workflow

This guide explains how to sync design tokens from Figma to your iOS component library using Style Dictionary.

## Overview

The workflow follows these steps:

```
Figma (Design) → Tokens Studio Plugin → JSON Files → Style Dictionary → Swift Code → SwiftUI Components
```

## 🎨 Step 1: Setup Figma

### Install Tokens Studio Plugin

1. Open your Figma file
2. Go to `Plugins → Browse Plugins`
3. Search for "Tokens Studio for Figma" (by Jan Six)
4. Install the plugin

### Create Design Tokens in Figma

1. Open Tokens Studio plugin in your Figma file
2. Create token sets for:
   - **Colors** - Primary, neutral, semantic colors
   - **Typography** - Font families, sizes, weights, line heights
   - **Spacing** - Consistent spacing scale (8-point grid)
   - **Border Radius** - Corner radius values
   - **Shadows** - Elevation levels

### Example Token Structure in Tokens Studio

```json
{
  "color": {
    "primary": {
      "600": {
        "value": "#2563eb",
        "type": "color"
      }
    }
  },
  "spacing": {
    "4": {
      "value": "16",
      "type": "spacing"
    }
  }
}
```

## 📤 Step 2: Export Tokens from Figma

### Option A: Manual Export (Quick Start)

1. In Tokens Studio, click on the export icon
2. Select "Export to JSON"
3. Save the JSON files
4. Place them in `design-tokens/tokens/` directory of your iOS library
5. Commit to Git

### Option B: GitHub Sync (Recommended for Teams)

1. In Tokens Studio, go to `Settings → Sync`
2. Choose "GitHub" as your sync provider
3. Connect your GitHub account
4. Configure:
   - **Repository:** `aaanandan/react-component-library`
   - **Branch:** `claude/ios-component-library-015GJiaanTTBpTuJtLDm417R`
   - **File path:** `design-tokens/tokens/`
5. Click "Push to GitHub"

Now designers can update tokens in Figma and push directly to GitHub!

### Option C: Using Figma API (Advanced)

For automated sync, you can use the Figma API. Create a script:

```javascript
// figma-sync.js
const fetch = require('node-fetch');
const fs = require('fs');

const FIGMA_FILE_KEY = 'your-figma-file-key';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

async function syncFromFigma() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    }
  );

  const data = await response.json();

  // Transform and save tokens
  fs.writeFileSync(
    'design-tokens/tokens/figma-variables.json',
    JSON.stringify(transformFigmaVariables(data), null, 2)
  );
}

syncFromFigma();
```

## 🔄 Step 3: Transform Tokens with Style Dictionary

The project is configured with Style Dictionary to generate iOS-specific Swift code.

### Generate Tokens

```bash
npm run build:tokens
```

This command:
1. Reads JSON files from `design-tokens/tokens/`
2. Transforms them using `style-dictionary.config.js`
3. Generates Swift code in `Sources/DesignTokens/Generated/`

### Generated Files

```
Sources/DesignTokens/Generated/
├── ColorTokens.swift
├── SpacingTokens.swift
├── TypographyTokens.swift
├── BorderRadiusTokens.swift
└── ShadowTokens.swift
```

### Example Generated Swift Code

**Input JSON:**
```json
{
  "color": {
    "primary": {
      "600": {
        "value": "#2563eb",
        "type": "color"
      }
    }
  }
}
```

**Generated Swift:**
```swift
import SwiftUI

public class ColorTokens {
    public static let colorPrimary600 = Color(hex: "#2563eb")
}
```

## 🎯 Step 4: Use Tokens in SwiftUI Components

### In Component Code

```swift
import SwiftUI
import DesignTokens

struct DSButton: View {
    var body: some View {
        Text("Submit")
            .foregroundColor(.white)
            .padding(.horizontal, SpacingTokens.spacing4)
            .padding(.vertical, SpacingTokens.spacing3)
            .background(ColorTokens.colorPrimary600)
            .cornerRadius(BorderRadiusTokens.borderRadiusMd)
    }
}
```

### Using Color Tokens

```swift
// Solid colors
Text("Hello")
    .foregroundColor(ColorTokens.colorPrimary600)
    .background(ColorTokens.colorNeutral50)

// Colors automatically support dark mode
Rectangle()
    .fill(ColorTokens.colorBackground)
```

### Using Spacing Tokens

```swift
VStack(spacing: SpacingTokens.spacing4) {
    Text("Item 1")
    Text("Item 2")
}
.padding(SpacingTokens.spacing6)
```

### Using Typography Tokens

```swift
Text("Title")
    .font(.system(size: TypographyTokens.fontSize2xl))
    .fontWeight(.bold)
```

### Using Border Radius Tokens

```swift
RoundedRectangle(cornerRadius: BorderRadiusTokens.borderRadiusMd)
    .fill(ColorTokens.colorPrimary600)
```

## 🔧 Customizing Token Transformation

You can customize `style-dictionary.config.js` to control how tokens are transformed.

### Current Configuration

```javascript
module.exports = {
  source: ['design-tokens/tokens/**/*.json'],
  platforms: {
    ios: {
      transformGroup: 'ios',
      buildPath: 'Sources/DesignTokens/Generated/',
      files: [
        {
          destination: 'ColorTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'ColorTokens',
          filter: { type: 'color' }
        },
        {
          destination: 'SpacingTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'SpacingTokens',
          filter: { type: 'spacing' }
        }
        // ... more files
      ]
    }
  }
};
```

### Adding Custom Transforms

```javascript
module.exports = {
  transform: {
    'ios/size/remToPt': {
      type: 'value',
      matcher: (token) => token.type === 'fontSize',
      transformer: (token) => {
        const remValue = parseFloat(token.value);
        return (remValue * 16).toString();
      }
    }
  },
  platforms: {
    ios: {
      transforms: ['ios/size/remToPt'],
      // ... rest of config
    }
  }
};
```

## 🔄 Automated Workflow with CI/CD

### GitHub Actions Example

Create `.github/workflows/sync-tokens.yml`:

```yaml
name: Sync Design Tokens

on:
  push:
    paths:
      - 'design-tokens/tokens/**'
  workflow_dispatch:

jobs:
  build-tokens:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build tokens
        run: npm run build:tokens

      - name: Commit generated tokens
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add Sources/DesignTokens/Generated/
          git diff --quiet && git diff --staged --quiet || \
            git commit -m "chore: update generated design tokens"
          git push
```

## 📋 Token Naming Conventions

Follow these conventions for iOS:

### Colors
- `color.primary.600`
- `color.semantic.success`
- `color.neutral.100`

Generated as: `ColorTokens.colorPrimary600`

### Spacing
- `spacing.0` through `spacing.24`
- Use CGFloat values (points)

Generated as: `SpacingTokens.spacing4`

### Typography
- `font.family.base`
- `font.size.base`
- `font.weight.semibold`

Generated as: `TypographyTokens.fontSizeBase`

### Semantic Tokens (Recommended)

Create semantic tokens that reference primitive tokens:

```json
{
  "button": {
    "primary": {
      "background": {
        "value": "{color.primary.600}",
        "type": "color"
      },
      "text": {
        "value": "{color.neutral.50}",
        "type": "color"
      }
    }
  }
}
```

## 🎓 Best Practices

1. **Single Source of Truth:** Figma is the design source
2. **Semantic Naming:** Use component-specific token names
3. **Version Control:** Always commit generated Swift files
4. **Documentation:** Document token usage in code comments
5. **Testing:** Test components with different token values
6. **Dark Mode:** Define light and dark variants for colors

## 🔍 Troubleshooting

### Tokens Not Updating

```bash
# Clear generated files and rebuild
rm -rf Sources/DesignTokens/Generated/*.swift
npm run build:tokens
```

### Build Errors After Token Update

```bash
# Clean Swift build
swift package clean
swift build
```

In Xcode: `Product → Clean Build Folder` (Cmd+Shift+K)

### Style Dictionary Not Found

```bash
npm install
```

### Colors Not Working in Dark Mode

Ensure your color tokens include both light and dark variants:

```json
{
  "color": {
    "background": {
      "light": { "value": "#ffffff", "type": "color" },
      "dark": { "value": "#000000", "type": "color" }
    }
  }
}
```

## 📚 Additional Resources

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)
- [SwiftUI Color Documentation](https://developer.apple.com/documentation/swiftui/color)

---

**Happy Token Syncing! 🎨**
