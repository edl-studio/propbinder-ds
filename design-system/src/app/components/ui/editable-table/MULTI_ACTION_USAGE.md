# Multiple Action Buttons in Editable Table

## Overview

The `ActionCellComponent` has been enhanced to support multiple action buttons with a 4px gap between them. This allows you to add custom actions like "Manage", "Edit", "Delete", etc., to each row.

## Features

- ✅ Multiple action buttons per row
- ✅ 4px gap between buttons (design system standard)
- ✅ Flexible action configuration
- ✅ Custom icons and labels
- ✅ Individual button states (enabled/disabled)
- ✅ Button variants (ghost, primary, secondary, destructive)
- ✅ Backwards compatible with single delete button

## Usage

### Single Action (Backwards Compatible)

The old API still works for simple delete functionality:

```typescript
import { actionCell } from './editable-cell-helpers';

const columns: ColumnDef<Material>[] = [
  // ... other columns
  {
    id: 'actions',
    header: '',
    cell: (info) => actionCell(info.row.index, false),
  }
];

// Handle delete event
(rowDeleted)="onRowDeleted($event)"
```

### Multiple Actions (New API)

Use the new `actionsCell` helper for multiple buttons:

```typescript
import { actionsCell, type ActionButton } from './editable-cell-helpers';

const columns: ColumnDef<Material>[] = [
  // ... other columns
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
        icon: 'remixEditLine', 
        ariaLabel: 'Edit material', 
        action: 'edit',
        variant: 'primary' 
      },
      { 
        icon: 'remixDeleteBinLine', 
        ariaLabel: 'Delete material', 
        action: 'delete',
        disabled: info.row.original.isProtected 
      }
    ]),
    meta: {
      sizing: { width: '120px' }
    }
  }
];
```

### Handling Action Events

Listen to the `actionClicked` event in your component:

```typescript
@Component({
  template: `
    <ds-editable-table
      [(data)]="materialsData"
      [columns]="materialsColumns"
      (actionClicked)="onActionClicked($event)"
    />
  `
})
export class MaterialsComponent {
  onActionClicked(event: { action: string; rowIndex: number; row: Material }) {
    switch (event.action) {
      case 'manage':
        this.openManageDialog(event.row);
        break;
      case 'edit':
        this.openEditDialog(event.row);
        break;
      case 'delete':
        this.deleteRow(event.rowIndex);
        break;
    }
  }

  openManageDialog(material: Material) {
    // Open dialog with property-specific pricing
    console.log('Managing:', material);
  }

  openEditDialog(material: Material) {
    // Open edit dialog
    console.log('Editing:', material);
  }

  deleteRow(index: number) {
    // Delete the row
    this.materialsData.update(rows => rows.filter((_, i) => i !== index));
  }
}
```

## Complete Example: Materials Table with Manage + Delete

```typescript
import { Component, signal } from '@angular/core';
import { DsEditableTableComponent, actionsCell, editableTextCell, editableNumberCell } from '@ds/editable-table';
import type { ColumnDef } from '@tanstack/angular-table';

interface Material {
  id: string;
  name: string;
  costPrice: number;
  salesPrice: number;
  lastUpdated: string;
}

@Component({
  selector: 'app-materials-settings',
  standalone: true,
  imports: [DsEditableTableComponent],
  template: `
    <ds-editable-table
      [(data)]="materialsData"
      [columns]="materialsColumns"
      [allowAddRow]="true"
      [allowDeleteRow]="false"
      (actionClicked)="onActionClicked($event)"
    />
    
    <!-- Manage Dialog -->
    @if (selectedMaterial()) {
      <!-- Your dialog implementation here -->
    }
  `
})
export class MaterialsSettingsComponent {
  materialsData = signal<Material[]>([
    { id: '001', name: 'Administration fee', costPrice: 800, salesPrice: 1000, lastUpdated: 'Oct 24, 24' },
    { id: '002', name: 'Property sale fee', costPrice: 200, salesPrice: 400, lastUpdated: 'Sep 2, 25' },
  ]);

  selectedMaterial = signal<Material | null>(null);

  materialsColumns: ColumnDef<Material>[] = [
    {
      accessorKey: 'id',
      header: 'ID +',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => editableTextCell({
        row: info.row.original,
        rowIndex: info.row.index,
        value: info.getValue(),
      }),
    },
    {
      accessorKey: 'costPrice',
      header: 'Cost price',
      cell: (info) => editableNumberCell({
        row: info.row.original,
        rowIndex: info.row.index,
        value: info.getValue(),
      }),
    },
    {
      accessorKey: 'salesPrice',
      header: 'Sales price',
      cell: (info) => editableNumberCell({
        row: info.row.original,
        rowIndex: info.row.index,
        value: info.getValue(),
      }),
    },
    {
      accessorKey: 'lastUpdated',
      header: 'Last updated',
      cell: (info) => info.getValue(),
    },
    {
      id: 'actions',
      header: '',
      cell: (info) => actionsCell(info.row.index, info.row.original, [
        { 
          icon: 'remixSettings3Line', 
          ariaLabel: 'Manage', 
          action: 'manage' 
        },
        { 
          icon: 'remixDeleteBinLine', 
          ariaLabel: 'Delete', 
          action: 'delete' 
        }
      ]),
      meta: {
        sizing: { width: '100px' }
      }
    }
  ];

  onActionClicked(event: { action: string; rowIndex: number; row: Material }) {
    if (event.action === 'manage') {
      this.selectedMaterial.set(event.row);
      // Open dialog...
    } else if (event.action === 'delete') {
      this.materialsData.update(rows => rows.filter((_, i) => i !== event.rowIndex));
    }
  }
}
```

## ActionButton Configuration

```typescript
interface ActionButton {
  /** Icon name (from remix icons) */
  icon: string;
  
  /** Aria label for accessibility */
  ariaLabel: string;
  
  /** Action identifier (e.g., 'manage', 'delete', 'edit') */
  action: string;
  
  /** Whether the button is disabled (optional) */
  disabled?: boolean;
  
  /** Button variant (optional, defaults to 'ghost') */
  variant?: 'ghost' | 'primary' | 'secondary' | 'destructive';
}
```

## API Reference

### Helper Functions

- `actionCell(rowIndex, deleteDisabled?)` - Legacy single delete button *(deprecated)*
- `actionsCell(rowIndex, row, actions)` - Multiple action buttons *(recommended)*

### Events

- `actionClicked` - Emits `{ action: string; rowIndex: number; row: T }` when any action button is clicked
- `deleteClicked` - Emits `rowIndex` when delete button is clicked *(legacy, still supported)*

## Migration Guide

### From Single Delete to Multiple Actions

**Before:**
```typescript
{
  id: 'actions',
  cell: (info) => actionCell(info.row.index)
}
```

**After:**
```typescript
{
  id: 'actions',
  cell: (info) => actionsCell(info.row.index, info.row.original, [
    { icon: 'remixSettings3Line', ariaLabel: 'Manage', action: 'manage' },
    { icon: 'remixDeleteBinLine', ariaLabel: 'Delete', action: 'delete' }
  ])
}
```

And add the event handler:
```typescript
(actionClicked)="onActionClicked($event)"
```

