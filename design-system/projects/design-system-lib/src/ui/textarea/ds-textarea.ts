import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpTextarea } from 'ng-primitives/textarea';

export type TextareaVariant = 'default' | 'error' | 'warning' | 'success';
export type TextareaSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-textarea',
  standalone: true,
  imports: [CommonModule, NgpTextarea],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-textarea.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsTextareaComponent), multi: true }],
  template: `
    <div [class]="containerClasses()">
      <textarea
        ngpTextarea
        [placeholder]="placeholder()"
        [disabled]="effectiveDisabled()"
        [readonly]="readonly()"
        [required]="required()"
        [rows]="rows()"
        [cols]="cols()"
        [attr.maxlength]="maxlength()"
        [attr.minlength]="minlength()"
        [class]="textareaClasses()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-describedby]="ariaDescribedBy()"
        [attr.aria-labelledby]="ariaLabelledBy()"
        [attr.aria-invalid]="variant() === 'error' ? 'true' : null"
        (input)="handleInput($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
      >{{ value() }}</textarea>
    </div>
  `,
})
export class DsTextareaComponent implements ControlValueAccessor {
  // Inputs
  variant = input<TextareaVariant>('default');
  size = input<TextareaSize>('md');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  rows = input<number>(4);
  cols = input<number>();
  maxlength = input<number>();
  minlength = input<number>();
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
    const classes = ['textarea-container', `textarea-container--${this.size()}`, `textarea-container--${this.variant()}`];
    if (this.effectiveDisabled()) classes.push('textarea-container--disabled');
    if (this.readonly()) classes.push('textarea-container--readonly');
    if (this.focusedSig()) classes.push('textarea-container--focused');
    return classes.join(' ');
  });

  textareaClasses = computed(() => ['textarea', `textarea--${this.size()}`, `textarea--${this.variant()}`].join(' '));

  // Native event handlers
  handleInput(event: Event) {
    const next = (event.target as HTMLTextAreaElement).value ?? '';
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
