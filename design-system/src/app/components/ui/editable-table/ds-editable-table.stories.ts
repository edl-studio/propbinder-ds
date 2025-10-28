import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { signal } from '@angular/core';
import { DsEditableTableComponent, type DsEditableTableColumnMeta } from './ds-editable-table';
import { editableTextCell, editableNumberCell, editableSelectCell, actionsCell } from './editable-cell-helpers';
import { provideIcons } from '@ng-icons/core';
import { 
  remixAddLine,
  remixDeleteBinLine,
  remixDraggable,
  remixInboxLine,
  remixArrowUpLine,
  remixArrowDownLine,
  remixSettings3Line,
} from '@ng-icons/remixicon';
import type { ColumnDef } from '@tanstack/angular-table';
import { DsConfirmationDialogComponent } from '../dialog/ds-confirmation-dialog';
import { DsDialogComponent } from '../dialog/ds-dialog';
import { DsButtonComponent } from '../button/ds-button';
import { NgpDialogTrigger, NgpDialogOverlay, NgpDialog } from 'ng-primitives/dialog';
import { DsTileComponent } from '../tile/ds-tile';
import { DsTileSectionComponent } from '../tile/ds-tile-section';

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
  title: 'Primitives/Editable Table',
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
          remixSettings3Line,
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

// Sample data for materials
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
];

// Column definitions with multiple actions
const materialsColumnsWithActions: ColumnDef<Material>[] = [
  {
    accessorKey: 'id',
    header: 'ID +',
    cell: (info) => info.getValue(),
    meta: {
      sizing: {
        maxWidth: 'xs',
      }
    } as DsEditableTableColumnMeta,
  },
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
    accessorKey: 'costPrice',
    header: 'Cost price',
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
      },
      align: 'right',
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'salesPrice',
    header: 'Sales price',
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
      },
      align: 'right',
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last updated',
    cell: (info) => info.getValue(),
    meta: {
      sizing: {
        maxWidth: 'sm',
      }
    } as DsEditableTableColumnMeta,
  },
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
    meta: {
      sizing: {
        width: '100px',
      }
    } as DsEditableTableColumnMeta,
  }
];

// Property pricing columns for the manage dialog
const propertyPricingColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'property',
    header: 'Property',
    cell: (info) => info.getValue(),
    meta: {
      sizing: {
        minWidth: 'md',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: (info) => info.getValue(),
    meta: {
      sizing: {
        minWidth: 'sm',
      }
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'costPrice',
    header: 'Cost price',
    cell: (info) => editableNumberCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      min: 0,
      step: 0.01,
      suffix: 'DKK'
    }),
    meta: {
      sizing: {
        maxWidth: 'sm',
      },
      align: 'right',
    } as DsEditableTableColumnMeta,
  },
  {
    accessorKey: 'salesPrice',
    header: 'Sales price',
    cell: (info) => editableNumberCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
      min: 0,
      step: 0.01,
      suffix: 'DKK'
    }),
    meta: {
      sizing: {
        maxWidth: 'sm',
      },
      align: 'right',
    } as DsEditableTableColumnMeta,
  }
];

