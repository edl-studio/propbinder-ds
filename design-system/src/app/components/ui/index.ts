/**
 * UI Components Barrel Exports
 * 
 * Centralized exports for all UI components to simplify imports
 */

// Component exports
export { DsButtonComponent } from './button/ds-button';
export { DsIconComponent } from './icon/ds-icon';
export { DsInputComponent } from './input/ds-input';
export { DsTextareaComponent } from './textarea/ds-textarea';
export { DsCheckboxComponent } from './checkbox/ds-checkbox';
export { DsFormFieldComponent } from './form-field/ds-form-field';
export { DsLabelComponent } from './label/ds-label';
export { DsTooltipComponent } from './tooltip/ds-tooltip';
export { DsAvatarComponent } from './avatar/ds-avatar';
export { DsBadgeComponent } from './badge/ds-badge';
export { DsShapeIndicatorComponent } from './shape-indicator/ds-shape-indicator';
export { DsInlineMessageComponent } from './inline-message/ds-inline-message';
export { DsLinkComponent } from './link/ds-link';
export { DsTopbarComponent } from './topbar/ds-topbar';
export { DsHeaderDetailsComponent } from './header-details/ds-header-details';
export { DsSidebarComponent, type SidebarGroup } from './sidebar/ds-sidebar';
export { DsDataItemComponent } from './data-item/ds-data-item';
export { DsMetadataItemComponent } from './metadata-item/ds-metadata-item';
export { DsListItemComponent } from './list-item/ds-list-item';
export { DsListComponent } from './list/ds-list';
export { type TopbarBreadcrumbItem } from './topbar/ds-topbar-breadcrumb';

export { DsSelectComponent } from './select/ds-select';
export { DsDatepickerComponent } from './datepicker/ds-datepicker';
export { DsAppLayoutComponent } from './app-layout/ds-app-layout';
export { DsDrawerComponent } from './drawer/ds-drawer';
export { DsDataTableComponent } from './data-table/ds-data-table';
export { 
  DsDataTableEditableCell,
  DsDataTableActionsCell,
  DsDataTableBadgeCell,
  DsDataTableCheckboxCell,
  createEditableColumn,
  createActionsColumn
} from './data-table/ds-data-table-cells';
export {
  IconTextCellComponent,
  BadgeCellComponent,
  DateCellComponent,
  type IconTextCellData,
  type BadgeCellData,
  type DateCellData,
  type CellComponentData
} from './data-table/cells';
export {
  iconTextCell,
  badgeCell,
  dateCell,
  type ComponentCell
} from './data-table/cell-helpers';
export { 
  DsEditableTableComponent,
  type EditableTableColumn,
  type EditableColumnSizing,
  type DsEditableTableColumnMeta
} from './editable-table/ds-editable-table';
export {
  EditableTextCellComponent,
  EditableNumberCellComponent,
  EditableSelectCellComponent,
  type EditableTextCellData,
  type EditableNumberCellData,
  type EditableSelectCellData
} from './editable-table/cells';
export {
  editableTextCell,
  editableNumberCell,
  editableSelectCell,
  type EditableComponentCell
} from './editable-table/editable-cell-helpers';
export { DsTileComponent } from './tile/ds-tile';
export { DsTileSectionComponent } from './tile/ds-tile-section';
export { TileHeaderComponent } from './tile/tile-header';

// Type exports
export type { ButtonVariant, ButtonSize } from './button/ds-button';
export type { InputVariant, InputType } from './input/ds-input';
export type { TextareaVariant, TextareaSize } from './textarea/ds-textarea';
export type { CheckboxVariant, CheckboxSize } from './checkbox/ds-checkbox';
export type { AvatarType, AvatarSize } from './avatar/ds-avatar';
export type { BadgeVariant, BadgeContentType } from './badge/ds-badge';
export type { ShapeVariant, ShapeColorVariant } from './shape-indicator/ds-shape-indicator';
export type { InlineMessageVariant } from './inline-message/ds-inline-message';
export type { DataItemLayout, DataItemValueType } from './data-item/ds-data-item';
export type { SelectVariant, DsSelectOption } from './select/ds-select';
export type { DatePickerVariant } from './datepicker/ds-datepicker';
export type { 
  DataTableColumn, 
  ColumnSizing, 
  DsDataTableColumnMeta 
} from './data-table/ds-data-table';
export type { TileOrientation } from './tile/ds-tile';