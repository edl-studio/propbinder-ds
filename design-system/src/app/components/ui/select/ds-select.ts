import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';
import { NgpSelect, NgpSelectDropdown, NgpSelectPortal, NgpSelectOption } from 'ng-primitives/select';
import { provideValueAccessor } from 'ng-primitives/utils';
import { DsIconComponent } from '../icon/ds-icon';

export type SelectVariant = 'default' | 'error' | 'warning' | 'success';

export interface DsSelectOption<T = unknown> {
  id: string;
  label: string;
  value: T;
  disabled?: boolean;
  group?: string;
}

@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule, DsIconComponent, NgpSelect, NgpSelectDropdown, NgpSelectPortal, NgpSelectOption],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-select.css'],
  providers: [provideValueAccessor(DsSelectComponent)],
  template: `
    <div 
      [class]="containerClasses()"
      [(ngpSelectValue)]="valueSig"
      [ngpSelectDisabled]="effectiveDisabled()"
      (ngpSelectOpenChange)="onOpenChange($event)"
      ngpSelect
    >
      <button 
        #trigger
        type="button" 
        [class]="triggerClasses()"
        [disabled]="effectiveDisabled()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-describedby]="ariaDescribedBy()"
        [attr.aria-labelledby]="ariaLabelledBy()"
      >
        <span 
          [class]="selectedOption() ? 'ds-select__value body-sm-regular' : 'ds-select__placeholder body-sm-regular'">
          {{ displayText() }}
        </span>
        
        <ds-icon 
          name="remixArrowDownSLine" 
          [size]="iconSize()" 
          class="ds-select__icon ds-select__icon--trailing"
          [class.ds-select__icon--open]="isOpen()"
        />
      </button>

      <div *ngpSelectPortal ngpSelectDropdown [style.width.px]="triggerElement?.offsetWidth" class="ds-select__dropdown">
        <div class="ds-select__options" role="listbox">
          @for (group of groupedOptions(); track group.name) {
            <div class="ds-select__group">
              @if (group.name) {
                <div class="ds-select__group-label body-xs-medium">{{ group.name }}</div>
              }
              @for (option of group.options; track option.id) {
                <div
                  [ngpSelectOptionValue]="option.value"
                  [ngpSelectOptionDisabled]="option.disabled"
                  class="ds-select__option body-sm-regular"
                  role="option"
                  [attr.aria-disabled]="option.disabled"
                  [attr.data-disabled]="option.disabled ? '' : null"
                  ngpSelectOption
                >
                  <span class="ds-select__option-content">{{ option.label }}</span>
                  @if (isOptionSelected(option.value)) {
                    <ds-icon 
                      name="remixCheckLine" 
                      size="16px" 
                      class="ds-select__checkmark"
                    />
                  }
                </div>
              }
            </div>
          } @empty {
            <div class="ds-select__empty body-sm-regular">No options available</div>
          }
        </div>
      </div>
    </div>
  `
})
export class DsSelectComponent<T = unknown> implements ControlValueAccessor {
  @ViewChild('trigger') triggerElement: HTMLElement | undefined;
  
  // Inputs
  variant = input<SelectVariant>('default');
  placeholder = input<string>('Select an option');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  ghost = input<boolean>(false);
  options = input<DsSelectOption<T>[]>([]);
  ariaLabel = input<string>();
  ariaDescribedBy = input<string>();
  ariaLabelledBy = input<string>();

  // Outputs
  valueChange = output<T>();
  opened = output<void>();
  closed = output<void>();

  // Internal state
  valueSig = signal<T | undefined>(undefined);
  private disabledFromCva = signal<boolean>(false);
  private isOpenSig = signal<boolean>(false);

  isOpen = computed(() => this.isOpenSig());

  onOpenChange(open: boolean) {
    this.isOpenSig.set(open);
    if (open) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  value = computed(() => this.valueSig());
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  
  selectedOption = computed(() => {
    return this.options().find(opt => opt.value === this.valueSig());
  });

  displayText = computed(() => {
    return this.selectedOption()?.label || this.placeholder();
  });

  isOptionSelected(value: T): boolean {
    return this.valueSig() === value;
  }

  groupedOptions = computed(() => {
    const groups = new Map<string, DsSelectOption<T>[]>();
    const ungroupedOptions: DsSelectOption<T>[] = [];
    
    for (const option of this.options()) {
      if (option.group) {
        if (!groups.has(option.group)) {
          groups.set(option.group, []);
        }
        groups.get(option.group)!.push(option);
      } else {
        ungroupedOptions.push(option);
      }
    }

    const result = Array.from(groups.entries()).map(([name, options]) => ({
      name,
      options
    }));

    if (ungroupedOptions.length > 0) {
      result.push({
        name: '',
        options: ungroupedOptions
      });
    }

    return result;
  });

  containerClasses = computed(() => {
    const classes = ['ds-select', `ds-select--${this.variant()}`];
    if (this.effectiveDisabled()) classes.push('ds-select--disabled');
    if (this.ghost()) classes.push('ds-select--ghost');
    if (this.isOpen()) classes.push('ds-select--open');
    return classes.join(' ');
  });

  triggerClasses = computed(() => {
    return 'ds-select__trigger';
  });

  iconSize = computed(() => '16px');

  // ControlValueAccessor implementation
  writeValue(value: T | undefined): void {
    this.valueSig.set(value);
  }

  registerOnChange(fn: (val: T | undefined) => void): void {
    // The provideValueAccessor handles this automatically with the two-way binding
  }

  registerOnTouched(fn: () => void): void {
    // The provideValueAccessor handles this automatically
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}
