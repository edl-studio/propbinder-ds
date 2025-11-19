# Mobile Interactive List Item - Inquiry Component

A specialized interactive list item for displaying inquiries, tickets, or support requests. Built on top of the `ds-mobile-interactive-list-item` base component with inquiry-specific features.

## Features

✅ **Built on Base Component** - Uses `ds-mobile-interactive-list-item` foundation  
✅ **Inquiry-Specific** - Title, description, status, timestamp  
✅ **Status Indicators** - Open/Closed with colored dots  
✅ **Icon Support** - Customizable leading icon  
✅ **Preview Text** - Truncated description (2 lines)  
✅ **Touch Interactions** - Click, long press with haptics  
✅ **Chevron Option** - Optional trailing chevron  

---

## Component Hierarchy

```
ds-mobile-interactive-list-item-inquiry
├── ds-mobile-interactive-list-item (base)
│   ├── content-leading: Icon in rounded square (48x48px)
│   ├── content-main:
│   │   ├── Title
│   │   ├── Description (optional, 2-line truncation)
│   │   └── Meta (status + timestamp)
│   └── content-trailing: Chevron (optional)
```

---

## Basic Usage

### Simple Inquiry Item

```typescript
<ds-mobile-interactive-list-item-inquiry
  [title]="'Tumble dryer is not working'"
  [description]="'For the past three days, I have been experiencing persistent problems with the dryer...'"
  [status]="'open'"
  [timestamp]="'12 days ago'"
  [clickable]="true"
  (inquiryClick)="openInquiry()">
</ds-mobile-interactive-list-item-inquiry>
```

### Closed Inquiry

```typescript
<ds-mobile-interactive-list-item-inquiry
  [title]="'Water pressure issue'"
  [description]="'Low water pressure in bathroom sink...'"
  [status]="'closed'"
  [timestamp]="'2 months ago'"
  [iconName]="'remixDropLine'"
  (inquiryClick)="viewInquiry()">
</ds-mobile-interactive-list-item-inquiry>
```

### Custom Icon and Color

```typescript
<ds-mobile-interactive-list-item-inquiry
  [title]="'Heating not working'"
  [status]="'open'"
  [timestamp]="'3 days ago'"
  [iconName]="'remixFireLine'"
  [iconColor]="'error'"
  [showChevron]="false">
</ds-mobile-interactive-list-item-inquiry>
```

---

## Component Reference

### `ds-mobile-interactive-list-item-inquiry`

Main inquiry list item component.

**Inputs:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Inquiry title |
| description | string | '' | Description/preview text (truncated to 2 lines) |
| status | 'open' \| 'closed' | 'open' | Inquiry status |
| statusLabel | string | '' | Custom status label (defaults to capitalized status) |
| timestamp | string | required | Timestamp text (e.g., "12 days ago") |
| iconName | string | 'remixCalendarLine' | Icon name for leading icon |
| iconColor | string | 'secondary' | Icon color |
| variant | 'feed' \| 'detail' \| 'compact' | 'feed' | Display variant |
| clickable | boolean | true | Whether item is clickable |
| showChevron | boolean | true | Whether to show trailing chevron |

**Outputs:**

| Name | Type | Description |
|------|------|-------------|
| inquiryClick | void | Emits when inquiry is clicked |
| longPress | void | Emits on long press (500ms) |

---

## Variants

### Feed Variant (Default)
Standard display for inquiry lists.

```typescript
<ds-mobile-interactive-list-item-inquiry 
  variant="feed"
  [title]="inquiry.title"
  [status]="inquiry.status"
  [timestamp]="inquiry.timestamp">
</ds-mobile-interactive-list-item-inquiry>
```

### Compact Variant
Smaller padding for nested lists.

```typescript
<ds-mobile-interactive-list-item-inquiry 
  variant="compact"
  [title]="inquiry.title"
  [status]="inquiry.status"
  [timestamp]="inquiry.timestamp">
</ds-mobile-interactive-list-item-inquiry>
```

---

## Status Types

### Open Status
Active inquiries with blue indicator.

```typescript
<ds-mobile-interactive-list-item-inquiry
  [status]="'open'"
  [statusLabel]="'Open'">
</ds-mobile-interactive-list-item-inquiry>
```

### Closed Status
Resolved inquiries with gray indicator.

```typescript
<ds-mobile-interactive-list-item-inquiry
  [status]="'closed'"
  [statusLabel]="'Closed'">
</ds-mobile-interactive-list-item-inquiry>
```

