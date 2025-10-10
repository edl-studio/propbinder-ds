import {
  Component,
  ViewEncapsulation,
  input,
  output,
  computed,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsInputComponent } from '../input/ds-input';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';
import { DsAvatarComponent } from '../avatar/ds-avatar';
import { DsSelectComponent, type DsSelectOption } from '../select/ds-select';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
  createAngularTable,
  flexRenderComponent,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';

export type DataTableColumn<T = any> = ColumnDef<T>;

/**
 * Column sizing configuration for controlling width constraints
 */
export interface ColumnSizing {
  /** Minimum width - prevents column from shrinking below this size */
  minWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
  /** Maximum width - prevents column from growing beyond this size */
  maxWidth?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
  /** Enable text truncation with ellipsis (default: true when maxWidth is set) */
  truncate?: boolean;
}

/**
 * Extended column meta interface for ds-data-table
 */
export interface DsDataTableColumnMeta {
  /** Column sizing configuration */
  sizing?: ColumnSizing;
  [key: string]: any;
}

/**
 * A powerful data table component built on TanStack Table with sorting, filtering,
 * searching, pagination, and inline editing capabilities.
 *
 * Supports both client-side and server-side pagination modes:
 * - **Client-side**: All data is loaded and filtered/sorted/paginated in the browser (default)
 * - **Server-side**: Parent component handles data fetching, ideal for large datasets
 *
 * @example
 * Client-side pagination (default):
 * ```html
 * <ds-data-table
 *   [data]="users"
 *   [columns]="userColumns"
 *   [searchable]="true"
 *   [paginated]="true">
 * </ds-data-table>
 * ```
 *
 * @example
 * Server-side pagination:
 * ```html
 * <ds-data-table
 *   [data]="currentPageUsers"
 *   [columns]="userColumns"
 *   [serverSide]="true"
 *   [totalItems]="totalUserCount"
 *   [currentPage]="pageIndex"
 *   (pageChanged)="onPageChange($event)"
 *   (searchChanged)="onSearch($event)"
 *   (sortingChanged)="onSort($event)">
 * </ds-data-table>
 * ```
 *
 * @example
 * With custom page size:
 * ```html
 * <ds-data-table
 *   [data]="products"
 *   [columns]="productColumns"
 *   [pageSize]="20"
 *   [pageSizeOptions]="[10, 20, 50, 100]">
 * </ds-data-table>
 * ```
 */
