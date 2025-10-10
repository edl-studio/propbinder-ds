# @propbinder/design-system

Private Angular design system for Propbinder.  
Made by **ninjaDax** · © Propbinder ApS — **Internal use only** (UNLICENSED).

> Standalone Angular components with accompanying CSS.  
> Tailwind utilities use the **`tw-` prefix**.

---

## Demo & Documentation

Browse the live Storybook for components, variants, and props:  
**https://propbinder-design-system-storybook.vercel.app/storybook**

---

## Installation

```bash
npm login
# Install the design system
npm i @propbinder/design-system
# Required peer deps (used by DS components)
npm i @ng-icons/core @ng-icons/remixicon ng-primitives@^0.83.0 @floating-ui/core@^1.7.3 @floating-ui/dom@^1.7.4 @tanstack/angular-table
```

Optional project-level `.npmrc` for convenience:
```
@propbinder:registry=https://registry.npmjs.org/
always-auth=true
```

For CI, prefer a token-based `.npmrc`:
```
@propbinder:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
always-auth=true
```

---

## Consumer Setup

### 1) Angular styles
Add the global and aggregated UI CSS to your app's `angular.json`:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "@propbinder/design-system/styles/globals.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

### 2) Tailwind
Ensure Tailwind scans DS files (CSS + templates) and uses the `tw-` prefix:

```js
// tailwind.config.js
export default {
  prefix: 'tw-',
  content: [
    './src/**/*.{html,ts}',
    './node_modules/@propbinder/design-system/**/*.css',
    './node_modules/@propbinder/design-system/**/*.{mjs,js,ts,html}',
  ],
  theme: { extend: {} },
  plugins: [],
};
```

### 3) Icons (global registration)
Register Remix icons globally. For quick POC you can register all icons; for production, register only the icons actually used by your app.

**POC (all icons)**
```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import * as remix from '@ng-icons/remixicon';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideIcons({ ...remix })],
});
```

**Production (curated list)**
```ts
import { provideIcons } from '@ng-icons/core';
import {
  remixLoader4Line,
  remixArrowDownSLine,
  remixArrowRightSLine,
  remixSaveLine,
  remixAddLine,
  remixDownloadLine,
  remixDeleteBinLine,
  remixSearchLine,
} from '@ng-icons/remixicon';

bootstrapApplication(AppComponent, {
  providers: [provideIcons({
    remixLoader4Line,
    remixArrowDownSLine,
    remixArrowRightSLine,
    remixSaveLine,
    remixAddLine,
    remixDownloadLine,
    remixDeleteBinLine,
    remixSearchLine,
  })],
});
```

> Icon names must **match** the `name` strings used by DS components (e.g., `remixLoader4Line`).

---

## Using Components (standalone)

Import DS components directly from the package and add them to the `imports` of your standalone component:

```ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DsAvatarComponent, DsButtonComponent } from '@propbinder/design-system';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DsButtonComponent, DsAvatarComponent],
  template: `<ds-button variant="primary" size="md" (clicked)="onClick('primary')">Primary</ds-button>`,
  styleUrls: ['./app.css']
})
export class App {

  onClick(kind: string) {
    console.log('Button clicked:', kind);
  }
}
```

> See the Storybook for available properties and variants.

---

## Requirements / Peer dependencies

The consumer app must provide:

- `@angular/core` and `@angular/common` (Angular 20+)
- `@ng-icons/core` and `@ng-icons/remixicon` (icons used by DS)
- `ng-primitives@^0.83.0` (DS relies on several sub-entrypoints)
- `@floating-ui/core@^1.7.3` and `@floating-ui/dom@^1.7.4` (positioning)
- `@tanstack/angular-table`

> Tailwind CSS is optional (only needed if your app uses `tw-` classes).

---

## Release (internal)

**Build & publish**
```bash
# choose one: patch | minor | major
npm version patch -w projects/design-system-lib
npm run build:lib
cd dist/design-system-lib
npm publish --access=restricted
```

**Pre-release (RC)**
```bash
npm version prerelease --preid=rc -w projects/design-system-lib
npm run build:lib
cd dist/design-system-lib
npm publish --access=restricted --tag next
# consumer: npm i @propbinder/design-system@next
```

List or update dist-tags:
```bash
npm dist-tag ls @propbinder/design-system
npm dist-tag add @propbinder/design-system@<version> latest
```

---

## License / Usage

**UNLICENSED** — private package for **Propbinder ApS**.  
No redistribution or external use without written permission.

---

## Credits

Built & maintained by **ninjaDax** (Propbinder ApS).
