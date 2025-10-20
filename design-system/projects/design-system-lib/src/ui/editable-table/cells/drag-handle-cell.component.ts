import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { DsIconButtonComponent } from '../../button/ds-icon-button';
import { DsTooltipComponent } from '../../tooltip/ds-tooltip';

/**
 * Drag handle cell for reorderable rows
 * Provides a visual handle that users can grab to reorder rows
 */
@Component({
  selector: 'drag-handle-cell',
  standalone: true,
  imports: [CommonModule, DsIconButtonComponent, CdkDragHandle, DsTooltipComponent],
  template: `
    <ds-tooltip text="Drag to move" placement="right">
      <div class="tw-flex tw-items-center tw-justify-center tw-cursor-move" cdkDragHandle>
        <ds-icon-button 
          icon="remixDraggable" 
          variant="ghost"
          size="sm"
          ariaLabel="Drag to move"
        />
      </div>
    </ds-tooltip>
  `,
})
export class DragHandleCellComponent {}

