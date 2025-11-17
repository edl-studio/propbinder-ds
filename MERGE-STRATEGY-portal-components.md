# Merge Strategy: feat/portal-components → main

**Created:** November 17, 2025  
**Source Branch:** `feat/portal-components`  
**Target Branch:** `main` (up to date with `azure/main`)  
**Goal:** Safely merge ionic-app and all ionic app related components to main

---

## Executive Summary

The `feat/portal-components` branch contains:
- ✅ **New ionic-app** directory with complete mobile app setup
- ✅ **Mobile component suite** (~15 new components organized under `ui/mobile/`)
- ✅ **iOS/Capacitor configuration** and documentation
- ✅ **Component reorganization** (flat → `global/`, `web/`, `mobile/` structure)
- ⚠️ **Merge conflicts** in 7 key files that need resolution

### Risk Assessment: **MEDIUM-HIGH COMPLEXITY**

---

## What's Being Merged

### 1. Entirely New (Zero Conflicts)
These can be merged cleanly:

#### **ionic-app Directory** (New)
```
ionic-app/
├── src/app/
│   ├── pages/          # Mobile pages (Community, Home, Profile, etc.)
│   ├── components/     # ds-mobile-tabs
│   └── services/       # user.service.ts
├── ios/                # Complete iOS Capacitor setup
├── angular.json
├── capacitor.config.ts
├── package.json
└── Documentation (SETUP.md, CONFIGURATION.md, EXAMPLES.md, etc.)
```

#### **Mobile Components** (New)
```
design-system/src/app/components/ui/mobile/
├── app-layout/
├── bottom-sheet/      # Service + 3 bottom sheet components
├── comment/
├── content/
├── header-content/
├── lightbox/          # Service + lightbox components
├── modal/             # Service + modal component
├── page-main/
├── page-details/
├── post-card/
├── post-composer/
├── post-detail-modal/ # Service + modal component
├── tabs/
└── shared/            # mobile-common.css, mobile-page-base
```

#### **Documentation Files** (New)
- All `IMPLEMENTATION-*.md` files
- `IOS-SETUP.md`, `IOS-ALTERNATIVES.md`, `QUICKFIX-XCODE.md`
- `IONIC-DEPENDENCIES-STRATEGY.md`
- Component-specific README files

### 2. Structural Reorganization (Needs Careful Merge)

#### **Component Directory Structure Change**
**Before (main):**
```
projects/design-system-lib/src/ui/
├── button/
├── input/
├── select/
└── ...
```

**After (feat/portal-components):**
```
projects/design-system-lib/src/ui/
├── global/          # Shared components (button, input, etc.)
├── web/             # Web-only (data-table, sidebar, etc.)
└── mobile/          # Mobile-only (new)
```

**Impact:** All component imports will change from:
```typescript
// Old
import { DsButtonComponent } from './button/ds-button';

// New
import { DsButtonComponent } from './global/button/ds-button';
```

### 3. Files with Merge Conflicts

#### **Critical Conflicts to Resolve:**

1. **`design-system/projects/design-system-lib/src/ui/index.ts`**
   - **Issue:** Export paths changed due to restructuring
   - **Resolution:** Accept both changes, update paths to new structure

2. **`design-system/src/app/components/ui/index.ts`**
   - **Issue:** Same export path conflicts
   - **Resolution:** Accept both changes, update paths

3. **`design-system/src/app/components/ui/dialog/ds-dialog.ts` & `.css`**
   - **Issue:** Main has updates, branch has updates
   - **Resolution:** Manual merge, keep both enhancements

4. **`design-system/src/app/app.config.ts`**
   - **Issue:** Both branches modified app configuration
   - **Resolution:** Merge route configurations

5. **`design-system/package-lock.json` & `design-system/package.json`**
   - **Issue:** Different dependency versions
   - **Resolution:** Accept branch version (has Ionic/Capacitor deps), then run `npm install`

6. **`design-system/documentation.json`**
   - **Issue:** Storybook documentation differences
   - **Resolution:** Regenerate after merge

---

## Step-by-Step Merge Strategy

### Phase 1: Pre-Merge Preparation (15 minutes)

#### Step 1: Backup Current State
```bash
cd "/Users/modestas/Propbinder DS"

# Create a backup branch from main
git checkout main
git pull azure main
git checkout -b backup-main-pre-portal-merge

# Verify current branch
git branch
```

#### Step 2: Review Conflict Files
```bash
# Check what will conflict
git checkout main
git merge --no-commit --no-ff feat/portal-components

# Review conflicts
git status

# Abort to start fresh
git merge --abort
```

