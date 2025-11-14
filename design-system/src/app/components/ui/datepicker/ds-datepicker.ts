import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, ViewChild, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NgpDatePicker,
  NgpDatePickerLabel,
  NgpDatePickerNextMonth,
  NgpDatePickerPreviousMonth,
  NgpDatePickerGrid,
  NgpDatePickerCell,
  NgpDatePickerRowRender,
  NgpDatePickerCellRender,
  NgpDatePickerDateButton,
} from 'ng-primitives/date-picker';
import { OverlayModule, ConnectedPosition, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DsIconComponent } from '../icon/ds-icon';

export type DatePickerVariant = 'default' | 'error' | 'warning' | 'success';

/**
 * A datepicker component for selecting dates.
 * Features a calendar interface with content projection for custom triggers.
 * 
 * @example
 * With button trigger:
 * ```html
 * <ds-datepicker [(ngModel)]="selectedDate">
 *   <ds-button variant="secondary">Select Date</ds-button>
 * </ds-datepicker>
 * ```
 * 
 * @example
 * With input trigger:
 * ```html
 * <ds-datepicker [(ngModel)]="selectedDate">
 *   <ds-input 
 *     [value]="selectedDate ? selectedDate.toLocaleDateString() : ''" 
 *     placeholder="Select date"
 *     readonly />
 * </ds-datepicker>
 * ```
 * 
 * @example
 * With custom trigger:
 * ```html
 * <ds-datepicker [(ngModel)]="selectedDate">
 *   <button class="my-custom-trigger">{{ selectedDate || 'Pick a date' }}</button>
 * </ds-datepicker>
 * ```
 */
@Component({
  selector: 'ds-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    NgpDatePicker,
    NgpDatePickerLabel,
    NgpDatePickerNextMonth,
    NgpDatePickerPreviousMonth,
    NgpDatePickerGrid,
    NgpDatePickerCell,
    NgpDatePickerRowRender,
    NgpDatePickerCellRender,
    NgpDatePickerDateButton,
    DsIconComponent,
    OverlayModule,
    CdkOverlayOrigin,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-datepicker.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsDatepickerComponent), multi: true }
  ],
  template: `
    <div [class]="containerClasses()">
      <div 
        #trigger
        cdkOverlayOrigin
        #triggerOrigin="cdkOverlayOrigin"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'dialog'"
        (click)="toggleDatepicker()"
        class="ds-datepicker__trigger-wrapper"
      >
        <ng-content></ng-content>
      </div>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="triggerElement"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayScrollStrategy]="scrollStrategy"
      [cdkConnectedOverlayFlexibleDimensions]="true"
      [cdkConnectedOverlayPush]="true"
      [cdkConnectedOverlayViewportMargin]="8"
      (backdropClick)="closeDatepicker()"
      (detach)="closeDatepicker()"
    >
      <div [class]="calendarClasses()" ngpDatePicker [ngpDatePickerFirstDayOfWeek]="1" [(ngpDatePickerDate)]="internalValue" (ngpDatePickerDateChange)="handleDateChange($event)" [(ngpDatePickerFocusedDate)]="focusedDate" (ngpDatePickerFocusedDateChange)="handleFocusedDateChange($event)">
        <div class="ds-datepicker__header">
          <button 
            ngpDatePickerPreviousMonth 
            type="button"
            class="ds-datepicker__nav-button"
            [disabled]="effectiveDisabled()"
            [attr.aria-label]="'Previous month'">
            <ds-icon name="remixArrowLeftSLine" size="16px" />
          </button>
          
          <h2 ngpDatePickerLabel class="ds-datepicker__label label-sm-semibold">
            {{ label() }}
          </h2>
          
          <button 
            ngpDatePickerNextMonth 
            type="button"
            class="ds-datepicker__nav-button"
            [disabled]="effectiveDisabled()"
            [attr.aria-label]="'Next month'">
            <ds-icon name="remixArrowRightSLine" size="16px" />
          </button>
        </div>
        
        <table ngpDatePickerGrid class="ds-datepicker__grid">
          <thead>
            <tr>
              @for (day of weekDays(); track day.full) {
                <th scope="col" [attr.abbr]="day.full" class="ds-datepicker__weekday body-xs-medium">
                  {{ day.short }}
                </th>
              }
            </tr>
          </thead>
          <tbody>
            <tr *ngpDatePickerRowRender>
              <td *ngpDatePickerCellRender="let date" ngpDatePickerCell>
                <button 
                  ngpDatePickerDateButton 
                  type="button"
                  class="ds-datepicker__date-button body-sm-regular"
                  [disabled]="effectiveDisabled() || isDateDisabledFn(date)">
                  {{ date.getDate() }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ng-template>
  `,
})
export class DsDatepickerComponent implements ControlValueAccessor {
  @ViewChild('trigger', { read: ElementRef }) triggerElement!: ElementRef<HTMLElement>;
  @ViewChild('triggerOrigin', { static: true }) triggerOriginDirective!: CdkOverlayOrigin;
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideDatepicker = target.closest('.ds-datepicker');
    const isInsideCalendar = target.closest('.ds-datepicker__calendar');
    
