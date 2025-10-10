# Component-Based Table Cells

The data table now supports component-based cell rendering alongside traditional HTML string rendering. This provides better type safety, consistency, and maintainability.

## Benefits

- ✅ **Type Safety**: Full TypeScript support with proper interfaces
- ✅ **Design System Consistency**: Uses actual DS components (icons, badges, etc.)
- ✅ **Maintainability**: Component updates automatically apply to all tables
- ✅ **Better DX**: Clean, declarative cell definitions
- ✅ **Backward Compatible**: Works alongside HTML string cells

## Available Cell Components

### IconTextCell

Displays an icon next to text. Perfect for items with associated icons.

```typescript
import { iconTextCell } from '@/components/ui/data-table/cell-helpers';

{
  accessorKey: 'name',
  header: 'Name',
  cell: (info) => iconTextCell({
    row: info.row.original,
    value: info.getValue(),
    iconName: info.row.original.icon,
    text: info.getValue() as string,
    gap: '4px',
    iconSize: '16px',
    iconColor: 'var(--text-color-default-secondary)',
    textClass: 'body-sm-medium'
  })
}
```

### BadgeCell

Displays a badge for status, category, or labels.

```typescript
import { badgeCell } from '@/components/ui/data-table/cell-helpers';

{
  accessorKey: 'status',
  header: 'Status',
  cell: (info) => badgeCell({
    row: info.row.original,
    value: info.getValue(),
    content: info.getValue() as string,
    variant: 'success' // or 'default', 'warning', 'destructive', etc.
  })
}
```

### DateCell

Displays a date with optional calendar icon.

```typescript
import { dateCell } from '@/components/ui/data-table/cell-helpers';

{
  accessorKey: 'createdAt',
  header: 'Created',
  cell: (info) => dateCell({
    row: info.row.original,
    value: info.getValue(),
    date: info.getValue() as string,
    showIcon: true,
    textClass: 'body-sm-regular'
  })
}
```

## Mixed Usage Example

You can mix component-based and HTML string cells in the same table:

```typescript
const columns: DataTableColumn<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => iconTextCell({
      row: info.row.original,
      value: info.getValue(),
      iconName: 'remixUserLine',
      text: info.getValue() as string
    })
  },
  {
    accessorKey: 'email',
    header: 'Email',
    // Traditional HTML string cell
    cell: (info) => `<span class="body-sm-regular">${info.getValue()}</span>`
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => badgeCell({
      row: info.row.original,
      value: info.getValue(),
      content: info.getValue() as string,
      variant: info.row.original.isActive ? 'success' : 'default'
    })
  }
];
```

## How It Works

The data table automatically detects whether a cell renderer returns:
- **Component cell object**: `{ component: string, data: CellComponentData }`
- **HTML string**: Rendered using `innerHTML`

This detection happens at runtime with zero performance impact.

## Creating Custom Cell Components

You can create your own cell components by extending `BaseCellComponent`:

```typescript
import { Component, computed } from '@angular/core';
import { BaseCellComponent, type CellComponentData } from './base-cell.component';
import { YourComponent } from '../../your-component';

export interface YourCellData extends CellComponentData {
  // Your custom properties
  customProp: string;
}

@Component({
  selector: 'your-cell',
  standalone: true,
  imports: [YourComponent],
  template: `
    <your-component [prop]="cellData().customProp" />
  `,
})
export class YourCellComponent extends BaseCellComponent {
  cellData = computed(() => this.data() as YourCellData);
}
```

Then register it in the data table template's switch statement and create a helper function.

## Migration from HTML Strings

Before:
```typescript
cell: (info) => {
  const row = info.row.original;
  return `
    <div class="tw-flex tw-items-center tw-gap-1">
      <i class="ri-user-line" style="font-size: 16px;"></i>
      <span>${info.getValue()}</span>
    </div>
  `;
}
```

After:
```typescript
cell: (info) => iconTextCell({
  row: info.row.original,
  value: info.getValue(),
  iconName: 'remixUserLine',
  text: info.getValue() as string,
  gap: '4px'
})
```

Cleaner, type-safe, and maintainable! 🎉