#### Step 3: Document Current Exports
```bash
# Save current export structure from main
git show main:design-system/projects/design-system-lib/src/ui/index.ts > /tmp/main-exports.ts
git show feat/portal-components:design-system/projects/design-system-lib/src/ui/index.ts > /tmp/branch-exports.ts

# Compare
diff /tmp/main-exports.ts /tmp/branch-exports.ts
```

---

### Phase 2: Execute the Merge (30-45 minutes)

#### Step 1: Start the Merge
```bash
cd "/Users/modestas/Propbinder DS"
git checkout main
git merge feat/portal-components --no-ff
```

Expected output: **CONFLICT** messages for 7 files

#### Step 2: Resolve Conflicts (Priority Order)

##### **Conflict 1: `design-system/package.json` & `package-lock.json`**

**Strategy:** Accept the feat/portal-components version (has Ionic/Capacitor deps)

```bash
cd design-system
git checkout --theirs package.json
git checkout --theirs package-lock.json
git add package.json package-lock.json
```

##### **Conflict 2: `design-system/projects/design-system-lib/src/ui/index.ts`**

**Strategy:** Manual merge - keep all exports but update paths

1. Open the file
2. Look for conflict markers `<<<<<<<`, `=======`, `>>>>>>>`
3. Create combined version:

```typescript
// Export structure after merge should be:

// ===== GLOBAL COMPONENTS (Shared between web and mobile) =====
export { DsButtonComponent } from './global/button/ds-button';
export { DsIconButtonComponent } from './global/button/ds-icon-button';
export { DsInputComponent } from './global/input/ds-input';
export { DsCheckboxComponent } from './global/checkbox/ds-checkbox';
export { DsAvatarComponent } from './global/avatar/ds-avatar';
export { DsBadgeComponent } from './global/badge/ds-badge';
export { DsLabelComponent } from './global/label/ds-label';
export { DsSelectComponent } from './global/select/ds-select';
export { DsTextareaComponent } from './global/textarea/ds-textarea';
export { DsTooltipComponent } from './global/tooltip/ds-tooltip';
export { DsSwitchComponent } from './global/switch/ds-switch';
export { DsIconComponent } from './global/icon/ds-icon';
export { DsLinkComponent } from './global/link/ds-link';
export { DsFormFieldComponent } from './global/form-field/ds-form-field';
export { DsComboboxComponent } from './global/combobox/ds-combobox';
export { DsListboxComponent } from './global/listbox/ds-listbox';
export { DsListComponent } from './global/list/ds-list';
export { DsListItemComponent } from './global/list-item/ds-list-item';
export { DsMenuComponent } from './global/menu/ds-menu';
export { DsDataItemComponent, DsDataItemDefaultComponent } from './global/data-item/ds-data-item';
export { DsDatepickerComponent } from './global/datepicker/ds-datepicker';
export { DsSelectDateComponent } from './global/select-date/ds-select-date';
export { DsSelectUserComponent } from './global/select-user/ds-select-user';
export { DsSelectBadgeComponent } from './global/select-badge/ds-select-badge';
export { DsTaskLocationSelectComponent } from './global/task-location-select/ds-task-location-select';
export { DsRecurrenceInputComponent } from './global/recurrence-input/ds-recurrence-input';
export { DsRecurrencePickerComponent } from './global/recurrence-picker/ds-recurrence-picker';
export { DsMetadataItemComponent } from './global/metadata-item/ds-metadata-item';
export { DsInlineMessageComponent } from './global/inline-message/ds-inline-message';
export { DsShapeIndicatorComponent } from './global/shape-indicator/ds-shape-indicator';
export { DsLoadingLabelComponent } from './global/loading-label/ds-loading-label.component';
export { DsAccordionComponent, DsAccordionItemComponent } from './global/accordion';
export { DsTileComponent, DsTileHeaderComponent, DsTileSectionComponent } from './global/tile';
export { DsTabComponent, DsTabsComponent } from './global/tabs';
export { DsSpinnerComponent } from './global/spinner/ds-spinner.component';
export { DsDrawerComponent, DsDrawerHeaderDefaultComponent, DsDrawerHeaderCreateComponent, DsDrawerHeaderCreatedComponent } from './global/drawer';

// Spark animation components
export {
  SparkAnimationType,
  AiSparksLoadingComponent,
  AiSparksStaticComponent,
  SparkLoadingComponent
} from './global/spark-animation';

// Editable table
export {
  DsEditableTableComponent,
  ActionCellComponent,
  DragHandleCellComponent,
  EditableDatepickerCellComponent,
  EditableNumberCellComponent,
  EditableSelectCellComponent,
  EditableTextCellComponent,
  BaseEditableCellComponent
} from './global/editable-table';

// Dialog
export { DsDialogComponent, DsConfirmationDialogComponent } from './dialog';

// ===== WEB COMPONENTS (Desktop only) =====
export { DsAppLayoutComponent } from './web/app-layout/ds-app-layout';
export { DsHeaderDetailsComponent } from './web/header-details/ds-header-details';
export { DsPropertySuggestionsComponent } from './web/property-suggestions/ds-property-suggestions.component';

// Sidebar
export {
  DsSidebarComponent,
  DsSidebarHeaderComponent,
  DsSidebarGlobalActionComponent,
  DsSidebarGroupComponent,
  DsSidebarGroupLabelComponent,
  DsSidebarGroupContentComponent,
  DsSidebarGroupContentItemComponent
} from './web/sidebar';

// Topbar
export {
  DsTopbarComponent,
  DsTopbarBreadcrumbComponent
} from './web/topbar';

// Data table
export {
  DsDataTableComponent,
  DsDataTableCellsComponent,
  BadgeCellComponent,
  DateCellComponent,
  IconTextCellComponent,
  BaseCellComponent,
  createBadgeColumn,
  createDateColumn,
  createIconTextColumn
} from './web/data-table';

// ===== MOBILE COMPONENTS (Mobile only) =====
export { DsMobileAppLayoutComponent } from './mobile/app-layout';
export { DsMobileMobileTabsComponent } from './mobile/tabs';
export { DsMobileContentComponent } from './mobile/content';
export { DsMobileHeaderContentComponent } from './mobile/header-content';
export { DsMobilePageMainComponent } from './mobile/page-main';
export { DsMobilePageDetailsComponent } from './mobile/page-details';
export { DsMobilePostCardComponent, DsMobilePostPdfAttachmentComponent } from './mobile/post-card';
export { DsMobilePostComposerComponent } from './mobile/post-composer';
export { DsMobileCommentComponent } from './mobile/comment';

// Mobile services
export { DsMobileModalService } from './mobile/modal';
export { DsMobileLightboxService, DsMobileLightboxComponent, DsMobileLightboxImageComponent, DsMobileLightboxPdfComponent, DsMobileLightboxHeaderComponent, DsMobileLightboxFooterComponent } from './mobile/lightbox';
export { DsMobileBottomSheetService, DsMobileCommentActionsBottomSheetComponent, DsMobilePostActionsBottomSheetComponent, DsMobilePostCreateBottomSheetComponent } from './mobile/bottom-sheet';
export { DsMobilePostDetailModalService, DsMobilePostDetailModalComponent } from './mobile/post-detail-modal';

// Mobile shared
export { MobilePageBase } from './mobile/shared';
```

