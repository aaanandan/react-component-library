# Configuration Questions & Issues

This document lists configuration items that need clarification or potential issues found during the review.

---

## Critical Issues

### 1. `.gitattributes` File Content

**Issue:** The `.gitattributes` file contains documentation/instructions instead of actual gitattributes configuration.

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

## Configuration Clarifications Needed

### 2. Dev Playground (`src` folder)

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

**Recommendation:** Either:
- **Option A:** Document the dev playground feature and provide a template `src/main.tsx` (gitignored)
- **Option B:** Remove `index.html` references and clarify that Storybook is the primary development environment

### 3. Generated Tokens in Git

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

**Current Impact:**
- New developers must run `npm run build:tokens` before `npm run storybook` or tests will fail
- This is documented in QUICK_START.md but could be a friction point

### 4. Package Files Field

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

**Recommendation:** Add `lib/styles.d.ts` to files array:
```json
{
  "files": ["dist", "lib/styles.d.ts", "README.md", "LICENSE"]
}
```

### 5. Vite Build - Asset File Naming

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

**Question:** Does this build successfully? Should we fix the property access?

---

## Documentation Alignment Issues

### 6. Repository URLs

**Multiple Documentation Files Reference:**
- `https://github.com/gsk/react-component-library` (in some docs)
- `https://github.com/aaanandan/react-component-library` (in package.json)

**Files Affected:**
- QUICK_START.md (line 106)
- CONSUMING_GUIDE.md (lines 403, 410)
- DESIGN_TOKENS_GUIDE.md (line 69)

**Question:** Which is the correct repository URL?

**Recommendation:** Ensure all documentation uses the URL from package.json for consistency.

### 7. Package Scope Inconsistency

**Files use different org names:**
- `@aaanandan` (package.json)
- `@gsk` (some documentation)
- `@your-company` (some examples)

**Question:** Should we:
1. Use a placeholder like `@your-org` consistently in docs?
2. Or keep `@aaanandan` as the example throughout?

### 8. Storybook Documentation URL

**Multiple docs reference:**
- `http://localhost:6006/?path=/docs/components-button--docs` (README.md:252)
- `https://your-storybook-url` (multiple docs)

**Question:** Should we:
1. Use localhost URLs for local development references?
2. Add a placeholder for deployed Storybook URL?
3. Document both local and production Storybook URLs?

---

## Optional Enhancements

### 9. Missing LICENSE File

**Observation:**
- `package.json` has `"license": "MIT"`
- `files` field includes `"LICENSE"`
- But no LICENSE file exists in the repository

**Question:** Should we add a LICENSE file?

### 10. Missing CHANGELOG.md

**Observation:**
- Project is at version 0.1.4
- No CHANGELOG.md exists
- Multiple docs mention maintaining a changelog

**Question:** Should we create a CHANGELOG.md template?

### 11. TypeScript Config - Included Files

**Current:**
```json
{
  "include": ["lib", "src", ".storybook", "vite.config.ts", "vite.config.build.ts", "vitest.config.ts", "vitest.setup.ts"]
}
```

**Question:** Should `src` be removed from include since it's gitignored and optional?

### 12. ESLint Script Flags

**Current Script:**
```bash
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
```

**Note:** The `--ext` flag is deprecated in ESLint 9 flat config (it now uses `files` patterns in config).

**Question:** Should we update the lint script to:
```bash
"lint": "eslint . --report-unused-disable-directives --max-warnings 0"
```

---

## Unused/Empty Directories

### 13. Empty Folders

**Current State:**
- `lib/hooks/` - Mentioned in path aliases but empty
- `lib/utils/` - Mentioned in path aliases but empty

**Question:** Should we:
1. Add placeholder `index.ts` files with JSDoc explaining their purpose?
2. Remove path aliases until actually needed?
3. Keep as-is for future expansion?

---

## Summary of Recommendations

**High Priority:**
1. ✅ Fix `.gitattributes` file format
2. ✅ Clarify dev playground (`src` folder) setup
3. ✅ Add `lib/styles.d.ts` to package files
4. ✅ Fix asset file naming in vite.config.build.ts
5. ✅ Unify repository URLs across all docs

**Medium Priority:**
6. Add LICENSE file
7. Create CHANGELOG.md template
8. Update ESLint script to remove `--ext` flag
9. Clarify generated tokens strategy (gitignored vs committed)

**Low Priority:**
10. Add placeholder files to empty directories
11. Remove `src` from tsconfig include
12. Standardize organization name in examples

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
