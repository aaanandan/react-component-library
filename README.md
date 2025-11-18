# Android Component Library

A modern, Jetpack Compose-based Android component library with design tokens and a robust design system.

## 🚀 Features

- 📱 **Jetpack Compose** with Android 7.0+ (API 24+) support
- 🎨 **Design Tokens** from Figma using Style Dictionary
- 📦 **Gradle** for easy integration and Maven publishing
- 🔍 **Compose Previews** for component development and documentation
- ✅ **JUnit & Compose Testing** for unit and UI testing
- 🎯 **Kotlin** with full type safety and null safety
- 🔄 **Material Design 3** with dynamic theming support
- 📘 **Full Kotlin documentation** with KDoc
- 🌳 **Modular Architecture** - import only what you need
- ✨ **Native Android** - built with modern Android practices

## 📦 Installation

### Gradle (Module-level)

Add to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation("com.aaanandan:component-library:0.1.0")
    implementation("com.aaanandan:design-tokens:0.1.0")
}
```

### Maven

```xml
<dependency>
    <groupId>com.aaanandan</groupId>
    <artifactId>component-library</artifactId>
    <version>0.1.0</version>
</dependency>
```

### Local Development

```kotlin
// In settings.gradle.kts
includeBuild("/path/to/component-library")

// In build.gradle.kts
dependencies {
    implementation("com.aaanandan:component-library")
    implementation("com.aaanandan:design-tokens")
}
```

## 🎯 Usage

### Basic Usage

```kotlin
import androidx.compose.runtime.Composable
import com.aaanandan.componentlibrary.components.DSButton
import com.aaanandan.componentlibrary.components.DSButtonStyle
import com.aaanandan.componentlibrary.components.DSButtonSize

@Composable
fun MyScreen() {
    DSButton(
        text = "Click me!",
        style = DSButtonStyle.Primary,
        size = DSButtonSize.Medium,
        onClick = {
            // Handle click
        }
    )
}
```

### Using Design Tokens

```kotlin
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import com.aaanandan.designtokens.*

