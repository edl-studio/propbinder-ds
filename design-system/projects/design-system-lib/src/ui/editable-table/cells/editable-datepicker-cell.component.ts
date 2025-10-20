import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsDatepickerComponent } from '../../datepicker/ds-datepicker';
import { DsInputComponent } from '../../input/ds-input';
import { BaseEditableCellComponent, type EditableCellComponentData } from './base-editable-cell.component';

export interface EditableDatepickerCellData extends EditableCellComponentData {
  /** Placeholder text */
  placeholder?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Icon to show in the input */
  leadingIcon?: string;
}

/**
 * Editable table cell component for date selection
 * Uses ds-datepicker with ds-input trigger for seamless inline editing
 */
@Component({
  selector: 'editable-datepicker-cell',
  standalone: true,
  imports: [CommonModule, FormsModule, DsDatepickerComponent, DsInputComponent],
  template: `
    <ds-datepicker
      [ngModel]="cellData().value"
      (ngModelChange)="valueChanged.emit($event)"
    >
      <ds-input
        [ngModel]="formattedDate()"
        [placeholder]="cellData().placeholder || 'Select date'"
        [disabled]="cellData().disabled || false"
        [ghost]="true"
        [leadingIcon]="cellData().leadingIcon"
        [readonly]="true"
      />
    </ds-datepicker>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      position: relative;
    }
    
    :host ::ng-deep .ds-datepicker {
      display: block;
      width: 100%;
    }
    
    :host ::ng-deep .ds-datepicker__trigger-wrapper {
      display: block;
      width: 100%;
    }
  `]
})
export class EditableDatepickerCellComponent extends BaseEditableCellComponent {
  /** Computed cell data with proper typing */
  cellData = computed(() => this.data() as EditableDatepickerCellData);
  
  /** Format date as "Mon DD, YY" */
  formattedDate = computed(() => {
    const value = this.cellData().value;
    if (!value) return '';
    
    let date: Date | null = null;
    
    // Convert string to Date if needed
    if (typeof value === 'string') {
      date = new Date(value);
    } else if (value instanceof Date) {
      date = value;
    }
    
    if (!date || isNaN(date.getTime())) {
      return value.toString();
    }
    
    // Format as "Mon DD, YY"
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    
    return `${month} ${day}, ${year}`;
  });
}

