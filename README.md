# iOS Component Library

A modern, SwiftUI-based iOS component library with design tokens and a robust design system.

## 🚀 Features

- 📱 **SwiftUI** with iOS 15+ support
- 🎨 **Design Tokens** from Figma using Style Dictionary
- 📦 **Swift Package Manager** for easy integration
- 🔍 **SwiftUI Previews** for component development and documentation
- ✅ **XCTest** for unit and UI testing
- 🎯 **Swift** with full type safety
- 🔄 **Semantic Color System** supporting Light/Dark modes
- 📘 **Full Swift documentation** with DocC support
- 🌳 **Modular Architecture** - import only what you need
- ✨ **Native iOS** - no third-party dependencies

## 📦 Installation

### Swift Package Manager

Add this to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/aaanandan/react-component-library.git", branch: "claude/ios-component-library-015GJiaanTTBpTuJtLDm417R")
]
```

Or in Xcode:
1. File → Add Package Dependencies
2. Enter the repository URL
3. Select the iOS component library branch

## 🎯 Usage

### Basic Usage

```swift
import SwiftUI
import ComponentLibrary

struct ContentView: View {
    var body: some View {
        VStack {
            DSButton(
                title: "Click me!",
                style: .primary,
                size: .medium
            ) {
                print("Button tapped!")
            }
        }
    }
}
```

### Using Design Tokens

```swift
import DesignTokens

struct CustomView: View {
    var body: some View {
        Text("Custom View")
            .foregroundColor(ColorTokens.primary600)
            .padding(SpacingTokens.spacing4)
            .background(ColorTokens.neutral50)
            .cornerRadius(BorderRadiusTokens.medium)
    }
}
```

### Available Components

- **DSButton**: Primary, secondary, outline, and ghost button variants
- **DSTextField**: Text input with validation states
- **DSCard**: Container with elevation and borders
- **DSBadge**: Small status indicators
- **DSAvatar**: User profile images with fallback
- More components coming soon!

## 🛠️ Development

### Prerequisites

- Xcode 15.0+
- Swift 5.9+
- macOS 13.0+ (for development)
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

4. Open in Xcode:

```bash
open Package.swift
```

### Available Scripts

- `npm run build:tokens` - Generate tokens from design token JSON files
- `swift build` - Build the Swift package
- `swift test` - Run tests
- `swift package generate-xcodeproj` - Generate Xcode project (if needed)

## 📚 Design Tokens

Design tokens are the single source of truth for design decisions. They are defined in `design-tokens/tokens/*.json` and transformed into Swift code using Style Dictionary.

### Token Categories

- **Colors**: Brand colors, semantic colors, neutrals (with dark mode support)
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (8-point grid)
- **Border Radius**: Corner radius values
- **Shadows**: Elevation levels

### Syncing from Figma

To sync design tokens from Figma:

1. Export your Figma variables using [Tokens Studio](https://tokens.studio/) plugin
2. Place the JSON files in `design-tokens/tokens/`
3. Run `npm run build:tokens`

The tokens will be automatically transformed into:
- Swift constants (`Sources/DesignTokens/Generated/ColorTokens.swift`)
- Swift type-safe enums (`Sources/DesignTokens/Generated/SpacingTokens.swift`)
- Color assets for Xcode Asset Catalog (optional)

## 🔍 Component Documentation

View the component documentation using SwiftUI Previews:

1. Open `Package.swift` in Xcode
2. Navigate to any component file (e.g., `DSButton.swift`)
3. Open the Preview pane (Cmd+Option+Enter)
4. Interact with different variants and states

## 🏗️ Project Structure

```
ios-component-library/
├── design-tokens/              # Source design tokens (from Figma)
│   └── tokens/
│       ├── colors.json
│       ├── typography.json
│       └── spacing.json
├── Sources/
│   ├── ComponentLibrary/       # SwiftUI components
│   │   ├── Components/
│   │   │   ├── DSButton/
│   │   │   │   ├── DSButton.swift
│   │   │   │   ├── DSButtonStyle.swift
│   │   │   │   └── DSButton+Previews.swift
│   │   │   └── ...
│   │   ├── Modifiers/          # Custom view modifiers
│   │   ├── Extensions/         # Swift extensions
│   │   └── ComponentLibrary.swift
│   └── DesignTokens/           # Generated design tokens
│       ├── Generated/          # Auto-generated (DO NOT EDIT)
│       │   ├── ColorTokens.swift
│       │   ├── SpacingTokens.swift
│       │   ├── TypographyTokens.swift
│       │   └── ...
│       └── DesignTokens.swift
├── Tests/
│   └── ComponentLibraryTests/
├── ExampleApp/                 # Sample iOS app (dev playground)
│   ├── ExampleApp.xcodeproj
│   └── ExampleApp/
│       ├── ContentView.swift
│       ├── Examples/
│       └── ...
├── Documentation/              # DocC documentation
├── style-dictionary.config.js  # Token transformation config
├── package.json                # Node.js config for tokens
└── Package.swift               # Swift Package manifest
```

## 🧪 Testing

Run tests using Xcode or command line:

```bash
swift test
```

Or in Xcode:
1. Open Package.swift
2. Press Cmd+U to run all tests

## 📦 Building

Build the library:

```bash
swift build
```

For release builds:

```bash
swift build -c release
```

## 🎨 Consuming the Library

### In an iOS App

```swift
import SwiftUI
import ComponentLibrary
import DesignTokens

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    var body: some View {
        VStack(spacing: SpacingTokens.spacing4) {
            DSButton(title: "Primary Action", style: .primary) {
                // Handle action
            }

            DSButton(title: "Secondary Action", style: .outline) {
                // Handle action
            }
        }
        .padding()
    }
}
```

### Supporting Dark Mode

All design tokens automatically support dark mode:

```swift
// Colors automatically adapt to light/dark mode
Text("Hello")
    .foregroundColor(ColorTokens.text)
    .background(ColorTokens.background)
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
- [Example App](./ExampleApp/)

## 🎓 Learning Resources

- [START_HERE.md](./START_HERE.md) - Quick start guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture overview
- [DESIGN_TOKENS_GUIDE.md](./DESIGN_TOKENS_GUIDE.md) - Design token workflow
- [DOCS_INDEX.md](./DOCS_INDEX.md) - Complete documentation index
