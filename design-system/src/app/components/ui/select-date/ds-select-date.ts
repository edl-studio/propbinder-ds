import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DsDatepickerComponent } from '../../datepicker/ds-datepicker';
import { DsInputComponent } from '../../input/ds-input';

/**
 * A specialized date selector component that wraps ds-datepicker with a styled input trigger.
 * Perfect for inline editing in task drawers and forms with ghost mode support.
 * 
 * @example
 * Basic usage:
 * ```html
 * <ds-select-date 
 *   [(ngModel)]="dueDate"
 *   placeholder="Select date">
 * </ds-select-date>
 * ```
 * 
 * @example
 * With ghost mode for inline editing:
 * ```html
 * <ds-form-field label="Due Date" layout="horizontal">
 *   <ds-select-date 
 *     [ghost]="true"
 *     [(ngModel)]="task.dueDate">
 *   </ds-select-date>
 * </ds-form-field>
 * ```
 */
@Component({
  selector: 'ds-select-date',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsDatepickerComponent,
    DsInputComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-select-date.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsSelectDateComponent), multi: true }
  ],
  template: `
    <ds-datepicker
      [(ngModel)]="selectedDate"
      (ngModelChange)="onDateChange($event)"
      [variant]="variant()"
      [disabled]="effectiveDisabled()"
      [disableFutureDates]="disableFutureDates()"
      [isDateDisabled]="isDateDisabled()"
      (opened)="onDatepickerOpened()"
      (closed)="onDatepickerClosed()"
    >
      <ds-input
        [ngModel]="formattedDate()"
        [placeholder]="placeholder()"
        [ghost]="ghost()"
        [variant]="variant()"
        [disabled]="effectiveDisabled()"
        [leadingIcon]="'remixCalendarLine'"
        [trailingIcon]="'remixArrowDownSLine'"
        [readonly]="true"
        [class.ds-select-date__input--open]="isDatepickerOpen()"
        [class.ds-select-date__input--empty]="isEmpty()"
      />
    </ds-datepicker>
  `,
})
export class DsSelectDateComponent implements ControlValueAccessor {
  // Inputs
  placeholder = input<string>('Select date');
  variant = input<'default' | 'error' | 'warning' | 'success'>('default');
  disabled = input<boolean>(false);
  ghost = input<boolean>(false);
  dateFormat = input<'short' | 'medium' | 'long'>('medium');
  disableFutureDates = input<boolean>(false);
  isDateDisabled = input<((date: Date) => boolean) | undefined>(undefined);

  // Outputs
  valueChange = output<Date | null>();

  // Internal state
  selectedDate = signal<Date | null>(null);
  private disabledFromCva = signal<boolean>(false);
  private isDatepickerOpenSig = signal<boolean>(false);
  private onTouched: () => void = () => {};
  private onChange: (value: Date | null) => void = () => {};

  // Computed properties
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  isDatepickerOpen = computed(() => this.isDatepickerOpenSig());
  isEmpty = computed(() => !this.selectedDate());

  formattedDate = computed(() => {
    const date = this.selectedDate();
    if (!date) return '';

    const format = this.dateFormat();
    const options: Intl.DateTimeFormatOptions = format === 'short'
      ? { month: 'numeric', day: 'numeric', year: 'numeric' }
      : format === 'long'
      ? { month: 'long', day: 'numeric', year: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric' }; // medium (default)

    return date.toLocaleDateString(undefined, options);
  });

  // Event handlers
  onDateChange(date: Date | null): void {
    this.selectedDate.set(date);
    this.onChange(date);
    this.valueChange.emit(date);
  }

  onDatepickerOpened(): void {
    this.isDatepickerOpenSig.set(true);
  }

  onDatepickerClosed(): void {
    this.isDatepickerOpenSig.set(false);
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | null): void {
    this.selectedDate.set(value);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}

