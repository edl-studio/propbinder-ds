# Mobile Handbook Folder Component

A visually rich folder component for displaying handbook categories or sections in the mobile app. Features a two-layer folder design with customizable colors, icons, item counts, and labels.

## Features

- 📁 **Two-layer folder design** - Front (64px) and back (72px) with decorative notch
- 🎨 **Customizable colors** - Base and weak color inputs for theming
- 🔢 **Item count display** - Shows number of items in bottom-left corner
- 🎯 **Icon support** - ds-icon integration in bottom-right corner
- 🏷️ **Label text** - Centered label below folder
- 📱 **Mobile-optimized** - 160px width, perfect for grid layouts

## Design Details

The component creates a layered folder appearance:
- **Folder Back**: 72px height with a sharp top-left corner and decorative SVG notch
- **Folder Front**: 64px height overlaying the back, with rounded corners
- **Item Count**: Displayed in bottom-left with "ITEMS" label
- **Icon**: Positioned in bottom-right corner
- **Label**: Centered text below the folder visual

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { DsMobileHandbookFolderComponent } from '@ds/ui/mobile';

@Component({
  selector: 'app-handbooks',
  template: `
    <ds-mobile-handbook-folder
      [colorBase]="'#d244cf'"
      [colorWeak]="'#f9e6f9'"
      [iconName]="'remixLightbulbLine'"
      [itemCount]="8"
      [label]="'Utilities'">
    </ds-mobile-handbook-folder>
  `
})
export class HandbooksComponent {}
```

### Using Design System Colors

The component works beautifully with the color palette from `globals.css`:

#### Pink Folder

```html
<ds-mobile-handbook-folder
  [colorBase]="'#d244cf'"
  [colorWeak]="'#f9e6f9'"
  [iconName]="'remixLightbulbLine'"
  [itemCount]="8"
  [label]="'Utilities'">
</ds-mobile-handbook-folder>
```

#### Blue Folder

```html
<ds-mobile-handbook-folder
  [colorBase]="'#1e5aff'"
  [colorWeak]="'#e0e9ff'"
  [iconName]="'remixBookOpenLine'"
  [itemCount]="12"
  [label]="'Policies'">
</ds-mobile-handbook-folder>
```

#### Light Purple Folder

```html
<ds-mobile-handbook-folder
  [colorBase]="'#9670ff'"
  [colorWeak]="'#e8e0ff'"
  [iconName]="'remixFileList3Line'"
  [itemCount]="5"
  [label]="'Guidelines'">
</ds-mobile-handbook-folder>
```

#### Salmon Orange Folder

```html
<ds-mobile-handbook-folder
  [colorBase]="'#ff8064'"
  [colorWeak]="'#ffe6e0'"
  [iconName]="'remixShieldLine'"
  [itemCount]="15"
  [label]="'Safety'">
</ds-mobile-handbook-folder>
```

#### Orange Folder

```html
<ds-mobile-handbook-folder
  [colorBase]="'#ffa764'"
  [colorWeak]="'#ffece0'"
  [iconName]="'remixToolsLine'"
  [itemCount]="6"
  [label]="'Maintenance'">
</ds-mobile-handbook-folder>
```

#### Lime Green Folder

```html
<ds-mobile-handbook-folder
  [colorBase]="'#aff264'"
  [colorWeak]="'#f0fde3'"
  [iconName]="'remixPlantLine'"
  [itemCount]="10"
  [label]="'Amenities'">
</ds-mobile-handbook-folder>
```

#### Success Green Folder

```html
<ds-mobile-handbook-folder
  [colorBase]="'#158452'"
  [colorWeak]="'#dcfce7'"
  [iconName]="'remixCheckboxCircleLine'"
  [itemCount]="20"
  [label]="'Approved'">
</ds-mobile-handbook-folder>
```

#### Warning Folder

```html
<ds-mobile-handbook-folder
  [colorBase]="'#d97706'"
  [colorWeak]="'#fef3c7'"
  [iconName]="'remixAlertLine'"
  [itemCount]="3"
  [label]="'Important'">
