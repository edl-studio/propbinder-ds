# List Item Component

A versatile list item component that combines a title with metadata and action buttons. Perfect for task lists, notification feeds, and any list-based interfaces that require metadata and actions.

## Features

- Title with consistent typography
- Flexible metadata slot for status indicators, timestamps, etc.
- Action buttons that appear on hover
- Responsive layout that adapts to content length
- Consistent spacing and alignment

## Usage

```typescript
import { DsListItemComponent } from '@propbinder/design-system';

@Component({
  // ...
  imports: [DsListItemComponent],
})
```

```html
<ds-list-item title="Review pending changes">
  <!-- Metadata slot -->
  <div slot="metadata">
    <ds-metadata-item icon="remixTimeLine" value="2 hours ago" />
    <ds-metadata-item icon="remixUserLine" value="Assigned to John" />
  </div>
  
  <!-- Actions slot -->
  <div slot="actions">
    <ds-button variant="ghost" size="sm">Skip</ds-button>
    <ds-button variant="primary" size="sm">Review</ds-button>
  </div>
</ds-list-item>
```

## API

### Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | The title text to display |

### Slots

| Name | Description |
|------|-------------|
| metadata | For metadata items like status indicators, timestamps, etc. |
| actions | For action buttons that appear on hover |

## Best Practices

1. **Title Content**
   - Keep titles concise and clear
   - Use sentence case
   - Avoid ending punctuation

2. **Metadata**
   - Group related metadata items
   - Use consistent metadata patterns across list items
   - Keep metadata concise and relevant

3. **Actions**
   - Limit to 2-3 most important actions
   - Use ghost variant for secondary actions
   - Place primary action last

4. **Layout**
   - Maintain consistent spacing between list items
   - Allow metadata to wrap on narrow screens
   - Ensure action buttons are properly aligned

## Examples

### Task Item
```html
<ds-list-item title="Review design changes">
  <div slot="metadata">
    <ds-metadata-item
      icon="remixSparklingFill"
      value="Important"
      tooltip="High priority task"
    />
    <ds-metadata-item
      icon="remixSurveyLine"
      value="8 reviews pending"
    />
  </div>
  <div slot="actions">
    <ds-button variant="ghost" size="sm">Skip</ds-button>
    <ds-button variant="primary" size="sm">Review</ds-button>
  </div>
</ds-list-item>
```

### Notification Item
```html
<ds-list-item title="New comment on your post">
  <div slot="metadata">
    <ds-metadata-item
      icon="remixUserLine"
      value="John Doe"
    />
    <ds-metadata-item
      icon="remixTimeLine"
      value="Just now"
    />
  </div>
  <div slot="actions">
    <ds-button variant="ghost" size="sm">Mark as read</ds-button>
    <ds-button variant="primary" size="sm">View</ds-button>
  </div>
</ds-list-item>
```

## Accessibility

- Uses semantic HTML structure
- Maintains proper color contrast
- Supports keyboard navigation
- Action buttons are properly labeled
- Tooltips provide additional context when needed
