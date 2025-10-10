# Data Table Component

A powerful and flexible data table component built on TanStack Table for Angular. Features sorting, filtering, searching, pagination, and inline editing capabilities.

## Features

- ✅ **Column-based sorting** - Click column headers to sort ascending/descending
- ✅ **Global search** - Filter across all columns with a search input
- ✅ **Column filtering** - Individual column filters
- ✅ **Pagination** - Built-in pagination with customizable page sizes
- ✅ **Column visibility** - Show/hide columns dynamically
- ✅ **Inline editing** - Edit cell values directly in the table
- ✅ **Responsive design** - Works on mobile and desktop
- ✅ **Empty states** - Customizable empty state messaging
- ✅ **Row actions** - Add action buttons to rows
- ✅ **Clickable rows** - Make rows clickable with custom handlers
- ✅ **Accessible** - Built with ARIA attributes

## Installation

The component is already integrated with the design system. Make sure you have TanStack Table installed:

```bash
npm install @tanstack/angular-table
```

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { DsDataTableComponent } from './components/ui/data-table/ds-data-table';
import type { ColumnDef } from '@tanstack/angular-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  imports: [DsDataTableComponent],
  template: `
    <ds-data-table 
      [data]="users" 
      [columns]="columns"
      [searchable]="true"
      [paginated]="true"
    />
  `
})
export class UsersComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  ];

  columns: ColumnDef<User>[] = [
    { accessorKey: 'id', header: 'ID', size: 80 },
    { accessorKey: 'name', header: 'Name', size: 200 },
    { accessorKey: 'email', header: 'Email', size: 250 },
    { accessorKey: 'role', header: 'Role', size: 120 },
  ];
}
```

## Column Definitions

### Basic Column

```typescript
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 200, // Optional: column width in pixels
  }
];
```

### Custom Cell Rendering

```typescript
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as string;
      const color = status === 'active' ? '#10b981' : '#ef4444';
      return `<span style="color: ${color}">${status.toUpperCase()}</span>`;
    },
  }
];
```

### Formatted Values

```typescript
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (info) => {
      const price = info.getValue() as number;
      return `<span style="font-weight: 600;">$${price.toFixed(2)}</span>`;
    },
  }
];
```

### Actions Column

```typescript
const columns: ColumnDef<User>[] = [
  // ... other columns
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    cell: (info) => {
      const user = info.row.original;
      return `
        <div style="display: flex; gap: 8px;">
          <button 
            onclick="handleEdit('${user.id}')"
            style="padding: 4px 8px; border: none; background: transparent; cursor: pointer;">
            Edit
          </button>
          <button 
            onclick="handleDelete('${user.id}')"
            style="padding: 4px 8px; border: none; background: transparent; cursor: pointer;">
            Delete
          </button>
        </div>
      `;
    },
  }
];
```

## Component Properties

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `T[]` | **required** | Array of data to display |
| `columns` | `ColumnDef<T>[]` | **required** | Column definitions |
| `searchable` | `boolean` | `true` | Enable global search |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `paginated` | `boolean` | `true` | Enable pagination |
| `pageSize` | `number` | `10` | Rows per page |
| `pageSizeOptions` | `number[]` | `[5, 10, 20, 50, 100]` | Available page sizes |
| `showColumnVisibility` | `boolean` | `true` | Show column toggle |
| `emptyMessage` | `string` | `'No data available'` | Empty state message |
| `rowClickable` | `boolean` | `false` | Make rows clickable |
| `selectable` | `boolean` | `false` | Enable row selection |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `rowClicked` | `T` | Emitted when a row is clicked |
| `sortingChanged` | `SortingState` | Emitted when sorting changes |
| `filtersChanged` | `ColumnFiltersState` | Emitted when filters change |
| `dataUpdated` | `T[]` | Emitted when data is updated |

## Advanced Examples

### Clickable Rows

```typescript
@Component({
  template: `
    <ds-data-table 
      [data]="users" 
      [columns]="columns"
      [rowClickable]="true"
      (rowClicked)="onRowClick($event)"
    />
  `
})
export class UsersComponent {
  onRowClick(user: User) {
    console.log('Clicked user:', user);
    this.router.navigate(['/users', user.id]);
  }
}
```

### Custom Page Sizes

```typescript
<ds-data-table 
  [data]="products" 
  [columns]="columns"
  [pageSize]="25"
  [pageSizeOptions]="[10, 25, 50, 100, 500]"
/>
```

### Without Search or Pagination

```typescript
<ds-data-table 
  [data]="items" 
  [columns]="columns"
  [searchable]="false"
  [paginated]="false"
/>
```

### Listen to State Changes

```typescript
@Component({
  template: `
    <ds-data-table 
      [data]="users" 
      [columns]="columns"
      (sortingChanged)="onSortChange($event)"
      (filtersChanged)="onFilterChange($event)"
    />
  `
})
export class UsersComponent {
  onSortChange(sorting: SortingState) {
    console.log('Sorting changed:', sorting);
    // Update your backend query
  }
  
  onFilterChange(filters: ColumnFiltersState) {
    console.log('Filters changed:', filters);
    // Update your backend query
  }
}
```

## Inline Editing

For inline editing, you can use contenteditable spans in your cell renderer:

```typescript
const editableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => {
      const value = info.getValue() as string;
      return `
        <span 
          contenteditable="true"
          style="cursor: text; padding: 4px; border-radius: 4px;"
          onblur="handleUpdate('${info.row.id}', 'name', this.textContent)"
        >
          ${value}
        </span>
      `;
    },
  }
];
```

## Styling

The component uses CSS custom properties from the design system. All styling is automatically applied through the component's CSS file.

Key classes:
- `.ds-data-table` - Main container
- `.ds-data-table__table` - The table element
- `.ds-data-table__th` - Table headers
- `.ds-data-table__td` - Table cells
- `.ds-data-table__tr--clickable` - Clickable row style
- `.ds-data-table__empty` - Empty state

## Accessibility

- Uses semantic HTML table elements
- Includes ARIA labels for buttons
- Keyboard navigation support
- Screen reader friendly

## Performance Tips

1. **Memoize columns**: Define columns outside component to prevent re-creation
2. **Virtual scrolling**: For very large datasets (1000+ rows), consider using virtual scrolling
3. **Server-side pagination**: For datasets with thousands of rows, implement server-side pagination
4. **Lazy loading**: Load data on demand rather than all at once

## TanStack Table Integration

This component is built on TanStack Table v8. For advanced features like:
- Custom filters
- Column resizing
- Row expansion
- Sub-rows
- Virtual scrolling

Refer to the [TanStack Table documentation](https://tanstack.com/table/v8/docs/introduction).

## Examples

See the Storybook stories file for comprehensive examples:
- Basic usage
- With actions
- Large datasets
- Clickable rows
- Empty states
- Custom formatting

