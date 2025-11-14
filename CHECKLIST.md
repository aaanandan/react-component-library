# ✅ Setup Checklist

Use this checklist to get your component library up and running!

## 📋 Initial Setup (First 30 Minutes)

### Phase 1: Basic Setup (10 minutes)

- [ ] Extract the project files to your desired location
- [ ] Open terminal in the `react-component-library` folder
- [ ] Run `npm install` (this will take a few minutes)
- [ ] Run `npm run build:tokens` to generate design tokens
- [ ] Run `npm run storybook` to verify everything works
  - Should open at http://localhost:6006
  - You should see the Button component

### Phase 2: Customization (10 minutes)

- [ ] Update `package.json`:
  - [ ] Change `name` from `@aaanandan/react-component-library` to your actual package name
  - [ ] Update `author` field
  - [ ] Update `description`
  - [ ] Update `repository` URL
  - [ ] Update `license` if needed

- [ ] Update `README.md`:
  - [ ] Replace `@aaanandan` with your org/username
  - [ ] Update repository links
  - [ ] Update documentation links

### Phase 3: Design Tokens (10 minutes)

Choose one approach:

**Option A: Use Sample Tokens (Quick)**
- [ ] Keep the existing sample tokens in `design-tokens/tokens/`
- [ ] Customize the color values in `colors.json`
- [ ] Adjust spacing in `spacing.json`
- [ ] Modify typography in `typography.json`
- [ ] Run `npm run build:tokens`

**Option B: Connect to Figma (Later)**
- [ ] Skip for now, come back to this after basic setup
- [ ] Follow `DESIGN_TOKENS_GUIDE.md` when ready

## 🎨 Your First Component (Next 30 Minutes)

### Step 1: Explore the Example
- [ ] Open `lib/components/Button/Button.tsx`
- [ ] Read through the component code
- [ ] Check `Button.css` to see how tokens are used
- [ ] Look at `Button.test.tsx` for testing patterns
- [ ] Review `Button.stories.tsx` for documentation patterns

### Step 2: Run Tests
- [ ] Run `npm test`
- [ ] Verify all Button tests pass
- [ ] Open `npm run test:ui` to see the test UI

### Step 3: Try Making Changes
- [ ] In Storybook, modify the Button component
- [ ] Edit `Button.tsx` and see hot reload in action
- [ ] Change a design token in `design-tokens/tokens/colors.json`
- [ ] Run `npm run build:tokens`
- [ ] Refresh Storybook to see token changes

## 🚀 Creating Your Second Component (1 Hour)

Let's create a simple Badge component:

### Step 1: Create Files
- [ ] Create folder: `lib/components/Badge/`
- [ ] Create `Badge.tsx`
- [ ] Create `Badge.css`
- [ ] Create `Badge.test.tsx`
- [ ] Create `Badge.stories.tsx`
- [ ] Create `index.ts`

### Step 2: Implement Badge
```tsx
// Badge.tsx - Simple example
import React from 'react';
import './Badge.css';

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'info', 
  children 
}) => {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
};
```

### Step 3: Add Styles
```css
/* Badge.css */
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-full);
}

.badge--success {
  background-color: var(--color-success);
  color: white;
}

.badge--warning {
  background-color: var(--color-warning);
  color: white;
}

.badge--error {
  background-color: var(--color-error);
  color: white;
}

.badge--info {
  background-color: var(--color-info);
  color: white;
}
```

### Step 4: Write Tests
- [ ] Copy `Button.test.tsx` as a template
- [ ] Adapt tests for Badge component
- [ ] Run `npm test` to verify

### Step 5: Create Stories
- [ ] Copy `Button.stories.tsx` as a template
- [ ] Create stories for each Badge variant
- [ ] Check in Storybook

### Step 6: Export Component
- [ ] Add to `lib/components/Badge/index.ts`:
```tsx
export { Badge } from './Badge';
export type { BadgeProps } from './Badge';
```

- [ ] Add to `lib/index.ts`:
```tsx
export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';
```

### Step 7: Verify
- [ ] Restart Storybook
- [ ] Check that Badge appears in Storybook
- [ ] All tests still pass
- [ ] Build succeeds: `npm run build`

## 📦 Preparing for First Release (30 Minutes)

