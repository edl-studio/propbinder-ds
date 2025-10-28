import { Component, input, output } from '@angular/core';

/**
 * Base interface for all editable table cell components
 */
export interface EditableCellComponentData<T = any> {
  /** The row data */
  row: T;
  /** The row index */
  rowIndex: number;
  /** The cell value */
  value: any;
  /** Additional context from the cell */
  context?: any;
}

/**
 * Base class for editable table cell components
 * Provides common functionality and type safety
 */
@Component({
  standalone: true,
  template: '',
})
export abstract class BaseEditableCellComponent<T = any> {
  /** Cell data input */
  data = input.required<EditableCellComponentData<T>>();
  
  /** Emitted when the cell value changes (on every keystroke) */
  valueChanged = output<any>();
  
  /** Emitted when the value is committed (on blur or Enter key press) */
  valueCommitted = output<any>();
}

