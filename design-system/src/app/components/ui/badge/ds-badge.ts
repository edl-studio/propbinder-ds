import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';
import { DsShapeIndicatorComponent, ShapeVariant } from '../shape-indicator/ds-shape-indicator';

export type BadgeVariant = 
  | 'default' 
  | 'brand' 
  | 'success' 
  | 'warning' 
  | 'destructive' 
  | 'blue' 
  | 'light-purple' 
  | 'pink' 
  | 'salmon-orange' 
  | 'orange' 
  | 'lime-green' 
  | 'grey';
export type BadgeContentType = 'text' | 'icon-text' | 'indicator-text';

@Component({
  selector: 'ds-badge',
  standalone: true,
  imports: [CommonModule, DsIconComponent, DsShapeIndicatorComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['./ds-badge.css'],
  template: `
    <span [class]="badgeClasses()">
      @switch (contentType()) {
        @case ('text') {
          <span class="badge__content">
            @if (content()) {
              {{ content() }}
            } @else {
              <ng-content></ng-content>
            }
          </span>
        }
        
        @case ('icon-text') {
          <ds-icon 
            [name]="leadingIcon()!" 
            size="12px"
            class="badge__icon"
          />
          <span class="badge__content">
            @if (content()) {
              {{ content() }}
            } @else {
              <ng-content></ng-content>
            }
          </span>
        }
        
        @case ('indicator-text') {
          <ds-shape-indicator
            [shape]="indicatorShape()"
            [variant]="variant()"
            class="badge__indicator"
          />
          <span class="badge__content">
            @if (content()) {
              {{ content() }}
            } @else {
              <ng-content></ng-content>
            }
          </span>
        }
      }
    </span>
  `,
})
export class DsBadgeComponent {
  // Input signals
  variant = input<BadgeVariant>('default');
  contentType = input<BadgeContentType>('text');
  content = input<string>();
  leadingIcon = input<string>(); // Only for icon-text type
  indicatorShape = input<ShapeVariant>('circle'); // Only for indicator-text type
  
  // Computed classes
  badgeClasses = computed(() => {
    const classes = ['badge'];
    
    // Content type specific classes
    classes.push(`badge--${this.contentType()}`);
    
    // Variant classes (different behavior for indicator vs others)
    if (this.contentType() === 'indicator-text') {
      classes.push('badge--indicator-variant');
    } else {
      classes.push(`badge--${this.variant()}`);
    }
    
    return classes.join(' ');
  });
}
