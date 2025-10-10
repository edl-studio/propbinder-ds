# Tile Component

A flexible container component that provides consistent elevation, border radius, and layout structure for grouped content sections. Tiles work with `ds-tile-section` components to create composable, maintainable layouts.

## Features

- **Consistent Elevation**: Uses the `elevation-tile` class for uniform shadow/elevation
- **Flexible Layout**: Supports both vertical (stacked) and horizontal (side-by-side) orientations
- **Semantic Slots**: Built-in `<header-title>` and `<header-actions>` slots with predefined styling
- **Responsive**: Automatically stacks horizontal tiles vertically on mobile
- **Composition-First**: Separate concerns - tiles handle container styling, content handles functionality
- **Design Guardrails**: Predefined typography and spacing with escape hatches for customization

## Basic Usage

### Simple Tile with Header

```html
<ds-tile orientation="vertical">
  <ds-tile-section>
    <header>
      <header-title>Section Title</header-title>
      <header-actions>
        <ds-button size="sm">Action</ds-button>
      </header-actions>
    </header>
    <p>Your content here</p>
  </ds-tile-section>
</ds-tile>
```

### Tile with Data Table

```html
<ds-tile orientation="vertical">
  <ds-tile-section>
    <header>
      <header-title>Invoice Lines</header-title>
      <header-actions>
        <ds-button size="sm" leadingIcon="remixAddLine">Add line</ds-button>
      </header-actions>
    </header>
  </ds-tile-section>
  
  <ds-tile-section [padding]="false">
    <ds-data-table [data]="lines" [columns]="columns" />
  </ds-tile-section>
</ds-tile>
```

## Components

### ds-tile

The main container component that provides elevation and layout structure.

**Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation of tile sections |

### ds-tile-section

Individual sections within a tile. Supports optional headers with semantic slots.

**Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `padding` | `boolean` | `true` | Enable/disable section content padding (20px) |

## Semantic Header Slots

Tile sections support semantic slots that provide automatic styling and spacing:

### `<header-title>` Slot

- **Typography**: heading-lg (24px, 700 weight, 32px line height)
- **Gap**: 8px between child elements (e.g., avatar + text)
- **Behavior**: Flexes to fill available space
- **Color**: Primary text color

### `<header-actions>` Slot

- **Gap**: 8px between multiple buttons
- **Behavior**: Prevents shrinking/wrapping
- **Alignment**: Right-aligned in header

## Usage Examples

### Title with Avatar

```html
<ds-tile-section>
  <header>
    <header-title>
      <ds-avatar size="sm" />
      User Profile
    </header-title>
    <header-actions>
      <ds-icon-button icon="remixEditLine" variant="ghost" ariaLabel="Edit" />
    </header-actions>
  </header>
  <p>User information here</p>
</ds-tile-section>
```

The avatar and text will automatically have 8px gap between them.

### Title with Icon

```html
<ds-tile-section>
  <header>
    <header-title>
      <ds-icon name="remixFileList3Line" size="20px" />
      Invoice Details
    </header-title>
    <header-actions>
      <ds-button size="sm">Edit</ds-button>
    </header-actions>
  </header>
  <p>Invoice content</p>
</ds-tile-section>
```

### Multiple Actions

```html
<ds-tile-section>
  <header>
    <header-title>Document Manager</header-title>
    <header-actions>
      <ds-button variant="ghost" size="sm">Export</ds-button>
      <ds-button variant="ghost" size="sm">Filter</ds-button>
      <ds-button size="sm" leadingIcon="remixAddLine">New</ds-button>
    </header-actions>
  </header>
  <ds-data-table [data]="docs" [columns]="columns" />
</ds-tile-section>
```

All buttons will have 8px gap between them automatically.

### Custom Gap Override

```html
<ds-tile-section>
  <header>
    <title style="gap: 12px;">
      <ds-icon name="remixUserLine" size="24px" />
      Custom Spacing
    </header-title>
  </header>
  <p>Content here</p>
</ds-tile-section>
```

Developers can override the default 8px gap when needed.

## Multiple Sections

### Vertical Layout (Default)

```html
<ds-tile orientation="vertical">
  <ds-tile-section>
    <header>
      <header-title>Section 1</header-title>
    </header>
    <p>First section content</p>
  </ds-tile-section>
  
  <ds-tile-section>
    <header>
      <header-title>Section 2</header-title>
    </header>
    <p>Second section content</p>
  </ds-tile-section>
  
  <ds-tile-section>
    <header>
      <header-title>Section 3</header-title>
    </header>
    <p>Third section content</p>
  </ds-tile-section>
</ds-tile>
```

Sections stack vertically with border separators between them.

### Horizontal Layout

```html
<ds-tile orientation="horizontal">
  <ds-tile-section>
    <header>
      <header-title>Left Section</header-title>
    </header>
    <p>Content on the left</p>
  </ds-tile-section>
  
  <ds-tile-section>
    <header>
      <header-title>Right Section</header-title>
    </header>
    <p>Content on the right</p>
  </ds-tile-section>
</ds-tile>
```

Sections appear side-by-side with vertical border separators. On mobile (< 768px), they automatically stack vertically.

