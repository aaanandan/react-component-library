# 📚 Documentation Index

Welcome to your Android Component Library! This is your roadmap to all documentation.

## 🚀 Getting Started (Start Here!)

### 1. [**START_HERE.md**](./START_HERE.md) - Your First 5 Minutes ⭐
**Start here!** Quick introduction to get you up and running.
- What you have
- Quick setup
- First component preview

### 2. [**QUICK_START.md**](./QUICK_START.md) - Detailed Setup Guide
Complete setup instructions:
- Installation
- Configuration
- Building your first component
- Using design tokens

### 3. [**PROJECT_SUMMARY.md**](./PROJECT_SUMMARY.md) - What's Inside 📦
High-level overview of:
- Features and capabilities
- Technology stack
- Project statistics
- Roadmap

## 📖 Core Documentation

### 4. [**README.md**](./README.md) - Complete Reference 📘
The main documentation covering:
- Installation and usage
- All available commands
- Project structure
- Testing guide
- Publishing
- Contributing guidelines

### 5. [**ARCHITECTURE.md**](./ARCHITECTURE.md) - How It Works 🏗️
Deep dive into:
- Project structure explained
- Data flow diagrams
- Module architecture
- Build process
- Design decisions and rationale

## 🎨 Design System Guides

### 6. [**DESIGN_TOKENS_GUIDE.md**](./DESIGN_TOKENS_GUIDE.md) - Figma to Android 🎨
Complete guide for design tokens:
- Setting up Figma
- Exporting tokens
- Token transformation with Style Dictionary
- Using tokens in Compose
- CI/CD automation
- Best practices

## 🎯 Quick Reference

### By Role

**👩‍🎨 For Designers:**
1. Read: [DESIGN_TOKENS_GUIDE.md](./DESIGN_TOKENS_GUIDE.md)
2. Set up: Figma + Tokens Studio plugin
3. Export: Push tokens to GitHub
4. Collaborate: Review components in Android Studio Previews

**👨‍💻 For Developers:**
1. Read: [START_HERE.md](./START_HERE.md)
2. Learn: [DSButton Example](./component-library/src/main/java/.../DSButton.kt)
3. Reference: [ARCHITECTURE.md](./ARCHITECTURE.md) when stuck

**👥 For Consumers:**
1. Read: [README.md](./README.md)
2. Install: Add Gradle dependency
3. Import: Components + DesignTokens
4. Use: Check Compose Previews for examples

### By Task

**Setting Up for the First Time:**
```
START_HERE.md → QUICK_START.md
```

**Creating a New Component:**
```
DSButton example → Follow the pattern
```

**Syncing Design Tokens:**
```
DESIGN_TOKENS_GUIDE.md → Export from Figma → Generate Kotlin code
```

**Publishing the Library:**
```
README.md (Publishing section) → Gradle commands
```

**Understanding the Architecture:**
```
ARCHITECTURE.md → Module structure
```

## 📁 Key Files in the Project

### Configuration Files
- `build.gradle.kts` - Root build configuration
- `settings.gradle.kts` - Module configuration
- `style-dictionary.config.js` - Token transformation
- `package.json` - Node.js dependencies

### Source Code
- `component-library/src/` - Compose components
- `design-tokens/src/` - Generated design tokens
- `design-tokens/tokens/` - Source token JSON files

### Generated (Don't Edit)
- `design-tokens/src/.../generated/` - Auto-generated
- `build/` - Build artifacts

## 💡 Pro Tips

1. **Always start with [START_HERE.md](./START_HERE.md)**
2. **The DSButton component is your template**
3. **Compose Previews are your playground**
4. **Design tokens are powerful** - invest time in the guide

## 🆘 Getting Help

1. **Check the relevant doc** from this index
2. **Look at the DSButton example**
3. **Search the docs** - use Ctrl/Cmd + F
4. **Check build.gradle.kts** - see dependencies

---

**Happy Building! 🚀**

*Last Updated: November 2025*
