# 📦 React Component Library - Complete Boilerplate

## What's Included

This is a **production-ready, modern React component library boilerplate** following 2025 best practices.

## ✨ Features

### 🎨 Design System Integration
- ✅ **Design Tokens** from Figma (JSON → CSS Variables/TypeScript)
- ✅ **Style Dictionary** for token transformation
- ✅ **CSS Custom Properties** for theming
- ✅ **No Tailwind** - Pure, flexible approach

### ⚛️ Modern React Stack
- ✅ **React 18/19** support
- ✅ **TypeScript 5.7** with full type safety
- ✅ **Vite 6** for lightning-fast builds
- ✅ **ESM + CJS** dual output format
- ✅ **Tree-shakeable** exports

### 📖 Documentation & Development
- ✅ **Storybook 8** for component documentation
- ✅ **Auto-generated docs** from TypeScript
- ✅ **Interactive playground** for components

### 🧪 Testing
- ✅ **Vitest** with React Testing Library
- ✅ **Complete test setup** with examples
- ✅ **UI mode** for visual test debugging

### 🛠️ Code Quality
- ✅ **ESLint 9** (flat config)
- ✅ **Prettier** for formatting
- ✅ **TypeScript strict mode**
- ✅ **Git hooks ready** (optional)

### 📦 Build & Distribution
- ✅ **Optimized bundles** (ESM + CJS)
- ✅ **Type declarations** (.d.ts)
- ✅ **Source maps** for debugging
- ✅ **CSS injection** handled automatically

## 📂 Project Contents

```
react-component-library/
│
├── 📄 QUICK_START.md          ← START HERE!
├── 📄 README.md               ← Complete documentation
├── 📄 ARCHITECTURE.md         ← How it all works
├── 📄 DESIGN_TOKENS_GUIDE.md  ← Figma to React workflow
├── 📄 CONSUMING_GUIDE.md      ← Using the library
│
├── 📁 design-tokens/          ← Source design tokens
│   └── tokens/
│       ├── colors.json        ← Color palette (sample)
│       ├── typography.json    ← Font settings (sample)
│       └── spacing.json       ← Spacing scale (sample)
│
├── 📁 lib/                    ← Library source code
│   ├── components/
│   │   └── Button/            ← Complete example component
│   │       ├── Button.tsx     ← Implementation
│   │       ├── Button.css     ← Styles with tokens
│   │       ├── Button.test.tsx ← Unit tests
│   │       └── Button.stories.tsx ← Storybook docs
│   ├── tokens/                ← Generated (gitignored)
│   ├── hooks/                 ← Custom hooks (empty)
│   ├── utils/                 ← Utilities (empty)
│   └── index.ts               ← Main entry point
│
├── 📁 .storybook/             ← Storybook config
├── 📄 package.json            ← Dependencies & scripts
├── 📄 vite.config.ts          ← Build config
├── 📄 vitest.config.ts        ← Test config
├── 📄 tsconfig.json           ← TypeScript config
├── 📄 style-dictionary.config.js ← Token transformation
├── 📄 eslint.config.js        ← Linting config
└── 📄 .prettierrc             ← Formatting config
```

## 🎯 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Design Tokens
```bash
npm run build:tokens
```

### 3. Start Storybook
```bash
npm run storybook
```

### 4. Start Building!
Check out `lib/components/Button/` for a complete example.

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build library for production |
| `npm run build:tokens` | Generate tokens from JSON |
| `npm test` | Run tests |
| `npm run test:ui` | Run tests with UI |
| `npm run lint` | Lint code |
| `npm run format` | Format code |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build Storybook |
| `npm run type-check` | Check TypeScript |

## 📦 What You Get Out of the Box

### Sample Button Component
A complete, production-ready button with:
- ✅ Multiple variants (primary, secondary, outline, ghost)
- ✅ Three sizes (sm, md, lg)
- ✅ Loading state with spinner
- ✅ Icon support (left/right)
- ✅ Full TypeScript types
- ✅ Comprehensive tests
- ✅ Storybook documentation
- ✅ Accessibility features

### Design Token System
Sample tokens for:
- ✅ Colors (primary, secondary, neutral, semantic)
- ✅ Typography (families, sizes, weights, line heights)
- ✅ Spacing (0-24 scale)
- ✅ Border radius (none to full)
- ✅ Shadows (sm to xl)

