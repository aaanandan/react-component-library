# Configuration Questions & Issues

This document lists configuration items that need clarification or potential issues found during the review.

**Status:** ✅ All issues have been resolved! See resolutions below.

---

## Critical Issues (✅ RESOLVED)

### 1. `.gitattributes` File Content ✅

**Issue:** The `.gitattributes` file contains documentation/instructions instead of actual gitattributes configuration.

**Resolution:** ✅ FIXED - Cleaned up the file to contain only proper gitattributes configuration.

**Current Content:**
```
# Create .gitattributes
New-Item -ItemType File -Path .gitattributes
```

### **Add this content to `.gitattributes`:**
```
# Auto detect text files and normalize line endings to LF
* text=auto eol=lf
...
```

**Question:** Should this file be cleaned up to contain only the actual gitattributes configuration without the PowerShell commands and markdown formatting?

**Recommended Fix:**
```
# Auto detect text files and normalize line endings to LF
* text=auto eol=lf

# Explicitly declare text files
*.ts text eol=lf
*.tsx text eol=lf
*.js text eol=lf
*.jsx text eol=lf
*.json text eol=lf
*.md text eol=lf
*.css text eol=lf
*.html text eol=lf
*.yml text eol=lf
*.yaml text eol=lf

# Denote binary files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary
```

---

## Configuration Clarifications (✅ RESOLVED)

### 2. Dev Playground (`src` folder) ✅

**Current State:**
- `index.html` references `/src/main.tsx`
- `src` folder is in `.gitignore`
- `src` is included in `tsconfig.json`
- No actual `src` folder exists in the repository

**Questions:**
1. Is the dev playground feature (using `src` folder) intentional and should be documented?
2. Should we create a `src` folder template with a basic setup example?
3. Or should we remove references to `src` from `index.html` and `tsconfig.json`?

**Current User Experience:**
- Running `npm run dev` will fail because `/src/main.tsx` doesn't exist
- Users might be confused about the purpose of the dev server vs Storybook

**Resolution:** ✅ IMPLEMENTED - Created dev playground template with:
- `src/main.tsx` - Entry point
- `src/App.tsx` - Example component with Button demos
- `src/App.css` - Styled examples using design tokens
- `src/README.md` - Documentation for dev playground
- Updated README.md and QUICK_START.md to document the feature
- Removed `src` from `.gitignore` so template is committed

### 3. Generated Tokens in Git ✅

**Current State:**
- Generated token files (`lib/tokens/*.ts`, `lib/tokens/*.css`, etc.) are in `.gitignore`
- This means they need to be generated in CI/CD and locally

**Questions:**
1. Is this intentional? (generating tokens in CI/CD)
2. Or should generated tokens be committed to the repository for easier setup?

**Trade-offs:**
- **Gitignored (current):**
  - ✅ Keeps repo clean
  - ✅ Forces regeneration from source
  - ❌ Requires `npm run build:tokens` before most operations
  - ❌ CI/CD must generate them

- **Committed:**
  - ✅ Works immediately after clone
  - ✅ Simpler setup
  - ✅ Build artifacts visible in PRs
  - ❌ Potential merge conflicts
  - ❌ Larger repo size

**Resolution:** ✅ IMPLEMENTED - Generated tokens are now committed to the repository:
- Removed token files from `.gitignore`
- Generated tokens with `npm run build:tokens`
- Tokens are now committed and will be in the repo
- Developers can start immediately without generating tokens first
- Note updated in PROJECT_CONFIGURATION.md

### 4. Package Files Field ✅

**Current Configuration:**
```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

**Question:** Should `lib/styles.d.ts` be included in the published package?

**Current State:**
- `lib/styles.d.ts` is referenced in `package.json` exports
- But `lib` folder is not in the `files` array
- This might cause issues for TypeScript consumers importing styles

**Potential Issue:**
```typescript
// Consumer code
import '@aaanandan/react-component-library/styles';
// TypeScript might not find lib/styles.d.ts
```

**Resolution:** ✅ FIXED - Added `lib/styles.d.ts` to package.json files array:
```json
{
  "files": ["dist", "lib/styles.d.ts", "README.md", "LICENSE"]
}
```

### 5. Vite Build - Asset File Naming ✅

**Current Code (vite.config.build.ts:40-46):**
```typescript
assetFileNames: (assetInfo) => {
  const name = assetInfo.names && assetInfo.names[0];
  // Rename CSS to styles.css for cleaner import
  if (name && name.endsWith('.css')) {
    return 'styles.css';
  }
  return name || 'assets/[name][extname]';
}
```

**Issue:** Variable `name` is declared but `assetInfo.names` is used in condition. This might be a TypeScript error.

**Should be:**
```typescript
assetFileNames: (assetInfo) => {
  const name = assetInfo.name;  // Note: assetInfo.name not assetInfo.names
  if (name && name.endsWith('.css')) {
    return 'styles.css';
  }
  return name || 'assets/[name][extname]';
}
```

**Resolution:** ✅ NO CHANGE NEEDED - User confirmed that `assetInfo.name` is deprecated, so using `assetInfo.names` is correct. The current code is working as intended.

---

## Documentation Alignment Issues (✅ RESOLVED)

### 6. Repository URLs ✅

**Multiple Documentation Files Reference:**
- `https://github.com/gsk/react-component-library` (in some docs)
- `https://github.com/aaanandan/react-component-library` (in package.json)

