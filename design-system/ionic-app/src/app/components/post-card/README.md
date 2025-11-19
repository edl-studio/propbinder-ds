# Mobile Post Card Component

A comprehensive, composable post card component for community feeds and social features. Inspired by Threads' clean and modern design, built with semantic slots following your design system patterns.

## Features

✅ **Semantic Composition** - Custom tags clearly communicate structure  
✅ **Multiple Variants** - Feed, detail, and compact display modes  
✅ **Touch Optimized** - Mobile-first with proper tap targets  
✅ **Flexible Content** - Text, media, attachments support  
✅ **Action Buttons** - Like, comment, share with counts  
✅ **Responsive** - Adapts from mobile to desktop  

---

## Component Hierarchy

```
ds-mobile-post-card
├── post-header
│   ├── post-avatar
│   ├── post-author
│   │   ├── author-name
│   │   └── author-meta
│   └── post-menu (optional)
├── post-content
│   ├── post-text
│   ├── post-media (optional)
│   └── post-attachments (optional)
└── post-actions
    ├── action-like
    ├── action-comment
    └── action-share
```

---

## Basic Usage

### Simple Feed Post

```typescript
<ds-mobile-post-card
  [clickable]="true"
  (postClick)="openPost()">
  
  <post-header>
    <post-avatar>
      <ds-avatar [initials]="'JD'" size="40px" />
    </post-avatar>
    <post-author>
      <author-name>John Doe</author-name>
      <author-meta>@johndoe · 2h ago</author-meta>
    </post-author>
  </post-header>
  
  <post-content>
    <post-text>Just moved into my new apartment! The view is amazing 🏙️</post-text>
  </post-content>
  
  <post-actions>
    <action-like [count]="42" (likeClick)="handleLike()">
      <ds-icon name="remixHeart3Line" size="20px" />
    </action-like>
    <action-comment [count]="12" (commentClick)="handleComment()">
      <ds-icon name="remixChat3Line" size="20px" />
    </action-comment>
    <action-share (shareClick)="handleShare()">
      <ds-icon name="remixShareForwardLine" size="20px" />
    </action-share>
  </post-actions>
</ds-mobile-post-card>
```

### Post with Media

```typescript
<ds-mobile-post-card>
  <post-header>
    <post-avatar>
      <ds-avatar [initials]="'SM'" size="40px" />
    </post-avatar>
    <post-author>
      <author-name>Sarah Miller</author-name>
      <author-meta>@sarahm · 45m ago</author-meta>
    </post-author>
    <post-menu>
      <button class="menu-btn">
        <ds-icon name="remixMore2Line" size="20px" />
      </button>
    </post-menu>
  </post-header>
  
  <post-content>
    <post-text>Check out the renovations we just finished!</post-text>
    <post-media>
      <img src="/images/renovation.jpg" alt="Renovated kitchen" />
    </post-media>
  </post-content>
  
  <post-actions>
    <action-like [active]="true" [count]="156">
      <ds-icon name="remixHeart3Fill" size="20px" />
    </action-like>
    <action-comment [count]="34">
      <ds-icon name="remixChat3Line" size="20px" />
    </action-comment>
    <action-share>
      <ds-icon name="remixShareForwardLine" size="20px" />
    </action-share>
  </post-actions>
</ds-mobile-post-card>
```

---

## Variants

### Feed Variant (Default)
Standard display for feed items with border and padding.

```typescript
<ds-mobile-post-card variant="feed">
  <!-- content -->
</ds-mobile-post-card>
```

### Detail Variant
Full-width display for post detail pages (no border).

```typescript
<ds-mobile-post-card variant="detail">
  <!-- content -->
</ds-mobile-post-card>
```

### Compact Variant
Smaller padding and spacing for nested/related posts.

```typescript
<ds-mobile-post-card variant="compact">
  <!-- content -->
</ds-mobile-post-card>
```

---

## Component Reference

### `ds-mobile-post-card`

Main container for post content.

**Inputs:**
- `variant?: 'feed' | 'detail' | 'compact'` - Display variant (default: 'feed')
- `clickable?: boolean` - Whether card is clickable (default: false)

**Outputs:**
- `(postClick): void` - Emits when card is clicked (if clickable)

---

