# Gradual Monorepo Migration Plan (Updated)
## Moving ionic-app from feat/portal-components to main

**Date:** November 17, 2025  
**Approach:** Incremental migration with testing at each step  
**Source Branch:** `feat/portal-components`  
**Target:** New branch from `main`  

---

## Key Architecture Decisions

### ✅ Design System: Keep Structure As-Is
- **NO component reorganization** (no global/web/mobile folders)
- **NO mobile components added** to design-system
- Keep current flat structure under `src/app/components/ui/`
- Design system remains focused on **reusable shared components**

### ✅ Ionic App: Self-Contained Mobile App
- **All mobile-specific components live in ionic-app**
- Located at `ionic-app/src/app/components/` (flat structure)
- Imports shared components from design-system via **path mapping**
- Mobile components: post-card, lightbox, bottom-sheet, tabs, etc.

---

## Pre-Migration Checklist

- [ ] Verify on `main` branch
- [ ] Working tree is clean (`git status`)
- [ ] All changes committed
- [ ] Pulled latest from remote

---

## Phase 1: Setup & Foundation (30 minutes)

### Step 1.1: Create Migration Branch

```bash
cd "/Users/modestas/Propbinder DS"

# Ensure we're on latest main
git checkout main
git pull azure main

# Create new migration branch
git checkout -b migration/add-ionic-app

# Verify
git branch
# Should show: * migration/add-ionic-app
```

### Step 1.2: Create ionic-app Directory Structure

```bash
# Create empty directory
mkdir -p ionic-app/src/app

# Copy configuration files from feat/portal-components
git show feat/portal-components:ionic-app/package.json > ionic-app/package.json
git show feat/portal-components:ionic-app/angular.json > ionic-app/angular.json
git show feat/portal-components:ionic-app/tsconfig.json > ionic-app/tsconfig.json
git show feat/portal-components:ionic-app/tsconfig.app.json > ionic-app/tsconfig.app.json
git show feat/portal-components:ionic-app/capacitor.config.ts > ionic-app/capacitor.config.ts
git show feat/portal-components:ionic-app/tailwind.config.js > ionic-app/tailwind.config.js
```

**Verify path mapping in tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@propbinder/design-system": ["../design-system/src/app/components/ui"],
      "@propbinder/design-system/*": ["../design-system/src/app/components/ui/*"]
    }
  }
}
```

**Commit:**
```bash
git add ionic-app/
git commit -m "feat: add ionic-app base configuration

- Add package.json with Ionic/Capacitor dependencies
- Add Angular and TypeScript configuration
- Add Capacitor config for mobile app
- Add Tailwind config for styling
- Configure path mapping to design-system source files
"
```

### Step 1.3: Add Source Files Structure

```bash
# Copy main entry points
mkdir -p ionic-app/src/app

git show feat/portal-components:ionic-app/src/index.html > ionic-app/src/index.html
git show feat/portal-components:ionic-app/src/main.ts > ionic-app/src/main.ts
git show feat/portal-components:ionic-app/src/styles.css > ionic-app/src/styles.css

git show feat/portal-components:ionic-app/src/app/app.ts > ionic-app/src/app/app.ts
git show feat/portal-components:ionic-app/src/app/app.config.ts > ionic-app/src/app/app.config.ts
git show feat/portal-components:ionic-app/src/app/app.routes.ts > ionic-app/src/app/app.routes.ts
```

**Commit:**
```bash
git add ionic-app/src/
git commit -m "feat: add ionic-app entry points and app shell

- Add index.html and main.ts bootstrap files
- Add root app component and configuration
- Add routing setup
- Add global styles
"
```

### Step 1.4: Install Dependencies

```bash
cd ionic-app
npm install

# This should install successfully including Ionic/Capacitor
```

**Commit:**
```bash
cd ..
git add ionic-app/package-lock.json
git commit -m "chore: add ionic-app package-lock.json after initial install"
```

---

## Phase 2: Add Mobile Components to ionic-app (45 minutes)

**Note:** These mobile components stay in ionic-app, NOT in design-system!

### Step 2.1: Add Mobile Components Directory

```bash
cd "/Users/modestas/Propbinder DS"

# Copy entire mobile components from feat/portal-components
# Source on feat/portal-components: design-system/src/app/components/ui/mobile/
# Destination on migration branch: ionic-app/src/app/components/

mkdir -p ionic-app/src/app/components

