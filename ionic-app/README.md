# Ionic App Template / Recipe

This directory serves as a **template and recipe** for building mobile applications using the Propbinder Design System.

## What This Is

This is a **reference implementation** showing how to:
- Set up an Angular + Ionic + Capacitor mobile app
- Use mobile components from `@propbinder/design-system`
- Configure iOS/Android native projects
- Structure mobile app pages and routes
- Integrate Capacitor plugins

**Use this as a starting point** for your own mobile app projects.

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Angular CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Setup Steps

1. **Copy this directory** to your new project location
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install design system:**
   ```bash
   npm install @propbinder/design-system
   ```

4. **Install Ionic and Capacitor:**
   ```bash
   npm install @ionic/angular @capacitor/core @capacitor/ios
   npm install @capacitor/haptics @capacitor/filesystem @capacitor/share @capacitor/browser
   ```

5. **Configure Capacitor:**
   ```bash
   npx cap init
   npx cap add ios
   npx cap sync ios
   ```

6. **Run the app:**
   ```bash
   npm start
   ```

---

## Project Structure

```
ionic-app/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── examples/      # Example pages showing component usage
│   │   │   ├── demos/         # Demo pages with placeholder content
│   │   │   └── templates/     # Production-ready page templates
│   │   ├── app.config.ts      # Ionic app configuration
│   │   ├── app.routes.ts      # Mobile app routes
│   │   └── app.ts             # App component with Capacitor initialization
│   └── styles/
│       └── ionic.css           # Ionic-specific styles (app-only)
│
├── ios/                        # iOS native project
├── android/                    # Android native project (if added)
├── capacitor.config.ts         # Capacitor configuration
├── package.json
└── README.md                   # This file
```

---

## Using the Design System

### Import Components

All components are imported from the published package:

```typescript
import { 
  DsMobilePageMainComponent,
  DsMobilePostCardComponent,
  DsButtonComponent,
  DsAvatarComponent
} from '@propbinder/design-system';
```

### Example: Basic Page

```typescript
import { Component } from '@angular/core';
import { DsMobilePageMainComponent } from '@propbinder/design-system';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [DsMobilePageMainComponent],
  template: `
    <ds-mobile-page-main
      title="My Page"
      [avatarInitials]="'JD'"
      (refresh)="handleRefresh($event)">
      
      <div class="page-content">
        <!-- Your content here -->
      </div>
    </ds-mobile-page-main>
  `
})
export class MyPageComponent {
  handleRefresh(event: any) {
    // Handle pull-to-refresh
    setTimeout(() => event.target.complete(), 1000);
  }
}
```

### Example: Using Mobile Services

```typescript
import { Component } from '@angular/core';
import { DsMobileModalService } from '@propbinder/design-system';
import { MyDetailComponent } from './my-detail.component';

@Component({
  selector: 'app-example',
  template: `<button (click)="openModal()">Open Modal</button>`
})
export class ExampleComponent {
  constructor(private modal: DsMobileModalService) {}

  async openModal() {
    await this.modal.openCard(MyDetailComponent, {
      itemId: '123'
    });
  }
}
```

---

## Available Components

### Layout Components
- `DsMobilePageMainComponent` - Main/tab pages with expandable header
- `DsMobilePageDetailsComponent` - Detail pages with back button
- `DsMobileAppLayoutComponent` - Full app shell with tabs
- `DsMobileTabsComponent` - Tab bar navigation

### Content Components
- `DsMobileContentComponent` - Content container with layout options
- `DsMobileHeaderContentComponent` - Header tiles for summary data

### Feature Components
- `DsMobilePostCardComponent` - Post card for feeds
- `DsMobilePostComposerComponent` - Post creation form
- `DsMobileCommentComponent` - Comment display

### Services
- `DsMobileModalService` - Open any component as modal
- `DsMobileLightboxService` - Image/PDF viewer
- `DsMobileBottomSheetService` - Bottom sheet dialogs
- `DsMobilePostDetailModalService` - Post detail modal

See component READMEs in the design system for detailed usage.

---

## Configuration

### Capacitor Config

