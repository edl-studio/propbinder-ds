import { Component, ViewEncapsulation, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsInputComponent } from '../input/ds-input';
import { DsSelectComponent, DsSelectOption } from '../select/ds-select';
import { DsSelectDateComponent } from '../select-date/ds-select-date';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';
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
    DsButtonComponent,
    DsIconComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-recurrence-picker.css'],
  template: `
    <div class="ds-recurrence-picker">
      <div class="ds-recurrence-picker__header">
        <h3 class="ds-recurrence-picker__title">Recurrence</h3>
      </div>

      <div class="ds-recurrence-picker__content">
        <!-- Repeats every -->
        <div class="ds-recurrence-picker__field">
          <label class="ds-recurrence-picker__label">Repeats every</label>
          <div class="ds-recurrence-picker__field-row">
            <ds-input
              type="number"
              [ngModel]="intervalValue()"
              (ngModelChange)="intervalValue.set($event || 1)"
              class="ds-recurrence-picker__interval-input"
            />
            <ds-select
              [ngModel]="frequencyValue()"
              (ngModelChange)="frequencyValue.set($event)"
              [options]="frequencyOptions"
              class="ds-recurrence-picker__frequency-select"
            />
          </div>
        </div>

        <!-- Ends -->
        <div class="ds-recurrence-picker__field">
          <label class="ds-recurrence-picker__label">Ends</label>
          <div class="ds-recurrence-picker__field-row">
            <ds-select
              [ngModel]="endTypeValue()"
              (ngModelChange)="endTypeValue.set($event)"
              [options]="endTypeOptions"
              class="ds-recurrence-picker__end-type-select"
            />
            @if (endTypeValue() === 'on') {
              <ds-select-date
                [ngModel]="endDateValue()"
                (ngModelChange)="endDateValue.set($event)"
                [ghost]="true"
                placeholder="Select date"
                class="ds-recurrence-picker__end-date-select"
              />
            }
            @if (endTypeValue() === 'after') {
              <ds-input
                type="number"
                [ngModel]="endCountValue()"
                (ngModelChange)="endCountValue.set($event || null)"
                placeholder="Number of times"
                class="ds-recurrence-picker__end-count-input"
              />
            }
          </div>
        </div>

        <!-- Summary -->
        <div class="ds-recurrence-picker__summary">
          <ds-icon name="remixRefreshLine" size="16px" class="ds-recurrence-picker__summary-icon" />
          <div class="ds-recurrence-picker__summary-content">
            <div class="ds-recurrence-picker__summary-line">{{ summaryText() }}</div>
            <div class="ds-recurrence-picker__summary-line">{{ startDateText() }}</div>
          </div>
        </div>
      </div>

      <div class="ds-recurrence-picker__actions">
        <ds-button variant="ghost" (clicked)="handleCancel()">Cancel</ds-button>
        <ds-button variant="primary" (clicked)="handleSave()">Save</ds-button>
      </div>
    </div>
  `,
})
export class DsRecurrencePickerComponent {
  // Inputs
  config = input<RecurrenceConfig | null>(null);
  startDate = input<Date>(new Date());

  // Outputs
  save = output<RecurrenceConfig>();
  cancel = output<void>();

  // Internal state
  intervalValue = signal<number>(1);
  frequencyValue = signal<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  endTypeValue = signal<'never' | 'on' | 'after'>('never');
  endDateValue = signal<Date | null>(null);
  endCountValue = signal<number | null>(null);

  // Options
  frequencyOptions: DsSelectOption<'daily' | 'weekly' | 'monthly' | 'yearly'>[] = [
    { id: 'freq-daily', value: 'daily', label: 'day' },
    { id: 'freq-weekly', value: 'weekly', label: 'week' },
    { id: 'freq-monthly', value: 'monthly', label: 'month' },
    { id: 'freq-yearly', value: 'yearly', label: 'year' },
  ];

  endTypeOptions: DsSelectOption<'never' | 'on' | 'after'>[] = [
    { id: 'end-never', value: 'never', label: 'never' },
    { id: 'end-on', value: 'on', label: 'on this day' },
    { id: 'end-after', value: 'after', label: 'after' },
  ];

  // Computed
  summaryText = computed(() => {
    const interval = this.intervalValue();
    const frequency = this.frequencyValue();
    const startDate = this.startDate();
    
    const frequencyLabels: Record<typeof frequency, string> = {
      daily: 'day',
      weekly: 'week',
      monthly: 'month',
      yearly: 'year',
    };

    const plural = interval > 1 ? 's' : '';
    const freqLabel = frequencyLabels[frequency] + plural;
    
    let text = `Occurs every ${interval} ${freqLabel}`;
    
    // For weekly, add the day of week
    if (frequency === 'weekly') {
      const dayName = startDate.toLocaleDateString('en-US', { weekday: 'long' });
      text += ` on ${dayName}`;
    }
    
    return text;
  });

  startDateText = computed(() => {
    const date = this.startDate();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `Starting ${dayName}, ${dateStr}`;
  });

  constructor() {
    // Initialize from config if provided
    const initialConfig = this.config();
    if (initialConfig) {
      this.intervalValue.set(initialConfig.interval);
      this.frequencyValue.set(initialConfig.frequency);
      this.endTypeValue.set(initialConfig.endType);
      this.endDateValue.set(initialConfig.endDate || null);
      this.endCountValue.set(initialConfig.endCount || null);
    }
  }

  handleSave() {
    const config: RecurrenceConfig = {
      frequency: this.frequencyValue(),
      interval: this.intervalValue(),
      endType: this.endTypeValue(),
      endDate: this.endTypeValue() === 'on' ? this.endDateValue() || undefined : undefined,
      endCount: this.endTypeValue() === 'after' ? this.endCountValue() || undefined : undefined,
      startDate: this.startDate(),
    };
    this.save.emit(config);
  }

  handleCancel() {
    this.cancel.emit();
  }
}

