# Inline Message Component

A component for displaying contextual status messages with automatic icon selection and semantic color variants.

## Features

- **Four Variants**: Success, Error, Warning, and Information
- **Automatic Icons**: Each variant has a default icon that can be overridden
- **Flexible Content**: Supports both property-based and content-projected descriptions
- **Semantic Colors**: Uses design system color variables for consistency
- **Responsive Layout**: Icon and content adapt to container width

## Variants

### Success
For positive status or successful actions (e.g., "Operation completed successfully").

```html
<ds-inline-message variant="success" title="Success">
  Your changes have been saved successfully.
</ds-inline-message>
```

**Colors:**
- Background: `--color-success-weak` (light green)
- Icon: `--color-success-strong` (dark green)
- Default Icon: `remixCheckboxCircleLine` (checkmark circle)

### Error
For error states or failed actions (e.g., "Failed to save changes").

```html
<ds-inline-message variant="error" title="Error">
  An error occurred while processing your request.
</ds-inline-message>
```

**Colors:**
- Background: `--color-destructive-weak` (light red/pink)
- Icon: `--color-destructive-strong` (dark red)
- Default Icon: `remixCloseCircleLine` (X circle)

### Warning
For warning or caution messages (e.g., "Please review before continuing").

```html
<ds-inline-message variant="warning" title="Warning">
  This action cannot be undone.
</ds-inline-message>
```

**Colors:**
- Background: `--color-warning-weak` (light yellow)
- Icon: `--color-warning-strong` (dark orange/yellow)
- Default Icon: `remixErrorWarningLine` (warning circle)

### Information
For informational messages (e.g., "Here's what you need to know").

```html
<ds-inline-message variant="information" title="Information">
  You can update these settings at any time.
</ds-inline-message>
```

**Colors:**
- Background: `--color-blue-weak` (light blue)
- Icon: `--color-blue-strong` (dark blue)
- Default Icon: `remixInformationLine` (info circle)

## Usage Examples

### Basic Usage
```html
<ds-inline-message variant="success" title="Success">
  A short description
</ds-inline-message>
```

### With Property-Based Description
```html
<ds-inline-message
  variant="error"
  title="Error"
  description="Something went wrong. Please try again."
/>
```

### With Content Projection
```html
<ds-inline-message variant="information" title="Did you know?">
  You can customize this message with HTML content like <strong>bold text</strong>.
</ds-inline-message>
```

### Custom Icon
```html
<ds-inline-message
  variant="information"
  title="Custom Icon"
  icon="remixLightbulbLine"
>
  This message uses a custom icon.
</ds-inline-message>
```

### Custom Icon Size
```html
<ds-inline-message
  variant="success"
  title="Large Icon"
  iconSize="24px"
>
  This message has a larger icon.
</ds-inline-message>
```

### All Variants Together
```html
<div style="display: flex; flex-direction: column; gap: 16px;">
  <ds-inline-message variant="success" title="Success">
    Operation completed successfully.
  </ds-inline-message>
  
  <ds-inline-message variant="error" title="Error">
    Failed to complete the operation.
  </ds-inline-message>
  
  <ds-inline-message variant="warning" title="Warning">
    Please review before proceeding.
  </ds-inline-message>
  
  <ds-inline-message variant="information" title="Information">
    Here's some helpful information.
  </ds-inline-message>
</div>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'information'` | `'information'` | Visual style variant of the message |
| `title` | `string` | *required* | Title text displayed in the message |
| `description` | `string` | `undefined` | Optional description text (alternative to content projection) |
| `icon` | `string` | *auto* | Custom icon name (overrides default variant icon) |
| `iconSize` | `string` | `'20px'` | Size of the icon |

## Default Icons

Each variant has a default icon that is automatically applied:

| Variant | Default Icon | Description |
|---------|--------------|-------------|
| Success | `remixCheckboxCircleLine` | Checkmark in circle |
| Error | `remixCloseCircleLine` | X in circle |
| Warning | `remixErrorWarningLine` | Exclamation in circle |
| Information | `remixInformationLine` | "i" in circle |

## Layout

The component uses a flexible layout:
- **Icon**: Fixed width on the left (20px by default)
- **Content**: Flexible width on the right
- **Gap**: 12px between icon and content
- **Padding**: 16px around the entire message
- **Border Radius**: 8px for rounded corners

## Typography

- **Title**: 16px (base), 600 weight, 1.4 line-height
- **Description**: 14px (sm), 400 weight, 1.4 line-height
- **Font**: Brockmann (design system default)

## Technical Details

- **Encapsulation**: Shadow DOM for style isolation
- **Standalone**: Can be used independently
- **Dependencies**: CommonModule, DsIconComponent
- **Responsive**: Adapts to container width

## Accessibility

- Use appropriate variant to convey semantic meaning
- Title should be descriptive and clear
- Description provides additional context
- Icons are decorative and don't require alt text (semantic meaning is conveyed through color and title)

## Best Practices

1. **Choose the right variant**: Match the variant to the message intent
2. **Keep titles concise**: 1-5 words that summarize the message
3. **Provide context**: Use descriptions to explain what happened and what to do
4. **Don't overuse**: Reserve for important contextual information
5. **Group related messages**: Use consistent spacing when showing multiple messages
6. **Consider placement**: Place near related content or actions