# Use git checkout to copy directory
git checkout feat/portal-components -- design-system/src/app/components/ui/mobile/

# Move contents to ionic-app/components/ (flatten - remove 'mobile' subdirectory)
mv design-system/src/app/components/ui/mobile/* ionic-app/src/app/components/

# Clean up empty directory
rm -rf design-system/src/app/components/ui/mobile/
```

**Commit:**
```bash
git add ionic-app/src/app/components/
git commit -m "feat: add mobile components to ionic-app

Mobile components added to ionic-app/src/app/components/:
- app-layout: Mobile app layout structure
- bottom-sheet: Bottom sheet service and components
- comment: Comment display component
- content: Mobile content wrapper
- header-content: Mobile header content
- lightbox: Image/PDF lightbox with service
- modal: Modal service and component
- page-main/page-details: Page layout components
- post-card: Post display card with PDF attachment support
- post-composer: Post creation component
- post-detail-modal: Post detail modal with service
- tabs: Mobile tabs navigation
- shared: Common mobile utilities and base classes

These components are specific to the mobile app and live in ionic-app.
They import shared components from design-system via path mapping.
"
```

### Step 2.2: Update Mobile Component Import Paths

The mobile components currently import from design-system like:
```typescript
// OLD (on feat/portal-components):
import { DsButtonComponent } from '../../../button/ds-button';  // relative

// NEW (on migration branch):
import { DsButtonComponent } from '@propbinder/design-system';  // via path mapping
```

**Find and update imports:**
```bash
cd ionic-app/src/app/components

# Find all relative imports to design-system components
grep -r "from '\.\./\.\./\.\." .

# These need to be updated to use @propbinder/design-system
```

**Example fix for a mobile component:**
```typescript
// ionic-app/src/app/components/post-card/ds-mobile-post-card.ts

// OLD:
import { DsAvatarComponent } from '../../../avatar/ds-avatar';
import { DsButtonComponent } from '../../../button/ds-button';

// NEW:
import { DsAvatarComponent, DsButtonComponent } from '@propbinder/design-system';
```

**Commit:**
```bash
git add ionic-app/src/app/components/
git commit -m "refactor: update mobile component imports to use path mapping

Changed relative imports to use @propbinder/design-system path mapping.
Enables importing shared components from design-system source.
"
```

### Step 2.3: Add Ionic Styles

```bash
# Copy Ionic-specific styles
mkdir -p ionic-app/src/app/styles
git show feat/portal-components:ionic-app/src/app/styles/ionic.css > ionic-app/src/app/styles/ionic.css
```

**Commit:**
```bash
git add ionic-app/src/app/styles/
git commit -m "feat: add Ionic custom styles

Custom CSS for Ionic components and mobile-specific styling.
"
```

### Step 2.4: Test Build

```bash
cd ionic-app
npm run build

# Should compile successfully
# Mobile components import from design-system via path mapping
```

---

## Phase 3: Add Services (15 minutes)

### Step 3.1: Add Services

```bash
cd "/Users/modestas/Propbinder DS"

# Copy services
mkdir -p ionic-app/src/app/services
git show feat/portal-components:ionic-app/src/app/services/user.service.ts > ionic-app/src/app/services/user.service.ts
```

**Commit:**
```bash
git add ionic-app/src/app/services/
git commit -m "feat: add ionic-app services

- Add user.service.ts for user management
"
```

---

## Phase 4: Add Pages (45 minutes)

### Step 4.1: Add Demo Pages

```bash
cd "/Users/modestas/Propbinder DS"

# Create pages directory structure
mkdir -p ionic-app/src/app/pages/demos
mkdir -p ionic-app/src/app/pages/examples

# Copy all demo pages
git checkout feat/portal-components -- ionic-app/src/app/pages/demos/
```

**Update imports in pages if needed** (should already use path mapping)

**Commit:**
```bash
git add ionic-app/src/app/pages/demos/
git commit -m "feat: add demo pages to ionic-app

Demo pages:
- home.page.ts: Home dashboard
- community.page.ts: Community feed
- discover.page.ts: Discover properties
- handbook.page.ts: Company handbook
- inquiries.page.ts: Inquiries list
"
```

### Step 4.2: Add Example Pages

```bash
# Copy example pages
git checkout feat/portal-components -- ionic-app/src/app/pages/examples/
```

**Commit:**
```bash
git add ionic-app/src/app/pages/examples/
git commit -m "feat: add example pages to ionic-app

Example pages:
- community-with-modal.example.ts: Community with modal demo
- lightbox-test.page.ts: Lightbox testing
- modal-examples.page.ts: Modal examples
"
```

### Step 4.3: Add Other Pages

```bash
# Copy remaining pages
git show feat/portal-components:ionic-app/src/app/pages/home-detail.page.ts > ionic-app/src/app/pages/home-detail.page.ts
git show feat/portal-components:ionic-app/src/app/pages/post-detail.page.ts > ionic-app/src/app/pages/post-detail.page.ts
git show feat/portal-components:ionic-app/src/app/pages/post-create.page.ts > ionic-app/src/app/pages/post-create.page.ts
git show feat/portal-components:ionic-app/src/app/pages/profile.page.ts > ionic-app/src/app/pages/profile.page.ts
git show feat/portal-components:ionic-app/src/app/pages/community.page.ts > ionic-app/src/app/pages/community.page.ts
git show feat/portal-components:ionic-app/src/app/pages/mobile-tabs-example.component.ts > ionic-app/src/app/pages/mobile-tabs-example.component.ts
```

**Commit:**
```bash
git add ionic-app/src/app/pages/
git commit -m "feat: add detail and other pages to ionic-app

- home-detail.page.ts: Home detail view
- post-detail.page.ts: Post detail view
- post-create.page.ts: Post creation
- profile.page.ts: User profile
- community.page.ts: Community feed
- mobile-tabs-example.component.ts: Tabs example
"
```

### Step 4.4: Test Dev Server

```bash
cd ionic-app
npm run dev

# Should run and be accessible at http://localhost:4200
# Test navigation between pages
```

---

## Phase 5: Add iOS Configuration (30 minutes)

### Step 5.1: Add iOS Directory

```bash
cd "/Users/modestas/Propbinder DS"

# Copy iOS directory
git checkout feat/portal-components -- ionic-app/ios/
```

**Commit:**
```bash
git add ionic-app/ios/
git commit -m "feat: add iOS Capacitor configuration

- Add iOS native project files
- Add Xcode project configuration
- Add Podfile for iOS dependencies
- Required for building and running on iOS devices/simulator
"
```

### Step 5.2: Add public Directory (if exists)

```bash
# Check if public directory exists on feat/portal-components
git show feat/portal-components:ionic-app/public

# If it exists, copy it
git checkout feat/portal-components -- ionic-app/public/
```

**Commit (if applicable):**
```bash
git add ionic-app/public/
git commit -m "feat: add public assets directory

Static assets for the ionic-app.
"
```

### Step 5.3: Test iOS Sync

```bash
cd ionic-app

# Sync iOS with local server config
npm run ios:local:sync

# Should succeed and configure iOS to use localhost:4200
```

**Commit any generated changes:**
```bash
git status
# If capacitor generated any new files in ios/, add them
cd ..
git add ionic-app/ios/
git commit -m "chore: sync Capacitor iOS configuration for local development"
```

### Step 5.4: Test iOS Simulator (Optional but Recommended)

```bash
cd ionic-app

# Run in simulator
npm run ios:local:run

# Should:
# 1. Build the Angular app
# 2. Launch iOS simulator
# 3. Install and run the app
# 4. App should connect to localhost:4200
```

---

## Phase 6: Add Documentation (15 minutes)

### Step 6.1: Add ionic-app Documentation

```bash
cd "/Users/modestas/Propbinder DS"

# Copy documentation files
git show feat/portal-components:ionic-app/README.md > ionic-app/README.md
git show feat/portal-components:ionic-app/SETUP.md > ionic-app/SETUP.md
git show feat/portal-components:ionic-app/CONFIGURATION.md > ionic-app/CONFIGURATION.md
git show feat/portal-components:ionic-app/EXAMPLES.md > ionic-app/EXAMPLES.md
git show feat/portal-components:ionic-app/MIGRATION-PROGRESS.md > ionic-app/MIGRATION-PROGRESS.md 2>/dev/null || true
```

**Commit:**
```bash
git add ionic-app/*.md
git commit -m "docs: add ionic-app documentation

- README.md: Project overview
- SETUP.md: Setup instructions
- CONFIGURATION.md: Configuration guide
- EXAMPLES.md: Usage examples
- MIGRATION-PROGRESS.md: Migration tracking (if exists)
"
```

### Step 6.2: Add Top-Level Documentation

```bash
# Check if there are any top-level docs about iOS/mobile
git show feat/portal-components:design-system/IOS-SETUP.md > design-system/IOS-SETUP.md 2>/dev/null || true
git show feat/portal-components:design-system/IONIC-DEPENDENCIES-STRATEGY.md > design-system/IONIC-DEPENDENCIES-STRATEGY.md 2>/dev/null || true
```

**Commit (if files exist):**
```bash
git add design-system/*.md
git commit -m "docs: add mobile development guides

- IOS-SETUP.md: iOS development setup (if exists)
- IONIC-DEPENDENCIES-STRATEGY.md: Dependency strategy (if exists)
"
```

---

## Phase 7: Verify Design System Unchanged (10 minutes)

### Step 7.1: Check Design System Structure

```bash
cd "/Users/modestas/Propbinder DS/design-system"

# Verify no mobile components were added
ls src/app/components/ui/
# Should NOT see a "mobile" directory

# Verify structure is unchanged from main
git diff main -- src/app/components/ui/
# Should show no differences (or only documentation)
```

### Step 7.2: Test Design System Still Works

```bash
cd design-system

# Build the library
npm run build:lib
# ✅ Should succeed

# Run dev server
npm run dev
# ✅ Should work as before

# Check Storybook (if you use it)
npm run storybook
# ✅ Should work as before
```

**Verify:**
- ✅ No mobile components in design-system
- ✅ Design system builds successfully
- ✅ Design system app runs normally
- ✅ Existing components unchanged

---

## Phase 8: Final Testing & Validation (30 minutes)

### Step 8.1: Test Ionic App Comprehensively

```bash
cd "/Users/modestas/Propbinder DS/ionic-app"

# Clean install
rm -rf node_modules package-lock.json
npm install

# Run dev server
npm run dev
```

**Test in browser (http://localhost:4200):**
- [ ] App loads without errors
- [ ] All pages are accessible
- [ ] Mobile components render correctly
- [ ] Shared components (from design-system) work
- [ ] Modals open and close
- [ ] Lightbox works
- [ ] Bottom sheets work
- [ ] Navigation works
- [ ] No console errors

### Step 8.2: Test iOS

```bash
cd ionic-app

# Sync iOS
npm run ios:local:sync
# ✅ Should succeed

# Run in simulator
npm run ios:local:run
# ✅ Should launch and work
```

**Test in simulator:**
- [ ] App launches
- [ ] All pages work
- [ ] Touch interactions work
- [ ] Native features work (if any)
- [ ] No crashes

### Step 8.3: Verify Git Status

```bash
cd "/Users/modestas/Propbinder DS"

# Check what's changed
git status

# Should show:
# - new file: ionic-app/ (entire directory)
# - maybe some docs in design-system/
# - NO changes to design-system/src/app/components/ui/
```

---

## Phase 9: Merge to Main (15 minutes)

### Step 9.1: Final Review

```bash
cd "/Users/modestas/Propbinder DS"

# Review all commits
git log --oneline main..migration/add-ionic-app

# Review diff summary
git diff main..migration/add-ionic-app --stat

# Should show:
# - Many files added in ionic-app/
# - Few or no changes in design-system/
```

### Step 9.2: Merge to Main

```bash
# Switch to main
git checkout main

# Merge (no fast-forward for clear history)
git merge --no-ff migration/add-ionic-app -m "Merge branch 'migration/add-ionic-app'

Added ionic-app as self-contained mobile application:

ionic-app/:
- Complete Ionic Angular app setup
- All mobile-specific components (post-card, lightbox, tabs, etc.)
- iOS Capacitor configuration
- Demo and example pages
- Comprehensive documentation
- Uses path mapping to import shared components from design-system

design-system/:
- Structure unchanged (no mobile components added)
- Remains focused on reusable shared components
- No reorganization or breaking changes

Mobile components import from design-system source via path mapping.
Tested successfully in browser and iOS simulator.
"
```

### Step 9.3: Test After Merge

```bash
# Test design system
cd design-system
npm run build:lib
npm run dev

# Test ionic app
cd ../ionic-app
npm run dev
npm run ios:local:sync
```

### Step 9.4: Push to Remote

```bash
cd "/Users/modestas/Propbinder DS"

# Push main
git push azure main

# Push migration branch (for reference)
git push azure migration/add-ionic-app
```

---

## Rollback Plan

If anything goes wrong:

### Before Merge to Main:
```bash
# Delete migration branch and start over
git checkout main
git branch -D migration/add-ionic-app
```

### After Merge to Main:
```bash
# Revert the merge commit
git revert -m 1 HEAD

# Or reset to before merge (if not pushed)
git reset --hard HEAD~1
```

### Complete Reset:
```bash
# Nuclear option: go back to remote main
git fetch azure
git reset --hard azure/main
```

---

## Timeline Estimate

| Phase | Time | Cumulative |
|-------|------|-----------|
| Phase 1: Setup | 30 min | 30 min |
| Phase 2: Mobile Components | 45 min | 1h 15min |
| Phase 3: Services | 15 min | 1h 30min |
| Phase 4: Pages | 45 min | 2h 15min |
| Phase 5: iOS | 30 min | 2h 45min |
| Phase 6: Documentation | 15 min | 3h |
| Phase 7: Verify Design System | 10 min | 3h 10min |
| Phase 8: Testing | 30 min | 3h 40min |
| Phase 9: Merge | 15 min | 3h 55min |

**Total: ~4 hours**

---

## Success Criteria

### ionic-app:
- [ ] Runs in dev mode (npm run dev)
- [ ] All pages load without errors
- [ ] Mobile components work correctly
- [ ] Imports shared components from design-system via path mapping
- [ ] iOS sync works (npm run ios:local:sync)
- [ ] Runs in iOS simulator
- [ ] All services work (modals, lightbox, bottom sheets)
- [ ] Documentation is complete

### design-system:
- [ ] Structure unchanged (no mobile components)
- [ ] Builds successfully (npm run build:lib)
- [ ] Dev server works (npm run dev)
- [ ] No breaking changes to existing components
- [ ] Can still be consumed by other apps

### Git:
- [ ] Clean commit history with logical steps
- [ ] No merge conflicts
- [ ] Design system changes are minimal or none
- [ ] All changes in ionic-app directory

---

## Key Differences from Original Plan

### ✅ What Changed:
1. **No mobile components in design-system** - They stay in ionic-app
2. **No component reorganization** - Design system structure unchanged
3. **Cleaner separation** - Mobile app is self-contained
4. **Import path strategy** - ionic-app imports from design-system via path mapping

### ✅ Why This Is Better:
- **Simpler architecture** - Clear boundaries between projects
- **Design system stays focused** - Only reusable shared components
- **Easier maintenance** - Mobile-specific code lives with mobile app
- **No breaking changes** - Design system consumers unaffected
- **Better scalability** - Can add more apps that consume design-system

---

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│   design-system/ (unchanged)            │
│                                          │
│   src/app/components/ui/                │
│   ├── button/                           │
│   ├── input/                            │
│   ├── select/                           │
│   ├── avatar/                           │
│   └── ... (all shared components)       │
│                                          │
│   NO mobile/ directory                  │
│   NO global/, web/ reorganization       │
└─────────────────────────────────────────┘
                    ▲
                    │ imports via path mapping
                    │ (tsconfig paths)
                    │
┌─────────────────────────────────────────┐
│   ionic-app/ (new)                      │
│                                          │
│   src/app/                              │
│   ├── components/                       │
│   │   ├── post-card/                    │
│   │   ├── lightbox/                     │
│   │   ├── bottom-sheet/                 │
│   │   ├── tabs/                         │
│   │   ├── modal/                        │
│   │   └── ... (all mobile components)   │
│   ├── pages/                            │
│   │   ├── demos/                        │
│   │   └── examples/                     │
│   ├── services/                         │
│   └── styles/                           │
│                                          │
│   tsconfig.json:                        │
│   paths: {                              │
│     "@propbinder/design-system":        │
│       ["../design-system/src/.../ui"]   │
│   }                                     │
└─────────────────────────────────────────┘
```

---

## Next Steps

Ready to start the migration? Let's go **phase by phase**:

1. **I'll help you execute each phase** step-by-step
2. **We'll test at each checkpoint** before moving forward
3. **If anything breaks**, we'll fix it before continuing
4. **You'll have a clean, working monorepo** at the end

Just say "let's start Phase 1" and I'll guide you through it! 🚀

---

**Last Updated:** November 17, 2025  
**Approach:** Incremental migration, design-system unchanged  
**Estimated Duration:** ~4 hours  
**Status:** Ready to execute