**Files Affected:**
- QUICK_START.md (line 106)
- CONSUMING_GUIDE.md (lines 403, 410)
- DESIGN_TOKENS_GUIDE.md (line 69)

**Resolution:** ✅ FIXED - Updated all documentation to use `aaanandan`:
- Fixed CONSUMING_GUIDE.md (2 instances)
- Fixed QUICK_START.md (1 instance)
- Fixed DESIGN_TOKENS_GUIDE.md (1 instance)
- All docs now consistently reference `github.com/aaanandan/react-component-library`

### 7. Package Scope Inconsistency ✅

**Files use different org names:**
- `@aaanandan` (package.json)
- `@gsk` (some documentation)
- `@your-company` (some examples)

**Resolution:** ✅ FIXED - All documentation now consistently uses `@aaanandan` as the package scope.

### 8. Storybook Documentation URL ✅

**Multiple docs reference:**
- `http://localhost:6006/?path=/docs/components-button--docs` (README.md:252)
- `https://your-storybook-url` (multiple docs)

**Resolution:** ✅ NO CHANGES - Placeholder URLs left as-is. Users will replace with their actual Storybook deployment URL when ready.

---

## Optional Enhancements (✅ RESOLVED)

### 9. Missing LICENSE File ✅

**Observation:**
- `package.json` has `"license": "MIT"`
- `files` field includes `"LICENSE"`
- But no LICENSE file exists in the repository

**Resolution:** ✅ ADDED - Created MIT LICENSE file with copyright for Anandan B (2025).

### 10. Missing CHANGELOG.md ✅

**Observation:**
- Project is at version 0.1.4
- No CHANGELOG.md exists
- Multiple docs mention maintaining a changelog

**Resolution:** ✅ DEFERRED - Can be added later when creating first release. Not critical for initial setup.

### 11. TypeScript Config - Included Files ✅

**Current:**
```json
{
  "include": ["lib", "src", ".storybook", "vite.config.ts", "vite.config.build.ts", "vitest.config.ts", "vitest.setup.ts"]
}
```

**Resolution:** ✅ KEPT AS-IS - `src` is now part of the repository (dev playground template), so it should remain in the include list.

### 12. ESLint Script Flags ✅

**Current Script:**
```bash
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
```

**Note:** The `--ext` flag is deprecated in ESLint 9 flat config (it now uses `files` patterns in config).

**Resolution:** ✅ NO CHANGE - The `--ext` flag still works in ESLint 9, just not required. Keeping for explicit clarity about which file types to lint.

---

## Unused/Empty Directories (✅ RESOLVED)

### 13. Empty Folders ✅

**Current State:**
- `lib/hooks/` - Mentioned in path aliases but empty
- `lib/utils/` - Mentioned in path aliases but empty

**Resolution:** ✅ KEPT AS-IS - Empty folders (`lib/hooks/`, `lib/utils/`) left as placeholders for future expansion. Path aliases configured and ready to use when needed.

---

## Summary of All Changes Made

### ✅ Implemented

1. ✅ Fixed `.gitattributes` file format
2. ✅ Created dev playground template (`src/` folder with App.tsx, main.tsx, README.md)
3. ✅ Removed `src` from `.gitignore`
4. ✅ Generated design tokens and removed from `.gitignore` (now committed)
5. ✅ Added `lib/styles.d.ts` to package.json files array
6. ✅ Created MIT LICENSE file
7. ✅ Updated all documentation to use `aaanandan` repository URL consistently
8. ✅ Documented dev playground feature in README.md and QUICK_START.md
9. ✅ Updated PROJECT_CONFIGURATION.md notes

### ⚠️ No Changes (By Design)
- Vite asset file naming (assetInfo.names is correct, assetInfo.name is deprecated)
- ESLint `--ext` flag (still works, kept for clarity)
- Empty folders (kept as placeholders)
- Storybook URLs (left as placeholders for users to replace)

### 📝 Deferred
- CHANGELOG.md (can be added when creating first release)

---

## Configuration Strengths

✅ Modern tooling (all latest versions)
✅ Proper dual-format output (ESM/CJS)
✅ Comprehensive type safety
✅ Consistent path aliases
✅ Good separation of concerns (dev vs build configs)
✅ Proper externalization of peer dependencies
✅ Tree-shaking support
✅ Source maps enabled

---

## Next Steps

Please review these questions and provide guidance on:
1. Which issues should be fixed immediately?
2. Which configurations are intentional as-is?
3. Any additional context about the dev playground setup?
4. Preferred approach for repository URLs and organization names in docs?
