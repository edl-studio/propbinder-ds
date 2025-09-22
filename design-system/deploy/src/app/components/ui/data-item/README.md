# Data Item Component

A flexible data item component for displaying label-value pairs with multiple layout options and value types. Perfect for user profiles, task details, settings panels, and structured data displays.

## Features

- **Two Layout Types**: Vertical and horizontal arrangements for different use cases
- **Fixed Value Height**: 32px height for consistent alignment across all value types
- **Four Value Types**: Text, Icon+Text, Avatar+Text, and Badge variants
- **Responsive Design**: Horizontal layout automatically collapses to vertical on mobile
- **Consistent Spacing**: 8px gap between elements in value container
- **Semantic Typography**: Uses ui-sm-regular (14px, 400 weight) for value text

## Layout Types

### 1. Vertical Layout
Stacks label above value with 4px gap. Ideal for compact displays, mobile layouts, and when you need to conserve horizontal space.

```html
<ds-data-item 
  label="Email Address" 
  value="user@example.com" 
  layout="vertical" 
  valueType="text">
</ds-data-item>
```

### 2. Horizontal Layout
Places label and value side-by-side with 12px gap. Label container has fixed 128px width for consistent alignment across multiple data items.

```html
<ds-data-item 
  label="Full Name" 
  value="John Doe" 
  layout="horizontal" 
  valueType="text">
</ds-data-item>
```

## Value Types

### Multi-Badge Support
The data item component now supports displaying multiple badges using the `multi-badge` value type. This is perfect for showing multiple statuses, tags, or categories.

```html
<ds-data-item 
  label="Status" 
  valueType="multi-badge"
  [badges]="[
    { variant: 'success', content: 'Active' },
    { variant: 'blue', content: 'Premium', leadingIcon: 'remixStarFill' },
    { variant: 'warning', content: 'Pending Review' }
  ]">
</ds-data-item>
```

Each badge in the array can have the following properties:
- `variant`: Badge color variant (optional, defaults to 'default')
- `content`: Badge text content (required)
- `contentType`: Type of content display (optional, defaults to 'text')
- `leadingIcon`: Icon name for icon-text type (optional)
- `indicatorShape`: Shape of the indicator for indicator-text type (optional, defaults to 'circle')

### 1. Text Only
Simple text display using ui-sm-regular typography with primary text color.

```html
<ds-data-item 
  label="Department" 
  value="Engineering" 
  layout="horizontal" 
  valueType="text">
</ds-data-item>
```

### 2. Icon + Text
16px icon with secondary color paired with text. Perfect for status indicators, locations, or categorized information.

```html
<ds-data-item 
  label="Status" 
  value="Active" 
  layout="horizontal" 
  valueType="icon-text" 
  iconName="remixCheckboxCircleFill">
</ds-data-item>
```

### 3. Avatar + Text
20x20px avatar (xs size) with text. Supports all avatar types: initials, photo, and icon. Ideal for user assignments, ownership, or person-related data.

```html
<!-- Initials Avatar -->
<ds-data-item 
  label="Assigned to" 
  value="John Doe" 
  layout="horizontal" 
  valueType="avatar-text" 
  avatarType="initials" 
  avatarInitials="JD">
</ds-data-item>

<!-- Photo Avatar -->
<ds-data-item 
  label="Created by" 
  value="Sarah Wilson" 
  layout="horizontal" 
  valueType="avatar-text" 
  avatarType="photo" 
  avatarSrc="https://example.com/photo.jpg">
</ds-data-item>

<!-- Icon Avatar -->
<ds-data-item 
  label="Owner" 
  value="System User" 
  layout="horizontal" 
  valueType="avatar-text" 
  avatarType="icon" 
  avatarIconName="remixRobotFill">
</ds-data-item>
```

### 4. Badge
Full badge component with all variants and content types. Perfect for status, priority, categories, or any labeled information.

```html
<!-- Text Badge -->
<ds-data-item 
  label="Priority" 
  layout="horizontal" 
  valueType="badge" 
  badgeVariant="destructive" 
  badgeContentType="text" 
  badgeContent="High">
</ds-data-item>

<!-- Icon Badge -->
<ds-data-item 
  label="Status" 
  layout="horizontal" 
  valueType="badge" 
  badgeVariant="success" 
  badgeContentType="icon-text" 
  badgeContent="Completed" 
  badgeIcon="remixCheckboxCircleFill">
</ds-data-item>

<!-- Indicator Badge -->
<ds-data-item 
  label="Type" 
  layout="horizontal" 
  valueType="badge" 
  badgeVariant="brand" 
  badgeContentType="indicator-text" 
  badgeContent="Premium" 
  badgeIndicatorShape="circle">
</ds-data-item>
```

## Usage Examples

### User Profile
```html
<div class="user-profile">
  <ds-data-item 
    label="Full Name" 
    value="Sarah Wilson" 
    layout="horizontal" 
    valueType="text">
  </ds-data-item>
  
  <ds-data-item 
    label="Email" 
    value="sarah.wilson@company.com" 
    layout="horizontal" 
    valueType="text">
  </ds-data-item>
  
  <ds-data-item 
    label="Role" 
    layout="horizontal" 
    valueType="badge" 
    badgeVariant="brand" 
    badgeContentType="text" 
    badgeContent="Admin">
  </ds-data-item>
  
  <ds-data-item 
    label="Status" 
    value="Online" 
    layout="horizontal" 
    valueType="icon-text" 
    iconName="remixCheckboxCircleFill">
  </ds-data-item>
  
  <ds-data-item 
    label="Manager" 
    value="John Doe" 
    layout="horizontal" 
    valueType="avatar-text" 
    avatarType="initials" 
    avatarInitials="JD">
  </ds-data-item>
</div>
```

