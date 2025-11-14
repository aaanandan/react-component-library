# Design Tokens: Figma to React Workflow

This guide explains how to sync design tokens from Figma to your React component library.

## Overview

The workflow follows these steps:

```
Figma (Design) → Tokens Studio Plugin → JSON Files → Style Dictionary → Multiple Formats → React Components
```

## 🎨 Step 1: Setup Figma

### Install Tokens Studio Plugin

1. Open your Figma file
2. Go to Plugins → Browse Plugins
3. Search for "Tokens Studio for Figma" (by Jan Six)
4. Install the plugin

### Create Design Tokens in Figma

1. Open Tokens Studio plugin in your Figma file
2. Create token sets for:
   - Colors
   - Typography (fonts, sizes, weights, line heights)
   - Spacing
   - Border radius
   - Shadows
   - Any other design decisions

### Example Token Structure in Tokens Studio

```json
{
  "color": {
    "primary": {
      "500": {
        "value": "#0ea5e9",
        "type": "color"
      }
    }
  },
  "spacing": {
    "4": {
      "value": "1rem",
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
4. Place them in `design-tokens/tokens/` directory

### Option B: GitHub Sync (Recommended for Teams)

1. In Tokens Studio, go to Settings → Sync
2. Choose "GitHub" as your sync provider
3. Connect your GitHub account
4. Configure:
   - Repository: `gsk/react-component-library`
   - Branch: `main`
   - File path: `design-tokens/tokens/`
5. Click "Push to GitHub"

Now whenever designers update tokens in Figma, they can push directly to GitHub!

### Option C: Using Figma API (Advanced)

For automated sync, you can use the Figma API:

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
```

## 🔄 Step 3: Transform Tokens with Style Dictionary

The project is already configured with Style Dictionary. When you run:

```bash
npm run build:tokens
```

Style Dictionary will:

1. Read all JSON files from `design-tokens/tokens/`
2. Transform them into multiple formats:
   - **CSS Custom Properties** (`lib/tokens/tokens.css`)
   - **JavaScript/TypeScript** (`lib/tokens/tokens.ts`)
   - **JSON** (`lib/tokens/tokens.json`)
   - **TypeScript Types** (`lib/tokens/types.d.ts`)

### Generated CSS Output

```css
:root {
  --color-primary-500: #0ea5e9;
  --spacing-4: 1rem;
  --font-size-base: 1rem;
  /* ... more tokens */
}
```

### Generated TypeScript Output

```typescript
export const ColorPrimary500 = "#0ea5e9";
export const Spacing4 = "1rem";
export const FontSizeBase = "1rem";
```

## 🎯 Step 4: Use Tokens in Components

### In CSS

```css
.button {
  background-color: var(--color-primary-500);
  padding: var(--spacing-4);
  font-size: var(--font-size-base);
}
```

### In React Components

```tsx
import { tokens } from '@/tokens/tokens';

const Button = () => (
  <button
    style={{
      backgroundColor: tokens.ColorPrimary500,
      padding: tokens.Spacing4,
    }}
  >
    Click me
  </button>
);
```

### Using CSS Modules

```css
/* Button.module.css */
.button {
  background-color: var(--color-primary-500);
  padding: var(--spacing-4);
}
```

```tsx
import styles from './Button.module.css';

const Button = () => <button className={styles.button}>Click me</button>;
```

## 🔧 Customizing Token Transformation

You can customize how tokens are transformed by editing `style-dictionary.config.js`:

### Adding a New Output Format

```javascript
module.exports = {
  source: ['design-tokens/tokens/**/*.json'],
  platforms: {
    // ... existing platforms
    scss: {
      transformGroup: 'scss',
      buildPath: 'lib/tokens/',
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables',
        },
      ],
    },
  },
};
```

### Custom Transform

```javascript
module.exports = {
  // ... config
  transform: {
    'size/px-to-rem': {
      type: 'value',
      matcher: (token) => token.type === 'spacing',
      transformer: (token) => {
        const val = parseFloat(token.value);
        return `${val / 16}rem`;
      },
    },
  },
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
    runs-on: ubuntu-latest
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
          git add lib/tokens/
          git diff --quiet && git diff --staged --quiet || git commit -m "chore: update generated design tokens"
          git push
```

## 📋 Token Naming Conventions

Follow these conventions for consistency:

### Colors
- `color.brand.primary.500`
- `color.semantic.success`
- `color.neutral.100`

### Spacing
- `spacing.0` through `spacing.24`
- Use multiples of 4px base unit

### Typography
- `font.family.sans`
- `font.size.base`
- `font.weight.medium`
- `font.lineHeight.normal`

### Semantic Tokens (Recommended)

Instead of primitives, use semantic names:

```json
{
  "button": {
    "primary": {
      "background": {
        "value": "{color.primary.500}",
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

1. **Single Source of Truth**: Figma should be the source of truth for design decisions
2. **Semantic Naming**: Use semantic names for component-specific tokens
3. **Version Control**: Always commit generated token files
4. **Documentation**: Document token usage in Storybook
5. **Validation**: Add token validation tests
6. **Gradual Migration**: Migrate existing components to tokens incrementally

## 🔍 Troubleshooting

### Tokens not updating after sync

```bash
# Clear generated files and rebuild
rm -rf lib/tokens/tokens.*
npm run build:tokens
```

### TypeScript errors with tokens

Make sure to run `build:tokens` before `build`:

```bash
npm run build:tokens && npm run build
```

### CSS custom properties not working

Ensure the tokens CSS is imported:

```tsx
import '@aaanandan/react-component-library/styles';
```

## 📚 Additional Resources

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)
- [Design Tokens Guide by Nathan Curtis](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421)