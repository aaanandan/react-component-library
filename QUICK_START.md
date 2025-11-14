# 🚀 Quick Start Guide

## What You Have

A complete, production-ready React component library boilerplate with:

✅ **Modern Stack (2025)**
- React 18/19 + TypeScript 5.7
- Vite 6 for builds
- Storybook 8 for documentation
- Vitest for testing
- Style Dictionary for design tokens

✅ **Complete Setup**
- Sample Button component (fully typed, tested, documented)
- Design tokens from JSON (ready for Figma sync)
- Build configuration for ESM + CJS
- Testing setup
- Storybook configuration
- ESLint + Prettier

## 📝 Next Steps

### 1️⃣ Install Dependencies (5 minutes)

```bash
cd react-component-library
npm install
```

### 2️⃣ Generate Design Tokens (1 minute)

```bash
npm run build:tokens
```

This transforms your design token JSON files into:
- CSS Custom Properties
- TypeScript constants
- JSON format

### 3️⃣ Start Development (Choose One)

#### Option A: Storybook (Recommended for component development)
```bash
npm run storybook
```
Opens at http://localhost:6006

#### Option B: Vite Dev Server (Dev Playground)
```bash
npm run dev
```
Opens at http://localhost:5173

The dev playground (`src/` folder) is a lightweight environment for quick testing and experimentation. See `src/README.md` for details.

### 4️⃣ Run Tests

```bash
npm test
```

Or with UI:
```bash
npm run test:ui
```

### 5️⃣ Build the Library

```bash
npm run build
```

Output goes to `dist/` folder.

## 🎨 Connecting to Figma

### Quick Method (5 minutes)

1. **In Figma:**
   - Install "Tokens Studio for Figma" plugin
   - Create your design tokens
   - Export to JSON

2. **In Your Project:**
   - Replace files in `design-tokens/tokens/` with your exported JSON
   - Run `npm run build:tokens`
   - Your tokens are now available as CSS variables!

### Automated Method (15 minutes)

Follow the detailed guide in `DESIGN_TOKENS_GUIDE.md` to set up:
- GitHub sync from Tokens Studio
- Automated token generation
- CI/CD pipeline

## 📦 Publishing to npm

### First Time Setup

1. **Update package.json:**
   ```json
   {
     "name": "@aaanandan/react-component-library",
     "version": "0.1.0",
     "author": "Your Name",
     "repository": "https://github.com/aaanandan/react-component-library"
   }
   ```

2. **Login to npm:**
   ```bash
   npm login
   ```

3. **Publish:**
   ```bash
   npm run build
   npm publish --access public
   ```

### Updating Versions

```bash
# Patch (0.1.0 → 0.1.1)
npm version patch

# Minor (0.1.0 → 0.2.0)
npm version minor

# Major (0.1.0 → 1.0.0)
npm version major

# Then publish
npm publish
```

## 🎯 Creating New Components

### 1. Create Component Structure

```bash
mkdir -p lib/components/Card
touch lib/components/Card/Card.tsx
touch lib/components/Card/Card.css
touch lib/components/Card/Card.test.tsx
touch lib/components/Card/Card.stories.tsx
touch lib/components/Card/index.ts
```

### 2. Follow the Button Pattern

Check `lib/components/Button/` for the complete example.

**Key patterns:**
- Use TypeScript interfaces for props
- Use React.forwardRef for ref support
- Import and use design tokens in CSS
- Write tests with React Testing Library
- Create Storybook stories for all variants
- Export from index.ts

### 3. Export from Main Index

Add to `lib/index.ts`:
```typescript
export { Card } from './components/Card';
export type { CardProps } from './components/Card';
```

## 📚 Important Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Build configuration |
| `tsconfig.json` | TypeScript configuration |
| `style-dictionary.config.js` | Token transformation |
| `vitest.config.ts` | Test configuration |
| `.storybook/` | Storybook configuration |
| `lib/index.ts` | Main library entry point |
| `design-tokens/tokens/` | Source design tokens |

## 🔧 Common Commands

```bash
# Development
npm run dev                # Start dev server
npm run storybook         # Start Storybook

# Building
npm run build:tokens      # Generate tokens
npm run build            # Build library

# Testing
npm test                 # Run tests
npm run test:ui         # Tests with UI
npm run lint            # Lint code
npm run format          # Format code

# Type checking
npm run type-check      # Check TypeScript
```

## 🎓 Learning Resources

### Inside This Project
- `README.md` - Complete project documentation
- `DESIGN_TOKENS_GUIDE.md` - Figma to React workflow
- `CONSUMING_GUIDE.md` - How to use the library
- `lib/components/Button/` - Example component

### External Resources
- [Storybook Docs](https://storybook.js.org/)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Tokens Studio](https://tokens.studio/)

## ⚠️ Before You Start

1. **Replace placeholders:**
   - `@aaanandan` with your company/username
   - Repository URLs
   - Author information

2. **Configure tokens:**
   - Edit `design-tokens/tokens/*.json` with your design values
   - Or connect to your Figma file

3. **Customize:**
   - Update colors, spacing, typography to match your brand
   - Modify Button component or delete it

## 🎉 You're Ready!

Start building your components. The foundation is solid:
- ✅ Modern tooling
- ✅ Best practices
- ✅ Design tokens integration
- ✅ Testing setup
- ✅ Documentation
- ✅ Build pipeline

**Pro Tip:** Start simple. Build a few components, get comfortable with the workflow, then expand. The Button component is your template!

## 💡 Tips for Success

1. **Keep tokens updated** - Sync regularly from Figma
2. **Document everything** - Use Storybook extensively
3. **Test thoroughly** - Write tests for all components
4. **Version carefully** - Follow semantic versioning
5. **Communicate changes** - Use a CHANGELOG.md

## 🆘 Need Help?

Check the documentation files:
- General usage: `README.md`
- Design tokens: `DESIGN_TOKENS_GUIDE.md`
- Consuming library: `CONSUMING_GUIDE.md`

Happy building! 🚀