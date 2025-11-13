import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpSwitch, NgpSwitchThumb } from 'ng-primitives/switch';
import { DsLabelComponent } from '../label/ds-label';

export type SwitchVariant = 'default' | 'error' | 'warning' | 'success';
export type SwitchSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-switch',
  standalone: true,
  imports: [CommonModule, NgpSwitch, NgpSwitchThumb, DsLabelComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-switch.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsSwitchComponent), multi: true }],
  template: `
    <div [class]="containerClasses()">
      <button
        ngpSwitch
        [(ngpSwitchChecked)]="checkedSig"
        [attr.disabled]="effectiveDisabled() ? '' : null"
        [class]="switchClasses()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-describedby]="ariaDescribedBy()"
        [attr.aria-labelledby]="ariaLabelledBy()"
        [attr.aria-invalid]="variant() === 'error' ? 'true' : null"
        (ngpSwitchCheckedChange)="handleCheckedChange($event)"
        type="button"
      >
        <span ngpSwitchThumb [class]="thumbClasses()"></span>
      </button>
      
      @if (showLabel()) {
        <ds-label 
          [for]="switchId()" 
          [class]="labelClasses()"
          (click)="handleLabelClick()"
        >
          {{ label() }}
        </ds-label>
      }
    </div>
  `,
})
export class DsSwitchComponent implements ControlValueAccessor {
  // Inputs
  variant = input<SwitchVariant>('default');
  size = input<SwitchSize>('md');
  label = input<string>('');
  showLabel = input<boolean>(true);
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  checked = input<boolean>(false);
  switchId = input<string>();
  ariaLabel = input<string>();
  ariaDescribedBy = input<string>();
  ariaLabelledBy = input<string>();

  // Outputs
  checkedChange = output<boolean>();

  // Internal state
  checkedSig = signal<boolean>(false);
  private disabledFromCva = signal<boolean>(false);

  checkedState = computed(() => this.checked() || this.checkedSig());
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());

  containerClasses = computed(() => {
    const classes = ['switch-container', `switch-container--${this.size()}`];
    if (this.effectiveDisabled()) classes.push('switch-container--disabled');
    if (this.showLabel() && this.label()) classes.push('switch-container--with-label');
    return classes.join(' ');
  });

  switchClasses = computed(() => {
    const classes = ['switch', `switch--${this.size()}`, `switch--${this.variant()}`];
    if (this.checkedState()) classes.push('switch--checked');
    if (this.effectiveDisabled()) classes.push('switch--disabled');
    return classes.join(' ');
  });

  thumbClasses = computed(() => {
    const classes = ['switch__thumb', `switch__thumb--${this.size()}`];
    if (this.checkedState()) classes.push('switch__thumb--checked');
    if (this.effectiveDisabled()) classes.push('switch__thumb--disabled');
    return classes.join(' ');
  });

  labelClasses = computed(() => {
    const classes = ['switch__label', `switch__label--${this.size()}`];
    if (this.effectiveDisabled()) classes.push('switch__label--disabled');
    if (this.variant() !== 'default') classes.push(`switch__label--${this.variant()}`);
    return classes.join(' ');
  });

  constructor() {
    // Sync the input checked value with the internal signal
    effect(() => {
      this.checkedSig.set(this.checked());
    });
  }

  // Event handlers
  handleCheckedChange(checked: boolean) {
    this.checkedSig.set(checked);
    this.onChangeFn(checked);
    this.checkedChange.emit(checked);
  }

  handleLabelClick() {
    if (!this.effectiveDisabled()) {
      const newValue = !this.checkedState();
      this.checkedSig.set(newValue);
      this.onChangeFn(newValue);
      this.checkedChange.emit(newValue);
    }
  }

  // ControlValueAccessor
  private onChangeFn: (val: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: boolean): void {
    this.checkedSig.set(value ?? false);
  }
  registerOnChange(fn: (val: boolean) => void): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}

