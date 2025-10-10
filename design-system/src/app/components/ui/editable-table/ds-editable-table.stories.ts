import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { signal } from '@angular/core';
import { DsEditableTableComponent, type DsEditableTableColumnMeta } from './ds-editable-table';
import { editableTextCell, editableNumberCell, editableSelectCell } from './editable-cell-helpers';
import { provideIcons } from '@ng-icons/core';
import { 
  remixAddLine,
  remixDeleteBinLine,
  remixDraggable,
  remixInboxLine,
  remixArrowUpLine,
  remixArrowDownLine,
} from '@ng-icons/remixicon';
import type { ColumnDef } from '@tanstack/angular-table';

// Sample data types
interface InvoiceLine {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: string;
  status: string;
  dueDate: string;
}

// Sample data
const sampleInvoiceLines: InvoiceLine[] = [
  { 
    id: '1', 
    name: 'Administration fee', 
    description: 'Covers handling and coordination', 
    quantity: 1, 
    unitPrice: 500, 
    discount: 0, 
    total: 500 
  },
  { 
    id: '2', 
    name: 'Miscellaneous', 
    description: 'Various small items', 
    quantity: 2, 
    unitPrice: 400, 
    discount: 0, 
    total: 800 
  },
  { 
    id: '3', 
    name: 'Technical Manager', 
    description: 'Consulting services', 
    quantity: 6.5, 
    unitPrice: 800, 
    discount: 0, 
    total: 5200 
  },
];

const sampleProducts: Product[] = [
  { id: '1', name: 'Laptop Pro', sku: 'LT-001', category: 'Electronics', price: 1299.99, stock: 45 },
  { id: '2', name: 'Wireless Mouse', sku: 'MS-102', category: 'Accessories', price: 29.99, stock: 150 },
  { id: '3', name: 'USB-C Cable', sku: 'CB-203', category: 'Accessories', price: 12.99, stock: 8 },
];

const sampleTasks: Task[] = [
  { id: '1', title: 'Fix ventilation system', assignee: 'John Doe', priority: 'High', status: 'In Progress', dueDate: '2024-01-15' },
  { id: '2', title: 'Repaint hallway', assignee: 'Jane Smith', priority: 'Medium', status: 'To Do', dueDate: '2024-01-20' },
  { id: '3', title: 'Replace light fixtures', assignee: 'Bob Johnson', priority: 'Low', status: 'Done', dueDate: '2024-01-10' },
];

// Priority options for select
const priorityOptions = [
  { id: 'low', label: 'Low', value: 'Low' },
  { id: 'medium', label: 'Medium', value: 'Medium' },
  { id: 'high', label: 'High', value: 'High' },
];

// Status options for select
const statusOptions = [
  { id: 'todo', label: 'To Do', value: 'To Do' },
  { id: 'inprogress', label: 'In Progress', value: 'In Progress' },
  { id: 'done', label: 'Done', value: 'Done' },
];

// Category options for select
const categoryOptions = [
  { id: 'electronics', label: 'Electronics', value: 'Electronics' },
  { id: 'accessories', label: 'Accessories', value: 'Accessories' },
  { id: 'furniture', label: 'Furniture', value: 'Furniture' },
  { id: 'office', label: 'Office', value: 'Office' },
];

// Column definitions
const invoiceColumns: ColumnDef<InvoiceLine>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => editableTextCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      placeholder: 'Enter name...'
    }),
    meta: {
      sizing: {
        minWidth: 'md',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info) => editableTextCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      placeholder: 'Add description...'
    }),
    meta: {
      sizing: {
        minWidth: 'lg',
        maxWidth: 'xl',
        truncate: true,
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: (info) => editableNumberCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      min: 0,
      step: 0.5,
    }),
    meta: {
      sizing: {
        maxWidth: 'xs',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: (info) => editableNumberCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      min: 0,
      step: 0.01,
    }),
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: (info) => editableNumberCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      min: 0,
    }),
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsEditableTableColumnMeta,
  },
];

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
    cell: (info) => editableTextCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      placeholder: 'Enter product name...'
    }),
    meta: {
      sizing: {
        minWidth: 'md',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: (info) => editableTextCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      placeholder: 'SKU-000'
    }),
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: (info) => editableSelectCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      options: categoryOptions,
    }),
    meta: {
      sizing: {
        maxWidth: 'md',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (info) => editableNumberCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      min: 0,
      step: 0.01,
    }),
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (info) => editableNumberCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      min: 0,
      step: 1,
    }),
    meta: {
      sizing: {
        maxWidth: 'xs',
      }
    } as DsEditableTableColumnMeta,
  },
];