@Component({
  selector: 'ds-data-table',
  imports: [
    CommonModule,
    FormsModule,
    FlexRenderDirective,
    DsInputComponent,
    DsButtonComponent,
    DsIconComponent,
    DsAvatarComponent,
    DsSelectComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-data-table.css'],
  template: `
    <div class="ds-data-table">
      <!-- Column Visibility Panel -->
      @if (showColumnVisibility() && columnPanelOpen()) {
      <div class="ds-data-table__column-panel elevation-tile tw-rounded-lg">
        <div class="ds-data-table__column-panel-header">
          <span class="label-xs-semibold">Toggle Columns</span>
          <button
            class="ds-data-table__column-panel-close"
            (click)="toggleColumnPanel()"
            aria-label="Close column panel"
          >
            <ds-icon name="remixCloseLine" size="16px" />
          </button>
        </div>
        <div class="ds-data-table__column-panel-content">
          @for (column of hidableColumns(); track column.id) {
          <label class="ds-data-table__column-toggle">
            <input
              type="checkbox"
              [checked]="column.getIsVisible()"
              (change)="column.toggleVisibility()"
            />
            <span class="ui-xs-regular tw-text-default-tertiary">{{
              getColumnLabel(column)
            }}</span>
          </label>
          }
        </div>
      </div>
      }

      <!-- Table Container -->
      <div class="ds-data-table__container elevation-tile tw-rounded-lg">
        <!-- Search and Actions Bar -->
        @if (searchable() || showColumnVisibility()) {
        <div class="ds-data-table__header">
          <!-- Global Search -->
          @if (searchable()) {
          <div class="ds-data-table__search">
            <ds-input
              type="text"
              [placeholder]="searchPlaceholder()"
              leadingIcon="remixSearchLine"
              [clearable]="true"
              (valueChange)="onGlobalFilterChange($event)"
            />
          </div>
          }

          <!-- Column Visibility Toggle -->
          @if (showColumnVisibility()) {
          <div class="ds-data-table__actions">
            <ds-button
              variant="secondary"
              size="sm"
              leadingIcon="remixLayoutColumnLine"
              (clicked)="toggleColumnPanel()"
            >
              Columns
            </ds-button>
          </div>
          }
        </div>
        }

        <div class="ds-data-table__scroll">
          <table class="ds-data-table__table">
            <thead class="ds-data-table__thead">
              @for (headerGroup of table().getHeaderGroups(); track
              headerGroup.id) {
              <tr class="ds-data-table__tr">
                @for (header of headerGroup.headers; track header.id) {
                <th
                  class="ds-data-table__th"
                  [class.ds-data-table__th--truncate]="
                    shouldTruncateColumn(header.column)
                  "
                  [attr.colSpan]="header.colSpan"
                  [style.width]="
                    header.getSize() !== 150 ? header.getSize() + 'px' : 'auto'
                  "
                  [style.min-width]="getColumnMinWidth(header.column)"
                  [style.max-width]="getColumnMaxWidth(header.column)"
                >
                  @if (!header.isPlaceholder) { @if (header.column.getCanSort())
                  {
                  <button
                    [class]="
                      header.column.getIsSorted()
                        ? 'ds-data-table__sort-button ds-data-table__sort-button--active'
                        : 'ds-data-table__sort-button'
                    "
                    (click)="header.column.toggleSorting()"
                  >
                    <ng-container
                      *flexRender="
                        header.column.columnDef.header;
                        props: header.getContext();
                        let headerText
                      "
                    >
                      <span [innerHTML]="headerText"></span>
                    </ng-container>
                    @if (header.column.getIsSorted()) {
                    <ds-icon
                      [name]="
                        header.column.getIsSorted() === 'asc'
                          ? 'remixArrowUpLine'
                          : 'remixArrowDownLine'
                      "
                      size="14px"
                      color="var(--text-color-default-primary)"
                      class="ds-data-table__sort-icon"
                    />
                    }
                  </button>
                  } @else {
                  <ng-container
                    *flexRender="
                      header.column.columnDef.header;
                      props: header.getContext();
                      let headerText
                    "
                  >
                    <span [innerHTML]="headerText"></span>
                  </ng-container>
                  } }
                </th>
                }
              </tr>
              }
            </thead>
            <tbody class="ds-data-table__tbody">
              @for (row of table().getRowModel().rows; track row.id) {
              <tr
                class="ds-data-table__tr ds-data-table__tr--body"
                [class.ds-data-table__tr--selected]="row.getIsSelected()"
                [class.ds-data-table__tr--clickable]="rowClickable()"
                (click)="onRowClick(row.original)"
              >
                @for (cell of row.getVisibleCells(); track cell.id) {
                <td
                  class="ds-data-table__td"
                  [class.ds-data-table__td--truncate]="
                    shouldTruncateColumn(cell.column)
                  "
                  [style.min-width]="getColumnMinWidth(cell.column)"
                  [style.max-width]="getColumnMaxWidth(cell.column)"
                >
                  <ng-container
                    *flexRender="
                      cell.column.columnDef.cell;
                      props: cell.getContext();
                      let cellContent
                    "
                  >
                    <div [innerHTML]="cellContent"></div>
                  </ng-container>
                </td>
                }
              </tr>
              } @empty {
              <tr class="ds-data-table__tr">
                <td
                  class="ds-data-table__td ds-data-table__td--empty"
                  [attr.colspan]="columns().length"
                >
                  <div class="ds-data-table__empty">
                    <ds-avatar
                      type="icon"
                      iconName="remixInboxLine"
                      size="md"
                    />
                    <span class="body-md-medium">{{ emptyMessage() }}</span>
                  </div>
                </td>
              </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        @if (paginated() && effectiveRowCount() > 0) {
        <div class="ds-data-table__footer tw-text-default-secondary">
          <div class="ds-data-table__info">
            <span class="body-xs-regular">
              Showing
              {{
                table().getState().pagination.pageIndex *
                  table().getState().pagination.pageSize +
                  1
              }}
              to
              {{
                Math.min(
                  (table().getState().pagination.pageIndex + 1) *
                    table().getState().pagination.pageSize,
                  effectiveRowCount()
                )
              }}
              of {{ effectiveRowCount() }} results
            </span>
          </div>

          <div class="ds-data-table__pagination">
            <!-- Page Size Selector -->
            <div class="ds-data-table__page-size">
              <label class="body-xs-regular">Rows per page:</label>
              <ds-select
                [options]="pageSizeSelectOptions()"
                [(ngModel)]="selectedPageSize"
                (ngModelChange)="onPageSizeChange($event)"
              />
            </div>

            <!-- Pagination Buttons -->
            <div class="ds-data-table__pagination-buttons">
              <ds-button
                variant="ghost"
                size="sm"
                [iconOnly]="true"
                leadingIcon="remixArrowLeftSLine"
                [disabled]="!table().getCanPreviousPage()"
                (clicked)="onPreviousPage()"
                ariaLabel="Previous page"
              />

              <span class="body-xs-regular">
                Page {{ table().getState().pagination.pageIndex + 1 }} of
                {{ effectivePageCount() }}
              </span>

              <ds-button
                variant="ghost"
                size="sm"
                [iconOnly]="true"
                leadingIcon="remixArrowRightSLine"
                [disabled]="!table().getCanNextPage()"
                (clicked)="onNextPage()"
                ariaLabel="Next page"
              />
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class DsDataTableComponent<T = any> {
  // Inputs
  /** Array of data to display in the table */
  data = input.required<T[]>();

  /** Column definitions for the table */
  columns = input.required<ColumnDef<T>[]>();

  /** Enable global search functionality */
  searchable = input<boolean>(true);

  /** Placeholder text for search input */
  searchPlaceholder = input<string>('Search...');

  /** Enable pagination */
  paginated = input<boolean>(true);

  /** Number of rows per page */
  pageSize = input<number>(10);

  /** Available page size options */
  pageSizeOptions = input<number[]>([5, 10, 20, 50, 100]);

  /** Show column visibility toggle */
  showColumnVisibility = input<boolean>(true);

  /** Message to display when table is empty */
  emptyMessage = input<string>('No data available');

  /** Make rows clickable */
  rowClickable = input<boolean>(false);

  /** Enable row selection */
  selectable = input<boolean>(false);

  /** Enable server-side pagination mode (parent component handles data fetching) */
  serverSide = input<boolean>(false);

  /** Total count of items (required for server-side pagination) */
  totalItems = input<number>(0);

  /** Current page index (for server-side pagination) */
  currentPage = input<number>(0);

  // Outputs
  /** Emitted when a row is clicked */
  rowClicked = output<T>();

  /** Emitted when sorting changes */
  sortingChanged = output<SortingState>();

  /** Emitted when filters change */
  filtersChanged = output<ColumnFiltersState>();

  /** Emitted when data is updated (for inline editing) */
  dataUpdated = output<T[]>();

  /** Emitted when page changes (for server-side pagination) */
  pageChanged = output<{ pageIndex: number; pageSize: number }>();

  /** Emitted when search query changes (for server-side pagination) */
  searchChanged = output<string>();

  // Internal state
  private columnFilters = signal<ColumnFiltersState>([]);
  private sorting = signal<SortingState>([]);
  private paginationState = signal<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });
  private globalFilterSig = signal<string>('');
  protected columnPanelOpen = signal<boolean>(false);
  protected selectedPageSize = signal<number>(10);

  // Expose Math for template
  protected Math = Math;

  globalFilter = computed(() => this.globalFilterSig());

  // Convert page size options to select options
  pageSizeSelectOptions = computed<DsSelectOption<number>[]>(() =>
    this.pageSizeOptions().map((size) => ({
      id: `page-size-${size}`,
      label: size.toString(),
      value: size,
    }))
  );

  // Computed page count for server-side mode
  serverPageCount = computed(() => {
    if (!this.serverSide()) return 0;
    const pageSize = this.paginationState().pageSize;
    return Math.ceil(this.totalItems() / pageSize);
  });

  // Computed row count
  effectiveRowCount = computed(() =>
    this.serverSide() ? this.totalItems() : this.table().getRowCount()
  );

  // Computed page count
  effectivePageCount = computed(() =>
    this.serverSide() ? this.serverPageCount() : this.table().getPageCount()
  );

  // Create TanStack table instance
  table: any = createAngularTable<T>(() => ({
    data: this.data(),
    columns: this.columns(),
    state: {
      columnFilters: this.columnFilters(),
      sorting: this.sorting(),
      pagination: this.paginationState(),
      globalFilter: this.globalFilter(),
    },
    onColumnFiltersChange: (updater) => {
      const next =
        updater instanceof Function ? updater(this.columnFilters()) : updater;
      this.columnFilters.set(next);
      this.filtersChanged.emit(next);
    },
    onSortingChange: (updater) => {
      const next =
        updater instanceof Function ? updater(this.sorting()) : updater;
      this.sorting.set(next);
      this.sortingChanged.emit(next);
    },
    onPaginationChange: (updater) => {
      updater instanceof Function
        ? this.paginationState.update(updater)
        : this.paginationState.set(updater);
    },
    onGlobalFilterChange: (updater) => {
      const next =
        updater instanceof Function ? updater(this.globalFilter()) : updater;
      this.globalFilterSig.set(next);
    },
    getCoreRowModel: getCoreRowModel(),
    // Only use filtering/sorting/pagination models in client-side mode
    getFilteredRowModel: !this.serverSide() ? getFilteredRowModel() : undefined,
    getSortedRowModel: !this.serverSide() ? getSortedRowModel() : undefined,
    getPaginationRowModel:
      this.paginated() && !this.serverSide()
        ? getPaginationRowModel()
        : undefined,
    // In server-side mode, disable automatic processing
    manualPagination: this.serverSide(),
    manualSorting: this.serverSide(),
    manualFiltering: this.serverSide(),
    pageCount: this.serverSide() ? this.serverPageCount() : undefined,
    enableSorting: true,
    enableFiltering: true,
    enableGlobalFilter: this.searchable(),
    initialState: {
      pagination: {
        pageSize: this.pageSize(),
        pageIndex: 0,
      },
    },
  }));

  hidableColumns = computed(() =>
    this.table()
      .getAllColumns()
      .filter((column: any) => column.getCanHide())
  );

  constructor() {
    // Initialize selected page size from input
    effect(
      () => {
        this.selectedPageSize.set(this.pageSize());
      },
      { allowSignalWrites: true }
    );

    // Sync currentPage input with internal state (for server-side pagination)
    effect(
      () => {
        if (this.serverSide()) {
          this.paginationState.update((state) => ({
            ...state,
            pageIndex: this.currentPage(),
          }));
        }
      },
      { allowSignalWrites: true }
    );
  }

  // Event handlers
  handleSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onGlobalFilterChange(value);
  }

  onGlobalFilterChange(value: string) {
    this.globalFilterSig.set(value);

    if (this.serverSide()) {
      // Emit event for parent to handle
      this.searchChanged.emit(value);
      // Reset to first page on search
      this.table().setPageIndex(0);
      this.pageChanged.emit({
        pageIndex: 0,
        pageSize: this.table().getState().pagination.pageSize,
      });
    } else {
      // Handle client-side search
      this.table().setGlobalFilter(value);
    }
  }

  onPageSizeChange(size: number) {
    this.selectedPageSize.set(size);
    this.table().setPageSize(size);
    this.table().setPageIndex(0);

    if (this.serverSide()) {
      // Emit event for parent to handle
      this.pageChanged.emit({ pageIndex: 0, pageSize: size });
    }
  }

  onPreviousPage() {
    this.table().previousPage();

    if (this.serverSide()) {
      const state = this.table().getState().pagination;
      this.pageChanged.emit({
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
      });
    }
  }

  onNextPage() {
    this.table().nextPage();

    if (this.serverSide()) {
      const state = this.table().getState().pagination;
      this.pageChanged.emit({
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
      });
    }
  }

  onRowClick(row: T) {
    if (this.rowClickable()) {
      this.rowClicked.emit(row);
    }
  }

  toggleColumnPanel() {
    this.columnPanelOpen.update((v) => !v);
  }

  getColumnLabel(column: any): string {
    // Try to get a meaningful label from the column
    const id = column.id || '';
    return id.replace(/([A-Z])/g, ' $1').trim() || 'Column';
  }

  /**
   * Size variant mapping to pixel values
   */
  private readonly sizeVariants: Record<string, string> = {
    none: 'auto',
    xs: '96px',
    sm: '128px',
    md: '192px',
    lg: '256px',
    xl: '320px',
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
   * Get minimum width style for a column
   */
  getColumnMinWidth(column: any): string | undefined {
    const meta = column.columnDef?.meta as DsDataTableColumnMeta | undefined;
    const minWidth = meta?.sizing?.minWidth;
    return this.getSizeValue(minWidth);
  }

  /**
   * Get maximum width style for a column
   */
  getColumnMaxWidth(column: any): string | undefined {
    const meta = column.columnDef?.meta as DsDataTableColumnMeta | undefined;
    const maxWidth = meta?.sizing?.maxWidth;
    return this.getSizeValue(maxWidth);
  }

  /**
   * Check if column should truncate text
   */
  shouldTruncateColumn(column: any): boolean {
    const meta = column.columnDef?.meta as DsDataTableColumnMeta | undefined;
    const sizing = meta?.sizing;

    if (!sizing) return false;

    // If truncate is explicitly set, use that value
    if (sizing.truncate !== undefined) {
      return sizing.truncate;
    }

    // Default to true if maxWidth is set (and not 'none')
    return !!sizing.maxWidth && sizing.maxWidth !== 'none';
  }
}
