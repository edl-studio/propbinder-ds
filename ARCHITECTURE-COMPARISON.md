# Architecture Comparison: Monorepo vs Separate Repositories

**Date:** November 17, 2025  
**Question:** Should we merge ionic-app into main, or separate it into its own repository?

---

## Option A: Merge to Main (Monorepo)

### Structure After Merge
```
Propbinder DS/
├── design-system/
│   ├── src/app/components/ui/
│   │   ├── global/
│   │   ├── web/
│   │   └── mobile/
│   ├── projects/design-system-lib/
│   └── package.json
└── ionic-app/
    ├── src/
    ├── ios/
    ├── android/
    └── package.json
```

### Pros ✅
- **Faster initial setup** - Just merge and done
- **Single source of truth** - All code in one place
- **Easy cross-referencing** - Can see both codebases at once
- **Shared tooling** - One set of git hooks, CI/CD config
- **Atomic commits** - Can update library and app in same commit

### Cons ❌
- **Tight coupling** - ionic-app can import directly from design-system source
- **Messy dependencies** - Two package.json files with potential conflicts
- **Build complexity** - Need to build library before app can use it
- **Deployment complexity** - Two separate build/deploy pipelines in one repo
- **Slow CI/CD** - Every commit tests/builds both projects
- **Access control** - Can't give different teams different permissions
- **Unclear boundaries** - Easy to bypass proper library exports
- **Git history pollution** - Design system changes mixed with app changes

### Complexity: **Medium** ⚠️
- Time: 1.5-2 hours (as outlined in merge strategy)
- Risk: Medium-high (7 conflict files, path reorganization)
- Technical debt: High (creates coupling issues)

---

## Option B: Separate Repositories (Recommended) ✨

### Structure After Separation
```
Repository 1: design-system (existing)
├── src/app/components/ui/
│   ├── global/     # Used by both web and mobile
│   ├── web/        # Web-only components
│   └── mobile/     # Mobile-only components
├── projects/design-system-lib/
└── package.json

Repository 2: propbinder-mobile (new)
├── src/
├── ios/
├── android/
├── package.json
└── dependencies:
    └── @propbinder/design-system: "^0.3.0"
```

### Pros ✅
- **Clean separation** - Each repo has one responsibility
- **Proper dependency management** - Mobile app installs library like any npm package
- **Independent deployments** - Deploy library and app separately
- **Better CI/CD** - Each repo has focused tests/builds
- **Clear boundaries** - Can only use published library exports
- **Team autonomy** - Different teams can own different repos
- **Easier onboarding** - New devs only clone what they need
- **Better git history** - Clear separation of concerns
- **Flexible versioning** - Library can version independently
- **Reusability** - Other apps can also consume the library

### Cons ❌
- **Initial setup time** - Need to create new repo, configure CI/CD
- **Development workflow** - Need npm link or verdaccio for local dev
- **Coordination** - Library changes require publish + update cycle
- **More repositories** - Need to manage multiple repos

### Complexity: **Medium** ⚠️
- Time: 2-3 hours (initial setup, mostly automation)
- Risk: Low (clean separation, no conflicts)
- Technical debt: Low (proper architecture from start)

---

## Detailed Comparison

### 1. Setup Time

| Task | Monorepo (Option A) | Separate Repos (Option B) |
|------|---------------------|---------------------------|
| Merge conflicts | 45 min | 0 min (no merge) |
| Move files | 0 min | 20 min |
| Update imports | Included in merge | 10 min |
| Configure package.json | Included | 15 min |
| Setup CI/CD | 0 min (exists) | 30 min |
| Local dev setup | 0 min | 15 min (npm link) |
| **Total** | **~1.5 hours** | **~2 hours** |

**Winner:** Monorepo (30 min faster)

### 2. Development Workflow

#### Monorepo:
```bash
# Start design system
cd design-system
npm run dev

# Start ionic app (in another terminal)
cd ionic-app
npm run dev

# Problem: Need to rebuild library for changes
cd design-system
npm run build:lib  # Every time you change a component!
```

#### Separate Repos:
```bash
# One-time setup for local dev
cd design-system
npm link

cd ../propbinder-mobile
npm link @propbinder/design-system

# Daily workflow
cd design-system
npm run dev:lib  # Watch mode, auto-builds

cd propbinder-mobile
npm run dev  # Hot reload works!
```