### Post Header Components

#### `post-header`
Container for avatar, author info, and menu.

#### `post-avatar`
40x40px avatar container.

#### `post-author`
Author information wrapper.

#### `author-name`
Author display name (bold, 15px).

#### `author-meta`
Username, timestamp, etc. (light, 13px).

#### `post-menu`
Optional menu button (right-aligned).

---

### Post Content Components

#### `post-content`
Main content container with left padding on desktop.

#### `post-text`
Text content with pre-wrap for proper formatting.

#### `post-media`
Media container with 8px border radius.
- Auto-sizes images/videos to 100% width
- Maintains aspect ratio

#### `post-attachments`
Container for file attachments, links, etc.

---

### Post Action Components

#### `post-actions`
Action buttons container with 16px gap.

#### `action-like`
Like button with active state and count.

**Inputs:**
- `active?: boolean` - Whether user has liked (default: false)
- `count?: number` - Number of likes (default: 0)

**Outputs:**
- `(likeClick): void` - Emits when clicked

#### `action-comment`
Comment button with count.

**Inputs:**
- `count?: number` - Number of comments (default: 0)

**Outputs:**
- `(commentClick): void` - Emits when clicked

#### `action-share`
Share button.

**Outputs:**
- `(shareClick): void` - Emits when clicked

---

## Full Example in Feed

```typescript
@Component({
  selector: 'app-community-page',
  template: `
    <ds-mobile-page-main title="Community">
      <ds-mobile-content>
        @for (post of posts; track post.id) {
          <ds-mobile-post-card
            [clickable]="true"
            (postClick)="openPost(post.id)">
            
            <post-header>
              <post-avatar>
                <ds-avatar 
                  [initials]="post.author.initials" 
                  size="40px" />
              </post-avatar>
              <post-author>
                <author-name>{{ post.author.name }}</author-name>
                <author-meta>
                  @{{ post.author.username }} · {{ post.timestamp }}
                </author-meta>
              </post-author>
            </post-header>
            
            <post-content>
              <post-text>{{ post.content }}</post-text>
              @if (post.media) {
                <post-media>
                  <img [src]="post.media.url" [alt]="post.media.alt" />
                </post-media>
              }
            </post-content>
            
            <post-actions>
              <action-like 
                [active]="post.isLiked"
                [count]="post.likesCount"
                (likeClick)="toggleLike(post.id)">
                <ds-icon 
                  [name]="post.isLiked ? 'remixHeart3Fill' : 'remixHeart3Line'" 
                  size="20px" />
              </action-like>
              <action-comment 
                [count]="post.commentsCount"
                (commentClick)="openComments(post.id)">
                <ds-icon name="remixChat3Line" size="20px" />
              </action-comment>
              <action-share (shareClick)="sharePost(post.id)">
                <ds-icon name="remixShareForwardLine" size="20px" />
              </action-share>
            </post-actions>
          </ds-mobile-post-card>
        }
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
```

---

## Styling

### Design Tokens

The component uses your existing design tokens:

```css
--color-background-primary    /* Card background */
--color-border-subtle         /* Card border */
--color-text-primary          /* Main text */
--color-text-secondary        /* Action buttons */
--color-text-tertiary         /* Metadata */
--color-primary               /* Active states */
```

### Touch Targets

All interactive elements meet the 44x44px minimum touch target for accessibility.

### Animations

- `transform: scale(0.98)` on active state
- `0.2s ease` transitions for color changes
- Hover effects on desktop only

---

## Accessibility

✅ Semantic HTML structure  
✅ Proper ARIA labels on actions  
✅ Keyboard navigation support  
✅ Focus indicators  
✅ Touch-friendly tap targets (44x44px min)  
✅ Color contrast meets WCAG AA  

---

## Related Components

- `ds-mobile-page-main` - Page wrapper for feed
- `ds-mobile-content` - Content container
- `ds-avatar` - User avatars
- `ds-icon` - Action icons

---

## Next Steps

1. **Create Feed Container** - `ds-mobile-feed` for vertical list
2. **Add Comment Thread** - `ds-mobile-comment-thread` for discussions
3. **Build Post Details** - `ds-mobile-post-details` wrapper
4. **Implement Interactions** - Like/comment/share logic