4. Save and stage:
```bash
git add design-system/projects/design-system-lib/src/ui/index.ts
```

##### **Conflict 3: `design-system/src/app/components/ui/index.ts`**

**Strategy:** Same as above - manual merge with updated paths

```bash
# Same approach as library index.ts
# Open file, resolve conflicts, save, then:
git add design-system/src/app/components/ui/index.ts
```

##### **Conflict 4: `design-system/src/app/components/ui/dialog/*`**

**Strategy:** Keep enhancements from both branches

```bash
# For ds-dialog.ts
git checkout --ours design-system/src/app/components/ui/dialog/ds-dialog.ts
git checkout --theirs design-system/src/app/components/ui/dialog/ds-dialog.css

# Then manually review and merge any unique features from the other branch
# Open both files and ensure all features are preserved
git add design-system/src/app/components/ui/dialog/
```

##### **Conflict 5: `design-system/src/app/app.config.ts`**

**Strategy:** Merge route configurations

```bash
# Manual merge - combine routes from both branches
# Open file, look for route additions in both branches
# Ensure all routes are included
git add design-system/src/app/app.config.ts
```

##### **Conflict 6: `design-system/documentation.json`**

**Strategy:** Accept branch version, will regenerate

```bash
git checkout --theirs design-system/documentation.json
git add design-system/documentation.json
```

#### Step 3: Verify All Conflicts Resolved
```bash
git status

# Should show:
# - All conflicts fixed
# - Changes staged for commit
```

