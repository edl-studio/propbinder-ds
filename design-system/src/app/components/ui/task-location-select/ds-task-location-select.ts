import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DsIconComponent } from '../icon/ds-icon';
import { DsTooltipComponent } from '../tooltip/ds-tooltip';
import { DsComboboxComponent } from '../combobox/ds-combobox';

export type TaskLocationType = 'property' | 'lease' | 'inquiry' | 'none';

// Data interfaces for drill-down navigation
export interface Property {
  id: string;
  name: string;
  leases?: Lease[];
}

export interface Lease {
  id: string;
  name: string;
  propertyId: string;
  address?: string;
  inquiries?: Inquiry[];
}

export interface Inquiry {
  id: string;
  title: string;
  leaseId: string;
  description?: string;
}

export interface TaskLocation {
  type: TaskLocationType;
  id?: string;
  name?: string;
  propertyId?: string;
  leaseId?: string;
  inquiryId?: string;
}

export interface TaskLocationData {
  properties: Property[];
  leases: Lease[];
  inquiries: Inquiry[];
}

/**
 * Task Location Select Component with Drill-Down Navigation
 * 
 * A specialized component for choosing task locations with multi-step drill-down:
 * 1. Select a property
 * 2. Select a lease within that property
 * 3. Select an inquiry within that lease
 * 
 * Features:
 * - Multi-step navigation with breadcrumbs
 * - Searchable at each level
 * - Back button navigation
 * - Shows icon + text + ID badge after task is created
 * - Supports ghost mode for inline editing
 */
