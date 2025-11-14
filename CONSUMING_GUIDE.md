# Consuming the Component Library

Guide for teams using this component library in their projects.

## 📦 Installation

### NPM

```bash
npm install @yourcompany/react-component-library
```

### Yarn

```bash
yarn add @yourcompany/react-component-library
```

### PNPM

```bash
pnpm add @yourcompany/react-component-library
```

## 🚀 Quick Start

### 1. Import Styles (Required)

You need to import the component library styles once in your application:

#### In a Create React App / Vite project

```tsx
// src/main.tsx or src/index.tsx
import '@yourcompany/react-component-library/styles';
import App from './App';
```

#### In Next.js (App Router)

```tsx
// app/layout.tsx
import '@yourcompany/react-component-library/styles';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

#### In Next.js (Pages Router)

```tsx
// pages/_app.tsx
import '@yourcompany/react-component-library/styles';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### 2. Use Components

```tsx
import { Button } from '@yourcompany/react-component-library';

function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </div>
  );
}
```

## 🎨 Using Design Tokens

### Option 1: CSS Custom Properties (Recommended)

Use tokens directly in your CSS:

```css
.my-component {
  background-color: var(--color-primary-600);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
}
```

### Option 2: Import Token Values

Import tokens as JavaScript/TypeScript values:

```tsx
import { tokens } from '@yourcompany/react-component-library/tokens';

const MyComponent = () => (
  <div
    style={{
      backgroundColor: tokens.ColorPrimary600,
      padding: tokens.Spacing4,
    }}
  >
    Content
  </div>
);
```

### Option 3: Use in styled-components / Emotion

```tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--color-primary-600);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);

  &:hover {
    background-color: var(--color-primary-700);
  }
`;
```

## 📱 Framework-Specific Guides

### React (Vite)

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@yourcompany/react-component-library/styles';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Next.js 14+ (App Router)

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import '@yourcompany/react-component-library/styles';
import './globals.css';

export const metadata: Metadata = {
  title: 'My App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Remix

```tsx
// app/root.tsx
import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react';
import styles from '@yourcompany/react-component-library/styles';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

### Gatsby

```tsx
// gatsby-browser.js
import '@yourcompany/react-component-library/styles';
```

## 🎯 TypeScript Support

The library is fully typed. Import types for props:

```tsx
import { Button, ButtonProps } from '@yourcompany/react-component-library';

// Extend button props
interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

const MyButton: React.FC<MyButtonProps> = ({ customProp, ...buttonProps }) => {
  return <Button {...buttonProps} />;
};
```

## 🎨 Theming & Customization

### Override Design Tokens

You can override tokens in your own CSS:

```css
:root {
  /* Override primary color */
  --color-primary-600: #your-brand-color;
  
  /* Override spacing */
  --spacing-4: 1.25rem;
  
  /* Override border radius */
  --border-radius-md: 0.5rem;
}
```

### Custom Component Styles

Override component styles with higher specificity:

```css
/* In your own CSS file */
.btn--primary {
  background: linear-gradient(to right, #667eea, #764ba2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn--primary:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
```

## 📦 Tree-Shaking

The library is tree-shakeable. Only import what you need:

```tsx
// Good - only Button code is included
import { Button } from '@yourcompany/react-component-library';

// Avoid - imports everything
import * as ComponentLib from '@yourcompany/react-component-library';
```

## 🔧 Build Configuration

### Vite

Vite automatically handles the library. No additional configuration needed!

### Webpack

If you're using Webpack, ensure it can handle CSS modules:

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### Next.js

Next.js handles CSS imports automatically. Just import the styles as shown above.

## 🧪 Testing with the Library

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  moduleNameMapper: {
    '@yourcompany/react-component-library/styles': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@yourcompany/react-component-library)/)',
  ],
};
```

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    css: true,
  },
});
```

## 🎭 Using with Storybook

If your project uses Storybook, import the library styles in preview:

```tsx
// .storybook/preview.tsx
import '@yourcompany/react-component-library/styles';

const preview = {
  // ... your config
};

export default preview;
```

## 📚 Available Components

### Button

```tsx
<Button variant="primary" size="md" loading={false} disabled={false} fullWidth={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode

### More Components Coming Soon!

Check the [Storybook documentation](https://your-storybook-url) for the full component list.

## 🐛 Common Issues

### Issue: Styles not applying

**Solution:** Make sure you've imported the styles:

```tsx
import '@yourcompany/react-component-library/styles';
```

### Issue: TypeScript errors

**Solution:** Ensure you have the correct TypeScript version:

```bash
npm install -D typescript@^5.0.0
```

### Issue: Tree-shaking not working

**Solution:** Make sure you're using ES modules and named imports:

```tsx
// ✅ Good
import { Button } from '@yourcompany/react-component-library';

// ❌ Bad
const ComponentLib = require('@yourcompany/react-component-library');
```

### Issue: CSS variable conflicts

**Solution:** The library uses namespaced CSS variables. If you have conflicts, check for duplicate `:root` declarations.

## 📖 More Resources

- [Component Documentation (Storybook)](https://your-storybook-url)
- [GitHub Repository](https://github.com/yourcompany/react-component-library)
- [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md)
- [npm Package](https://www.npmjs.com/package/@yourcompany/react-component-library)

## 💬 Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/yourcompany/react-component-library/issues)
- Join our [Slack channel](#)
- Contact the design system team

## 🔄 Keeping Up to Date

Check for updates regularly:

```bash
npm outdated @yourcompany/react-component-library
```

Update to the latest version:

```bash
npm update @yourcompany/react-component-library
```