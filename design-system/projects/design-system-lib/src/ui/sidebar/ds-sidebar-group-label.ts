import { Component, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';

@Component({
  selector: 'ds-sidebar-group-label',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [
    './ds-sidebar-variables.css',
    './ds-sidebar-group-label.css'
  ],
  template: `
    <button
      type="button"
      class="sidebar-group-label"
      [attr.aria-controls]="controlsId()"
      [attr.aria-expanded]="expanded() ? 'true' : 'false'"
    >
      <span class="sidebar-group-label__text capitalised-xs-medium">{{ label() }}</span>
      <ds-icon name="remixArrowRightSLine" size="16px" />
    </button>
  `,
})
export class DsSidebarGroupLabelComponent {
  label = input.required<string>();
  controlsId = input.required<string>();
  expanded = input<boolean>(true);
}