# Design System with Angular + Tailwind CSS + Figma MCP Integration

A comprehensive design system built with **Angular**, **Tailwind CSS v4**, and **Figma MCP integration** for seamless design-to-code workflows. We also use primitive components from [angularprimitives.com](https://angularprimitives.com/) where applicable.

---

## 🚀 Quick Start

This project is configured with:
- **Angular** (Standalone Components) with TypeScript
- **Tailwind CSS v4** using the `@theme` directive
- **Storybook** for Angular component documentation
- **Figma MCP integration** utilities
- **[Angular Primitives](https://angularprimitives.com)** — a headless, accessible component library for state and behavior building blocks

This project is configured with:
- **Angular** (Standalone Components) with TypeScript
- **Tailwind CSS v4** using the `@theme` directive
- **Storybook** for Angular component documentation
- **Figma MCP integration** utilities

---

## 📁 Project Structure

```
propbinder-design-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── input/
│   │   │   │   └── ...
│   │   ├── pages/
│   │   │   └── inquiries/
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   ├── design-tokens.ts
│   │   │   └── mcp-integration.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── app.component.ts
│   │   └── app.module.ts
├── .storybook/
├── angular.json
├── tailwind.config.js
└── package.json
```

---

## 🎨 Design Token System

### Tailwind CSS v4 Configuration

Defined in `src/app/styles/globals.css` using `@theme`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  --background-color-brand: #ff8652;
  --background-color-brand-hover: #e6784a;
  --background-color-page: #ffffff;
  --text-color-primary: #1e293b;
  --text-color-secondary: #64748b;
  --border-color-weak: #e2e8f0;
  --border-color-strong: #1e293b;
  --color-success-base: #158452;
  --color-success-base-hover: #0f6c3d;
  /* ...other scoped variables */
}
```

**Benefits:**
- Automatic utility generation from tokens
- Scoped CSS variables prevent misuse
- Zero Tailwind config complexity
- Build-time type safety

---

## 🎯 Usage Examples

```html
<div class="bg-page">Page background</div>
<span class="text-primary">Primary text</span>
<div class="border border-weak">Weak border</div>
<div class="bg-success-base text-white border-success-weak">
  Success message
</div>
```

---

## 🎯 Interactive Styling

**Hover States**
```html
<button class="bg-brand hover:bg-brand-hover text-white transition-colors">
  Hover me
</button>
```

**Disabled States**
```html
<button class="bg-controls disabled:bg-disabled disabled:text-disabled" [disabled]="true">
  Disabled
</button>
```

---

## ✅ Angular Component Examples

### 📦 `ds-button.component.ts`
```ts
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ds-button',
  standalone: true,
  template: `<ng-content></ng-content>`
})
export class DsButtonComponent {
  @Input() variant: 'primary' | 'outline' | 'success' | 'warning' | 'destructive' = 'primary';
  @Input() disabled = false;

  @HostBinding('class') get classes(): string {
    const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200';
    const variants: Record<string, string> = {
      primary: 'bg-brand text-white hover:bg-brand-hover',
      outline: 'bg-controls border border-weak text-primary hover:bg-controls-hover',
      success: 'bg-success-base text-white hover:bg-success-base-hover',
      warning: 'bg-warning-base text-white hover:bg-warning-base-hover',
      destructive: 'bg-destructive-base text-white hover:bg-destructive-base-hover'
    };

    const disabledClass = this.disabled
      ? this.variant === 'primary'
        ? 'disabled:bg-disabled-inverse disabled:text-disabled-inverse'
        : 'disabled:bg-disabled disabled:text-disabled'
      : '';

    return `${base} ${variants[this.variant]} ${disabledClass}`;
  }
}
```

### 💬 `ds-input.component.ts`
```ts
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ds-input',
  standalone: true,
  template: `<input [disabled]="disabled" [placeholder]="placeholder" class="w-full px-4 py-2 rounded-md border text-sm transition-colors duration-200" />`
})
export class DsInputComponent {
  @Input() placeholder = '';
  @Input() variant: 'default' | 'success' | 'warning' | 'destructive' = 'default';
  @Input() disabled = false;

  @HostBinding('class') get classes(): string {
    const variantMap: Record<string, string> = {
      default: 'bg-controls border-weak text-primary hover:bg-controls-hover',
      success: 'bg-success-weak border-success-base text-success-strong',
      warning: 'bg-warning-weak border-warning-base text-warning-strong',
      destructive: 'bg-destructive-weak border-destructive-base text-destructive-strong'
    };

    const disabledClass = this.disabled
      ? 'disabled:bg-disabled disabled:text-disabled'
      : '';

    return `${variantMap[this.variant]} ${disabledClass}`;
  }
}
```

### 🧱 `ds-card.component.ts`
```ts
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ds-card',
  standalone: true,
  template: `<ng-content></ng-content>`
})
export class DsCardComponent {
  @Input() interactive = false;

  @HostBinding('class') get classes(): string {
    return this.interactive
      ? 'bg-container hover:bg-container-hover cursor-pointer transition-colors rounded-md p-4'
      : 'bg-container rounded-md p-4';
  }
}
```

---

## 🧱 Layout Components

```html
<ds-container maxWidth="lg" padding="md">
  <ds-stack direction="column" gap="lg">
    <h1 class="display-lg">Title</h1>
    <p class="body-sm-regular">Content</p>
  </ds-stack>
</ds-container>
```

---

## 🔗 Figma MCP Integration

```ts
import {
  processFigmaVariables,
  mapFigmaComponentToAngular,
  generateAngularComponentCode
} from '@/app/lib/mcp-integration';

const code = generateAngularComponentCode(componentMapping);
```

---

## 🛠 Development Workflow

```bash
# Start dev server
ng serve

# Run Storybook
npm run storybook

# Run Figma MCP integration
npx cursor-talk-to-figma-mcp
```

---

## 📚 Learn More

- [Angular Docs](https://angular.io/docs)
- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [Storybook for Angular](https://storybook.js.org/docs/angular)
- [Figma API](https://www.figma.com/developers/api)
- [Angular Primitives](https://angularprimitives.com)
