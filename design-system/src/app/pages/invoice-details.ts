import { Component, signal, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsHeaderDetailsComponent } from '../components/ui/header-details/ds-header-details';
import { DsDataItemComponent } from '../components/ui/data-item/ds-data-item';
import { DsEditableTableComponent, type EditableTableColumn, type DsEditableTableColumnMeta } from '../components/ui/editable-table/ds-editable-table';
import { editableTextCell, editableNumberCell, editableDatepickerCell } from '../components/ui/editable-table/editable-cell-helpers';
import { DsTileComponent } from '../components/ui/tile/ds-tile';
import { DsTileSectionComponent } from '../components/ui/tile/ds-tile-section';
import { TileHeaderComponent } from '../components/ui/tile/tile-header';
import { DsButtonComponent } from '../components/ui/button/ds-button';
import { DsComboboxComponent } from '../components/ui/combobox/ds-combobox';
import { DsInlineMessageComponent } from '../components/ui/inline-message/ds-inline-message';

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
  selector: 'invoice-details',
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
    DsButtonComponent,
    DsComboboxComponent,
    DsInlineMessageComponent,
  ],
  template: `
    <ds-app-layout
      [sidebarGroups]="sidebarGroups"
      [isSidebarCollapsed]="isSidebarCollapsed()"
      [activeItemId]="activeItemId()"
      [pageTitle]="'Billable tasks'"
      [iconName]="'remixFileList3Line'"
      [showFirstAction]="true"
      [showSecondAction]="true"
      [firstActionIcon]="'remixNotification3Line'"
      [secondActionIcon]="'remixMessage2Line'"
      [userInitials]="'JD'"
      [showBreadcrumbs]="true"
      [breadcrumbItems]="[
        { label: 'Billable tasks', path: '/invoices', isLast: false },
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
          [primaryActionLoading]="isSendingInvoice()"
          [primaryActionDisabled]="invoiceSent() || isSendingInvoice()"
          [showSecondaryAction]="false"
          [showMoreActions]="false"
          (primaryActionClick)="handleSendInvoice()"
        >
          <!-- Invoice Details -->
          <div slot="details" class="tw-flex tw-flex-wrap tw-gap-8">
            <ds-data-item
              label="Property"
              value="Fælledgården Hub"
              valueType="icon-link"
              iconName="remixBuilding2Line"
              linkHref="/properties/faelledgarden-hub"
            />

            <ds-data-item
              label="Task"
              value="Fix ventilation canal"
              valueType="icon-link"
              iconName="remixCheckboxMultipleLine"
              linkHref="/tasks/fix-ventilation-canal"
            />

            <ds-data-item
              label="Invoice number"
              value="Not available"
              valueType="text"
            />

            <ds-data-item
              label="Coverage per hour"
              value="150,00 DKK"
              valueType="text"
            />

            <ds-data-item
              label="Contribution margin"
              value="3.075,00 DKK"
              valueType="text"
            />

            <ds-data-item
              label="Contribution ratio"
              value="13,0 %"
              valueType="text"
            />
          </div>
          
          <!-- Invoice Sent Message -->
          @if (invoiceSent()) {
            <div slot="details" style="flex: 1 1 100%; width: 100%; max-width: 100%;">
              <ds-inline-message
                variant="success"
                title="Invoice sent">
                You have sent the invoice on {{ invoiceSentDate() }}.
              </ds-inline-message>
            </div>
          }
        </ds-header-details>

        <!-- Edge-to-edge divider -->
        <div class="edge-to-edge-divider"></div>

        <!-- Content area for invoice details -->
        <div class="tw-py-8">
          <div class="tw-flex tw-flex-col tw-gap-6">
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
                [allowAddRow]="false"
                [allowDeleteRow]="true"
                (cellEdited)="onCellEdited($event)">
              </ds-editable-table>
              </ds-tile-section>
              
              <ds-tile-section>
                <div style="display: flex; gap: 8px;">
                  <ds-combobox
                    [options]="materialOptions"
                    [placeholder]="'Search'"
                    [selectPlaceholder]="'Select material'"
                    [width]="'320px'"
                    (valueChange)="onMaterialSelected($event)">
                    <ds-button 
                      variant="ghost" 
                      size="sm"
                      leadingIcon="remixMenuAddLine">
                      Add material
                    </ds-button>
                  </ds-combobox>
                  <ds-button 
                    variant="ghost" 
                    size="sm"
                    leadingIcon="remixTimeLine"
                    (clicked)="addTimeRow()">
                    Add time
                  </ds-button>
                </div>
              </ds-tile-section>
              
              <ds-tile-section>
                <div style="display: flex; justify-content: flex-end; gap: 8px;">
                  <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                    <ds-data-item 
                      label="Total cost price" 
                      [value]="totalCostPrice()" 
                      layout="vertical"
                      [labelClassName]="'ui-xs-regular'"
                      [valueClassName]="'ui-lg-medium'" />
                  </div>
                  <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                    <ds-data-item 
                      label="Total price (excl. vat)" 
                      [value]="totalPriceExclVat()" 
                      layout="vertical"
                      [labelClassName]="'ui-xs-regular'"
                      [valueClassName]="'ui-lg-medium'" />
                  </div>
                  <div style="background: var(--color-background-neutral-secondary); border-radius: 6px; width: 192px; padding: 8px 12px;">
                    <ds-data-item 
                      label="Total price (incl. vat)" 
                      [value]="totalPriceInclVat()" 
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
export class InvoiceDetailsComponent {
  // Reactive state
  isSidebarCollapsed = signal(false);
  activeItemId = signal('invoices');
  isSendingInvoice = signal(false);
  invoiceSent = signal(false);
  invoiceSentDate = signal('');

  // VAT rate (25% in Denmark)
  private readonly VAT_RATE = 0.25;

  // Material options for combobox
  materialOptions = [
    '001 - Administration fee',
    '002 - Property sale fee',
    '003 - Broker correspondence',
    '004 - Miscellaneous',
    '005 - Copying',
    '006 - Other professional fees',
  ];

  // Material pricing data
  private materialPricing: Record<string, { costPrice: number; salesPrice: number }> = {
    '001 - Administration fee': { costPrice: 500, salesPrice: 575 },
    '002 - Property sale fee': { costPrice: 300, salesPrice: 345 },
    '003 - Broker correspondence': { costPrice: 200, salesPrice: 230 },
    '004 - Miscellaneous': { costPrice: 400, salesPrice: 460 },
    '005 - Copying': { costPrice: 50, salesPrice: 58 },
    '006 - Other professional fees': { costPrice: 600, salesPrice: 690 },
  };

  // Helper method to calculate margin from cost and sales price
  private calculateMargin(costPrice: number, salesPrice: number): number {
    if (costPrice === 0) return 0;
    return Math.round(((salesPrice - costPrice) / costPrice) * 100);
  }

  // Helper method to calculate sales price from cost and margin
  private calculateSalesPrice(costPrice: number, margin: number): number {
    return costPrice * (1 + margin / 100);
  }

  // Helper method to calculate cost price from sales and margin
  private calculateCostPrice(salesPrice: number, margin: number): number {
    return salesPrice / (1 + margin / 100);
  }

  // Helper method to format total
  private formatTotal(amount: number): string {
    return `${amount.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')} DKK`;
  }

  // Computed totals
  totalCostPrice = computed(() => {
    const total = this.invoiceLines().reduce((sum, line) => {
      return sum + (line.costPrice * line.quantity);
    }, 0);
    return this.formatTotal(total);
  });

  totalPriceExclVat = computed(() => {
    const total = this.invoiceLines().reduce((sum, line) => {
      const lineTotal = (line.quantity * line.salesPrice) - line.discount;
      return sum + lineTotal;
    }, 0);
    return this.formatTotal(total);
  });

  totalPriceInclVat = computed(() => {
    const totalExclVat = this.invoiceLines().reduce((sum, line) => {
      const lineTotal = (line.quantity * line.salesPrice) - line.discount;
      return sum + lineTotal;
    }, 0);
    const totalInclVat = totalExclVat * (1 + this.VAT_RATE);
    return this.formatTotal(totalInclVat);
  });

  // Handle send invoice action
  handleSendInvoice() {
    // Prevent multiple clicks while sending
    if (this.isSendingInvoice()) return;
    
    this.isSendingInvoice.set(true);
    
    // Simulate API call with 2 second delay
    setTimeout(() => {
      this.isSendingInvoice.set(false);
      this.invoiceSent.set(true);
      
      // Format current date in readable format
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      this.invoiceSentDate.set(formattedDate);
    }, 2000);
  }

  // Methods to add different types of rows
  onMaterialSelected(materialName: string) {
    const pricing = this.materialPricing[materialName] || { costPrice: 0, salesPrice: 0 };
    const calculatedMargin = this.calculateMargin(pricing.costPrice, pricing.salesPrice);
    const newRow: InvoiceLine = {
      id: Math.random().toString(36).substr(2, 9),
      name: materialName,
      details: '',
      costPrice: pricing.costPrice,
      quantity: 1,
      margin: calculatedMargin,
      discount: 0,
      salesPrice: pricing.salesPrice,
      total: this.formatTotal(pricing.salesPrice),
      iconName: 'remixMenuAddLine',
    };
    this.invoiceLines.update(rows => [...rows, newRow]);
  }

  addTimeRow() {
    const newRow: InvoiceLine = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      details: '',
      costPrice: 0,
      quantity: 1,
      margin: 0,
      discount: 0,
      salesPrice: 0,
      total: '0,00 DKK',
      iconName: 'remixTimeLine',
      date: '',
    };
    this.invoiceLines.update(rows => [...rows, newRow]);
  }

  // Handle cell edits and recalculate related fields
  onCellEdited(event: { row: InvoiceLine; rowIndex: number; column: string; value: any }) {
    const { rowIndex, column, value } = event;
    
    this.invoiceLines.update(rows => {
      const updatedRows = [...rows];
      const row = { ...updatedRows[rowIndex] };
      
      // Update the edited field
      (row as any)[column] = value;
      
      // Recalculate related fields based on what was edited
      if (column === 'costPrice') {
        // When cost price changes, recalculate margin (keeping sales price constant)
        row.margin = this.calculateMargin(row.costPrice, row.salesPrice);
      } else if (column === 'salesPrice') {
        // When sales price changes, recalculate margin (keeping cost price constant)
        row.margin = this.calculateMargin(row.costPrice, row.salesPrice);
      } else if (column === 'margin') {
        // When margin changes, recalculate sales price (keeping cost price constant)
        row.salesPrice = this.calculateSalesPrice(row.costPrice, row.margin);
      }
      
      // Always recalculate total (quantity * sales price - discount)
      const subtotal = row.quantity * row.salesPrice;
      const total = subtotal - row.discount;
      row.total = this.formatTotal(total);
      
      updatedRows[rowIndex] = row;
      return updatedRows;
    });
  }

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
        format: { preset: 'currency', thousandsSeparator: '.', decimalSeparator: ',' },
        suffix: 'DKK'
      }),
      meta: {
        sizing: {
          minWidth: '160px',
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
        align: 'left',
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
        format: { preset: 'currency', thousandsSeparator: '.', decimalSeparator: ',' },
        suffix: 'DKK'
      }),
      meta: {
        sizing: {
          minWidth: '160px',
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
        format: { preset: 'currency', thousandsSeparator: '.', decimalSeparator: ',' },
        suffix: 'DKK'
      }),
      meta: {
        sizing: {
          minWidth: '160px',
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
        { id: 'invoices', label: 'Billable tasks', icon: 'remixFileList3Line' },
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
