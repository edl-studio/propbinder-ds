# Mobile Composition Components

Modular, semantic components for building mobile pages following the same pattern as `ds-tile`.

## Component Hierarchy

```
ds-mobile-page-main
├── ds-mobile-header-content [header-content slot]
│   └── ds-mobile-header-content-tile (multiple)
│       ├── tile-icon
│       └── tile-content
│           ├── tile-label
│           └── tile-value
│
└── ds-mobile-content [default slot]
    └── ds-mobile-content-section (multiple)
        ├── section-header
        └── content-row
```

---

## Header Content Components

### `ds-mobile-header-content`
Container for header tiles - displays in 2-column grid on mobile, auto-fit on desktop.

### `ds-mobile-header-content-tile`
Individual tile with purple background for displaying summary data.

### Semantic Slots

- **`tile-icon`** - Dark purple icon container (32x32px)
- **`tile-content`** - Label + value container
- **`tile-label`** - Small purple text (14px, 400 weight)
- **`tile-value`** - Large white text (18px, 600 weight)

---

## Content Components

### `ds-mobile-content`
Main content container with flexible layout options.

**Layout Options:**
- `stacked` (default) - Vertical stack with 32px gap
- `grid-2` - 2 column grid (stacks on mobile)
- `grid-3` - 3 column grid (stacks on mobile)

### `ds-mobile-content-section`
Content section with optional header and rows.

### Semantic Slots

- **`section-header`** - Placeholder header with width options (`half`, `third`, `full`)
- **`content-row`** - Horizontal row with 12px gap

---

## Usage Examples

### Basic Header Tiles

```html
<ds-mobile-page-main
  title="Dashboard"
  headerTitle="Overview"
  [avatarInitials]="'JD'">
  
  <ds-mobile-header-content header-content>
    <ds-mobile-header-content-tile>
      <tile-icon>
        <ds-icon name="remixUser3Line" size="20px" color="#DFE4FF" />
      </tile-icon>
      <tile-content>
        <tile-label>Active Users</tile-label>
        <tile-value>1,234</tile-value>
      </tile-content>
    </ds-mobile-header-content-tile>

    <ds-mobile-header-content-tile>
      <tile-icon>
        <ds-icon name="remixLineChartLine" size="20px" color="#DFE4FF" />
      </tile-icon>
      <tile-content>
        <tile-label>Growth</tile-label>
        <tile-value>+12.3%</tile-value>
      </tile-content>
    </ds-mobile-header-content-tile>
  </ds-mobile-header-content>
  
  <ds-mobile-content>
    <!-- Your content -->
  </ds-mobile-content>
</ds-mobile-page-main>
```

### Content with Sections

```html
<ds-mobile-content>
  <ds-mobile-content-section>
    <section-header width="half"></section-header>
    <content-row>
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
    </content-row>
  </ds-mobile-content-section>

  <ds-mobile-content-section>
    <section-header width="third"></section-header>
    <content-row>
      <div class="card">Card 3</div>
    </content-row>
  </ds-mobile-content-section>
</ds-mobile-content>
```

### Grid Layout

```html
<ds-mobile-content layout="grid-2">
  <ds-mobile-content-section>
    <h3>Section 1</h3>
    <p>Content</p>
  </ds-mobile-content-section>
  
  <ds-mobile-content-section>
    <h3>Section 2</h3>
    <p>Content</p>
  </ds-mobile-content-section>
</ds-mobile-content>
```

---

## Benefits

✅ **Semantic HTML** - Custom tags clearly communicate structure  
✅ **No CSS Classes** - Styling is encapsulated in components  
✅ **Reusable** - Use tiles and sections across any mobile page  
✅ **Composable** - Mix and match as needed  
✅ **Consistent** - Follows the same pattern as `ds-tile`  
✅ **Maintainable** - Styles centralized in components  

---

## Comparison to ds-tile

| Feature | ds-tile | ds-mobile-header-content |
|---------|---------|--------------------------|
| Container | `ds-tile` | `ds-mobile-header-content` |
| Child | `ds-tile-section` | `ds-mobile-header-content-tile` |
| Header | `tile-header` | `tile-icon` + `tile-content` |
| Semantic slots | `header-title`, `header-actions` | `tile-label`, `tile-value` |
| Use case | Desktop cards/panels | Mobile header summaries |

---

## File Locations

```
mobile/
├── header-content/
│   ├── ds-mobile-header-content.ts
│   └── index.ts
│
└── content/
    ├── ds-mobile-content.ts
    └── index.ts
```

---

## Related Components

- `ds-mobile-page-main` - Main page wrapper (uses these components)
- `ds-tile` - Desktop equivalent with similar composition pattern
- `ds-icon` - Used within `tile-icon` slots

