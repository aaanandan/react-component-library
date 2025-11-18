# Quick Start Guide - Android Component Library

Get up and running with your Android component library in minutes!

## 📋 Prerequisites

- **Android Studio** Hedgehog (2023.1.1) or newer
- **JDK 17+**
- **Android SDK 34+**
- **Kotlin 1.9.20+**
- **Node.js 18+** (for design token generation)
- **Git** for version control

## 🚀 Installation

### Option 1: Add as Gradle Dependency

Add to your app's `build.gradle.kts`:

```kotlin
dependencies {
    implementation("com.aaanandan:component-library:0.1.0")
    implementation("com.aaanandan:design-tokens:0.1.0")
}
```

### Option 2: Local Development

Clone and include the library:

```bash
git clone https://github.com/aaanandan/react-component-library.git
cd react-component-library
git checkout claude/android-component-library-015GJiaanTTBpTuJtLDm417R
```

In your app's `settings.gradle.kts`:

```kotlin
includeBuild("/path/to/react-component-library")
```

## 🎯 First Component

### 1. Import the Library

```kotlin
import androidx.compose.runtime.Composable
import com.aaanandan.componentlibrary.components.*
import com.aaanandan.designtokens.generated.*
```

### 2. Use a Component

```kotlin
@Composable
fun MyScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(SpacingTokens.spacing4)
    ) {
        Text(
            text = "Hello, Android!",
            fontSize = TypographyTokens.fontSize2xl,
            color = ColorTokens.colorPrimary600
        )

        Spacer(modifier = Modifier.height(SpacingTokens.spacing4))

        DSButton(
            text = "Click Me",
            style = DSButtonStyle.Primary,
            size = DSButtonSize.Medium,
            onClick = {
                // Handle click
            }
        )
    }
}
```

### 3. Run Your App

Press the Run button or use:
```bash
./gradlew installDebug
```

## 🎨 Using Design Tokens

### Colors

```kotlin
import com.aaanandan.designtokens.generated.ColorTokens

@Composable
fun StyledComponent() {
    Box(
        modifier = Modifier
            .background(ColorTokens.colorPrimary600)
            .padding(SpacingTokens.spacing4)
    ) {
        Text(
            text = "Styled Text",
            color = Color.White
        )
    }
}
```

### Spacing

```kotlin
import com.aaanandan.designtokens.generated.SpacingTokens

Column(
    modifier = Modifier.padding(SpacingTokens.spacing6),
    verticalArrangement = Arrangement.spacedBy(SpacingTokens.spacing4)
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

## 🔍 Exploring Components

### View in Compose Previews

1. Open Android Studio
2. Navigate to `component-library/src/.../DSButton.kt`
3. Look for `@Preview` annotations
4. See the component previews in the split view

### Available Components

#### DSButton

```kotlin
// Primary button
DSButton(
    text = "Submit",
    style = DSButtonStyle.Primary,
    onClick = { /* Handle */ }
)

// Secondary button
DSButton(
    text = "Cancel",
    style = DSButtonStyle.Secondary,
    onClick = { /* Handle */ }
)

// Outline button
DSButton(
    text = "Learn More",
    style = DSButtonStyle.Outline(),
    onClick = { /* Handle */ }
)

// Different sizes
DSButton(text = "Small", size = DSButtonSize.Small, onClick = {})
DSButton(text = "Medium", size = DSButtonSize.Medium, onClick = {})
DSButton(text = "Large", size = DSButtonSize.Large, onClick = {})

// States
DSButton(text = "Disabled", enabled = false, onClick = {})
DSButton(text = "Loading", loading = true, onClick = {})
```

## 🛠️ Development Setup (For Library Contributors)

### 1. Clone the Repository

```bash
git clone https://github.com/aaanandan/react-component-library.git
cd react-component-library
git checkout claude/android-component-library-015GJiaanTTBpTuJtLDm417R
```

### 2. Install Node.js Dependencies

```bash
npm install
```

### 3. Generate Design Tokens

```bash
npm run build:tokens
```

### 4. Open in Android Studio

Open the project folder in Android Studio.

### 5. Build and Test

```bash
# Build all modules
./gradlew build

# Run unit tests
./gradlew test

# Run instrumented tests (requires device/emulator)
./gradlew connectedAndroidTest
```

## 📦 Available Commands

### Design Tokens

```bash
# Generate tokens from JSON
npm run build:tokens
```

### Gradle Commands

```bash
# Build all modules
./gradlew build

# Build release AAR
./gradlew assembleRelease

# Run tests
./gradlew test

# Run instrumented tests
./gradlew connectedAndroidTest

# Clean build
./gradlew clean

# Publish to local Maven
./gradlew publishToMavenLocal
```

## 🎨 Material Design 3 & Dark Mode

The library uses Material Design 3 with automatic dark mode support.

### Using with MaterialTheme

```kotlin
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface

@Composable
fun MyApp() {
    MaterialTheme {
        Surface {
            // Your content here
            MyScreen()
        }
    }
}
```

### Custom Theme Colors

```kotlin
val lightColors = lightColorScheme(
    primary = ColorTokens.colorPrimary600,
    onPrimary = Color.White,
    // ... more colors
)

val darkColors = darkColorScheme(
    primary = ColorTokens.colorPrimary400,
    onPrimary = Color.Black,
    // ... more colors
)

@Composable
fun ThemedApp() {
    val colors = if (isSystemInDarkTheme()) darkColors else lightColors

    MaterialTheme(colorScheme = colors) {
        // Your app
    }
}
```

## 📱 Sample App

The repository includes a sample app in `sample-app/`:

```bash
# Run the sample app
./gradlew :sample-app:installDebug
```

## 🐛 Troubleshooting

### Gradle Sync Issues

```bash
# Clean and rebuild
./gradlew clean build

# Or in Android Studio: File → Invalidate Caches / Restart
```

### Token Generation Issues

```bash
# Reinstall Node dependencies
rm -rf node_modules package-lock.json
npm install
npm run build:tokens
```

### Preview Issues

1. Build → Clean Project
2. Build → Rebuild Project
3. Restart Android Studio if needed

### Dependency Resolution Issues

Make sure you have the correct repositories in `settings.gradle.kts`:

```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}
```

## 📖 Next Steps

### For Library Users

1. ✅ Read [README.md](./README.md) for complete usage guide
2. ✅ Explore all available components
3. ✅ Customize with design tokens

### For Library Contributors

1. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand structure
2. ✅ Read [DESIGN_TOKENS_GUIDE.md](./DESIGN_TOKENS_GUIDE.md) for token workflow
3. ✅ Follow DSButton pattern for new components

## 🔗 Useful Links

- [Complete Documentation](./DOCS_INDEX.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md)
- [Jetpack Compose Docs](https://developer.android.com/jetpack/compose)

## 💡 Pro Tips

1. **Use Compose Previews** - Fastest way to iterate
2. **Import Both Modules** - Most apps need both libraries
3. **Follow Material Design** - Use Material 3 components
4. **Test on Real Devices** - Always test on actual hardware

---

**You're all set! Start building amazing Android apps! 🚀**

*Need help? Check [DOCS_INDEX.md](./DOCS_INDEX.md) for all documentation.*
