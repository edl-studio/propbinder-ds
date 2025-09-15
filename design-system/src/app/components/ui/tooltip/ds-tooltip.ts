import { Component, input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgpTooltip, NgpTooltipTrigger } from 'ng-primitives/tooltip';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

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
      <ng-content></ng-content>
    </div>

    <ng-template #tooltipContent>
      <div ngpTooltip class="tooltip">
        {{ text() }}
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
