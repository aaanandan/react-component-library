# Architecture Overview

## 🏗️ Project Structure

```
react-component-library/
│
├── 📁 design-tokens/              # Source of truth for design
│   └── tokens/
│       ├── colors.json           # Color palette
│       ├── typography.json       # Font settings
│       └── spacing.json          # Spacing scale
│
├── 📁 lib/                        # Library source code
│   ├── 📁 components/            # React components
│   │   └── Button/
│   │       ├── Button.tsx        # Component logic
│   │       ├── Button.css        # Component styles (uses tokens)
│   │       ├── Button.test.tsx   # Unit tests
│   │       ├── Button.stories.tsx # Storybook docs
│   │       └── index.ts          # Exports
│   │
│   ├── 📁 tokens/                # Generated tokens (auto-generated)
│   │   ├── tokens.css           # CSS custom properties
│   │   ├── tokens.ts            # TypeScript constants
│   │   ├── tokens.json          # JSON format
│   │   └── types.d.ts           # TypeScript types
│   │
│   ├── 📁 hooks/                 # Custom React hooks
│   ├── 📁 utils/                 # Helper functions
│   └── index.ts                  # Main entry point
│
├── 📁 .storybook/                # Storybook config
├── 📁 dist/                      # Build output (gitignored)
│
├── 📄 vite.config.ts             # Build configuration
├── 📄 tsconfig.json              # TypeScript config
├── 📄 style-dictionary.config.js # Token transformation
├── 📄 vitest.config.ts           # Test configuration
└── 📄 package.json               # Dependencies & scripts
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
│  Multiple    │  lib/tokens/
│  Formats     │  - tokens.css (CSS variables)
└──────┬───────┘  - tokens.ts (TypeScript)
       │          - tokens.json (JSON)
       │
       ├─────────────────┬──────────────────┐
       │                 │                  │
       ▼                 ▼                  ▼
  ┌──────────┐      ┌──────────┐      ┌──────────┐
  │ React    │      │  CSS     │      │  Other   │
  │Components│      │  Files   │      │  Apps    │
  └──────────┘      └──────────┘      └──────────┘
```

### Component Development Flow

```
┌─────────────┐
│  Developer  │  Creates component
│  Writes     │  (Button.tsx)
│  Component  │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
       ▼              ▼              ▼              ▼
  ┌─────────┐   ┌─────────┐   ┌──────────┐   ┌─────────┐
  │  CSS    │   │  Tests  │   │Stories   │   │  Types  │
  │  Styles │   │  Vitest │   │Storybook │   │  (TS)   │
  └────┬────┘   └────┬────┘   └────┬─────┘   └────┬────┘
       │             │             │              │
       └─────────────┴─────────────┴──────────────┘
                     │
                     ▼
              ┌──────────────┐
              │  Vite Build  │  Bundles everything
              │  + DTS       │  Generates types
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │    dist/     │  Ready to publish
              │  - index.js  │  (ESM + CJS)
              │  - index.d.ts│  (TypeScript defs)
              │  - styles/   │  (CSS)
              └──────────────┘
```

### Consumer Integration Flow

```
┌─────────────────┐
│  Consumer App   │  npm install @aaanandan/library
│  (Next.js/Vite) │
└────────┬────────┘
         │
         ├─────────────────┬──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │ Import   │      │ Import   │      │ Import   │
   │Components│      │  Styles  │      │  Tokens  │
   └──────────┘      └──────────┘      └──────────┘
         │                 │                  │
         │   <Button />    │ tokens.css       │ tokens.ts
         │                 │                  │
         └─────────────────┴──────────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │   Bundler     │  Vite/Webpack/Next.js
                  │  (Tree-shake) │  bundles only what's used
                  └───────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │  Production   │  Optimized bundle
                  │    Build      │  with components
                  └───────────────┘
```

## 🔌 Integration Points

### 1. Design Token Generation

**Input:** JSON files from Figma
**Process:** Style Dictionary transformation
**Output:** CSS variables, TypeScript, JSON

```javascript
// style-dictionary.config.js
module.exports = {
  source: ['design-tokens/tokens/**/*.json'],
  platforms: {
    css: { /* CSS variable output */ },
    js: { /* TypeScript output */ },
  }
};
```

### 2. Component Compilation

