# Accordion 2 Component

A component that displays a list of expandable/collapsible sections. Based on ng-primitives accordion component.

## Features

- Single or multiple expanded sections
- Optional collapsible behavior
- Keyboard navigation
- Animated transitions
- Accessible by default

## Usage

```typescript
import { DsAccordion2 } from './ds-accordion-2';
import { DsAccordionItem2 } from './ds-accordion-item-2';

@Component({
  // ...
  imports: [DsAccordion2, DsAccordionItem2],
})
```

```html
<ds-accordion-2 [type]="'single'" [collapsible]="true">
  <ds-accordion-item-2 value="item-1" heading="Section 1">
    Content for section 1
  </ds-accordion-item-2>
  <ds-accordion-item-2 value="item-2" heading="Section 2">
    Content for section 2
  </ds-accordion-item-2>
</ds-accordion-2>
```

## API Reference

### DsAccordion2

#### Inputs

- `value`: `string | string[]` - The value(s) of the expanded accordion item(s)
- `type`: `'single' | 'multiple'` - Whether a single or multiple items can be expanded at once
- `collapsible`: `boolean` - Whether the expanded item can be collapsed (only applies to type="single")
- `disabled`: `boolean` - Whether the accordion is disabled
- `orientation`: `'horizontal' | 'vertical'` - The orientation of the accordion

### DsAccordionItem2

#### Inputs

- `heading`: `string` - The heading text for the accordion item (required)
- `value`: `string` - The unique value for the accordion item
- `disabled`: `boolean` - Whether the accordion item is disabled

## Accessibility

The accordion component follows WAI-ARIA Accordion Pattern guidelines:

- Uses appropriate ARIA roles (button, region)
- Supports keyboard navigation
- Provides visual focus indicators
- Maintains proper heading structure

## Examples

### Single Expansion

```html
<ds-accordion-2 type="single" [collapsible]="true">
  <ds-accordion-item-2 value="item-1" heading="What is Propbinder?">
    Propbinder is a modern property management platform.
  </ds-accordion-item-2>
</ds-accordion-2>
```

### Multiple Expansion

```html
<ds-accordion-2 type="multiple">
  <ds-accordion-item-2 value="features" heading="Key Features">
    <ul>
      <li>Property Management</li>
      <li>Tenant Portal</li>
    </ul>
  </ds-accordion-item-2>
  <ds-accordion-item-2 value="pricing" heading="Pricing Plans">
    <ul>
      <li>Basic: Free</li>
      <li>Professional: $29/month</li>
    </ul>
  </ds-accordion-item-2>
</ds-accordion-2>
```
