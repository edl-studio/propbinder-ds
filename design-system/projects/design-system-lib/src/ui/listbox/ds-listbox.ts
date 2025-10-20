import { Component, ViewEncapsulation, input, output, computed, signal, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';
import { NgpListbox, NgpListboxOption } from 'ng-primitives/listbox';
import { provideValueAccessor } from 'ng-primitives/utils';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DsIconComponent } from '../icon/ds-icon';

export interface DsListboxOption<T = unknown> {
  id: string;
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * A listbox component for single or multiple selection from a list of options.
 * Features a dropdown interface with content projection for custom triggers.
 * 
 * @example
 * Single selection with button trigger:
 * ```html
 * <ds-listbox 
 *   [options]="options"
 *   [(ngModel)]="selectedValue">
 *   <ds-button variant="secondary">Select Option</ds-button>
 * </ds-listbox>
 * ```
 * 
 * @example
 * Multiple selection with icon button trigger:
 * ```html
 * <ds-listbox 
 *   [options]="options"
 *   [multiple]="true"
 *   [(ngModel)]="selectedValues">
 *   <ds-icon-button icon="remixSettings3Line" variant="ghost" />
 * </ds-listbox>
 * ```
 * 
 * @example
 * With custom trigger:
 * ```html
 * <ds-listbox [options]="options" [(ngModel)]="selectedValue">
 *   <button class="my-custom-trigger">Custom</button>
 * </ds-listbox>
 * ```
 */
@Component({
  selector: 'ds-listbox',
  standalone: true,
  imports: [CommonModule, NgpListbox, NgpListboxOption, DsIconComponent, OverlayModule, CdkOverlayOrigin],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-listbox.css'],
  providers: [provideValueAccessor(DsListboxComponent)],
  template: `
    <div [class]="containerClasses()">
      <div 
        #trigger
        cdkOverlayOrigin
        #triggerOrigin="cdkOverlayOrigin"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'listbox'"
        (click)="toggleListbox()"
        class="ds-listbox__trigger-wrapper"
      >
        <ng-content></ng-content>
      </div>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="triggerOrigin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayHasBackdrop]="false"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (backdropClick)="closeListbox()"
      (detach)="closeListbox()"
    >
      @if (multiple()) {
        <div 
          class="ds-listbox__dropdown"
          [style.min-width.px]="triggerWidth"
          [style.width]="width()"
          role="listbox"
          [attr.aria-multiselectable]="true"
        >
          @for (option of options(); track option.id) {
            <div 
              [class]="getOptionClass(option)"
              [attr.data-selected]="isOptionSelected(option.value) ? '' : null"
              [attr.data-disabled]="option.disabled ? '' : null"
              (click)="handleMultipleClick(option.value, option.disabled)"
              role="option"
              [attr.aria-selected]="isOptionSelected(option.value)"
            >
              <span class="ds-listbox__label body-sm-regular">{{ option.label }}</span>
              @if (isOptionSelected(option.value)) {
                <ds-icon 
                  name="remixCheckLine" 
                  size="16px" 
                  class="ds-listbox__checkmark"
                />
              }
            </div>
          }
        </div>
      } @else {
        <div 
          class="ds-listbox__dropdown"
          [style.min-width.px]="triggerWidth"
          [style.width]="width()"
          (ngpListboxValueChange)="handleSingleSelect($any($event))"
          ngpListbox
        >
          @for (option of options(); track option.id) {
            <div 
              [ngpListboxOptionValue]="option.value"
              [ngpListboxOptionDisabled]="option.disabled"
              [class]="optionClasses()"
              [attr.data-selected]="isOptionSelected(option.value) ? '' : null"
              [attr.data-disabled]="option.disabled ? '' : null"
              ngpListboxOption
            >
              <span class="ds-listbox__label body-sm-regular">{{ option.label }}</span>
              @if (isOptionSelected(option.value)) {
                <ds-icon 
                  name="remixCheckLine" 
                  size="16px" 
                  class="ds-listbox__checkmark"
                />
              }
            </div>
          }
        </div>
      }
    </ng-template>
  `
})
export class DsListboxComponent<T = unknown> implements ControlValueAccessor {
  @ViewChild('trigger', { read: ElementRef }) triggerElement!: ElementRef<HTMLElement>;
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideListbox = target.closest('.ds-listbox');
    const isInsideDropdown = target.closest('.ds-listbox__dropdown');
    
    if (!isInsideListbox && !isInsideDropdown && this.isOpen()) {
      this.closeListbox();
    }
  }

  // Inputs
  options = input<DsListboxOption<T>[]>([]);
  multiple = input<boolean>(false);
  disabled = input<boolean>(false);
  width = input<string>('auto');

  // Outputs
  valueChange = output<T | T[]>();
  opened = output<void>();
  closed = output<void>();

  // Internal state
  public valueSig = signal<T | undefined>(undefined);
  public multiValueSig = signal<T[]>([]);
  private disabledFromCva = signal<boolean>(false);
  private isOpenSig = signal<boolean>(false);

  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  
  value = computed(() => this.multiple() ? this.multiValueSig() : this.valueSig());
  
  isOpen = computed(() => this.isOpenSig());

  // Overlay configuration
  triggerWidth = 0;
  
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

  toggleListbox() {
    if (this.effectiveDisabled()) return;
    
    const newState = !this.isOpenSig();
    
    if (newState && this.triggerElement) {
      this.triggerWidth = this.triggerElement.nativeElement.offsetWidth;
    }
    
    this.isOpenSig.set(newState);
    if (newState) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  closeListbox() {
    if (this.isOpenSig()) {
      this.isOpenSig.set(false);
      this.closed.emit();
    }
  }

  handleSingleSelect(value: T | T[]): void {
    if (this.effectiveDisabled()) return;
    
    const actualValue = Array.isArray(value) ? value[0] : value;
    if (actualValue !== undefined) {
      this.valueSig.set(actualValue);
      this.onChange(actualValue);
      this.valueChange.emit(actualValue);
      this.onTouched();
      
      // Close the listbox after selection in single-select mode
      this.closeListbox();
    }
  }

  isOptionSelected(value: T): boolean {
    if (this.multiple()) {
      return this.multiValueSig().includes(value);
    }
    return this.valueSig() === value;
  }

  handleMultipleClick(value: T, disabled?: boolean): void {
    if (disabled || this.effectiveDisabled()) return;

    const currentValues = this.multiValueSig();
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    this.multiValueSig.set(newValues);
    this.onChange(newValues);
    this.valueChange.emit(newValues);
    this.onTouched();
    
    // Keep the listbox open for multiple selection mode
  }

  containerClasses = computed(() => {
    const classes = ['ds-listbox'];
    if (this.isOpen()) classes.push('ds-listbox--open');
    return classes.join(' ');
  });

  optionClasses = computed(() => {
    return 'ds-listbox__option';
  });

  getOptionClass(option: DsListboxOption<T>): string {
    return 'ds-listbox__option';
  }

  // ControlValueAccessor implementation
  private onChange: (val: T | T[] | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T | T[] | undefined): void {
    if (this.multiple()) {
      this.multiValueSig.set(Array.isArray(value) ? value : []);
    } else {
      this.valueSig.set(Array.isArray(value) ? value[0] : value);
    }
  }

  registerOnChange(fn: (val: T | T[] | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}

