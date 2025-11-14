# Project Configuration Guide

Complete reference for all configuration files in this React component library.

---

## Table of Contents

1. [Package Configuration](#package-configuration)
2. [Build System](#build-system)
3. [TypeScript Configuration](#typescript-configuration)
4. [Testing Setup](#testing-setup)
5. [Code Quality](#code-quality)
6. [Design Token System](#design-token-system)
7. [Documentation (Storybook)](#documentation-storybook)
8. [Git Configuration](#git-configuration)
9. [Path Aliases](#path-aliases)
10. [Development Workflow](#development-workflow)

---

## Package Configuration

### package.json

**Location:** `/package.json`

#### Key Metadata
```json
{
  "name": "@aaanandan/react-component-library",
  "version": "0.1.4",
  "type": "module",
  "description": "A reusable React component library with design tokens and TypeScript"
}
```

#### Entry Points
- **Main (CJS):** `./dist/index.js`
- **Module (ESM):** `./dist/index.mjs`
- **Types:** `./dist/index.d.ts`

#### Exports Configuration
```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.mjs",
    "require": "./dist/index.js"
  },
  "./styles": {
    "types": "./lib/styles.d.ts",
    "default": "./dist/styles.css"
  }
}
```

**Purpose:** Provides dual-format support (ESM/CJS) with proper TypeScript types. The `./styles` export allows consumers to import CSS separately.

#### Side Effects
```json
{
  "sideEffects": ["**/*.css"]
}
```

**Purpose:** Tells bundlers that CSS files have side effects and should not be tree-shaken, while JavaScript files can be safely optimized.

#### Peer Dependencies
```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

**Purpose:** Supports both React 18 and 19, allowing consumers to use either version.

#### Version Overrides
```json
{
  "overrides": {
    "vite": "^6.4.1",
    "vitest": {
      "vite": "^6.4.1"
    }
  }
}
```

**Purpose:** Forces Vite 6.4.1+ for both direct and transitive dependencies (through vitest) to ensure consistency.

#### Files Included in Package
```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

**Purpose:** Only ships the compiled code, readme, and license to npm. Source code and development files are excluded.

#### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start Vite dev server (port 5173) |
| `build` | `npm run build:tokens && vite build --config vite.config.build.ts` | Build tokens, then build library |
| `build:tokens` | `style-dictionary build --config style-dictionary.config.json` | Generate design tokens from JSON |
| `test` | `vitest` | Run tests in watch mode |
| `test:ui` | `vitest --ui` | Run tests with UI |
| `lint` | `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | Lint TypeScript files |
| `format` | `prettier --write "lib/**/*.{ts,tsx,css}"` | Format code |
| `storybook` | `storybook dev -p 6006` | Start Storybook on port 6006 |
| `build-storybook` | `storybook build` | Build static Storybook |
| `type-check` | `tsc --noEmit` | Type check without emitting files |

---

## Build System

### Vite Configuration (Development)

**Location:** `/vite.config.ts`

**Purpose:** Configuration for development server and dev playground

```typescript
{
  plugins: [react()],
  resolve: {
    alias: {
      '@': './lib',
      '@components': './lib/components',
      '@tokens': './lib/tokens',
      '@hooks': './lib/hooks',
      '@utils': './lib/utils'
    }
  },
  server: {
    port: 5173
  }
}
```

**Key Features:**
- Simple React plugin for JSX transformation
- Path aliases for cleaner imports
- Dev server on port 5173
- Used for quick development/testing (references `/src/main.tsx` in index.html)

**Note:** The dev server expects a `src` folder which is currently gitignored. This is for local development playground only.

### Vite Configuration (Build)

**Location:** `/vite.config.build.ts`

**Purpose:** Configuration for building the production library

```typescript
{
  plugins: [
    react(),
    dts({
      include: ['lib'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      rollupTypes: false
    })
  ],
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'ReactComponentLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        assetFileNames: (assetInfo) => {
          if (name && name.endsWith('.css')) {
            return 'styles.css';
          }
          return name || 'assets/[name][extname]';
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true
  }
}
```

**Key Features:**
- **vite-plugin-dts:** Generates TypeScript declaration files
- **Library Mode:** Builds as a library, not an app
- **Dual Format:** Generates both ESM (.mjs) and CJS (.js)
- **External Dependencies:** React is not bundled (peer dependency)
- **CSS Bundling:** All CSS merged into single `styles.css`
- **Source Maps:** Enabled for debugging

**Output:**
- `dist/index.mjs` - ES Module
- `dist/index.js` - CommonJS
- `dist/index.d.ts` - TypeScript types
- `dist/styles.css` - All component styles

---

## TypeScript Configuration

**Location:** `/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./lib/*"],
      "@components/*": ["./lib/components/*"],
      "@tokens/*": ["./lib/tokens/*"],
      "@hooks/*": ["./lib/hooks/*"],
      "@utils/*": ["./lib/utils/*"]
    },
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["lib", "src", ".storybook", "vite.config.ts", "vite.config.build.ts", "vitest.config.ts", "vitest.setup.ts"],
  "exclude": ["node_modules", "dist", "lib/tokens"]
}
```

**Key Features:**
- **Strict Mode:** All strict type checking enabled
- **Modern Target:** ES2020 for optimal compatibility
- **Path Aliases:** Same aliases as Vite for consistency
- **No Emit:** TypeScript only for type checking (Vite handles compilation)
- **Module Resolution:** Uses `bundler` (modern approach for Vite)
- **JSX:** Uses new JSX transform (`react-jsx`)
- **Test Types:** Includes Vitest and Testing Library types

**Excluded:**
- `lib/tokens` - Generated files, don't need type checking

---

## Testing Setup

### Vitest Configuration

**Location:** `/vitest.config.ts`

```typescript
{
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true
  },
  resolve: {
    alias: {
      '@': './lib',
      '@components': './lib/components',
      '@tokens': './lib/tokens',
      '@hooks': './lib/hooks',
      '@utils': './lib/utils'
    }
  }
}
```

**Key Features:**
- **Global Test APIs:** `describe`, `it`, `expect` available globally
- **jsdom:** Browser environment simulation
- **CSS Support:** CSS imports don't break tests
- **Setup File:** Runs before each test
- **Path Aliases:** Same as main config

### Vitest Setup

**Location:** `/vitest.setup.ts`

```typescript
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});
```

**Purpose:**
- Automatically cleanup after each test
- Import jest-dom matchers for better assertions

---

## Code Quality

### ESLint Configuration

**Location:** `/eslint.config.js`

**Format:** ESLint 9 Flat Config

```javascript
[
  // Ignore patterns
  {
    ignores: [
      'dist',
      'node_modules',
      'storybook-static',
      'lib/tokens/*.ts',
      'lib/tokens/*.js',
      'lib/tokens/*.json'
    ]
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: { /* ... */ },
    rules: { /* ... */ }
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: { /* ... */ }
  }
]
```

**Key Rules:**
- **React Hooks:** Enforces rules of hooks
- **React Refresh:** Warns about non-refreshable exports
- **TypeScript:** Warns on unused vars and `any` type
- **Unused Variables:** Warns but allows `_` prefix for intentionally unused

**Ignored:**
- Generated token files
- Build outputs
- node_modules

### Prettier Configuration

**Location:** `/.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**Styling Choices:**
- Semicolons: ✅ Yes
- Quotes: Single quotes
- Line width: 100 characters
- Tabs: Spaces (2)
- Line endings: LF (Unix-style)

---

## Design Token System

### Style Dictionary Configuration

**Location:** `/style-dictionary.config.json`

```json
{
  "source": ["design-tokens/tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "lib/tokens/",
      "files": [{
        "destination": "tokens.css",
        "format": "css/variables"
      }]
    },
    "js": {
      "transformGroup": "js",
      "buildPath": "lib/tokens/",
      "files": [{
        "destination": "tokens.ts",
        "format": "javascript/es6"
      }]
    },
    "json": {
      "transformGroup": "js",
      "buildPath": "lib/tokens/",
      "files": [{
        "destination": "tokens.json",
        "format": "json/flat"
      }]
    },
    "typescript": {
      "transformGroup": "js",
      "buildPath": "lib/tokens/",
      "files": [{
        "destination": "types.d.ts",
        "format": "typescript/es6-declarations"
      }]
    }
  }
}
```

**Input:** `design-tokens/tokens/**/*.json`

**Outputs:**
1. **tokens.css** - CSS custom properties (`:root { --color-primary-500: #0ea5e9; }`)
2. **tokens.ts** - TypeScript/JavaScript constants (`export const ColorPrimary500 = "#0ea5e9";`)
3. **tokens.json** - Flat JSON format
4. **types.d.ts** - TypeScript type declarations

**Token Files:**
- `design-tokens/tokens/colors.json` - Color palette with primary, secondary, neutral, semantic colors
- `design-tokens/tokens/spacing.json` - Spacing scale, border radius, shadows, border width
- `design-tokens/tokens/typography.json` - Font families, sizes, weights, line heights

**Workflow:**
```
Figma → JSON Export → design-tokens/tokens/ → Style Dictionary → lib/tokens/
```

---

## Documentation (Storybook)

### Storybook Main Configuration

**Location:** `/.storybook/main.ts`

```typescript
{
  stories: ['../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': '/lib',
          '@components': '/lib/components',
          '@tokens': '/lib/tokens',
          '@hooks': '/lib/hooks',
          '@utils': '/lib/utils'
        }
      }
    };
  }
}
```

**Key Features:**
- **Story Location:** Looks for `*.stories.tsx` in lib folder
- **React-Vite Framework:** Uses Vite for fast HMR
- **Auto Docs:** Generates documentation from component props
- **Path Aliases:** Matches main Vite config

### Storybook Preview Configuration

**Location:** `/.storybook/preview.ts`

```typescript
{
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' }
      ]
    }
  }
}
```

**Key Features:**
- **Actions:** Auto-detect `onClick`, `onSubmit`, etc.
- **Controls:** Special inputs for colors and dates
- **Backgrounds:** Light/dark theme switching
- **Token Import:** Imports `lib/tokens/tokens.css` globally

---

## Git Configuration

### .gitignore

**Location:** `/.gitignore`

**Key Exclusions:**
```
# Dependencies
node_modules
src                  # Dev playground (local only)

# Production
dist
build
storybook-static

# Generated files
lib/tokens/tokens.css
lib/tokens/tokens.ts
lib/tokens/tokens.json
lib/tokens/types.d.ts

# IDE
.vscode/*
.idea
```

**Important:**
- `src` folder is gitignored (for local dev playground)
- Generated tokens are gitignored (regenerated in CI/CD)

### .gitattributes

**Location:** `/.gitattributes`

⚠️ **Issue Detected:** This file contains instructions/comments instead of actual gitattributes configuration. See [Questions/Issues](#questionsissues) section.

---

## Path Aliases

Consistent across all configuration files:

| Alias | Path | Purpose |
|-------|------|---------|
| `@` | `./lib` | Root of library source |
| `@components` | `./lib/components` | All components |
| `@tokens` | `./lib/tokens` | Generated design tokens |
| `@hooks` | `./lib/hooks` | Custom React hooks |
| `@utils` | `./lib/utils` | Utility functions |

**Usage Example:**
```typescript
import { Button } from '@components/Button';
import { tokens } from '@tokens/tokens';
```

**Configured In:**
- `vite.config.ts`
- `vite.config.build.ts`
- `vitest.config.ts`
- `tsconfig.json`
- `.storybook/main.ts`

---

## Development Workflow

### Local Development (Dev Playground)

**Setup:**
1. Create a `src` folder (gitignored)
2. Create `src/main.tsx` with test code
3. Run `npm run dev`
4. View at http://localhost:5173

**Purpose:** Quick testing without Storybook overhead

**Note:** The `index.html` file references `/src/main.tsx` for this purpose

### Component Development (Storybook)

**Recommended Workflow:**
1. Run `npm run storybook`
2. Create component in `lib/components/`
3. Create `.stories.tsx` file
4. View in Storybook with hot reload

### Testing

**Workflow:**
1. Write component: `ComponentName.tsx`
2. Write test: `ComponentName.test.tsx`
3. Run: `npm test` (watch mode)
4. Or: `npm run test:ui` (UI mode)

### Building

**Full Build:**
```bash
npm run build  # Builds tokens + library
```

**Build Steps:**
1. `build:tokens` - Generates tokens from JSON
2. Vite build with `vite.config.build.ts`
3. Outputs to `dist/`

### Publishing

**Workflow:**
```bash
npm run build
npm run test
npm run type-check
npm run lint
npm version [patch|minor|major]
npm publish
```

---

## Summary of Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 18.3.1 (supports 18 & 19) |
| **Language** | TypeScript | 5.7.2 |
| **Build Tool** | Vite | 6.4.1 |
| **Testing** | Vitest | 2.1.8 |
| **Test Utils** | React Testing Library | 16.0.1 |
| **Documentation** | Storybook | 8.4.7 |
| **Tokens** | Style Dictionary | 4.2.0 |
| **Linting** | ESLint | 9.17.0 |
| **Formatting** | Prettier | 3.4.2 |

All versions are latest as of November 2024/January 2025.

---

## Configuration Consistency

✅ **Path aliases** - Consistent across all configs
✅ **TypeScript** - Strict mode everywhere
✅ **Build formats** - Proper ESM/CJS dual output
✅ **Tree-shaking** - Side effects properly marked
✅ **Modern tooling** - All latest versions
✅ **Type safety** - Full TypeScript coverage

---

## Questions/Issues

See [CONFIGURATION_QUESTIONS.md] for items requiring clarification.