export const MultipleActions: Story = {
  render: (args) => ({
    props: {
      ...args,
      materialsData: signal([...sampleMaterials]),
      selectedMaterial: signal<Material | null>(null),
      materialToDelete: signal<{ material: Material; index: number } | null>(null),
      propertyPricing: signal([
        { property: 'Fælledgården Hub', customer: 'Fjordlys', costPrice: 800, salesPrice: 1000 },
        { property: 'Holmene Brygge', customer: 'Fjordlys', costPrice: 800, salesPrice: 1000 },
        { property: 'Industrien Hus', customer: 'StandlBolig', costPrice: 800, salesPrice: 1000 },
      ]),
      propertyPricingColumns: propertyPricingColumns,
      newRowTemplate: {
        id: '',
        name: '',
        costPrice: 0,
        salesPrice: 0,
        lastUpdated: new Date().toLocaleDateString()
      },
      onCellEdited: (event: any) => {
        console.log('Cell edited:', event);
      },
      onRowAdded: (row: any) => {
        console.log('Row added:', row);
      },
      onActionClicked: function(event: any) {
        console.log('Action clicked:', event);
        if (event.action === 'manage') {
          this['selectedMaterial'].set(event.row);
          // Open dialog programmatically
          setTimeout(() => {
            const trigger = document.querySelector('[data-manage-trigger]') as HTMLElement;
            if (trigger) trigger.click();
          }, 0);
        } else if (event.action === 'delete') {
          this['materialToDelete'].set({ material: event.row, index: event.rowIndex });
          // Open delete confirmation dialog
          setTimeout(() => {
            const trigger = document.querySelector('[data-delete-trigger]') as HTMLElement;
            if (trigger) trigger.click();
          }, 0);
        }
      },
      handleDelete: function() {
        const toDelete = this['materialToDelete']();
        if (toDelete) {
          this['materialsData'].update((data: any[]) => 
            data.filter((_, idx) => idx !== toDelete.index)
          );
          console.log('Deleted material:', toDelete.material.name);
          this['materialToDelete'].set(null);
        }
      },
    },
    template: `
      <div>
        <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 600;">Materials Settings</h3>
        <p style="margin-bottom: 24px; color: #666;">
          Table with multiple action buttons. Click "Manage" to configure property-specific pricing, or "Delete" to remove a material.
        </p>
        <ds-editable-table
          [(data)]="materialsData"
          [columns]="columns"
          [reorderable]="false"
          [allowAddRow]="true"
          [allowDeleteRow]="false"
          [addRowButtonText]="'Add material'"
          [newRowTemplate]="newRowTemplate"
          (cellEdited)="onCellEdited($event)"
          (rowAdded)="onRowAdded($event)"
          (actionClicked)="onActionClicked($event)"
        />

        <!-- Hidden trigger for manage dialog -->
        <button 
          [ngpDialogTrigger]="manageDialog" 
          data-manage-trigger
          style="display: none;">
        </button>

        <!-- Hidden trigger for delete confirmation -->
        <button 
          [ngpDialogTrigger]="deleteDialog" 
          data-delete-trigger
          style="display: none;">
        </button>

        <!-- Manage Property Pricing Dialog -->
        <ng-template #manageDialog let-close="close">
          <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
            <ds-dialog ngpDialog [size]="'xl'">
              <h2 slot="header" class="heading-xl">
                {{ selectedMaterial()?.name || 'Material' }} - Property-specific pricing
              </h2>
              <div slot="content">
                <ds-tile orientation="vertical">
                  <ds-tile-section [padding]="false">
                    <ds-editable-table
                      [(data)]="propertyPricing"
                      [columns]="propertyPricingColumns"
                      [reorderable]="false"
                      [allowAddRow]="false"
                      [allowDeleteRow]="false"
                    />
                  </ds-tile-section>
                </ds-tile>
              </div>
              <div slot="footer">
                <ds-button variant="ghost" (clicked)="close()">Cancel</ds-button>
                <ds-button variant="primary" (clicked)="close()">Save changes</ds-button>
              </div>
            </ds-dialog>
          </div>
        </ng-template>

        <!-- Delete Confirmation Dialog -->
        <ng-template #deleteDialog let-close="close">
          <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
            <ds-confirmation-dialog
              ngpDialog
              [title]="'Delete ' + (materialToDelete()?.material.name || 'material') + '?'"
              [message]="'This action cannot be undone. Are you sure you want to delete this material?'"
              [confirmLabel]="'Delete'"
              [confirmVariant]="'destructive'"
              [cancelLabel]="'Cancel'"
              (confirm)="handleDelete(); close()"
              (cancel)="close()">
            </ds-confirmation-dialog>
          </div>
        </ng-template>
      </div>
    `,
  }),
  decorators: [
    moduleMetadata({
      imports: [
        DsConfirmationDialogComponent,
        DsDialogComponent,
        DsButtonComponent,
        DsTileComponent,
        DsTileSectionComponent,
        NgpDialogTrigger,
        NgpDialogOverlay,
        NgpDialog,
      ],
    }),
  ],
  args: {
    columns: materialsColumnsWithActions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Materials table with multiple action buttons demonstrating dialogs integration. Click "Manage" (settings icon) to open a dialog with property-specific pricing table. Click "Delete" to show a confirmation dialog. **Note:** Price columns use `meta.align: "right"` which automatically aligns the header, cell content, and input text to the right.',
      },
    },
  },
};

