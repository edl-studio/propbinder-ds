import { Component, ViewEncapsulation, input, output, signal, computed, effect, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsInputComponent } from '../input/ds-input';
import { DsSelectComponent, DsSelectOption } from '../select/ds-select';
import { DsSelectDateComponent } from '../select-date/ds-select-date';
import { DsInlineMessageComponent } from '../inline-message/ds-inline-message';
import { DsLabelComponent } from '../label/ds-label';
import { DsRadioComponent } from '../radio/ds-radio';
import { NgpRadioGroup } from 'ng-primitives/radio';
import type { RecurrenceConfig } from '../recurrence-input/ds-recurrence-input';

@Component({
  selector: 'ds-recurrence-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsInputComponent,
    DsSelectComponent,
    DsSelectDateComponent,
    DsInlineMessageComponent,
    DsLabelComponent,
    DsRadioComponent,
    NgpRadioGroup,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-recurrence-picker.css'],
  template: `
    <div class="ds-recurrence-picker">
      <div class="ds-recurrence-picker__content">
        <!-- Start -->
        <div class="ds-recurrence-picker__field">
          <div class="ds-recurrence-picker__label-container">
            <ds-label size="md" class="ds-recurrence-picker__label">Start</ds-label>
          </div>
          <div class="ds-recurrence-picker__field-row">
            <ds-select-date
              [ngModel]="startDateValue()"
              (ngModelChange)="startDateValue.set($event)"
              [ghost]="false"
              placeholder="Select start date"
              class="ds-recurrence-picker__start-date-select"
            />
          </div>
        </div>

        <!-- Repeat -->
        <div class="ds-recurrence-picker__field">
          <div class="ds-recurrence-picker__label-container">
            <ds-label size="md" class="ds-recurrence-picker__label">Repeat</ds-label>
          </div>
          <div class="ds-recurrence-picker__field-row">
            <ds-select
              #frequencySelect
              [ngModel]="frequencyValue()"
              (ngModelChange)="onFrequencyChange($event)"
              [options]="frequencyOptions"
              class="ds-recurrence-picker__frequency-select"
            />
          </div>
        </div>

        <!-- Every -->
        <div class="ds-recurrence-picker__field" *ngIf="frequencyValue() !== 'yearly'">
          <div class="ds-recurrence-picker__label-container">
            <ds-label size="md" class="ds-recurrence-picker__label">Every</ds-label>
          </div>
          <div class="ds-recurrence-picker__field-row">
            <ds-input
              type="number"
              [ngModel]="intervalValue()"
              (ngModelChange)="intervalValue.set($event || 1)"
              class="ds-recurrence-picker__interval-input"
            />
            <span class="ds-recurrence-picker__interval-label">{{ intervalLabel() }}</span>
          </div>
        </div>

        <!-- Every (for yearly - month selector) -->
        <div class="ds-recurrence-picker__field" *ngIf="frequencyValue() === 'yearly'">
          <div class="ds-recurrence-picker__label-container">
            <ds-label size="md" class="ds-recurrence-picker__label">Every</ds-label>
          </div>
          <div class="ds-recurrence-picker__field-row">
            <ds-select
              #yearlyMonthSelect
              [ngModel]="yearlyMonthValue()"
              (valueChange)="onYearlyMonthChange($event)"
              [options]="monthOptions"
              class="ds-recurrence-picker__yearly-month-select"
            />
          </div>
        </div>

        <!-- On (only for weekly) -->
        <div class="ds-recurrence-picker__field" *ngIf="frequencyValue() === 'weekly'">
          <div class="ds-recurrence-picker__label-container">
            <ds-label size="md" class="ds-recurrence-picker__label">On</ds-label>
          </div>
          <div class="ds-recurrence-picker__field-row">
            <div class="ds-recurrence-picker__days">
              <button
                *ngFor="let day of weekDays; trackBy: trackByDayIndex"
                type="button"
                class="ds-recurrence-picker__day-button"
                [class.ds-recurrence-picker__day-button--selected]="selectedDays().includes(day.index)"
                (click)="toggleDay(day.index)"
              >
                {{ day.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- On (only for monthly and yearly) -->
        <div class="ds-recurrence-picker__field" *ngIf="frequencyValue() === 'monthly' || frequencyValue() === 'yearly'">
          <div class="ds-recurrence-picker__label-container">
            <ds-label size="md" class="ds-recurrence-picker__label">On</ds-label>
          </div>
          <div class="ds-recurrence-picker__field-row">
            <div class="ds-recurrence-picker__monthly-options">
              <div ngpRadioGroup [ngpRadioGroupValue]="monthlyTypeValue()" (ngpRadioGroupValueChange)="onMonthlyTypeChange($event)" class="ds-recurrence-picker__monthly-radio-group">
                <!-- Day of month option -->
                <div class="ds-recurrence-picker__monthly-option-row">
                  <ds-radio value="dayOfMonth" [showLabel]="false" ariaLabel="Day of month" class="ds-recurrence-picker__monthly-radio"></ds-radio>
                  <ds-select
                    #monthlyDaySelect
                    [ngModel]="monthlyDayValue()"
                    (valueChange)="onMonthlyDayChange($event)"
                    [options]="monthlyDayOptions"
                    [disabled]="monthlyTypeValue() !== 'dayOfMonth'"
                    class="ds-recurrence-picker__monthly-day-select"
                  />
                  <span class="ds-recurrence-picker__monthly-day-label">day</span>
                </div>
                
                <!-- Ordinal day option -->
                <div class="ds-recurrence-picker__monthly-option-row">
                  <ds-radio value="ordinal" [showLabel]="false" ariaLabel="Ordinal day" class="ds-recurrence-picker__monthly-radio"></ds-radio>
                  <ds-select
                    #ordinalSelect
                    [ngModel]="monthlyOrdinalValue()"
                    (valueChange)="onMonthlyOrdinalChange($event)"
                    [options]="ordinalOptions"
                    [disabled]="monthlyTypeValue() !== 'ordinal'"
                    class="ds-recurrence-picker__monthly-ordinal-select"
                  />
                  <ds-select
                    #ordinalDaySelect
                    [ngModel]="monthlyOrdinalDayValue()"
                    (valueChange)="onMonthlyOrdinalDayChange($event)"
                    [options]="ordinalDayOptions"
                    [disabled]="monthlyTypeValue() !== 'ordinal'"
                    class="ds-recurrence-picker__monthly-ordinal-day-select"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- End -->
        <div class="ds-recurrence-picker__field">
          <div class="ds-recurrence-picker__label-container">
            <ds-label size="md" class="ds-recurrence-picker__label">End</ds-label>
          </div>
          <div class="ds-recurrence-picker__field-row">
            <ds-select
              #endTypeSelect
              [ngModel]="endTypeValue()"
              (valueChange)="onEndTypeChange($event)"
              [options]="endTypeOptions"
              [class.ds-recurrence-picker__end-type-select--after]="endTypeValue() === 'after'"
              class="ds-recurrence-picker__end-type-select"
            />
            @if (endTypeValue() === 'on') {
              <ds-select-date
                [ngModel]="endDateValue()"
                (ngModelChange)="endDateValue.set($event)"
                [ghost]="false"
                placeholder="Select date"
                class="ds-recurrence-picker__end-date-select"
              />
            }
            @if (endTypeValue() === 'after') {
              <ds-input
                type="number"
                [ngModel]="endCountValue() || 1"
                (ngModelChange)="endCountValue.set($event || 1)"
                class="ds-recurrence-picker__end-count-input"
              />
              <span class="ds-recurrence-picker__end-count-label">occurrences</span>
            }
          </div>
        </div>

        <!-- Summary -->
        <ds-inline-message 
          variant="information" 
          [title]="summaryText()"
          [description]="startDateText()"
          [showIcon]="false">
        </ds-inline-message>
      </div>

    </div>
  `,
})
export class DsRecurrencePickerComponent implements AfterViewInit {
  // Inputs
  config = input<RecurrenceConfig | null>(null);
  startDate = input<Date | null>(null);