@Component({
  selector: 'ds-task-location-select',
  standalone: true,
  imports: [CommonModule, FormsModule, DsIconComponent, DsTooltipComponent, DsComboboxComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-task-location-select.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsTaskLocationSelectComponent), multi: true }
  ],
  template: `
    <div [class]="containerClasses()">
      <div class="tw-flex tw-items-center">
        @if (created() && !isEditing()) {
          <!-- Created state: Show icon, text, and ID badge -->
          <button 
            type="button"
            class="task-location-select__created"
            [disabled]="disabled()"
            (click)="openDropdown()"
          >
            <div class="task-location-select__content">
              @if (selectedLocation()?.type && selectedLocation()?.type !== 'none') {
                <ds-icon 
                  [name]="getIconForType(selectedLocation()!.type)"
                  size="16px"
                  color="secondary"
                  class="task-location-select__icon"
                />
              }
              
              <span class="task-location-select__text">
                {{ displayText() }}
              </span>
              
              <ds-icon 
                name="remixArrowDownSLine" 
                size="16px" 
                class="task-location-select__dropdown-icon"
              />
            </div>
          </button>
        } @else {
          <!-- Creation state with drill-down combobox -->
          <ds-combobox
            [options]="currentOptions()"
            [optionLabelFn]="getOptionLabel"
            [placeholder]="currentPlaceholder()"
            [selectPlaceholder]="displayText()"
            [disabled]="disabled()"
            [usePortal]="usePortal()"
            [width]="'256px'"
            [ngModel]="currentlySelectedOption()"
            (opened)="handleDropdownOpen()"
            (closed)="handleDropdownClose()"
            class="tw-flex-1"
          >
          <!-- Custom trigger button -->
          <button
            type="button"
            [class]="triggerClasses()"
            [disabled]="disabled()"
            [style.padding-left]="currentIcon() ? '0.5rem' : null"
          >
            @if (currentIcon()) {
              <ds-icon 
                [name]="currentIcon()!" 
                size="16px"
                color="tertiary"
                class="task-location-select__icon"
              />
            }
            
          <span [class]="textClasses()">
            {{ displayText() }}
          </span>
          
          <ds-icon 
            name="remixArrowDownSLine" 
            size="16px" 
            class="task-location-select__dropdown-icon"
          />
        </button>
          
          <!-- Custom option templates -->
          <ng-template #optionTemplate let-option let-selected="selected">
            <div 
              class="task-location-drill-option"
              (click)="handleOptionClick(option, $event)"
            >
              @if (currentView() === 'property') {
                <ds-icon 
                  [name]="getIconForOption(option)" 
                  size="16px"
                  class="task-location-option__icon"
                />
              }
              
              <div class="task-location-option__content">
                @if (getOptionBreadcrumb(option); as breadcrumb) {
                  <div class="task-location-option__breadcrumb body-xs-regular">
                    <ds-icon name="remixBuilding4Line" size="12px" />
                    <span>{{ breadcrumb }}</span>
                  </div>
                }
                <div class="body-sm-medium">{{ getOptionLabel(option) }}</div>
              </div>
            </div>
          </ng-template>
          
          <!-- Footer template for navigation -->
          <ng-template #footerTemplate>
            <div class="task-location-footer">
              @if (canNavigateToProperty()) {
                <button
                  type="button"
                  class="task-location-footer__item"
                  (click)="navigateToView('property', $event)"
                >
                  <ds-icon name="remixSearchLine" size="16px" />
                  <span>Search property</span>
                  <ds-icon name="remixArrowRightSLine" size="16px" class="task-location-footer__arrow" />
                </button>
              }
              
              @if (canNavigateToLease()) {
                <button
                  type="button"
                  class="task-location-footer__item"
                  (click)="navigateToView('lease', $event)"
                >
                  <ds-icon name="remixSearchLine" size="16px" />
                  <span>Search lease</span>
                  <ds-icon name="remixArrowRightSLine" size="16px" class="task-location-footer__arrow" />
                </button>
              }
              
              @if (canNavigateToInquiry()) {
                <button
                  type="button"
                  class="task-location-footer__item"
                  (click)="navigateToView('inquiry', $event)"
                >
                  <ds-icon name="remixSearchLine" size="16px" />
                  <span>Search inquiry</span>
                  <ds-icon name="remixArrowRightSLine" size="16px" class="task-location-footer__arrow" />
                </button>
              }
            </div>
          </ng-template>
        </ds-combobox>
      }
      
      <!-- ID badge - always visible in created mode when there's an ID -->
      @if (created() && selectedLocation()?.id && selectedLocation()?.type !== 'none') {
        <ds-tooltip [text]="showCopiedFeedback() ? 'Copied!' : 'Copy ID'" placement="top">
          <div 
            slot="trigger"
            class="task-location-select__id-badge"
            (click)="copyIdToClipboard($event)"
          >
            @if (showCopiedFeedback()) {
              <span class="task-location-select__id-text">Copied</span>
            } @else {
              <ds-icon 
                name="remixHashtag" 
                size="16px" 
                color="secondary"
                class="task-location-select__hash-icon"
              />
              <span class="task-location-select__id-text">{{ getDisplayId() }}</span>
            }
          </div>
        </ds-tooltip>
      }
      </div>
    </div>
  `
})
export class DsTaskLocationSelectComponent implements ControlValueAccessor {
  // Inputs
  variant = input<'default' | 'error' | 'warning' | 'success'>('default');
  placeholder = input<string>('Select location');
  disabled = input<boolean>(false);
  ghost = input<boolean>(false);
  created = input<boolean>(false);
  locationData = input<TaskLocationData>({ properties: [], leases: [], inquiries: [] });
  usePortal = input<boolean>(true); // Control portal behavior for drawer contexts

  // Outputs
  valueChange = output<TaskLocation | null>();

  // View children
  @ViewChild(DsComboboxComponent) combobox?: DsComboboxComponent;

  // Internal state
  private selectedValue = signal<TaskLocation | null>(null);
  selectedOption: any = null;
  private disabledFromCva = signal<boolean>(false);
  showCopiedFeedback = signal<boolean>(false);
  private copyTimeoutId: number | null = null;
  protected isEditing = signal<boolean>(false); // Track if user is editing in created mode

  // Navigation state for drill-down
  navigationState = signal<{
    currentView: 'property' | 'lease' | 'inquiry';
    selectedProperty: Property | null;
    selectedLease: Lease | null;
  }>({
    currentView: 'property',
    selectedProperty: null,
    selectedLease: null
  });

  // Computed properties
  currentView = computed(() => this.navigationState().currentView);

  selectedLocation = computed<TaskLocation | null>(() => this.selectedValue());

