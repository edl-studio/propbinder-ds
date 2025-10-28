import { Component, input, output } from '@angular/core';
import { DsButtonComponent } from '../button/ds-button';

/**
 * A confirmation dialog component for simple yes/no or confirm/cancel interactions.
 * Always uses the small (sm) size variant for focused, quick decisions.
 * This component provides a pre-structured layout optimized for confirmation prompts.
 * 
 * @example
 * ```html
 * <button [ngpDialogTrigger]="confirmDialog" ngpButton>Delete Item</button>
 * 
 * <ng-template #confirmDialog let-close="close">
 *   <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
 *     <ds-confirmation-dialog 
 *       ngpDialog
 *       [title]="'Delete Item?'"
 *       [message]="'This action cannot be undone. Are you sure you want to delete this item?'"
 *       [confirmLabel]="'Delete'"
 *       [confirmVariant]="'destructive'"
 *       [cancelLabel]="'Cancel'"
 *       (confirm)="handleDelete(); close()"
 *       (cancel)="close()">
 *     </ds-confirmation-dialog>
 *   </div>
 * </ng-template>
 * ```
 */
@Component({
  selector: 'ds-confirmation-dialog',
  standalone: true,
  imports: [DsButtonComponent],
  styleUrls: ['./ds-confirmation-dialog.css'],
  template: `
    <div 
      class="ds-dialog ds-dialog--sm ds-confirmation-dialog"
      role="alertdialog"
      aria-modal="true"
      [attr.aria-labelledby]="'confirmation-title'"
      [attr.aria-describedby]="'confirmation-message'"
    >
      <div class="ds-dialog__header">
        <h2 id="confirmation-title" class="heading-xl">{{ title() }}</h2>
      </div>

      <div class="ds-dialog__content">
        <p id="confirmation-message" class="tw-text-neutral-700">{{ message() }}</p>
        <ng-content></ng-content>
      </div>

      <div class="ds-dialog__footer">
        <ds-button 
          [variant]="'ghost'" 
          type="button"
          (click)="cancel.emit()">
          {{ cancelLabel() }}
        </ds-button>
        <ds-button 
          [variant]="confirmVariant()" 
          type="button"
          (click)="confirm.emit()">
          {{ confirmLabel() }}
        </ds-button>
      </div>
    </div>
  `
})
export class DsConfirmationDialogComponent {
  /** Title of the confirmation dialog */
  title = input.required<string>();
  
  /** Message/description text */
  message = input.required<string>();
  
  /** Label for the confirm button */
  confirmLabel = input<string>('Confirm');
  
  /** Label for the cancel button */
  cancelLabel = input<string>('Cancel');
  
  /** Variant style for the confirm button */
  confirmVariant = input<'primary' | 'destructive'>('primary');
  
  /** Emitted when user confirms */
  confirm = output<void>();
  
  /** Emitted when user cancels */
  cancel = output<void>();
}