  // Outputs
  save = output<RecurrenceConfig>();
  cancel = output<void>();

  // ViewChild
  @ViewChild('frequencySelect') frequencySelect?: DsSelectComponent<'daily' | 'weekly' | 'monthly' | 'yearly'>;
  @ViewChild('yearlyMonthSelect') yearlyMonthSelect?: DsSelectComponent<number>;
  @ViewChild('monthlyDaySelect') monthlyDaySelect?: DsSelectComponent<number>;
  @ViewChild('ordinalSelect') ordinalSelect?: DsSelectComponent<'first' | 'second' | 'third' | 'fourth' | 'last'>;
  @ViewChild('ordinalDaySelect') ordinalDaySelect?: DsSelectComponent<number>;
  @ViewChild('endTypeSelect') endTypeSelect?: DsSelectComponent<'never' | 'on' | 'after'>;

  // Internal state
  startDateValue = signal<Date>(new Date());
  intervalValue = signal<number>(1);
  frequencyValue = signal<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  selectedDays = signal<number[]>([]); // 0-6 where 0=Monday, 6=Sunday
  monthlyTypeValue = signal<'dayOfMonth' | 'ordinal'>('dayOfMonth');
  monthlyDayValue = signal<number>(1); // 1-31
  monthlyOrdinalValue = signal<'first' | 'second' | 'third' | 'fourth' | 'last'>('first');
  monthlyOrdinalDayValue = signal<number>(0); // 0-6 where 0=Monday, 6=Sunday
  yearlyMonthValue = signal<number>(new Date().getMonth()); // 0-11 where 0=January, 11=December
  endTypeValue = signal<'never' | 'on' | 'after'>('never');
  endDateValue = signal<Date | null>(null);
  endCountValue = signal<number | null>(1);

