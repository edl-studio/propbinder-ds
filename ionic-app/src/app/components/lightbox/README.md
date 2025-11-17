# Mobile Lightbox Components

A suite of full-screen viewer components for displaying images and PDFs in your mobile app.

## Components

### 1. **DsMobileLightboxImageComponent**
Full-screen image viewer with native mobile gestures.

**Features:**
- Swipe left/right to navigate between images
- Pinch-to-zoom and double-tap zoom
- Pan around zoomed images
- Image counter and navigation controls
- Share functionality (native share sheet)
- Author information display

### 2. **DsMobileLightboxPdfComponent**
PDF viewer that opens documents in the native device viewer.

**Features:**
- Native iOS/Android PDF viewing experience
- Automatic download and caching for remote PDFs
- Share functionality
- Loading states and error handling
- File size and page count display
- Author information display

## Installation

The following Capacitor plugins are required:

```bash
npm install @capacitor/filesystem
npm install @capacitor/share
npm install @capacitor/browser
```

Sync with native platforms:

```bash
npx cap sync ios
npx cap sync android
```

## Usage

### Basic Image Lightbox

```typescript
import { DsMobileLightboxService } from './components/ui/mobile/lightbox';

constructor(private lightbox: DsMobileLightboxService) {}

async openImages() {
  await this.lightbox.openImages({
    images: [
      {
        type: 'image',
        src: 'https://example.com/photo1.jpg',
        title: 'Beautiful Sunset',
        description: 'A stunning view from the beach',
        alt: 'Sunset over ocean'
      },
      {
        type: 'image',
        src: 'https://example.com/photo2.jpg',
        title: 'Mountain View'
      }
    ],
    initialIndex: 0,
    enableZoom: true,
    showControls: true,
    enableSwipe: true,
    author: {
      name: 'John Doe',
      role: 'Photographer',
      timestamp: '2 hours ago',
      avatarInitials: 'JD'
    }
  });
}
```

### Basic PDF Viewer

```typescript
async openPdf() {
  await this.lightbox.openPdf({
    pdf: {
      type: 'pdf',
      src: 'https://example.com/document.pdf',
      title: 'Project Proposal',
      description: 'Q1 2024 Marketing Strategy',
      fileSize: 2457600, // bytes (optional)
      pageCount: 15 // optional
    },
    author: {
      name: 'Jane Smith',
      role: 'Marketing Manager',
      timestamp: '1 day ago',
      avatarInitials: 'JS'
    }
  });
}
```

### Backward Compatible (Legacy API)

The service maintains backward compatibility with the original API:

```typescript
// This still works!
await this.lightbox.open({
  images: [
    { src: 'image.jpg', title: 'Image' }
  ]
});
```

## Type Definitions

### LightboxImage

```typescript
interface LightboxImage {
  type: 'image';
  src: string;              // Image URL
  title?: string;           // Image title
  description?: string;     // Image description
  alt?: string;            // Alt text for accessibility
  thumbnail?: string;       // Thumbnail URL (optional)
  isLiked?: boolean;       // Like state (optional)
  likeCount?: number;      // Like count (optional)
  commentCount?: number;   // Comment count (optional)
}
```

### LightboxPdf

```typescript
interface LightboxPdf {
  type: 'pdf';
  src: string;              // PDF URL or local path
  title?: string;           // Document title
  description?: string;     // Document description
  fileSize?: number;        // File size in bytes
  pageCount?: number;       // Number of pages
}
```

### LightboxAuthor

```typescript
interface LightboxAuthor {
  name: string;             // Author name
  role?: string;            // Role/subtitle
  avatarSrc?: string;       // Avatar image URL
  avatarInitials?: string;  // Initials (if no photo)
  avatarType?: 'photo' | 'initials';
  timestamp?: string;       // Time/date string
}
```

## How It Works

### Images
1. Images are displayed in a full-screen modal
2. Users can navigate with swipe gestures or navigation buttons
3. Pinch-to-zoom and double-tap for zooming
4. Share button triggers native share sheet
5. Modal stays within your app

### PDFs
1. PDF info is displayed in a modal with a preview card
2. Tapping "Open in PDF Viewer" launches Capacitor Browser
3. Browser opens the PDF in iOS/Android's native in-app browser
4. Users can view, scroll, and interact with the PDF
5. Close button returns to your app
6. For local PDFs: Served from your app's public directory
7. For remote PDFs: Opens directly from URL
8. Share button uses native share sheet

## CocoaPods Encoding Issue Fix

If you encounter UTF-8 encoding issues with CocoaPods sync, add this to your `~/.zshrc` or `~/.bash_profile`:

```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

Then reload your terminal:

```bash
source ~/.zshrc
```

And run sync again:

```bash
npx cap sync ios
```

## Component Architecture

```
ds-mobile-lightbox/
├── ds-mobile-lightbox-image.ts          # Image viewer component
├── ds-mobile-lightbox-image.css         # Shared image styles
├── ds-mobile-lightbox-pdf.ts            # PDF viewer component  
├── ds-mobile-lightbox-pdf.css           # PDF-specific styles
├── ds-mobile-lightbox.service.ts        # Service with type definitions
└── index.ts                             # Barrel exports
```

## Styling

Both components use the shared `ds-mobile-lightbox.css` styles for consistent appearance. The PDF component has additional styles in `ds-mobile-lightbox-pdf.css`.

Colors and spacing follow your design system's Brockmann typography and color tokens.

## Testing

### Image Lightbox
1. Open in iOS Simulator
2. Tap an image to open lightbox
3. Test gestures: swipe, pinch-to-zoom, double-tap
4. Test navigation buttons
5. Test share functionality

### PDF Lightbox
1. Open in iOS Simulator
2. Tap a PDF link
3. Should see PDF info card
4. Tap "Open in PDF Viewer"
5. Native iOS Preview should open
6. Test share functionality

## Notes

- **Image centering**: Images are now properly centered vertically without bottom padding
- **Native share**: Uses Capacitor Share API for best mobile experience
- **Offline support**: PDFs are cached after first download
- **Memory management**: Cached files use the system Cache directory (can be cleared by OS)
- **Error handling**: Comprehensive error states for failed downloads or unsupported formats

## Future Enhancements

Potential improvements:
- Video support (`.mp4`, `.mov`)
- Image carousel thumbnails
- PDF page preview/thumbnails
- Download progress indicators
- Offline-first caching strategy
- Gallery mode with mixed media types
