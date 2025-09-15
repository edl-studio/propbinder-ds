# Propbinder Design System

A comprehensive design system built with **Angular**, **Tailwind CSS v4**, and **Figma MCP integration** for seamless design-to-code workflows. This foundation includes primitive components from [angularprimitives.com](https://angularprimitives.com/) where applicable.

## 🚀 Features

- **Angular Standalone Components** with TypeScript
- **Tailwind CSS v4** using the `@theme` directive for design tokens
- **Storybook** for component documentation and testing
- **Figma MCP integration** utilities for design-to-code workflows
- **Comprehensive Design Token System** with semantic naming
- **Type-safe Component APIs** with proper TypeScript interfaces

## 📁 Project Structure

```
design-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── button/
│   │   │       │   ├── ds-button.component.ts
│   │   │       │   └── ds-button.component.stories.ts
│   │   │       ├── card/
│   │   │       │   ├── ds-card.component.ts
│   │   │       │   └── ds-card.component.stories.ts
│   │   │       ├── input/
│   │   │       │   ├── ds-input.component.ts
│   │   │       │   └── ds-input.component.stories.ts
│   │   │       └── index.ts
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   ├── design-tokens.ts
│   │   │   ├── mcp-integration.ts
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── app.ts
│   │   └── app.html
│   └── styles.css
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── ...
├── angular.json
├── package.json
└── README.md
```

## 🎨 Design Token System

Design tokens are defined in `src/app/styles/globals.css` using Tailwind CSS v4's `@theme` directive:

```css
@theme {
  --background-color-brand: #ff8652;
  --background-color-brand-hover: #e6784a;
  --text-color-primary: #1e293b;
  --text-color-secondary: #64748b;
  /* ...additional tokens */
}
```

### Benefits:
- Automatic utility generation from tokens
- Scoped CSS variables prevent misuse
- Zero Tailwind config complexity
- Build-time type safety

## 🧱 Available Components

### Button Component (`ds-button`)

```html
<ds-button variant="primary">Primary Button</ds-button>
<ds-button variant="outline" [disabled]="true">Disabled Outline</ds-button>
```

**Variants:** `primary`, `outline`, `success`, `warning`, `destructive`

### Input Component (`ds-input`)

```html
<ds-input variant="default" placeholder="Enter text..."></ds-input>
<ds-input variant="success" placeholder="Valid input"></ds-input>
```

**Variants:** `default`, `success`, `warning`, `destructive`

### Card Component (`ds-card`)

```html
<ds-card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</ds-card>

<ds-card [interactive]="true">
  <p>This card shows hover effects</p>
</ds-card>
## 📚 Usage Examples

### Using Design Tokens in Templates

```html
<div class="bg-page">Page background</div>
<span class="text-primary">Primary text</span>
<div class="border border-weak">Weak border</div>
<div class="bg-success-base text-white">Success message</div>
```

### Importing Components

```typescript
import { DsButtonComponent, DsInputComponent, DsCardComponent } from './components/ui';

@Component({
  imports: [DsButtonComponent, DsInputComponent, DsCardComponent],
  // ...
})
export class MyComponent {}
```

### Using Utility Functions

```typescript
import { cn, createVariantClasses } from './lib/utils';
import { getDesignToken } from './lib/design-tokens';

// Merge classes
const classes = cn('base-class', conditionalClass && 'conditional-class');

// Get design token value
const brandColor = getDesignToken('bg-brand');
```

## 🔗 Figma MCP Integration

The design system includes utilities for integrating with Figma via MCP:

```typescript
import {
  processFigmaVariables,
  mapFigmaComponentToAngular,
  generateAngularComponentCode
} from './lib/mcp-integration';

// Process Figma variables to CSS custom properties
const cssVariables = processFigmaVariables(figmaVariables);

// Generate Angular component from Figma component
const code = generateAngularComponentCode(componentMapping);
```

## 🛠 Development Commands
# Start development server
npm start
# or
ng serve

# Build the project
npm run build

# Run Storybook
npm run storybook

# Run tests
npm test
```

## 🎯 Typography Classes

The design system includes semantic typography classes:

- **Display:** `.display-lg`, `.display-md`, `.display-sm`
- **Headings:** `.heading-lg`, `.heading-md`, `.heading-sm`
- **Body:** `.body-lg-regular`, `.body-md-medium`, `.body-sm-regular`, etc.

## 🌈 Color System

All colors follow a semantic naming convention:
- **Brand:** Primary brand colors
- **States:** Success, warning, destructive variants
- **Neutrals:** Text, borders, backgrounds
- **Interactive:** Hover and focus states

## 📖 Storybook Documentation

Components are documented in Storybook with:
- Interactive controls for all properties
- Multiple story variations
- Documentation of design tokens
- Usage examples

## 🔧 Customization

### Adding New Design Tokens

1. Add tokens to `src/app/styles/globals.css` in the `@theme` block
2. Update `src/app/lib/design-tokens.ts` with TypeScript interfaces
3. Use tokens in components via Tailwind utilities

### Creating New Components

1. Create component in `src/app/components/ui/[component-name]/`
2. Follow the existing pattern with standalone components
3. Add Storybook stories for documentation
4. Export from `src/app/components/ui/index.ts`

## 📚 Learn More

- [Angular Docs](https://angular.io/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Storybook for Angular](https://storybook.js.org/docs/angular)
- [Figma API](https://www.figma.com/developers/api)
- [Angular Primitives](https://angularprimitives.com)

---

Built with ❤️ for seamless design-to-code workflows.