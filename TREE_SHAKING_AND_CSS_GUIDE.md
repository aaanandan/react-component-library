# Tree-Shaking & CSS Loading Guide

Complete guide to understanding tree-shaking and CSS loading strategies in this component library.

---

## 🌳 What is Tree-Shaking?

**Tree-shaking** is a build optimization that removes unused code from your final bundle, resulting in smaller file sizes and faster load times.

### How It Works

**Analogy:** Think of tree-shaking like shaking a tree to remove dead branches - only the "live" (used) code remains.

**Example:**

```tsx
// Component library exports 10 components
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Modal } from './components/Modal';
export { Table } from './components/Table';
// ... 6 more components
```

**User only imports Button:**
```tsx
import { Button } from '@aaanandan/react-component-library';
```

**With Tree-Shaking (ESM):** ✅
- Only `Button` code is bundled
- `Card`, `Modal`, `Table`, etc. are **removed**
- User's bundle: **~3KB** instead of **~30KB**

**Without Tree-Shaking (old CJS):** ❌
- All 10 components are bundled
- User's bundle: **~30KB** (even though they only use Button)

### Why ESM Enables Tree-Shaking

**ES Modules (ESM)** use static `import`/`export`:
```tsx
import { Button } from './Button';  // Static - analyzed at build time
export { Button };
```

**Benefits:**
- Imports are **static** (known at build time)
- Bundlers can trace exactly what's used
- Unused exports can be safely removed

**CommonJS (CJS)** uses dynamic `require()`:
```js
const Button = require('./Button');  // Dynamic - only known at runtime
module.exports = { Button };
```

**Limitations:**
- Requires are **dynamic** (can be conditional)
- Harder to analyze
- Less aggressive optimization

### Real-World Impact

**Example React App using this library:**

| What User Imports | Without Tree-Shaking | With Tree-Shaking | Savings |
|-------------------|---------------------|-------------------|---------|
| Just Button | 50 KB | 5 KB | **90%** |
| Button + Card | 50 KB | 10 KB | **80%** |
| All 10 components | 50 KB | 50 KB | 0% |

---

## 📦 CSS Loading Strategies

### The CSS Challenge

**Problem:** CSS doesn't tree-shake like JavaScript!

If you bundle all CSS into one file, users load CSS for components they don't use:

```css
/* styles.css - 100KB */
.button { ... }      /* Used ✅ */
.card { ... }        /* Not imported ❌ */
.modal { ... }       /* Not imported ❌ */
.table { ... }       /* Not imported ❌ */
/* ... etc */
```

### Solution: Automatic CSS Injection

This library uses **`vite-plugin-lib-inject-css`** to automatically inject CSS when components are imported.

---

## ✨ How It Works Now (Automatic CSS Injection)

### Current Build Configuration

```typescript
// vite.config.build.ts
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    libInjectCss(), // 🎯 Automatically injects CSS
  ],
  build: {
    cssCodeSplit: true, // 🎯 Enable per-component CSS splitting
  }
});
```

### What Happens During Build

1. **Each component's CSS is identified**
   ```
   lib/components/Button/Button.css → dist/styles.css
   lib/tokens/tokens.css → dist/styles.css
   ```

2. **CSS import is injected into the bundle**
   ```js
   // dist/index.mjs
   import './styles.css';  // ← Auto-injected!
   const Button = ...
   ```

3. **When user imports component, CSS loads automatically**

### User Experience

**Before (Manual Import):** ❌
```tsx
import { Button } from '@aaanandan/react-component-library';
import '@aaanandan/react-component-library/styles'; // ❌ Must remember!
```

**Now (Automatic):** ✅
```tsx
import { Button } from '@aaanandan/react-component-library';
// CSS loads automatically! ✨
```

---

## 🎯 CSS Loading Options for Users

Users have **two options** for loading CSS:

### Option 1: Automatic (Recommended) ✅

**Just import components - CSS loads automatically:**

```tsx
import { Button } from '@aaanandan/react-component-library';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

**What happens:**
1. User imports `Button`
2. Bundle includes Button JS + CSS import
3. CSS automatically loads when Button module loads
4. **No manual CSS import needed!**

**Pros:**
- ✅ Zero configuration
- ✅ Can't forget to import CSS
- ✅ Works with tree-shaking
- ✅ CSS only loads for imported components

**Cons:**
- ⚠️ CSS loaded via JavaScript (minor runtime cost)

---

### Option 2: Manual Import (Optional)

**Import all styles once in your app:**

```tsx
// main.tsx or App.tsx
import '@aaanandan/react-component-library/styles';
import { Button, Card, Modal } from '@aaanandan/react-component-library';

