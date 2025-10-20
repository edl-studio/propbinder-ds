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
      (ngModelChange)="valueChanged.emit($event)"
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
}