---

## Icon Options

Common icons for different inquiry types:

- **General**: `remixCalendarLine`, `remixQuestionLine`
- **Maintenance**: `remixToolsLine`, `remixHammerLine`
- **Utilities**: `remixDropLine`, `remixFlashLine`, `remixFireLine`
- **Appliances**: `remixRefrigeratorLine`
- **Security**: `remixLockLine`, `remixAlarmWarningLine`

```typescript
<ds-mobile-interactive-list-item-inquiry
  [iconName]="'remixToolsLine'"
  [iconColor]="'warning'">
</ds-mobile-interactive-list-item-inquiry>
```

---

## Best Practices

1. **Titles**
   - Keep titles concise and descriptive
   - Use sentence case
   - Avoid ending punctuation

2. **Descriptions**
   - Provide context in the first 2 lines
   - Let text truncate naturally
   - Full content shown on detail view

3. **Status**
   - Use 'open' for active inquiries
   - Use 'closed' for resolved items
   - Consider custom status labels for specific workflows

4. **Icons**
   - Choose icons that represent the inquiry category
   - Use consistent icons for the same types
   - Consider color coding by urgency

5. **Interactions**
   - Always provide `inquiryClick` handler
   - Use `longPress` for context menus (e.g., delete, mark as read)
   - Ensure touch targets are accessible

---

## Examples

### Complete Inquiry List

```typescript
<div class="inquiries-list">
  @for (inquiry of inquiries(); track inquiry.id) {
    <ds-mobile-interactive-list-item-inquiry
      [title]="inquiry.title"
      [description]="inquiry.description"
      [status]="inquiry.status"
      [timestamp]="inquiry.createdAt"
      [iconName]="getInquiryIcon(inquiry.category)"
      [clickable]="true"
      (inquiryClick)="openInquiryDetail(inquiry.id)"
      (longPress)="showInquiryActions(inquiry.id)">
    </ds-mobile-interactive-list-item-inquiry>
  }
</div>
```

### With Category-Based Icons

```typescript
getInquiryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    maintenance: 'remixToolsLine',
    plumbing: 'remixDropLine',
    electrical: 'remixFlashLine',
    heating: 'remixFireLine',
    security: 'remixLockLine',
    appliance: 'remixRefrigeratorLine',
    other: 'remixCalendarLine'
  };
  return iconMap[category] || 'remixCalendarLine';
}
```

### Filtered by Status

```typescript
<div class="inquiries-container">
  <!-- Filter tabs -->
  <div class="filter-tabs">
    <button (click)="filterStatus = 'all'">All</button>
    <button (click)="filterStatus = 'open'">Open</button>
    <button (click)="filterStatus = 'closed'">Closed</button>
  </div>
  
  <!-- Inquiry list -->
  @for (inquiry of filteredInquiries(); track inquiry.id) {
    <ds-mobile-interactive-list-item-inquiry
      [title]="inquiry.title"
      [description]="inquiry.description"
      [status]="inquiry.status"
      [timestamp]="inquiry.timestamp"
      (inquiryClick)="viewInquiry(inquiry.id)">
    </ds-mobile-interactive-list-item-inquiry>
  }
</div>
```

---

## Architecture

This component is built on the `ds-mobile-interactive-list-item` base component, which provides:
- Flexible slot-based layout
- Touch interactions (tap, long press)
- Haptic feedback
- Accessibility features
- Customizable leading content size (48x48px for inquiry icon)

The inquiry component adds:
- Title with ellipsis overflow
- Description with 2-line truncation
- Status indicator with colored dot
- Timestamp with clock icon
- Optional trailing chevron

See [`ds-mobile-interactive-list-item` README](../interactive-list-item/README.md) for base component details.

---

## Design Tokens

The component uses the following design tokens:

```css
--color-background-neutral-secondary (icon background)
--color-text-primary (title)
--color-text-secondary (description)
--color-text-tertiary (timestamp, closed status)
--color-brand-primary (open status)
--font-size-base (title)
--font-size-sm (description, meta)
```

---

## Related Components

- **[ds-mobile-interactive-list-item](../interactive-list-item/README.md)** - Base list item component
- **[ds-mobile-interactive-list-item-post](../interactive-list-item-post/README.md)** - Post list item
- **[ds-icon](../../../../design-system/src/app/components/ui/icon/README.md)** - Icon component

