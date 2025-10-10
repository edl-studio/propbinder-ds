import type { 
  EditableCellComponentData,
  EditableTextCellData,
  EditableNumberCellData,
  EditableSelectCellData,
  EditableDatepickerCellData,
  ActionCellData
} from './cells';
import type { DsSelectOption } from '../select/ds-select';

/**
 * Component cell result structure for editable cells
 */
export interface EditableComponentCell {
  component: string;
  data: EditableCellComponentData;
}

/**
 * Helper function to create an editable text cell
 * 
 * @example
 * ```typescript
 * {
 *   accessorKey: 'name',
 *   header: 'Name',
 *   cell: (info) => editableTextCell({
 *     row: info.row.original,
 *     rowIndex: info.row.index,
 *     value: info.getValue(),
 *     placeholder: 'Enter name...'
 *   })
 * }
 * ```
 */
export function editableTextCell(
  data: Omit<EditableTextCellData, 'value' | 'row' | 'rowIndex'> & { 
    row: any; 
    rowIndex: number;
    value: any;
  }
): EditableComponentCell {
  return {
    component: 'editable-text',
    data: data as EditableTextCellData
  };
}

/**
 * Helper function to create an editable number cell
 * 
 * @example
 * ```typescript
 * {
 *   accessorKey: 'quantity',
 *   header: 'Quantity',
 *   cell: (info) => editableNumberCell({
 *     row: info.row.original,
 *     rowIndex: info.row.index,
 *     value: info.getValue(),
 *     min: 0,
 *     step: 0.5
 *   })
 * }
 * ```
 */
export function editableNumberCell(
  data: Omit<EditableNumberCellData, 'value' | 'row' | 'rowIndex'> & { 
    row: any; 
    rowIndex: number;
    value: any;
  }
): EditableComponentCell {
  return {
    component: 'editable-number',
    data: data as EditableNumberCellData
  };
}

/**
 * Helper function to create an editable select cell
 * 
 * @example
 * ```typescript
 * {
 *   accessorKey: 'status',
 *   header: 'Status',
 *   cell: (info) => editableSelectCell({
 *     row: info.row.original,
 *     rowIndex: info.row.index,
 *     value: info.getValue(),
 *     options: [
 *       { id: '1', label: 'Active', value: 'active' },
 *       { id: '2', label: 'Inactive', value: 'inactive' }
 *     ]
 *   })
 * }
 * ```
 */
export function editableSelectCell(
  data: Omit<EditableSelectCellData, 'value' | 'row' | 'rowIndex'> & { 
    row: any; 
    rowIndex: number;
    value: any;
  }
): EditableComponentCell {
  return {
    component: 'editable-select',
    data: data as EditableSelectCellData
  };
}

/**
 * Helper function to create an editable datepicker cell
 * 
 * @example
 * ```typescript
 * {
 *   accessorKey: 'date',
 *   header: 'Date',
 *   cell: (info) => editableDatepickerCell({
 *     row: info.row.original,
 *     rowIndex: info.row.index,
 *     value: info.getValue(),
 *     placeholder: 'Select date',
 *     leadingIcon: 'remixCalendar2Line'
 *   })
 * }
 * ```
 */
export function editableDatepickerCell(
  data: Omit<EditableDatepickerCellData, 'value' | 'row' | 'rowIndex'> & { 
    row: any; 
    rowIndex: number;
    value: any;
  }
): EditableComponentCell {
  return {
    component: 'editable-datepicker',
    data: data as EditableDatepickerCellData
  };
}

/**
 * Helper function to create a drag handle cell
 */
export function dragHandleCell(): EditableComponentCell {
  return {
    component: 'drag-handle',
    data: { row: {}, rowIndex: 0, value: null }
  };
}

/**
 * Helper function to create an action cell
 */
export function actionCell(rowIndex: number, deleteDisabled: boolean = false): EditableComponentCell {
  return {
    component: 'action',
    data: { 
      row: {}, 
      rowIndex, 
      value: null,
      deleteDisabled 
    } as ActionCellData & EditableCellComponentData
  };
}

/**
 * Type guard to check if content is an editable component cell
 */
export function isEditableComponentCell(content: any): content is EditableComponentCell {
  return content && typeof content === 'object' && 'component' in content && 'data' in content;
}

