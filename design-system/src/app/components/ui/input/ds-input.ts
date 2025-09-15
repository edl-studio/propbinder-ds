import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpInput } from 'ng-primitives/input';
import { DsIconComponent } from '../icon/ds-icon';

export type InputVariant = 'default' | 'error' | 'warning' | 'success';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

@Component({
  selector: 'ds-input',
  standalone: true,
  imports: [CommonModule, NgpInput, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-input.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsInputComponent), multi: true }],
  template: `
    <div [class]="containerClasses()">
      @if (leadingIcon()) {
        <ds-icon [name]="leadingIcon()!" [size]="iconSize()" class="ds-input__icon ds-input__icon--leading" />
      }

      <input
        ngpInput
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="effectiveDisabled()"
        [readonly]="readonly()"
        [required]="required()"
        [value]="value()"
        [class]="'body-sm-regular ' + inputClasses()"
        [attr.aria-label]="ariaLabel()"
         [attr.aria-describedby]="ariaDescribedBy()"
         [attr.aria-labelledby]="ariaLabelledBy()"
        [attr.aria-invalid]="variant() === 'error' ? 'true' : null"
        (input)="handleInput($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
      />

      @if (trailingIcon()) {
        <ds-icon [name]="trailingIcon()!" [size]="iconSize()" class="ds-input__icon ds-input__icon--trailing" />
      }

      @if (clearable() && value() && !effectiveDisabled() && !readonly()) {
        <button type="button" class="ds-input__clear" (click)="clear()" aria-label="Clear input">
          <ds-icon name="remixCloseLine" [size]="iconSize()" class="ds-input__icon" />
        </button>
      }
    </div>
  `,
})
export class DsInputComponent implements ControlValueAccessor {
  // Inputs
  variant = input<InputVariant>('default');
  type = input<InputType>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  clearable = input<boolean>(false);
  leadingIcon = input<string>();
  trailingIcon = input<string>();
  ariaLabel = input<string>();
  ariaDescribedBy = input<string>();
  ariaLabelledBy = input<string>();

  // Outputs
  valueChange = output<string>();
  focused = output<FocusEvent>();
  blurred = output<FocusEvent>();

  // Internal state
  private valueSig = signal<string>('');
  private focusedSig = signal<boolean>(false);
  private disabledFromCva = signal<boolean>(false);

  value = computed(() => this.valueSig());
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());

  containerClasses = computed(() => {
    const classes = ['ds-input', `ds-input--${this.variant()}`];
    if (this.effectiveDisabled()) classes.push('ds-input--disabled');
    if (this.readonly()) classes.push('ds-input--readonly');
    if (this.leadingIcon()) classes.push('ds-input--with-leading-icon');
    if (this.trailingIcon() || this.clearable()) classes.push('ds-input--with-trailing-icon');
    return classes.join(' ');
  });

  inputClasses = computed(() => 'ds-input__field');

  iconSize = computed(() => '16px');

  // Native event handlers
  handleInput(event: Event) {
    const next = (event.target as HTMLInputElement).value ?? '';
    this.valueSig.set(next);
    this.onChangeFn(next);
    this.valueChange.emit(next);
  }

  handleFocus(event: FocusEvent) {
    this.focusedSig.set(true);
    this.focused.emit(event);
  }

  handleBlur(event: FocusEvent) {
    this.focusedSig.set(false);
    this.onTouchedFn();
    this.blurred.emit(event);
  }

  clear() {
    this.valueSig.set('');
    this.onChangeFn('');
    this.valueChange.emit('');
  }

  // ControlValueAccessor
  private onChangeFn: (val: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string): void {
    this.valueSig.set(value ?? '');
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
} 