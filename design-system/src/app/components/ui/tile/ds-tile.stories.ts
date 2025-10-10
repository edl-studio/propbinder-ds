import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { DsTileComponent } from './ds-tile';
import { DsTileSectionComponent } from './ds-tile-section';
import { TileHeaderComponent } from './tile-header';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconButtonComponent } from '../button/ds-icon-button';
import { DsIconComponent } from '../icon/ds-icon';
import { DsAvatarComponent } from '../avatar/ds-avatar';
import { DsDataTableComponent } from '../data-table/ds-data-table';
import { DsBadgeComponent } from '../badge/ds-badge';
import { DsDataItemComponent } from '../data-item/ds-data-item';
import { DsMetadataItemComponent } from '../metadata-item/ds-metadata-item';
import { provideIcons } from '@ng-icons/core';
import {
  remixAddLine,
  remixEditLine,
  remixMoreLine,
  remixFileList3Line,
  remixUserLine,
  remixDownloadLine,
  remixFilterLine,
  remixSearchLine,
  remixLayoutColumnLine,
  remixCloseLine,
  remixArrowUpLine,
  remixArrowDownLine,
  remixInboxLine,
  remixArrowLeftSLine,
  remixArrowRightSLine,
} from '@ng-icons/remixicon';
import type { ColumnDef } from '@tanstack/angular-table';

interface InvoiceLine {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const sampleInvoiceLines: InvoiceLine[] = [
  { id: 1, description: 'Professional Services - Consulting', quantity: 10, unitPrice: 150.00, total: 1500.00 },
  { id: 2, description: 'Software License - Annual', quantity: 5, unitPrice: 299.99, total: 1499.95 },
  { id: 3, description: 'Cloud Hosting - Monthly', quantity: 12, unitPrice: 49.99, total: 599.88 },
  { id: 4, description: 'Support & Maintenance', quantity: 1, unitPrice: 999.00, total: 999.00 },
];

const invoiceColumns: ColumnDef<InvoiceLine>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'quantity', header: 'Qty' },
  { accessorKey: 'unitPrice', header: 'Unit Price', cell: (info) => `$${(info.getValue() as number).toFixed(2)}` },
  { accessorKey: 'total', header: 'Total', cell: (info) => `$${(info.getValue() as number).toFixed(2)}` },
];

const meta: Meta<DsTileComponent> = {
  title: 'Layout/Tile',
  component: DsTileComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideIcons({
          remixAddLine,
          remixEditLine,
          remixMoreLine,
          remixFileList3Line,
          remixUserLine,
          remixDownloadLine,
          remixFilterLine,
          remixSearchLine,
          remixLayoutColumnLine,
          remixCloseLine,
          remixArrowUpLine,
          remixArrowDownLine,
          remixInboxLine,
          remixArrowLeftSLine,
          remixArrowRightSLine,
        }),
      ],
    }),
    moduleMetadata({
      imports: [
        DsTileSectionComponent,
        TileHeaderComponent,
        DsButtonComponent,
        DsIconButtonComponent,
        DsIconComponent,
        DsAvatarComponent,
        DsDataTableComponent,
        DsBadgeComponent,
        DsDataItemComponent,
        DsMetadataItemComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of tile sections',
    },
  },
};

export default meta;
type Story = StoryObj<DsTileComponent>;

