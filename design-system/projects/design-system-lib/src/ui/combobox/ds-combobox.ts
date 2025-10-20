import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, ElementRef, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DsIconComponent } from '../icon/ds-icon';
import { DsInputComponent } from '../input/ds-input';
import { DsSelectComponent, DsSelectOption } from '../select/ds-select';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

export type ComboboxVariant = 'default' | 'error' | 'warning' | 'success';

@Component({
  selector: 'ds-combobox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsIconComponent,
    DsInputComponent,
    DsSelectComponent,
    OverlayModule,
    CdkOverlayOrigin,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['ds-combobox.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsComboboxComponent), multi: true }],
  template: `
    <div [class]="containerClasses()">
      <div 
        #trigger
        cdkOverlayOrigin
        #triggerOrigin="cdkOverlayOrigin"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'listbox'"
        (click)="toggleDropdown()"
        class="ds-combobox__trigger-wrapper"
      >
        <div #customTriggerSlot [style.display]="hasCustomTrigger() ? 'contents' : 'none'">
          <ng-content></ng-content>
        </div>
        <div [style.display]="hasCustomTrigger() ? 'none' : 'block'" style="pointer-events: none; width: 100%;">
          <ds-select 
            [options]="selectOptions()"
            [placeholder]="selectPlaceholder()"
            [(ngModel)]="displayValue"
          />
        </div>
      </div>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="triggerOrigin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (backdropClick)="closeDropdown()"
      (detach)="closeDropdown()"
    >
      <div 
        class="ds-combobox__dropdown"
        [style.min-width.px]="triggerWidth"
        [style.width]="width()"
      >
        <div class="ds-combobox__search">
            <ds-input
            #searchInput
            [ngModel]="filterValue()"
            (ngModelChange)="filterValue.set($event)"
            [placeholder]="placeholder()"
            [leadingIcon]="'remixSearchLine'"
            [ghost]="true"
          />
        </div>

        <div class="ds-combobox__options" role="listbox">
          @for (option of filteredOptions(); track option) {
            <div 
              class="ds-combobox__option" 
              role="option"
              [attr.aria-selected]="isOptionSelected(option)"
              [attr.data-selected]="isOptionSelected(option) ? '' : null"
              (click)="handleOptionClick(option)"
            >
              <span class="body-sm-regular">{{ option }}</span>
              @if (isOptionSelected(option)) {
                <ds-icon name="remixCheckLine" [size]="iconSize()" class="ds-combobox__checkmark" />
              }
            </div>
          } @empty {
            <div class="ds-combobox__empty">No options found</div>
          }
        </div>
      </div>
    </ng-template>
  `,
})
export class DsComboboxComponent implements ControlValueAccessor, AfterViewInit {
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideCombobox = target.closest('.ds-combobox');
    const isInsideDropdown = target.closest('.ds-combobox__dropdown');
    
    if (!isInsideCombobox && !isInsideDropdown && this.isOpen()) {
      this.closeDropdown();
    }
  }

  // Inputs
  placeholder = input<string>('Search...');
  selectPlaceholder = input<string>('Select an option');
  options = input<string[]>([]);
  disabled = input<boolean>(false);
  width = input<string>('auto');

  // Outputs
  valueChange = output<string>();
  opened = output<void>();
  closed = output<void>();

  // Internal state
  private valueSig = signal<string>('');
  filterValue = signal<string>('');
  displayValue = '';
  private disabledFromCva = signal<boolean>(false);
  private isOpenSig = signal<boolean>(false);
  private hasCustomTriggerSig = signal<boolean>(false);

  // View children
  @ViewChild('trigger', { read: ElementRef }) triggerElement!: ElementRef<HTMLElement>;
  @ViewChild('customTriggerSlot', { read: ElementRef }) customTriggerSlot!: ElementRef<HTMLElement>;
  @ViewChild('searchInput') searchInput!: DsInputComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Check for custom trigger content after view initialization
    this.updateCustomTriggerDetection();
  }

  private updateCustomTriggerDetection() {
    if (this.customTriggerSlot?.nativeElement) {
      const slot = this.customTriggerSlot.nativeElement;
      const hasContent = slot.childNodes.length > 0 && 
             Array.from(slot.childNodes).some(node => 
               node.nodeType === Node.ELEMENT_NODE || 
               (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
             );
      this.hasCustomTriggerSig.set(hasContent);
      this.cdr.detectChanges();
    }
  }

  // Computed values
  value = computed(() => this.valueSig());
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());
  isOpen = computed(() => this.isOpenSig());
  iconSize = computed(() => '16px');
  hasCustomTrigger = computed(() => this.hasCustomTriggerSig());
  
  selectOptions = computed(() => {
    return this.options().map((option, index) => ({
      id: `option-${index}`,
      label: option,
      value: option
    } as DsSelectOption<string>));
  });

  // Filter options based on input value
  filteredOptions = computed(() => {
    const filter = this.filterValue().toLowerCase();
    return this.options().filter(option => 
      option.toLowerCase().includes(filter)
    );
  });

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

  containerClasses = computed(() => {
    const classes = ['ds-combobox'];
    if (this.isOpen()) classes.push('ds-combobox--open');
    if (this.effectiveDisabled()) classes.push('ds-combobox--disabled');
    return classes.join(' ');
  });

  // Event handlers
  toggleDropdown() {
    if (this.effectiveDisabled()) return;
    
    const newState = !this.isOpenSig();
    
    if (newState && this.triggerElement) {
      this.triggerWidth = this.triggerElement.nativeElement.offsetWidth;
    }
    
    this.isOpenSig.set(newState);
    if (newState) {
      this.opened.emit();
      // Focus search input when opening
      setTimeout(() => {
        const inputEl = this.searchInput?.inputElement()?.nativeElement;
        if (inputEl) {
          inputEl.focus();
        }
      });
    } else {
      this.closed.emit();
    }
  }

  closeDropdown() {
    if (this.isOpenSig()) {
      this.isOpenSig.set(false);
      this.closed.emit();
      // Reset filter when closing
      this.filterValue.set('');
    }
  }

  handleFilterChange(value: string) {
    this.filterValue.set(value);
  }

  handleOptionClick(option: string) {
    if (this.effectiveDisabled()) return;
    
    this.valueSig.set(option);
    this.displayValue = option;
    this.onChangeFn(option);
    this.valueChange.emit(option);
    this.onTouchedFn();
    this.closeDropdown();
  }

  isOptionSelected(option: string): boolean {
    return this.valueSig() === option;
  }

  // ControlValueAccessor implementation
  private onChangeFn: (val: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string): void {
    this.valueSig.set(value ?? '');
    this.displayValue = value ?? '';
    this.filterValue.set(value ?? '');
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
