import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DsInputComponent } from '../input/ds-input';
import { NgpDialogTrigger, NgpDialogOverlay, NgpDialog } from 'ng-primitives/dialog';
import { DsDialogComponent } from '../../dialog/ds-dialog';
import { DsRecurrencePickerComponent } from '../recurrence-picker/ds-recurrence-picker';
import { DsButtonComponent } from '../button/ds-button';

export interface RecurrenceConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // e.g., every 1 day, every 2 weeks
  endType: 'never' | 'on' | 'after';
  endDate?: Date;
  endCount?: number;
  startDate: Date;
  daysOfWeek?: number[]; // 0-6 where 0=Monday, 6=Sunday (only for weekly)
  yearlyMonth?: number; // 0-11 where 0=January, 11=December (only for yearly)
  monthlyDay?: number; // 1-31 day of month (only for monthly/yearly)
}

@Component({
  selector: 'ds-recurrence-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsInputComponent,
    NgpDialogTrigger,
    NgpDialogOverlay,
    NgpDialog,
    DsDialogComponent,
    DsRecurrencePickerComponent,
    DsButtonComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-recurrence-input.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsRecurrenceInputComponent), multi: true }
  ],
  template: `
    <div [class]="containerClasses()">
      <div 
        [ngpDialogTrigger]="recurrenceDialog"
        class="ds-recurrence-input__trigger-wrapper"
        (click)="onDialogOpen()"
      >
        <ds-input
          [ngModel]="displayValue()"
          [placeholder]="placeholder()"
          [ghost]="ghost()"
          [variant]="variant()"
          [disabled]="effectiveDisabled()"
          [readonly]="true"
          [leadingIcon]="'remixRefreshLine'"
          [trailingIcon]="'remixArrowDownSLine'"
          [class.ds-recurrence-input__input--open]="isDialogOpen()"
          [class.ds-recurrence-input__input--empty]="isEmpty()"
        />
      </div>
    </div>

    <ng-template #recurrenceDialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-dialog 
          ngpDialog 
          [size]="'md'"
          [title]="'Recurrence'"
          (close)="onDialogClose(close)"
          class="ds-recurrence-dialog">
          <div slot="content">
            <ds-recurrence-picker
              #picker
              [config]="recurrenceConfig()"
              [startDate]="startDate()"
              (save)="handleSave($event, close)"
              (cancel)="onDialogClose(close)"
            />
          </div>
          <div slot="footer">
            <ds-button variant="ghost" (clicked)="onDialogClose(close)">Cancel</ds-button>
            <ds-button variant="primary" (clicked)="handleSave(picker.getCurrentConfig(), close)">Save</ds-button>
          </div>
        </ds-dialog>
      </div>
    </ng-template>
  `,
})
export class DsRecurrenceInputComponent implements ControlValueAccessor {
  // Inputs
  placeholder = input<string>('Not recurring');
  variant = input<'default' | 'error' | 'warning' | 'success'>('default');
  disabled = input<boolean>(false);
  ghost = input<boolean>(false);
  startDate = input<Date | null>(null);

  // Outputs
  valueChange = output<RecurrenceConfig | null>();

  // Internal state
  private recurrenceConfigSig = signal<RecurrenceConfig | null>(null);
  private disabledFromCva = signal<boolean>(false);
  private isDialogOpenSig = signal<boolean>(false);
  private onTouched: () => void = () => {};
  private onChange: (value: RecurrenceConfig | null) => void = () => {};

  // View children
  @ViewChild('recurrenceDialog') recurrenceDialog!: TemplateRef<any>;

  // Computed properties
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  recurrenceConfig = computed(() => this.recurrenceConfigSig());
  isDialogOpen = computed(() => this.isDialogOpenSig());
  isEmpty = computed(() => !this.recurrenceConfig());

  displayValue = computed(() => {
    const config = this.recurrenceConfig();
    if (!config) return '';
    return this.formatRecurrence(config);
  });

  containerClasses = computed(() => {
    const classes = ['ds-recurrence-input'];
    if (this.effectiveDisabled()) classes.push('ds-recurrence-input--disabled');
    return classes.join(' ');
  });

  // Event handlers
  handleSave(config: RecurrenceConfig, close: () => void) {
    this.recurrenceConfigSig.set(config);
    this.onChange(config);
    this.valueChange.emit(config);
    this.onDialogClose(close);
  }

  onDialogOpen(): void {
    this.isDialogOpenSig.set(true);
  }

  onDialogClose(close: () => void): void {
    this.isDialogOpenSig.set(false);
    close();
  }

  formatRecurrence(config: RecurrenceConfig): string {
    const frequencyLabels: Record<RecurrenceConfig['frequency'], string> = {
      daily: 'day',
      weekly: 'week',
      monthly: 'month',
      yearly: 'year',
    };

    const plural = config.interval > 1 ? 's' : '';
    const freqLabel = frequencyLabels[config.frequency] + plural;
    let text = `Occurs every ${config.interval} ${freqLabel}`;
    
    // For weekly, add the selected days
    if (config.frequency === 'weekly') {
      if (config.daysOfWeek && config.daysOfWeek.length > 0) {
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const selectedDayNames = config.daysOfWeek.map(dayIndex => dayNames[dayIndex]);
        if (selectedDayNames.length === 1) {
          text += ` on ${selectedDayNames[0]}`;
        } else if (selectedDayNames.length > 1) {
          text += ` on ${selectedDayNames.join(', ')}`;
        }
      } else {
        // Fallback to start date day if no days selected
        const dayName = config.startDate.toLocaleDateString('en-US', { weekday: 'long' });
        text += ` on ${dayName}`;
      }
    }
    
    // Add end condition
    if (config.endType === 'on' && config.endDate) {
      text += ` until ${config.endDate.toLocaleDateString()}`;
    } else if (config.endType === 'after' && config.endCount) {
      text += ` for ${config.endCount} ${config.endCount === 1 ? 'time' : 'times'}`;
    }

    return text;
  }

  // ControlValueAccessor implementation
  writeValue(value: RecurrenceConfig | null): void {
    this.recurrenceConfigSig.set(value ?? null);
  }

  registerOnChange(fn: (value: RecurrenceConfig | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}

