import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';

@Component({
  selector: 'ds-link',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-link.css'],
  template: `
    <a [class]="linkClasses()" [href]="href()" [target]="target()" [rel]="rel()" class="ui-sm-regular">
      @if (showIcon()) {
        <ds-icon 
          [name]="iconName()!" 
          size="16px"
          color="brand"
          class="link__icon"
        />
      }
      <span class="link__content">
        @if (content()) {
          {{ content() }}
        } @else {
          <ng-content></ng-content>
        }
      </span>
    </a>
  `,
})
export class DsLinkComponent {
  // Input signals
  href = input<string>('#');
  target = input<string>();
  rel = input<string>();
  content = input<string>();
  showIcon = input<boolean>(false);
  iconName = input<string>('remixExternalLinkLine');
  
  // Computed classes
  linkClasses = computed(() => {
    const classes = ['link'];
    
    if (this.showIcon()) {
      classes.push('link--with-icon');
    }
    
    return classes.join(' ');
  });
}
