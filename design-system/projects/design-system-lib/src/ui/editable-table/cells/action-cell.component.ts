import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconButtonComponent } from '../../button/ds-icon-button';

export interface ActionCellData {
  /** The row index */
  rowIndex: number;
  /** Whether the delete button is disabled */
  deleteDisabled?: boolean;
}

/**
 * Action cell for row operations (delete, etc.)
 * Provides action buttons for each row
 */
@Component({
  selector: 'action-cell',
  standalone: true,
  imports: [CommonModule, DsIconButtonComponent],
  template: `
    <div class="tw-flex tw-items-center tw-justify-end tw-gap-1">
      <ds-icon-button 
        icon="remixDeleteBinLine" 
        variant="ghost"
        size="sm"
        [disabled]="data().deleteDisabled || false"
        ariaLabel="Delete row"
        (clicked)="deleteClicked.emit(data().rowIndex)"
      />
    </div>
  `,
})
export class ActionCellComponent {
  /** Cell data input */
  data = input.required<ActionCellData>();
  
  /** Emitted when delete button is clicked */
  deleteClicked = output<number>();
}