const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Task',
    cell: (info) => editableTextCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      placeholder: 'Enter task title...'
    }),
    meta: {
      sizing: {
        minWidth: 'lg',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee',
    cell: (info) => editableTextCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      placeholder: 'Assign to...'
    }),
    meta: {
      sizing: {
        minWidth: 'md',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: (info) => editableSelectCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      options: priorityOptions,
    }),
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => editableSelectCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      options: statusOptions,
    }),
    meta: {
      sizing: {
        maxWidth: 'md',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: (info) => editableTextCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
    }),
    meta: {
      sizing: {
        maxWidth: 'md',
      }
    } as DsEditableTableColumnMeta,
  },
];

const meta: Meta<DsEditableTableComponent> = {
  title: 'Components/Editable Table',
  component: DsEditableTableComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideIcons({
          remixAddLine,
          remixDeleteBinLine,
          remixDraggable,
          remixInboxLine,
          remixArrowUpLine,
          remixArrowDownLine,
        }),
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An editable data table component with inline editing, drag-and-drop row reordering, and row management. When `reorderable` is true, sorting is disabled. When false, column sorting is enabled.',
      },
    },
  },
  argTypes: {
    data: {
      control: false,
      description: 'Array of data to display and edit (two-way binding)',
    },
    columns: {
      control: false,
      description: 'Column definitions for the table',
    },
    reorderable: {
      control: 'boolean',
      description: 'Enable drag-and-drop row reordering (disables sorting when true)',
    },
    allowAddRow: {
      control: 'boolean',
      description: 'Allow adding new rows',
    },
    allowDeleteRow: {
      control: 'boolean',
      description: 'Allow deleting rows',
    },
    showDragHandle: {
      control: 'boolean',
      description: 'Show drag handle column (only when reorderable is true)',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when table is empty',
    },
    addRowButtonText: {
      control: 'text',
      description: 'Text for add row button',
    },
  },
};

export default meta;
type Story = StoryObj<DsEditableTableComponent>;

export const InvoiceLinesReorderable: Story = {
  render: (args) => ({
    props: {
      ...args,
      invoiceData: signal([...sampleInvoiceLines]),
      newRowTemplate: {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        description: 'Add description',
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        total: 0
      },
      onCellEdited: (event: any) => {
        console.log('Cell edited:', event);
      },
      onRowAdded: (row: any) => {
        console.log('Row added:', row);
      },
      onRowDeleted: (event: any) => {
        console.log('Row deleted:', event);
      },
      onRowReordered: (event: any) => {
        console.log('Row reordered:', event);
      },
    },
    template: `
      <ds-editable-table
        [(data)]="invoiceData"
        [columns]="columns"
        [reorderable]="true"
        [allowAddRow]="true"
        [allowDeleteRow]="true"
        [showDragHandle]="true"
        [addRowButtonText]="'Add invoice line'"
        [newRowTemplate]="newRowTemplate"
        (cellEdited)="onCellEdited($event)"
        (rowAdded)="onRowAdded($event)"
        (rowDeleted)="onRowDeleted($event)"
        (rowReordered)="onRowReordered($event)"
      />
    `,
  }),
  args: {
    columns: invoiceColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Invoice lines table with drag-and-drop reordering enabled. Sorting is disabled to allow manual ordering. Drag the handle icon to reorder rows.',
      },
    },
  },
};

export const ProductsSortable: Story = {
  render: (args) => ({
    props: {
      ...args,
      productData: signal([...sampleProducts]),
      newRowTemplate: {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        sku: '',
        category: 'Electronics',
        price: 0,
        stock: 0
      },
      onCellEdited: (event: any) => {
        console.log('Cell edited:', event);
      },
      onRowAdded: (row: any) => {
        console.log('Row added:', row);
      },
      onRowDeleted: (event: any) => {
        console.log('Row deleted:', event);
      },
      onSortingChanged: (sorting: any) => {
        console.log('Sorting changed:', sorting);
      },
    },
    template: `
      <ds-editable-table
        [(data)]="productData"
        [columns]="columns"
        [reorderable]="false"
        [allowAddRow]="true"
        [allowDeleteRow]="true"
        [addRowButtonText]="'Add product'"
        [newRowTemplate]="newRowTemplate"
        (cellEdited)="onCellEdited($event)"
        (rowAdded)="onRowAdded($event)"
        (rowDeleted)="onRowDeleted($event)"
        (sortingChanged)="onSortingChanged($event)"
      />
    `,
  }),
  args: {
    columns: productColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Products table with column sorting enabled. Row reordering is disabled. Click column headers to sort.',
      },
    },
  },
};

