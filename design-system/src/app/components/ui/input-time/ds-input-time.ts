import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, effect, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DsInputComponent } from '../input/ds-input';

/**
 * A specialized time input component that wraps ds-input with time-specific functionality.
 * Perfect for time entry in forms, schedules, and recurrence pickers.
 * Always uses 24-hour format (HH:mm).
 * 
 * @example
 * Basic usage:
 * ```html
 * <ds-input-time 
 *   [(ngModel)]="startTime">
 * </ds-input-time>
 * ```
 * 
 * @example
 * With ghost mode for inline editing:
 * ```html
 * <ds-input-time 
 *   [ghost]="true"
 *   [(ngModel)]="eventTime">
 * </ds-input-time>
 * ```
 */
@Component({
  selector: 'ds-input-time',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsInputComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-input-time.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsInputTimeComponent), multi: true }
  ],
  template: `
    <div class="ds-input-time-wrapper">
      <ds-input
        type="time"
        [ngModel]="timeValue()"
        (ngModelChange)="onTimeChange($event)"
        (blurred)="onBlur()"
        [placeholder]="''"
        [ghost]="ghost()"
        [variant]="variant()"
        [disabled]="effectiveDisabled()"
        [readonly]="readonly()"
        [required]="required()"
        [clearable]="clearable()"
        [leadingIcon]="'remixTimeLine'"
        [ariaLabel]="ariaLabel()"
        [ariaDescribedBy]="ariaDescribedBy()"
        [ariaLabelledBy]="ariaLabelledBy()"
        [lang]="'en-US'"
        [class.ds-input-time--empty]="isEmpty()"
      />
    </div>
  `,
})
export class DsInputTimeComponent implements ControlValueAccessor {
  // Inputs
  variant = input<'default' | 'error' | 'warning' | 'success'>('default');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  clearable = input<boolean>(false);
  ghost = input<boolean>(false);
  ariaLabel = input<string>();
  ariaDescribedBy = input<string>();
  ariaLabelledBy = input<string>();

  // Outputs
  valueChange = output<string>();

  // Internal state
  private timeValueSig = signal<string>('');
  private disabledFromCva = signal<boolean>(false);
  private onTouched: () => void = () => {};
  private onChange: (value: string) => void = () => {};

  // Computed properties
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  isEmpty = computed(() => {
    const value = this.timeValueSig();
    return !value || value.trim() === '';
  });

  constructor(private cdr: ChangeDetectorRef) {
    // Force change detection when timeValueSig changes to ensure class updates
    effect(() => {
      // Access the signal to create a dependency
      this.timeValueSig();
      this.isEmpty();
      // Mark for check to ensure class binding updates
      this.cdr.markForCheck();
    });
  }

  timeValue = computed(() => {
    const value = this.timeValueSig();
    return value || '';
  });

  // Event handlers
  onTimeChange(value: string): void {
    // HTML5 time input returns value in HH:mm format (24h)
    this.timeValueSig.set(value || '');
    this.onChange(value || '');
    this.valueChange.emit(value || '');
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null | undefined): void {
    if (value === null || value === undefined) {
      this.timeValueSig.set('');
      return;
    }
    
    // HTML5 time input expects 24h format (HH:mm)
    this.timeValueSig.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}

