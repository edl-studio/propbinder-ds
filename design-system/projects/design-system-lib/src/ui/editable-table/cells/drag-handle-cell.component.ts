import { Component, input } from '@angular/core';
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
    <ds-tooltip [text]="tooltipText()" placement="top">
      <div class="tw-flex tw-items-center tw-justify-center tw-cursor-move" cdkDragHandle>
        <ds-icon-button 
          icon="remixDraggable" 
          variant="ghost"
          size="sm"
          [ariaLabel]="tooltipText()"
          [tooltip]="tooltipText()"
        />
      </div>
    </ds-tooltip>
  `,
})
export class DragHandleCellComponent {
  /** Tooltip text for accessibility and hover (supports translations) */
  tooltipText = input<string>('Drag to reorder');
}

