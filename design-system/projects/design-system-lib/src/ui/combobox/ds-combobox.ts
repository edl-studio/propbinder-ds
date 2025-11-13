import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, ElementRef, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, TemplateRef, contentChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DsIconComponent } from '../icon/ds-icon';
import { DsInputComponent } from '../input/ds-input';
import { DsSelectComponent, DsSelectOption } from '../select/ds-select';
import { OverlayModule, ConnectedPosition, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
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
      [cdkConnectedOverlayScrollStrategy]="scrollStrategy"
      (backdropClick)="closeDropdown()"
      (detach)="closeDropdown()"
    >
      <div 
        class="ds-combobox__dropdown"
        [style.min-width.px]="triggerWidth"
        [style.width]="width()"
      >
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
            (ngModelChange)="filterValue.set($event)"
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
              role="option"
              [attr.aria-selected]="isOptionSelected(option)"
              [attr.data-selected]="isOptionSelected(option) ? '' : null"
              (click)="handleOptionClick(option)"
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
  options = input<any[]>([]);
  disabled = input<boolean>(false);
  width = input<string>('auto');
  showSearch = input<boolean>(true);
  optionLabelFn = input<(option: any) => string>((opt) => String(opt));
  
  // Content projection for custom option rendering
  optionTemplate = contentChild<TemplateRef<any>>('optionTemplate');
  headerTemplate = contentChild<TemplateRef<any>>('headerTemplate');
  footerTemplate = contentChild<TemplateRef<any>>('footerTemplate');

  // Outputs
  valueChange = output<any>();
  opened = output<void>();
  closed = output<void>();

  // Internal state
  private valueSig = signal<any>('');
  filterValue = signal<string>('');
  displayValue = '';
  private disabledFromCva = signal<boolean>(false);
  private isOpenSig = signal<boolean>(false);
  private hasCustomTriggerSig = signal<boolean>(false);

  // View children
  @ViewChild('trigger', { read: ElementRef }) triggerElement!: ElementRef<HTMLElement>;
  @ViewChild('customTriggerSlot', { read: ElementRef }) customTriggerSlot!: ElementRef<HTMLElement>;
  @ViewChild('searchInput') searchInput!: DsInputComponent;

  // Overlay service and scroll strategy
  private overlay = inject(Overlay);
  scrollStrategy: ScrollStrategy = this.overlay.scrollStrategies.reposition();
  private scrollableContainer: HTMLElement | null = null;
  private containerScrollHandler: (() => void) | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  private findScrollableContainer(element: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = element.parentElement;
    while (current) {
      const style = window.getComputedStyle(current);
      const overflowY = style.overflowY;
      const overflow = style.overflow;
      
      // Check if element is scrollable
      if (
        (overflowY === 'auto' || overflowY === 'scroll' || overflow === 'auto' || overflow === 'scroll') &&
        current.scrollHeight > current.clientHeight
      ) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }

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
      // Focus search input when opening (only if search is enabled)
      if (this.showSearch()) {
      setTimeout(() => {
        const inputEl = this.searchInput?.inputElement()?.nativeElement;
        if (inputEl) {
          inputEl.focus();
        }
      });
      }
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

  handleOptionClick(option: any) {
    if (this.effectiveDisabled()) return;
    
    const label = this.getOptionLabel(option);
    this.valueSig.set(option);
    this.displayValue = label;
    this.onChangeFn(option);
    this.valueChange.emit(option);
    this.onTouchedFn();
    this.closeDropdown();
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
    this.valueSig.set(value ?? '');
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
