import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { DsDataTableComponent, type DsDataTableColumnMeta } from './ds-data-table';
import { DsBadgeComponent } from '../badge/ds-badge';
import { provideIcons } from '@ng-icons/core';
import { 
  remixSearchLine,
  remixLayoutColumnLine,
  remixCloseLine,
  remixArrowUpLine,
  remixArrowDownLine,
  remixArrowUpDownLine,
  remixInboxLine,
  remixArrowLeftSLine,
  remixArrowRightSLine,
  remixEyeLine,
  remixEditLine,
  remixDeleteBinLine,
  remixLoader4Line,
  remixSettings3Line,
} from '@ng-icons/remixicon';
import type { ColumnDef } from '@tanstack/angular-table';
import { signal } from '@angular/core';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Viewer', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Williams', email: 'alice.w@example.com', role: 'Admin', status: 'active', joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Editor', status: 'pending', joinDate: '2023-05-12' },
  { id: 6, name: 'Diana Prince', email: 'diana.p@example.com', role: 'Viewer', status: 'active', joinDate: '2023-06-18' },
  { id: 7, name: 'Ethan Hunt', email: 'ethan.h@example.com', role: 'Editor', status: 'active', joinDate: '2023-07-22' },
  { id: 8, name: 'Fiona Green', email: 'fiona.g@example.com', role: 'Viewer', status: 'inactive', joinDate: '2023-08-30' },
  { id: 9, name: 'George Miller', email: 'george.m@example.com', role: 'Admin', status: 'active', joinDate: '2023-09-14' },
  { id: 10, name: 'Hannah Montana', email: 'hannah.m@example.com', role: 'Editor', status: 'active', joinDate: '2023-10-01' },
];

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45, status: 'in_stock' },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 150, status: 'in_stock' },
  { id: 3, name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 8, status: 'low_stock' },
  { id: 4, name: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 0, status: 'out_of_stock' },
  { id: 5, name: 'Keyboard Mechanical', category: 'Accessories', price: 89.99, stock: 75, status: 'in_stock' },
  { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79.99, stock: 5, status: 'low_stock' },
  { id: 7, name: 'Desk Lamp', category: 'Office', price: 34.99, stock: 120, status: 'in_stock' },
  { id: 8, name: 'Office Chair', category: 'Furniture', price: 249.99, stock: 25, status: 'in_stock' },
];