</ds-mobile-handbook-folder>
```

### Grid Layout Example

```typescript
import { Component } from '@angular/core';
import { DsMobileHandbookFolderComponent } from '@ds/ui/mobile';

@Component({
  selector: 'app-handbooks-grid',
  standalone: true,
  imports: [DsMobileHandbookFolderComponent],
  styles: [`
    .folders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 24px;
      padding: 16px;
    }
  `],
  template: `
    <div class="folders-grid">
      <ds-mobile-handbook-folder
        [colorBase]="'#d244cf'"
        [colorWeak]="'#f9e6f9'"
        [iconName]="'remixLightbulbLine'"
        [itemCount]="8"
        [label]="'Utilities'">
      </ds-mobile-handbook-folder>
      
      <ds-mobile-handbook-folder
        [colorBase]="'#1e5aff'"
        [colorWeak]="'#e0e9ff'"
        [iconName]="'remixBookOpenLine'"
        [itemCount]="12"
        [label]="'Policies'">
      </ds-mobile-handbook-folder>
      
      <ds-mobile-handbook-folder
        [colorBase]="'#9670ff'"
        [colorWeak]="'#e8e0ff'"
        [iconName]="'remixFileList3Line'"
        [itemCount]="5"
        [label]="'Guidelines'">
      </ds-mobile-handbook-folder>
      
      <ds-mobile-handbook-folder
        [colorBase]="'#ff8064'"
        [colorWeak]="'#ffe6e0'"
        [iconName]="'remixShieldLine'"
        [itemCount]="15"
        [label]="'Safety'">
      </ds-mobile-handbook-folder>
    </div>
  `
})
export class HandbooksGridComponent {}
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `colorBase` | `string` | `'#6B5FF5'` | Base color for folder back, icon, and item count text |
| `colorWeak` | `string` | `'#E8E0FF'` | Weak/light color for folder front |
| `iconName` | `string` | `'remixFolder3Line'` | Icon name from the design system icon library |
| `itemCount` | `number` | `0` | Number of items in the folder |
| `label` | `string` | `'Folder'` | Label text displayed below the folder |

## Color Combinations from globals.css

Here's a reference table of color pairs from the design system:

| Theme | colorBase | colorWeak |
|-------|-----------|-----------|
| Brand Purple | `#6B5FF5` | `#E8E0FF` |
| Pink | `#d244cf` | `#f9e6f9` |
| Blue | `#1e5aff` | `#e0e9ff` |
| Light Purple | `#9670ff` | `#e8e0ff` |
| Salmon Orange | `#ff8064` | `#ffe6e0` |
| Orange | `#ffa764` | `#ffece0` |
| Lime Green | `#aff264` | `#f0fde3` |
| Success | `#158452` | `#dcfce7` |
| Warning | `#d97706` | `#fef3c7` |
| Destructive | `#dc2626` | `#fecaca` |

## Icon Suggestions

Popular icon names that work well with folders:
- `remixFolder3Line` - Generic folder
- `remixBookOpenLine` - Handbook/documentation
- `remixFileList3Line` - Lists/checklists
- `remixLightbulbLine` - Tips/utilities
- `remixShieldLine` - Safety/security
- `remixToolsLine` - Maintenance/tools
- `remixPlantLine` - Amenities/outdoor
- `remixCheckboxCircleLine` - Completed/approved
- `remixAlertLine` - Important/warnings
- `remixSettings3Line` - Settings/configuration

## Styling Notes

- Uses Brockmann font family for text
- Fixed width of 160px for consistent grid layouts
- Item count uses 20px/600 weight font
- Label uses 16px/600 weight font
- 8px padding inside folder front
- Component is clickable by default (cursor: pointer)
- User-select disabled for better UX

## Accessibility Considerations

When implementing click handlers, ensure:
- Appropriate ARIA labels are added
- Keyboard navigation support
- Focus states are visible
- Color contrast meets WCAG standards

## Implementation Notes

- Component uses `@Input()` decorators (not signal inputs) for compatibility
- Standalone component - can be imported directly
- SVG notch is inline for color customization
- No external CSS files - all styles are scoped