#### Step 4: Complete the Merge
```bash
git commit -m "Merge feat/portal-components: Add ionic-app and mobile components

- Add complete ionic-app with mobile pages and iOS setup
- Add mobile component suite (15+ components)
- Reorganize components into global/, web/, mobile/ structure
- Add Capacitor/iOS configuration and documentation
- Update dependencies for Ionic/mobile support

Conflicts resolved:
- package.json: Accepted branch version with Ionic deps
- ui/index.ts: Merged export paths for new structure
- app.config.ts: Combined route configurations
- dialog components: Preserved enhancements from both branches
"
```

---

### Phase 3: Post-Merge Verification (30 minutes)

#### Step 1: Install Dependencies
```bash
cd design-system
npm install

cd ../ionic-app
npm install
```

#### Step 2: Build Design System Library
```bash
cd design-system
npm run build:lib
```

Expected: Should build successfully with new mobile exports

#### Step 3: Build Design System App
```bash
npm run build
```

#### Step 4: Test Ionic App
```bash
cd ../ionic-app
npm run dev

# In another terminal, test iOS sync
npm run ios:local:sync
```

#### Step 5: Run Storybook (Optional)
```bash
cd design-system
npm run storybook
```

---

### Phase 4: Final Cleanup & Push (10 minutes)

#### Step 1: Update Documentation
```bash
# Regenerate Storybook documentation if needed
cd design-system
npm run build-storybook
```

#### Step 2: Commit Any Post-Merge Fixes
```bash
# If you needed to make fixes during verification
git add .
git commit -m "fix: post-merge adjustments for mobile components"
```

#### Step 3: Push to Remote
```bash
git push azure main
```

#### Step 4: Create PR (If Required)
If you need review before pushing to main:
```bash
git checkout -b merge/portal-components-to-main
git push azure merge/portal-components-to-main
# Create PR in Azure DevOps
```

---

## Rollback Plan

If merge causes critical issues:

```bash
# Option 1: Revert the merge commit
git revert -m 1 HEAD

# Option 2: Reset to backup
git reset --hard backup-main-pre-portal-merge

# Option 3: Cherry-pick specific commits
git cherry-pick <commit-hash>  # Pick only what you need
```

---

## Post-Merge Checklist

- [ ] Design system library builds successfully
- [ ] Design system app builds and runs
- [ ] Ionic app builds and runs
- [ ] iOS sync works (`npm run ios:local:sync`)
- [ ] All mobile components render correctly
- [ ] Storybook builds (if applicable)
- [ ] No broken imports in existing code
- [ ] Mobile services (modal, lightbox, bottom-sheet) work
- [ ] Documentation is up to date
- [ ] All tests pass (if you have tests)

---

## Key Files to Watch

After merge, these files will have changed significantly:

1. **`design-system/projects/design-system-lib/package.json`**
   - Version should remain at branch version or bump
   - Verify peer dependencies

2. **`design-system/projects/design-system-lib/src/ui/index.ts`**
   - All exports should use new paths
   - Mobile exports should be present

3. **`design-system/package.json`**
   - Should have Ionic/Capacitor dependencies

4. **`ionic-app/` directory**
   - Entirely new, verify all files are present

---

## Notes & Considerations

### Import Path Changes
All consuming applications will need to update imports if they were importing from the flat structure. However, since this is a library, the main export points (`public-api.ts`) should handle this internally.

### Version Strategy
After merge, consider:
- Bumping library to `0.3.0` (minor version for new features)
- Or `1.0.0` if this is considered a major milestone

### Mobile Component Readiness
- Mobile components are production-ready
- Services (modal, lightbox, bottom-sheet) are functional
- iOS setup is documented and tested

### Potential Issues
1. **CSS conflicts**: Mobile components use Ionic CSS, ensure no conflicts with existing styles
2. **Routing**: Mobile app has its own routing, shouldn't affect main app
3. **Bundle size**: Mobile components will increase library size - consider lazy loading

---

## Timeline Estimate

- **Phase 1 (Prep):** 15 minutes
- **Phase 2 (Merge):** 30-45 minutes
- **Phase 3 (Verify):** 30 minutes
- **Phase 4 (Push):** 10 minutes

**Total:** ~1.5-2 hours

---

## Success Criteria

✅ Merge completes without conflicts  
✅ All builds succeed  
✅ Ionic app runs on iOS simulator  
✅ Mobile components render correctly  
✅ No breaking changes for existing consumers  
✅ Documentation is complete  

---

## Questions or Issues?

If you encounter issues:

1. Check conflict resolution in Phase 2
2. Review build errors carefully
3. Verify all exports in `index.ts` files
4. Test mobile components individually
5. Consult existing documentation on feat/portal-components branch

---

**Last Updated:** November 17, 2025

