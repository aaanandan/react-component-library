# Architecture Overview - Android Component Library

## 🏗️ Project Structure

```
android-component-library/
│
├── 📁 design-tokens/tokens/      # Source of truth for design
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   └── border-radius.json
│
├── 📁 design-tokens/             # Design tokens Gradle module
│   ├── build.gradle.kts
│   └── src/main/java/
│       └── com/aaanandan/designtokens/
│           ├── generated/        # Auto-generated (DO NOT EDIT)
│           │   ├── ColorTokens.kt
│           │   ├── SpacingTokens.kt
│           │   ├── TypographyTokens.kt
│           │   └── BorderRadiusTokens.kt
│           └── DesignTokens.kt
│
├── 📁 component-library/         # Component library Gradle module
│   ├── build.gradle.kts
│   └── src/
│       ├── main/java/
│       │   └── com/aaanandan/componentlibrary/
│       │       └── components/
│       │           └── DSButton.kt
│       └── androidTest/          # Instrumented tests
│           └── DSButtonTest.kt
│
├── 📁 sample-app/                # Sample Android app
│   ├── build.gradle.kts
│   └── src/main/
│
├── 📄 build.gradle.kts           # Root build file
├── 📄 settings.gradle.kts        # Module configuration
├── 📄 style-dictionary.config.js # Token transformation
└── 📄 package.json               # Node.js config
```

## 🔄 Data Flow

### Design Token Flow

```
┌─────────────┐
│   Figma     │  Design team creates tokens
│   Design    │  (colors, spacing, typography)
└──────┬──────┘
       │
       │ Export via Tokens Studio Plugin
       ▼
┌──────────────┐
│ JSON Files   │  design-tokens/tokens/*.json
│ (Source)     │  - colors.json
└──────┬───────┘  - typography.json
       │          - spacing.json
       │
       │ Transform via Style Dictionary
       ▼
┌──────────────┐
│ Kotlin Code  │  design-tokens/src/.../generated/
│ (Generated)  │  - ColorTokens.kt
└──────┬───────┘  - SpacingTokens.kt
       │          - TypographyTokens.kt
       │
       ├─────────────────┬──────────────────┐
       │                 │                  │
       ▼                 ▼                  ▼
  ┌──────────┐      ┌──────────┐      ┌──────────┐
  │ Compose  │      │  Other   │      │  Apps    │
  │Components│      │ Modules  │      │          │
  └──────────┘      └──────────┘      └──────────┘
```

### Component Development Flow

```
┌─────────────┐
│  Developer  │  Creates component
│  Writes     │  (DSButton.kt)
│  Component  │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
       ▼              ▼              ▼              ▼
  ┌─────────┐   ┌─────────┐   ┌──────────┐   ┌─────────┐
  │  Styles │   │  Tests  │   │ Previews │   │  Types  │
  │  Kotlin │   │  JUnit  │   │ Compose  │   │  Kotlin │
  └────┬────┘   └────┬────┘   └────┬─────┘   └────┬────┘
       │             │             │              │
       └─────────────┴─────────────┴──────────────┘
                     │
                     ▼
              ┌──────────────┐
              │ Gradle Build │  Compiles everything
              │  + Tests     │  Runs tests
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │    .aar      │  Ready to publish
              │   Library    │  (Android Archive)
              └──────────────┘
```

### Consumer Integration Flow

```
┌─────────────────┐
│  Consumer App   │  Android app
│  (Compose)      │
└────────┬────────┘
         │
         │ Add Gradle Dependency
         ▼
   ┌──────────────┐
   │    Gradle    │  Dependency resolution
   │   Resolver   │
   └──────┬───────┘
         │
         ├─────────────────┬──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │ Import   │      │ Import   │      │   Use    │
   │Component │      │  Design  │      │Components│
   │ Library  │      │  Tokens  │      │          │
   └──────────┘      └──────────┘      └──────────┘
         │                 │                  │
         └─────────────────┴──────────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │    Gradle     │  Compiles into app
                  │    Build      │
                  └───────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │  Android APK  │  Final app package
                  │  or Bundle    │
                  └───────────────┘
```

## 🔌 Integration Points

### 1. Design Token Generation

**Input:** JSON files from Figma
**Process:** Style Dictionary transformation
**Output:** Kotlin constants and Compose types