export const TasksWithSelects: Story = {
  render: (args) => ({
    props: {
      ...args,
      taskData: signal([...sampleTasks]),
      newRowTemplate: {
        id: Math.random().toString(36).substr(2, 9),
        title: '',
        assignee: '',
        priority: 'Medium',
        status: 'To Do',
        dueDate: ''
      },
      onCellEdited: (event: any) => {
        console.log('Cell edited:', event);
      },
      onRowAdded: (row: any) => {
        console.log('Row added:', row);
      },
      onRowDeleted: (event: any) => {
        console.log('Row deleted:', event);
      },
      onRowReordered: (event: any) => {
        console.log('Row reordered:', event);
      },
    },
    template: `
      <ds-editable-table
        [(data)]="taskData"
        [columns]="columns"
        [reorderable]="true"
        [allowAddRow]="true"
        [allowDeleteRow]="true"
        [addRowButtonText]="'Add task'"
        [newRowTemplate]="newRowTemplate"
        (cellEdited)="onCellEdited($event)"
        (rowAdded)="onRowAdded($event)"
        (rowDeleted)="onRowDeleted($event)"
        (rowReordered)="onRowReordered($event)"
      />
    `,
  }),
  args: {
    columns: taskColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Task list with select dropdowns for priority and status. Demonstrates using editable select cells with options.',
      },
    },
  },
};

export const EmptyState: Story = {
  render: (args) => ({
    props: {
      ...args,
      emptyData: signal([]),
      newRowTemplate: {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        total: 0
      },
      onRowAdded: (row: any) => {
        console.log('First row added:', row);
      },
    },
    template: `
      <ds-editable-table
        [(data)]="emptyData"
        [columns]="columns"
        [reorderable]="true"
        [allowAddRow]="true"
        [allowDeleteRow]="true"
        [emptyMessage]="'No invoice lines yet'"
        [addRowButtonText]="'Add first line'"
        [newRowTemplate]="newRowTemplate"
        (rowAdded)="onRowAdded($event)"
      />
    `,
  }),
  args: {
    columns: invoiceColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with centered "Add first line" button. Shows empty state message and call-to-action.',
      },
    },
  },
};

export const NoDeleteAllowed: Story = {
  render: (args) => ({
    props: {
      ...args,
      lockedData: signal([...sampleInvoiceLines]),
    },
    template: `
      <ds-editable-table
        [(data)]="lockedData"
        [columns]="columns"
        [reorderable]="true"
        [allowAddRow]="true"
        [allowDeleteRow]="false"
        [addRowButtonText]="'Add line'"
      />
    `,
  }),
  args: {
    columns: invoiceColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Editable table without delete functionality. Actions column is hidden when allowDeleteRow is false.',
      },
    },
  },
};

export const NoDragHandle: Story = {
  render: (args) => ({
    props: {
      ...args,
      noDragData: signal([...sampleProducts]),
    },
    template: `
      <ds-editable-table
        [(data)]="noDragData"
        [columns]="columns"
        [reorderable]="true"
        [showDragHandle]="false"
        [allowAddRow]="true"
        [allowDeleteRow]="true"
      />
    `,
  }),
  args: {
    columns: productColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reorderable table without visible drag handle. Rows can still be dragged, but the drag handle column is hidden.',
      },
    },
  },
};

export const ReadOnlyMode: Story = {
  render: (args) => ({
    props: {
      ...args,
      readOnlyData: signal([...sampleInvoiceLines]),
    },
    template: `
      <ds-editable-table
        [(data)]="readOnlyData"
        [columns]="columns"
        [reorderable]="false"
        [allowAddRow]="false"
        [allowDeleteRow]="false"
      />
    `,
  }),
  args: {
    columns: invoiceColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with all editing features disabled. Cells are still editable (use readonly on cell data to fully disable editing).',
      },
    },
  },
};

