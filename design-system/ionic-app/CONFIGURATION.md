# Configuration Guide

This guide explains all configuration files in the ionic-app template and how to customize them for your project.

---

## Capacitor Configuration

### `capacitor.config.ts`

Main Capacitor configuration file.

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Your app's unique identifier (reverse domain notation)
  appId: 'com.propbinder.mobileapp',
  
  // Display name of your app
  appName: 'Propbinder Mobile',
  
  // Directory where built web assets are located
  webDir: 'dist/mobile-app',
  
  // Server configuration
  server: process.env.USE_LOCAL_SERVER === 'true'
    ? {
        // Local development server
        url: 'http://192.168.1.242:4200',
        cleartext: true  // Allow HTTP (not HTTPS)
      }
    : {
        // Production server (Vercel, etc.)
        url: 'https://your-app.vercel.app'
      },
  
  // Plugin configurations
  plugins: {
    Keyboard: {
      resize: 'none',              // Don't resize viewport
      resizeOnFullScreen: false,
      showAccessoryBar: true,      // Show keyboard toolbar
      style: 'light'               // Light keyboard theme
    },
    StatusBar: {
      style: 'dark',               // Dark status bar icons
      backgroundColor: '#221a4c'  // Match your theme
    }
  },
  
  // iOS-specific settings
  ios: {
    // Add iOS-specific config here if needed
  }
};

export default config;
```

**Key Settings:**
- `appId`: Must be unique, use reverse domain notation
- `appName`: Shown in app launcher
- `webDir`: Must match your Angular build output path
- `server.url`: Local dev vs production URL

---

## Angular Configuration

### `angular.json`

Project configuration for Angular build.

**Key Sections:**

```json
{
  "projects": {
    "mobile-app": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/mobile-app",  // Must match capacitor.config.ts webDir
            "styles": [
              "@propbinder/design-system/styles/globals.css",
              "src/styles/ionic.css"  // Ionic-specific styles
            ]
          }
        }
      }
    }
  }
}
```

**Important:**
- `outputPath` must match `webDir` in `capacitor.config.ts`
- Styles array includes both design system and Ionic styles

---

## App Configuration

### `src/app/app.config.ts`

Angular application configuration with Ionic provider.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular({
      mode: 'ios',        // 'ios' or 'md' (Material Design)
      animated: true,     // Enable page transitions
      navAnimation: customPageTransition  // Optional custom animation
    })
  ]
};
```

**Key Settings:**
- `mode: 'ios'` - iOS-style components (recommended)
- `mode: 'md'` - Material Design components
- `animated: true` - Enable page transitions

---

## iOS Configuration

### `ios/App/App/Info.plist`

iOS app metadata and permissions.

**Key Entries:**

```xml
<key>CFBundleIdentifier</key>
<string>com.propbinder.mobileapp</string>  <!-- Must match capacitor.config.ts appId -->

<key>CFBundleDisplayName</key>
<string>Propbinder Mobile</string>  <!-- App name on home screen -->

<key>CFBundleVersion</key>
<string>1.0.0</string>  <!-- App version -->

<key>CFBundleShortVersionString</key>
<string>1.0</string>  <!-- Marketing version -->
```

**Permissions:**

Add keys for required capabilities:
```xml
<!-- Camera -->
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take photos</string>

<!-- Photo Library -->
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photos to select images</string>

<!-- Location (if needed) -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to show nearby properties</string>
```

---

## TypeScript Configuration

### `tsconfig.json`

TypeScript compiler options.

**Key Settings:**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "dom"],
    "strict": true,
    "paths": {
      "@/*": ["src/*"]  // Optional path mapping
    }
  },
  "angularCompilerOptions": {
    "strictTemplates": true,
    "strictInputAccessModifiers": true
  }
}
```

---

## Package.json Scripts

### Available Scripts

```json
{
  "scripts": {
    "start": "ng serve --host 0.0.0.0",
    "build": "ng build",
    "ios:local:sync": "USE_LOCAL_SERVER=true npx cap sync ios",
    "ios:local:run": "USE_LOCAL_SERVER=true npx cap run ios",
    "ios:prod:sync": "npx cap sync ios",
    "ios:open": "npx cap open ios",
    "ios:sim": "npx cap run ios"
  }
}
```

**Script Usage:**

- `npm start` - Start dev server (use for local development)
- `npm run build` - Build for production
- `npm run ios:local:sync` - Sync with local dev server
- `npm run ios:prod:sync` - Sync with production server (before TestFlight)
- `npm run ios:open` - Open in Xcode
- `npm run ios:sim` - Run on iOS simulator

---

## Environment Configuration

### Local Development

For local development with live reload:

```bash
# Terminal 1: Start dev server
npm start

