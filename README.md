# React Component Library

A modern, TypeScript-based React component library with design tokens and a robust design system.

## 🚀 Features

- ⚛️ **React 18/19** with TypeScript 5.7
- 🎨 **Design Tokens** from Figma using Style Dictionary
- 📦 **Vite 6** for fast builds and optimal bundling
- 📖 **Storybook 8** for component development and documentation
- ✅ **Vitest** with React Testing Library
- 🎯 **ESLint & Prettier** for code quality
- 🔄 **CSS Custom Properties** for theming
- 📘 **Full TypeScript** support with type definitions
- 🌳 **Tree-shakeable** ESM and CJS builds (only bundle what you use!)
- ✨ **Automatic CSS injection** - CSS loads automatically with components

## 📦 Installation

```bash
npm install @aaanandan/react-component-library
# or
yarn add @aaanandan/react-component-library
# or
pnpm add @aaanandan/react-component-library
```

## 🎯 Usage

### Basic Usage (Automatic CSS Loading) ✨

```tsx
import { Button } from '@aaanandan/react-component-library';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me!
    </Button>
  );
}
```

CSS is automatically loaded when you import components! No manual CSS import needed.

### Alternative: Manual CSS Import

If you prefer to load all styles at once:

```tsx
import '@aaanandan/react-component-library/styles';
import { Button } from '@aaanandan/react-component-library';

function App() {
  return <Button variant="primary">Click me!</Button>;
}
```

**See [TREE_SHAKING_AND_CSS_GUIDE.md](./TREE_SHAKING_AND_CSS_GUIDE.md) for detailed explanation of CSS loading strategies.**

### Using Design Tokens

The library exports design tokens that you can use in your own components:

```tsx
import { tokens } from '@aaanandan/react-component-library/tokens';

// Access token values programmatically
const primaryColor = tokens.color.primary[600];
```

Or use CSS custom properties directly:

```css
.my-custom-component {
  background-color: var(--color-primary-600);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build design tokens:

```bash
npm run build:tokens
```

### Available Scripts

- `npm run dev` - Start Vite development server (dev playground at `src/`)
- `npm run build` - Build the library for production
- `npm run build:tokens` - Generate tokens from design token JSON files
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier
- `npm run storybook` - Start Storybook on port 6006
- `npm run build-storybook` - Build Storybook for production
- `npm run type-check` - Run TypeScript type checking

## 📚 Design Tokens

Design tokens are the single source of truth for design decisions. They are defined in `design-tokens/tokens/*.json` and transformed into multiple formats using Style Dictionary.

### Token Categories

- **Colors**: Brand colors, semantic colors, neutrals
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Corner radius values
- **Shadows**: Box shadow presets

### Syncing from Figma

To sync design tokens from Figma:

1. Export your Figma variables using [Tokens Studio](https://tokens.studio/) plugin
2. Place the JSON files in `design-tokens/tokens/`
3. Run `npm run build:tokens`

The tokens will be automatically transformed into:
- CSS Custom Properties (`lib/tokens/tokens.css`)
- TypeScript constants (`lib/tokens/tokens.ts`)
- JSON format (`lib/tokens/tokens.json`)
- TypeScript types (`lib/tokens/types.d.ts`)

## 📖 Component Documentation

View the component documentation and live examples in Storybook:

```bash
npm run storybook
```

## 🏗️ Project Structure

```
react-component-library/
├── design-tokens/           # Source design tokens (from Figma)
│   └── tokens/
│       ├── colors.json
│       ├── typography.json
│       └── spacing.json
├── lib/                     # Library source code
│   ├── components/          # React components
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.css
│   │       ├── Button.test.tsx
│   │       ├── Button.stories.tsx
│   │       └── index.ts
│   ├── tokens/              # Generated tokens (committed to repo)
│   │   ├── tokens.css
│   │   ├── tokens.ts
│   │   └── tokens.json
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── index.ts             # Main entry point
├── src/                     # Dev playground for quick testing
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── .storybook/              # Storybook configuration
├── dist/                    # Build output (auto-generated)
└── package.json
```

## 🧪 Testing

Tests are written using Vitest and React Testing Library:

```bash
npm test
```

For UI mode with coverage:

```bash
npm run test:ui
```

## 📦 Building

Build the library for production:

```bash
npm run build
```

This will:
1. Generate design tokens from JSON
2. Build the library with Vite
3. Generate TypeScript declarations
4. Output to `dist/` directory

## 📤 Publishing

Before publishing, ensure:

1. Update version in `package.json`
2. Run `npm run build`
3. Run `npm test`
4. Run `npm run type-check`

Then publish to npm:

```bash
npm publish
```

## 🎨 Consuming the Library

### In a React Project

```tsx
import { Button } from '@aaanandan/react-component-library';
import '@aaanandan/react-component-library/styles';

export default function App() {
  return (
    <div>
      <Button variant="primary">Primary Action</Button>
      <Button variant="outline">Secondary Action</Button>
    </div>
  );
}
```

### With Next.js

In your `_app.tsx` or `layout.tsx`:

```tsx
import '@aaanandan/react-component-library/styles';
```

### With Vite

Import in your main entry file:

```tsx
import '@aaanandan/react-component-library/styles';
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Update documentation
5. Submit a pull request

## 📄 License


## 🔗 Links

- [Documentation](http://localhost:6006/?path=/docs/components-button--docs)
- [GitHub](https://github.com/aaanandan/react-component-library)
- [npm](https://www.npmjs.com/package/@aaanandan/react-component-library)