    if (!isInsideDatepicker && !isInsideCalendar && this.isOpen()) {
      this.closeDatepicker();
    }
  }

  // Inputs
  variant = input<DatePickerVariant>('default');
  disabled = input<boolean>(false);
  placeholder = input<string>('Select date');
  ariaLabel = input<string>();
  ariaDescribedBy = input<string>();
  disableFutureDates = input<boolean>(false);
  isDateDisabled = input<((date: Date) => boolean) | undefined>();
  /** Locale to use for date formatting (e.g., 'en-US', 'de-DE', 'fr-FR'). Defaults to browser locale. */
  locale = input<string | undefined>(undefined);

  // Outputs
  dateChange = output<Date | null>();
  opened = output<void>();
  closed = output<void>();

  // Internal state
  private valueSig = signal<Date | null>(null);
  private disabledFromCva = signal<boolean>(false);
  private focusedDateSig = signal<Date>(new Date());
  private isOpenSig = signal<boolean>(false);

  internalValue: Date | null = null;
  focusedDate: Date = new Date();
  
  value = computed(() => this.valueSig());
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  isOpen = computed(() => this.isOpenSig());
  
  // Overlay service and scroll strategy
  private overlay = inject(Overlay);
  scrollStrategy: ScrollStrategy = this.overlay.scrollStrategies.reposition();
  
  // Overlay configuration
  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ];
  
  // Label computed from focused date (which tracks the currently displayed month)
  label = computed(() => {
    const date = this.focusedDateSig();
    const locale = this.locale() || navigator.language;
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      const today = new Date();
      const monthName = today.toLocaleString(locale, { month: 'long' });
      // Capitalize first letter
      const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      return `${capitalizedMonth} ${today.getFullYear()}`;
    }
    const monthName = date.toLocaleString(locale, { month: 'long' });
    // Capitalize first letter
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return `${capitalizedMonth} ${date.getFullYear()}`;
  });

  // Combined date disabled logic
  effectiveIsDateDisabled = computed(() => {
    const customDisabled = this.isDateDisabled();
    const disableFuture = this.disableFutureDates();
    
    if (!disableFuture && !customDisabled) {
      return undefined;
    }
    
    return (date: Date): boolean => {
      // Check custom disabled function first
      if (customDisabled && customDisabled(date)) {
        return true;
      }
      
      // Check if future dates should be disabled
      if (disableFuture) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate > today;
      }
      
      return false;
    };
  });
  
  // Week days starting with Monday (generated dynamically based on locale)
  weekDays = computed(() => {
    const locale = this.locale() || navigator.language;
    const weekDays: { short: string; full: string }[] = [];
    
    // Generate weekday names starting with Monday (ISO 8601 standard)
    // Create dates for a week that starts with Monday
    // Using Jan 1, 2024 as reference (Monday)
    const baseDate = new Date(2024, 0, 1); // Jan 1, 2024 is a Monday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      
      const full = date.toLocaleDateString(locale, { weekday: 'long' });
      const short = date.toLocaleDateString(locale, { weekday: 'narrow' });
      
      weekDays.push({ short, full });
    }
    
    return weekDays;
  });

  containerClasses = computed(() => {
    const classes = ['ds-datepicker'];
    if (this.isOpen()) classes.push('ds-datepicker--open');
    return classes.join(' ');
  });

  calendarClasses = computed(() => {
    const classes = ['ds-datepicker__calendar', `ds-datepicker__calendar--${this.variant()}`];
    if (this.effectiveDisabled()) classes.push('ds-datepicker__calendar--disabled');
    return classes.join(' ');
  });

  toggleDatepicker() {
    if (this.effectiveDisabled()) return;
    
    const newState = !this.isOpenSig();
    this.isOpenSig.set(newState);
    
    if (newState) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  closeDatepicker() {
    if (this.isOpenSig()) {
      this.isOpenSig.set(false);
      this.closed.emit();
    }
  }

  handleDateChange(date: Date | null) {
    this.valueSig.set(date);
    this.internalValue = date;
    this.onChangeFn(date);
    this.dateChange.emit(date);
    
    // Update focused date when date changes
    if (date) {
      this.focusedDate = date;
      this.focusedDateSig.set(date);
    }
    
    // Close the datepicker after selection
    this.closeDatepicker();
  }

  handleFocusedDateChange(date: Date) {
    // Update the focused date signal when navigating months
    this.focusedDate = date;
    this.focusedDateSig.set(date);
  }

  isDateDisabledFn(date: Date): boolean {
    const fn = this.effectiveIsDateDisabled();
    return fn ? fn(date) : false;
  }

  // ControlValueAccessor
  private onChangeFn: (val: Date | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: Date | string | null): void {
    // Convert string to Date if needed
    let dateValue: Date | null = null;
    if (value) {
      if (typeof value === 'string') {
        dateValue = new Date(value);
        // Check if valid date
        if (isNaN(dateValue.getTime())) {
          console.warn('Invalid date string provided to datepicker:', value);
          dateValue = null;
        }
      } else if (value instanceof Date) {
        dateValue = value;
      }
    }
    
    this.valueSig.set(dateValue);
    this.internalValue = dateValue;
    if (dateValue && dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      this.focusedDate = dateValue;
      this.focusedDateSig.set(dateValue);
    }
  }

  registerOnChange(fn: (val: Date | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}

