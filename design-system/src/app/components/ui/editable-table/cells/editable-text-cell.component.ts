import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsInputComponent } from '../../input/ds-input';
import { BaseEditableCellComponent, type EditableCellComponentData } from './base-editable-cell.component';

export interface EditableTextCellData extends EditableCellComponentData {
  /** Placeholder text */
  placeholder?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is readonly */
  readonly?: boolean;
  /** Icon to show at the start of the input */
  leadingIcon?: string;
  /** Icon to show at the end of the input */
  trailingIcon?: string;
  /** Text prefix to show at the start of the input */
  prefix?: string;
  /** Text suffix to show at the end of the input */
  suffix?: string;
}

/**
 * Editable table cell component for text input
 * Uses ds-input in ghost mode for seamless inline editing
 */
@Component({
  selector: 'editable-text-cell',
  standalone: true,
  imports: [CommonModule, FormsModule, DsInputComponent],
  template: `
    <ds-input
      [ngModel]="cellData().value ?? ''"
      [placeholder]="cellData().placeholder || ''"
      [disabled]="cellData().disabled || false"
      [readonly]="cellData().readonly || false"
      [ghost]="true"
      [leadingIcon]="cellData().leadingIcon"
      [trailingIcon]="cellData().trailingIcon"
      [prefix]="cellData().prefix"
      [suffix]="cellData().suffix"
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
export class EditableTextCellComponent extends BaseEditableCellComponent {
  /** Computed cell data with proper typing */
  cellData = computed(() => this.data() as EditableTextCellData);
}

