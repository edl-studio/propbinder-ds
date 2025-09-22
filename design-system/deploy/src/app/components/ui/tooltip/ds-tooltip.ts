import { Component, input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgpTooltip, NgpTooltipTrigger } from 'ng-primitives/tooltip';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Available slots for content projection in DsTooltip:
 * - trigger: Projects custom trigger content
 * - content: Projects custom tooltip content
 * - default: Default trigger content (no slot attribute needed)
 */
export type DsTooltipSlots = 'trigger' | 'content';

@Component({
  selector: 'ds-tooltip',
  imports: [CommonModule, NgpTooltip, NgpTooltipTrigger],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-tooltip.css'],
  template: `
    <div 
      [ngpTooltipTrigger]="disabled() ? null : tooltipContent" 
      [ngpTooltipTriggerShowDelay]="200"
      [ngpTooltipTriggerHideDelay]="0"
      [ngpTooltipTriggerPlacement]="placement()"
      [ngpTooltipTriggerOffset]="offset()"
      class="tooltip-trigger"
    >
      <ng-content select="[slot=trigger]">
        <ng-content></ng-content>
      </ng-content>
    </div>

    <ng-template #tooltipContent>
      <div ngpTooltip class="tooltip">
        <ng-content select="[slot=content]">
          {{ text() }}
        </ng-content>
      </div>
    </ng-template>
  `,
})
export class DsTooltipComponent {
  // Input for tooltip text content
  text = input.required<string>();
  // Input for tooltip placement
  placement = input<TooltipPlacement>('top');
  // Input for tooltip offset distance in pixels
  offset = input<number>(8);
  // Input to disable the tooltip
  disabled = input<boolean>(false);
}
