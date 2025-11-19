# Mobile Bottom Sheet Components

A complete implementation of Ionic 6 bottom sheet modals, based on the official [Ionic blog article](https://ionic.io/blog/5-examples-of-the-new-ionic-6-bottom-sheet-modal).

## Components

### DsMobileBottomSheetService

Service for creating and managing bottom sheet modals with support for:
- Multiple breakpoints for snap-to positions
- Customizable initial height
- Optional drag handle
- Backdrop blur effect
- Custom styling support

### DsMobilePostCreateBottomSheetComponent

Ready-to-use bottom sheet component for creating posts in the community feed.

## Features

✅ **Multiple Breakpoints**: Define snap points at different heights (0-1 scale)  
✅ **Drag Handle**: Optional handle for better UX  
✅ **Backdrop Blur**: iOS-style backdrop blur effect  
✅ **Keyboard Support**: Auto-focus input fields  
✅ **Responsive**: Works on mobile and desktop  
✅ **Custom Styling**: Full control via CSS classes and parts  

## Usage

### Basic Bottom Sheet

```typescript
import { Component } from '@angular/core';
import { DsMobileBottomSheetService } from '@propbinder/design-system';
import { MyContentComponent } from './my-content.component';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="openSheet()">Open Sheet</button>
  `
})
export class ExampleComponent {
  constructor(private bottomSheet: DsMobileBottomSheetService) {}
  
  async openSheet() {
    const sheet = await this.bottomSheet.create({
      component: MyContentComponent,
      breakpoints: [0, 0.5, 0.9],
      initialBreakpoint: 0.5,
      handle: true
    });
    
    const result = await sheet.onWillDismiss();
    if (result.role === 'confirm') {
      console.log('User confirmed with data:', result.data);
    }
  }
}
```

### Post Create Bottom Sheet

```typescript
import { Component } from '@angular/core';
import { 
  DsMobileBottomSheetService,
  DsMobilePostCreateBottomSheetComponent 
} from '@propbinder/design-system';

@Component({
  selector: 'app-community',
  template: `
    <button (click)="createPost()">Create Post</button>
  `
})
export class CommunityComponent {
  constructor(private bottomSheet: DsMobileBottomSheetService) {}
  
  async createPost() {
    const sheet = await this.bottomSheet.create({
      component: DsMobilePostCreateBottomSheetComponent,
      breakpoints: [0, 0.6, 0.95],
      initialBreakpoint: 0.6,
      handle: true,
      backdropBlur: true
    });
    
    const result = await sheet.onWillDismiss();
    if (result.role === 'post') {
      const postData = result.data;
      // Handle the new post
      console.log('New post:', postData.content);
    }
  }
}
```

### Custom Styling

```typescript
const sheet = await this.bottomSheet.create({
  component: MyComponent,
  breakpoints: [0, 0.5, 1],
  initialBreakpoint: 0.5,
  handle: true,
  cssClass: 'my-custom-sheet',
  backdropOpacity: 0.6,
  backdropBlur: true
});
```

Add custom styles in your `global.scss`:

```css
.my-custom-sheet::part(handle) {
  background: var(--color-brand-base);
  width: 48px;
  height: 5px;
}

.my-custom-sheet::part(content) {
  border-radius: 24px 24px 0 0;
}

.my-custom-sheet::part(backdrop) {
  backdrop-filter: blur(10px);
}
```

## Configuration Options

### BottomSheetOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `component` | `any` | Required | Component to display in the sheet |
| `componentProps` | `object` | `{}` | Props to pass to the component |
| `breakpoints` | `number[]` | `[0, 0.5, 0.9]` | Snap points (0-1 scale) |
| `initialBreakpoint` | `number` | `0.5` | Initial height (must be in breakpoints) |
| `handle` | `boolean` | `true` | Show drag handle |
| `cssClass` | `string\|string[]` | `''` | Custom CSS classes |
| `backdropDismiss` | `boolean` | `true` | Allow backdrop dismiss |
| `backdropOpacity` | `number` | `0.4` | Backdrop opacity (0-1) |
| `backdropBlur` | `boolean` | `false` | Enable backdrop blur |
| `keyboardClose` | `boolean` | `true` | Close on keyboard dismiss |

## Breakpoints Explained

Breakpoints are values between 0 and 1 representing the percentage of the screen height:

- `0`: Fully closed (required to allow dismissal)
- `0.5`: Half screen
- `0.9`: Nearly full screen
- `1`: Full screen

Example:
```typescript
breakpoints: [0, 0.3, 0.6, 0.9]
// User can drag to: closed, 30%, 60%, or 90% of screen height
```

## CSS Shadow Parts

You can style internal elements using CSS shadow parts:

### Available Parts

- `backdrop`: The dark overlay behind the sheet
- `handle`: The drag handle at the top
- `content`: The main content wrapper

### Example

```css
.custom-sheet::part(backdrop) {
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
}

