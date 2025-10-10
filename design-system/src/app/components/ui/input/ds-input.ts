import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, effect, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpInput } from 'ng-primitives/input';
import { DsIconComponent } from '../icon/ds-icon';

export type InputVariant = 'default' | 'error' | 'warning' | 'success';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export type NumberFormatPreset = 'currency' | 'percentage' | 'decimal' | 'integer';

export interface NumberFormatConfig {
  /** Preset configuration for common formats */
  preset?: NumberFormatPreset;
  
  /** Number of decimal places (overrides preset) */
  decimals?: number;
  
  /** Thousands separator character (overrides preset) */
  thousandsSeparator?: string;
  
  /** Decimal separator character (overrides preset) */
  decimalSeparator?: string;
  
  /** Text alignment in the input (overrides preset) */
  align?: 'left' | 'right';
  
  /** Enable live formatting while typing (overrides preset) */
  liveFormat?: boolean;
  
  /** Trim trailing zeros after decimal (overrides preset) */
  trimZeros?: boolean;
}

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

      @if (prefix()) {
        <span class="ds-input__prefix body-sm-regular">{{ prefix() }}</span>
      }

      <input
        #inputElement
        ngpInput
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="effectiveDisabled()"
        [readonly]="readonly()"
        [required]="required()"
        [value]="value()"
        [class]="'body-sm-regular ' + inputClasses()"
        [attr.inputmode]="effectiveFormat() ? 'decimal' : null"
        [attr.aria-label]="ariaLabel()"
         [attr.aria-describedby]="ariaDescribedBy()"
         [attr.aria-labelledby]="ariaLabelledBy()"
        [attr.aria-invalid]="variant() === 'error' ? 'true' : null"
        (input)="handleInput($event)"
        (keydown)="handleKeyDown($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
      />

      @if (suffix() && value()) {
        <span 
          class="ds-input__suffix body-sm-regular" 
          [class.ds-input__suffix--inline]="!isRightAligned()"
          [style.left.px]="!isRightAligned() ? suffixPosition() : null">
          {{ suffix() }}
        </span>
      }

      @if (trailingIcon()) {
        <ds-icon [name]="trailingIcon()!" [size]="iconSize()" class="ds-input__icon ds-input__icon--trailing" />
      }

      @if (clearable() && value() && !effectiveDisabled() && !readonly()) {
        <button type="button" class="ds-input__clear" (click)="clear()" aria-label="Clear input">
          <ds-icon name="remixCloseLine" [size]="iconSize()" />
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
  ghost = input<boolean>(false);
  leadingIcon = input<string>();
  trailingIcon = input<string>();
  prefix = input<string>();
  suffix = input<string>();
  format = input<NumberFormatConfig>();
  ariaLabel = input<string>();
  ariaDescribedBy = input<string>();
  ariaLabelledBy = input<string>();

  // Outputs
  valueChange = output<string>();
  focused = output<FocusEvent>();
  blurred = output<FocusEvent>();

  // Internal state
  private valueSig = signal<string>('');
  private rawValueSig = signal<string>(''); // Unformatted value for number formatting
  private focusedSig = signal<boolean>(false);
  private disabledFromCva = signal<boolean>(false);
  private suffixPositionSig = signal<number>(0);

  // View children
  inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  value = computed(() => this.valueSig());
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  suffixPosition = computed(() => this.suffixPositionSig());
  
  // Computed format configuration (merges preset with custom overrides)
  effectiveFormat = computed(() => {
    const formatConfig = this.format();
    if (!formatConfig) return null;
    
    const preset = formatConfig.preset ? this.formatPresets[formatConfig.preset] : null;
    const base = preset || {
      decimals: 2,
      thousandsSeparator: ' ',
      decimalSeparator: '.',
      align: 'left',
      liveFormat: false,
      trimZeros: false
    };
    
    return {
      decimals: formatConfig.decimals ?? base.decimals,
      thousandsSeparator: formatConfig.thousandsSeparator ?? base.thousandsSeparator,
      decimalSeparator: formatConfig.decimalSeparator ?? base.decimalSeparator,
      align: formatConfig.align ?? base.align,
      liveFormat: formatConfig.liveFormat ?? base.liveFormat,
      trimZeros: formatConfig.trimZeros ?? base.trimZeros
    };
  });
  
  // Format presets
  private readonly formatPresets: Record<NumberFormatPreset, Required<Omit<NumberFormatConfig, 'preset'>>> = {
    currency: {
      decimals: 2,
      thousandsSeparator: ' ',
      decimalSeparator: '.',
      align: 'right',
      liveFormat: true,
      trimZeros: false
    },
    percentage: {
      decimals: 1,
      thousandsSeparator: ' ',
      decimalSeparator: '.',
      align: 'right',
      liveFormat: true,
      trimZeros: true
    },
    decimal: {
      decimals: 2,
      thousandsSeparator: ' ',
      decimalSeparator: '.',
      align: 'left',
      liveFormat: false,
      trimZeros: true
    },
    integer: {
      decimals: 0,
      thousandsSeparator: ' ',
      decimalSeparator: '.',
      align: 'right',
      liveFormat: true,
      trimZeros: false
    }
  };

  constructor() {
    // Update suffix position when value or suffix changes (only for non-RTL fields)
    effect(() => {
      if (this.suffix() && this.inputElement() && !this.isRightAligned()) {
        this.updateSuffixPosition();
      }
    });
  }

  containerClasses = computed(() => {
    const classes = ['ds-input', `ds-input--${this.variant()}`];
    if (this.effectiveDisabled()) classes.push('ds-input--disabled');
    if (this.readonly()) classes.push('ds-input--readonly');
    if (this.ghost()) classes.push('ds-input--ghost');
    if (this.leadingIcon() || this.prefix()) classes.push('ds-input--with-leading-icon');
    if (this.trailingIcon() || this.suffix() || this.clearable()) classes.push('ds-input--with-trailing-icon');
    return classes.join(' ');
  });

  inputClasses = computed(() => {
    const classes = ['ds-input__field'];
    const format = this.effectiveFormat();
    if (format?.align === 'right') {
      classes.push('ds-input__field--align-right');
    }
    return classes.join(' ');
  });

  iconSize = computed(() => '16px');

  /**
   * Check if the input is right-aligned
   */
  isRightAligned(): boolean {
    const format = this.effectiveFormat();
    return format?.align === 'right';
  }

  // Native event handlers
  handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value ?? '';
    const format = this.effectiveFormat();
    
    if (format && format.liveFormat) {
      // Store raw value and format for display
      const rawValue = this.unformatNumber(inputValue, format);
      this.rawValueSig.set(rawValue);
      
      // Format and display
      const formatted = this.formatNumber(rawValue, format, false);
      this.valueSig.set(formatted);
      
      // Emit raw value to form control
      this.onChangeFn(rawValue);
      this.valueChange.emit(rawValue);
      
      // Update input element value if it changed
      const inputEl = this.inputElement()?.nativeElement;
      if (inputEl && inputEl.value !== formatted) {
        const cursorPos = inputEl.selectionStart || 0;
        const oldLength = inputValue.length;
        inputEl.value = formatted;
        
        // Adjust cursor position after formatting
        const newLength = formatted.length;
        const diff = newLength - oldLength;
        inputEl.setSelectionRange(cursorPos + diff, cursorPos + diff);
      }
    } else {
      // No formatting or no live format - just pass through
      this.valueSig.set(inputValue);
      this.onChangeFn(inputValue);
      this.valueChange.emit(inputValue);
    }
    
    // Update suffix position if inline suffix is present (only for non-RTL fields)
    if (this.suffix() && !this.isRightAligned()) {
      this.updateSuffixPosition();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    // Only restrict input if formatting is enabled
    const format = this.effectiveFormat();
    if (!format) return;

    // Allow control keys (backspace, delete, tab, arrows, etc.)
    const controlKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];
    
    // Allow Ctrl/Cmd combinations (copy, paste, etc.)
    if (event.ctrlKey || event.metaKey) return;
    
    // Allow control keys
    if (controlKeys.includes(event.key)) return;
    
    // Get allowed characters based on format
    const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    // Allow decimal separator
    if (format.decimals > 0 && event.key === format.decimalSeparator) {
      // Only allow one decimal separator
      const currentValue = (event.target as HTMLInputElement).value;
      if (!currentValue.includes(format.decimalSeparator)) {
        return;
      }
    }
    
    // Allow minus sign at the beginning
    if (event.key === '-') {
      const currentValue = (event.target as HTMLInputElement).value;
      const selectionStart = (event.target as HTMLInputElement).selectionStart || 0;
      // Only allow at the beginning and if not already present
      if (selectionStart === 0 && !currentValue.includes('-')) {
        return;
      }
    }
    
    // Allow thousands separator
    if (event.key === format.thousandsSeparator) return;
    
    // Check if the key is an allowed character
    if (!allowedChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  handleFocus(event: FocusEvent) {
    this.focusedSig.set(true);
    this.focused.emit(event);
  }

  handleBlur(event: FocusEvent) {
    this.focusedSig.set(false);
    this.onTouchedFn();
    this.blurred.emit(event);
    
    // Apply final formatting on blur
    const format = this.effectiveFormat();
    if (format) {
      const currentValue = this.value();
      const rawValue = this.unformatNumber(currentValue, format);
      const formatted = this.formatNumber(rawValue, format, true);
      
      this.valueSig.set(formatted);
      this.rawValueSig.set(rawValue);
      
      // Emit the raw value
      this.onChangeFn(rawValue);
      this.valueChange.emit(rawValue);
      
      // Update input element
      const inputEl = this.inputElement()?.nativeElement;
      if (inputEl) {
        inputEl.value = formatted;
      }
    }
  }

  clear() {
    this.valueSig.set('');
    this.onChangeFn('');
    this.valueChange.emit('');
  }

  /**
   * Calculate and update the position of the inline suffix based on text width
   */
  private updateSuffixPosition() {
    const inputEl = this.inputElement()?.nativeElement;
    if (!inputEl) return;

    const text = this.value() || '';
    if (!text) {
      this.suffixPositionSig.set(0);
      return;
    }

    // Create a temporary element to measure text width
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    // Get computed styles from the input element
    const styles = window.getComputedStyle(inputEl);
    context.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;

    // Measure the text width
    const textWidth = context.measureText(text).width;

    // Calculate position: container padding + prefix width + text width + small gap
    let leftPosition = 8; // Base padding

    // Add leading icon width if present
    if (this.leadingIcon()) {
      leftPosition += 20; // icon space
    }

    // Add prefix width if present
    if (this.prefix()) {
      const prefixWidth = context.measureText(this.prefix()!).width;
      leftPosition += prefixWidth + 4; // prefix + padding-right
    }

    // Add text width and a small gap
    leftPosition += textWidth + 4;

    this.suffixPositionSig.set(leftPosition);
  }

  /**
   * Format a number string according to the format configuration
   */
  private formatNumber(value: string, format: Required<Omit<NumberFormatConfig, 'preset'>>, isFinal: boolean): string {
    if (!value || value === '' || value === '-') return value;
    
    // Parse the number
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    // Handle negative sign
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    
    // Split into integer and decimal parts
    const parts = absNum.toString().split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] || '';
    
    // Add thousands separator
    if (format.thousandsSeparator) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, format.thousandsSeparator);
    }
    
    // Handle decimal places
    if (isFinal) {
      // On blur: enforce exact decimal places
      if (format.decimals > 0) {
        decimalPart = decimalPart.padEnd(format.decimals, '0').substring(0, format.decimals);
        
        // Trim trailing zeros if configured
        if (format.trimZeros) {
          decimalPart = decimalPart.replace(/0+$/, '');
        }
      } else {
        decimalPart = '';
      }
    } else {
      // While typing: allow partial decimal input
      if (format.decimals > 0 && decimalPart.length > 0) {
        decimalPart = decimalPart.substring(0, format.decimals);
      } else if (format.decimals === 0) {
        decimalPart = '';
      }
    }
    
    // Combine parts
    let formatted = integerPart;
    if (decimalPart.length > 0 || (value.includes('.') && !isFinal)) {
      formatted += format.decimalSeparator + decimalPart;
    }
    
    return isNegative ? '-' + formatted : formatted;
  }

  /**
   * Remove formatting from a number string to get the raw value
   */
  private unformatNumber(value: string, format: Required<Omit<NumberFormatConfig, 'preset'>>): string {
    if (!value || value === '' || value === '-') return value;
    
    // Remove thousands separators
    let unformatted = value;
    if (format.thousandsSeparator) {
      unformatted = unformatted.replace(new RegExp('\\' + format.thousandsSeparator, 'g'), '');
    }
    
    // Replace custom decimal separator with standard period
    if (format.decimalSeparator !== '.') {
      unformatted = unformatted.replace(format.decimalSeparator, '.');
    }
    
    return unformatted;
  }

  // ControlValueAccessor
  private onChangeFn: (val: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string): void {
    const format = this.effectiveFormat();
    
    if (format) {
      // Store raw value and format for display
      this.rawValueSig.set(value ?? '');
      const formatted = this.formatNumber(value ?? '', format, true);
      this.valueSig.set(formatted);
      
      // Update input element after a microtask to ensure DOM is ready
      setTimeout(() => {
        const inputEl = this.inputElement()?.nativeElement;
        if (inputEl) {
          inputEl.value = formatted;
        }
      }, 0);
    } else {
      this.valueSig.set(value ?? '');
    }
    
    // Update suffix position after a microtask to ensure DOM is ready (only for non-RTL fields)
    if (this.suffix() && value && !this.isRightAligned()) {
      setTimeout(() => this.updateSuffixPosition(), 0);
    }
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