import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, TemplateRef, contentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DsIconComponent } from '../icon/ds-icon';
import { DsInputComponent } from '../input/ds-input';
import { DsSelectComponent, DsSelectOption } from '../select/ds-select';
import { CdkConnectedOverlay, ConnectedPosition, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { 
  NgpCombobox,
  NgpComboboxButton,
  NgpComboboxDropdown,
  NgpComboboxInput,
  NgpComboboxOption, 
  NgpComboboxPortal 
} from 'ng-primitives/combobox';

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
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    NgpCombobox,
    NgpComboboxButton,
    NgpComboboxDropdown,
    NgpComboboxInput,
    NgpComboboxOption,
    NgpComboboxPortal,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['ds-combobox.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsComboboxComponent), multi: true }],
  template: `
    <div 
      [class]="containerClasses()"
      [(ngpComboboxValue)]="valueSig"
      (ngpComboboxValueChange)="handleValueChange($event)"
      (ngpComboboxOpenChange)="handleOpenChange($event)"
      [ngpComboboxDisabled]="effectiveDisabled()"
      ngpCombobox
    >
      <div 
        #trigger
        class="ds-combobox__trigger-wrapper"
        ngpComboboxButton
        (click)="onTriggerClick()"
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

      <!-- Dropdown with portal (for normal use) -->
      @if (usePortal()) {
      <div 
        *ngpComboboxPortal
        ngpComboboxDropdown
        class="ds-combobox__dropdown"
        [style.min-width.px]="triggerWidth"
        [style.width]="width()"
      >
        <ng-container *ngTemplateOutlet="dropdownContent"></ng-container>
      </div>
      }

      <!-- Dropdown without portal (for use inside dialogs/drawers) -->
      @if (!usePortal() && isOpen()) {
      <!-- Backdrop for closing on outside click -->
      <div 
        class="ds-combobox__backdrop" 
        (click)="closeDropdown()"
      ></div>
      <div 
        ngpComboboxDropdown
        [class]="dropdownClasses()"
        [style.min-width.px]="triggerWidth"
        [style.width]="width()"
      >
        <ng-container *ngTemplateOutlet="dropdownContent"></ng-container>
      </div>
      }

      <!-- Dropdown content template (shared by both portal and inline) -->
      <ng-template #dropdownContent>
        @if (headerTemplate(); as template) {
          <div class="ds-combobox__header">
            <ng-container *ngTemplateOutlet="template" />
          </div>
        }
        
        @if (showSearch()) {
        <div class="ds-combobox__search">
            <ds-input
            #searchInput
            [ngModel]="filterValue()"
            (ngModelChange)="handleFilterChange($event)"
            [placeholder]="placeholder()"
            [leadingIcon]="'remixSearchLine'"
            [ghost]="true"
          />
        </div>
        }

        <div class="ds-combobox__options" role="listbox">
          @for (option of filteredOptions(); track option) {
            <div 
              class="ds-combobox__option" 
              [ngpComboboxOptionValue]="option"
              ngpComboboxOption
            >
              @if (optionTemplate(); as template) {
                <ng-container 
                  *ngTemplateOutlet="template; context: {
                    $implicit: option,
                    selected: isOptionSelected(option)
                  }"
                />
              } @else {
                <span class="body-sm-regular">{{ getOptionLabel(option) }}</span>
              }
              @if (isOptionSelected(option)) {
                <ds-icon name="remixCheckLine" [size]="iconSize()" class="ds-combobox__checkmark" />
              }
            </div>
          } @empty {
            <div class="ds-combobox__empty">No options found</div>
          }
        </div>
        
        @if (footerTemplate(); as template) {
          <div class="ds-combobox__footer">
            <ng-container *ngTemplateOutlet="template" />
          </div>
        }
      </ng-template>
    </div>
  `,
})
export class DsComboboxComponent implements ControlValueAccessor, AfterViewInit {
  // Inputs
  placeholder = input<string>('Search...');
  selectPlaceholder = input<string>('Select an option');
  options = input<any[]>([]);
  disabled = input<boolean>(false);
  width = input<string>('auto');
  showSearch = input<boolean>(true);
  optionLabelFn = input<(option: any) => string>((opt) => String(opt));
  usePortal = input<boolean>(true); // Control whether to use portal or inline rendering
  align = input<'left' | 'right'>('left'); // Control dropdown alignment for inline rendering
  
