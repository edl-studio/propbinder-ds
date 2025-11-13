import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAllRemixIcons } from './lib/icons';
import { provideComboboxConfig } from 'ng-primitives/combobox';
import { provideSelectConfig } from 'ng-primitives/select';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAllRemixIcons(),
    provideComboboxConfig({
      container: document.body
    }),
    provideSelectConfig({
      container: document.body
    })
  ]
};