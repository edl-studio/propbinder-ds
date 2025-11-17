# Mobile Page Details Component

A mobile page layout component for detail/drill-down pages with back button navigation and responsive header.

## Features

- **Back Button Header**: Purple header with back button (mobile)
- **Desktop Header**: Alternative header layout above content (desktop)
- **White Background**: Clean, content-focused layout
- **Smart Navigation**: Auto-handles back navigation with fallbacks
- **Responsive Padding**: Auto-adjusts for all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { DsMobilePageDetailsComponent } from '@propbinder/design-system';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [DsMobilePageDetailsComponent],
  template: `
    <ds-mobile-page-details
      title="Property Details"
      (back)="goBack()">
      
      <div class="page-content">
        <!-- Your detail content -->
        <section>
          <h2>Overview</h2>
          <p>Property information...</p>
        </section>
      </div>
    </ds-mobile-page-details>
  `
})
export class PropertyDetailsPage {
  goBack(): void {
    // Custom navigation logic
    console.log('Going back');
  }
}
```

### With Default Back Route

If you don't provide a `(back)` handler, you can set a default route:

```typescript
<ds-mobile-page-details
  title="Invoice Details"
  backRoute="/invoices">
  
  <div class="page-content">
    <!-- Content -->
  </div>
</ds-mobile-page-details>
```

### Using NavController

```typescript
import { NavController } from '@ionic/angular/standalone';

@Component({
  template: `
    <ds-mobile-page-details
      title="Document Details"
      (back)="handleBack()">
      <!-- Content -->
    </ds-mobile-page-details>
  `
})
export class DocumentDetailsPage {
  constructor(private navCtrl: NavController) {}
  
  handleBack(): void {
    // Navigate to specific route instead of browser back
    this.navCtrl.navigateBack(['/documents']);
  }
}
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | **required** | Page title displayed in header |
| `backRoute` | `string` | `''` | Optional default route to navigate back to (used if no `back` handler) |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `back` | `void` | Emitted when back button is clicked (if not handled, falls back to `backRoute` or browser back) |

### Content Projection

| Selector | Description |
|----------|-------------|
| Default slot | Main page content (rendered inside content area with responsive padding) |

## Navigation Behavior

The component uses a smart fallback system for back navigation:

1. **If `(back)` output has listeners**: Emits event to parent component
2. **Else if `backRoute` is provided**: Navigates to specified route using `NavController.navigateBack()`
3. **Else**: Uses browser back button (`NavController.back()`)

### Examples

```typescript
// 1. Custom handler (highest priority)
<ds-mobile-page-details
  title="Details"
  (back)="customLogic()">
</ds-mobile-page-details>

// 2. Default route (if no handler provided)
<ds-mobile-page-details
  title="Details"
  backRoute="/home">
</ds-mobile-page-details>

// 3. Browser back (if neither provided)
<ds-mobile-page-details
  title="Details">
</ds-mobile-page-details>
```

## Layout Structure

### Mobile (< 768px)
```
┌─────────────────────────┐
│ ← Property Details      │ ← Purple header
├─────────────────────────┤
│                         │
│   Content Area          │ ← White background
│   (with padding)        │
│                         │
└─────────────────────────┘
```

### Desktop (≥ 768px)
```
┌─────────────────────────┐
│ ← Property Details      │ ← Header above content
├─────────────────────────┤
│                         │
│   Content Area          │ ← White background
│   (centered, max-width) │
│                         │
└─────────────────────────┘
```

## Responsive Behavior

### Mobile
- Purple header with back button + centered title
- Full-width content with 16px padding
- Back button uses white color

### Desktop (768px+)
- Mobile header hidden
- Desktop header shown above content (dark text color)
- Content centered with max-width
- Larger padding and typography

### Breakpoint Details

| Breakpoint | Padding | Max-Width | Title Size |
|------------|---------|-----------|------------|
| Mobile | 20px / 16px | Full-width | 16px |
| Tablet (768px) | 32px / var(--content-padding-md) | --content-max-width-md | 24px |
| Desktop (992px) | 32px / var(--content-padding-lg) | --content-max-width-md | 24px |
| Large (1440px) | 32px / var(--content-padding-xl) | --content-max-width-lg | 24px |
| XL (1768px) | 32px / var(--content-padding-2xl) | --content-max-width-lg | 24px |
| XXL (1920px) | 32px / var(--content-padding-3xl) | --content-max-width-lg | 24px |

## Styling

The component uses CSS custom properties from your design system:

### Colors
- `--color-brand-secondary` - Purple header background (mobile)
- `--color-background-neutral-primary` - White content background
- `--text-color-default-primary` - Desktop header text

### Typography
- `--font-size-base` - Mobile header title
- `--font-size-2xl` - Desktop header title

### Spacing
- `--content-padding-md` / `--content-padding-lg` / `--content-padding-xl` - Responsive padding
- `--content-max-width-md` / `--content-max-width-lg` - Content max-width

### Transitions
- `--transition-duration-fast` - Button hover
- `--ease-smooth` - Animation easing

## Custom Styling

Override component styles as needed:

```scss
::ng-deep ds-mobile-page-details {
  // Customize mobile header
  .header-back {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  // Adjust content padding
  .detail-content {
    padding-top: 40px;
  }
}
```

## Accessibility

The component follows accessibility best practices:

- **ARIA Label**: Back button has `aria-label="Go back"`
- **Keyboard Navigation**: Back button is keyboard accessible
- **Focus States**: Button has visible focus indication
- **Semantic HTML**: Uses proper heading hierarchy (`h1` for title)

## Migration from Manual Layout

### Before (Manual)
```typescript
<ion-header>
  <ion-toolbar>
    <div class="header-back">
      <button (click)="goBack()">
        <ds-icon name="remixArrowLeftLine" />
      </button>
      <h1>Property Details</h1>
    </div>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="desktop-header">
    <button (click)="goBack()">
      <ds-icon name="remixArrowLeftLine" />
    </button>
    <h1>Property Details</h1>
  </div>
  
  <div class="detail-content">
    <!-- Content -->
  </div>
</ion-content>
```

### After (With Component)
```typescript
<ds-mobile-page-details
  title="Property Details"
  (back)="goBack()">
  
  <div class="page-content">
    <!-- Content -->
  </div>
</ds-mobile-page-details>
```

**Benefits:**
- ✅ ~130 lines of boilerplate removed
- ✅ Consistent header behavior
- ✅ Smart navigation fallbacks built-in
- ✅ Responsive layout automatic
- ✅ Accessibility baked in

## Common Patterns

### Navigate to Parent List

```typescript
<ds-mobile-page-details
  title="User Profile"
  backRoute="/users">
  <!-- Content -->
</ds-mobile-page-details>
```

### Navigate to Specific Tab

```typescript
handleBack(): void {
  this.navCtrl.navigateBack(['/mobile-tabs/home']);
}
```

### Navigate with State

```typescript
handleBack(): void {
  this.navCtrl.navigateBack(['/properties'], {
    state: { refreshList: true }
  });
}
```

## Browser Support

- iOS Safari 12+
- Android Chrome 90+
- Desktop browsers (latest 2 versions)
- Progressive Web Apps (PWA)

## Related Components

- **`ds-mobile-page-main`** - For main/tab pages with purple expandable header
- **`ds-mobile-tabs`** - Tab navigation shell
- **`ds-icon`** - Icon component (used for back arrow)

## Examples

See the `home-detail.page.ts` file in the examples directory for real-world usage.