/**
 * Story demonstrating the commit-on-blur/Enter feature for API optimization
 */
export const CommitOnBlurDemo: Story = {
  render: (args) => ({
    props: {
      ...args,
      materialsData: signal([...sampleMaterials]),
      apiCallCount: signal(0),
      lastCommit: signal<string>(''),
      newRowTemplate: {
        id: '',
        name: '',
        costPrice: 0,
        salesPrice: 0,
        lastUpdated: new Date().toLocaleDateString()
      },
      onCellEdited: (event: any) => {
        console.log('💡 Cell edited (fires on every keystroke):', event);
      },
      onCellCommitted: function(event: any) {
        const callNum = this['apiCallCount']() + 1;
        this['apiCallCount'].set(callNum);
        const timestamp = new Date().toLocaleTimeString();
        this['lastCommit'].set(`#${callNum} - ${event.column}: "${event.value}" at ${timestamp}`);
        console.log('🚀 API call would happen here! Cell committed:', event);
      },
      onRowAdded: (row: any) => {
        console.log('Row added:', row);
      },
    },
    template: `
      <div>
        <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 600;">Commit on Blur/Enter Demo</h3>
        <p style="margin-bottom: 16px; color: #666;">
          This demonstrates the <strong>(cellCommitted)</strong> event which fires only when editing is complete (on blur or Enter key).
          <br>Use this instead of <strong>(cellEdited)</strong> to optimize API calls.
        </p>
        <div style="margin-bottom: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px; font-family: monospace;">
          <div style="margin-bottom: 8px;">
            <strong>API Calls:</strong> <span style="color: #0066cc; font-size: 20px; font-weight: bold;">{{ apiCallCount() }}</span>
          </div>
          <div style="color: #666; font-size: 13px;">
            <strong>Last commit:</strong> {{ lastCommit() || 'None yet - edit a cell!' }}
          </div>
        </div>
        <ds-editable-table
          [(data)]="materialsData"
          [columns]="columns"
          [reorderable]="false"
          [allowAddRow]="true"
          [allowDeleteRow]="false"
          [addRowButtonText]="'Add material'"
          [newRowTemplate]="newRowTemplate"
          (cellEdited)="onCellEdited($event)"
          (cellCommitted)="onCellCommitted($event)"
          (rowAdded)="onRowAdded($event)"
        />
      </div>
    `,
  }),
  args: {
    columns: materialsColumnsWithActions,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Commit on Blur/Enter

This story demonstrates the new \`(cellCommitted)\` event which fires only when the user finishes editing:
- **On blur**: When the input loses focus
- **On Enter key**: When the user presses Enter

**Use case**: Instead of making an API call on every keystroke with \`(cellEdited)\`, use \`(cellCommitted)\` to only make the API call when editing is complete.

\`\`\`typescript
<ds-editable-table
  [(data)]="data"
  [columns]="columns"
  (cellCommitted)="updateAPI($event)"  // 👈 Only fires on blur/Enter!
/>
\`\`\`

**Try it**: Edit a cell value, then either press Enter or click outside the cell. Watch the API call counter increase only when you commit the change!
        `,
      },
    },
  },
};