  // Content projection for custom option rendering
  optionTemplate = contentChild<TemplateRef<any>>('optionTemplate');
  headerTemplate = contentChild<TemplateRef<any>>('headerTemplate');
  footerTemplate = contentChild<TemplateRef<any>>('footerTemplate');

  // Outputs
  valueChange = output<any>();
  opened = output<void>();
  closed = output<void>();

  // Internal state
  valueSig = signal<any>(undefined);
  filterValue = signal<string>('');
  displayValue = '';
  private disabledFromCva = signal<boolean>(false);
  private isOpenSig = signal<boolean>(false);
  private hasCustomTriggerSig = signal<boolean>(false);

  // View children
  @ViewChild('trigger', { read: ElementRef }) triggerElement!: ElementRef<HTMLElement>;
  @ViewChild('customTriggerSlot', { read: ElementRef }) customTriggerSlot!: ElementRef<HTMLElement>;
  @ViewChild('searchInput') searchInput!: DsInputComponent;

  triggerWidth = 0;

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
      label: this.getOptionLabel(option),
      value: option
    } as DsSelectOption<any>));
  });

  // Filter options based on input value
  filteredOptions = computed(() => {
    const filter = this.filterValue().toLowerCase();
    return this.options().filter(option => {
      const label = this.getOptionLabel(option);
      return label.toLowerCase().includes(filter);
    });
  });

  containerClasses = computed(() => {
    const classes = ['ds-combobox'];
    if (this.isOpen()) classes.push('ds-combobox--open');
    if (this.effectiveDisabled()) classes.push('ds-combobox--disabled');
    return classes.join(' ');
  });

  dropdownClasses = computed(() => {
    const classes = ['ds-combobox__dropdown', 'ds-combobox__dropdown--inline'];
    if (this.align() === 'right') classes.push('ds-combobox__dropdown--right');
    return classes.join(' ');
  });

  // Event handlers
  onTriggerClick() {
    if (this.effectiveDisabled()) return;
    
    if (this.triggerElement) {
      this.triggerWidth = this.triggerElement.nativeElement.offsetWidth;
    }
  }

  handleOpenChange(open: boolean) {
    this.isOpenSig.set(open);
    
    if (open) {
      this.opened.emit();
      // Clear filter when opening so search starts empty
      this.filterValue.set('');
      // Focus search input when opening (only if search is enabled)
      if (this.showSearch()) {
        // Try multiple times with different delays to ensure focus works
        this.attemptFocusSearchInput();
      }
    } else {
      this.closed.emit();
      // Reset filter when closing
      this.filterValue.set('');
    }
  }

  private attemptFocusSearchInput() {
    const attempts = [0, 10, 50, 100, 200];
    
    attempts.forEach(delay => {
      setTimeout(() => {
        const inputEl = this.searchInput?.inputElement()?.nativeElement;
        if (inputEl && document.activeElement !== inputEl) {
          inputEl.focus({ preventScroll: false });
          inputEl.click(); // Also try clicking
        }
      }, delay);
    });
  }

  handleFilterChange(value: string) {
    this.filterValue.set(value);
  }

  handleValueChange(option: any) {
    if (this.effectiveDisabled()) return;
    
    const label = option ? this.getOptionLabel(option) : '';
    this.valueSig.set(option);
    this.displayValue = label;
    this.onChangeFn(option);
    this.valueChange.emit(option);
    this.onTouchedFn();
    
    // Close the dropdown after selection
    this.closeDropdown();
  }

  // Public method to programmatically close the dropdown
  closeDropdown() {
    this.isOpenSig.set(false);
  }

  // Public method to programmatically toggle the dropdown
  toggleDropdown() {
    if (this.effectiveDisabled()) return;
    this.isOpenSig.set(!this.isOpenSig());
  }

  isOptionSelected(option: any): boolean {
    return this.valueSig() === option;
  }

  getOptionLabel(option: any): string {
    return this.optionLabelFn()(option);
  }

  // ControlValueAccessor implementation
  private onChangeFn: (val: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: any): void {
    this.valueSig.set(value ?? undefined);
    this.displayValue = value ? this.getOptionLabel(value) : '';
    this.filterValue.set(value ? this.getOptionLabel(value) : '');
  }

  registerOnChange(fn: (val: any) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}