# Terminal 2: Sync Capacitor with local server
npm run ios:local:sync

# Terminal 3: Run on simulator
npm run ios:sim
```

The app will connect to `http://YOUR_IP:4200` for live reload.

### Production Build

For TestFlight/App Store builds:

```bash
# Build Angular app
npm run build

# Sync with production URL
npm run ios:prod:sync

# Open in Xcode to build for TestFlight
npm run ios:open
```

---

## Styling Configuration

### `src/styles/ionic.css`

Ionic-specific styles (app-only, not in library).

**Key Sections:**
- Ionic core CSS imports
- Mobile common styles
- CSS variables for Ionic
- Safe area handling
- Keyboard handling

**Customization:**
- Update CSS variables to match your brand
- Add app-specific Ionic overrides
- Configure safe area insets

### Design System Styles

Imported from `@propbinder/design-system/styles/globals.css` automatically.

No configuration needed unless customizing design tokens.

---

## Build Configuration

### Production Build Settings

**angular.json:**
```json
{
  "configurations": {
    "production": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "2mb",
          "maximumError": "5mb"
        }
      ]
    }
  }
}
```

---

## Xcode Configuration

### Project Settings

1. **Open in Xcode:**
   ```bash
   npm run ios:open
   ```

2. **Update Settings:**
   - **General Tab:**
     - Display Name: Your app name
     - Bundle Identifier: Must match `capacitor.config.ts` appId
     - Version: App version
     - Build: Build number
   
   - **Signing & Capabilities:**
     - Team: Your Apple Developer team
     - Automatically manage signing: Enabled
     - Capabilities: Add as needed (Push Notifications, etc.)

3. **Build Settings:**
   - iOS Deployment Target: 14.0+ (or as required)
   - Swift Version: Latest

---

## Android Configuration (if added)

### `android/app/build.gradle`

```gradle
android {
    defaultConfig {
        applicationId "com.propbinder.mobileapp"  // Must match appId
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
}
```

### `android/app/src/main/AndroidManifest.xml`

```xml
<manifest>
    <application
        android:label="Propbinder Mobile"
        android:icon="@mipmap/ic_launcher">
        <!-- Activities, permissions, etc. -->
    </application>
</manifest>
```

---

## Environment Variables

### Using .env Files

Create `.env` files for different environments:

**.env.local:**
```
USE_LOCAL_SERVER=true
API_URL=http://localhost:3000
```

**.env.production:**
```
USE_LOCAL_SERVER=false
API_URL=https://api.propbinder.com
```

**In capacitor.config.ts:**
```typescript
server: process.env.USE_LOCAL_SERVER === 'true'
  ? { url: 'http://localhost:4200' }
  : { url: 'https://your-app.vercel.app' }
```

---

## Verification Checklist

After configuration, verify:

- [ ] `capacitor.config.ts` appId matches iOS Bundle Identifier
- [ ] `angular.json` outputPath matches `capacitor.config.ts` webDir
- [ ] App icons are updated in iOS project
- [ ] Splash screens are updated
- [ ] Info.plist permissions are configured
- [ ] App builds successfully
- [ ] App runs on simulator
- [ ] Capacitor plugins work correctly

---

## Common Configuration Issues

### Mismatched Paths

**Error:** Capacitor can't find web assets

**Solution:** Ensure `angular.json` outputPath matches `capacitor.config.ts` webDir

### Bundle Identifier Mismatch

**Error:** Xcode build fails with signing errors

**Solution:** Ensure `capacitor.config.ts` appId matches Xcode Bundle Identifier

### Server URL Issues

**Error:** App shows blank screen or can't connect

**Solution:** 
- Check `capacitor.config.ts` server URL
- Verify server is running (for local dev)
- Check network connectivity

---

## Next Steps

1. **Customize all configuration files** for your app
2. **Update app metadata** (name, icons, version)
3. **Configure permissions** as needed
4. **Set up environment variables** for different environments
5. **Test configuration** on simulator and device

