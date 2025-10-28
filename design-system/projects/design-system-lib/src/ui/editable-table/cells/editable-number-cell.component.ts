import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsInputComponent, type NumberFormatConfig } from '../../input/ds-input';
import { BaseEditableCellComponent, type EditableCellComponentData } from './base-editable-cell.component';

export interface EditableNumberCellData extends EditableCellComponentData {
  /** Placeholder text */
  placeholder?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is readonly */
  readonly?: boolean;
  /** Number format configuration */
  format?: NumberFormatConfig;
  /** Suffix text (e.g., currency code) */
  suffix?: string;
  /** Prefix text (e.g., currency symbol) */
  prefix?: string;
  /** Text alignment (automatically set from column meta.align) */
  align?: 'left' | 'right' | 'center';
}

/**
 * Editable table cell component for number input
 * Uses ds-input with type="number" in ghost mode
 */
@Component({
  selector: 'editable-number-cell',
  standalone: true,
  imports: [CommonModule, FormsModule, DsInputComponent],
  template: `
    <ds-input
      type="text"
      [ngModel]="cellData().value?.toString() ?? ''"
      [placeholder]="cellData().placeholder || ''"
      [disabled]="cellData().disabled || false"
      [readonly]="cellData().readonly || false"
      [format]="getEffectiveFormat()"
      [suffix]="cellData().suffix"
      [prefix]="cellData().prefix"
      [ghost]="true"
      (ngModelChange)="onValueChange($event)"
      (blurred)="onBlur()"
      (keydown.enter)="onEnter()"
    />
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class EditableNumberCellComponent extends BaseEditableCellComponent {
  /** Computed cell data with proper typing */
  cellData = computed(() => this.data() as EditableNumberCellData);
  
  /** Track the original value when editing starts to detect actual changes */
  private originalValue: number | null = null;
  private isEditing = false;
  
  /**
   * Get effective format by merging cell format with alignment
   */
  getEffectiveFormat(): NumberFormatConfig | undefined {
    const cellFormat = this.cellData().format;
    const cellAlign = this.cellData().align;
    
    // If no format and no align, return undefined
    if (!cellFormat && !cellAlign) {
      return undefined;
    }
    
    // If format exists, merge with align
    if (cellFormat) {
      return {
        ...cellFormat,
        align: cellAlign || cellFormat.align
      };
    }
    
    // If only align exists, create minimal format
    return { align: cellAlign };
  }
  
  onValueChange(val: string) {
    // Track that we've started editing and capture the original value
    if (!this.isEditing) {
      this.originalValue = this.cellData().value;
      this.isEditing = true;
    }
    
    // When format is used, val is already the raw unformatted value
    // Otherwise, it's the direct input value
    const num = parseFloat(val);
    this.valueChanged.emit(isNaN(num) ? null : num);
  }
  
  /**
   * Handle blur event - emit committed value only if it actually changed
   */
  onBlur() {
    // Only emit if value actually changed during this edit session
    if (this.isEditing && this.originalValue !== this.cellData().value) {
      this.valueCommitted.emit(this.cellData().value);
    }
    
    // Reset tracking
    this.isEditing = false;
    this.originalValue = null;
  }
  
  /**
   * Handle Enter key - emit committed value only if it actually changed
   */
  onEnter() {
    // Only emit if value actually changed during this edit session
    if (this.isEditing && this.originalValue !== this.cellData().value) {
      this.valueCommitted.emit(this.cellData().value);
    }
    
    // Reset tracking
    this.isEditing = false;
    this.originalValue = null;
  }
}

