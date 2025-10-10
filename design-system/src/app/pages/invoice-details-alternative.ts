import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsHeaderDetailsComponent } from '../components/ui/header-details/ds-header-details';
import { DsDataItemComponent } from '../components/ui/data-item/ds-data-item';
import { DsEditableTableComponent, type EditableTableColumn, type DsEditableTableColumnMeta } from '../components/ui/editable-table/ds-editable-table';
import { editableTextCell, editableNumberCell, editableDatepickerCell } from '../components/ui/editable-table/editable-cell-helpers';
import { DsTileComponent } from '../components/ui/tile/ds-tile';
import { DsTileSectionComponent } from '../components/ui/tile/ds-tile-section';
import { TileHeaderComponent } from '../components/ui/tile/tile-header';

// Invoice line interface
interface InvoiceLine {
  id: string;
  name: string;
  details: string;
  costPrice: number;
  quantity: number;
  margin: number;
  discount: number;
  salesPrice: number;
  total: string;
  iconName?: string;
  date?: string;
}

@Component({
  selector: 'invoice-details-alternative',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    DsAppLayoutComponent,
    DsHeaderDetailsComponent,
    DsDataItemComponent,
    DsEditableTableComponent,
    DsTileComponent,
    DsTileSectionComponent,
    TileHeaderComponent,
  ],
  template: `
    <ds-app-layout
      [sidebarGroups]="sidebarGroups"
      [isSidebarCollapsed]="isSidebarCollapsed()"
      [activeItemId]="activeItemId()"
      [pageTitle]="'Invoices'"
      [iconName]="'remixFileList3Line'"
      [showFirstAction]="true"
      [showSecondAction]="true"
      [firstActionIcon]="'remixNotification3Line'"
      [secondActionIcon]="'remixMessage2Line'"
      [userInitials]="'JD'"
      [showBreadcrumbs]="true"
      [breadcrumbItems]="[
        { label: 'Invoices', path: '/invoices', isLast: false },
        { label: 'INV-2024-001', path: '', isLast: true }
      ]"
      (collapsedChange)="isSidebarCollapsed.set($event)"
    >
      <!-- Main Content -->
      <div class="content-container">
        <!-- Header Details -->
        <ds-header-details
          [title]="'INV-2024-001'"
          [showPrimaryAction]="true"
          [primaryActionText]="'Send invoice'"
          [primaryActionIcon]="'remixSendPlane2Line'"
          [showSecondaryAction]="false"
          [showMoreActions]="false"
        >
        </ds-header-details>

        <!-- Edge-to-edge divider -->
        <div class="edge-to-edge-divider"></div>

        <!-- Content area for invoice details -->
        <div class="tw-py-8">
          <div class="tw-flex tw-flex-col tw-gap-6">
            <!-- Row with 3 tiles -->
            <div class="tw-grid tw-grid-cols-3 tw-gap-6">
              <!-- Details tile -->
              <ds-tile orientation="horizontal">
                <ds-tile-section>
                  <tile-header>
                    <header-title>Details</header-title>
                  </tile-header>
                  <div class="tw-flex tw-flex-col tw-gap-4 tw-mt-4">
                    <ds-data-item
                      label="Property"
                      value="Fælledgården Hub"
                      valueType="icon-link"
                      iconName="remixBuilding2Line"
                      linkHref="/properties/faelledgarden-hub"
                      layout="horizontal"
                    />
                    <ds-data-item
                      label="Task"
                      value="Fix ventilation canal"
                      valueType="icon-link"
                      iconName="remixCheckboxMultipleLine"
                      linkHref="/tasks/fix-ventilation-canal"
                      layout="horizontal"
                    />
                    <ds-data-item
                      label="Invoice number"
                      value="Not available"
                      valueType="text"
                      layout="horizontal"
                    />
                  </div>
                </ds-tile-section>
              </ds-tile>

              <!-- Parameters tile -->
              <ds-tile orientation="horizontal">
                <ds-tile-section>
                  <tile-header>
                    <header-title>Parameters</header-title>
                  </tile-header>
                  <div class="tw-flex tw-flex-col tw-gap-4 tw-mt-4">
                    <ds-data-item
                      label="Coverage per hour"
                      value="150,00 DKK"
                      valueType="text"
                      layout="horizontal"
                    />
                    <ds-data-item
                      label="Contribution margin"
                      value="3.075,00 DKK"
                      valueType="text"
                      layout="horizontal"
                    />
                    <ds-data-item
                      label="Contribution ratio"
                      value="13,0 %"
                      valueType="text"
                      layout="horizontal"
                    />
                  </div>
                </ds-tile-section>
              </ds-tile>

              <!-- Description tile -->
              <ds-tile orientation="horizontal">
                <ds-tile-section>
                  <tile-header>
                    <header-title>Description</header-title>
                  </tile-header>
                  <div class="tw-mt-4">
                    <textarea 
                      placeholder="Write what your invoice is about..."
                      class="tw-w-full tw-min-h-[120px] tw-p-3 tw-border tw-border-neutral-secondary tw-rounded-lg tw-resize-none body-sm-regular"
                      style="background: var(--color-background-neutral-primary); color: var(--text-color-default-primary);"
                    ></textarea>
                  </div>
                </ds-tile-section>
              </ds-tile>
            </div>

            <!-- Invoice lines tile -->
            <ds-tile orientation="vertical">
              <ds-tile-section>
                <tile-header>
                  <header-title>
                    Invoice lines
                  </header-title>
                </tile-header>
              </ds-tile-section>
              
              <ds-tile-section [padding]="false">
                <ds-editable-table 
                  [(data)]="invoiceLines" 
                  [columns]="invoiceColumns()"
                  [reorderable]="true"
                  [allowAddRow]="true"
                  [allowDeleteRow]="true">
                </ds-editable-table>
              </ds-tile-section>
              
              <ds-tile-section>
                <div style="display: flex; justify-content: flex-end; gap: 8px;">
                  <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                    <ds-data-item 
                      label="Total cost price" 
                      value="20.500,00 DKK" 
                      layout="vertical"
                      [labelClassName]="'ui-xs-regular'"
                      [valueClassName]="'ui-lg-medium'" />
                  </div>
                  <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                    <ds-data-item 
                      label="Total price (excl. vat)" 
                      value="23.575,00 DKK" 
                      layout="vertical"
                      [labelClassName]="'ui-xs-regular'"
                      [valueClassName]="'ui-lg-medium'" />
                  </div>
                  <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                    <ds-data-item 
                      label="Total price (incl. vat)" 
                      value="29.468,75 DKK" 
                      layout="vertical"
                      [labelClassName]="'body-sm-semibold'"
                      [valueClassName]="'ui-lg-medium tw-text-brand'" />
                  </div>
                </div>
              </ds-tile-section>
            </ds-tile>
          </div>
        </div>
      </div>
    </ds-app-layout>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }

  `]
})
export class InvoiceDetailsAlternativeComponent {
  // Reactive state
  isSidebarCollapsed = signal(false);
  activeItemId = signal('invoices');