.custom-sheet::part(handle) {
  background: var(--color-brand-base);
  width: 40px;
  height: 4px;
  border-radius: 2px;
}

.custom-sheet::part(content) {
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
}
```

## Examples from the Article

### 1. Basic Bottom Sheet
```typescript
await this.bottomSheet.create({
  component: SimpleModalComponent,
  breakpoints: [0, 0.3, 0.5, 0.8],
  initialBreakpoint: 0.5
});
```

### 2. Full Height Sheet
```typescript
await this.bottomSheet.create({
  component: ContentComponent,
  breakpoints: [0, 0.9],
  initialBreakpoint: 0.9,
  handle: true
});
```

### 3. Toast-Style (Auto-dismiss)
```typescript
const sheet = await this.bottomSheet.create({
  component: ToastComponent,
  breakpoints: [0, 0.3],
  initialBreakpoint: 0.3,
  handle: false,
  backdropDismiss: false
});

setTimeout(() => sheet.dismiss(), 2000);
```

### 4. With Backdrop Blur
```typescript
await this.bottomSheet.create({
  component: ContentComponent,
  breakpoints: [0, 0.5, 0.9],
  initialBreakpoint: 0.5,
  backdropBlur: true,
  backdropOpacity: 0.6
});
```

## Best Practices

1. **Always include 0 in breakpoints** to allow the sheet to be fully dismissed
2. **Set initialBreakpoint to a value in breakpoints array**
3. **Use handle for better UX** - helps users understand they can drag
4. **Enable backdropBlur sparingly** - it can impact performance on older devices
5. **Keep content scrollable** - use `ion-content` inside your component
6. **Handle keyboard properly** - the sheet adjusts automatically when keyboard appears

## Accessibility

- Drag handle has proper ARIA attributes
- Backdrop click dismisses by default
- Keyboard escape closes the sheet
- Focus management handled automatically

## Browser Support

Works on all modern browsers and platforms:
- ✅ iOS Safari (12+)
- ✅ Chrome/Android
- ✅ Desktop browsers
- ⚠️ Backdrop blur requires iOS 15+ / modern browsers

### Mobile Keyboard Behavior

**Important:** Mobile browsers have security restrictions that prevent programmatic keyboard opening from modals. This is intentional browser behavior to prevent abuse.

**What this means:**
- ✅ Input fields will be **focused** (cursor visible)
- ⚠️ Keyboard will **not automatically appear** on mobile
- ✅ **Single tap** on the focused field brings up keyboard immediately

This is standard behavior across all major apps (Instagram, Twitter, Facebook, etc.). The textarea will be ready and waiting for user input with minimal friction.

The component uses:
- `inputmode="text"` - Optimizes mobile keyboard layout
- `enterkeyhint="done"` - Shows appropriate keyboard action button
- Larger tap targets on mobile - Makes tapping easier
- Visual focus indicator - Shows the field is ready

## Related Components

- `DsMobilePageMain` - For full-page layouts
- `DsMobilePageDetails` - For detail pages
- `IonModal` - Base Ionic modal component

## Resources

- [Ionic 6 Bottom Sheet Article](https://ionic.io/blog/5-examples-of-the-new-ionic-6-bottom-sheet-modal)
- [Ionic Modal Docs](https://ionicframework.com/docs/api/modal)
- [CSS Shadow Parts](https://ionicframework.com/docs/theming/css-shadow-parts)

