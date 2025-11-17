# Message to Downstream Developer

---

**Subject:** Question about design-system library imports and signal input compatibility

---

Hi [Developer Name],

I hope you're doing well! I'm reaching out because we're working on integrating the `@propbinder/design-system` library into our new Ionic mobile app, and we've encountered some technical challenges with signal inputs. Since you're already using the library successfully, I'd love to understand your setup to see if there's something we can learn from your approach.

## What We're Experiencing

We're running into an Angular injection context error when using components from the compiled library:

```
ERROR RuntimeError: NG0203: inputFunction() can only be used within an injection context
```

This happens specifically with components that use signal inputs (like `DsAvatarComponent`, `DsButtonComponent`, etc.) when we import them from the compiled library at `dist/design-system-lib/`.

## Interesting Discovery

We've found that the **same components work perfectly** when imported directly from the source TypeScript files (using path mapping), but fail when imported from the compiled/built library. This suggests the issue is with how Angular compiles signal inputs in libraries, not with our app configuration.

## Questions About Your Setup

To help us understand how you've successfully integrated the library, could you share some details about your setup?

### 1. **How are you importing the library?**

**Option A - Compiled library (npm/file link):**
```json
// package.json
{
  "dependencies": {
    "@propbinder/design-system": "^0.2.1"
    // or
    "@propbinder/design-system": "file:../design-system/dist/design-system-lib"
  }
}
```

**Option B - Source files (path mapping):**
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@propbinder/design-system": ["../design-system/src/app/components/ui"]
    }
  }
}
```

### 2. **Which components are you using?**

Specifically, are you using any of these components that have signal inputs:
- `DsButtonComponent`
- `DsAvatarComponent`
- `DsInputComponent`
- `DsSelectComponent`
- `DsCheckboxComponent`
- Mobile components (`DsMobilePostCard`, `DsMobileTabs`, etc.)

Or are you primarily using components that might use traditional `@Input()` decorators?

### 3. **What does your import statement look like?**

For example:
```typescript
import { DsButtonComponent } from '@propbinder/design-system';
// or
import { DsButtonComponent } from '@propbinder/design-system/button/ds-button';
```

### 4. **Angular version and build setup**

- Angular version: (we're on 20.3.x)
- Are you using standard Angular CLI or a custom build setup?
- Any special compiler options in your `tsconfig.json`?

### 5. **Are you experiencing any errors or warnings?**

Even if things are working, have you noticed:
- Console warnings about injection context?
- Need to use `npm link` or specific installation methods?
- Any workarounds you had to implement?

## What We've Learned

Through investigation, we've found that:

✅ **Components work perfectly when imported from source**
- Using TypeScript path mapping to `../design-system/src/app/components/ui`
- Components compile in our app's context
- Signal inputs function correctly

❌ **Components fail when imported from compiled library**
- Using the built library from `dist/design-system-lib/`
- Pre-compiled `input()` function calls don't have injection context
- Results in runtime errors

This appears to be a known limitation with Angular's compilation of signal inputs in libraries (introduced in Angular 17+), though it's not well documented.

## Why This Matters

We're currently deciding between:

**Option A:** Keep both projects in the same repo (monorepo) and use path mapping to source files
- ✅ Works immediately
- ✅ Keeps signal inputs and modern Angular features
- ❌ Both projects in same repository

**Option B:** Convert all signal inputs to `@Input()` decorators and separate repos
- ✅ Proper library separation
- ✅ Can publish as standalone npm package
- ❌ 2-3 weeks of refactoring
- ❌ Lose modern Angular signal features

**Your experience could really help inform this decision!**

## Could You Share?

If possible, could you share (or screenshot) the relevant parts of:
1. Your `package.json` (just the design-system dependency)
2. Your `tsconfig.json` (any paths or special config)
3. An example import statement from one of your components
4. Which design-system components you're actively using

No rush at all – whenever you have a few minutes would be great!

## Additional Context

For reference, our full investigation is documented here (if you're curious):
- We've confirmed our app configuration is correct (same Angular versions, proper TypeScript setup)
- The issue is specifically with how `ng-packagr` compiles signal inputs
- We've tried various compilation modes (full vs partial) without success
- Community reports suggest this is a broader Angular limitation

Thanks so much for any insights you can provide! Understanding your setup could save us weeks of refactoring work or confirm that we need to go down that path.

Best regards,
[Your Name]

---

## Alternative: Shorter Version

If you want a more concise message:

---

Hi [Developer Name],

Quick question about how you're using the `@propbinder/design-system` library. We're setting up our Ionic mobile app and running into issues with signal inputs when importing from the compiled library.

**Could you tell me:**
1. Are you importing from the compiled library (`dist/`) or using TypeScript path mapping to source files?
2. What does your `package.json` dependency look like?
3. Are you using components like `DsButtonComponent`, `DsAvatarComponent` that have signal inputs?

We're finding that components work when imported from source but fail with injection context errors when imported from the compiled library. Trying to understand if this is expected or if we're missing something in our setup.

Thanks!
[Your Name]

---

**Choose which version based on:**
- **Long version:** If they're technically-minded and you want to share context
- **Short version:** If you just need quick clarification of their setup

