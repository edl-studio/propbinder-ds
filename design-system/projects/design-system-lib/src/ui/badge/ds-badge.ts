import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';
import { DsShapeIndicatorComponent, ShapeVariant } from '../shape-indicator/ds-shape-indicator';

/** Visual style variant of the badge
 * - default: Default grey badge
 * - brand: Primary brand color
 * - success: Positive action or status
 * - warning: Warning or attention required
 * - destructive: Error or destructive action
 * - blue: Information or neutral status
 * - light-purple: Alternative highlight
 * - pink: Alternative highlight
 * - salmon-orange: Alternative highlight
 * - orange: Alternative highlight
 * - lime-green: Alternative success variant
 * - grey: Neutral or disabled state
 */
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

/** Content display type for the badge
 * - text: Simple text content
 * - icon-text: Text with a leading icon
 * - indicator-text: Text with a leading shape indicator
 */
export type BadgeContentType = 'text' | 'icon-text' | 'indicator-text';

/**
 * A versatile badge component for displaying status, labels, or metadata.
 * Supports multiple visual variants and content types including text, icons, and indicators.
 * 
 * @example
 * Basic text badge:
 * ```html
 * <ds-badge variant="success">Active</ds-badge>
 * ```
 * 
 * Badge with icon:
 * ```html
 * <ds-badge
 *   variant="warning"
 *   contentType="icon-text"
 *   leadingIcon="remixAlertLine"
 * >Warning</ds-badge>
 * ```
 * 
 * Badge with indicator:
 * ```html
 * <ds-badge
 *   variant="success"
 *   contentType="indicator-text"
 *   indicatorShape="circle"
 * >Online</ds-badge>
 * ```
 */
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
  /** Visual style variant of the badge
   * @default 'default'
   */
  variant = input<BadgeVariant>('default');

  /** How the badge content should be displayed
   * @default 'text'
   */
  contentType = input<BadgeContentType>('text');

  /** Text content of the badge. If not provided, uses ng-content projection */
  content = input<string>();

  /** Icon name to display before the text when contentType is 'icon-text'
   * @example 'remixCheckLine'
   */
  leadingIcon = input<string>();

  /** Shape of the indicator when contentType is 'indicator-text'
   * @default 'circle'
   */
  indicatorShape = input<ShapeVariant>('circle');
  
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
