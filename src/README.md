# Dev Playground

This folder contains a development playground for quick testing and experimentation with your components.

## Purpose

The dev playground allows you to:
- Test components in a real React app environment
- Quickly experiment with component APIs
- Debug issues without using Storybook
- Prototype new features

## Usage

### Start the dev server:
```bash
npm run dev
```

This will start Vite dev server at http://localhost:5173

### Edit App.tsx

Modify `src/App.tsx` to test your components:

```tsx
import { Button, Badge, Card } from '@/components';

function App() {
  return (
    <div>
      <Button variant="primary">Test Button</Button>
      {/* Add your test code here */}
    </div>
  );
}
```

## Features

- **Hot Module Replacement** - Changes reload instantly
- **Path Aliases** - Use `@/` imports just like in the library
- **Design Tokens** - Full access to CSS custom properties
- **TypeScript** - Full type checking and intellisense

## When to Use

**Use Dev Playground for:**
- Quick component testing
- Debugging specific issues
- Prototyping new components
- Testing interactions between components

**Use Storybook for:**
- Component documentation
- Visual regression testing
- Showing all component variants
- Sharing with designers/stakeholders

## Important Notes

1. **This folder is gitignored** - Your local changes won't be committed
2. **Not for production** - This is development only
3. **Lightweight** - Just add what you need to test
4. **Clean slate** - Feel free to experiment freely

## Example Workflow

1. Create a new component in `lib/components/`
2. Import and test it in `src/App.tsx`
3. Iterate quickly with hot reload
4. Once happy, create Storybook stories
5. Write tests

## Path Aliases Available

- `@/` → `lib/`
- `@components/` → `lib/components/`
- `@tokens/` → `lib/tokens/`
- `@hooks/` → `lib/hooks/`
- `@utils/` → `lib/utils/`

Happy coding! 🚀