```javascript
// style-dictionary.config.js
module.exports = {
  source: ['design-tokens/tokens/**/*.json'],
  platforms: {
    android: {
      transformGroup: 'android',
      buildPath: 'design-tokens/src/main/java/.../generated/',
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

### 2. Module Compilation

**Input:** Kotlin source files
**Process:** Gradle build with Kotlin compiler
**Output:** AAR library files

```kotlin
// build.gradle.kts
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}
```

### 3. Type Safety

**Input:** Kotlin source with strong types
**Process:** Kotlin type checker
**Output:** Compile-time type safety

### 4. Testing

**Input:** Test files (JUnit + Compose Testing)
**Process:** Gradle test tasks
**Output:** Test results and coverage

### 5. Documentation

**Input:** KDoc comments in Kotlin files
**Process:** Compose Previews
**Output:** Interactive documentation

## 📦 Module Architecture

```
┌────────────────────────────────────┐
│      Consumer App                  │
│                                    │
│  implementation("...:component-    │
│                 library")          │
│  implementation("...:design-tokens")│
└────────────┬───────────────────────┘
             │
             │ depends on
             ▼
┌────────────────────────────────────┐
│   Component Library Module         │
│                                    │
│   - DSButton                       │
│   - DSTextField                    │
│   - DSCard                         │
│   - ...                            │
└────────────┬───────────────────────┘
             │
             │ depends on
             ▼
┌────────────────────────────────────┐
│   Design Tokens Module             │
│                                    │
│   - ColorTokens                    │
│   - SpacingTokens                  │
│   - TypographyTokens               │
│   - ...                            │
└────────────────────────────────────┘
```

## 🎯 Key Design Decisions

### Why Jetpack Compose?

1. **Modern & Declarative:** Clean, readable component code
2. **Native Android:** First-class Android support
3. **Preview Support:** Instant visual feedback
4. **Type Safety:** Kotlin's strong type system

### Why Gradle Multi-Module?

1. **Modularity:** Separate concerns cleanly
2. **Build Optimization:** Incremental builds
3. **Dependency Management:** Clear module dependencies
4. **Publishing:** Independent module versioning

### Why Style Dictionary?

1. **Multi-Platform:** Generates for iOS, Android, Web
2. **Transformation Pipeline:** Powerful customization
3. **Industry Standard:** Proven in production
4. **Extensible:** Custom formatters

### Why Material Design 3?

1. **Modern:** Latest Android design system
2. **Theming:** Dynamic color support
3. **Accessibility:** Built-in a11y features
4. **Components:** Rich component set

## 🔐 Best Practices Implemented

✅ **Single Source of Truth:** Figma → JSON → Generated Kotlin
✅ **Type Safety:** Full Kotlin type checking
✅ **Testing:** JUnit + Compose UI testing
✅ **Documentation:** KDoc + Compose Previews
✅ **Modularity:** Clean module separation
✅ **Material Design:** MD3 compliance
✅ **Performance:** Optimized Compose
✅ **Dark Mode:** Automatic theme adaptation

## 🚀 Build & Distribution

### Local Development

```bash
# Build all modules
./gradlew build

# Run tests
./gradlew test

# Generate tokens
npm run build:tokens
```

### Distribution Options

1. **Maven Central** (Recommended)
   - Publish to Maven Central
   - Available globally
   - Version management

2. **JitPack**
   - GitHub-based publishing
   - Automatic builds
   - Easy setup

3. **Local Maven**
   - Local testing
   - Private distribution

## 📊 Token Transformation Example

### Input (Figma → JSON)

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

### Output (Kotlin)

```kotlin
package com.aaanandan.designtokens.generated

import androidx.compose.ui.graphics.Color

object ColorTokens {
    val colorPrimary600 = Color(0xFF2563EB)
}
```

### Usage (Compose)

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.material3.Text
import com.aaanandan.designtokens.generated.ColorTokens

@Composable
fun MyComponent() {
    Text(
        text = "Hello",
        color = ColorTokens.colorPrimary600
    )
}
```

## 🎓 Further Reading

- **Jetpack Compose:** [Android Developers](https://developer.android.com/jetpack/compose)
- **Gradle:** [Documentation](https://docs.gradle.org/)
- **Style Dictionary:** [Documentation](https://amzn.github.io/style-dictionary/)
- **Material Design 3:** [Material 3](https://m3.material.io/)
