import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { DsIconButtonComponent } from '../../button/ds-icon-button';

/**
 * Drag handle cell for reorderable rows
 * Provides a visual handle that users can grab to reorder rows
 */
@Component({
  selector: 'drag-handle-cell',
  standalone: true,
  imports: [CommonModule, DsIconButtonComponent, CdkDragHandle],
  template: `
    <div class="tw-flex tw-items-center tw-justify-center tw-cursor-move" cdkDragHandle>
      <ds-icon-button 
        icon="remixDraggable" 
        variant="ghost"
        size="sm"
        ariaLabel="Drag to reorder"
      />
    </div>
  `,
})
export class DragHandleCellComponent {}

