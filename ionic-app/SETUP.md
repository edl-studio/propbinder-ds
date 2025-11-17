# Setup Guide: Creating a New Mobile App from This Template

This guide walks you through setting up a new mobile app project using this template as a starting point.

---

## Step 1: Copy the Template

```bash
# Copy the ionic-app directory to your new project
cp -r "../Propbinder DS/ionic-app" "/path/to/your/new-mobile-app"
cd /path/to/your/new-mobile-app
```

---

## Step 2: Initialize as New Project

### Update package.json

Edit `package.json` and update:
- `name`: Your app name (e.g., `@propbinder/my-mobile-app`)
- `version`: Start at `1.0.0`
- `description`: Your app description

### Initialize Git

```bash
git init
git add .
git commit -m "Initial commit from ionic-app template"
```

---

## Step 3: Install Dependencies

### Core Dependencies

```bash
npm install
```

### Design System

```bash
# Make sure you're logged into npm
npm login

# Install the design system
npm install @propbinder/design-system@latest
```

### Ionic & Capacitor

```bash
# Core Ionic and Capacitor
npm install @ionic/angular@^8.7.7
npm install @capacitor/core@^7.4.4
npm install @capacitor/ios@^7.4.4

# Capacitor plugins (install as needed)
npm install @capacitor/haptics@^7.0.2
npm install @capacitor/filesystem@^7.1.4
npm install @capacitor/share@^7.0.2
npm install @capacitor/browser@^7.0.2
npm install @capacitor/camera@^7.0.2
npm install @capacitor/status-bar@^7.0.3
npm install @capacitor/keyboard@^7.0.3
```

---

## Step 4: Configure Capacitor

### Update capacitor.config.ts

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',  // Change this
  appName: 'Your App Name',           // Change this
  webDir: 'dist/your-app',            // Update to match your build output
  server: {
    // For local development
    url: 'http://localhost:4200',
    cleartext: true
  },
  plugins: {
    Keyboard: {
      resize: 'none',
      resizeOnFullScreen: false,
      showAccessoryBar: true,
      style: 'light'
    }
  }
};

export default config;
```

### Initialize Capacitor (if starting fresh)

```bash
npx cap init "Your App Name" "com.yourcompany.yourapp"
```

### Add iOS Platform

```bash
npx cap add ios
```

---

## Step 5: Configure Angular App

### Update angular.json

Update the project name and output paths:

```json
{
  "projects": {
    "your-app-name": {  // Change this
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/your-app-name"  // Change this
          }
        }
      }
    }
  }
}
```

### Update app.config.ts

Ensure Ionic is configured:

```typescript
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular({
      mode: 'ios',  // or 'md' for Material Design
      animated: true
    })
  ]
};
```

---

## Step 6: Configure iOS Project

### Update App Icons

Replace icons in:
```
ios/App/App/Assets.xcassets/AppIcon.appiconset/
```

Required sizes:
- 1024x1024 (App Store)
- 180x180 (iPhone)
- 152x152, 167x167 (iPad)

### Update Splash Screen

Replace splash images in:
```
ios/App/App/Assets.xcassets/Splash.imageset/
```

### Update Info.plist

Edit `ios/App/App/Info.plist`:
- Update bundle identifier
- Add required permissions
- Configure URL schemes (if needed)

### Update Xcode Project

1. Open in Xcode: `npx cap open ios`
2. Update **Bundle Identifier** in project settings
3. Configure **Signing & Capabilities**
4. Update **Display Name** and **Version**

---

## Step 7: Update Routes

### Customize app.routes.ts

Remove example routes and add your own:

```typescript
import { Routes } from '@angular/router';
import { YourHomePageComponent } from './pages/home.page';

export const routes: Routes = [
  {
    path: '',
    component: YourTabsComponent,
    children: [
      {
        path: 'home',
        component: YourHomePageComponent
      },
      // Add your routes here
    ]
  }
];
```

---

## Step 8: Replace Example Pages

### Remove Examples

Delete or move example pages:
```bash
# Keep examples for reference, or delete them
rm -rf src/app/pages/examples
```

### Create Your Pages

Create your own pages using mobile components:

```typescript
// src/app/pages/home.page.ts
import { Component } from '@angular/core';
import { DsMobilePageMainComponent } from '@propbinder/design-system';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DsMobilePageMainComponent],
  template: `
    <ds-mobile-page-main
      title="Home"
      [avatarInitials]="'JD'">
      <div class="page-content">
        <!-- Your content -->
      </div>
    </ds-mobile-page-main>
  `
})
export class HomePageComponent {}
```

---

## Step 9: Update Styles

### Ionic Styles

The `src/styles/ionic.css` file is app-specific. Customize as needed:
- Update CSS variables
- Add app-specific Ionic overrides
- Configure safe area handling

### Design System Styles

Design system styles are imported automatically from the package. No changes needed unless customizing.

---

## Step 10: Test the Setup

### Test Web Build

```bash
npm run build
npm start
```

Visit `http://localhost:4200` and verify the app loads.

### Test iOS Build

```bash
# Sync to iOS
npm run ios:local:sync

# Open in Xcode
npm run ios:open

# Build and run
npm run ios:sim
```

---

## Step 11: Clean Up Template Files

### Remove Template-Specific Content

- Remove example/demo pages you don't need
- Update README.md with your app information
- Remove this SETUP.md (or keep for reference)
- Update any template placeholders

### Update Documentation

- Update README.md with your app details
- Document your app structure
- Add your own setup instructions

---

## Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Design system installed (`@propbinder/design-system`)
- [ ] Ionic and Capacitor installed
- [ ] `capacitor.config.ts` updated with your app details
- [ ] `angular.json` updated with your project name
- [ ] iOS project configured in Xcode
- [ ] App icons and splash screens updated
- [ ] Routes configured for your app
- [ ] Example pages removed or replaced
- [ ] App builds successfully (`npm run build`)
- [ ] App runs in browser (`npm start`)
- [ ] App runs on iOS simulator (`npm run ios:sim`)

---

## Common Issues

### Design System Not Found
```bash
# Ensure you're logged in
npm login

# Install with correct registry
npm install @propbinder/design-system
```

### Capacitor Sync Errors
```bash
# Rebuild Angular app first
npm run build

# Then sync
npx cap sync ios
```

### Xcode Build Errors
- Clean build folder: Product → Clean Build Folder
- Update CocoaPods: `cd ios/App && pod install`
- Check signing configuration

---

## Next Steps

1. **Set up your backend API integration**
2. **Configure authentication**
3. **Add your business logic**
4. **Set up CI/CD for builds**
5. **Configure App Store/Play Store metadata**

---

## Getting Help

- Check component documentation in design system
- Review example pages in this template
- Consult Ionic documentation: https://ionicframework.com/docs
- Consult Capacitor documentation: https://capacitorjs.com/docs