  displayText = computed(() => {
    const location = this.selectedLocation();
    const state = this.navigationState();
    
    // ALWAYS show saved location if it exists (this is what's actually selected)
    if (location && location.name) {
      return location.name;
    }
    
    // Only show navigation state when making a NEW selection (no saved location yet)
    if (state.selectedLease) {
      return state.selectedLease.name;
    }
    if (state.selectedProperty) {
      return state.selectedProperty.name;
    }
    
    return this.placeholder();
  });

  currentPlaceholder = computed(() => {
    switch (this.currentView()) {
      case 'property':
        return 'Search properties...';
      case 'lease':
        return 'Search leases...';
      case 'inquiry':
        return 'Search inquiries...';
      default:
        return 'Search...';
    }
  });

  currentOptions = computed(() => {
    const state = this.navigationState();
    const data = this.locationData();
    
    switch (state.currentView) {
      case 'property':
        return data.properties;
      case 'lease':
        if (!state.selectedProperty) return [];
        return data.leases.filter(lease => lease.propertyId === state.selectedProperty!.id);
      case 'inquiry':
        if (!state.selectedLease) return [];
        return data.inquiries.filter(inquiry => inquiry.leaseId === state.selectedLease!.id);
      default:
        return [];
    }
  });

  currentlySelectedOption = computed(() => {
    const location = this.selectedLocation();
    const view = this.currentView();
    const options = this.currentOptions();
    
    if (!location) return null;
    
    // Find the option that matches the saved location in the current view
    switch (view) {
      case 'property':
        return (options as Property[]).find(opt => opt.id === location.propertyId) || null;
      case 'lease':
        return (options as Lease[]).find(opt => opt.id === location.leaseId) || null;
      case 'inquiry':
        return (options as Inquiry[]).find(opt => opt.id === location.inquiryId) || null;
      default:
        return null;
    }
  });

  textClasses = computed(() => {
    const state = this.navigationState();
    const hasValue = this.selectedLocation() !== null || state.selectedProperty !== null;
    return hasValue 
      ? 'task-location-select__value' 
      : 'task-location-select__placeholder';
  });

  currentIcon = computed(() => {
    // Check saved location first (what's actually selected)
    const location = this.selectedLocation();
    if (location?.type) {
      return this.getIconForType(location.type);
    }
    
    // Fall back to navigation state for immediate feedback during NEW selection
    const state = this.navigationState();
    if (state.selectedLease) {
      return 'remixFilePaperLine';
    }
    if (state.selectedProperty) {
      return 'remixBuilding4Line';
    }
    
    return null;
  });

  triggerClasses = computed(() => {
    const classes = ['task-location-select__trigger'];
    classes.push(`task-location-select__trigger--${this.variant()}`);
    if (this.ghost()) classes.push('task-location-select__trigger--ghost');
    if (this.disabled()) classes.push('task-location-select__trigger--disabled');
    return classes.join(' ');
  });

  containerClasses = computed(() => {
    const classes = ['task-location-select'];
    if (this.created()) classes.push('task-location-select--created');
    if (this.ghost()) classes.push('task-location-select--ghost');
    if (this.disabled()) classes.push('task-location-select--disabled');
    return classes.join(' ');
  });

  // Helper methods
  getOptionLabel = (option: any): string => {
    if (this.currentView() === 'property') return (option as Property).name;
    if (this.currentView() === 'lease') return (option as Lease).name;
    if (this.currentView() === 'inquiry') return (option as Inquiry).title;
    return '';
  };

  getOptionSecondaryText(option: any): string | null {
    if (this.currentView() === 'lease' && (option as Lease).address) {
      return (option as Lease).address!;
    }
    if (this.currentView() === 'inquiry' && (option as Inquiry).description) {
      return (option as Inquiry).description!;
    }
    return null;
  }

  getOptionBreadcrumb(option: any): string | null {
    const data = this.locationData();
    
    if (this.currentView() === 'lease') {
      // Show property name for leases
      const lease = option as Lease;
      const property = data.properties.find(p => p.id === lease.propertyId);
      return property ? property.name : null;
    }
    
    if (this.currentView() === 'inquiry') {
      // Show property / lease for inquiries
      const inquiry = option as Inquiry;
      const lease = data.leases.find(l => l.id === inquiry.leaseId);
      if (lease) {
        const property = data.properties.find(p => p.id === lease.propertyId);
        return property ? `${property.name} / ${lease.name}` : lease.name;
      }
    }
    
    return null;
  }

