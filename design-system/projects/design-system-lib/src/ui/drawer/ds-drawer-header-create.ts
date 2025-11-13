import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from '../button/ds-button';

/**
 * A drawer header component for creation/editing states.
 * Displays a title on the left and action buttons on the right.
 * Supports both default actions (Cancel/Confirm) and custom actions via slots.
 * 
 * @example
 * Simple usage with default actions:
 * ```html
 * <ds-drawer-header-create 
 *   title="Create task"
 *   confirmText="Create task"
 *   (onCancel)="close()"
 *   (onConfirm)="handleCreate()"
 *   slot="header" />
 * ```
 * 
 * Custom actions via slot:
 * ```html
 * <ds-drawer-header-create title="Create task" slot="header">
 *   <div slot="actions">
 *     <ds-button variant="ghost" (clicked)="close()">Cancel</ds-button>
 *     <ds-button variant="primary" (clicked)="handleCreate()">Create</ds-button>
 *   </div>
 * </ds-drawer-header-create>
 * ```
 */
@Component({
  selector: 'ds-drawer-header-create',
  standalone: true,
  imports: [CommonModule, DsButtonComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-drawer-header-create.css'],
  template: `
    <div class="ds-drawer-header-create">
      <h2 class="ds-drawer-header-create__title heading-xl">{{ title() }}</h2>
      <div class="ds-drawer-header-create__actions">
        <ng-content select="[slot=actions]"></ng-content>
        @if (useDefaultActions()) {
          <!-- Default actions if no slot content -->
          <ds-button 
            variant="ghost" 
            (clicked)="onCancel.emit()"
            [disabled]="cancelDisabled()">
            {{ cancelText() }}
          </ds-button>
          <ds-button 
            variant="primary" 
            (clicked)="onConfirm.emit()"
            [disabled]="confirmDisabled()"
            [loading]="confirmLoading()">
            {{ confirmText() }}
          </ds-button>
        }
      </div>
    </div>
  `
})
export class DsDrawerHeaderCreateComponent {
  // Title (required)
  title = input.required<string>();
  
  // Default action texts (optional if using slots)
  cancelText = input('Cancel');
  confirmText = input('Create');
  
  // Action states
  cancelDisabled = input(false);
  confirmDisabled = input(false);
  confirmLoading = input(false);
  
  // Control whether to show default actions (true by default, set to false when using slots)
  useDefaultActions = input(true);
  
  // Events
  onCancel = output<void>();
  onConfirm = output<void>();
}

