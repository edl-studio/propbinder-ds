import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.propbinder.mobileapp',
  appName: 'Propbinder Mobile',
  webDir: 'dist/ionic-app',
  server: process.env.USE_LOCAL_SERVER === 'true'
    ? {
        // Local network URL for development with live reload
        // Office network: 10.0.1.11 | Home network: 192.168.1.242
        url: 'http://10.0.1.11:4200/#/home',
        cleartext: true  // Allow HTTP connections for local development
      }
    : {
        // Using Vercel deployment URL for TestFlight builds
    url: 'https://propbinder-design-system-storybook.vercel.app/#/home'
  },
  plugins: {
    Keyboard: {
      // Use 'none' mode - keyboard floats on top without resizing anything
      // This is the best for modals - keyboard won't push content around
      resize: 'none',
      // Don't resize on fullscreen
      resizeOnFullScreen: false,
      // Show keyboard accessory bar (includes Done button)
      showAccessoryBar: true,
      // Use light keyboard style (white background)
      style: 'light'
    }
  },
  ios: {
    // iOS-specific configuration goes here if needed
  }
};

export default config;
