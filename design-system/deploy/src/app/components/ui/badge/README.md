# Badge Component

A flexible badge component for displaying categorization, status, and labels with three distinct content types and strict color system.

## Features

- **Fixed Height**: 24px height for consistency
- **Three Content Types**: Text, Icon+Text, and Indicator+Text variants
- **Smart Styling**: Different color rules per content type
- **Strict Design**: Indicator tags always use white background with colored indicators
- **Typography**: Uses ui-xs-medium (12px, 500 weight, 1.2 line-height)
- **Color Variants**: Brand, success, warning, and destructive with weak/strong variants

## Content Types

### 1. Text Only
Simple text labels with colored backgrounds (weak) and strong text color.

```html
<ds-badge content="Premium" contentType="text" variant="brand"></ds-badge>
```

### 2. Icon + Text  
Icon with text, using the same color system as text-only but with icons.

```html
<ds-badge 
  content="Verified" 
  contentType="icon-text" 
  leadingIcon="remixCheckboxCircleFill" 
  variant="success">
</ds-badge>
```

### 3. Indicator + Text
Shape indicator with text. **Always white background and black text**, only the indicator color changes.

```html
<ds-badge 
  content="Active" 
  contentType="indicator-text" 
  variant="brand" 
  indicatorShape="circle">
</ds-badge>
```

## Usage Examples

### Basic Badges
```html
<!-- Core variants -->
<ds-badge content="Default" contentType="text" variant="default"></ds-badge>
<ds-badge content="Brand" contentType="text" variant="brand"></ds-badge>
<ds-badge content="Success" contentType="text" variant="success"></ds-badge>
<ds-badge content="Warning" contentType="text" variant="warning"></ds-badge>
<ds-badge content="Error" contentType="text" variant="destructive"></ds-badge>

<!-- Additional color variants -->
<ds-badge content="Blue" contentType="text" variant="blue"></ds-badge>
<ds-badge content="Light Purple" contentType="text" variant="light-purple"></ds-badge>
<ds-badge content="Pink" contentType="text" variant="pink"></ds-badge>
<ds-badge content="Salmon Orange" contentType="text" variant="salmon-orange"></ds-badge>
<ds-badge content="Orange" contentType="text" variant="orange"></ds-badge>
<ds-badge content="Lime Green" contentType="text" variant="lime-green"></ds-badge>
<ds-badge content="Grey" contentType="text" variant="grey"></ds-badge>
```

### Icon Badges
```html
<ds-badge 
  content="New Feature" 
  contentType="icon-text" 
  leadingIcon="remixStarFill" 
  variant="brand">
</ds-badge>
```

### Indicator Badges
```html
<!-- Core indicator variants -->
<ds-badge 
  content="Completed" 
  contentType="indicator-text" 
  variant="success" 
  indicatorShape="circle">
</ds-badge>

<ds-badge 
  content="In Progress" 
  contentType="indicator-text" 
  variant="brand" 
  indicatorShape="circle">
</ds-badge>

<!-- Additional indicator colors -->
<ds-badge 
  content="Info" 
  contentType="indicator-text" 
  variant="blue" 
  indicatorShape="circle">
</ds-badge>

<ds-badge 
  content="Special" 
  contentType="indicator-text" 
  variant="light-purple" 
  indicatorShape="diamond">
</ds-badge>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'destructive' \| 'blue' \| 'light-purple' \| 'pink' \| 'salmon-orange' \| 'orange' \| 'lime-green' \| 'grey'` | `'default'` | Badge color variant |
| `contentType` | `'text' \| 'icon-text' \| 'indicator-text'` | `'text'` | Content type determining layout and styling |
| `content` | `string` | `undefined` | Badge text content |
| `leadingIcon` | `string` | `undefined` | Icon name (only for icon-text type) |
| `indicatorShape` | `'circle' \| 'square' \| 'diamond' \| 'triangle' \| 'pentagon'` | `'circle'` | Shape (only for indicator-text type) |

## Color System

### Text & Icon-Text Types
**Core Variants:**
- **Default**: White background, light grey border, black text/icons
- **Brand**: Purple background (`--background-color-interactive-brand`), white text/icons
- **Success**: Light green background (`--color-success-weak`), dark green text/icons (`--color-success-strong`)
- **Warning**: Light yellow background (`--color-warning-weak`), dark yellow text/icons (`--color-warning-strong`)
- **Destructive**: Light red background (`--color-destructive-weak`), dark red text/icons (`--color-destructive-strong`)

**Additional Color Variants:**
- **Blue**: Light blue background (`--color-blue-weak`), dark blue text/icons (`--color-blue-strong`)
- **Light Purple**: Light purple background (`--color-light-purple-weak`), dark purple text/icons (`--color-light-purple-strong`)
- **Pink**: Light pink background (`--color-pink-weak`), dark pink text/icons (`--color-pink-strong`)
- **Salmon Orange**: Light salmon background (`--color-salmon-orange-weak`), dark salmon text/icons (`--color-salmon-orange-strong`)
- **Orange**: Light orange background (`--color-orange-weak`), dark orange text/icons (`--color-orange-strong`)
- **Lime Green**: Light lime background (`--color-lime-green-weak`), dark lime text/icons (`--color-lime-green-strong`)
- **Grey**: Light grey background (`--color-grey-weak`), dark grey text/icons (`--color-grey-strong`)

### Indicator-Text Type
- **Background**: Always `white`
- **Text**: Always `black`  
- **Indicator**: Uses respective variant base colors (supports all 12 color variants)
- **Border**: Uses `--border-color-default`

**Available Indicator Colors:**
- **Default**: `--background-color-interactive-default`
- **Brand**: `--background-color-interactive-brand` (purple)
- **Success**: `--color-success-base` (green)
- **Warning**: `--color-warning-base` (yellow)
- **Destructive**: `--color-destructive-base` (red)
- **Blue**: `--color-blue-base`
- **Light Purple**: `--color-light-purple-base`
- **Pink**: `--color-pink-base`
- **Salmon Orange**: `--color-salmon-orange-base`
- **Orange**: `--color-orange-base`
- **Lime Green**: `--color-lime-green-base`
- **Grey**: `--color-grey-base`

## Padding Rules

| Content Type | Padding | Reasoning |
|-------------|---------|-----------|
| Text only | `0 8px` | Symmetric padding for clean text display |
| Icon + Text | `0 8px 0 6px` | Reduced left padding to account for visual weight of icon |
| Indicator + Text | `0 8px` | Symmetric padding like text - indicator is smaller and less visually prominent |

## Technical Details

- **Encapsulation**: Shadow DOM for style isolation
- **Icon Size**: Fixed at 12x12 pixels
- **Indicator Size**: Fixed at 8x8 pixels
- **Height**: Fixed at 24px
- **Font Weight**: 500 (medium)
- **Border Radius**: 6px (rounded corners, not fully rounded)
- **Gap**: 4px between elements