  // Invoice lines data
  invoiceLines = signal<InvoiceLine[]>([
    {
      id: '1',
      name: '001 - Administration fee',
      details: 'Covers handling, coordination, and documentation.',
      costPrice: 500.00,
      quantity: 1,
      margin: 15,
      discount: 0.00,
      salesPrice: 575.00,
      total: '575,00 DKK',
      iconName: 'remixMenuAddLine',
    },
    {
      id: '2',
      name: '004 - Miscellaneous',
      details: '',
      costPrice: 400.00,
      quantity: 2,
      margin: 15,
      discount: 0.00,
      salesPrice: 460.00,
      total: '920,00 DKK',
      iconName: 'remixMenuAddLine',
    },
    {
      id: '3',
      name: '013 - Maintenance plans',
      details: '',
      costPrice: 1200.00,
      quantity: 2,
      margin: 15,
      discount: 0.00,
      salesPrice: 1380.00,
      total: '2.760,00 DKK',
      iconName: 'remixMenuAddLine',
    },
    {
      id: '4',
      name: 'Technical Manager',
      details: 'Sep 29, 25',
      costPrice: 800.00,
      quantity: 6.5,
      margin: 0,
      discount: 0.00,
      salesPrice: 920.00,
      total: '5.980,00 DKK',
      iconName: 'remixTimeLine',
      date: 'Sep 29, 25',
    },
    {
      id: '5',
      name: 'Technical Manager',
      details: 'Sep 29, 25',
      costPrice: 800.00,
      quantity: 7.5,
      margin: 0,
      discount: 100.00,
      salesPrice: 100.00,
      total: '6.900,00 DKK',
      iconName: 'remixTimeLine',
      date: 'Sep 29, 25',
    },
    {
      id: '6',
      name: 'Technical Manager',
      details: 'Sep 28, 25',
      costPrice: 800.00,
      quantity: 7,
      margin: 15,
      discount: 100.00,
      salesPrice: 100.00,
      total: '6.440,00 DKK',
      iconName: 'remixTimeLine',
      date: 'Sep 28, 25',
    },
  ]);

