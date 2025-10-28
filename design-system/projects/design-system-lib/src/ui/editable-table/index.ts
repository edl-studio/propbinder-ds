// Main component
export { DsEditableTableComponent, type EditableTableColumn, type EditableColumnSizing, type DsEditableTableColumnMeta } from './ds-editable-table';

// Cell components
export { 
  BaseEditableCellComponent, 
  EditableTextCellComponent, 
  EditableNumberCellComponent, 
  EditableSelectCellComponent,
  EditableDatepickerCellComponent,
  DragHandleCellComponent,
  ActionCellComponent,
  type EditableCellComponentData,
  type EditableTextCellData,
  type EditableNumberCellData,
  type EditableSelectCellData,
  type EditableDatepickerCellData,
  type ActionCellData,
  type ActionButton
} from './cells';

// Cell helpers
export { 
  editableTextCell, 
  editableNumberCell, 
  editableSelectCell,
  editableDatepickerCell,
  dragHandleCell,
  actionCell,
  actionsCell,
  isEditableComponentCell,
  type EditableComponentCell
} from './editable-cell-helpers';

// Number formatting types from input component
export { type NumberFormatConfig, type NumberFormatPreset } from '../input/ds-input';