### Version 0.1.0 Checklist

- [ ] **Code Quality**
  - [ ] Run `npm run lint` - no errors
  - [ ] Run `npm run format` - code formatted
  - [ ] Run `npm test` - all tests pass
  - [ ] Run `npm run type-check` - no type errors

- [ ] **Build**
  - [ ] Run `npm run build` - succeeds
  - [ ] Check `dist/` folder exists
  - [ ] Verify `dist/index.js` and `dist/index.mjs` exist
  - [ ] Verify `dist/index.d.ts` exists

- [ ] **Documentation**
  - [ ] README.md is updated with your info
  - [ ] QUICK_START.md makes sense for your library
  - [ ] Storybook builds: `npm run build-storybook`

- [ ] **Package.json**
  - [ ] `version` is "0.1.0"
  - [ ] `name` is correct
  - [ ] `author` is correct
  - [ ] `repository` is correct
  - [ ] `peerDependencies` are appropriate

- [ ] **Git**
  - [ ] Initialize git: `git init`
  - [ ] Add files: `git add .`
  - [ ] First commit: `git commit -m "feat: initial component library setup"`
  - [ ] Add remote: `git remote add origin <your-repo-url>`
  - [ ] Push: `git push -u origin main`

## 🌐 Publishing to npm (First Time)

### Prerequisites
- [ ] Create npm account at https://www.npmjs.com
- [ ] Verify email
- [ ] Login: `npm login`

### Publishing
- [ ] Ensure version is correct in `package.json`
- [ ] Build: `npm run build`
- [ ] Dry run: `npm publish --dry-run`
- [ ] Review what will be published
- [ ] Publish: `npm publish --access public`
- [ ] Verify at https://www.npmjs.com/package/<your-package-name>

### Post-Publish
- [ ] Test installation in a new project:
  ```bash
  npx create-vite@latest test-app --template react-ts
  cd test-app
  npm install @aaanandan/react-component-library
  ```
- [ ] Import and use a component
- [ ] Verify it works!

## 🎯 Next Steps

### Immediate (This Week)
- [ ] Read through all documentation files
- [ ] Build 2-3 more components
- [ ] Set up CI/CD (GitHub Actions)
- [ ] Deploy Storybook to GitHub Pages or Netlify

### Short Term (This Month)
- [ ] Connect to Figma for real design tokens
- [ ] Build 10+ components
- [ ] Add more complex components (forms, modals)
- [ ] Gather feedback from team
- [ ] Create CHANGELOG.md

### Long Term (This Quarter)
- [ ] Establish regular release cadence
- [ ] Set up automated testing
- [ ] Create contribution guidelines
- [ ] Build a showcase website
- [ ] Add more advanced features (theming, dark mode)

## 🆘 Troubleshooting

### npm install fails
- [ ] Check Node.js version (need 18+)
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete node_modules and try again

### Storybook won't start
- [ ] Check port 6006 is free
- [ ] Try: `npm run storybook -- --port 6007`
- [ ] Check for errors in terminal

### Build fails
- [ ] Run `npm run build:tokens` first
- [ ] Check for TypeScript errors: `npm run type-check`
- [ ] Delete `dist/` and try again

### Tests failing
- [ ] Check if tokens are generated: `ls lib/tokens/`
- [ ] Run `npm run build:tokens`
- [ ] Try `npm test -- --run` for single run

## ✅ Success Criteria

You'll know you're ready when:

- [ ] ✅ Storybook runs and shows your components
- [ ] ✅ All tests pass
- [ ] ✅ Build completes without errors
- [ ] ✅ You can import components in a test app
- [ ] ✅ Design tokens are working in your components
- [ ] ✅ Documentation is up to date

## 📚 Resources at Your Fingertips

When stuck, refer to:
- **QUICK_START.md** - Quick reference
- **README.md** - Complete docs
- **ARCHITECTURE.md** - How it works
- **DESIGN_TOKENS_GUIDE.md** - Figma workflow
- **CONSUMING_GUIDE.md** - Usage examples
- **Button component** - Working example

## 🎉 You're Ready!

Once you've checked off the "Initial Setup" and "Your First Component" sections, you're ready to start building!

**Remember:** Start simple, build incrementally, and always test!

---

**Happy Building! 🚀**