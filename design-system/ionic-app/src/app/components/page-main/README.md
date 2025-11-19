# Mobile Page Main Component

A complete mobile page layout component for main/tab pages that combines fixed header, expandable purple header section, and white content wrapper.

## Features

- **Fixed Header**: Logomark + title + avatar at the top
- **Title Fade Animation**: Page title fades in on scroll
- **Expandable Purple Header**: Large title, subtitle, and custom content slot
- **White Content Wrapper**: Rounded content area that slides over purple background
- **Pull-to-Refresh**: iOS-style refresh with configurable parameters
- **Responsive**: Auto-adjusts padding and layout for mobile to desktop
- **Auto Scroll Handling**: Built-in scroll event handling for title animation

## Usage

### Basic Example (Simple Page)

```typescript
import { Component } from '@angular/core';
import { DsMobilePageMainComponent } from '@propbinder/design-system';

@Component({
  selector: 'app-inquiries',
  standalone: true,
  imports: [DsMobilePageMainComponent],
  template: `
    <ds-mobile-page-main
      title="Inquiries"
      [avatarInitials]="'JD'"
      (avatarClick)="openSettings()"
      (refresh)="handleRefresh($event)">
      
      <div class="page-content">
        <section>
          <!-- Your page content -->
        </section>
      </div>
    </ds-mobile-page-main>
  `
})
export class InquiriesPage {
  openSettings(): void {
    console.log('Avatar clicked');
  }
  
  handleRefresh(event: any): void {
    // Fetch fresh data
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
```

### With Custom Header Content

```typescript
@Component({
  template: `
    <ds-mobile-page-main
      title="Home"
      headerTitle="Welcome, Lars"
      headerSubtitle="Your rental property at a glance."
      [avatarInitials]="'L'"
      [avatarType]="'initials'">
      
      <!-- Custom header content (e.g., property tiles) -->
      <div header-content class="property-tiles">
        <div class="tile">
          <h3>Area</h3>
          <p>120 m²</p>
        </div>
        <div class="tile">
          <h3>Rooms</h3>
          <p>3 rooms</p>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="page-content">
        <!-- Your page sections -->
      </div>
    </ds-mobile-page-main>
  `
})
export class HomePage {}
```

### With Photo Avatar

```typescript
<ds-mobile-page-main
  title="Profile"
  [avatarType]="'photo'"
  [avatarSrc]="userPhotoUrl"
  (avatarClick)="openUserMenu()">
  
  <div class="page-content">
    <!-- Content -->
  </div>
</ds-mobile-page-main>
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | **required** | Page title (shown in fixed header and expandable header) |
| `headerTitle` | `string` | `''` | Optional different title for expandable header (if different from page title) |
| `headerSubtitle` | `string` | `''` | Subtitle text in expandable header |
| `avatarType` | `'initials' \| 'photo' \| 'icon'` | `'initials'` | Type of avatar to display |
| `avatarInitials` | `string` | `'U'` | Initials for avatar (if type is 'initials') |
| `avatarSrc` | `string` | `''` | Photo URL for avatar (if type is 'photo') |
| `avatarIconName` | `string` | `'remixUser3Line'` | Icon name for avatar (if type is 'icon') |
| `showRefresh` | `boolean` | `true` | Enable pull-to-refresh functionality |
| `showCondensedHeader` | `boolean` | `true` | Show Ionic condensed header for scroll effects |
| `scrollThreshold` | `number` | `160` | Pixels to scroll before title appears in fixed header |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `avatarClick` | `void` | Emitted when avatar is clicked |
| `refresh` | `any` | Emitted when pull-to-refresh is triggered (parent should call `event.target.complete()`) |
| `scroll` | `any` | Emitted on scroll events with scroll position data |

### Content Projection

| Selector | Description |
|----------|-------------|
| `[header-content]` | Custom content to display in the expandable purple header (e.g., property tiles, filters) |
| Default slot | Main page content (rendered inside white content wrapper) |

## Behavior

### Scroll Animation

When the user scrolls past the `scrollThreshold` (default 160px):
- The page title fades into the fixed header at the top
- Smooth 0.6s ease transition
- Automatically handles scroll event listening

### Pull-to-Refresh

- iOS-style elastic pull
- White spinner and chevron icon
- Configured with optimal pull factors (0.4) and distances (80-240px)
- Parent component must call `event.target.complete()` when refresh is done

### Responsive Layout

- **Mobile**: Full-width purple header, 16px side padding
- **Tablet (768px+)**: Content max-width, centered layout
- **Desktop (1440px+)**: Larger max-width and padding
- **XL (1920px+)**: Maximum padding for ultra-wide screens

### Desktop Behavior

- Fixed mobile header is hidden (replaced by `ds-mobile-tabs` top bar)
- Expandable header remains visible
- Content wrapper gets larger max-width and padding

## Styling

The component uses CSS custom properties from your design system:

### Colors
- `--color-brand-secondary` - Purple background
- `--color-background-neutral-primary` - White content background

### Typography
- `--font-size-base` - Fixed header title
- `--font-size-2xl` / `--font-size-3xl` - Expandable header title (responsive)
- `--font-size-sm` / `--font-size-base` - Subtitle (responsive)

### Spacing
- `--content-padding-md` / `--content-padding-lg` / `--content-padding-xl` - Responsive padding
- `--content-max-width-md` / `--content-max-width-lg` - Content max-width

### Transitions
- `--transition-duration-fast` - Button hovers
- `--ease-smooth` - Animation easing

## Custom Styling

You can override component styles in your page component:

```scss
::ng-deep ds-mobile-page-main {
  // Customize purple background color
  .header-expandable {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  // Adjust content wrapper
  .content-wrapper {
    border-radius: 32px 32px 0 0; // Larger radius
  }
}
```

## Migration from Manual Layout

### Before (Manual)
```typescript
<ion-header>
  <ion-toolbar>
    <div class="header-home">
      <svg>...</svg> <!-- Logo -->
      <ion-title>{{ title }}</ion-title>
      <ds-avatar [initials]="'JD'" />
    </div>
  </ion-toolbar>
</ion-header>

<ion-content (ionScroll)="handleScroll($event)">
  <ion-refresher (ionRefresh)="handleRefresh($event)">...</ion-refresher>
  
  <div class="header-expandable">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
  </div>
  
  <div class="content-wrapper">
    <div class="content-inner">
      <!-- Content -->
    </div>
  </div>
</ion-content>
```

### After (With Component)
```typescript
<ds-mobile-page-main
  title="Page Title"
  headerSubtitle="Subtitle"
  [avatarInitials]="'JD'"
  (refresh)="handleRefresh($event)">
  
  <!-- Just your content -->
  <div class="page-content">
    <!-- Content -->
  </div>
</ds-mobile-page-main>
```

**Benefits:**
- ✅ ~60 lines of boilerplate removed per page
- ✅ Logo SVG centralized (no duplication)
- ✅ Scroll handling built-in
- ✅ Consistent layout across all pages
- ✅ Responsive behavior automatic

## Browser Support

- iOS Safari 12+
- Android Chrome 90+
- Desktop browsers (latest 2 versions)
- Progressive Web Apps (PWA)

## Related Components

- **`ds-mobile-page-details`** - For detail/drill-down pages with back button
- **`ds-mobile-tabs`** - Tab navigation shell (contains multiple pages)
- **`ds-mobile-app-layout`** - Legacy layout component (consider migrating to page-main)
- **`ds-avatar`** - Avatar component (used in header)

## Examples

See the `home.page.ts`, `inquiries.page.ts`, `announcements.page.ts`, and `handbook.page.ts` files in the examples directory for real-world usage.