Edit `capacitor.config.ts` to configure:
- App ID and name
- Server URL (local dev vs production)
- Plugin settings (keyboard, status bar, etc.)

### iOS Configuration

- **App Icons:** `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- **Splash Screen:** `ios/App/App/Assets.xcassets/Splash.imageset/`
- **Info.plist:** `ios/App/App/Info.plist` (permissions, URL schemes)

### Android Configuration

- **App Icons:** `android/app/src/main/res/`
- **Manifest:** `android/app/src/main/AndroidManifest.xml`

---

## Development Workflow

### Local Development

```bash
# Start dev server
npm start

# Use local design system (if developing both)
cd ../design-system
npm run build:lib
cd projects/design-system-lib/dist/design-system-lib
npm link

cd ../../../../ionic-app
npm link @propbinder/design-system
```

### iOS Development

```bash
# Sync web assets to iOS
npm run ios:local:sync

# Open in Xcode
npm run ios:open

# Run on simulator
npm run ios:sim

# Run on device
npm run ios:device
```

### Building for Production

```bash
# Build Angular app
npm run build

# Sync to iOS (production URL)
npm run ios:prod:sync

# Open Xcode to build for TestFlight/App Store
npm run ios:open
```

---

## Example Pages

### Examples Directory
- `modal-examples.page.ts` - Shows how to use modal service
- `lightbox-test.page.ts` - Demonstrates lightbox usage

### Demos Directory
- `home.page.ts` - Home page with header tiles
- `handbook.page.ts` - Simple content page
- `inquiries.page.ts` - List page example

### Templates Directory
- Production-ready page templates (if any)

---

## Styling

### Ionic Styles
- `src/styles/ionic.css` - Ionic-specific styles (app-only)
- Includes Ionic core CSS, mobile common styles, safe area handling

### Design System Styles
- Imported from `@propbinder/design-system/styles/globals.css`
- Configured in `angular.json` styles array

---

## Dependencies

### Required
```json
{
  "@propbinder/design-system": "^0.3.0",
  "@angular/core": "^20.3.4",
  "@angular/common": "^20.3.4",
  "@ionic/angular": "^8.7.7",
  "@capacitor/core": "^7.4.4",
  "@capacitor/ios": "^7.4.4"
}
```

### Optional (as needed)
```json
{
  "@capacitor/haptics": "^7.0.2",
  "@capacitor/filesystem": "^7.1.4",
  "@capacitor/share": "^7.0.2",
  "@capacitor/browser": "^7.0.2",
  "@capacitor/camera": "^7.0.2"
}
```

---

## Troubleshooting

### Design System Not Found
```bash
# Make sure you're logged into npm
npm login

# Install the package
npm install @propbinder/design-system
```

### Ionic Components Not Working
- Ensure `@ionic/angular` is installed
- Check that `provideIonicAngular()` is in `app.config.ts`
- Verify Ionic styles are imported

### Capacitor Plugins Not Working
- Run `npx cap sync ios` after installing plugins
- Check `capacitor.config.ts` settings
- Verify plugin permissions in `Info.plist` (iOS) or `AndroidManifest.xml` (Android)

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Clear Angular cache: `rm -rf .angular`
- Rebuild: `npm run build`

---

## Next Steps

1. **Customize the app:**
   - Update `capacitor.config.ts` with your app details
   - Replace example pages with your own
   - Configure app icons and splash screens

2. **Add your features:**
   - Create new pages using mobile components
   - Integrate your APIs and services
   - Add navigation and routing

3. **Configure native features:**
   - Set up push notifications
   - Configure deep linking
   - Add biometric authentication
   - Configure app store metadata

---

## Resources

- **Design System Storybook:** https://propbinder-design-system-storybook.vercel.app/storybook
- **Ionic Documentation:** https://ionicframework.com/docs
- **Capacitor Documentation:** https://capacitorjs.com/docs
- **Component READMEs:** See design system component documentation

---

## Support

For issues or questions:
- Check component READMEs in the design system
- Review example pages in this template
- Consult Ionic and Capacitor documentation

---

**Note:** This is a template/recipe. Copy and adapt it for your own projects. Don't commit your production code back to this template.

