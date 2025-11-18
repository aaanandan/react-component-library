# Architecture Overview - iOS Component Library

## 🏗️ Project Structure

```
ios-component-library/
│
├── 📁 design-tokens/              # Source of truth for design
│   └── tokens/
│       ├── colors.json           # Color palette
│       ├── typography.json       # Font settings
│       ├── spacing.json          # Spacing scale
│       ├── border-radius.json    # Corner radius values
│       └── shadows.json          # Shadow/elevation
│
├── 📁 Sources/
│   ├── 📁 ComponentLibrary/      # Main component module
│   │   ├── Components/
│   │   │   └── DSButton/
│   │   │       └── DSButton.swift
│   │   ├── Modifiers/            # Custom view modifiers
│   │   ├── Extensions/           # Swift extensions
│   │   └── ComponentLibrary.swift
│   │
│   └── 📁 DesignTokens/          # Design tokens module
│       ├── Generated/            # Auto-generated (DO NOT EDIT)
│       │   ├── ColorTokens.swift
│       │   ├── SpacingTokens.swift
│       │   ├── TypographyTokens.swift
│       │   ├── BorderRadiusTokens.swift
│       │   └── ShadowTokens.swift
│       └── DesignTokens.swift
│
├── 📁 Tests/
│   └── ComponentLibraryTests/
│       └── DSButtonTests.swift
│
├── 📁 ExampleApp/                # Sample iOS app
│   ├── ExampleApp.xcodeproj
│   └── ExampleApp/
│       ├── ContentView.swift
│       └── Examples/
│
├── 📄 Package.swift              # Swift Package manifest
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
│  Swift Code  │  Sources/DesignTokens/Generated/
│ (Generated)  │  - ColorTokens.swift
└──────┬───────┘  - SpacingTokens.swift
       │          - TypographyTokens.swift
       │
       ├─────────────────┬──────────────────┐
       │                 │                  │
       ▼                 ▼                  ▼
  ┌──────────┐      ┌──────────┐      ┌──────────┐
  │ SwiftUI  │      │  Other   │      │  Apps    │
  │Components│      │ Modules  │      │          │
  └──────────┘      └──────────┘      └──────────┘
```

### Component Development Flow

```
┌─────────────┐
│  Developer  │  Creates component
│  Writes     │  (DSButton.swift)
│  Component  │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
       ▼              ▼              ▼              ▼
  ┌─────────┐   ┌─────────┐   ┌──────────┐   ┌─────────┐
  │  Styles │   │  Tests  │   │ Previews │   │  Types  │
  │  (Code) │   │ XCTest  │   │  Xcode   │   │  Swift  │
  └────┬────┘   └────┬────┘   └────┬─────┘   └────┬────┘
       │             │             │              │
       └─────────────┴─────────────┴──────────────┘
                     │
                     ▼
              ┌──────────────┐
              │ Swift Build  │  Compiles everything
              │  + Tests     │  Runs tests
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │  .build/     │  Build artifacts
              │  Package     │  Ready to use
              └──────────────┘
```

### Consumer Integration Flow

```
┌─────────────────┐
│  Consumer App   │  iOS/macOS app
│  (SwiftUI)      │
└────────┬────────┘
         │
         │ Add Package Dependency
         ▼
   ┌──────────────┐
   │ Swift Package│  Package.swift resolution
   │   Manager    │
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
                  │   Xcode       │  Compiles into app
                  │   Build       │
                  └───────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │     iOS       │  Final app bundle
                  │     App       │
                  └───────────────┘
```

## 🔌 Integration Points

### 1. Design Token Generation

**Input:** JSON files from Figma
**Process:** Style Dictionary transformation
**Output:** Swift constants and enums

```javascript
// style-dictionary.config.js
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
        }
      ]
    }
  }
};
```

### 2. Component Compilation

**Input:** Swift source files
**Process:** Swift compiler
**Output:** Compiled module

