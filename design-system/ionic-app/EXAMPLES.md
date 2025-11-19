# Example Pages Guide

This document explains the example pages included in this template and how to use them as reference.

---

## Examples Directory

### `modal-examples.page.ts`

**Purpose:** Demonstrates how to use the `DsMobileModalService` to open components as modals.

**Key Patterns:**
- Opening components as fullscreen modals
- Opening components as card modals (recommended)
- Opening components as bottom sheets
- Custom modal configurations
- Handling modal dismissal and data

**Usage:**
```typescript
import { DsMobileModalService } from '@propbinder/design-system';

constructor(private modal: DsMobileModalService) {}

// Open as card modal (recommended)
await this.modal.openCard(MyComponent, { prop: 'value' });

// Open as fullscreen
await this.modal.openFullscreen(MyComponent, { prop: 'value' });

// Open as sheet
await this.modal.openSheet(MyComponent, { prop: 'value' }, {
  initialBreakpoint: 0.75,
  breakpoints: [0, 0.5, 0.75, 1]
});
```

**When to use:** Reference this when you need to open any component as a modal in your app.

---

### `lightbox-test.page.ts`

**Purpose:** Demonstrates how to use the `DsMobileLightboxService` for image viewing.

**Key Patterns:**
- Opening single images
- Opening image galleries
- Configuring zoom and controls
- Adding author information

**Usage:**
```typescript
import { DsMobileLightboxService } from '@propbinder/design-system';

constructor(private lightbox: DsMobileLightboxService) {}

openLightbox() {
  this.lightbox.open({
    images: [
      {
        type: 'image',
        src: 'path/to/image.jpg',
        title: 'Image Title',
        alt: 'Image description'
      }
    ],
    enableZoom: true,
    showControls: true
  });
}
```

**When to use:** Reference this when implementing image viewing in your app.

---

## Demos Directory

### `home.page.ts`

**Purpose:** Example home page showing:
- `DsMobilePageMainComponent` usage
- Header content tiles
- Content sections with different layouts
- Pull-to-refresh implementation

**Key Features:**
- Expandable purple header
- Header tiles for summary data
- Content sections with grid layouts
- Navigation to detail pages

**When to use:** Use as a template for main/tab pages in your app.

---

### `handbook.page.ts`

**Purpose:** Simple content page example showing:
- Basic `DsMobilePageMainComponent` usage
- Content sections
- Minimal styling

**When to use:** Use as a template for simple content pages.

---

### `inquiries.page.ts`

**Purpose:** List page example showing:
- Page with list of items
- Pull-to-refresh
- Empty states

**When to use:** Use as a template for list/feed pages.

---

### `community.page.ts`

**Purpose:** Complex page example showing:
- Post feed
- Post cards
- Modal integration
- Bottom sheet usage
- Lightbox integration

**Key Features:**
- Full post feed implementation
- Post creation
- Post actions (like, comment, share)
- Modal navigation
- Image/PDF viewing

**When to use:** Reference this for complex pages with multiple features.

---

### `post-detail.page.ts`

**Purpose:** Detail page example showing:
- `DsMobilePageDetailsComponent` usage
- Post detail view
- Comments section
- Actions and interactions

**When to use:** Use as a template for detail/drill-down pages.

---

## How to Use Examples

### 1. Study the Pattern

Look at how components are imported and used:
```typescript
// Correct: Import from design system
import { DsMobilePageMainComponent } from '@propbinder/design-system';

// Not: Relative imports (this is what you should avoid)
// import { DsMobilePageMainComponent } from '../../components/ui/mobile/...';
```

### 2. Copy the Structure

Copy the component structure and adapt to your needs:
```typescript
// Copy the component setup
@Component({
  imports: [DsMobilePageMainComponent],
  template: `...`
})
```

### 3. Customize for Your App

Replace placeholder content with your actual data and logic:
```typescript
// Replace example data
tabs: TabConfig[] = [
  {
    id: 'home',
    label: 'Home',
    route: '/home',
    icon: 'remixHomeSmile2Line',
    iconActive: 'remixHomeSmile2Fill'
  }
  // Add your tabs
];
```

---

## Best Practices from Examples

### 1. Always Import from Package

