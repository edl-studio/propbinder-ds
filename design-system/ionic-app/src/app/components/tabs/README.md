# Mobile Tabs Component

A responsive tab navigation component that adapts seamlessly from mobile to desktop layouts while maintaining native Ionic routing functionality.

## Features

- **Responsive Design**: Automatically adapts between mobile bottom tabs and desktop top navigation
- **Native Routing**: Full integration with Ionic's `ion-tabs` and Angular Router
- **Branded Desktop Layout**: Logo, tabs, and avatar in a unified top bar on desktop
- **Mobile-Optimized**: Bottom tab bar with icons and labels on mobile devices
- **iOS Safe Areas**: Proper handling of notches and home indicators
- **Active State Tracking**: Automatic tab highlighting based on current route
- **Customizable Avatar**: Support for initials, photos, or icons

## Visual Layout

### Mobile (< 768px)
```
┌─────────────────────────┐
│                         │
│   Page Content          │
│   (via router-outlet)   │
│                         │
├─────────────────────────┤
│ 🏠  📋  👥  📖          │ ← Bottom tab bar
└─────────────────────────┘
```

### Desktop (≥ 768px)
```
┌─────────────────────────────────────┐
│ 🏢  🏠 Home  📋 Inquiries  👥  👤   │ ← Unified top bar
├─────────────────────────────────────┤
│                                     │
│   Page Content                      │
│   (via router-outlet)               │
└─────────────────────────────────────┘
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DsMobileTabsComponent, TabConfig } from '@propbinder/design-system';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, DsMobileTabsComponent],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
      <ds-mobile-tabs
        [tabs]="tabs"
        [avatarInitials]="'JD'"
        (avatarClick)="handleAvatarClick()"
      />
    </ion-app>
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
      id: 'inbox',
      label: 'Inbox',
      route: '/inbox',
      icon: 'remixMailLine',
      iconActive: 'remixMailFill'
    },
    {
      id: 'profile',
      label: 'Profile',
      route: '/profile',
      icon: 'remixUser3Line',
      iconActive: 'remixUser3Fill'
    }
  ];
  
  handleAvatarClick(): void {
    console.log('Navigate to settings or profile');
  }
}
```

### With Photo Avatar

```typescript
@Component({
  template: `
    <ds-mobile-tabs
      [tabs]="tabs"
      [avatarType]="'photo'"
      [avatarSrc]="userPhotoUrl"
      (avatarClick)="openUserMenu()"
    />
  `
})
export class AppShellComponent {
  userPhotoUrl = 'https://example.com/user-photo.jpg';
  
  openUserMenu(): void {
    // Show dropdown menu or navigate
  }
}
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `tabs` | `TabConfig[]` | **required** | Array of tab configurations |
| `avatarType` | `'initials' \| 'photo' \| 'icon'` | `'initials'` | Type of avatar to display |
| `avatarInitials` | `string` | `'U'` | Initials to show in avatar (if type is 'initials') |
| `avatarSrc` | `string` | `''` | Photo URL (if type is 'photo') |
| `avatarIconName` | `string` | `'remixUser3Line'` | Icon name (if type is 'icon') |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `avatarClick` | `void` | Emitted when avatar is clicked |

### Types

#### TabConfig

```typescript
interface TabConfig {
  id: string;           // Unique tab identifier (used for active state)
  label: string;        // Tab label text
  route: string;        // Navigation route path
  icon: string;         // Default icon name (Remix Icon)
  iconActive: string;   // Active state icon name
}
```

## Routing Setup

The component requires proper Angular routing configuration with child routes:

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'inbox',
        component: InboxPageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
```

## Styling

The component uses CSS Grid for the desktop layout, ensuring proper alignment of logo, tabs, and avatar:

### Desktop Layout Structure
```
┌──────────────────────────────────────────────┐
│ [Logo] [Tab 1] [Tab 2] [Tab 3]  ...  [👤]  │
│   ↑         ↑                          ↑     │
│ grid-1    grid-2 (flex container)   grid-3  │
└──────────────────────────────────────────────┘
```

### Custom Styling

You can override styles using CSS custom properties:

```css
ds-mobile-tabs {
  --tab-bar-background: var(--color-brand-secondary);
  --tab-bar-height: 64px;
  --tab-button-color-inactive: rgba(255, 255, 255, 0.7);
  --tab-button-color-active: white;
}
```

## Best Practices

1. **Tab Count**: Keep tabs to 3-5 items for optimal mobile UX
2. **Icon Selection**: Use outline icons for inactive, filled for active states
3. **Route Naming**: Use descriptive, lowercase route names
4. **Avatar Click**: Connect to user menu or settings navigation
5. **Safe Areas**: Component automatically handles iOS safe areas

## Migration from `ds-mobile-app-layout`

If you're using the older `ds-mobile-app-layout` with `showTabBar="true"`:

### Before
```typescript
<ds-mobile-app-layout
  [showTabBar]="true"
  [tabs]="tabs"
/>
```

### After
```typescript
<ds-mobile-tabs
  [tabs]="tabs"
  [avatarInitials]="'JD'"
/>
```

**Benefits of migration:**
- ✅ Responsive desktop layout with logo and avatar
- ✅ Cleaner API (dedicated tab component)
- ✅ Better separation of concerns
- ✅ Grid-based desktop layout (not absolute positioning)

## Browser Support

- iOS Safari 12+
- Android Chrome 90+
- Desktop Chrome, Firefox, Safari, Edge (latest 2 versions)
- Progressive Web Apps (PWA) with proper safe area handling

## Related Components

- `ds-mobile-app-layout` - Page layout component (use for individual pages)
- `ds-avatar` - Avatar component (used internally)
- `ds-icon` - Icon component (used internally)

## Examples

See the `mobile-tabs-example.component.ts` in the examples directory for a complete working implementation.