  canNavigateToProperty(): boolean {
    return this.currentView() !== 'property';
  }

  canNavigateToLease(): boolean {
    return this.currentView() !== 'lease';
  }

  canNavigateToInquiry(): boolean {
    return this.currentView() !== 'inquiry';
  }

  navigateToView(view: 'property' | 'lease' | 'inquiry', event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent combobox from closing
      event.preventDefault();
    }
    
    const state = this.navigationState();
    
    if (view === 'property') {
      this.navigationState.set({
        currentView: 'property',
        selectedProperty: null,
        selectedLease: null
      });
    } else if (view === 'lease') {
      // Navigate to lease view - keep property if we have one
      this.navigationState.set({
        ...state,
        currentView: 'lease',
        selectedLease: null
      });
    } else if (view === 'inquiry') {
      // Navigate to inquiry view - keep property and lease if we have them
      this.navigationState.set({
        ...state,
        currentView: 'inquiry'
      });
    }
  }

  getIconForOption(option: any): string {
    if (this.currentView() === 'property') return 'remixBuilding4Line';
    if (this.currentView() === 'lease') return 'remixFilePaperLine';
    if (this.currentView() === 'inquiry') return 'remixBriefcaseLine';
    return 'remixMapPinLine';
  }

  getIconForType(type: TaskLocationType): string {
    switch (type) {
      case 'property':
        return 'remixBuilding4Line';
      case 'lease':
        return 'remixFilePaperLine';
      case 'inquiry':
        return 'remixBriefcaseLine';
      default:
        return 'remixMapPinLine';
    }
  }

  getDisplayId(): string {
    const location = this.selectedLocation();
    if (!location) return '';
    return location.inquiryId || location.leaseId || location.propertyId || location.id || '';
  }

  // Navigation methods
  handleOptionClick(option: any, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent combobox from handling the click
    }
    
    if (!option) return;

    // Clear saved location so trigger shows navigation state immediately
    this.selectedValue.set(null);

    const state = this.navigationState();

    switch (state.currentView) {
      case 'property':
        // Selected a property, move to lease selection
        this.navigationState.set({
          ...state,
          currentView: 'lease',
          selectedProperty: option as Property
        });
        this.selectedOption = null; // Reset for next selection
        // Keep dropdown open for next step
        break;

      case 'lease':
        // Selected a lease, move to inquiry selection
        this.navigationState.set({
          ...state,
          currentView: 'inquiry',
          selectedLease: option as Lease
        });
        this.selectedOption = null;
        // Keep dropdown open for next step
        break;

      case 'inquiry':
        // Selected an inquiry, complete the selection
        const inquiry = option as Inquiry;
        const finalLocation: TaskLocation = {
          type: 'inquiry',
          id: inquiry.id,
          name: inquiry.title,
          propertyId: state.selectedProperty?.id,
          leaseId: state.selectedLease?.id,
          inquiryId: inquiry.id
        };
        this.selectedValue.set(finalLocation);
        this.valueChange.emit(finalLocation);
        this.onChange(finalLocation);
        
        // Close dropdown now that selection is complete
        if (this.combobox) {
          this.combobox.closeDropdown();
        }
        
        // Reset navigation state for next time
        this.resetNavigationState();
        break;
    }
  }

  handleDropdownOpen(): void {
    const location = this.selectedValue();
    
    // Clear the combobox search field (with small delay to ensure it happens after writeValue)
    if (this.combobox) {
      setTimeout(() => {
        if (this.combobox) {
          this.combobox.filterValue.set('');
        }
      }, 0);
    }
    
    if (!location) {
      // No existing selection, start from property level
      this.resetNavigationState();
      return;
    }
    
    // DON'T clear the saved location - keep it so the trigger stays stable
    // Only set up navigation state to show the appropriate view
    const data = this.locationData();
    
    if (location.type === 'inquiry') {
      // Show inquiry list for this lease
      const property = data.properties.find(p => p.id === location.propertyId);
      const lease = data.leases.find(l => l.id === location.leaseId);
      
      if (property && lease) {
        this.navigationState.set({
          currentView: 'inquiry',
          selectedProperty: property,
          selectedLease: lease
        });
      } else {
        this.resetNavigationState();
      }
    } else if (location.type === 'lease') {
      // Show lease list for this property
      const property = data.properties.find(p => p.id === location.propertyId);
      const lease = data.leases.find(l => l.id === location.leaseId);
      
      if (property && lease) {
        this.navigationState.set({
          currentView: 'lease',
          selectedProperty: property,
          selectedLease: lease  // Set the lease so icon and text display correctly
        });
      } else {
        this.resetNavigationState();
      }
    } else if (location.type === 'property') {
      // Property level - show property list
      this.resetNavigationState();
    }
  }

  triggerComboboxClick(): void {
    // Manually trigger the combobox dropdown
    if (this.combobox && !this.disabled()) {
      this.combobox.toggleDropdown();
    }
  }

  goBack(): void {
    const state = this.navigationState();
    
    if (state.currentView === 'inquiry') {
      // Go back to lease selection
      this.navigationState.set({
        ...state,
        currentView: 'lease',
        selectedLease: null
      });
    } else if (state.currentView === 'lease') {
      // Go back to property selection
      this.navigationState.set({
        currentView: 'property',
        selectedProperty: null,
        selectedLease: null
      });
    }
    
    this.selectedOption = null;
  }

  handleDropdownClose(): void {
    const state = this.navigationState();
    const existingLocation = this.selectedValue();
    
    // Reset editing mode when dropdown closes
    this.isEditing.set(false);
    
    // If we already have a saved location, don't overwrite it
    // (user just reopened and closed without making a new selection)
    if (existingLocation) {
      this.resetNavigationState();
      return;
    }
    
    // Only save if user made a NEW selection (no existing saved location)
    if (state.selectedLease) {
      // User selected up to lease level
      const location: TaskLocation = {
        type: 'lease',
        id: state.selectedLease.id,
        name: state.selectedLease.name,
        propertyId: state.selectedProperty?.id,
        leaseId: state.selectedLease.id
      };
      this.selectedValue.set(location);
      this.valueChange.emit(location);
      this.onChange(location);
      this.resetNavigationState();
    } else if (state.selectedProperty) {
      // User selected only property level
      const location: TaskLocation = {
        type: 'property',
        id: state.selectedProperty.id,
        name: state.selectedProperty.name,
        propertyId: state.selectedProperty.id
      };
      this.selectedValue.set(location);
      this.valueChange.emit(location);
      this.onChange(location);
      this.resetNavigationState();
    } else {
      // No selection made, just reset
      this.resetNavigationState();
    }
  }

  resetNavigationState(): void {
    this.navigationState.set({
      currentView: 'property',
      selectedProperty: null,
      selectedLease: null
    });
  }

  openDropdown(): void {
    if (this.created()) {
      // Switch to editing mode so the combobox is rendered
      this.isEditing.set(true);
      // Wait for the combobox to be rendered, then open it
      setTimeout(() => {
        if (this.combobox) {
          this.combobox.toggleDropdown();
        }
      }, 0);
    } else if (this.combobox) {
      this.combobox.toggleDropdown();
    }
  }

  async copyIdToClipboard(event: Event): Promise<void> {
    event.stopPropagation();
    
    const id = this.getDisplayId();
    if (!id) return;
    
    try {
      await navigator.clipboard.writeText(id);
      
      if (this.copyTimeoutId !== null) {
        clearTimeout(this.copyTimeoutId);
      }
      
      this.showCopiedFeedback.set(true);
      
      this.copyTimeoutId = window.setTimeout(() => {
        this.showCopiedFeedback.set(false);
        this.copyTimeoutId = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy ID to clipboard:', err);
    }
  }

  // ControlValueAccessor implementation
  private onChange: (value: TaskLocation | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: TaskLocation | null): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: (value: TaskLocation | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}
