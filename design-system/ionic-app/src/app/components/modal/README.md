# Mobile Modal Service

A generic Angular + Ionic service for opening any component as a modal with flexible presentation styles.

## Features

- 🎯 **Generic & Type-safe** - Open any component with typed props
- 📱 **Multiple presentation styles** - Fullscreen, card, or sheet
- 👆 **Native gestures** - Swipe to close, drag to resize
- 🎨 **Customizable** - CSS classes, backdrop, animations
- ⚡ **Convenient helpers** - Quick methods for common patterns
- 🌓 **Safe area support** - Works with notched devices
- ♿ **Accessible** - Keyboard navigation and focus management

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { DsMobileModalService } from '@ds/ui/mobile';
import { MyDetailComponent } from './my-detail.component';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="openModal()">Open Modal</button>
  `
})
export class ExampleComponent {
  constructor(private modal: DsMobileModalService) {}

  async openModal() {
    await this.modal.open({
      component: MyDetailComponent,
      componentProps: {
        itemId: '123',
        title: 'Detail View'
      },
      presentationStyle: 'card'
    });
  }
}
```

### Opening a Post as a Modal

```typescript
import { MobilePostDetailPageComponent } from '@app/pages/mobile/post-detail.page';

async openPostModal(postId: string) {
  await this.modal.open({
    component: MobilePostDetailPageComponent,
    componentProps: {
      postId: postId,
      // Any other props your post page accepts
    },
    presentationStyle: 'card',
    backdropDismiss: true
  });
}
```

### Fullscreen Modal

```typescript
// Using the helper method
await this.modal.openFullscreen(PostDetailPage, {
  postId: '123'
});

// Or with full config
await this.modal.open({
  component: PostDetailPage,
  componentProps: { postId: '123' },
  presentationStyle: 'fullscreen',
  backdropDismiss: false,
  showBackdrop: false
});
```

### Card Modal (Default iOS Style)

```typescript
// Using the helper method
await this.modal.openCard(DetailComponent, {
  itemId: '456'
});

// Or with full config
await this.modal.open({
  component: DetailComponent,
  componentProps: { itemId: '456' },
  presentationStyle: 'card',
  backdropDismiss: true
});
```

### Bottom Sheet with Breakpoints

```typescript
// Using the helper method
await this.modal.openSheet(
  CommentsComponent,
  { postId: '789' },
  {
    initialBreakpoint: 0.5,
    breakpoints: [0, 0.5, 0.75, 1],
    swipeToClose: true
  }
);

// Or with full config
await this.modal.open({
  component: CommentsComponent,
  componentProps: { postId: '789' },
  presentationStyle: 'sheet',
  initialBreakpoint: 0.5,
  breakpoints: [0, 0.5, 0.75, 1],
  swipeToClose: true
});
```

### Dismissing with Data

In your modal component, inject ModalController to dismiss with data:

```typescript
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-modal',
  template: `
    <button (click)="save()">Save</button>
    <button (click)="cancel()">Cancel</button>
  `
})
export class EditModalComponent {
  constructor(private modalCtrl: ModalController) {}

  save() {
    this.modalCtrl.dismiss({
      saved: true,
      data: { /* your data */ }
    }, 'confirm');
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
```

Then handle the result:

```typescript
async openEditModal() {
  const modal = await this.modal.open({
    component: EditModalComponent,
    componentProps: { item: this.item }
  });

  const { data, role } = await modal.onDidDismiss();
  
  if (role === 'confirm' && data?.saved) {
    console.log('Saved data:', data.data);
  }
}
```

## API

### DsMobileModalService

#### Methods

##### `open<T>(options: ModalOptions<T>): Promise<HTMLIonModalElement>`

Opens a component as a modal with full configuration options.

##### `openFullscreen<T>(component: Type<T>, componentProps?: Record<string, any>): Promise<HTMLIonModalElement>`

Convenience method to open a component as a fullscreen modal.

##### `openCard<T>(component: Type<T>, componentProps?: Record<string, any>): Promise<HTMLIonModalElement>`

Convenience method to open a component as a card modal.

##### `openSheet<T>(component: Type<T>, componentProps?: Record<string, any>, options?: SheetOptions): Promise<HTMLIonModalElement>`

Convenience method to open a component as a bottom sheet with breakpoints.

##### `dismiss(data?: any, role?: string): Promise<boolean>`

Closes the currently open modal and optionally returns data.

##### `getTop(): Promise<HTMLIonModalElement | undefined>`

Gets the top-most modal if one exists.

### ModalOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `component` | `Type<T>` | **required** | Component to display in the modal |
| `componentProps` | `Record<string, any>` | `{}` | Props to pass to the component |
| `presentationStyle` | `'fullscreen' \| 'card' \| 'sheet'` | `'card'` | Modal presentation style |
| `backdropDismiss` | `boolean` | `true` | Enable tap outside to close |
| `showBackdrop` | `boolean` | `true` | Show modal backdrop |
| `keyboardClose` | `boolean` | `true` | Enable ESC key to close |
| `swipeToClose` | `boolean` | `undefined` | Enable swipe down to close |
| `initialBreakpoint` | `number` | `undefined` | Initial breakpoint (0-1) for sheets |
| `breakpoints` | `number[]` | `undefined` | Available breakpoints for sheets |
| `animated` | `boolean` | `true` | Enable modal animations |
| `mode` | `'ios' \| 'md'` | `'ios'` | Platform mode |
| `cssClass` | `string \| string[]` | `undefined` | Custom CSS class(es) |
| `handleNavigationBack` | `boolean` | `true` | Handle navigation back button |

