# Data Table Quick Start Guide

## 🚀 Installation Complete!

The `ds-data-table` component is now ready to use in your design system.

## 📦 What Was Created

```
/data-table/
├── ds-data-table.ts              # Main component (450+ lines)
├── ds-data-table.css             # Styles (300+ lines)
├── ds-data-table-cells.ts        # Helper components
├── ds-data-table.stories.ts      # 9 Storybook stories
├── README.md                     # Full documentation
├── USAGE_EXAMPLES.md             # Code examples
├── COMPONENT_SUMMARY.md          # Implementation details
└── QUICK_START.md                # This file
```

## ⚡ 30-Second Start

```typescript
import { DsDataTableComponent } from './components/ui';
import type { ColumnDef } from '@tanstack/angular-table';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  imports: [DsDataTableComponent],
  template: `<ds-data-table [data]="users" [columns]="columns" />`
})
export class MyComponent {
  users: User[] = [
    { id: 1, name: 'John', email: 'john@example.com' },
  ];

  columns: ColumnDef<User>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
  ];
}
```

## 🎯 Key Features

✅ **Sorting** - Click any column header  
✅ **Search** - Global search box included  
✅ **Filtering** - Per-column filtering  
✅ **Pagination** - Built-in with page size options  
✅ **Editing** - Inline cell editing support  
✅ **Actions** - Easy action buttons  
✅ **Responsive** - Mobile-friendly  
✅ **Accessible** - ARIA labels included  

## 🎨 View in Storybook

```bash
npm run storybook
```

Navigate to: **Components → Data Table**

You'll find 9 interactive examples showing all features.

## 📖 Key Properties

```typescript
<ds-data-table
  [data]="myData"                    // Your data array (required)
  [columns]="myColumns"              // Column definitions (required)
  [searchable]="true"                // Show search box
  [paginated]="true"                 // Enable pagination
  [pageSize]="10"                    // Rows per page
  [showColumnVisibility]="true"      // Column toggle
  [rowClickable]="true"              // Make rows clickable
  (rowClicked)="handleClick($event)" // Row click handler
  (sortingChanged)="onSort($event)"  // Sort change handler
/>
```

## 💡 Common Use Cases

### 1. Basic Table
```typescript
<ds-data-table [data]="users" [columns]="userColumns" />
```

### 2. With Custom Cell
```typescript
columns = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      return `<span style="color: green">${status}</span>`;
    }
  }
];
```

### 3. With Actions
```typescript
columns = [
  // ... other columns
  {
    id: 'actions',
    header: 'Actions',
    cell: (info) => `
      <button onclick="edit(${info.row.original.id})">Edit</button>
    `
  }
];
```

### 4. Clickable Rows
```typescript
<ds-data-table
  [data]="products"
  [columns]="columns"
  [rowClickable]="true"
  (rowClicked)="viewProduct($event)"
/>
```

## 📏 Column Sizing

Control column widths with the `meta.sizing` configuration:

### Size Variants
```typescript
columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      sizing: {
        maxWidth: 'xs'  // 96px max width
      }
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      sizing: {
        minWidth: 'sm',   // 128px minimum
        maxWidth: 'xl',   // 320px maximum
        truncate: true    // Show ellipsis for overflow
      }
    }
  }
];
```

### Available Variants
- **`none`** (auto): Column width determined by content, no constraints
- **`xs`**: 96px
- **`sm`**: 128px
- **`md`**: 192px
- **`lg`**: 256px
- **`xl`**: 320px
- **`2xl`**: 384px
- **Custom**: Any CSS value (e.g., `'250px'`, `'50%'`)

### Key Behaviors
- **`none`** - Column hugs content and expands as needed
- **Sized variants** - Applied as constraints, content respects boundaries
- **`truncate`** - Defaults to `true` when `maxWidth` is set (shows ellipsis)
- **`minWidth`** - Ensures column doesn't shrink below specified size
- **`maxWidth`** - Prevents column from growing beyond specified size

### Examples

**Fixed Width Column:**
```typescript
{ 
  accessorKey: 'status',
  header: 'Status',
  meta: { sizing: { minWidth: 'sm', maxWidth: 'sm' } }
}
```

**Flexible Column with Constraints:**
```typescript
{ 
  accessorKey: 'description',
  header: 'Description',
  meta: { sizing: { minWidth: 'md', maxWidth: '2xl', truncate: true } }
}
```

**No Truncation:**
```typescript
{ 
  accessorKey: 'notes',
  header: 'Notes',
  meta: { sizing: { maxWidth: 'lg', truncate: false } }
}
```

## 🔧 Customization

### No Search or Pagination
```typescript
<ds-data-table
  [data]="items"
  [columns]="columns"
  [searchable]="false"
  [paginated]="false"
/>
```

### Different Page Sizes
```typescript
<ds-data-table
  [data]="products"
  [columns]="columns"
  [pageSize]="25"
  [pageSizeOptions]="[10, 25, 50, 100]"
/>
```

### Custom Empty Message
```typescript
<ds-data-table
  [data]="[]"
  [columns]="columns"
  emptyMessage="No results found"
/>
```

## 📚 Full Documentation

- **README.md** - Complete API reference
- **USAGE_EXAMPLES.md** - Real-world examples
- **COMPONENT_SUMMARY.md** - Implementation details
- **Storybook** - Interactive demos

## 🆘 Need Help?

1. Check **USAGE_EXAMPLES.md** for practical code
2. Run **Storybook** for interactive demos
3. See **README.md** for full API docs
4. Visit [TanStack Table Docs](https://tanstack.com/table/v8) for advanced features

## ✨ Next Steps

1. Try the basic example above
2. View Storybook demos
3. Customize for your needs
4. Add action columns
5. Implement inline editing
6. Connect to your API

## 🎉 You're Ready!

The component is fully functional and production-ready. Start building amazing tables!

---

**Pro Tip**: Keep your column definitions outside the component to avoid recreation on every render:

```typescript
// ✅ Good - defined once
const USER_COLUMNS: ColumnDef<User>[] = [...];

@Component({...})
class MyComponent {
  columns = USER_COLUMNS;
}

// ❌ Bad - recreated every time
@Component({...})
class MyComponent {
  get columns() {
    return [{ ... }];
  }
}
```