// Column definitions
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      sizing: {
        maxWidth: 'xs', // 96px
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    meta: {
      sizing: {
        minWidth: 'sm',  // 128px
        maxWidth: 'lg',  // 256px
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      sizing: {
        minWidth: 'md',  // 192px
        maxWidth: 'xl',  // 320px
        truncate: true,
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    meta: {
      sizing: {
        maxWidth: 'sm', // 128px
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      sizing: {
        maxWidth: 'sm', // 128px
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      const status = info.getValue() as string;
      const variantMap: Record<string, string> = {
        active: 'success',
        inactive: 'grey',
        pending: 'warning',
      };
      const variant = variantMap[status] || 'grey';
      return `<ds-badge variant="${variant}">${status.toUpperCase()}</ds-badge>`;
    },
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    meta: {
      sizing: {
        maxWidth: 'sm', // 128px
      }
    } as DsDataTableColumnMeta,
  },
];

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      sizing: {
        maxWidth: 'xs', // 96px
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
    meta: {
      sizing: {
        minWidth: 'md',  // 192px
        maxWidth: 'xl',  // 320px
        truncate: true,
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    meta: {
      sizing: {
        maxWidth: 'md', // 192px
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    meta: {
      sizing: {
        maxWidth: 'sm', // 128px
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      const price = info.getValue() as number;
      return `<span style="font-weight: 600;">$${price.toFixed(2)}</span>`;
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    meta: {
      sizing: {
        maxWidth: 'xs', // 96px
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      const stock = info.getValue() as number;
      const color = stock === 0 ? '#ef4444' : stock < 10 ? '#f59e0b' : '#10b981';
      return `<span style="color: ${color}; font-weight: 600;">${stock}</span>`;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      sizing: {
        maxWidth: 'md', // 192px
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      const status = info.getValue() as string;
      const variantMap: Record<string, string> = {
        in_stock: 'success',
        low_stock: 'warning',
        out_of_stock: 'destructive',
      };
      const variant = variantMap[status] || 'grey';
      const label = status.replace('_', ' ').toUpperCase();
      return `<ds-badge variant="${variant}">${label}</ds-badge>`;
    },
  },
];

// Columns with actions
const userColumnsWithActions: ColumnDef<User>[] = [
  ...userColumns,
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    meta: {
      sizing: {
        maxWidth: 'sm', // 128px
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      return `
        <div style="display: flex; gap: 8px; align-items: center;">
          <button 
            class="action-btn"
            style="padding: 4px 8px; border: none; background: transparent; cursor: pointer; border-radius: 4px; color: var(--text-color-default-secondary); transition: all 0.2s;"
            onmouseover="this.style.background='var(--color-background-neutral-secondary-hover)'; this.style.color='var(--text-color-default-primary)';"
            onmouseout="this.style.background='transparent'; this.style.color='var(--text-color-default-secondary)';"
            onclick="alert('Edit user: ${info.row.original.name}')"
            title="Edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button 
            class="action-btn"
            style="padding: 4px 8px; border: none; background: transparent; cursor: pointer; border-radius: 4px; color: var(--text-color-default-secondary); transition: all 0.2s;"
            onmouseover="this.style.background='#fee2e2'; this.style.color='#ef4444';"
            onmouseout="this.style.background='transparent'; this.style.color='var(--text-color-default-secondary)';"
            onclick="alert('Delete user: ${info.row.original.name}')"
            title="Delete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;
    },
  },
];

const meta: Meta<DsDataTableComponent> = {
  title: 'Primitives/Data Table',
  component: DsDataTableComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideIcons({
          remixSearchLine,
          remixLayoutColumnLine,
          remixCloseLine,
          remixArrowUpLine,
          remixArrowDownLine,
          remixArrowUpDownLine,
          remixInboxLine,
          remixArrowLeftSLine,
          remixArrowRightSLine,
          remixEyeLine,
          remixEditLine,
          remixDeleteBinLine,
          remixLoader4Line,
          remixSettings3Line,
        }),
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A powerful data table component with sorting, filtering, searching, pagination, and column sizing. Use the `meta.sizing` property on columns to control min-width, max-width, and text truncation.',
      },
    },
  },
  argTypes: {
    data: {
      control: false,
      description: 'Array of data to display in the table',
    },
    columns: {
      control: false,
      description: 'Column definitions for the table',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable global search functionality',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
    paginated: {
      control: 'boolean',
      description: 'Enable pagination',
    },
    pageSize: {
      control: 'number',
      description: 'Number of rows per page',
    },
    showColumnVisibility: {
      control: 'boolean',
      description: 'Show column visibility toggle',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when table is empty',
    },
    rowClickable: {
      control: 'boolean',
      description: 'Make rows clickable',
    },
  },
};

export default meta;
type Story = StoryObj<DsDataTableComponent>;

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    searchable: true,
    paginated: true,
    pageSize: 5,
    showColumnVisibility: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic data table with column sizing, sorting, search, pagination, and column visibility management. Click the column icon button to show/hide columns dynamically. Columns use size variants (xs, sm, md, lg, xl) for consistent width constraints.',
      },
    },
  },
};

export const Products: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    searchable: true,
    searchPlaceholder: 'Search products...',
    paginated: true,
    pageSize: 5,
    showColumnVisibility: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Product catalog table demonstrating different column widths for different data types (narrow ID, wide product names, compact prices).',
      },
    },
  },
};

export const WithActions: Story = {
  args: {
    data: sampleUsers,
    columns: userColumnsWithActions,
    searchable: true,
    paginated: true,
    pageSize: 5,
    showColumnVisibility: true,
    rowClickable: false,
  },
};

export const WithoutSearch: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    searchable: false,
    paginated: true,
    pageSize: 5,
    showColumnVisibility: true,
  },
};

export const WithoutPagination: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: userColumns,
    searchable: true,
    paginated: false,
    showColumnVisibility: true,
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      joinDate: new Date(2023, i % 12, (i % 28) + 1).toISOString().split('T')[0],
    })),
    columns: userColumns,
    searchable: true,
    paginated: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    showColumnVisibility: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: userColumns,
    searchable: true,
    paginated: true,
    pageSize: 10,
    emptyMessage: 'No users found',
  },
};

export const ClickableRows: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    searchable: true,
    paginated: true,
    pageSize: 5,
    rowClickable: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onRowClicked: (row: User) => {
        alert(`Clicked on: ${row.name}`);
      },
    },
    template: `
      <ds-data-table
        [data]="data"
        [columns]="columns"
        [searchable]="searchable"
        [paginated]="paginated"
        [pageSize]="pageSize"
        [rowClickable]="rowClickable"
        (rowClicked)="onRowClicked($event)"
      />
    `,
  }),
};

export const CompactView: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    searchable: true,
    paginated: true,
    pageSize: 10,
    showColumnVisibility: false,
  },
};

// Column sizing example
const userColumnsWithSizing: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      sizing: {
        maxWidth: 'xs', // 96px - narrow fixed width
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    meta: {
      sizing: {
        minWidth: 'sm',  // 128px minimum
        maxWidth: 'lg',  // 256px maximum
        truncate: true,  // Show ellipsis
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'email',
    header: 'Email Address (Very Long Header Name)',
    meta: {
      sizing: {
        maxWidth: '300px', // Custom pixel value
        truncate: true,
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    meta: {
      sizing: {
        minWidth: 'xs',
        maxWidth: 'sm',
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      sizing: {
        minWidth: 'sm',
        maxWidth: 'md',
        truncate: false, // Allow wrapping instead of truncating
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      const status = info.getValue() as string;
      const statusColors: Record<string, string> = {
        active: 'color: #10b981; background: #d1fae5; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;',
        inactive: 'color: #6b7280; background: #f3f4f6; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;',
        pending: 'color: #f59e0b; background: #fef3c7; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;',
      };
      return `<span style="${statusColors[status] || statusColors['inactive']}">${status.toUpperCase()}</span>`;
    },
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    meta: {
      sizing: {
        maxWidth: 'md', // 192px
      }
    } as DsDataTableColumnMeta,
  },
];

export const WithColumnSizing: Story = {
  args: {
    data: [
      ...sampleUsers.slice(0, 3),
      // Add some users with very long content to demonstrate truncation
      {
        id: 11,
        name: 'Alexandra Maximillian Constantine',
        email: 'alexandra.maximillian.constantine@verylongdomainexample.com',
        role: 'SuperAdmin',
        status: 'active' as const,
        joinDate: '2023-11-01',
      },
      {
        id: 12,
        name: 'Benjamin Christopher Wellington',
        email: 'benjamin.c.wellington@anotherlongdomainname.org',
        role: 'Editor',
        status: 'pending' as const,
        joinDate: '2023-12-15',
      },
    ],
    columns: userColumnsWithSizing,
    searchable: true,
    paginated: false,
    showColumnVisibility: true,
  },
  parameters: {
    docs: {
      description: {
        story: `Advanced column sizing demonstration showing:
- **Narrow columns** with \`maxWidth: 'xs'\` (96px) for ID
- **Min/max constraints** with \`minWidth: 'sm'\` and \`maxWidth: 'lg'\` for Name
- **Custom pixel values** like \`maxWidth: '300px'\` for Email
- **Text truncation** with ellipsis (default when maxWidth is set)
- **No truncation** with \`truncate: false\` to allow text wrapping

Try resizing the browser to see how columns behave with long content.`,
      },
    },
  },
};

export const WithColumnManagement: Story = {
  args: {
    data: sampleUsers,
    columns: userColumnsWithActions,
    searchable: true,
    paginated: true,
    pageSize: 8,
    showColumnVisibility: true,
  },
  parameters: {
    docs: {
      description: {
        story: `Demonstrates column visibility management using the refactored ds-listbox component:
- **Content Projection**: The column icon button trigger uses content projection for flexibility
- **Portal Dropdown**: Column selector appears as an overlay dropdown using CDK Portal
- **Multi-Select**: Toggle multiple columns on/off simultaneously
- **Persistent State**: Selected columns are reflected with checkmarks
- **Auto-Close**: Single selection closes the dropdown, multi-selection keeps it open

Click the column icon button in the toolbar to manage which columns are visible. The dropdown uses the same portal and trigger pattern as ds-menu for consistency.`,
      },
    },
  },
};

// Materials data type for multi-action example
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
  { id: '003', name: 'Broker correspondence', costPrice: 50, salesPrice: 100, lastUpdated: 'Aug 24, 25' },
  { id: '004', name: 'Miscellaneous', costPrice: 50, salesPrice: 100, lastUpdated: 'Jul 15, 25' },
  { id: '005', name: 'Copying', costPrice: 50, salesPrice: 100, lastUpdated: 'Jun 10, 25' },
];

// Columns with multiple actions (Manage + Delete)
const materialsColumnsWithActions: ColumnDef<Material>[] = [
  {
    accessorKey: 'id',
    header: 'ID +',
    meta: {
      sizing: {
        maxWidth: 'xs',
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    meta: {
      sizing: {
        minWidth: 'md',
      }
    } as DsDataTableColumnMeta,
  },
  {
    accessorKey: 'costPrice',
    header: 'Cost price',
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      const price = info.getValue() as number;
      return `<span style="font-weight: 500;">${price.toFixed(2)} DKK</span>`;
    },
  },
  {
    accessorKey: 'salesPrice',
    header: 'Sales price',
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      const price = info.getValue() as number;
      return `<span style="font-weight: 600; color: var(--text-color-default-primary);">${price.toFixed(2)} DKK</span>`;
    },
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last updated',
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsDataTableColumnMeta,
  },
  {
    id: 'actions',
    header: '',
    enableSorting: false,
    enableHiding: false,
    meta: {
      sizing: {
        width: '100px',
      }
    } as DsDataTableColumnMeta,
    cell: (info) => {
      const row = info.row.original;
      return `
        <div style="display: flex; gap: 4px; align-items: center; justify-content: flex-end;">
          <button 
            class="action-btn manage-btn"
            data-action="manage"
            data-row-id="${row.id}"
            style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 8px; border: none; background: transparent; cursor: pointer; border-radius: 4px; color: var(--text-color-default-secondary); transition: all 0.2s;"
            onmouseover="this.style.background='var(--color-background-neutral-secondary-hover)'; this.style.color='var(--text-color-default-primary)';"
            onmouseout="this.style.background='transparent'; this.style.color='var(--text-color-default-secondary)';"
            onclick="alert('Managing material: ${row.name}\\n\\nThis would open a dialog with property-specific pricing.')"
            title="Manage">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m-9-9h6m6 0h6"></path>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"></path>
            </svg>
          </button>
          <button 
            class="action-btn delete-btn"
            data-action="delete"
            data-row-id="${row.id}"
            style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 8px; border: none; background: transparent; cursor: pointer; border-radius: 4px; color: var(--text-color-default-secondary); transition: all 0.2s;"
            onmouseover="this.style.background='#fee2e2'; this.style.color='#ef4444';"
            onmouseout="this.style.background='transparent'; this.style.color='var(--text-color-default-secondary)';"
            onclick="alert('Delete material: ${row.name}')"
            title="Delete">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;
    },
  },
];

export const MultipleActions: Story = {
  args: {
    data: sampleMaterials,
    columns: materialsColumnsWithActions,
    searchable: true,
    searchPlaceholder: 'Search materials...',
    paginated: true,
    pageSize: 10,
    showColumnVisibility: true,
  },
  parameters: {
    docs: {
      description: {
        story: `Materials table with multiple action buttons (Manage + Delete) in the data table. 
        
**Key Features:**
- **4px gap** between action buttons for proper spacing
- **Manage button** opens property-specific pricing dialogs
- **Delete button** removes the material
- **Icon-only buttons** with hover states for clean UI
- **Inline HTML approach** for non-editable tables

This example shows how to add multiple actions to a read-only data table using inline HTML. For editable tables with component-based cells, use the \`actionsCell()\` helper from the editable table component.`,
      },
    },
  },
};