## Presentation Styles

### Fullscreen

- Takes up entire screen
- No backdrop
- Best for full-page experiences
- Example: Image editor, full post view

```typescript
await this.modal.openFullscreen(EditorComponent);
```

### Card

- Card slides up from bottom
- Has backdrop
- Rounded top corners
- Best for detail views, forms
- Default iOS modal style

```typescript
await this.modal.openCard(DetailComponent);
```

### Sheet

- Bottom sheet with drag handle
- Multiple breakpoints (0.5, 0.75, 1.0)
- Draggable to resize
- Swipe down to close
- Best for contextual content, comments

```typescript
await this.modal.openSheet(CommentsComponent, {}, {
  initialBreakpoint: 0.5,
  breakpoints: [0, 0.5, 0.75, 1]
});
```

## Styling

The modal service includes global styles for all presentation types. You can customize with CSS variables:

```css
.ds-mobile-modal {
  --background: var(--color-background-neutral-primary);
  --border-radius: 16px;
  --box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}
```

### Custom Modal Styles

Add custom classes to your modal:

```typescript
await this.modal.open({
  component: MyComponent,
  cssClass: ['my-custom-modal', 'large-padding']
});
```

Then style in your global styles:

```css
.my-custom-modal::part(content) {
  padding: 32px;
  background: linear-gradient(to bottom, #fff, #f5f5f5);
}
```

## Examples

### Post Card Click → Post Detail Modal

```typescript
@Component({
  selector: 'app-feed',
  template: `
    <div class="feed">
      @for (post of posts; track post.id) {
        <ds-mobile-post-card
          [authorName]="post.author"
          [timestamp]="post.timestamp"
          (click)="openPostDetail(post.id)">
          <!-- post content -->
        </ds-mobile-post-card>
      }
    </div>
  `
})
export class FeedComponent {
  constructor(private modal: DsMobileModalService) {}

  async openPostDetail(postId: string) {
    await this.modal.openCard(MobilePostDetailPageComponent, {
      postId: postId
    });
  }
}
```

### Comments Sheet

```typescript
async openComments(postId: string) {
  const modal = await this.modal.openSheet(
    CommentsSheetComponent,
    { postId },
    {
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6, 0.9],
      swipeToClose: true
    }
  );

  // Handle when comments are closed
  const { data, role } = await modal.onDidDismiss();
  
  if (data?.newCommentAdded) {
    this.refreshComments();
  }
}
```

### Edit Form Modal

```typescript
async openEditForm(item: Item) {
  const modal = await this.modal.open({
    component: EditFormComponent,
    componentProps: { item },
    presentationStyle: 'card',
    backdropDismiss: false, // Prevent accidental closes
    keyboardClose: false
  });

  const { data, role } = await modal.onDidDismiss();
  
  if (role === 'save') {
    await this.saveItem(data.item);
  }
}
```

### Stacked Modals

You can stack modals on top of each other:

```typescript
// Open first modal
await this.modal.openCard(ListComponent);

// From within ListComponent, open detail modal
await this.modal.openCard(DetailComponent);

// Both modals are now in the stack
// Dismissing the detail modal returns to the list
```

## Accessibility

- ✅ **Keyboard navigation** - ESC to close, tab navigation
- ✅ **Focus management** - Focus trapped in modal
- ✅ **ARIA attributes** - Proper modal semantics
- ✅ **Reduced motion** - Respects user preferences
- ✅ **Screen readers** - Announces modal open/close

## Browser Support

Works in all modern browsers that support:
- CSS transforms
- Touch events
- ES2020+
- Ionic Framework

Tested on:
- iOS Safari 14+
- Chrome for Android
- Desktop Chrome, Safari, Firefox, Edge

## Performance

- **Lazy loading** - Components load on demand
- **Smooth animations** - GPU-accelerated
- **Memory efficient** - Modals destroyed when closed
- **Touch optimized** - Native scroll performance

## Related Components

- **[ds-mobile-lightbox](../lightbox/README.md)** - Specialized image lightbox
- **[ds-mobile-bottom-sheet](../bottom-sheet/README.md)** - Bottom sheet component
- **[ds-mobile-page-details](../page-details/README.md)** - Detail page layout

## Notes

- The service automatically handles safe areas on notched devices
- Modals are destroyed when dismissed to free memory
- You can have multiple modals stacked
- Sheet breakpoints are normalized between 0 and 1 (0 = closed, 1 = full height)
- Use `backdropDismiss: false` for important actions to prevent accidental closes

## Migration from Route-based Pages

If you currently use routing for detail pages and want to convert to modals:

**Before (routing):**
```typescript
this.router.navigate(['/post', postId]);
```

**After (modal):**
```typescript
await this.modal.openCard(PostDetailPage, { postId });
```

Benefits:
- Maintains context (doesn't lose scroll position on previous page)
- Better mobile UX (modal dismissal feels more natural)
- Easier to pass complex data (no URL serialization needed)
- Can return data back to the parent page

