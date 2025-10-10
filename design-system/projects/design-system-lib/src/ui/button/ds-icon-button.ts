import { Component, input, output, computed, ViewEncapsulation, ElementRef } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';
import { DsTooltipComponent } from '../tooltip/ds-tooltip';

/** Visual style variant of the icon button
 * - primary: Main call-to-action button
 * - secondary: Alternative emphasis button
 * - ghost: Minimal visual emphasis button
 * - destructive: Indicates destructive or dangerous action
 */
export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

/** Size variant of the icon button
 * - sm: Compact size (32px)
 * - md: Default size (36px)
 * - lg: Large size (40px)
 */
export type IconButtonSize = 'sm' | 'md' | 'lg';

/**
 * A button component optimized for icon-only interactions. Supports both simple icon prop usage
 * and full content projection for custom content.
 * 
 * @example
 * Simple icon usage (preferred for standard cases):
 * ```html
 * <ds-icon-button
 *   icon="remixEdit"
 *   variant="ghost"
 *   ariaLabel="Edit item"
 * />
 * ```
 * 
 * Custom content projection (for advanced cases):
 * ```html
 * <ds-icon-button variant="primary" ariaLabel="Custom action">
 *   <ds-icon name="remixStar" />
 * </ds-icon-button>
 * ```
 * 
 * With tooltip:
 * ```html
 * <ds-icon-button
 *   icon="remixSettings"
 *   variant="ghost"
 *   tooltip="Open settings"
 * />
 * ```
 * 
 * Note: When using custom icons (via content projection), make sure to import the
 * necessary icon component or library in your module/component.
 */
@Component({
  selector: 'ds-icon-button',
  standalone: true,
  imports: [CommonModule, DsIconComponent, DsTooltipComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-button.css'], // Reuse button CSS
  template: `
    <ds-tooltip
      [text]="tooltip() || ''"
      [disabled]="tooltipDisabled() || !tooltip()"
      [placement]="tooltipPlacement()"
    >
      <button
      [class]="buttonClasses()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-pressed]="pressed() ? 'true' : null"
      [attr.aria-expanded]="expanded() ? 'true' : 'false'"
      [title]="tooltip()"
      (click)="handleClick($event)"
      (focus)="onFocus()"
      (blur)="onBlur()"
    >
      <!-- Default icon if no custom content -->
      @if (icon() && !hasProjectedContent()) {
        <ds-icon 
          [name]="icon()!" 
          [size]="iconSize()"
          class="btn__icon"
        />
      }
      
      <!-- Custom projected content -->
      <ng-content></ng-content>
      
      <!-- Loading spinner -->
      @if (loading()) {
        <div class="btn__loading">
          <ds-icon 
            name="remixLoader4Line" 
            [size]="iconSize()" 
            class="btn__icon btn__icon--loading"
          />
        </div>
      }
      </button>
    </ds-tooltip>
  `
})
export class DsIconButtonComponent {
  constructor(private elementRef: ElementRef) {}
  /** Visual style variant of the button
   * @default 'ghost'
   */
  variant = input<IconButtonVariant>('ghost');

  /** Size variant of the button
   * @default 'md'
   */
  size = input<IconButtonSize>('md');

  /** Icon name to display (only used when no custom content is projected)
   * @example 'remixEdit'
   */
  icon = input<string>();

  /** Whether the button is disabled
   * @default false
   */
  disabled = input<boolean>(false);

  /** Whether the button is in a loading state
   * @default false
   */
  loading = input<boolean>(false);

  /** Whether the button is in a pressed state (for toggle buttons)
   * @default false
   */
  pressed = input<boolean>(false);

  /** Whether the button controls an expanded element
   * @default false
   */
  expanded = input<boolean>(false);

  /** Accessible label for the button (required for icon buttons)
   * @example 'Edit profile'
   */
  ariaLabel = input<string>();

  /** Tooltip text to display on hover. If not provided, tooltip will be disabled.
   * @example 'Edit profile'
   */
  tooltip = input<string>();

  /** Whether to disable the tooltip
   * @default false
   */
  tooltipDisabled = input<boolean>(false);

  /** Placement of the tooltip
   * @default 'top'
   */
  tooltipPlacement = input<'top' | 'bottom' | 'left' | 'right'>('top');

  /** Emitted when the button is clicked
   * @event MouseEvent
   */
  clicked = output<MouseEvent>();

  /** Emitted when the button receives focus
   * @event FocusEvent
   */
  focused = output<FocusEvent>();

  /** Emitted when the button loses focus
   * @event FocusEvent
   */
  blurred = output<FocusEvent>();

  // Computed properties
  buttonClasses = computed(() => {
    const classes = ['btn'];
    
    // Size classes
    classes.push(`btn--${this.size()}`);
    
    // Variant classes
    classes.push(`btn--${this.variant()}`);
    
    // Icon-only padding
    classes.push(`btn--padding-icon-only-${this.size()}`);
    
    // State classes
    if (this.pressed()) {
      classes.push('btn--pressed');
    }
    
    return classes.join(' ');
  });

  iconSize = computed(() => {
    const sizeMap: Record<IconButtonSize, string> = {
      sm: '16px',
      md: '18px',
      lg: '20px'
    };
    return sizeMap[this.size()];
  });

  // Event handlers
  handleClick(event: MouseEvent) {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }

  onFocus() {
    this.focused.emit(new FocusEvent('focus'));
  }

  onBlur() {
    this.blurred.emit(new FocusEvent('blur'));
  }

  // Helper methods
  protected hasProjectedContent(): boolean {
    // Check if there is any projected content
    const element = this.elementRef.nativeElement;
    const button = element.querySelector('button');
    // Get direct children excluding our own ds-icon elements
    const children = Array.from(button.children).filter(child => {
      // Exclude our own icon elements and loading spinner
      return !(
        child instanceof HTMLElement && 
        (child.matches('ds-icon:not([slot])') || child.matches('.btn__loading'))
      );
    });
    return children.length > 0;
  }
}