  // Week days (Monday=0, Sunday=6)
  weekDays = [
    { index: 0, label: 'M' },
    { index: 1, label: 'T' },
    { index: 2, label: 'W' },
    { index: 3, label: 'T' },
    { index: 4, label: 'F' },
    { index: 5, label: 'S' },
    { index: 6, label: 'S' },
  ];

  // Options
  frequencyOptions: DsSelectOption<'daily' | 'weekly' | 'monthly' | 'yearly'>[] = [
    { id: 'freq-daily', value: 'daily', label: 'Daily' },
    { id: 'freq-weekly', value: 'weekly', label: 'Weekly' },
    { id: 'freq-monthly', value: 'monthly', label: 'Monthly' },
    { id: 'freq-yearly', value: 'yearly', label: 'Yearly' },
  ];

  monthOptions: DsSelectOption<number>[] = [
    { id: 'month-jan', value: 0, label: 'January' },
    { id: 'month-feb', value: 1, label: 'February' },
    { id: 'month-mar', value: 2, label: 'March' },
    { id: 'month-apr', value: 3, label: 'April' },
    { id: 'month-may', value: 4, label: 'May' },
    { id: 'month-jun', value: 5, label: 'June' },
    { id: 'month-jul', value: 6, label: 'July' },
    { id: 'month-aug', value: 7, label: 'August' },
    { id: 'month-sep', value: 8, label: 'September' },
    { id: 'month-oct', value: 9, label: 'October' },
    { id: 'month-nov', value: 10, label: 'November' },
    { id: 'month-dec', value: 11, label: 'December' },
  ];

  endTypeOptions: DsSelectOption<'never' | 'on' | 'after'>[] = [
    { id: 'end-on', value: 'on', label: 'on this date' },
    { id: 'end-after', value: 'after', label: 'after' },
    { id: 'end-never', value: 'never', label: 'no end date' },
  ];

  ordinalOptions: DsSelectOption<'first' | 'second' | 'third' | 'fourth' | 'last'>[] = [
    { id: 'ord-first', value: 'first', label: 'first' },
    { id: 'ord-second', value: 'second', label: 'second' },
    { id: 'ord-third', value: 'third', label: 'third' },
    { id: 'ord-fourth', value: 'fourth', label: 'fourth' },
    { id: 'ord-last', value: 'last', label: 'last' },
  ];

  ordinalDayOptions: DsSelectOption<number>[] = [
    { id: 'ord-day-mon', value: 0, label: 'Monday' },
    { id: 'ord-day-tue', value: 1, label: 'Tuesday' },
    { id: 'ord-day-wed', value: 2, label: 'Wednesday' },
    { id: 'ord-day-thu', value: 3, label: 'Thursday' },
    { id: 'ord-day-fri', value: 4, label: 'Friday' },
    { id: 'ord-day-sat', value: 5, label: 'Saturday' },
    { id: 'ord-day-sun', value: 6, label: 'Sunday' },
  ];

  monthlyDayOptions: DsSelectOption<number>[] = Array.from({ length: 31 }, (_, i) => ({
    id: `monthly-day-${i + 1}`,
    value: i + 1,
    label: String(i + 1),
  }));

  // Computed
  isWeekly = computed(() => this.frequencyValue() === 'weekly');

