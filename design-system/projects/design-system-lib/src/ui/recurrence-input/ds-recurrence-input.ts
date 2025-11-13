import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DsInputComponent } from '../input/ds-input';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DsRecurrencePickerComponent } from '../recurrence-picker/ds-recurrence-picker';

export interface RecurrenceConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // e.g., every 1 day, every 2 weeks
  endType: 'never' | 'on' | 'after';
  endDate?: Date;
  endCount?: number;
  startDate: Date;
}

@Component({
  selector: 'ds-recurrence-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsInputComponent,
    OverlayModule,
    CdkOverlayOrigin,
    DsRecurrencePickerComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-recurrence-input.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsRecurrenceInputComponent), multi: true }
  ],
  template: `
    <div [class]="containerClasses()">
      <div 
        #trigger
        cdkOverlayOrigin
        #triggerOrigin="cdkOverlayOrigin"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'dialog'"
        class="ds-recurrence-input__trigger-wrapper"
        (click)="openPicker()"
      >
        <ds-input
          [ngModel]="displayValue()"
          [placeholder]="placeholder()"
          [ghost]="ghost()"
          [variant]="variant()"
          [disabled]="effectiveDisabled()"
          [readonly]="true"
          [trailingIcon]="'remixRefreshLine'"
        />
      </div>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="triggerOrigin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (backdropClick)="closePicker()"
      (detach)="closePicker()"
    >
      <ds-recurrence-picker
        [config]="recurrenceConfig()"
        [startDate]="startDate()"
        (save)="handleSave($event)"
        (cancel)="closePicker()"
      />
    </ng-template>
  `,
})
export class DsRecurrenceInputComponent implements ControlValueAccessor {
  // Inputs
  placeholder = input<string>('Not recurring');
  variant = input<'default' | 'error' | 'warning' | 'success'>('default');
  disabled = input<boolean>(false);
  ghost = input<boolean>(false);
  startDate = input<Date>(new Date());

  // Outputs
  valueChange = output<RecurrenceConfig | null>();

  // Internal state
  private recurrenceConfigSig = signal<RecurrenceConfig | null>(null);
  private disabledFromCva = signal<boolean>(false);
  private isOpenSig = signal<boolean>(false);
  private onTouched: () => void = () => {};
  private onChange: (value: RecurrenceConfig | null) => void = () => {};

  // View children
  @ViewChild('trigger', { read: ElementRef }) triggerElement!: ElementRef<HTMLElement>;

  // Computed properties
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  isOpen = computed(() => this.isOpenSig());
  recurrenceConfig = computed(() => this.recurrenceConfigSig());

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideComponent = target.closest('.ds-recurrence-input');
    const isInsidePicker = target.closest('.ds-recurrence-picker');
    
    if (!isInsideComponent && !isInsidePicker && this.isOpen()) {
      this.closePicker();
    }
  }

  // Event handlers
  openPicker() {
    if (this.effectiveDisabled()) return;
    this.isOpenSig.set(true);
  }

  closePicker() {
    if (this.isOpenSig()) {
      this.isOpenSig.set(false);
    }
  }

  handleSave(config: RecurrenceConfig) {
    this.recurrenceConfigSig.set(config);
    this.onChange(config);
    this.valueChange.emit(config);
    this.closePicker();
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
    
    // For weekly, add the day of week
    if (config.frequency === 'weekly') {
      const dayName = config.startDate.toLocaleDateString('en-US', { weekday: 'long' });
      text += ` on ${dayName}`;
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

