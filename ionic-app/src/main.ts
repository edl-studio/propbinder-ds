import { bootstrapApplication } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import * as remix from '@ng-icons/remixicon';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideIcons({ ...remix })
  ]
}).catch((err) => console.error(err));

