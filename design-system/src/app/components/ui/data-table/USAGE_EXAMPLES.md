# Data Table Usage Examples

## Table of Contents
- [Quick Start](#quick-start)
- [Server-Side Pagination](#server-side-pagination)
- [Custom Cell Formatting](#with-custom-cell-formatting)

## Quick Start

```typescript
import { Component } from '@angular/core';
import { DsDataTableComponent, type DataTableColumn } from './components/ui';
import type { ColumnDef } from '@tanstack/angular-table';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-user-list',
  imports: [DsDataTableComponent],
  template: `
    <ds-data-table 
      [data]="users" 
      [columns]="columns"
    />
  `
})
export class UserListComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  ];

  columns: ColumnDef<User>[] = [
    { accessorKey: 'id', header: 'ID', size: 80 },
    { accessorKey: 'name', header: 'Name', size: 200 },
    { accessorKey: 'email', header: 'Email', size: 250 },
    { accessorKey: 'status', header: 'Status', size: 120 },
  ];
}
```

## Server-Side Pagination

For large datasets (1000+ rows), use server-side pagination where the parent component handles data fetching.

### Basic Server-Side Example

```typescript
import { Component, signal } from '@angular/core';
import { DsDataTableComponent, type DataTableColumn } from './components/ui';
import type { ColumnDef, SortingState } from '@tanstack/angular-table';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface ApiResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-user-list',
  imports: [DsDataTableComponent],
  template: `
    <ds-data-table 
      [data]="users()" 
      [columns]="columns"
      [serverSide]="true"
      [totalItems]="totalItems()"
      [currentPage]="currentPage()"
      [pageSize]="pageSize()"
      (pageChanged)="onPageChange($event)"
      (searchChanged)="onSearch($event)"
      (sortingChanged)="onSort($event)"
    />
  `
})
export class UserListComponent {
  // Signals for reactive state
  users = signal<User[]>([]);
  totalItems = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = signal<number>(10);
  searchQuery = signal<string>('');
  sorting = signal<SortingState>([]);

  columns: ColumnDef<User>[] = [
    { accessorKey: 'id', header: 'ID', size: 80 },
    { accessorKey: 'name', header: 'Name', size: 200 },
    { accessorKey: 'email', header: 'Email', size: 250 },
    { accessorKey: 'role', header: 'Role', size: 120 },
  ];

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.fetchData();
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(0); // Reset to first page
    this.fetchData();
  }

  onSort(sorting: SortingState) {
    this.sorting.set(sorting);
    this.currentPage.set(0); // Reset to first page
    this.fetchData();
  }

  fetchData() {
    const params = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      search: this.searchQuery(),
      sortBy: this.sorting()[0]?.id || '',
      sortOrder: this.sorting()[0]?.desc ? 'desc' : 'asc'
    };

    this.http.get<ApiResponse>('/api/users', { params })
      .subscribe(response => {
        this.users.set(response.data);
        this.totalItems.set(response.total);
      });
  }
}
```

### Server-Side with Loading State

```typescript
@Component({
  selector: 'app-user-list',
  imports: [DsDataTableComponent],
  template: `
    @if (loading()) {
      <div class="loading-spinner">Loading...</div>
    }
    
    <ds-data-table 
      [data]="users()" 
      [columns]="columns"
      [serverSide]="true"
      [totalItems]="totalItems()"
      [currentPage]="currentPage()"
      (pageChanged)="onPageChange($event)"
      (searchChanged)="onSearch($event)"
    />
  `
})
export class UserListComponent {
  users = signal<User[]>([]);
  totalItems = signal<number>(0);
  currentPage = signal<number>(0);
  loading = signal<boolean>(false);

  // ... columns definition ...

  async fetchData() {
    this.loading.set(true);
    
    try {
      const response = await fetch(`/api/users?page=${this.currentPage()}`);
      const data = await response.json();
      
      this.users.set(data.users);
      this.totalItems.set(data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
```

### Server-Side with Debounced Search

```typescript
import { Component, signal, effect } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  template: `
    <ds-data-table 
      [data]="users()" 
      [columns]="columns"
      [serverSide]="true"
      [totalItems]="totalItems()"
      [currentPage]="currentPage()"
      (pageChanged)="onPageChange($event)"
      (searchChanged)="onSearch($event)"
    />
  `
})
export class UserListComponent {
  users = signal<User[]>([]);
  totalItems = signal<number>(0);
  currentPage = signal<number>(0);
  
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    // Debounce search to avoid excessive API calls
    this.searchSubject
      .pipe(debounceTime(300))
      .subscribe(query => {
        this.searchQuery = query;
        this.currentPage.set(0);
        this.fetchData();
      });

    this.fetchData();
  }

  onSearch(query: string) {
    this.searchSubject.next(query);
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.currentPage.set(event.pageIndex);
    this.fetchData();
  }

  // ... fetchData implementation ...
}
```

### Comparison: Client-Side vs Server-Side

| Feature | Client-Side | Server-Side |
|---------|------------|-------------|
| **Best for** | < 1,000 rows | 1,000+ rows |
| **Initial load** | Load all data once | Load only current page |
| **Search/Filter** | Instant (in-browser) | Requires API call |
| **Sorting** | Instant (in-browser) | Requires API call |
| **Pagination** | Instant (in-browser) | Requires API call |
| **Memory usage** | Higher | Lower |
| **Backend load** | One request | Multiple requests |
| **Setup** | Simple (default) | More complex |

### When to Use Server-Side

Use server-side pagination when:
- ✅ Dataset has 1,000+ rows
- ✅ Data changes frequently on the server
- ✅ You need to reduce initial load time
- ✅ You want to minimize memory usage
- ✅ Backend already supports pagination

Use client-side pagination when:
- ✅ Dataset is small (< 1,000 rows)
- ✅ Data is relatively static
- ✅ You want instant search/filter/sort
- ✅ You want simpler implementation

## With Custom Cell Formatting

```typescript
columns: ColumnDef<User>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as string;
      const styles = status === 'active' 
        ? 'color: #10b981; background: #d1fae5; padding: 4px 12px; border-radius: 12px;'
        : 'color: #6b7280; background: #f3f4f6; padding: 4px 12px; border-radius: 12px;';
      return `<span style="${styles}">${status.toUpperCase()}</span>`;
    },
  }
];
```

## With Column Sizing

Control column widths with min-width, max-width, and truncation:

```typescript
import { DsDataTableColumnMeta } from './components/ui';

columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      sizing: {
        maxWidth: 'xs'  // Fixed narrow column (96px)
      }
    } as DsDataTableColumnMeta
  },
  {
    accessorKey: 'name',
    header: 'Name',
    meta: {
      sizing: {
        minWidth: 'sm',    // Min 128px
        maxWidth: 'lg',    // Max 256px
        truncate: true     // Show ellipsis
      }
    } as DsDataTableColumnMeta
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      sizing: {
        maxWidth: '300px', // Custom pixel value
        truncate: true
      }
    } as DsDataTableColumnMeta
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      sizing: {
        minWidth: 'xs',
        maxWidth: 'sm',
        truncate: false    // Allow wrapping
      }
    } as DsDataTableColumnMeta
  }
];
```

**Size Variants:**
- `none` (auto) - Hugs content, no constraints
- `xs` - 96px
- `sm` - 128px  
- `md` - 192px
- `lg` - 256px
- `xl` - 320px
- `2xl` - 384px
- Custom - Any CSS value (e.g., `'250px'`, `'50%'`)

**Behavior:**
- `maxWidth` automatically enables `truncate: true` (ellipsis overflow)
- `truncate: false` allows text to wrap instead of truncating
- `none` variant means column width is determined entirely by content

## With Inline Editing

```typescript
@Component({
  template: `
    <ds-data-table 
      [data]="users" 
      [columns]="editableColumns"
      (dataUpdated)="handleDataUpdate($event)"
    />
  `
})
export class EditableUserListComponent {
  editableColumns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => {
        const value = info.getValue() as string;
        const rowId = info.row.id;
        return `
          <span 
            contenteditable="true"
            data-field="name"
            data-row-id="${rowId}"
            onblur="window.handleCellUpdate(this, '${rowId}', 'name')"
            style="cursor: text; padding: 4px; border-radius: 4px; display: inline-block;"
          >
            ${value}
          </span>
        `;
      },
    }
  ];

  handleDataUpdate(updatedData: User[]) {
    console.log('Data updated:', updatedData);
    // Save to backend
  }
}
```

## With Action Buttons

```typescript
columns: ColumnDef<User>[] = [
  // ... other columns
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    size: 120,
    cell: (info) => {
      const user = info.row.original;
      return `
        <div style="display: flex; gap: 8px;">
          <button 
            onclick="handleEdit('${user.id}')"
            style="padding: 4px 8px; border: none; background: transparent; cursor: pointer; border-radius: 4px;"
            title="Edit">
            Edit
          </button>
          <button 
            onclick="handleDelete('${user.id}')"
            style="padding: 4px 8px; border: none; background: transparent; cursor: pointer; border-radius: 4px; color: #ef4444;"
            title="Delete">
            Delete
          </button>
        </div>
      `;
    },
  }
];
```

## With Row Click Handler

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
export class ClickableUserListComponent {
  onRowClick(user: User) {
    this.router.navigate(['/users', user.id]);
  }
}
```

## With Server-Side Filtering

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
export class ServerSideUserListComponent {
  users: User[] = [];
  
  onSortChange(sorting: SortingState) {
    // Fetch from backend with sorting
    this.loadUsers({ sort: sorting });
  }
  
  onFilterChange(filters: ColumnFiltersState) {
    // Fetch from backend with filters
    this.loadUsers({ filters });
  }
  
  loadUsers(params: any) {
    this.api.getUsers(params).subscribe(users => {
      this.users = users;
    });
  }
}
```

## Compact View (No Search, No Pagination)

```typescript
<ds-data-table 
  [data]="users" 
  [columns]="columns"
  [searchable]="false"
  [paginated]="false"
  [showColumnVisibility]="false"
/>
```

## Custom Page Sizes

```typescript
<ds-data-table 
  [data]="products" 
  [columns]="columns"
  [pageSize]="25"
  [pageSizeOptions]="[10, 25, 50, 100, 500]"
/>
```

## With Custom Empty State

```typescript
<ds-data-table 
  [data]="[]" 
  [columns]="columns"
  emptyMessage="No users found. Try adjusting your filters."
/>
```

## Complex Example: E-commerce Products

```typescript
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

@Component({
  template: `
    <div class="tw-p-6">
      <h1 class="heading-3xl-bold tw-mb-6">Product Inventory</h1>
      
      <ds-data-table 
        [data]="products" 
        [columns]="productColumns"
        [searchPlaceholder]="'Search products...'"
        [pageSize]="10"
        [rowClickable]="true"
        (rowClicked)="viewProduct($event)"
        (sortingChanged)="onSortChange($event)"
      />
    </div>
  `
})
export class ProductInventoryComponent {
  products: Product[] = [...];

  productColumns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'Product ID',
      size: 100,
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
      size: 250,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      size: 150,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      size: 120,
      cell: (info) => {
        const price = info.getValue() as number;
        return `<span style="font-weight: 600;">$${price.toFixed(2)}</span>`;
      },
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      size: 100,
      cell: (info) => {
        const stock = info.getValue() as number;
        const color = stock === 0 ? '#ef4444' : stock < 10 ? '#f59e0b' : '#10b981';
        return `<span style="color: ${color}; font-weight: 600;">${stock}</span>`;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 140,
      cell: (info) => {
        const status = info.getValue() as string;
        const colors = {
          in_stock: 'color: #10b981; background: #d1fae5;',
          low_stock: 'color: #f59e0b; background: #fef3c7;',
          out_of_stock: 'color: #ef4444; background: #fee2e2;',
        };
        return `<span style="${colors[status as keyof typeof colors]} padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">${status.replace('_', ' ').toUpperCase()}</span>`;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: (info) => {
        const product = info.row.original;
        return `
          <div style="display: flex; gap: 8px;">
            <button 
              onclick="editProduct(${product.id})"
              style="padding: 4px 12px; border: 1px solid var(--border-color-default); background: var(--color-background-neutral-secondary); cursor: pointer; border-radius: 6px; font-size: 14px;"
            >
              Edit
            </button>
            <button 
              onclick="viewDetails(${product.id})"
              style="padding: 4px 12px; border: 1px solid var(--border-color-default); background: var(--color-background-brand); color: white; cursor: pointer; border-radius: 6px; font-size: 14px;"
            >
              Details
            </button>
          </div>
        `;
      },
    },
  ];

  viewProduct(product: Product) {
    console.log('View product:', product);
  }

  onSortChange(sorting: SortingState) {
    console.log('Sorting changed:', sorting);
  }
}
```

## Tips

1. **Performance**: For large datasets (1000+ rows), consider implementing server-side pagination
2. **Sorting**: All columns support sorting by default. Disable with `enableSorting: false`
3. **Column Width**: Use `size` property to set column width in pixels
4. **Custom Rendering**: Use the `cell` function to return custom HTML
5. **Accessibility**: The component includes ARIA labels and keyboard navigation
6. **Responsive**: The table scrolls horizontally on small screens
7. **Memory**: Keep column definitions outside the component to prevent re-creation on re-renders

