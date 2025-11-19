# Mobile Post Detail Modal

A dedicated Angular + Ionic modal component for displaying post details with comments. Follows the same pattern as the lightbox modal for consistent behavior.

## Features

- 📱 **Native iOS modal** - Card presentation style
- 📝 **Full post display** - Content, images, actions
- 💬 **Comments section** - All replies shown
- 🖼️ **Image lightbox** - Click images to view in lightbox
- 👆 **Like/comment actions** - Interactive post actions
- ✖️ **Easy dismissal** - Swipe down or tap close button
- 🌓 **Safe area support** - Works with notched devices

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { DsMobilePostDetailModalService } from '@ds/ui/mobile';

@Component({
  selector: 'app-community',
  template: `
    <ds-mobile-post-card 
      (postClick)="openPost()">
    </ds-mobile-post-card>
  `
})
export class CommunityComponent {
  constructor(private postModal: DsMobilePostDetailModalService) {}

  async openPost() {
    await this.postModal.open({
      postId: '123',
      authorName: 'John Doe',
      authorRole: 'Tenant',
      timestamp: '2h ago',
      avatarInitials: 'JD',
      content: 'Just moved into my new apartment!',
      isLiked: false,
      likeCount: 42,
      commentCount: 12
    });
  }
}
```

### With Image

```typescript
async openPostWithImage() {
  await this.postModal.open({
    postId: '456',
    authorName: 'Sarah Miller',
    authorRole: 'Tenant',
    timestamp: '4h ago',
    avatarInitials: 'SM',
    content: 'Beautiful view from my balcony!',
    imageSrc: 'Assets/Dummy-photos/balcony-view.jpg',
    imageAlt: 'Balcony view',
    isLiked: true,
    likeCount: 156,
    commentCount: 34
  });
}
```

### With Comments

```typescript
async openPostWithComments() {
  await this.postModal.open({
    postId: '789',
    authorName: 'Mike Johnson',
    authorRole: 'Tenant',
    timestamp: '1d ago',
    avatarInitials: 'MJ',
    content: 'Looking for gym recommendations',
    likeCount: 23,
    commentCount: 45,
    comments: [
      {
        authorName: 'John Doe',
        authorRole: 'Tenant',
        timestamp: '12h ago',
        avatarInitials: 'JD',
        content: 'Check out the gym on 5th street!',
        likeCount: 8
      },
      {
        authorName: 'Emma Brown',
        authorRole: 'Tenant',
        timestamp: '8h ago',
        avatarInitials: 'EB',
        content: 'I go to FitZone, great place!',
        isLiked: true,
        likeCount: 12
      }
    ]
  });
}
```

## API

### DsMobilePostDetailModalService

#### Methods

##### `open(postData: PostDetailData): Promise<void>`

Opens the post detail modal with the specified data.

##### `close(data?: any): Promise<boolean>`

Closes the currently open modal.

##### `getTop(): Promise<HTMLIonModalElement | undefined>`

Gets the top-most modal if one exists.

### PostDetailData

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `postId` | `string` | ✅ | Unique post identifier |
| `authorName` | `string` | ✅ | Post author name |
| `authorRole` | `string` | ✅ | Author role (e.g., 'Tenant') |
| `timestamp` | `string` | ✅ | Post timestamp (e.g., '2h ago') |
| `content` | `string` | ✅ | Post text content |
| `avatarInitials` | `string` | ❌ | Author initials |
| `avatarType` | `'photo' \| 'initials'` | ❌ | Avatar display type |
| `avatarSrc` | `string` | ❌ | Author avatar URL |
| `imageSrc` | `string` | ❌ | Post image URL |
| `imageAlt` | `string` | ❌ | Image alt text |
| `isLiked` | `boolean` | ❌ | Whether user liked the post |
| `likeCount` | `number` | ❌ | Number of likes |
| `commentCount` | `number` | ❌ | Number of comments |
| `comments` | `CommentData[]` | ❌ | Array of comments |

### CommentData

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `authorName` | `string` | ✅ | Comment author name |
| `authorRole` | `string` | ✅ | Author role |
| `timestamp` | `string` | ✅ | Comment timestamp |
| `avatarInitials` | `string` | ✅ | Author initials |
| `content` | `string` | ✅ | Comment text |
| `isLiked` | `boolean` | ❌ | Whether user liked the comment |
| `likeCount` | `number` | ❌ | Number of likes |

## Integration Example

### Community Page

```typescript
import { Component } from '@angular/core';
import { DsMobilePostDetailModalService } from '@ds/ui/mobile';

