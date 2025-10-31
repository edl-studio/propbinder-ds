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
  /** Locale to use for date formatting (e.g., 'en-US', 'de-DE', 'fr-FR'). Defaults to browser locale. */
  locale?: string;
  /** Date format options for Intl.DateTimeFormat. Defaults to { year: '2-digit', month: 'short', day: 'numeric' } */
  dateFormat?: Intl.DateTimeFormatOptions;
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
      (ngModelChange)="onDateChange($event)"
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
  
  /** Format date using browser's locale formatting or custom format */
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
    
    // Use custom format options or default to short format
    const formatOptions = this.cellData().dateFormat || {
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    };
    
    const locale = this.cellData().locale || navigator.language; // Use browser language if not specified
    
    return date.toLocaleDateString(locale, formatOptions);
  });

  /**
   * Handle date change - emit both valueChanged and valueCommitted
   * Since datepicker closes after selection, treat it as a committed change
   */
  onDateChange(value: any) {
    this.valueChanged.emit(value);
    this.valueCommitted.emit(value);
  }
}