```typescript
// ✅ Correct
import { DsMobilePageMainComponent } from '@propbinder/design-system';

// ❌ Wrong (for recipe/template)
import { DsMobilePageMainComponent } from '../../components/ui/mobile/...';
```

### 2. Use Standalone Components

All examples use standalone Angular components:
```typescript
@Component({
  standalone: true,
  imports: [DsMobilePageMainComponent]
})
```

### 3. Handle Events Properly

```typescript
// Pull-to-refresh
handleRefresh(event: any) {
  // Do your refresh logic
  setTimeout(() => {
    event.target.complete(); // Always complete the refresh
  }, 1000);
}

// Navigation
navigateToDetail() {
  this.navCtrl.navigateForward('/detail');
}
```

### 4. Use Services for Complex Features

```typescript
// Use services for modals, lightboxes, etc.
constructor(
  private modal: DsMobileModalService,
  private lightbox: DsMobileLightboxService
) {}
```

---

## Creating Your Own Pages

### Step 1: Create Component File

```typescript
// src/app/pages/my-page.page.ts
import { Component } from '@angular/core';
import { DsMobilePageMainComponent } from '@propbinder/design-system';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [DsMobilePageMainComponent],
  template: `
    <ds-mobile-page-main title="My Page">
      <div class="page-content">
        <!-- Your content -->
      </div>
    </ds-mobile-page-main>
  `
})
export class MyPageComponent {}
```

### Step 2: Add to Routes

```typescript
// src/app/app.routes.ts
import { MyPageComponent } from './pages/my-page.page';

export const routes: Routes = [
  {
    path: 'my-page',
    component: MyPageComponent
  }
];
```

### Step 3: Test

```bash
npm start
# Navigate to /my-page
```

---

## Component-Specific Examples

### Using DsMobilePageMainComponent

See: `home.page.ts`, `handbook.page.ts`, `inquiries.page.ts`

**Key Props:**
- `title` - Page title
- `avatarInitials` - Avatar initials
- `headerTitle` - Expandable header title
- `headerSubtitle` - Expandable header subtitle
- `(refresh)` - Pull-to-refresh handler

### Using DsMobilePageDetailsComponent

See: `home-detail.page.ts`, `post-detail.page.ts`

**Key Props:**
- `title` - Page title
- `backRoute` - Default back route
- `(back)` - Custom back handler

### Using DsMobilePostCardComponent

See: `community.page.ts`

**Key Props:**
- `authorName`, `authorRole`, `timestamp`
- `avatarInitials`
- `(postClick)` - Handle post click
- `(likeClick)`, `(commentClick)`, `(shareClick)` - Action handlers

### Using DsMobileModalService

See: `modal-examples.page.ts`, `community.page.ts`

**Methods:**
- `openCard()` - Open as card modal
- `openFullscreen()` - Open as fullscreen
- `openSheet()` - Open as bottom sheet
- `open()` - Full configuration

### Using DsMobileLightboxService

See: `lightbox-test.page.ts`, `community.page.ts`

**Methods:**
- `open()` - Open image lightbox
- `openImages()` - Open image gallery
- `openPdf()` - Open PDF viewer

### Using DsMobileBottomSheetService

See: `community.page.ts`, `post-create.page.ts`

**Methods:**
- `open()` - Open bottom sheet
- `openPostCreate()` - Open post creation sheet
- `openPostActions()` - Open post actions sheet

---

## Troubleshooting Examples

### Example Page Not Loading

- Check that component is imported in `app.routes.ts`
- Verify route path matches
- Check browser console for errors

### Components Not Rendering

- Ensure design system is installed: `npm install @propbinder/design-system`
- Check that Ionic is installed: `npm install @ionic/angular`
- Verify imports are from `@propbinder/design-system`

### Services Not Working

- Ensure Capacitor plugins are installed
- Run `npx cap sync ios` after installing plugins
- Check that services are provided in `app.config.ts`

---

## Next Steps

1. **Study the examples** to understand patterns
2. **Copy and adapt** examples for your use case
3. **Remove examples** once you've learned from them
4. **Create your own pages** using the same patterns

---

## Reference

- **Component Documentation:** See design system Storybook
- **Service Documentation:** See component READMEs in design system
- **Ionic Documentation:** https://ionicframework.com/docs
- **Capacitor Documentation:** https://capacitorjs.com/docs

