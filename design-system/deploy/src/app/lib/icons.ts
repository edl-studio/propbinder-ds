import { Provider } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import * as RemixIcons from '@ng-icons/remixicon';

// Registers the entire Remix icon set globally.
// Note: This increases bundle size; prefer selective registration for production apps.
export function provideAllRemixIcons(): Provider {
  return provideIcons(RemixIcons as unknown as Record<string, any>);
}


