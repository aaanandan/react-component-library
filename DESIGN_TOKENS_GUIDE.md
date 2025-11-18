# Design Tokens: Figma to Android Workflow

This guide explains how to sync design tokens from Figma to your Android component library using Style Dictionary.

## Overview

```
Figma (Design) → Tokens Studio Plugin → JSON Files → Style Dictionary → Kotlin Code → Jetpack Compose
```

## 🎨 Step 1: Setup Figma

### Install Tokens Studio Plugin

1. Open your Figma file
2. Go to `Plugins → Browse Plugins`
3. Search for "Tokens Studio for Figma"
4. Install the plugin

### Create Design Tokens in Figma

Create token sets for:
- **Colors** - Primary, neutral, semantic
- **Typography** - Font sizes
- **Spacing** - 4dp base grid
- **Border Radius** - Corner radius values

## 📤 Step 2: Export Tokens from Figma

### Manual Export

1. In Tokens Studio, click export
2. Save JSON files
3. Place in `design-tokens/tokens/`
4. Commit to Git

### GitHub Sync (Recommended)

1. Tokens Studio → Settings → Sync
2. Choose "GitHub"
3. Configure:
   - **Repository:** `aaanandan/react-component-library`
   - **Branch:** `claude/android-component-library-015GJiaanTTBpTuJtLDm417R`
   - **Path:** `design-tokens/tokens/`
4. Push to GitHub

## 🔄 Step 3: Transform Tokens

```bash
npm run build:tokens
```

This generates Kotlin code in:
`design-tokens/src/main/java/com/aaanandan/designtokens/generated/`

### Generated Files

- `ColorTokens.kt` - Compose Color objects
- `SpacingTokens.kt` - Dp values
- `TypographyTokens.kt` - TextUnit values
- `BorderRadiusTokens.kt` - Dp values

## 🎯 Step 4: Use Tokens in Compose

### Colors

```kotlin
import com.aaanandan.designtokens.generated.ColorTokens

@Composable
fun MyComponent() {
    Box(
        modifier = Modifier.background(ColorTokens.colorPrimary600)
    ) {
        Text(
            text = "Hello",
            color = Color.White
        )
    }
}
```

### Spacing

```kotlin
import com.aaanandan.designtokens.generated.SpacingTokens

Column(
    modifier = Modifier.padding(SpacingTokens.spacing4),
    verticalArrangement = Arrangement.spacedBy(SpacingTokens.spacing2)
) {
    Text("Item 1")
    Text("Item 2")
}
```

### Typography

```kotlin
import com.aaanandan.designtokens.generated.TypographyTokens

Text(
    text = "Title",
    fontSize = TypographyTokens.fontSize2xl
)
```

## 🔧 Customizing Token Transformation

Edit `style-dictionary.config.js`:

```javascript
module.exports = {
  source: ['design-tokens/tokens/**/*.json'],
  platforms: {
    android: {
      transformGroup: 'android',
      buildPath: 'design-tokens/src/.../generated/',
      files: [
        {
          destination: 'ColorTokens.kt',
          format: 'compose/colors'
        }
      ]
    }
  }
};
```

## 🔄 Automated CI/CD

Create `.github/workflows/sync-tokens.yml`:

```yaml
name: Sync Design Tokens

on:
  push:
    paths:
      - 'design-tokens/tokens/**'

jobs:
  build-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build:tokens
      - run: |
          git add design-tokens/src
          git commit -m "chore: update tokens"
          git push
```

## 📋 Token Naming Conventions

### Colors
```
color.primary.600 → ColorTokens.colorPrimary600
```

### Spacing
```
spacing.4 → SpacingTokens.spacing4 (16.dp)
```

### Typography
```
font.size.base → TypographyTokens.fontSizeBase (16.sp)
```

## 🎓 Best Practices

1. **Single Source:** Figma is the source of truth
2. **Semantic Names:** Use component-specific names
3. **Version Control:** Commit generated files
4. **Documentation:** Document token usage
5. **Testing:** Test with different themes

## 🔍 Troubleshooting

### Tokens Not Updating

```bash
rm -rf design-tokens/src/.../generated/*.kt
npm run build:tokens
./gradlew clean build
```

### Build Errors

```bash
./gradlew clean
./gradlew build
```

---

**Happy Token Syncing! 🎨**