@Component({
  selector: 'app-community',
  template: `
    <ds-mobile-page-main title="Community">
      <ds-mobile-content>
        <div class="post-feed">
          @for (post of posts; track post.id) {
            <ds-mobile-post-card
              [authorName]="post.authorName"
              [authorRole]="post.authorRole"
              [timestamp]="post.timestamp"
              [avatarInitials]="post.avatarInitials"
              [clickable]="true"
              (postClick)="openPost(post)"
              (commentClick)="openPost(post)">
              <!-- post content -->
            </ds-mobile-post-card>
          }
        </div>
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
export class CommunityPageComponent {
  posts = [/* your posts */];

  constructor(private postModal: DsMobilePostDetailModalService) {}

  async openPost(post: any) {
    await this.postModal.open({
      postId: post.id,
      authorName: post.authorName,
      authorRole: post.authorRole,
      timestamp: post.timestamp,
      avatarInitials: post.avatarInitials,
      content: post.content,
      imageSrc: post.imageSrc,
      imageAlt: post.imageAlt,
      isLiked: post.isLiked,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      comments: post.comments
    });
  }
}
```

## Features

### Modal Controls

- **Close button** in header
- **Swipe down** to dismiss
- **Tap backdrop** to close
- **ESC key** to close

### Image Lightbox

Images in posts automatically open in the lightbox when clicked:

```typescript
// Clicking the image will:
// 1. Open the lightbox modal
// 2. Show full-screen image
// 3. Enable zoom gestures
// 4. Show post author info
```

### Like Actions

Like button is interactive in the modal:

```typescript
// When user toggles like:
// 1. UI updates immediately
// 2. Like count adjusts
// 3. State maintained in modal
```

## Styling

The modal uses your design system's color tokens:

```css
/* Header */
--color-background-neutral-primary
--color-text-primary

/* Content */
--color-background-neutral-primary
--color-border-subtle

/* Comments */
--color-text-primary
--color-text-secondary
```

## Behavior

### Opening

1. Modal slides up from bottom (iOS card style)
2. Content fades in
3. Scroll starts at top

### Dismissing

1. Swipe down or tap close
2. Modal slides down
3. Parent page scroll position maintained

### Image Viewing

1. Tap image in post
2. Lightbox modal opens on top
3. View full-screen image
4. Close lightbox → back to post modal
5. Close post modal → back to feed

## Accessibility

- ✅ **Keyboard navigation** - Close with ESC
- ✅ **Focus management** - Proper focus states
- ✅ **ARIA labels** - Screen reader support
- ✅ **Touch targets** - 44x44px minimum
- ✅ **Reduced motion** - Respects user preferences

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

## Related Components

- **[ds-mobile-lightbox](../lightbox/README.md)** - Image lightbox modal
- **[ds-mobile-post-card](../post-card/README.md)** - Post card component
- **[ds-mobile-comment](../comment/README.md)** - Comment component

## Notes

- The modal automatically handles safe areas on notched devices
- Images open in lightbox with same author context
- Modal uses the same presentation style as other iOS modals
- Follows the exact pattern as the lightbox service for consistency

## Troubleshooting

### Modal doesn't open

Make sure you've injected the service:
```typescript
constructor(private postModal: DsMobilePostDetailModalService) {}
```

### Can't dismiss modal

Ensure you have `ion-router-outlet` in your app:
```html
<ion-router-outlet></ion-router-outlet>
```

### Images don't open in lightbox

The lightbox service is automatically injected. Make sure:
- Image has `src` attribute
- `imageSrc` is provided in post data

## Migration from Router

If you're migrating from router-based navigation:

**Before:**
```typescript
openPost(postId: string) {
  this.router.navigate(['/post', postId]);
}
```

**After:**
```typescript
async openPost(post: Post) {
  await this.postModal.open({
    postId: post.id,
    // ... other properties
  });
}
```

Benefits:
- ✅ Maintains scroll position
- ✅ Native modal feel
- ✅ Faster (no route change)
- ✅ Better UX on mobile