// Basic Examples
export const Default: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-tile [orientation]="orientation">
        <ds-tile-section>
          <tile-header>
            <header-title>Section Title</header-title>
            <header-actions>
              <ds-button size="sm">Action</ds-button>
            </header-actions>
          </tile-header>
          <p style="margin: 0;">This is a simple tile section with a header and some content.</p>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const WithDataTable: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    props: {
      ...args,
      invoiceLines: sampleInvoiceLines,
      invoiceColumns: invoiceColumns,
    },
    template: `
      <ds-tile [orientation]="orientation">
        <ds-tile-section>
          <tile-header>
            <header-title>Invoice Lines</header-title>
            <header-actions>
              <ds-button size="sm" leadingIcon="remixAddLine">Add line</ds-button>
            </header-actions>
          </tile-header>
        </ds-tile-section>
        <ds-tile-section [padding]="false">
          <ds-data-table 
            [data]="invoiceLines" 
            [columns]="invoiceColumns"
            [searchable]="false"
            [showColumnVisibility]="false"
            [paginated]="false">
          </ds-data-table>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const WithTitleAndAvatar: Story = {
  render: () => ({
    template: `
      <ds-tile orientation="vertical">
        <ds-tile-section>
          <tile-header>
            <header-title>
              <ds-avatar type="initials" size="sm" initials="JD" />
              User Profile
            </header-title>
            <header-actions>
              <ds-icon-button icon="remixEditLine" variant="ghost" ariaLabel="Edit" />
            </header-actions>
          </tile-header>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <ds-data-item label="Name" value="John Doe" layout="horizontal" />
            <ds-data-item label="Email" value="john.doe@example.com" layout="horizontal" />
            <ds-data-item label="Role" value="Administrator" layout="horizontal" />
          </div>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const WithTitleAndIcon: Story = {
  render: () => ({
    template: `
      <ds-tile orientation="vertical">
        <ds-tile-section>
          <tile-header>
            <header-title>
              <ds-avatar type="icon" size="sm" iconName="remixFileList3Line" />
              Invoice Details
            </header-title>
            <header-actions>
              <ds-button variant="ghost" size="sm" leadingIcon="remixDownloadLine">Export</ds-button>
              <ds-button size="sm" leadingIcon="remixEditLine">Edit</ds-button>
            </header-actions>
          </tile-header>
          <div style="display: flex; gap: 12px;">
            <ds-metadata-item icon="remixFileTextLine" value="Invoice #12345" />
            <ds-metadata-item icon="remixCalendarLine" value="Due Date: 2024-03-15" />
          </div>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const MultipleActions: Story = {
  render: () => ({
    template: `
      <ds-tile orientation="vertical">
        <ds-tile-section>
          <tile-header>
            <header-title>Document Manager</header-title>
            <header-actions>
              <ds-button variant="ghost" size="sm" leadingIcon="remixDownloadLine">Export</ds-button>
              <ds-button variant="ghost" size="sm" leadingIcon="remixFilterLine">Filter</ds-button>
              <ds-button size="sm" leadingIcon="remixAddLine">New</ds-button>
            </header-actions>
          </tile-header>
          <p style="margin: 0;">Manage your documents with multiple action options.</p>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const MultipleSectionsVertical: Story = {
  render: () => ({
    template: `
      <ds-tile orientation="vertical">
        <ds-tile-section>
          <tile-header>
            <header-title>Personal Information</header-title>
            <header-actions>
              <ds-icon-button icon="remixEditLine" variant="ghost" ariaLabel="Edit" />
            </header-actions>
          </tile-header>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <ds-data-item label="Name" value="Jane Smith" layout="horizontal" />
            <ds-data-item label="Email" value="jane.smith@example.com" layout="horizontal" />
          </div>
        </ds-tile-section>
        
        <ds-tile-section>
          <tile-header>
            <header-title>Account Settings</header-title>
          </tile-header>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <ds-data-item label="Plan" value="Professional" layout="horizontal" />
            <ds-data-item 
              label="Status" 
              value="Active" 
              valueType="badge"
              layout="horizontal"
              badgeVariant="success"
              badgeContent="Active" />
          </div>
        </ds-tile-section>
        
        <ds-tile-section>
          <tile-header>
            <header-title>Preferences</header-title>
            <header-actions>
              <ds-button size="sm" variant="ghost">Reset</ds-button>
            </header-actions>
          </tile-header>
          <p style="margin: 0;">Configure your application preferences here.</p>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const MultipleSectionsHorizontal: Story = {
  render: () => ({
    template: `
      <ds-tile orientation="horizontal">
        <ds-tile-section>
          <tile-header>
            <header-title>Overview</header-title>
          </tile-header>
          <div style="display: flex; flex-direction: row; gap: 16px;">
            <ds-data-item 
              label="Total Revenue" 
              value="$45,231" 
              layout="vertical"
              [labelClassName]="'ui-xs-regular'"
              [valueClassName]="'heading-lg'" />
            <ds-data-item 
              label="Growth" 
              value="+20.1%" 
              layout="vertical"
              [labelClassName]="'ui-xs-regular'"
              [valueClassName]="'heading-md tw-text-success-strong'" />
          </div>
        </ds-tile-section>
        
        <ds-tile-section>
          <tile-header>
            <header-title>Activity</header-title>
          </tile-header>
          <div style="display: flex; flex-direction: row; gap: 16px;">
            <ds-data-item 
              label="New Users" 
              value="1,234" 
              layout="vertical"
              [labelClassName]="'ui-xs-regular'"
              [valueClassName]="'heading-lg'" />
            <ds-data-item 
              label="Conversion" 
              value="3.2%" 
              layout="vertical"
              [labelClassName]="'ui-xs-regular'"
              [valueClassName]="'heading-md'" />
          </div>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const SectionWithoutHeader: Story = {
  render: () => ({
    template: `
      <ds-tile orientation="vertical">
        <ds-tile-section>
          <p style="margin: 0;">This section has no header, just content with default padding.</p>
        </ds-tile-section>
        
        <ds-tile-section>
          <tile-header>
            <header-title>Section with Header</header-title>
          </tile-header>
          <p style="margin: 0;">This section has a header for comparison.</p>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const SectionWithoutPadding: Story = {
  render: () => ({
    template: `
      <ds-tile orientation="vertical">
        <ds-tile-section>
          <tile-header>
            <header-title>With Padding (Default)</header-title>
          </tile-header>
          <div style="background: #f0f0f0; padding: 8px; border-radius: 4px;">
            This content has the default 20px padding around it.
          </div>
        </ds-tile-section>
        
        <ds-tile-section [padding]="false">
          <div style="background: #f0f0f0; padding: 20px;">
            This content has no section padding. The gray box extends to the edges.
          </div>
        </ds-tile-section>
      </ds-tile>
    `,
  }),
};

export const ComplexExample: Story = {
  render: () => ({
    props: {
      invoiceLines: sampleInvoiceLines,
      invoiceColumns: invoiceColumns,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <ds-tile orientation="vertical">
          <ds-tile-section>
            <tile-header>
              <header-title>
                <ds-avatar type="icon" size="sm" iconName="remixFileList3Line" />
                Invoice #INV-2024-001
              </header-title>
              <header-actions>
                <ds-button variant="ghost" size="sm" leadingIcon="remixDownloadLine">Download</ds-button>
                <ds-button size="sm" leadingIcon="remixEditLine">Edit</ds-button>
              </header-actions>
            </tile-header>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              <ds-data-item label="Client" value="Acme Corporation" layout="vertical" />
              <ds-data-item label="Issue Date" value="2024-03-01" layout="vertical" />
              <ds-data-item label="Due Date" value="2024-03-31" layout="vertical" />
              <ds-data-item 
                label="Status" 
                value="Pending" 
                valueType="badge"
                layout="vertical"
                badgeVariant="warning"
                badgeContent="Pending" />
            </div>
          </ds-tile-section>
          
          <ds-tile-section [padding]="false">
            <ds-data-table 
              [data]="invoiceLines" 
              [columns]="invoiceColumns"
              [searchable]="false"
              [showColumnVisibility]="false"
              [paginated]="false">
            </ds-data-table>
          </ds-tile-section>
          
          <ds-tile-section>
            <div style="display: flex; justify-content: flex-end; gap: 8px;">
              <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                <ds-data-item 
                  label="Subtotal" 
                  value="$4,598.83" 
                  layout="vertical"
                  [labelClassName]="'ui-xs-regular'"
                  [valueClassName]="'ui-lg-medium'" />
              </div>
              <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                <ds-data-item 
                  label="Tax (10%)" 
                  value="$459.88" 
                  layout="vertical"
                  [labelClassName]="'ui-xs-regular'"
                  [valueClassName]="'ui-lg-medium'" />
              </div>
              <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                <ds-data-item 
                  label="Total" 
                  value="$5,058.71" 
                  layout="vertical"
                  [labelClassName]="'body-sm-semibold'"
                  [valueClassName]="'ui-lg-medium tw-text-brand'" />
              </div>
            </div>
          </ds-tile-section>
        </ds-tile>
      </div>
    `,
  }),
};

export const ResponsiveLayout: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <p style="margin: 0; font-size: 14px; color: var(--text-color-default-secondary);">
          Resize your browser to see the responsive behavior. Horizontal tiles stack vertically on mobile, 
          and section headers stack their title and actions.
        </p>
        
        <ds-tile orientation="horizontal">
          <ds-tile-section>
            <tile-header>
              <header-title>Left Section</header-title>
              <header-actions>
                <ds-button size="sm" variant="ghost">Action</ds-button>
              </header-actions>
            </tile-header>
            <p style="margin: 0;">This section is on the left on desktop and stacks on top on mobile.</p>
          </ds-tile-section>
          
          <ds-tile-section>
            <tile-header>
              <header-title>Right Section</header-title>
              <header-actions>
                <ds-button size="sm">Action</ds-button>
              </header-actions>
            </tile-header>
            <p style="margin: 0;">This section is on the right on desktop and stacks below on mobile.</p>
          </ds-tile-section>
        </ds-tile>
      </div>
    `,
  }),
};