  intervalLabel = computed(() => {
    const frequency = this.frequencyValue();
    const interval = this.intervalValue();
    const labels: Record<typeof frequency, string> = {
      daily: interval === 1 ? 'day' : 'days',
      weekly: interval === 1 ? 'week' : 'weeks',
      monthly: interval === 1 ? 'month' : 'months',
      yearly: '', // Not used for yearly
    };
    return labels[frequency];
  });

  summaryText = computed(() => {
    const interval = this.intervalValue();
    const frequency = this.frequencyValue();
    const days = this.selectedDays();
    const monthlyType = this.monthlyTypeValue();
    const monthlyDay = this.monthlyDayValue();
    const monthlyOrdinal = this.monthlyOrdinalValue();
    const monthlyOrdinalDay = this.monthlyOrdinalDayValue();
    const yearlyMonth = this.yearlyMonthValue();
    const endType = this.endTypeValue();
    const endDate = this.endDateValue();
    const endCount = this.endCountValue();
    
    const frequencyLabels: Record<typeof frequency, string> = {
      daily: 'day',
      weekly: 'week',
      monthly: 'month',
      yearly: 'year',
    };

    const plural = interval > 1 ? 's' : '';
    const freqLabel = frequencyLabels[frequency] + plural;
    
    let text = `Occurs every ${interval} ${freqLabel}`;
    
    // For weekly, add the selected days
    if (frequency === 'weekly' && days.length > 0) {
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const selectedDayNames = days.map(dayIndex => dayNames[dayIndex]);
      if (selectedDayNames.length === 1) {
        text += ` on ${selectedDayNames[0]}`;
      } else if (selectedDayNames.length > 1) {
        text += ` on ${selectedDayNames.join(', ')}`;
      }
    }
    
    // For monthly, add the day specification
    if (frequency === 'monthly') {
      if (monthlyType === 'dayOfMonth') {
        text += ` on day ${monthlyDay}`;
      } else if (monthlyType === 'ordinal') {
        const ordinalLabels: Record<typeof monthlyOrdinal, string> = {
          first: 'first',
          second: 'second',
          third: 'third',
          fourth: 'fourth',
          last: 'last',
        };
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        text += ` on the ${ordinalLabels[monthlyOrdinal]} ${dayNames[monthlyOrdinalDay]}`;
      }
    }
    
    // For yearly, add the month and day specification
    if (frequency === 'yearly') {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = monthNames[yearlyMonth];
      
      if (monthlyType === 'dayOfMonth') {
        text += ` on ${monthName} ${monthlyDay}`;
      } else if (monthlyType === 'ordinal') {
        const ordinalLabels: Record<typeof monthlyOrdinal, string> = {
          first: 'first',
          second: 'second',
          third: 'third',
          fourth: 'fourth',
          last: 'last',
        };
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        text += ` on the ${ordinalLabels[monthlyOrdinal]} ${dayNames[monthlyOrdinalDay]} of ${monthName}`;
      }
    }
    
    // Add end condition
    if (endType === 'on' && endDate) {
      const endDateStr = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      text += ` until ${endDateStr}`;
    } else if (endType === 'after' && endCount) {
      text += ` for ${endCount} ${endCount === 1 ? 'time' : 'times'}`;
    }
    
    return text;
  });

  startDateText = computed(() => {
    const date = this.startDateValue();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `Starting ${dayName}, ${dateStr}`;
  });

