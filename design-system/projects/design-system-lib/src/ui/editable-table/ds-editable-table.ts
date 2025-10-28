import { Component, ViewEncapsulation, input, output, computed, signal, effect, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';
import { DsAvatarComponent } from '../avatar/ds-avatar';
import {
  type ColumnDef,
  type SortingState,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';
import { 
  EditableTextCellComponent,
  EditableNumberCellComponent,
  EditableSelectCellComponent,
  EditableDatepickerCellComponent,
  DragHandleCellComponent,
  ActionCellComponent,
} from './cells';

export type EditableTableColumn<T = any> = ColumnDef<T>;

/**
 * Column sizing configuration for controlling width constraints
 */
export interface EditableColumnSizing {
  /** Fixed width */
  width?: string;
  /** Minimum width - prevents column from shrinking below this size */
  minWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
  /** Maximum width - prevents column from growing beyond this size */
  maxWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
  /** Enable text truncation with ellipsis */
  truncate?: boolean;
}

/**
 * Extended column meta interface for ds-editable-table
 */
export interface DsEditableTableColumnMeta {
  /** Column sizing configuration */
  sizing?: EditableColumnSizing;
  /** Whether this column is sortable (only applies when reorderable is false) */
  sortable?: boolean;
  /** Text alignment for both header and cells */
  align?: 'left' | 'right' | 'center';
  [key: string]: any;
}

/**
 * An editable data table component built on TanStack Table with inline editing,
 * drag-and-drop row reordering, and row management capabilities.
 * 
 * Features:
 * - Inline cell editing with text, number, and select inputs
 * - Drag-and-drop row reordering (optional)
 * - Add/delete rows
 * - Column sorting (when reordering is disabled)
 * - Two-way data binding with model()
 * 
 * @example
 * Basic usage with row reordering:
 * ```html
 * <ds-editable-table 
 *   [(data)]="invoiceLines"
 *   [columns]="columns"
 *   [reorderable]="true"
 *   [allowAddRow]="true"
 *   (rowAdded)="onRowAdded($event)"
 *   (cellEdited)="onCellEdited($event)">
 * </ds-editable-table>
 * ```
 * 
 * @example
 * With sorting enabled (no reordering):
 * ```html
 * <ds-editable-table 
 *   [(data)]="users"
 *   [columns]="userColumns"
 *   [reorderable]="false"
 *   (sortingChanged)="onSort($event)">
 * </ds-editable-table>
 * ```
 */
@Component({
  selector: 'ds-editable-table',
  imports: [
    CommonModule,
    DragDropModule,
    FlexRenderDirective,
    DsButtonComponent,
    DsIconComponent,
    DsAvatarComponent,
    EditableTextCellComponent,
    EditableNumberCellComponent,
    EditableSelectCellComponent,
    EditableDatepickerCellComponent,
    DragHandleCellComponent,
    ActionCellComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-editable-table.css'],
  template: `
    <div class="ds-editable-table">
      <!-- Table Container -->
      <div class="ds-editable-table__container">
        <div class="ds-editable-table__scroll">
          <table class="ds-editable-table__table">
            <!-- Table Header -->
            <thead class="ds-editable-table__thead">
              @for (headerGroup of table().getHeaderGroups(); track headerGroup.id) {
                <tr class="ds-editable-table__tr">
                  @for (header of headerGroup.headers; track header.id) {
                    <th 
                      class="ds-editable-table__th"
                      [class.ds-editable-table__th--truncate]="shouldTruncateColumn(header.column)"
                      [class.ds-editable-table__th--align-right]="getColumnAlign(header.column) === 'right'"
                      [class.ds-editable-table__th--align-center]="getColumnAlign(header.column) === 'center'"
                      [attr.colSpan]="header.colSpan"
                      [style.width]="getColumnWidth(header.column)"
                      [style.min-width]="getColumnMinWidth(header.column)"
                      [style.max-width]="getColumnMaxWidth(header.column)">
                      @if (!header.isPlaceholder) {
                        @if (header.column.getCanSort() && !reorderable()) {
                          <!-- Sortable header -->
                          <button 
                            class="ds-editable-table__sort-button"
                            [class.ds-editable-table__sort-button--active]="header.column.getIsSorted()"
                            [class.ds-editable-table__sort-button--align-right]="getColumnAlign(header.column) === 'right'"
                            [class.ds-editable-table__sort-button--align-center]="getColumnAlign(header.column) === 'center'"
                            (click)="header.column.toggleSorting()">
                            <ng-container
                              *flexRender="header.column.columnDef.header; props: header.getContext(); let headerText">
                              @if (headerText) {
                                <span class="ds-editable-table__header-content">
                                  <span [innerHTML]="headerText"></span>
                                  @if (header.column.getIsSorted()) {
                                    <ds-icon 
                                      [name]="header.column.getIsSorted() === 'asc' ? 'remixArrowUpLine' : 'remixArrowDownLine'"
                                      size="14px"
                                      color="var(--text-color-default-primary)"
                                      class="ds-editable-table__sort-icon"
                                    />
                                  }
                                </span>
                              }
                            </ng-container>
                          </button>
                        } @else {
                          <!-- Non-sortable header -->
                          <ng-container
                            *flexRender="header.column.columnDef.header; props: header.getContext(); let headerText">
                            @if (headerText) {
                              <span class="ds-editable-table__header-content">
                                <span [innerHTML]="headerText"></span>
                              </span>
                            }
                          </ng-container>
                        }
                      }
                    </th>
                  }
                </tr>
              }
            </thead>
            
            <!-- Table Body with Drag-Drop -->
            <tbody 
              class="ds-editable-table__tbody"
              [cdkDropListDisabled]="!reorderable()"
              cdkDropList
              (cdkDropListDropped)="onRowDrop($event)">
              @for (row of table().getRowModel().rows; track row.id) {
                <tr 
                  class="ds-editable-table__tr ds-editable-table__tr--body"
                  [class.ds-editable-table__tr--draggable]="reorderable()"
                  cdkDrag
                  [cdkDragDisabled]="!reorderable()">
                  
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td 
                      class="ds-editable-table__td"
                      [class.ds-editable-table__td--truncate]="shouldTruncateColumn(cell.column)"
                      [class.ds-editable-table__td--align-right]="getColumnAlign(cell.column) === 'right'"
                      [class.ds-editable-table__td--align-center]="getColumnAlign(cell.column) === 'center'"
                      [style.min-width]="getColumnMinWidth(cell.column)"
                      [style.max-width]="getColumnMaxWidth(cell.column)">
                      <ng-container 
                        *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cellContent">
                        @if (isEditableComponentCell(cellContent)) {
                          <!-- Component-based editable cell rendering -->
                          @switch (cellContent.component) {
                            @case ('editable-text') {
                              <editable-text-cell 
                                [data]="mergeCellDataWithAlignment(cellContent.data, cell.column)"
                                (valueChanged)="onCellEdit(row.index, cell.column.id, $event)"
                                (valueCommitted)="onCellCommit(row.index, cell.column.id, $event)"
                              />
                            }
                            @case ('editable-number') {
                              <editable-number-cell 
                                [data]="mergeCellDataWithAlignment(cellContent.data, cell.column)"
                                (valueChanged)="onCellEdit(row.index, cell.column.id, $event)"
                                (valueCommitted)="onCellCommit(row.index, cell.column.id, $event)"
                              />
                            }
                            @case ('editable-select') {
                              <editable-select-cell 
                                [data]="mergeCellDataWithAlignment(cellContent.data, cell.column)"
                                (valueChanged)="onCellEdit(row.index, cell.column.id, $event)"
                                (valueCommitted)="onCellCommit(row.index, cell.column.id, $event)"
                              />
                            }
                            @case ('editable-datepicker') {
                              <editable-datepicker-cell 
                                [data]="cellContent.data" 
                                (valueChanged)="onCellEdit(row.index, cell.column.id, $event)"
                              />
                            }
                            @case ('drag-handle') {
                              <drag-handle-cell />
                            }
                            @case ('action') {
                              <action-cell 
                                [data]="cellContent.data" 
                                (actionClicked)="onActionClicked($event)"
                                (deleteClicked)="onDeleteRow($event)"
                              />
                            }
                          }
                        } @else {
                          <!-- HTML string cell rendering -->
                          <div class="ds-editable-table__cell-content" [innerHTML]="cellContent"></div>
                        }
                      </ng-container>
                    </td>
                  }
                  
                  <!-- Drag Preview - matches row styling exactly -->
                  <div class="ds-editable-table__drag-preview" *cdkDragPreview>
                    <table class="ds-editable-table ds-editable-table--preview">
                      <tbody>
                        <tr class="ds-editable-table__tr ds-editable-table__tr--body">
                          @for (cell of row.getVisibleCells(); track cell.id) {
                            <td 
                              class="ds-editable-table__td"
                              [class.ds-editable-table__td--truncate]="shouldTruncateColumn(cell.column)"
                              [class.ds-editable-table__td--align-right]="getColumnAlign(cell.column) === 'right'"
                              [class.ds-editable-table__td--align-center]="getColumnAlign(cell.column) === 'center'"
                              [style.min-width]="getColumnMinWidth(cell.column)"
                              [style.max-width]="getColumnMaxWidth(cell.column)">
                              <ng-container 
                                *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cellContent">
                              @if (isEditableComponentCell(cellContent)) {
                                <!-- Show values as text in preview -->
                                @switch (cellContent.component) {
                                  @case ('editable-text') {
                                    <div class="tw-px-2 tw-py-1 tw-text-sm">{{ cellContent.data.value || '' }}</div>
                                  }
                                  @case ('editable-number') {
                                    <div class="tw-px-2 tw-py-1 tw-text-sm">{{ cellContent.data.value || '' }}</div>
                                  }
                                  @case ('editable-select') {
                                    <div class="tw-px-2 tw-py-1 tw-text-sm">{{ cellContent.data.value || '' }}</div>
                                  }
                                  @case ('editable-datepicker') {
                                    <div class="tw-px-2 tw-py-1 tw-text-sm">{{ cellContent.data.value || '' }}</div>
                                  }
                                  @case ('drag-handle') {
                                    <div class="tw-flex tw-items-center tw-justify-center">
                                      <ds-icon name="remixDraggable" size="20px" color="var(--text-color-default-tertiary)" />
                                    </div>
                                  }
                                  @case ('action') {
                                    <!-- Action button is hidden in drag preview -->
                                  }
                                }
                              } @else {
                                <div class="ds-editable-table__cell-content" [innerHTML]="cellContent"></div>
                              }
                              </ng-container>
                            </td>
                          }
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </tr>
              } @empty {
                <tr class="ds-editable-table__tr">
                  <td 
                    class="ds-editable-table__td ds-editable-table__td--empty"
                    [attr.colspan]="enhancedColumns().length">
                    <div class="ds-editable-table__empty">
                      <ds-avatar type="icon" iconName="remixInboxLine" size="md" />
                      <span class="body-md-medium">{{ emptyMessage() }}</span>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Add Row Button -->
        @if (allowAddRow() && data().length > 0) {
          <div class="ds-editable-table__footer">
            <ds-button 
              variant="ghost" 
              size="sm"
              leadingIcon="remixAddLine"
              (clicked)="onAddRow()">
              {{ addRowButtonText() }}
            </ds-button>
          </div>
        }
        
        <!-- Empty State with Add Button -->
        @if (allowAddRow() && data().length === 0) {
          <div class="ds-editable-table__footer ds-editable-table__footer--centered">
            <ds-button 
              variant="ghost" 
              size="sm"
              leadingIcon="remixAddLine"
              (clicked)="onAddRow()">
              {{ addRowButtonText() }}
            </ds-button>
          </div>
        }
      </div>
    </div>
  `,
})
export class DsEditableTableComponent<T = any> {
  // Inputs
  /** Array of data to display and edit in the table (two-way binding) */
  data = model.required<T[]>();
  
  /** Column definitions for the table */
  columns = input.required<ColumnDef<T>[]>();
  
  /** Enable drag-and-drop row reordering (disables sorting when true) */
  reorderable = input<boolean>(true);
  
  /** Show drag handle column (only when reorderable is true) */
  showDragHandle = input<boolean>(true);
  
  /** Allow adding new rows */
  allowAddRow = input<boolean>(true);
  
  /** Allow deleting rows */
  allowDeleteRow = input<boolean>(true);
  
  /** Template for new rows */
  newRowTemplate = input<Partial<T>>();
  
  /** Message to display when table is empty */
  emptyMessage = input<string>('No data available');
  
  /** Text for add row button */
  addRowButtonText = input<string>('Add line');

  // Outputs
  /** Emitted when a row is added */
  rowAdded = output<T>();
  
  /** Emitted when a row is deleted */
  rowDeleted = output<{ row: T; index: number }>();
  
  /** Emitted when a row is reordered */
  rowReordered = output<{ from: number; to: number }>();
  
  /** Emitted when a cell value changes */
  cellEdited = output<{ row: T; rowIndex: number; column: string; value: any }>();
  
  /** Emitted when a cell value is committed (on blur or Enter) */
  cellCommitted = output<{ row: T; rowIndex: number; column: string; value: any }>();
  
  /** Emitted when an action button is clicked */
  actionClicked = output<{ action: string; rowIndex: number; row?: T }>();
  
  /** Emitted when sorting changes (only when reorderable is false) */
  sortingChanged = output<SortingState>();

  // Internal state
  private sorting = signal<SortingState>([]);

  // Enhanced columns with drag handle and actions
  enhancedColumns = computed<ColumnDef<T>[]>(() => {
    const cols: ColumnDef<T>[] = [];
    
    // Add drag handle column if reorderable
    if (this.reorderable() && this.showDragHandle()) {
      cols.push({
        id: '_drag-handle',
        header: '',
        size: 40,
        cell: () => ({ component: 'drag-handle', data: { row: {}, rowIndex: 0, value: null } }),
        enableSorting: false,
      });
    }
    
    // Add user columns with sorting control
    cols.push(...this.columns().map(col => ({
      ...col,
      enableSorting: !this.reorderable() && (col.enableSorting ?? true),
    })));
    
    // Add actions column if delete is allowed
    if (this.allowDeleteRow()) {
      cols.push({
        id: '_actions',
        header: '',
        size: 80,
        cell: (info) => ({ 
          component: 'action', 
          data: { 
            row: info.row.original, 
            rowIndex: info.row.index, 
            value: null,
            deleteDisabled: false 
          } 
        }),
        enableSorting: false,
      });
    }
    
    return cols;
  });

  // Create TanStack table instance
  table = createAngularTable<T>(() => ({
    data: this.data(),
    columns: this.enhancedColumns(),
    state: {
      sorting: this.sorting(),
    },
    onSortingChange: (updater) => {
      const next = updater instanceof Function 
        ? updater(this.sorting()) 
        : updater;
      this.sorting.set(next);
      this.sortingChanged.emit(next);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: !this.reorderable() ? getSortedRowModel() : undefined,
    enableSorting: !this.reorderable(),
  }));

  // Row management methods
  onAddRow() {
    const newRow = this.newRowTemplate() || this.createEmptyRow();
    this.data.update(rows => [...rows, newRow as T]);
    this.rowAdded.emit(newRow as T);
  }

  onDeleteRow(index: number) {
    const row = this.data()[index];
    this.data.update(rows => rows.filter((_, i) => i !== index));
    this.rowDeleted.emit({ row, index });
  }

  onActionClicked(event: { action: string; rowIndex: number; row?: any }) {
    this.actionClicked.emit({
      action: event.action,
      rowIndex: event.rowIndex,
      row: event.row || this.data()[event.rowIndex]
    });
  }

  onRowDrop(event: CdkDragDrop<T[]>) {
    if (!this.reorderable()) return;
    
    const dataArray = [...this.data()];
    moveItemInArray(dataArray, event.previousIndex, event.currentIndex);
    this.data.set(dataArray);
    this.rowReordered.emit({ 
      from: event.previousIndex, 
      to: event.currentIndex 
    });
  }

  onCellEdit(rowIndex: number, column: string, value: any) {
    // Get the accessor key from the column
    const col = this.columns().find(c => c.id === column || (c as any).accessorKey === column);
    const accessorKey = col ? ((col as any).accessorKey || col.id) : column;
    
    this.data.update(rows => {
      const updated = [...rows];
      updated[rowIndex] = { ...updated[rowIndex], [accessorKey]: value };
      return updated;
    });
    
    this.cellEdited.emit({ 
      row: this.data()[rowIndex], 
      rowIndex,
      column: accessorKey, 
      value 
    });
  }
  
  onCellCommit(rowIndex: number, column: string, value: any) {
    // Get the accessor key from the column
    const col = this.columns().find(c => c.id === column || (c as any).accessorKey === column);
    const accessorKey = col ? ((col as any).accessorKey || col.id) : column;
    
    this.cellCommitted.emit({ 
      row: this.data()[rowIndex], 
      rowIndex,
      column: accessorKey, 
      value 
    });
  }

  private createEmptyRow(): Partial<T> {
    // Create empty object based on columns
    const empty: any = {};
    this.columns().forEach(col => {
      const accessorKey = (col as any).accessorKey;
      if (accessorKey) {
        const meta = col.meta as DsEditableTableColumnMeta | undefined;
        empty[accessorKey] = meta?.['defaultValue'] ?? '';
      }
    });
    return empty;
  }

  /**
   * Size variant mapping to pixel values
   */
  private readonly sizeVariants: Record<string, string> = {
    'none': 'auto',
    'xs': '96px',
    'sm': '128px',
    'md': '192px',
    'lg': '256px',
    'xl': '320px',
    '2xl': '384px',
  };

  /**
   * Convert size variant or custom value to CSS value
   */
  private getSizeValue(size?: string): string | undefined {
    if (!size) return undefined;
    return this.sizeVariants[size] || size;
  }

  /**
   * Get fixed width for a column
   */
  getColumnWidth(column: any): string | undefined {
    const meta = column.columnDef?.meta as DsEditableTableColumnMeta | undefined;
    const width = meta?.sizing?.width;
    return width;
  }

  /**
   * Get minimum width style for a column
   */
  getColumnMinWidth(column: any): string | undefined {
    const meta = column.columnDef?.meta as DsEditableTableColumnMeta | undefined;
    const minWidth = meta?.sizing?.minWidth;
    return this.getSizeValue(minWidth);
  }

  /**
   * Get maximum width style for a column
   */
  getColumnMaxWidth(column: any): string | undefined {
    const meta = column.columnDef?.meta as DsEditableTableColumnMeta | undefined;
    const maxWidth = meta?.sizing?.maxWidth;
    return this.getSizeValue(maxWidth);
  }

  /**
   * Check if column should truncate text
   */
  shouldTruncateColumn(column: any): boolean {
    const meta = column.columnDef?.meta as DsEditableTableColumnMeta | undefined;
    const sizing = meta?.sizing;
    
    if (!sizing) return false;
    
    // If truncate is explicitly set, use that value
    if (sizing.truncate !== undefined) {
      return sizing.truncate;
    }
    
    // Default to true if maxWidth is set (and not 'none')
    return !!sizing.maxWidth && sizing.maxWidth !== 'none';
  }

  /**
   * Get column alignment
   */
  getColumnAlign(column: any): 'left' | 'right' | 'center' | undefined {
    const meta = column.columnDef?.meta as DsEditableTableColumnMeta | undefined;
    return meta?.align;
  }

  /**
   * Check if cell content is an editable component cell
   */
  isEditableComponentCell(content: any): boolean {
    return content && typeof content === 'object' && 'component' in content && 'data' in content;
  }

  /**
   * Merge cell data with column alignment
   */
  mergeCellDataWithAlignment(cellData: any, column: any): any {
    const align = this.getColumnAlign(column);
    return align ? { ...cellData, align } : cellData;
  }
}