  // Column definitions for invoice lines table
  invoiceColumns = signal<EditableTableColumn<InvoiceLine>[]>([
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => {
        const row = info.row.original;
        return editableTextCell({
          row: row,
          rowIndex: info.row.index,
          value: info.getValue(),
          placeholder: 'Enter name...',
          leadingIcon: row.iconName || 'remixMenuAddLine'
        });
      },
      meta: {
        sizing: {
          minWidth: 'lg',
        },
      } as DsEditableTableColumnMeta,
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: (info) => {
        const row = info.row.original;
        const isDateDetail = row.date != null;
        
        if (isDateDetail) {
          return editableDatepickerCell({
            row: row,
            rowIndex: info.row.index,
            value: info.getValue(),
            placeholder: 'Select date',
            leadingIcon: 'remixCalendar2Line'
          });
        }
        
        return editableTextCell({
          row: row,
          rowIndex: info.row.index,
          value: info.getValue(),
          placeholder: 'Add description...'
        });
      },
      meta: {
        sizing: {
          width: '256px',
          minWidth: '256px',
          maxWidth: '256px',
          truncate: true,
        },
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
        format: { preset: 'decimal', decimals: 1, align: 'right' }
      }),
      meta: {
        sizing: {
          minWidth: 'xs',
        },
        align: 'right',
      } as DsEditableTableColumnMeta,
    },
    {
      accessorKey: 'costPrice',
      header: 'Cost price',
      cell: (info) => editableNumberCell({
        row: info.row.original,
        rowIndex: info.row.index,
        value: info.getValue(),
        placeholder: '0.00',
        format: { preset: 'currency' },
        suffix: 'DKK'
      }),
      meta: {
        sizing: {
          minWidth: 'sm',
        },
        align: 'right',
      } as DsEditableTableColumnMeta,
    },
    {
      accessorKey: 'margin',
      header: 'Margin',
      cell: (info) => editableNumberCell({
        row: info.row.original,
        rowIndex: info.row.index,
        value: info.getValue(),
        placeholder: '0',
        format: { preset: 'percentage' },
        suffix: '%'
      }),
      meta: {
        sizing: {
          minWidth: 'xs',
        },
        align: 'right',
      } as DsEditableTableColumnMeta,
    },
    {
      accessorKey: 'discount',
      header: 'Discount',
      cell: (info) => editableNumberCell({
        row: info.row.original,
        rowIndex: info.row.index,
        value: info.getValue(),
        placeholder: '0.00',
        format: { preset: 'currency' },
        suffix: 'DKK'
      }),
      meta: {
        sizing: {
          minWidth: 'sm',
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
        placeholder: '0.00',
        format: { preset: 'currency' },
        suffix: 'DKK'
      }),
      meta: {
        sizing: {
          minWidth: 'sm',
        },
        align: 'right',
      } as DsEditableTableColumnMeta,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: (info) => `<div class="ds-editable-table__cell-content"><span class="body-sm-medium">${info.getValue()}</span></div>`,
      meta: {
        sizing: {
          minWidth: '160px',
          maxWidth: '160px',
        },
        align: 'right',
      } as DsEditableTableColumnMeta,
    },
  ]);

  // Sidebar configuration based on the standard structure
  sidebarGroups = [
    {
      id: 'servicehub',
      label: 'SERVICEHUB',
      items: [
        { id: 'inbox', label: 'Inbox', icon: 'remixMailLine', badgeText: '2' },
        { id: 'inquiries', label: 'Inquiries', icon: 'remixQuestionAnswerLine', badgeText: '2' },
        { id: 'tasks', label: 'Tasks', icon: 'remixTaskLine' },
        { id: 'invoices', label: 'Invoices', icon: 'remixFileList3Line' },
        { id: 'surveys', label: 'Surveys', icon: 'remixSurveyLine' },
      ],
    },
    {
      id: 'company',
      label: 'COMPANY',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'remixDashboardLine' },
        { id: 'rating', label: 'Rating', icon: 'remixStarLine' },
        { id: 'calendar', label: 'Calendar', icon: 'remixCalendarLine' },
        { id: 'settings', label: 'Settings', icon: 'remixSettings4Line' },
      ],
    },
    {
      id: 'kartoteker',
      label: 'CATALOG',
      items: [
        { id: 'customers', label: 'Customers', icon: 'remixTeamLine' },
        { id: 'companies', label: 'Companies', icon: 'remixBuilding4Line' },
        { id: 'properties', label: 'Properties', icon: 'remixBuilding2Line' },
        { id: 'leases', label: 'Leases', icon: 'remixFileListLine' },
        { id: 'tenants', label: 'Tenants', icon: 'remixUserLine' },
        { id: 'vendors', label: 'Vendors', icon: 'remixStore2Line' },
        { id: 'vendor-agreements', label: 'Vendor agreements', icon: 'remixFileTextLine' },
        { id: 'assets', label: 'Assets', icon: 'remixDatabase2Line' },
        { id: 'real-esg', label: 'Real ESG', icon: 'remixLeafLine' },
      ],
    },
    {
      id: 'me',
      label: 'ME',
      items: [
        { id: 'my-details', label: 'My details', icon: 'remixUserSettingsLine' },
        { id: 'whats-new', label: 'What\'s new', icon: 'remixNotification4Line' },
      ],
    },
  ];
}