## Section Without Header

```html
<ds-tile-section>
  <p>Simple content without a header</p>
</ds-tile-section>
```

Headers are optional. Content will have padding by default.

## Section Without Padding

```html
<ds-tile-section [padding]="false">
  <ds-data-table [data]="users" [columns]="columns" />
</ds-tile-section>
```

Disable padding when using full-width components like data tables. Note: Tables automatically get no padding via CSS `:has()` selector, but you can explicitly control it.

## Complex Example

```html
<ds-tile orientation="vertical">
  <!-- Invoice Header -->
  <ds-tile-section>
    <header>
      <header-title>
        <ds-icon name="remixInvoiceLine" size="20px" />
        Invoice #INV-2024-001
      </header-title>
      <header-actions>
        <ds-button variant="ghost" size="sm" leadingIcon="remixDownloadLine">Download</ds-button>
        <ds-button size="sm" leadingIcon="remixEditLine">Edit</ds-button>
      </header-actions>
    </header>
    <div class="invoice-metadata">
      <!-- Invoice details grid -->
    </header-actions>
  </ds-tile-section>
  
  <!-- Line Items Header -->
  <ds-tile-section>
    <header>
      <header-title>Line Items</header-title>
      <header-actions>
        <ds-button size="sm" leadingIcon="remixAddLine">Add line</ds-button>
      </header-actions>
    </header>
  </ds-tile-section>
  
  <!-- Table Section -->
  <ds-tile-section [padding]="false">
    <ds-data-table 
      [data]="invoiceLines" 
      [columns]="columns"
      [searchable]="false"
      [paginated]="false">
    </ds-data-table>
  </ds-tile-section>
  
  <!-- Totals Section -->
  <ds-tile-section>
    <div class="invoice-totals">
      <!-- Subtotal, tax, and total display -->
    </header-actions>
  </ds-tile-section>
</ds-tile>
```

## Styling Details

### Tile Container

- **Background**: `var(--color-background-neutral-primary)`
- **Border**: 1px solid `var(--border-color-default)`
- **Border Radius**: 8px (via `tw-rounded-lg`)
- **Elevation**: Applied via `elevation-tile` class
- **Overflow**: Hidden (respects border radius)

### Section Header

- **Padding**: 16px vertical, 20px horizontal (12px/16px on mobile)
- **Min Height**: 56px (ensures consistent height)
- **Background**: `var(--color-background-neutral-secondary)`
- **Border Bottom**: 1px solid `var(--border-color-default)`
- **Gap**: 12px between title and actions

### Section Content

- **Padding**: 20px (when `padding="true"`, default)
- **Padding (mobile)**: 16px
- **No Padding**: 0 (when `padding="false"`)

### Section Borders

- **Vertical Tiles**: Bottom border between sections
- **Horizontal Tiles**: Right border between sections (switches to bottom on mobile)

## Responsive Behavior

### Mobile (< 640px)

- Section headers stack vertically (title above actions)
- Actions become full-width, right-aligned
- Reduced padding: 12px/16px instead of 16px/20px

### Tablet (< 768px)

- Horizontal tiles automatically become vertical
- Border separators update accordingly

## Design Principles

### 1. Composition Over Configuration

Instead of adding elevation/padding props to every component (tables, charts, forms), use tiles to compose layouts:

**❌ Don't:**
```html
<ds-data-table [elevation]="true" [padding]="lg" [border]="true" />
```

**✅ Do:**
```html
<ds-tile>
  <ds-tile-section [padding]="false">
    <ds-data-table />
  </ds-tile-section>
</ds-tile>
```

### 2. Semantic Slots

Use `<header-title>` and `<header-actions>` instead of arbitrary class names:

**❌ Don't:**
```html
<div class="tw-flex tw-justify-between tw-items-center">
  <h3>Title</h3>
  <button>Action</button>
</header-actions>
```

**✅ Do:**
```html
<header>
  <header-title>Title</header-title>
  <header-actions>
    <ds-button>Action</ds-button>
  </header-actions>
</header>
```

### 3. Design Guardrails with Escape Hatches

Predefined spacing and typography reduce decisions, but you can override when needed:

```html
<title style="gap: 12px; font-size: 18px;">Custom Title</header-title>
```

## When to Use

### Use Tiles When:

- Grouping related content that needs visual separation
- Creating cards or panels in a dashboard
- Displaying tables, forms, or charts with headers
- Building multi-section layouts (e.g., invoice details)

### Don't Use Tiles When:

- Content doesn't need elevation or borders
- Building simple list items
- Creating inline components (badges, buttons, etc.)
- Content is already within a tile (no nested tiles)

## Accessibility

- Use semantic HTML within sections (`<h2>`, `<h3>`, etc.) for proper heading hierarchy
- Ensure action buttons have proper `ariaLabel` when icon-only
- Tile sections can be given `role="region"` if needed for screen readers
- Headers automatically handle focus management

## Browser Support

- Modern browsers with CSS Flexbox support
- CSS `:has()` selector for automatic table padding (graceful degradation)
- CSS Grid for content layouts within sections (optional)

