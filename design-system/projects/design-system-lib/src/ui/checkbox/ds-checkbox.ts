import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpCheckbox } from 'ng-primitives/checkbox';
import { DsLabelComponent } from '../label/ds-label';
import { DsIconComponent } from '../icon/ds-icon';

export type CheckboxVariant = 'default' | 'error' | 'warning' | 'success';
export type CheckboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule, NgpCheckbox, DsLabelComponent, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-checkbox.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsCheckboxComponent), multi: true }],
  template: `
    <div [class]="containerClasses()">
      <span 
        ngpCheckbox 
        [(ngpCheckboxChecked)]="checkedSig"
        [attr.disabled]="effectiveDisabled() ? '' : null"
        [class]="checkboxClasses()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-describedby]="ariaDescribedBy()"
        [attr.aria-labelledby]="ariaLabelledBy()"
        [attr.aria-invalid]="variant() === 'error' ? 'true' : null"
        (ngpCheckboxCheckedChange)="handleCheckedChange($event)"
      >
        @if (checkedState()) {
          <ds-icon 
            name="remixCheckLine" 
            [size]="iconSize()" 
            class="checkbox__icon checkbox__icon--checked" 
            aria-hidden="true" 
          />
        } @else if (indeterminate()) {
          <ds-icon 
            name="remixSubtractLine" 
            [size]="iconSize()" 
            class="checkbox__icon checkbox__icon--indeterminate" 
            aria-hidden="true" 
          />
        }
      </span>
      
      @if (showLabel()) {
        <ds-label 
          [for]="checkboxId()" 
          [class]="labelClasses()"
          (click)="handleLabelClick()"
        >
          {{ label() }}
        </ds-label>
      }
    </div>
  `,
})
export class DsCheckboxComponent implements ControlValueAccessor {
  // Inputs
  variant = input<CheckboxVariant>('default');
  size = input<CheckboxSize>('md');
  label = input<string>('');
  showLabel = input<boolean>(true);
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  checked = input<boolean>(false);
  indeterminate = input<boolean>(false);
  checkboxId = input<string>();
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
    const classes = ['checkbox-container', `checkbox-container--${this.size()}`];
    if (this.effectiveDisabled()) classes.push('checkbox-container--disabled');
    if (this.showLabel() && this.label()) classes.push('checkbox-container--with-label');
    return classes.join(' ');
  });

  checkboxClasses = computed(() => {
    const classes = ['checkbox', `checkbox--${this.size()}`, `checkbox--${this.variant()}`];
    if (this.checkedState()) classes.push('checkbox--checked');
    if (this.indeterminate()) classes.push('checkbox--indeterminate');
    if (this.effectiveDisabled()) classes.push('checkbox--disabled');
    return classes.join(' ');
  });

  labelClasses = computed(() => {
    const classes = ['checkbox__label', `checkbox__label--${this.size()}`];
    if (this.effectiveDisabled()) classes.push('checkbox__label--disabled');
    if (this.variant() !== 'default') classes.push(`checkbox__label--${this.variant()}`);
    return classes.join(' ');
  });

  iconSize = computed(() => ({ sm: '12px', md: '14px', lg: '16px' }[this.size()]));

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