**Winner:** Separate repos (better DX after initial setup)

### 3. Deployment

#### Monorepo:
```yaml
# .github/workflows/deploy.yml
on: push
jobs:
  deploy-design-system:
    - Build library
    - Deploy Storybook
  
  deploy-mobile-app:
    - Build app
    - Deploy to TestFlight/Play Store
    
# Problem: Both run on every commit, even if only one changed
```

#### Separate Repos:
```yaml
# design-system/.github/workflows/deploy.yml
on: push
jobs:
  deploy:
    - Build library
    - Publish to npm
    - Deploy Storybook

# propbinder-mobile/.github/workflows/deploy.yml
on: push
jobs:
  deploy:
    - npm install (gets latest library)
    - Build app
    - Deploy to TestFlight/Play Store
```

**Winner:** Separate repos (focused, faster CI/CD)

### 4. Maintenance & Scalability

| Aspect | Monorepo | Separate Repos |
|--------|----------|----------------|
| Update library dependency | Edit source directly | `npm install @propbinder/design-system@latest` |
| Add new mobile app | Add another folder | Create new repo, install library |
| Library breaking change | Find/replace across repo | Semantic versioning, gradual update |
| Team permissions | All or nothing | Granular per repo |
| Code review | Mixed concerns | Focused reviews |
| Git history | Intermingled | Clean separation |

**Winner:** Separate repos (scales better)

### 5. Mobile Component Placement

**Important Decision:** Where do mobile components live?

#### Option B1: Mobile components in design-system-lib ✅ **Recommended**
```typescript
// In propbinder-mobile
import { DsMobilePostCard, DsMobileModal } from '@propbinder/design-system';
```

**Pros:**
- Mobile components are reusable design system components
- Single source of truth for all UI components
- Can be used by other mobile apps if needed
- Proper component library

**Cons:**
- Design system library bundle includes mobile components (but tree-shakable)

#### Option B2: Mobile components in propbinder-mobile
```typescript
// In propbinder-mobile/src/components/
// Local mobile components
```

**Pros:**
- Lighter design system library
- Mobile-specific components stay with mobile app

**Cons:**
- Not reusable
- Duplicates component patterns
- Harder to maintain consistency

**Recommendation:** Keep mobile components in design-system-lib (Option B1)

---

## Step-by-Step: Separate Repositories Approach

### Phase 1: Prepare Design System (30 minutes)

#### Step 1: Merge Mobile Components Only
```bash
cd "/Users/modestas/Propbinder DS"
git checkout main

# Create branch for mobile components
git checkout -b add-mobile-components

# Cherry-pick only the mobile component commits
# (We'll identify these commits)
git log feat/portal-components --oneline | grep -i "mobile\|feat:"
```

#### Step 2: Reorganize Component Structure
```bash
# The component reorganization (global/, web/, mobile/) still needs to happen
# But we'll do it as a focused refactor without ionic-app

# Apply component structure changes from feat/portal-components
git checkout feat/portal-components -- design-system/projects/design-system-lib/src/ui/mobile/
git checkout feat/portal-components -- design-system/src/app/components/ui/mobile/

# Move existing components to global/ and web/
# (This is the same reorganization from the branch)
```

#### Step 3: Update Library Package.json
```bash
cd design-system/projects/design-system-lib

# Bump version
npm version minor  # 0.2.1 -> 0.3.0

# Ensure proper exports
# Verify package.json has correct entry points
```

#### Step 4: Build & Test Library
```bash
npm run build:lib
npm run test  # If you have tests
```

#### Step 5: Publish to npm (or private registry)
```bash
# Option 1: Publish to npm (if public)
npm publish --access public

# Option 2: Publish to Azure Artifacts (if private)
npm publish --registry https://pkgs.dev.azure.com/yourorg/_packaging/yourfeed/npm/registry/

# Option 3: GitHub Packages (if private)
npm publish --registry https://npm.pkg.github.com
```

### Phase 2: Create Separate Mobile Repository (45 minutes)

#### Step 1: Create New Repository
```bash
# In Azure DevOps or GitHub
# Create new repository: "propbinder-mobile"

# Clone it
cd "/Users/modestas"
git clone <propbinder-mobile-url>
cd propbinder-mobile
```