  constructor(private cdr: ChangeDetectorRef) {
    // Initialize from config if provided
    const initialConfig = this.config();
    const initialStartDate = this.startDate() || new Date();
    if (initialConfig) {
      this.startDateValue.set(initialConfig.startDate);
      this.intervalValue.set(initialConfig.interval);
      this.frequencyValue.set(initialConfig.frequency);
      this.selectedDays.set(initialConfig.daysOfWeek || []);
      this.yearlyMonthValue.set(initialConfig.yearlyMonth ?? initialStartDate.getMonth());
      // Initialize monthly/yearly day from config or start date
      if (initialConfig.monthlyDay !== undefined) {
        this.monthlyDayValue.set(initialConfig.monthlyDay);
      } else {
        this.monthlyDayValue.set(initialStartDate.getDate());
      }
      this.endTypeValue.set(initialConfig.endType);
      this.endDateValue.set(initialConfig.endDate || null);
      this.endCountValue.set(initialConfig.endCount || null);
    } else {
      this.startDateValue.set(initialStartDate);
      this.yearlyMonthValue.set(initialStartDate.getMonth());
      // Initialize selected days from start date (convert JS day to our index: 0=Monday)
      const jsDay = initialStartDate.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
      const ourDay = jsDay === 0 ? 6 : jsDay - 1; // Convert to 0=Monday, 6=Sunday
      this.selectedDays.set([ourDay]);
      // Initialize monthly day from start date
      this.monthlyDayValue.set(initialStartDate.getDate());
      // Initialize ordinal day from start date
      const startDayOfWeek = jsDay === 0 ? 6 : jsDay - 1; // Convert to 0=Monday, 6=Sunday
      this.monthlyOrdinalDayValue.set(startDayOfWeek);
    }

    // Update "On" field when start date or frequency changes (only if not already set)
    effect(() => {
      const startDate = this.startDateValue();
      const frequency = this.frequencyValue();
      
      if (frequency === 'weekly') {
        // Preselect same weekday as start date
        const jsDay = startDate.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
        const ourDay = jsDay === 0 ? 6 : jsDay - 1; // Convert to 0=Monday, 6=Sunday
        if (!this.selectedDays().includes(ourDay)) {
          this.selectedDays.set([ourDay]);
        }
      } else if (frequency === 'monthly' || frequency === 'yearly') {
        // Only preselect day of month if using dayOfMonth type
        if (this.monthlyTypeValue() === 'dayOfMonth') {
          const dayOfMonth = startDate.getDate();
          this.monthlyDayValue.set(dayOfMonth);
        }
      }
    });
  }

  ngAfterViewInit() {
    // Manually sync the select value with our signal
    // This is a workaround because ngModelChange might not be firing
    if (this.frequencySelect) {
      // Check the value periodically (not ideal, but works as a fallback)
      const checkFrequencyValue = () => {
        const selectValue = this.frequencySelect?.value();
        if (selectValue !== undefined && selectValue !== this.frequencyValue()) {
          this.frequencyValue.set(selectValue as 'daily' | 'weekly' | 'monthly' | 'yearly');
          this.cdr.detectChanges();
        }
      };
      
      // Check immediately
      setTimeout(checkFrequencyValue, 0);
      
      // Also set up an interval to check periodically (fallback)
      setInterval(checkFrequencyValue, 100);
    }

    // Watch ordinal select values - check periodically even if ViewChild isn't available yet
    const checkOrdinalValue = () => {
      // Re-query ViewChild in case it wasn't available initially (conditional rendering)
      if (!this.ordinalSelect) {
        // Try to find it in the view
        return;
      }
      const selectValue = this.ordinalSelect.value();
      if (selectValue !== undefined && selectValue !== this.monthlyOrdinalValue()) {
        this.monthlyOrdinalValue.set(selectValue as 'first' | 'second' | 'third' | 'fourth' | 'last');
        this.cdr.detectChanges();
      }
    };
    
    setTimeout(checkOrdinalValue, 0);
    setInterval(checkOrdinalValue, 100);

    // Watch ordinal day select values - check periodically even if ViewChild isn't available yet
    const checkOrdinalDayValue = () => {
      // Re-query ViewChild in case it wasn't available initially (conditional rendering)
      if (!this.ordinalDaySelect) {
        // Try to find it in the view
        return;
      }
      const selectValue = this.ordinalDaySelect.value();
      if (selectValue !== undefined && selectValue !== this.monthlyOrdinalDayValue()) {
        this.monthlyOrdinalDayValue.set(selectValue as number);
        this.cdr.detectChanges();
      }
    };
    
    setTimeout(checkOrdinalDayValue, 0);
    setInterval(checkOrdinalDayValue, 100);

    // Watch monthly day select values - check periodically even if ViewChild isn't available yet
    const checkMonthlyDayValue = () => {
      if (!this.monthlyDaySelect) {
        return;
      }
      const selectValue = this.monthlyDaySelect.value();
      if (selectValue !== undefined && selectValue !== this.monthlyDayValue()) {
        this.monthlyDayValue.set(selectValue as number);
        this.cdr.detectChanges();
      }
    };
    
    setTimeout(checkMonthlyDayValue, 0);
    setInterval(checkMonthlyDayValue, 100);

    // Watch yearly month select values - check periodically even if ViewChild isn't available yet
    const checkYearlyMonthValue = () => {
      if (!this.yearlyMonthSelect) {
        return;
      }
      const selectValue = this.yearlyMonthSelect.value();
      if (selectValue !== undefined && selectValue !== this.yearlyMonthValue()) {
        this.yearlyMonthValue.set(selectValue as number);
        this.cdr.detectChanges();
      }
    };
    
    setTimeout(checkYearlyMonthValue, 0);
    setInterval(checkYearlyMonthValue, 100);

    // Watch end type select values - check periodically even if ViewChild isn't available yet
    const checkEndTypeValue = () => {
      if (!this.endTypeSelect) {
        return;
      }
      const selectValue = this.endTypeSelect.value();
      if (selectValue !== undefined && selectValue !== this.endTypeValue()) {
        this.endTypeValue.set(selectValue as 'never' | 'on' | 'after');
        this.cdr.detectChanges();
      }
    };
    
    setTimeout(checkEndTypeValue, 0);
    setInterval(checkEndTypeValue, 100);
  }

