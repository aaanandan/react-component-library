# Quick Start Guide - iOS Component Library

Get up and running with your iOS component library in minutes!

## 📋 Prerequisites

- **Xcode 15.0+** installed
- **Swift 5.9+** (comes with Xcode)
- **Node.js 18+** (for design token generation)
- **Git** for version control

## 🚀 Installation

### Option 1: Using Xcode (Recommended)

1. Open your iOS app project in Xcode
2. Go to `File → Add Package Dependencies...`
3. Enter the repository URL:
   ```
   https://github.com/aaanandan/react-component-library.git
   ```
4. Select branch: `claude/ios-component-library-015GJiaanTTBpTuJtLDm417R`
5. Click `Add Package`
6. Select both `ComponentLibrary` and `DesignTokens` products
7. Click `Add Package` again

### Option 2: Using Package.swift

Add this to your `Package.swift`:

```swift
dependencies: [
    .package(
        url: "https://github.com/aaanandan/react-component-library.git",
        branch: "claude/ios-component-library-015GJiaanTTBpTuJtLDm417R"
    )
],
targets: [
    .target(
        name: "YourTarget",
        dependencies: [
            .product(name: "ComponentLibrary", package: "react-component-library"),
            .product(name: "DesignTokens", package: "react-component-library"),
        ]
    )
]
```

## 🎯 First Component

### 1. Import the Library

```swift
import SwiftUI
import ComponentLibrary
import DesignTokens
```

### 2. Use a Component

```swift
struct ContentView: View {
    var body: some View {
        VStack(spacing: 16) {
            Text("Hello, iOS!")
                .font(.title)

            DSButton(
                title: "Click Me",
                style: .primary,
                size: .medium
            ) {
                print("Button tapped!")
            }
        }
        .padding()
    }
}
```

### 3. Run Your App

Press `Cmd+R` or click the Play button in Xcode.

## 🎨 Using Design Tokens

### Colors

```swift
import DesignTokens

Text("Styled Text")
    .foregroundColor(ColorTokens.colorPrimary600)
    .background(ColorTokens.colorNeutral50)
```

### Spacing

```swift
VStack(spacing: SpacingTokens.spacing4) {
    Text("Item 1")
    Text("Item 2")
}
.padding(SpacingTokens.spacing6)
```

### Typography

```swift
Text("Title")
    .font(.system(size: TypographyTokens.fontSize2xl))
    .fontWeight(.bold)
```

## 🔍 Exploring Components

### View in Xcode Previews

1. Clone this repository
2. Open `Package.swift` in Xcode
3. Navigate to `Sources/ComponentLibrary/Components/DSButton/DSButton.swift`
4. Press `Cmd+Option+Enter` to open Preview pane
5. See the component in action!

### Available Components

#### DSButton

```swift
// Primary button
DSButton(title: "Submit", style: .primary) {
    // Handle action
}

// Secondary button
DSButton(title: "Cancel", style: .secondary) {
    // Handle action
}

// Outline button
DSButton(title: "Learn More", style: .outline) {
    // Handle action
}

// Different sizes
DSButton(title: "Small", size: .small) {}
DSButton(title: "Medium", size: .medium) {}
DSButton(title: "Large", size: .large) {}

// States
DSButton(title: "Disabled", isDisabled: true) {}
DSButton(title: "Loading", isLoading: true) {}
```

## 🛠️ Development Setup (For Library Contributors)

### 1. Clone the Repository

```bash
git clone https://github.com/aaanandan/react-component-library.git
cd react-component-library
git checkout claude/ios-component-library-015GJiaanTTBpTuJtLDm417R
```

### 2. Install Node.js Dependencies

```bash
npm install
```

### 3. Generate Design Tokens

```bash
npm run build:tokens
```

This reads JSON files from `design-tokens/tokens/` and generates Swift code in `Sources/DesignTokens/Generated/`.

### 4. Open in Xcode

```bash
open Package.swift
```

### 5. Build and Test

```bash
# Build the package
swift build

# Run tests
swift test

# Or in Xcode
# Build: Cmd+B
# Test: Cmd+U
```

## 📦 Available Commands

### Design Tokens

```bash
# Generate tokens from JSON
npm run build:tokens
```

### Swift Package

```bash
# Build the package
swift build

# Build for release
swift build -c release

# Run tests
swift test

# Generate Xcode project (if needed)
swift package generate-xcodeproj
```

### Xcode Commands

- **Build:** `Cmd+B`
- **Test:** `Cmd+U`
- **Preview:** `Cmd+Option+Enter`
- **Clean:** `Cmd+Shift+K`

## 🎨 Dark Mode Support

All components automatically support dark mode! No extra configuration needed.

```swift
// This text color adapts to light/dark mode automatically
Text("Hello")
    .foregroundColor(ColorTokens.colorText)
```

## 📱 Example App

The repository includes a sample iOS app in `ExampleApp/` that demonstrates all components:

```bash
cd ExampleApp
open ExampleApp.xcodeproj
```

## 🐛 Troubleshooting

### Package Resolution Issues

If Xcode can't resolve the package:

1. `File → Packages → Reset Package Caches`
2. `File → Packages → Update to Latest Package Versions`

### Build Errors

```bash
# Clean and rebuild
swift package clean
swift build
```

Or in Xcode: `Product → Clean Build Folder` (Cmd+Shift+K)

### Token Generation Issues

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build:tokens
```

### Preview Issues

If Xcode Previews aren't working:

1. Press `Option+Cmd+P` to refresh
2. Restart Xcode
3. Clean build folder (Cmd+Shift+K)

## 📖 Next Steps

### For Library Users

1. ✅ Read [CONSUMING_GUIDE.md](./CONSUMING_GUIDE.md) for detailed usage examples
2. ✅ Explore all available components
3. ✅ Customize with design tokens

### For Library Contributors

1. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the structure
2. ✅ Follow [CHECKLIST.md](./CHECKLIST.md) to create new components
3. ✅ Read [DESIGN_TOKENS_GUIDE.md](./DESIGN_TOKENS_GUIDE.md) to sync from Figma

## 🔗 Useful Links

- [Complete Documentation](./DOCS_INDEX.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md)
- [Contributing Guidelines](./CHECKLIST.md)

## 💡 Pro Tips

1. **Use Xcode Previews** - They're the fastest way to iterate on UI
2. **Import Both Modules** - Most apps need both `ComponentLibrary` and `DesignTokens`
3. **Customize Tokens** - Override tokens in your design-tokens/ folder
4. **Check Examples** - Look at DSButton for implementation patterns

---

**You're all set! Start building amazing iOS apps! 🚀**

*Need help? Check [DOCS_INDEX.md](./DOCS_INDEX.md) for all documentation.*
