# 🚀 Start Here - iOS Component Library

Welcome! This guide will get you started with your iOS component library in under 10 minutes.

## ✨ What You Have

This is a production-ready iOS component library with:

- ✅ **SwiftUI Components** - Modern, declarative UI components
- ✅ **Design Tokens** - Single source of truth from Figma
- ✅ **Swift Package Manager** - Easy distribution and integration
- ✅ **Xcode Previews** - Interactive component playground
- ✅ **Tests** - XCTest suite included
- ✅ **Documentation** - Comprehensive guides and examples
- ✅ **Dark Mode Support** - Automatic light/dark theme switching
- ✅ **Example App** - Sample iOS app for testing

## 🎯 Your First 5 Minutes

### 1. Open in Xcode (30 seconds)

```bash
open Package.swift
```

Or in Xcode: `File → Open → Select Package.swift`

### 2. View Component Previews (1 minute)

1. Navigate to `Sources/ComponentLibrary/Components/DSButton/DSButton.swift`
2. Press `Cmd+Option+Enter` to open Preview pane
3. See your button in action!

### 3. Build the Package (30 seconds)

```bash
swift build
```

Or in Xcode: `Cmd+B`

### 4. Run Tests (30 seconds)

```bash
swift test
```

Or in Xcode: `Cmd+U`

### 5. Generate Design Tokens (2 minutes)

```bash
npm install
npm run build:tokens
```

This generates Swift code from your design token JSON files.

## 🎨 What's Included

### Components
- **DSButton** - Versatile button with multiple styles
- More components coming soon!

### Design Tokens
- **Colors** - Primary, neutral, semantic colors
- **Spacing** - 8-point grid system
- **Typography** - Font sizes, weights, families
- **Border Radius** - Corner radius values
- **Shadows** - Elevation levels

### Example App
Located in `ExampleApp/` - a sample iOS app demonstrating all components.

## 📖 Next Steps

### For Designers
👉 Read [DESIGN_TOKENS_GUIDE.md](./DESIGN_TOKENS_GUIDE.md) to sync tokens from Figma

### For Developers
👉 Read [QUICK_START.md](./QUICK_START.md) for detailed setup instructions
👉 Follow [CHECKLIST.md](./CHECKLIST.md) to create your first component

### For Library Consumers
👉 Read [CONSUMING_GUIDE.md](./CONSUMING_GUIDE.md) to use this library in your app

## 🏗️ Project Structure

```
ios-component-library/
├── Package.swift              # Swift Package manifest
├── Sources/
│   ├── ComponentLibrary/      # SwiftUI components
│   └── DesignTokens/          # Design token constants
├── Tests/                     # Unit tests
├── ExampleApp/                # Sample iOS app
├── design-tokens/             # Token source files
└── Documentation/             # Comprehensive guides
```

## 💡 Quick Tips

1. **Use Xcode Previews** - Best way to develop and test components
2. **Follow DSButton Pattern** - Use it as a template for new components
3. **Commit Generated Tokens** - They should be in version control
4. **Run Tests Often** - Keep your library stable

## 🔗 Important Links

- [Complete Documentation Index](./DOCS_INDEX.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Quick Start Guide](./QUICK_START.md)
- [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md)

## 🆘 Need Help?

1. Check [DOCS_INDEX.md](./DOCS_INDEX.md) for all documentation
2. Look at the DSButton example for patterns
3. Read the relevant guide for your task

---

**Ready to build amazing components! 🚀**

*Next: Read [QUICK_START.md](./QUICK_START.md) for detailed instructions*