**Input:** TypeScript + CSS from lib/
**Process:** Vite build with plugins
**Output:** Bundled JS + CSS + Types

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),                    // React transformation
    libInjectCss(),            // CSS injection
    dts({ include: ['lib'] }), // Type generation
  ],
  build: {
    lib: { /* Library mode config */ },
  },
});
```

### 3. Type Generation

**Input:** TypeScript source files
**Process:** vite-plugin-dts
**Output:** .d.ts declaration files

### 4. Testing

**Input:** Test files (*.test.tsx)
**Process:** Vitest + React Testing Library
**Output:** Test results & coverage

### 5. Documentation

**Input:** Story files (*.stories.tsx)
**Process:** Storybook
**Output:** Interactive documentation

## 📦 Build Outputs

The build process creates multiple formats:

```
dist/
├── index.js           # CommonJS bundle
├── index.mjs          # ES Module bundle
├── index.d.ts         # TypeScript declarations
│
├── styles/
│   └── index.css      # All component styles
│
└── tokens/
    ├── index.js       # Token exports (CJS)
    ├── index.mjs      # Token exports (ESM)
    └── index.d.ts     # Token types
```

## 🎯 Key Design Decisions

### Why No Tailwind?

1. **Component API First:** Tailwind's utility classes don't work well with prop-based component APIs
2. **Framework Agnostic:** Consumers can use any styling approach
3. **Semantic Tokens:** CSS custom properties provide semantic naming
4. **Flexibility:** Works with any CSS methodology

### Why Style Dictionary?

1. **Multi-Platform:** Generates tokens for web, iOS, Android
2. **Transformation Pipeline:** Powerful token transformation
3. **Industry Standard:** Used by major design systems
4. **Extensible:** Easy to customize

### Why Vite?

1. **Fast:** Lightning-fast HMR and builds
2. **Modern:** Native ESM support
3. **Library Mode:** Built-in library bundling
4. **Plugin Ecosystem:** Rich plugin ecosystem

### Why Storybook?

1. **Industry Standard:** Most popular component documentation tool
2. **Interactive:** Live component playground
3. **Documentation:** Auto-generated docs from TypeScript
4. **Testing:** Visual testing integration

## 🔐 Best Practices Implemented

✅ **Single Source of Truth:** Figma → JSON → Generated code
✅ **Type Safety:** Full TypeScript coverage
✅ **Testing:** Comprehensive test setup
✅ **Documentation:** Auto-generated docs
✅ **Tree-Shaking:** ESM with proper side effects marking
✅ **Accessibility:** Semantic HTML, keyboard support
✅ **Performance:** Optimized bundles, code splitting
✅ **Developer Experience:** Fast dev server, HMR, TypeScript

## 🚀 Deployment Pipeline

```
┌─────────────┐
│  Git Push   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   CI/CD     │  GitHub Actions
│  Pipeline   │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
       ▼              ▼              ▼              ▼
  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
  │  Lint   │   │  Test   │   │  Build  │   │ Build   │
  │         │   │         │   │ Library │   │Storybook│
  └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘
       │             │             │             │
       └─────────────┴─────────────┴─────────────┘
                     │
                     ▼
              ┌──────────────┐
              │   Publish    │
              │   to npm     │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │   Deploy     │
              │  Storybook   │
              │  (Optional)  │
              └──────────────┘
```

## 📊 Token Transformation Example

### Input (Figma → JSON)

```json
{
  "color": {
    "primary": {
      "500": {
        "value": "#0ea5e9",
        "type": "color"
      }
    }
  }
}
```

### Output (CSS)

```css
:root {
  --color-primary-500: #0ea5e9;
}
```

### Output (TypeScript)

```typescript
export const ColorPrimary500 = "#0ea5e9";
```

### Usage (Component)

```css
.button {
  background-color: var(--color-primary-500);
}
```

## 🎓 Further Reading

- **Vite Library Mode:** [Guide](https://vitejs.dev/guide/build.html#library-mode)
- **Style Dictionary:** [Documentation](https://amzn.github.io/style-dictionary/)
- **Design Tokens:** [W3C Spec](https://design-tokens.github.io/community-group/format/)
- **Component Library Best Practices:** [Article](https://www.robinwieruch.de/react-libraries/)