@Composable
fun CustomComponent() {
    Column(
        modifier = Modifier
            .background(ColorTokens.Neutral50)
            .padding(SpacingTokens.spacing4)
    ) {
        Text(
            text = "Custom Component",
            color = ColorTokens.Primary600,
            fontSize = TypographyTokens.fontSizeBase
        )
    }
}
```

### Available Components

- **DSButton**: Primary, secondary, outline, and ghost button variants
- **DSTextField**: Text input with Material Design styling
- **DSCard**: Container with elevation and borders
- **DSBadge**: Small status indicators
- **DSAvatar**: User profile images with fallback
- More components coming soon!

## 🛠️ Development

### Prerequisites

- Android Studio Hedgehog (2023.1.1) or newer
- JDK 17+
- Android SDK 34+
- Kotlin 1.9.20+
- Node.js 18+ (for design token generation)

### Setup

1. Clone the repository
2. Install Node.js dependencies for token generation:

```bash
npm install
```

3. Build design tokens:

```bash
npm run build:tokens
```

4. Open in Android Studio:

```bash
# Open the project folder in Android Studio
```

5. Sync Gradle:

```bash
./gradlew build
```

### Available Scripts

- `npm run build:tokens` - Generate tokens from design token JSON files
- `./gradlew build` - Build all modules
- `./gradlew test` - Run unit tests
- `./gradlew connectedAndroidTest` - Run instrumented tests
- `./gradlew clean` - Clean build artifacts

## 📚 Design Tokens

Design tokens are the single source of truth for design decisions. They are defined in `design-tokens/tokens/*.json` and transformed into Kotlin code using Style Dictionary.

### Token Categories

- **Colors**: Brand colors, semantic colors, neutrals (with dark mode support)
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (4dp base unit)
- **Border Radius**: Corner radius values
- **Shadows**: Elevation levels

### Syncing from Figma

To sync design tokens from Figma:

1. Export your Figma variables using [Tokens Studio](https://tokens.studio/) plugin
2. Place the JSON files in `design-tokens/tokens/`
3. Run `npm run build:tokens`

The tokens will be automatically transformed into:
- Kotlin constants (`design-tokens/src/main/java/com/aaanandan/designtokens/ColorTokens.kt`)
- Compose Color objects
- Type-safe Kotlin code

## 🔍 Component Documentation

View the component documentation using Compose Previews:

1. Open the project in Android Studio
2. Navigate to any component file (e.g., `DSButton.kt`)
3. Click on the Preview pane (split view)
4. See interactive previews of different variants and states

## 🏗️ Project Structure

```
android-component-library/
├── design-tokens/              # Source design tokens (from Figma)
│   └── tokens/
│       ├── colors.json
│       ├── typography.json
│       └── spacing.json
├── design-tokens/              # Design tokens module
│   └── src/main/java/
│       └── com/aaanandan/designtokens/
│           ├── Generated/      # Auto-generated (DO NOT EDIT)
│           │   ├── ColorTokens.kt
│           │   ├── SpacingTokens.kt
│           │   └── TypographyTokens.kt
│           └── DesignTokens.kt
├── component-library/          # Component library module
│   └── src/
│       ├── main/java/
│       │   └── com/aaanandan/componentlibrary/
│       │       ├── components/
│       │       │   ├── DSButton.kt
│       │       │   └── ...
│       │       └── ComponentLibrary.kt
│       └── androidTest/        # Instrumented tests
├── sample-app/                 # Sample Android app (dev playground)
│   └── src/main/
├── build.gradle.kts            # Root build file
├── settings.gradle.kts         # Gradle settings
├── style-dictionary.config.js  # Token transformation config
└── package.json                # Node.js config for tokens
```

## 🧪 Testing

Run tests using Gradle or Android Studio:

```bash
# Unit tests
./gradlew test

# Instrumented tests (requires emulator/device)
./gradlew connectedAndroidTest
```

Or in Android Studio: `Run → Run 'All Tests'`

## 📦 Building

Build the library:

```bash
./gradlew build
```

Generate AAR files:

```bash
./gradlew assembleRelease
```

The AAR files will be in:
- `component-library/build/outputs/aar/`
- `design-tokens/build/outputs/aar/`

## 🚀 Publishing

### Local Maven Repository

```bash
./gradlew publishToMavenLocal
```

### Remote Maven Repository

Configure your Maven credentials in `~/.gradle/gradle.properties`:

```properties
mavenUsername=your-username
mavenPassword=your-password
```

Then publish:

```bash
./gradlew publish
```

## 🎨 Consuming the Library

### In an Android App

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.aaanandan.componentlibrary.components.*
import com.aaanandan.designtokens.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApp()
        }
    }
}

@Composable
fun MyApp() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(SpacingTokens.spacing4)
    ) {
        DSButton(
            text = "Primary Action",
            style = DSButtonStyle.Primary,
            onClick = { /* Handle click */ }
        )

        Spacer(modifier = Modifier.height(SpacingTokens.spacing4))

        DSButton(
            text = "Secondary Action",
            style = DSButtonStyle.Outline,
            onClick = { /* Handle click */ }
        )
    }
}
```

### Supporting Dark Mode

All design tokens automatically support dark mode through Material Design 3:

```kotlin
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme

@Composable
fun MyApp() {
    val colorScheme = if (isSystemInDarkTheme()) {
        darkColorScheme()
    } else {
        lightColorScheme()
    }

    MaterialTheme(colorScheme = colorScheme) {
        // Your app content
    }
}
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Update documentation and previews
5. Submit a pull request

## 📄 License

MIT

## 🔗 Links

- [Documentation](./Documentation/)
- [GitHub](https://github.com/aaanandan/react-component-library)
- [Sample App](./sample-app/)

## 🎓 Learning Resources

- [START_HERE.md](./START_HERE.md) - Quick start guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture overview
- [DESIGN_TOKENS_GUIDE.md](./DESIGN_TOKENS_GUIDE.md) - Design token workflow
- [DOCS_INDEX.md](./DOCS_INDEX.md) - Complete documentation index
