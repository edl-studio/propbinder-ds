import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconButtonComponent } from '../../button/ds-icon-button';

/**
 * Action button configuration
 */
export interface ActionButton {
  /** Icon name (from remix icons) */
  icon: string;
  /** Aria label for accessibility */
  ariaLabel: string;
  /** Action identifier (e.g., 'manage', 'delete', 'edit') */
  action: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button variant */
  variant?: 'ghost' | 'primary' | 'secondary' | 'destructive';
}

export interface ActionCellData {
  /** The row index */
  rowIndex: number;
  /** The row data */
  row?: any;
  /** Array of action buttons to display */
  actions?: ActionButton[];
  /** @deprecated Use actions array instead - Whether the delete button is disabled */
  deleteDisabled?: boolean;
}

/**
 * Action cell for row operations (manage, delete, edit, etc.)
 * Provides flexible action buttons for each row with 4px gap between buttons
 * 
 * @example
 * Single action (backwards compatible):
 * ```typescript
 * {
 *   id: 'actions',
 *   cell: (info) => actionCell(info.row.index)
 * }
 * ```
 * 
 * @example
 * Multiple actions:
 * ```typescript
 * {
 *   id: 'actions',
 *   cell: (info) => ({
 *     component: 'action',
 *     data: {
 *       rowIndex: info.row.index,
 *       row: info.row.original,
 *       actions: [
 *         { icon: 'remixSettings3Line', ariaLabel: 'Manage', action: 'manage' },
 *         { icon: 'remixDeleteBinLine', ariaLabel: 'Delete', action: 'delete' }
 *       ]
 *     }
 *   })
 * }
 * ```
 */
@Component({
  selector: 'action-cell',
  standalone: true,
  imports: [CommonModule, DsIconButtonComponent],
  template: `
    <div class="tw-flex tw-items-center tw-justify-end" style="gap: 4px;">
      @if (data().actions && data().actions!.length > 0) {
        <!-- Multiple actions mode -->
        @for (action of data().actions; track action.action) {
          <ds-icon-button 
            [icon]="action.icon" 
            [variant]="action.variant || 'ghost'"
            size="sm"
            [disabled]="action.disabled || false"
            [ariaLabel]="action.ariaLabel"
            (clicked)="actionClicked.emit({ action: action.action, rowIndex: data().rowIndex, row: data().row })"
          />
        }
      } @else {
        <!-- Legacy single delete button mode (backwards compatible) -->
        <ds-icon-button 
          icon="remixDeleteBinLine" 
          variant="ghost"
          size="sm"
          [disabled]="data().deleteDisabled || false"
          ariaLabel="Delete row"
          (clicked)="deleteClicked.emit(data().rowIndex)"
        />
      }
    </div>
  `,
})
export class ActionCellComponent {
  /** Cell data input */
  data = input.required<ActionCellData>();
  
  /** Emitted when an action button is clicked (new flexible API) */
  actionClicked = output<{ action: string; rowIndex: number; row?: any }>();
  
  /** @deprecated Use actionClicked instead - Emitted when delete button is clicked */
  deleteClicked = output<number>();
}