  onFrequencyChange(value: 'daily' | 'weekly' | 'monthly' | 'yearly') {
    this.frequencyValue.set(value);
    this.cdr.detectChanges();
  }

  onMonthlyTypeChange(value: 'dayOfMonth' | 'ordinal' | null) {
    if (value) {
      this.monthlyTypeValue.set(value);
    }
  }

  onEndTypeChange(value: 'never' | 'on' | 'after') {
    this.endTypeValue.set(value);
    this.cdr.detectChanges();
  }

  onYearlyMonthChange(value: number) {
    this.yearlyMonthValue.set(value);
    this.cdr.detectChanges();
  }

  onMonthlyDayChange(value: number) {
    this.monthlyDayValue.set(value);
    this.cdr.detectChanges();
  }

  onMonthlyOrdinalChange(value: 'first' | 'second' | 'third' | 'fourth' | 'last') {
    this.monthlyOrdinalValue.set(value);
    this.cdr.detectChanges();
  }

  onMonthlyOrdinalDayChange(value: number) {
    this.monthlyOrdinalDayValue.set(value);
    this.cdr.detectChanges();
  }

  trackByDayIndex(index: number, day: { index: number; label: string }): number {
    return day.index;
  }

  toggleDay(dayIndex: number) {
    const current = this.selectedDays();
    if (current.includes(dayIndex)) {
      // Remove if already selected
      this.selectedDays.set(current.filter(d => d !== dayIndex));
    } else {
      // Add if not selected
      this.selectedDays.set([...current, dayIndex].sort());
    }
  }

  handleSave() {
    const config: RecurrenceConfig = {
      frequency: this.frequencyValue(),
      interval: this.intervalValue(),
      endType: this.endTypeValue(),
      endDate: this.endTypeValue() === 'on' ? this.endDateValue() || undefined : undefined,
      endCount: this.endTypeValue() === 'after' ? this.endCountValue() || undefined : undefined,
      startDate: this.startDateValue(),
      daysOfWeek: this.frequencyValue() === 'weekly' ? this.selectedDays() : undefined,
      yearlyMonth: this.frequencyValue() === 'yearly' ? this.yearlyMonthValue() : undefined,
      monthlyDay: (this.frequencyValue() === 'monthly' || this.frequencyValue() === 'yearly') && this.monthlyTypeValue() === 'dayOfMonth' ? this.monthlyDayValue() : undefined,
    };
    this.save.emit(config);
  }

  getCurrentConfig(): RecurrenceConfig {
    return {
      frequency: this.frequencyValue(),
      interval: this.intervalValue(),
      endType: this.endTypeValue(),
      endDate: this.endTypeValue() === 'on' ? this.endDateValue() || undefined : undefined,
      endCount: this.endTypeValue() === 'after' ? this.endCountValue() || undefined : undefined,
      startDate: this.startDateValue(),
      daysOfWeek: this.frequencyValue() === 'weekly' ? this.selectedDays() : undefined,
      yearlyMonth: this.frequencyValue() === 'yearly' ? this.yearlyMonthValue() : undefined,
      monthlyDay: (this.frequencyValue() === 'monthly' || this.frequencyValue() === 'yearly') && this.monthlyTypeValue() === 'dayOfMonth' ? this.monthlyDayValue() : undefined,
    };
  }

  handleCancel() {
    this.cancel.emit();
  }
}

