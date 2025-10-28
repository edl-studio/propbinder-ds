import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsSelectComponent, type DsSelectOption } from '../../select/ds-select';
import { BaseEditableCellComponent, type EditableCellComponentData } from './base-editable-cell.component';

export interface EditableSelectCellData extends EditableCellComponentData {
  /** Select options */
  options: DsSelectOption<any>[];
  /** Placeholder text */
  placeholder?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Text alignment (automatically set from column meta.align) */
  align?: 'left' | 'right' | 'center';
}

/**
 * Editable table cell component for select dropdown
 * Uses ds-select in ghost mode for seamless inline editing
 */
@Component({
  selector: 'editable-select-cell',
  standalone: true,
  imports: [CommonModule, FormsModule, DsSelectComponent],
  template: `
    <ds-select
      [options]="cellData().options"
      [placeholder]="cellData().placeholder || 'Select...'"
      [disabled]="cellData().disabled || false"
      [ghost]="true"
      [ngModel]="cellData().value"
      (ngModelChange)="onValueChange($event)"
    />
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class EditableSelectCellComponent extends BaseEditableCellComponent {
  /** Computed cell data with proper typing */
  cellData = computed(() => this.data() as EditableSelectCellData);
  
  /**
   * Handle value change - emit both valueChanged and valueCommitted
   * For selects, every change is a committed change since it's a discrete action
   * Only emit if the value actually changed
   */
  onValueChange(value: any) {
    // Only emit if value actually changed
    if (this.cellData().value !== value) {
      this.valueChanged.emit(value);
      this.valueCommitted.emit(value);
    }
  }
}