function App() {
  return (
    <>
      <Button>Click</Button>
      <Card>Content</Card>
      <Modal>Popup</Modal>
    </>
  );
}
```

**Pros:**
- ✅ CSS loads once via `<link>` tag
- ✅ Better for many components
- ✅ Cached separately from JS

**Cons:**
- ❌ Loads ALL component styles (even unused ones)
- ❌ Not tree-shakeable
- ❌ Must remember to import

---

## 🔍 Current Behavior (Single Component)

Since the library currently has **only one component (Button)**, both options behave similarly:

```
styles.css contains:
├── Design tokens (colors, spacing, typography)
└── Button component styles
```

**Total CSS size:** ~1.4KB (all tokens + Button)

### As More Components Are Added

When you add more components (Card, Modal, Table, etc.):

**With Automatic Injection:**
```tsx
// User imports only Button
import { Button } from '@aaanandan/react-component-library';
// Loads: tokens.css + Button.css (~2KB)
```

```tsx
// User imports Button + Card
import { Button, Card } from '@aaanandan/react-component-library';
// Loads: tokens.css + Button.css + Card.css (~4KB)
```

**With Manual Import:**
```tsx
// User imports styles manually
import '@aaanandan/react-component-library/styles';
import { Button } from '@aaanandan/react-component-library';
// Loads: ALL styles (~20KB) even if only using Button ❌
```

---

## 💡 Best Practices

### For Library Maintainers (You)

1. ✅ **Keep CSS modular** - Each component has its own CSS file
2. ✅ **Use design tokens** - Shared styles in `lib/tokens/tokens.css`
3. ✅ **Keep `cssCodeSplit: true`** - Enables per-component splitting
4. ✅ **Keep `libInjectCss()`** - Automatic CSS injection

### For Library Consumers (Users)

**If using 1-3 components:**
```tsx
// Just import components - automatic CSS ✅
import { Button } from '@aaanandan/react-component-library';
```

**If using many components (5+):**
```tsx
// Manual import might be better - single CSS file
import '@aaanandan/react-component-library/styles';
import { Button, Card, Modal, Table, Form } from '@aaanandan/react-component-library';
```

---

## 📊 Bundle Size Comparison

### Example: User builds app with Button only

**Before (no tree-shaking):**
```
app.js:  100 KB (all 10 components)
app.css: 20 KB  (all styles)
Total:   120 KB
```

**After (with tree-shaking + auto CSS):**
```
app.js:  10 KB (Button only)
app.css: 2 KB  (tokens + Button only)
Total:   12 KB  ← 90% smaller! 🎉
```

---

## 🧪 Testing Tree-Shaking

### How to Verify It's Working

1. **Build your consumer app:**
   ```bash
   npm run build
   ```

2. **Analyze bundle:**
   ```bash
   npx vite-bundle-visualizer
   # or
   npm run build -- --mode production
   ```

3. **Check that unused components are NOT in bundle**

### Example Test

**Consumer app code:**
```tsx
// Only imports Button
import { Button } from '@aaanandan/react-component-library';

export default function App() {
  return <Button>Test</Button>;
}
```

**Expected bundle:**
- ✅ Should include: Button component code
- ✅ Should include: Button CSS
- ✅ Should include: Design tokens CSS
- ❌ Should NOT include: Card, Modal, Table (if they exist)
- ❌ Should NOT include: Their CSS

---

## 🔧 Troubleshooting

### CSS not loading

**Problem:**
```tsx
import { Button } from '@aaanandan/react-component-library';
// Button has no styles 😞
```

**Solution:**
Either library wasn't built correctly, or bundler is stripping CSS imports.

**Fix:**
```tsx
// Manually import styles as fallback
import '@aaanandan/react-component-library/styles';
import { Button } from '@aaanandan/react-component-library';
```

### All components in bundle (no tree-shaking)

**Problem:** Bundle includes all components even though only Button is imported.

**Common causes:**
1. Using CommonJS (`require()`) instead of ESM
2. Bundler not configured for tree-shaking
3. Importing from wrong path

**Solution:**
```tsx
// ✅ Good - tree-shakeable
import { Button } from '@aaanandan/react-component-library';

// ❌ Bad - might import everything
const { Button } = require('@aaanandan/react-component-library');

// ❌ Bad - imports everything
import * as ComponentLib from '@aaanandan/react-component-library';
```

---

## 📚 Summary

| Feature | Status | Benefit |
|---------|--------|---------|
| **Tree-Shaking (JS)** | ✅ Enabled | Only import what you use |
| **Auto CSS Injection** | ✅ Enabled | CSS loads automatically |
| **Per-Component CSS** | ✅ Ready | Future-proof for more components |
| **Manual CSS Import** | ✅ Available | Optional for bulk usage |
| **ESM + CJS Builds** | ✅ Both | Maximum compatibility |
| **Source Maps** | ✅ Enabled | Easier debugging |

**Result:** Users get the smallest possible bundle size automatically! 🎉

---

## 🚀 Next Steps

1. **Add more components** - Tree-shaking benefits increase
2. **Monitor bundle sizes** - Use bundle analyzers
3. **Document for users** - Show both CSS loading options
4. **Test in real apps** - Verify tree-shaking works

---

## Related Files

- `vite.config.build.ts:11` - CSS injection configuration
- `vite.config.build.ts:52` - CSS code splitting enabled
- `package.json:15-17` - Side effects marking (CSS files)
- `package.json:21-30` - Export configuration
