import { Component, input } from '@angular/core';

/**
 * Base interface for all table cell components
 */
export interface CellComponentData<T = any> {
  /** The row data */
  row: T;
  /** The cell value */
  value: any;
  /** Additional context from the cell */
  context?: any;
}

/**
 * Base class for table cell components
 * Provides common functionality and type safety
 */
@Component({
  standalone: true,
  template: '',
})
export abstract class BaseCellComponent<T = any> {
  /** Cell data input */
  data = input.required<CellComponentData<T>>();
}

