import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard, KeyboardStyle, KeyboardResize } from '@capacitor/keyboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  private async initializeApp() {
    await this.platform.ready();
    
    // Configure StatusBar for iOS
    try {
      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.setBackgroundColor({ color: '#221a4c' });
      await StatusBar.setStyle({ style: Style.Dark });
    } catch (e) {
      // StatusBar plugin not available (web browser)
      console.log('StatusBar not available:', e);
    }

    // Configure Keyboard
    try {
      await Keyboard.setStyle({ style: KeyboardStyle.Light });
      await Keyboard.setResizeMode({ mode: KeyboardResize.None });
    } catch (e) {
      // Keyboard plugin not available (web browser)
      console.log('Keyboard not available:', e);
    }
  }
}

