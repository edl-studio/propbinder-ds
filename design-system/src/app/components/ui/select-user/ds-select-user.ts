import { Component, ViewEncapsulation, input, output, computed, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DsAvatarComponent } from '../../avatar/ds-avatar';
import { DsIconComponent } from '../../icon/ds-icon';
import { DsComboboxComponent } from '../../combobox/ds-combobox';

export interface UserOption {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  initials?: string;
}

/**
 * A specialized user selector component with avatar display and search functionality.
 * Built on top of ds-combobox for consistent behavior and interaction patterns.
 * Perfect for assigning users in task drawers, forms, and inline editing contexts.
 * 
 * @example
 * Basic usage:
 * ```html
 * <ds-select-user 
 *   [users]="userList"
 *   [(ngModel)]="selectedUserId"
 *   placeholder="Select user">
 * </ds-select-user>
 * ```
 * 
 * @example
 * With ghost mode for inline editing:
 * ```html
 * <ds-form-field label="Assignee" layout="horizontal">
 *   <ds-select-user 
 *     [ghost]="true"
 *     [users]="users"
 *     [(ngModel)]="task.assigneeId">
 *   </ds-select-user>
 * </ds-form-field>
 * ```
 */
@Component({
  selector: 'ds-select-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsAvatarComponent,
    DsIconComponent,
    DsComboboxComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-select-user.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsSelectUserComponent), multi: true }
  ],
  template: `
    <ds-combobox
      [options]="users()"
      [optionLabelFn]="getUserName"
      [placeholder]="'Search users...'"
      [selectPlaceholder]="placeholder()"
      [disabled]="effectiveDisabled()"
      [usePortal]="usePortal()"
      [(ngModel)]="selectedUserObj"
      (ngModelChange)="onUserChange($event)"
    >
      <!-- Custom trigger button -->
      <button
        type="button"
        [class]="triggerClasses()"
        [disabled]="effectiveDisabled()"
      >
        @if (selectedUser()) {
          <ds-avatar
            [type]="selectedUser()!.avatarUrl ? 'photo' : 'initials'"
            [src]="selectedUser()!.avatarUrl || ''"
            [initials]="selectedUser()!.initials || getInitials(selectedUser()!.name)"
            size="xs"
            class="user-select__avatar"
          />
          <span class="user-select__name select-trigger-base__value body-sm-regular">{{ selectedUser()!.name }}</span>
        } @else {
          <span class="user-select__placeholder select-trigger-base__placeholder body-sm-regular">{{ placeholder() }}</span>
        }
        
        <ds-icon 
          name="remixArrowDownSLine" 
          size="16px" 
          class="user-select__icon select-trigger-base__icon"
        />
      </button>

      <!-- Custom option template with avatars -->
      <ng-template #optionTemplate let-user let-selected="selected">
                <ds-avatar
                  [type]="user.avatarUrl ? 'photo' : 'initials'"
                  [src]="user.avatarUrl || ''"
                  [initials]="user.initials || getInitials(user.name)"
                  size="xs"
        />
        <span class="body-sm-regular">{{ user.name }}</span>
      </ng-template>
    </ds-combobox>
  `,
})
export class DsSelectUserComponent implements ControlValueAccessor {
  // Inputs
  users = input<UserOption[]>([]);
  placeholder = input<string>('Select user');
  variant = input<'default' | 'error' | 'warning' | 'success'>('default');
  disabled = input<boolean>(false);
  ghost = input<boolean>(false);
  usePortal = input<boolean>(true); // Control portal behavior for drawer contexts

  // Outputs
  valueChange = output<string | null>();

  // Internal state
  private selectedUserId = signal<string | null>(null);
  selectedUserObj: UserOption | null = null;
  private disabledFromCva = signal<boolean>(false);
  private onTouched: () => void = () => {};
  private onChange: (value: string | null) => void = () => {};

  // Computed properties
  effectiveDisabled = computed(() => this.disabled() || this.disabledFromCva());

  selectedUser = computed(() => {
    const userId = this.selectedUserId();
    if (!userId) return null;
    return this.users().find(u => u.id === userId) || null;
  });

  triggerClasses = computed(() => {
    const classes = ['select-trigger-base'];
    classes.push(`select-trigger-base--${this.variant()}`);
    if (this.effectiveDisabled()) classes.push('select-trigger-base--disabled');
    if (this.ghost()) classes.push('select-trigger-base--ghost');
    return classes.join(' ');
  });

  // Helper methods
  getUserName = (user: UserOption): string => {
    return user.name;
  };

  getInitials(name: string): string {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  // Event handlers
  onUserChange(user: UserOption | null): void {
    if (user) {
    this.selectedUserId.set(user.id);
      this.selectedUserObj = user;
    this.onChange(user.id);
    this.valueChange.emit(user.id);
    } else {
      this.selectedUserId.set(null);
      this.selectedUserObj = null;
      this.onChange(null);
      this.valueChange.emit(null);
    }
  }

  // ControlValueAccessor implementation
  writeValue(userId: string | null): void {
    this.selectedUserId.set(userId);
    if (userId) {
      const user = this.users().find(u => u.id === userId);
      if (user) {
        this.selectedUserObj = user;
      }
    } else {
      this.selectedUserObj = null;
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
