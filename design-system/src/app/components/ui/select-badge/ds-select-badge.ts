import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DsBadgeComponent } from '../badge/ds-badge';
import { DsIconComponent } from '../icon/ds-icon';
import { DsComboboxComponent } from '../combobox/ds-combobox';

export interface BadgeOption {
  id: string;
  label: string;
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'destructive' | 'blue' | 'light-purple' | 'pink' | 'salmon-orange' | 'orange' | 'lime-green' | 'grey';
  icon?: string;
}

/**
 * A specialized badge selector component for priorities, statuses, and categorized options.
 * Built on top of ds-combobox (without search) for consistent behavior and accessibility.
 * Perfect for selecting priorities, statuses, or any categorized options in task drawers and forms.
 * 
 * @example
 * Basic usage:
 * ```html
 * <ds-select-badge 
 *   [options]="priorityOptions"
 *   [(ngModel)]="selectedPriorityId"
 *   placeholder="Select priority">
 * </ds-select-badge>
 * ```
 * 
 * @example
 * With ghost mode for inline editing:
 * ```html
 * <ds-form-field label="Priority" layout="horizontal">
 *   <ds-select-badge 
 *     [ghost]="true"
 *     [options]="priorities"
 *     [(ngModel)]="task.priorityId">
 *   </ds-select-badge>
 * </ds-form-field>
 * ```
 */
@Component({
  selector: 'ds-select-badge',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsBadgeComponent,
    DsIconComponent,
    DsComboboxComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-select-badge.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsSelectBadgeComponent), multi: true }
  ],
  template: `
    <ds-combobox
      [options]="options()"
      [optionLabelFn]="getBadgeLabel"
      [showSearch]="false"
      [selectPlaceholder]="placeholder()"
      [disabled]="effectiveDisabled()"
      [usePortal]="usePortal()"
      [(ngModel)]="selectedBadgeObj"
      (ngModelChange)="onBadgeChange($event)"
    >
      <!-- Custom trigger button -->
      <button
        type="button"
        [class]="triggerClasses()"
        [disabled]="effectiveDisabled()"
      >
        @if (selectedBadge()) {
          <ds-badge
            [variant]="selectedBadge()!.variant || 'default'"
            [contentType]="selectedBadge()!.icon ? 'icon-text' : 'text'"
            [content]="selectedBadge()!.label"
            [leadingIcon]="selectedBadge()!.icon"
            class="badge-select__badge"
          />
        } @else {
          <span class="badge-select__placeholder select-trigger-base__placeholder body-sm-regular">{{ placeholder() }}</span>
        }
        
        <ds-icon 
          name="remixArrowDownSLine" 
          size="16px" 
          class="badge-select__icon select-trigger-base__icon"
        />
      </button>

      <!-- Custom option template with badges -->
      <ng-template #optionTemplate let-badge let-selected="selected">
                <ds-badge
          [variant]="badge.variant || 'default'"
          [contentType]="badge.icon ? 'icon-text' : 'text'"
          [content]="badge.label"
          [leadingIcon]="badge.icon"
        />
      </ng-template>
    </ds-combobox>
  `,
})
export class DsSelectBadgeComponent implements ControlValueAccessor {
  // Inputs
  options = input<BadgeOption[]>([]);
  placeholder = input<string>('Select option');
  variant = input<'default' | 'error' | 'warning' | 'success'>('default');
  disabled = input<boolean>(false);
  ghost = input<boolean>(false);
  usePortal = input<boolean>(true); // Control portal behavior for drawer contexts

  // Outputs
  valueChange = output<string | null>();

  // Internal state
  private selectedBadgeId = signal<string | null>(null);
  selectedBadgeObj: BadgeOption | null = null;
  private disabledFromCva = signal<boolean>(false);
  private onTouched: () => void = () => {};
  private onChange: (value: string | null) => void = () => {};

  // Computed properties
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());

  selectedBadge = computed(() => {
    const badgeId = this.selectedBadgeId();
    if (!badgeId) return null;
    return this.options().find(b => b.id === badgeId) || null;
  });

  triggerClasses = computed(() => {
    const classes = ['select-trigger-base'];
    classes.push(`select-trigger-base--${this.variant()}`);
    if (this.effectiveDisabled()) classes.push('select-trigger-base--disabled');
    if (this.ghost()) classes.push('select-trigger-base--ghost');
    return classes.join(' ');
  });

  // Helper methods
  getBadgeLabel = (badge: BadgeOption): string => {
    return badge.label;
  };

  // Event handlers
  onBadgeChange(badge: BadgeOption | null): void {
    if (badge) {
      this.selectedBadgeId.set(badge.id);
      this.selectedBadgeObj = badge;
      this.onChange(badge.id);
      this.valueChange.emit(badge.id);
    } else {
      this.selectedBadgeId.set(null);
      this.selectedBadgeObj = null;
      this.onChange(null);
      this.valueChange.emit(null);
    }
  }

  // ControlValueAccessor implementation
  writeValue(badgeId: string | null): void {
    this.selectedBadgeId.set(badgeId);
    if (badgeId) {
      const badge = this.options().find(b => b.id === badgeId);
      if (badge) {
        this.selectedBadgeObj = badge;
      }
    } else {
      this.selectedBadgeObj = null;
    }
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromCva.set(isDisabled);
  }
}