### Task Details
```html
<div class="task-details">
  <ds-data-item 
    label="Title" 
    value="Implement user authentication" 
    layout="horizontal" 
    valueType="text">
  </ds-data-item>
  
  <ds-data-item 
    label="Priority" 
    layout="horizontal" 
    valueType="badge" 
    badgeVariant="warning" 
    badgeContentType="text" 
    badgeContent="High">
  </ds-data-item>
  
  <ds-data-item 
    label="Assignee" 
    value="Sarah Wilson" 
    layout="horizontal" 
    valueType="avatar-text" 
    avatarType="photo" 
    avatarSrc="https://example.com/sarah.jpg">
  </ds-data-item>
  
  <ds-data-item 
    label="Due Date" 
    value="March 15, 2024" 
    layout="horizontal" 
    valueType="icon-text" 
    iconName="remixCalendarLine">
  </ds-data-item>
</div>
```

### Vertical Compact Layout
```html
<div class="compact-info">
  <ds-data-item 
    label="Email" 
    value="user@example.com" 
    layout="vertical" 
    valueType="text">
  </ds-data-item>
  
  <ds-data-item 
    label="Status" 
    value="Active" 
    layout="vertical" 
    valueType="icon-text" 
    iconName="remixCheckboxCircleFill">
  </ds-data-item>
  
  <ds-data-item 
    label="Owner" 
    value="John Doe" 
    layout="vertical" 
    valueType="avatar-text" 
    avatarType="initials" 
    avatarInitials="JD">
  </ds-data-item>
</div>
```

## Properties

### Basic Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | **required** | The label text to display |
| `value` | `string` | `''` | The value text (not used for badge types) |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout arrangement of label and value |
| `valueType` | `'text' \| 'icon-text' \| 'avatar-text' \| 'badge' \| 'multi-badge'` | `'text'` | Type of value display |
| `badges` | `DataItemBadgeConfig[]` | `undefined` | Array of badge configurations for multi-badge type |

### Icon-Text Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `iconName` | `string` | `undefined` | Icon name for icon-text type |

### Avatar-Text Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `avatarType` | `'initials' \| 'photo' \| 'icon'` | `'initials'` | Avatar type |
| `avatarInitials` | `string` | `''` | Avatar initials (for initials type) |
| `avatarSrc` | `string` | `''` | Avatar image source (for photo type) |
| `avatarIconName` | `string` | `'remixUser3Fill'` | Avatar icon name (for icon type) |

### Badge Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `badgeVariant` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'destructive' \| 'blue' \| 'light-purple' \| 'pink' \| 'salmon-orange' \| 'orange' \| 'lime-green' \| 'grey'` | `'default'` | Badge color variant |
| `badgeContentType` | `'text' \| 'icon-text' \| 'indicator-text'` | `'text'` | Badge content type |
| `badgeContent` | `string` | `''` | Badge content text |
| `badgeIcon` | `string` | `undefined` | Badge icon name (for icon-text type) |
| `badgeIndicatorShape` | `'circle' \| 'square'` | `'circle'` | Badge indicator shape (for indicator-text type) |

## Layout Specifications

### Dimensions
- **Value Container Height**: Fixed at 32px for all value types
- **Label Width (Horizontal)**: Fixed at 128px for consistent alignment
- **Gap (Vertical)**: 4px between label and value
- **Gap (Horizontal)**: 12px between label and value containers
- **Value Elements Gap**: 8px between elements within value container

### Responsive Behavior
- **Desktop**: Horizontal layout displays as side-by-side
- **Mobile (≤768px)**: Horizontal layout automatically collapses to vertical
- **Label Width**: Becomes auto on mobile to prevent overflow

### Typography
- **Label**: Inherits from ds-label component (ui-sm-regular, secondary color)
- **Value Text**: ui-sm-regular (14px, 400 weight, 1.4 line-height, primary color)
- **Icon Size**: 16px with secondary color
- **Avatar Size**: 20x20px (xs size variant)

## Design System Integration

### Component Dependencies
- **ds-label**: For consistent label styling and accessibility
- **ds-icon**: For icon-text value type
- **ds-avatar**: For avatar-text value type (uses new xs/20px size)
- **ds-badge**: For badge value type with all variants

### Color System
- **Label Text**: `var(--text-color-default-secondary)`
- **Value Text**: `var(--text-color-default-primary)`
- **Icon Color**: `var(--text-color-default-secondary)`
- **Avatar/Badge**: Inherit from respective component color systems

### Accessibility
- Uses semantic label element for proper screen reader support
- Maintains consistent focus states through child components
- Respects `prefers-reduced-motion` for animations
- Proper color contrast ratios through design token system

## Best Practices

### When to Use
- **User profiles** and contact information
- **Task and project details** with mixed content types
- **Settings panels** with configuration options
- **Dashboard widgets** showing key metrics
- **Form summaries** and review screens
- **Object properties** in admin interfaces

### Layout Guidelines
- Use **horizontal layout** for forms, detail views, and structured lists
- Use **vertical layout** for compact spaces, cards, and mobile-first designs
- Group related data items with consistent spacing
- Maintain visual hierarchy through proper labeling

### Content Guidelines
- Keep labels concise but descriptive
- Use consistent terminology across related data items
- Choose appropriate value types based on content nature
- Ensure proper icon selection that reinforces meaning

### Performance
- Component uses OnPush change detection for optimal performance
- Lazy loads child components only when needed
- Minimal DOM footprint with efficient CSS classes
