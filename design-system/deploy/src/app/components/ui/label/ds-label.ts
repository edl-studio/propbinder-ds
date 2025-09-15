import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'ds-label',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <label
      class="!tw-text-secondary block {{ size() === 'sm' ? 'ui-xs-regular' : 'ui-sm-regular' }} {{ className() }}"
      [attr.for]="for()"
      [attr.id]="id()"
    >
      <ng-content></ng-content>
    </label>
  `,
})
export class DsLabelComponent {
  className = input<string>('');
  for = input<string | undefined>(undefined);
  id = input<string | undefined>(undefined);
  size = input<'sm' | 'md'>('md');
}
