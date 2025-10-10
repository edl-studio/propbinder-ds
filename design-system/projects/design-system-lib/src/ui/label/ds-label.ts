import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, computed, input } from '@angular/core';

@Component({
  selector: 'ds-label',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-label.css'],
  template: `
    <label
      [class]="labelClasses()"
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

  labelClasses = computed(() => {
    const classes = ['ds-label'];
    classes.push(`ds-label--${this.size()}`);
    if (this.className()) {
      classes.push(this.className());
    }
    return classes.join(' ');
  });
}
