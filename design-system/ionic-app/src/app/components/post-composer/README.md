# Mobile Post Composer Component

A "fake" input composer component for creating new posts in the community feed. This component displays a clickable interface that opens the full post creation flow when tapped.

## Features

- **User Avatar**: Displays the current user's avatar (from UserService)
- **Fake Input**: A styled input field with placeholder text
- **Post Button**: A simple text button to create posts
- **Click Handler**: Entire component is clickable to open post creation
- **Responsive**: Auto-adjusts for mobile and desktop
- **Threads-Inspired Design**: Clean, modern interface matching the design system

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { DsMobilePostComposerComponent } from '@propbinder/design-system';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [DsMobilePostComposerComponent],
  template: `
    <ds-mobile-post-composer
      [avatarInitials]="userService.avatarInitials()"
      [avatarType]="userService.avatarType()"
      [avatarSrc]="userService.avatarSrc()"
      (composerClick)="openPostCreator()">
    </ds-mobile-post-composer>
  `
})
export class CommunityPage {
  constructor(public userService: UserService) {}
  
  openPostCreator(): void {
    // Navigate to post creation page or open modal
    this.router.navigate(['/create-post']);
  }
}
```

### In Header-Expandable Section

This component is designed to be used in the header-expandable section of the page-main component:

```typescript
template: `
  <ds-mobile-page-main
    title="Community"
    [avatarInitials]="userService.avatarInitials()"
    [avatarType]="userService.avatarType()">
    
    <!-- Post Composer in header-expandable -->
    <ds-mobile-post-composer
      header-content
      [avatarInitials]="userService.avatarInitials()"
      [avatarType]="userService.avatarType()"
      [avatarSrc]="userService.avatarSrc()"
      (composerClick)="openPostCreator()"
    />
    
    <ds-mobile-content>
      <!-- Post feed content -->
    </ds-mobile-content>
  </ds-mobile-page-main>
`
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `avatarInitials` | `string` | `''` | Avatar initials (for initials type) |
| `avatarType` | `'initials' \| 'photo' \| 'icon'` | `'initials'` | Type of avatar to display |
| `avatarSrc` | `string` | `''` | Avatar photo source (for photo type) |
| `avatarIconName` | `string` | `'remixUser3Fill'` | Icon name (for icon type avatars) |
| `placeholder` | `string` | `"What's new?"` | Placeholder text for the input |
| `buttonText` | `string` | `'Post'` | Text for the post button |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `composerClick` | `void` | Emitted when the composer is clicked |

## Behavior

### Click Interaction

- The entire component is clickable (acts as a single button)
- On click, emits `composerClick` event
- Active state provides visual feedback (scale + opacity)
- Hover state on desktop (background color change)

### Input Field

- The input field is read-only and not directly editable
- It's styled to look interactive but prevents focus/editing
- Clicking it triggers the same `composerClick` event
- This is intentional - the real editor opens in a separate view

## Styling

The component uses CSS custom properties from your design system:

### Colors
- `--color-background-primary` - White background
- `--color-background-secondary` - Hover state background
- `--color-border-primary` - Input border color
- `--color-border-hover` - Input border hover color
- `--color-text-secondary` - Placeholder and button text color

### Typography
- Font family: 'Brockmann', sans-serif
- Font size: 15px
- Font weight: 400 (input), 600 (button)
- Line height: 20px
- Letter spacing: -0.3px

## Design Notes

This component is inspired by modern social media platforms like Threads, where the composer is a simple, inviting interface that opens a full editor when tapped. The "fake" input approach:

1. **Simplifies the UI**: No need for complex inline editing
2. **Better UX**: Full-screen editor provides more space and features
3. **Cleaner State**: No managing partial/draft posts in the feed
4. **Mobile-First**: Tapping opens a dedicated creation experience

## Examples

### With Custom Placeholder

```html
<ds-mobile-post-composer
  [avatarInitials]="'JD'"
  [placeholder]="'Share an update...'"
  [buttonText]="'Share'"
  (composerClick)="openComposer()">
</ds-mobile-post-composer>
```

### With Photo Avatar

```html
<ds-mobile-post-composer
  [avatarType]="'photo'"
  [avatarSrc]="'https://example.com/avatar.jpg'"
  (composerClick)="openComposer()">
</ds-mobile-post-composer>
```

### With Icon Avatar

```html
<ds-mobile-post-composer
  [avatarType]="'icon'"
  [avatarIconName]="'remixUser3Fill'"
  (composerClick)="openComposer()">
</ds-mobile-post-composer>
```

