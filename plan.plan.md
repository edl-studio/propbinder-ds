# Ionic App Migration Plan

## Overview
Migrating `ionic-app` and all mobile components from `feat/portal-components` branch to `main` branch in a monorepo structure.

## Current Status: ✅ Core Migration Complete

### Branch: `migration/add-ionic-app`
- Base: `main` (latest)
- Status: Ready for remaining import path fixes

## ✅ Completed Phases

### Phase 1: Setup & Foundation ✅
- [x] Checkout `main` branch
- [x] Pull latest changes from remote
- [x] Create new branch `migration/add-ionic-app`

### Phase 2: Copy Ionic App & Mobile Components ✅
- [x] Copy entire `ionic-app/` directory from `feat/portal-components`
  - Includes all dependencies (node_modules committed from feat branch)
  - Includes all configuration files
  - Includes iOS setup
- [x] Move mobile components from `design-system/src/app/components/ui/mobile/` to `ionic-app/src/app/components/`
  - **Flat structure** (no `mobile/` subdirectory)
  - All components directly under `ionic-app/src/app/components/`
- [x] Update mobile component imports to use `@propbinder/design-system` for design system components
- [x] Remove old mobile directory from design-system

### Phase 3: Fix Angular Version Mismatch ✅
- [x] Identified version mismatch causing type brand errors:
  - design-system: Angular 20.3.11
  - ionic-app: Angular 20.3.10
- [x] Upgraded ionic-app to Angular 20.3.11 using `--legacy-peer-deps`
- [x] Verified type brand errors are resolved

### Phase 4: Update Configuration ✅
- [x] Fixed `ionic-app/angular.json`:
  - Updated globals.css path: `../design-system/src/app/styles/globals.css`
  - Updated mobile CSS paths to local: `src/app/components/shared/mobile-common.css`
- [x] Verified `ionic-app/tsconfig.json` path mapping:
  - `@propbinder/design-system` → `../design-system/src/app/components/ui`
  - This allows direct source imports (bypasses compilation issues)

### Phase 5: Update Import Paths ✅ (Partial)
- [x] Fixed `post-detail.page.ts` - imports from `../components/post-card` etc.
- [x] Fixed `post-create.page.ts` - imports from `../components/page-details`
- [x] Fixed `lightbox-test.page.ts` - imports from `../../components/lightbox`
- [x] Fixed `community.page.ts` - imports from `../components/`
- [x] Fixed `community-with-modal.example.ts` - imports from `../../components/`

## 🔄 Remaining Tasks

### Import Path Updates Needed

The following page files still have incorrect imports and need to be updated to import mobile components from local paths:

#### 1. **demos/home.page.ts**
Current imports from `@propbinder/design-system`:
- `DsMobilePageMainComponent` → `'../../components/page-main'`
- `DsMobileHeaderContentComponent` → `'../../components/header-content'`
- `DsMobileContentComponent` → `'../../components/content'`
- Content section components (need to check if these exist in mobile components)

#### 2. **demos/handbook.page.ts**
Current imports from `@propbinder/design-system`:
- `DsMobilePageMainComponent` → `'../../components/page-main'`
- `DsMobileContentComponent` → `'../../components/content'`
- Content section components

#### 3. **demos/inquiries.page.ts**
Current imports from `@propbinder/design-system`:
- `DsMobilePageMainComponent` → `'../../components/page-main'`
- `DsMobileContentComponent` → `'../../components/content'`
- Content section components

#### 4. **examples/modal-examples.page.ts**
Current imports from `@propbinder/design-system`:
- `DsMobileModalService` → `'../../components/modal/ds-mobile-modal.service'`

#### 5. **home-detail.page.ts**
Current imports from `@propbinder/design-system`:
- `DsMobilePageDetailsComponent` → `'../components/page-details'`
- `DsMobileContentComponent` → `'../components/content'`
- Content section components

### Note on Content Section Components
Some components like `DsMobileContentSectionComponent`, `SectionHeaderComponent`, `ContentRowComponent`, `TileIconComponent`, etc. may not exist in the mobile components. These might be:
1. Design system components that should stay imported from `@propbinder/design-system`
2. Components that need to be created
3. HTML elements for content projection (not actual Angular components)

**Action needed**: Verify which of these are actual components vs. content projection slots.

## Architecture Summary

### Current Structure (Monorepo)
```
/Users/modestas/Propbinder DS/
├── design-system/
│   └── src/app/components/ui/
│       ├── button/          ← Global components
│       ├── input/
│       ├── avatar/
│       └── ... (no mobile/ anymore)
│
└── ionic-app/                ← Ionic mobile app
    ├── src/app/
    │   ├── components/       ← All mobile components (flat)
    │   │   ├── post-card/
    │   │   ├── lightbox/
    │   │   ├── bottom-sheet/
    │   │   ├── tabs/
    │   │   ├── modal/
    │   │   ├── page-details/
    │   │   ├── page-main/
    │   │   ├── content/
    │   │   ├── header-content/
    │   │   ├── shared/       ← mobile-common.css, mobile-page-base
    │   │   └── ...
    │   ├── pages/
    │   ├── services/
    │   └── styles/
    ├── ios/                  ← Capacitor iOS
    ├── package.json
    └── tsconfig.json
```

### Import Strategy
1. **Design system components** (buttons, inputs, avatars, icons): Import from `@propbinder/design-system`
2. **Mobile-specific components** (post-card, lightbox, tabs): Import from local paths like `'../components/post-card'`
3. **Path mapping** in `ionic-app/tsconfig.json` maps `@propbinder/design-system` to source files, bypassing compilation

## Key Technical Decisions

### Why Monorepo (Not Separate Git)
- Signal input compilation issue in Angular libraries
- `input()` and `output()` decorators don't compile correctly with `ng-packagr`
- Path mapping to source files works as workaround
- Documented in `LIBRARY-COMPILATION-ISSUE.md` and `PROOF-ITS-THE-COMPILED-LIBRARY.md`

### Why Angular Version Match is Critical
- Type brand mismatch errors if patch versions differ
- Example: `__@ɵINPUT_SIGNAL_BRAND_WRITE_TYPE@11383` vs `__@ɵINPUT_SIGNAL_BRAND_WRITE_TYPE@2891`
- Both must use exact same Angular version (currently 20.3.11)

## Testing Checklist

- [ ] All page files build without errors
- [ ] ionic-app builds successfully (`npm run build`)
- [ ] ionic-app runs in dev mode (`npm start`)
- [ ] iOS simulator works (`npm run ios:local:run`)
- [ ] All mobile components render correctly
- [ ] Lightbox functionality works
- [ ] Modal/Bottom sheet services work
- [ ] Post card interactions work
- [ ] Navigation between pages works

## Next Steps

1. Fix remaining import path errors in demo pages and examples
2. Verify content section component usage
3. Run full build test
4. Test in iOS simulator
5. Create PR to merge `migration/add-ionic-app` → `main`

## Commits

1. ✅ `feat: migrate ionic-app and mobile components to main` - Initial migration
2. ✅ `chore: fix Angular version mismatch and update import paths` - Version fix and partial imports

## Related Documentation

- `GRADUAL-MONOREPO-MIGRATION.md` - Original migration plan
- `LIBRARY-COMPILATION-ISSUE.md` - Signal input compilation problem
- `PROOF-ITS-THE-COMPILED-LIBRARY.md` - Evidence of compilation issue
- `UPDATED-ARCHITECTURE-RECOMMENDATION.md` - Monorepo decision

