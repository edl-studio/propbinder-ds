import { Component, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';
import { DsTooltipComponent } from '../tooltip/ds-tooltip';

@Component({
  selector: 'ds-metadata-item',
  standalone: true,
  imports: [CommonModule, DsIconComponent, DsTooltipComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-metadata-item.css'],
  template: `
    <ds-tooltip
      *ngIf="tooltip()"
      [text]="tooltip()!"
    >
      <div class="metadata-item">
      <ds-icon 
        [name]="icon()" 
        size="12px" 
        color="tertiary" 
        class="metadata-item__icon"
      />
      <span class="metadata-item__text ui-xs-regular">{{ value() }}</span>
      </div>
    </ds-tooltip>

    <div 
      *ngIf="!tooltip()"
      class="metadata-item"
    >
      <ds-icon 
        [name]="icon()" 
        size="12px" 
        color="tertiary" 
        class="metadata-item__icon"
      />
      <span class="metadata-item__text ui-xs-regular">{{ value() }}</span>
    </div>
  `,
})
export class DsMetadataItemComponent {
  // Required inputs
  icon = input.required<string>();
  value = input.required<string>();
  
  // Optional inputs
  tooltip = input<string>();
}
