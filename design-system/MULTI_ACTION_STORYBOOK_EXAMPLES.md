# Multi-Action Storybook Examples

## Overview

Added comprehensive Storybook examples demonstrating 2-action buttons (Manage + Delete) for both editable and data table components.

## What Was Added

### 1. Editable Table Story: `MultipleActions`

**Location:** `src/app/components/ui/editable-table/ds-editable-table.stories.ts`

**Features:**
- Materials settings table with editable cells
- Uses the new `actionsCell()` helper function
- Demonstrates component-based action cells
- 4px gap between buttons
- Interactive demo with alert on "Manage" click

**Column Definition:**
```typescript
{
  id: 'actions',
  header: '',
  cell: (info) => actionsCell(info.row.index, info.row.original, [
    { 
      icon: 'remixSettings3Line', 
      ariaLabel: 'Manage material', 
      action: 'manage' 
    },
    { 
      icon: 'remixDeleteBinLine', 
      ariaLabel: 'Delete material', 
      action: 'delete' 
    }
  ]),
}
```

**Event Handling:**
```typescript
(actionClicked)="onActionClicked($event)"

onActionClicked(event: any) {
  console.log('Action clicked:', event);
  if (event.action === 'manage') {
    alert(`Managing material: ${event.row.name}...`);
  } else if (event.action === 'delete') {
    // Delete logic
  }
}
```

### 2. Data Table Story: `MultipleActions`

**Location:** `src/app/components/ui/data-table/ds-data-table.stories.ts`

**Features:**
- Read-only materials table with action buttons
- Uses inline HTML approach (data tables don't support component cells)
- Same 4px gap between buttons
- Icon-only buttons with hover states
- Settings icon for "Manage", trash icon for "Delete"

**Column Definition:**
```typescript
{
  id: 'actions',
  header: '',
  cell: (info) => {
    const row = info.row.original;
    return `
      <div style="display: flex; gap: 4px; align-items: center; justify-content: flex-end;">
        <button 
          data-action="manage"
          style="..."
          onclick="alert('Managing material: ${row.name}...')"
          title="Manage">
          <!-- Manage Icon SVG -->
        </button>
        <button 
          data-action="delete"
          style="..."
          onclick="alert('Delete material: ${row.name}')"
          title="Delete">
          <!-- Delete Icon SVG -->
        </button>
      </div>
    `;
  },
}
```

## Key Differences

| Feature | Editable Table | Data Table |
|---------|---------------|------------|
| **Approach** | Component-based cells | Inline HTML |
| **Helper** | `actionsCell()` | Manual HTML string |
| **Events** | `actionClicked` output | Inline `onclick` handlers |
| **Icons** | Remix icons via component | Inline SVG |
| **Gap** | 4px (inline style) | 4px (inline style) |

## Icon Usage

### Editable Table Icons
Added `remixSettings3Line` to the icon providers:
```typescript
provideIcons({
  remixAddLine,
  remixDeleteBinLine,
  remixSettings3Line,  // New
  // ... other icons
})
```

### Data Table Icons
Same icon added to providers:
```typescript
provideIcons({
  remixSettings3Line,  // New
  // ... other icons
})
```

## Sample Data

Both examples use a similar materials dataset:
```typescript
interface Material {
  id: string;
  name: string;
  costPrice: number;
  salesPrice: number;
  lastUpdated: string;
}

const sampleMaterials: Material[] = [
  { id: '001', name: 'Administration fee', costPrice: 800, salesPrice: 1000, lastUpdated: 'Oct 24, 24' },
  { id: '002', name: 'Property sale fee', costPrice: 200, salesPrice: 400, lastUpdated: 'Sep 2, 25' },
  // ... more materials
];
```

## How to View

1. **Start Storybook:**
   ```bash
   cd design-system
   npm run storybook
   ```

2. **Navigate to:**
   - **Editable Table:** Primitives → Editable Table → Multiple Actions
   - **Data Table:** Primitives → Data Table → Multiple Actions

3. **Interact:**
   - Click "Manage" to see alert with material name
   - Click "Delete" to see delete confirmation
   - Check console for event logs (editable table)

## Best Practices Demonstrated

✅ **4px gap** between action buttons (design system standard)  
✅ **Icon-only buttons** for compact UI  
✅ **Hover states** for visual feedback  
✅ **Semantic actions** (manage, delete) not implementation details  
✅ **Accessibility** with aria-labels and titles  
✅ **Consistent styling** across both table types  
✅ **Type-safe** event handling (editable table)

## Developer Notes

- The editable table example is more robust and type-safe
- The data table example is simpler but requires manual HTML
- Both achieve the same visual result with 4px gap
- Use editable table approach when possible for better maintainability