#### Step 2: Copy ionic-app Files
```bash
# Copy files from feat/portal-components branch
cd "/Users/modestas/Propbinder DS"
git checkout feat/portal-components

# Copy ionic-app contents to new repo
cp -r ionic-app/* ../propbinder-mobile/

cd ../propbinder-mobile
```

#### Step 3: Update package.json
```bash
# Edit package.json
{
  "name": "propbinder-mobile",
  "version": "1.0.0",
  "dependencies": {
    "@propbinder/design-system": "^0.3.0",  // Your published library
    "@ionic/angular": "^8.0.0",
    "@capacitor/core": "^6.0.0",
    // ... other ionic deps
  }
}
```

#### Step 4: Update Imports
```bash
# Find all imports from design-system
grep -r "from '\.\./\.\./design-system" src/

# Replace with npm package imports
# Before: import { DsMobilePostCard } from '../../../design-system/...'
# After:  import { DsMobilePostCard } from '@propbinder/design-system';

# Use find/replace in your editor
```

#### Step 5: Install Dependencies
```bash
npm install
```

#### Step 6: Test Build
```bash
npm run dev
# Should work! Components come from installed library

npm run ios:local:sync
# iOS should work
```

#### Step 7: Setup CI/CD
```bash
# Create .github/workflows/deploy.yml or azure-pipelines.yml
# Configure TestFlight/App Store deployment
```

#### Step 8: Commit & Push
```bash
git add .
git commit -m "Initial commit: Propbinder mobile app

- Ionic Angular app with Capacitor
- iOS and Android support
- Uses @propbinder/design-system for UI components
"
git push origin main
```

### Phase 3: Local Development Setup (15 minutes)

#### For Development (Local Library Changes)
```bash
# Terminal 1: Link design system library
cd "/Users/modestas/Propbinder DS/design-system"
npm run build:lib:watch  # Watch mode

# In another session, create link
cd projects/design-system-lib
npm link

# Terminal 2: Link in mobile app
cd "/Users/modestas/propbinder-mobile"
npm link @propbinder/design-system

# Now changes to library auto-reflect in mobile app!
npm run dev
```

#### For Production (Published Library)
```bash
# Just use normal npm install
cd "/Users/modestas/propbinder-mobile"
npm install @propbinder/design-system@latest
npm run build
```

---

## Recommendation: Go with Option B (Separate Repositories) ✨

### Why?

1. **Only 30 minutes more setup time** (2 hours vs 1.5 hours)
2. **Much better long-term architecture**
3. **Cleaner git history and code reviews**
4. **Proper dependency management**
5. **Independent deployments and versioning**
6. **Scales better for future apps**
7. **Lower technical debt**

### When to Use Monorepo?

Monorepo makes sense when:
- ❌ Projects are tightly coupled (not your case - library should be standalone)
- ❌ You want atomic commits across projects (not needed for library + consumer)
- ❌ You have shared build tools (you already have separate package.json files)

You're essentially already in a "multi-repo mindset" with separate package.json files. Might as well make it official!

---

## Quick Decision Matrix

| Factor | Weight | Monorepo | Separate | Winner |
|--------|--------|----------|----------|--------|
| Setup time | Low | 10/10 | 8/10 | Monorepo |
| Dev workflow | High | 6/10 | 9/10 | **Separate** |
| Deployment | High | 5/10 | 10/10 | **Separate** |
| Maintenance | High | 6/10 | 9/10 | **Separate** |
| Scalability | High | 5/10 | 10/10 | **Separate** |
| Team collab | Medium | 6/10 | 9/10 | **Separate** |
| Technical debt | High | 4/10 | 10/10 | **Separate** |

**Overall Winner: Separate Repositories** 🏆

---

## Next Steps (If You Choose Separate Repos)

1. **Decide on npm registry:**
   - Public npm? (if open source)
   - Azure Artifacts? (if private Microsoft)
   - GitHub Packages? (if private GitHub)

2. **I can help you:**
   - Set up npm publishing workflow
   - Create the new mobile repository structure
   - Update imports to use npm package
   - Configure CI/CD for both repos
   - Set up local dev workflow with npm link

3. **Timeline:**
   - Today: Set up design system publishing (~1 hour)
   - Today: Create mobile repo (~1 hour)
   - Tomorrow: Test and verify everything works
   - This week: Update documentation and CI/CD

Let me know if you'd like to proceed with the separate repositories approach! I think it's the right call for your architecture.

---

**Last Updated:** November 17, 2025