```swift
// Package.swift
.target(
    name: "ComponentLibrary",
    dependencies: ["DesignTokens"],
    path: "Sources/ComponentLibrary"
)
```

### 3. Type Safety

**Input:** Swift source with types
**Process:** Swift type checker
**Output:** Type-safe API

### 4. Testing

**Input:** Test files (*.swift)
**Process:** XCTest framework
**Output:** Test results

### 5. Documentation

**Input:** Swift files with doc comments
**Process:** Xcode Previews / DocC
**Output:** Interactive documentation

## 📦 Module Architecture

```
┌────────────────────────────────────┐
│      Consumer App                  │
│                                    │
│  import ComponentLibrary           │
│  import DesignTokens               │
└────────────┬───────────────────────┘
             │
             │ depends on
             ▼
┌────────────────────────────────────┐
│   ComponentLibrary Module          │
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
│   DesignTokens Module              │
│                                    │
│   - ColorTokens                    │
│   - SpacingTokens                  │
│   - TypographyTokens               │
│   - ...                            │
└────────────────────────────────────┘
```

## 🎯 Key Design Decisions

### Why SwiftUI?

1. **Modern & Declarative:** Clean, readable component code
2. **Native Performance:** First-class iOS/macOS support
3. **Preview Support:** Instant visual feedback during development
4. **Type Safety:** Compile-time error checking

### Why Swift Package Manager?

1. **Native Integration:** Built into Xcode
2. **Zero Configuration:** Works out of the box
3. **Versioning:** Git-based version management
4. **Cross-Platform:** Supports iOS, macOS, tvOS, watchOS

### Why Style Dictionary?

1. **Multi-Platform:** Can generate for iOS, Android, Web
2. **Transformation Pipeline:** Powerful token transformation
3. **Industry Standard:** Used by major design systems
4. **Extensible:** Easy to customize

### Why No External Dependencies?

1. **Stability:** No breaking changes from third parties
2. **Bundle Size:** Smaller app bundles
3. **Trust:** No security concerns
4. **Control:** Full ownership of the codebase

## 🔐 Best Practices Implemented

✅ **Single Source of Truth:** Figma → JSON → Generated Swift code
✅ **Type Safety:** Full Swift type checking
✅ **Testing:** Comprehensive XCTest suite
✅ **Documentation:** Inline docs + Xcode Previews
✅ **Modularity:** Separate modules for tokens and components
✅ **Accessibility:** VoiceOver support, Dynamic Type
✅ **Performance:** Optimized SwiftUI views
✅ **Dark Mode:** Automatic color adaptation

## 🚀 Build & Distribution

### Local Development

```bash
# Build
swift build

# Test
swift test

# Generate tokens
npm run build:tokens
```

### Distribution Options

1. **Swift Package Manager** (Recommended)
   - Host on GitHub
   - Version with Git tags
   - Consumers add via Xcode

2. **Binary Framework**
   - Create XCFramework
   - Distribute via Swift Package Manager
   - Pre-compiled binary

3. **CocoaPods** (Legacy)
   - Create Podspec
   - Publish to CocoaPods trunk

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

### Output (Swift)

```swift
import SwiftUI

public class ColorTokens {
    public static let colorPrimary600 = Color(hex: "#2563eb")
}
```

### Usage (Component)

```swift
import SwiftUI
import DesignTokens

struct MyView: View {
    var body: some View {
        Text("Hello")
            .foregroundColor(ColorTokens.colorPrimary600)
    }
}
```

## 🎓 Further Reading

- **Swift Package Manager:** [Documentation](https://swift.org/package-manager/)
- **SwiftUI:** [Apple Developer](https://developer.apple.com/xcode/swiftui/)
- **Style Dictionary:** [Documentation](https://amzn.github.io/style-dictionary/)
- **Design Tokens:** [W3C Spec](https://design-tokens.github.io/community-group/format/)