### Complete Configuration
- ✅ Vite configured for library mode
- ✅ TypeScript with strict mode
- ✅ Vitest with jsdom setup
- ✅ Storybook with React Vite
- ✅ ESLint with TypeScript rules
- ✅ Prettier with sensible defaults

## 🎨 Design Token Workflow

```
Figma Design → Tokens Studio Plugin → JSON Files → Style Dictionary → Multiple Formats
```

**Supports:**
- Manual JSON export
- GitHub sync (automated)
- Figma API integration

**Outputs:**
- CSS Custom Properties
- TypeScript constants
- JSON format
- Type definitions

## 📚 Documentation Files

| File | What It Covers |
|------|----------------|
| **QUICK_START.md** | Get up and running in 5 minutes |
| **README.md** | Complete project documentation |
| **ARCHITECTURE.md** | How everything works together |
| **DESIGN_TOKENS_GUIDE.md** | Figma to React workflow |
| **CONSUMING_GUIDE.md** | How to use in other projects |

## 🎓 Learn By Example

The **Button component** (`lib/components/Button/`) is a complete example showing:
1. How to structure a component
2. How to use design tokens
3. How to write tests
4. How to create Storybook stories
5. How to type props properly
6. How to handle variants and states

**Copy this pattern for all your components!**

## 🔧 Customization

### Update Package Name
Edit `package.json`:
```json
{
  "name": "@aaanandan/react-component-library"
}
```

### Add Your Design Tokens
Replace files in `design-tokens/tokens/` with your own:
- Export from Figma using Tokens Studio
- Or manually create JSON files
- Run `npm run build:tokens`

### Create New Components
1. Copy the Button structure
2. Update component logic
3. Write tests
4. Create stories
5. Export from `lib/index.ts`

## ⚡ Why This Stack?

### No Tailwind
- ✅ Better component APIs (prop-based, not class-based)
- ✅ Framework agnostic
- ✅ Semantic CSS custom properties
- ✅ Consumers can use any styling approach

### Vite Over Webpack
- ✅ 10-100x faster builds
- ✅ Native ESM support
- ✅ Better developer experience
- ✅ Simpler configuration

### Vitest Over Jest
- ✅ 2-10x faster tests
- ✅ Native ESM support
- ✅ Vite integration
- ✅ Better TypeScript support

### Style Dictionary
- ✅ Industry standard for design tokens
- ✅ Multi-platform support
- ✅ Powerful transformations
- ✅ Extensible

## 📊 Project Stats

- **Configuration Files:** 10
- **Example Components:** 1 (Button)
- **Design Token Files:** 3 (colors, typography, spacing)
- **Documentation Pages:** 5
- **Total Lines:** ~2,500+
- **Dependencies:** Latest 2025 versions

## ✅ Production Ready Features

- ✅ Tree-shaking support
- ✅ Dual format exports (ESM + CJS)
- ✅ TypeScript declarations
- ✅ Source maps
- ✅ Peer dependencies correctly set
- ✅ Side effects marked
- ✅ Proper exports field
- ✅ Files field for npm

## 🎯 Next Steps After Setup

1. **Customize tokens** - Add your brand colors, spacing, etc.
2. **Build components** - Start with simple ones (Badge, Avatar, Card)
3. **Write tests** - Follow Button.test.tsx pattern
4. **Document in Storybook** - Follow Button.stories.tsx pattern
5. **Publish to npm** - Share with your team!

## 🚢 Deployment Options

### npm Registry
```bash
npm publish
```

### GitHub Packages
```bash
npm publish --registry=https://npm.pkg.github.com
```

### Private Registry
```bash
npm publish --registry=https://your-registry.com
```

## 📞 Support

This boilerplate includes:
- ✅ Comprehensive documentation
- ✅ Working examples
- ✅ Best practices
- ✅ Latest 2025 tooling

**Everything you need to build a production-grade component library!**

## 🎉 What Makes This Special?

1. **Modern:** Uses 2025's best practices and latest versions
2. **Complete:** Everything configured and working
3. **Documented:** 5 detailed guides included
4. **Example-Driven:** Working Button component to learn from
5. **Flexible:** No opinionated styling (works with any approach)
6. **Production-Ready:** Used patterns from real-world libraries
7. **Type-Safe:** Full TypeScript coverage
8. **Well-Tested:** Test setup and examples included

## 🔥 Start Building Today!

Read **QUICK_START.md** and you'll be building components in minutes!

---

**Happy Building! 🚀**

Built with ❤️ using React, TypeScript, Vite, and modern best practices.