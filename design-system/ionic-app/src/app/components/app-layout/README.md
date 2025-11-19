# Mobile App Layout Component

A comprehensive mobile application shell component based on actual mobile page patterns. Provides tab navigation, flexible headers, and mobile-optimized layout structure.

## Features

- **Tab Bar Navigation**: Bottom tab bar with active state tracking and icon switching
- **Multiple Header Variants**: Home (with logomark), Simple (title only), Back (with back button), or None
- **Pull-to-Refresh**: Optional pull-to-refresh support with native iOS feel
- **Purple Brand Background**: Branded purple background with content wrapper
- **iOS Safe Area Support**: Handles notches and home indicators
- **Responsive**: Adapts to different mobile screen sizes

## Usage

### Basic Example with Tab Bar

```typescript
import { Component } from '@angular/core';
import { DsMobileAppLayoutComponent, TabConfig } from './mobile/app-layout/ds-mobile-app-layout';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [DsMobileAppLayoutComponent],
  template: `
    <ds-mobile-app-layout
      [showTabBar]="true"
      [tabs]="tabs"
      [headerVariant]="'none'"
    />
  `
})
export class AppShellComponent {
  tabs: TabConfig[] = [
    {
      id: 'home',
      label: 'Home',
      route: '/home',
      icon: 'remixHomeSmile2Line',
      iconActive: 'remixHomeSmile2Fill'
    },
    {
      id: 'profile',
      label: 'Profile',
      route: '/profile',
      icon: 'remixUser3Line',
      iconActive: 'remixUser3Fill'
    }
  ];
}
```

### Example: Home Header with Pull-to-Refresh

```typescript
template: `
  <ds-mobile-app-layout
    [headerVariant]="'home'"
    [showPullToRefresh]="true"
    [avatarType]="'initials'"
    [avatarInitials]="'JD'"
    (refresh)="handleRefresh($event)"
    (avatarClick)="handleAvatarClick()"
  >
    <div class="content">
      <!-- Your page content here -->
    </div>
  </ds-mobile-app-layout>
`

handleRefresh(event: any) {
  // Fetch fresh data
  setTimeout(() => {
    event.target.complete();
  }, 1000);
}
```

### Example: Simple Header (No Tab Bar)

```typescript
template: `
  <ds-mobile-app-layout
    [headerVariant]="'simple'"
    [pageTitle]="'Settings'"
    [showTabBar]="false"
  >
    <div class="content">
      <!-- Your settings content -->
    </div>
  </ds-mobile-app-layout>
`
```

### Example: Back Header (Detail Page)

```typescript
template: `
  <ds-mobile-app-layout
    [headerVariant]="'back'"
    [pageTitle]="'Property Details'"
    [showBackButton]="true"
    [showTabBar]="false"
    (backClick)="goBack()"
  >
    <div class="content">
      <!-- Your detail page content -->
    </div>
  </ds-mobile-app-layout>
`
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `headerVariant` | `'home' \| 'simple' \| 'back' \| 'none'` | `'simple'` | Header style variant |
| `pageTitle` | `string` | `''` | Page title (used in simple and back variants) |
| `showBackButton` | `boolean` | `false` | Show back button (back variant only) |
| `showPullToRefresh` | `boolean` | `false` | Enable pull-to-refresh |
| `showTabBar` | `boolean` | `false` | Show bottom tab bar navigation |
| `tabs` | `TabConfig[]` | `[]` | Tab configuration array |
| `avatarType` | `'initials' \| 'photo' \| 'icon'` | `'initials'` | Avatar type (home variant only) |
| `avatarInitials` | `string` | `'U'` | Avatar initials (home variant only) |
| `avatarSrc` | `string` | `''` | Avatar photo URL (home variant only) |
| `avatarIconName` | `string` | `'remixUser3Line'` | Avatar icon name (home variant only) |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `backClick` | `void` | Emitted when back button is clicked |
| `refresh` | `any` | Emitted when pull-to-refresh is triggered |
| `avatarClick` | `void` | Emitted when avatar is clicked (home variant) |
| `scroll` | `any` | Emitted on scroll events |

### Types

#### TabConfig

```typescript
interface TabConfig {
  id: string;           // Unique tab identifier
  label: string;        // Tab label text
  route: string;        // Navigation route
  icon: string;         // Default icon name
  iconActive: string;   // Active state icon name
}
```

## Header Variants

### `home`
- Displays Propbinder logomark on the left
- Shows avatar on the right (clickable)
- Best for main home/dashboard pages
- Purple background

### `simple`
- Just displays page title
- Transparent background
- Best for list/content pages

### `back`
- Back button + page title
- Transparent background
- Best for detail/secondary pages

### `none`
- No header shown
- Use when page needs custom header
- Good for tab bar shell where each child page has its own header

## Styling

The component uses:
- Purple brand background (`var(--color-brand-secondary)`)
- White text for headers
- Rounded content areas (24px border-radius)
- Safe area insets for iOS devices
- Gradient fade effect at header bottom

## Content Wrapper Pattern

For pages with custom headers and content that slides over a purple background, use this pattern inside the shell:

```html
<ds-mobile-app-layout [headerVariant]="'none'" [showTabBar]="false">
  <!-- Custom header section with purple background -->
  <div class="header-expandable">
    <h1>Welcome, User</h1>
    <p>Subtitle text here</p>
  </div>

  <!-- Content wrapper that slides over header -->
  <div class="content-wrapper">
    <div class="content-inner">
      <!-- Your page content -->
    </div>
  </div>
</ds-mobile-app-layout>
```

Then style it:

```css
.header-expandable {
  background: var(--color-brand-secondary);
  padding: 24px 16px;
  color: white;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  background: var(--color-background-neutral-primary);
  border-radius: 24px 24px 0 0;
  min-height: 100vh;
}

.content-inner {
  padding: 20px 16px 80px 16px;
}
```

## Notes

- The component automatically tracks the active tab based on the current route
- Pull-to-refresh uses Ionic's native refresher for iOS-style elastic feel
- Tab bar adjusts padding for iOS safe area (notches, home indicator)
- Content area uses `100svh` for proper mobile viewport height
- Scroll handling is optimized for iOS with `-webkit-overflow-scrolling: touch`

## See Also

- Check the existing mobile pages (`home.page.ts`, `inquiries.page.ts`) for real-world usage examples
- The `mobile-tabs-example.component.ts` shows how to set up the tab bar shell

