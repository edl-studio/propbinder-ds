import { Component, input, output, computed, signal, ViewEncapsulation } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';

/** Visual style variant of the button
 * - primary: Main call-to-action button
 * - secondary: Alternative emphasis button
 * - ghost: Minimal visual emphasis button
 * - destructive: Indicates destructive or dangerous action
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

/** Size variant of the button
 * - sm: Compact size for tight spaces
 * - md: Default size for most use cases
 * - lg: Large size for prominent actions
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * A versatile button component that supports multiple visual styles, sizes, and content configurations.
 * Includes support for icons, loading states, and custom content projection via slots.
 * 
 * @example
 * Basic button:
 * ```html
 * <ds-button variant="primary">Save Changes</ds-button>
 * ```
 * 
 * Button with icons:
 * ```html
 * <ds-button variant="ghost" leadingIcon="remixEdit">
 *   Edit Profile
 * </ds-button>
 * ```
 * 
 * Button with custom content:
 * ```html
 * <ds-button variant="secondary">
 *   <span slot="leading">⚡</span>
 *   Custom Content
 *   <ds-icon slot="trailing" name="remixArrowRight" />
 * </ds-button>
 * ```
 * 
 * Loading state:
 * ```html
 * <ds-button variant="primary" [loading]="true">
 *   Processing...
 * </ds-button>
 * ```
 */
@Component({
  selector: 'ds-button',
  imports: [CommonModule, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-button.css'],
  template: `
    <button
      [class]="buttonClasses()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-pressed]="pressed() ? 'true' : null"
      [attr.aria-expanded]="expanded() ? 'true' : 'false'"
      (click)="handleClick($event)"
      (focus)="onFocus()"
      (blur)="onBlur()"
      #buttonElement
    >
      <!-- Leading Icon/Content -->
      <ng-content select="[slot=leading]"></ng-content>
      @if (leadingIcon() && !loading()) {
        <ds-icon 
          [name]="leadingIcon()!" 
          [size]="iconSize()"
          class="btn__icon"
        />
      }
      
      <!-- Button Content -->
      <span [class]="contentClasses()" [style.display]="iconOnly() ? 'none' : 'flex'">
        <ng-content></ng-content>
      </span>
      
      <!-- Trailing Icon/Content -->
      <ng-content select="[slot=trailing]"></ng-content>
      @if (trailingIcon() && !loading()) {
        <ds-icon 
          [name]="trailingIcon()!" 
          [size]="iconSize()"
          class="btn__icon"
        />
      }
      
      <!-- Loading Spinner -->
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
  `,

})
export class DsButtonComponent {
  /** Visual style variant of the button
   * @default 'primary'
   */
  variant = input<ButtonVariant>('primary');

  /** Size variant of the button
   * @default 'md'
   */
  size = input<ButtonSize>('md');

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

  /** Icon name to display before the button content
   * @example 'remixEdit'
   */
  leadingIcon = input<string>();

  /** Icon name to display after the button content
   * @example 'remixArrowRight'
   */
  trailingIcon = input<string>();

  /** Accessible label for the button
   * @example 'Close dialog'
   */
  ariaLabel = input<string>();

  /** Whether the button should only display icons without text content
   * @default false
   */
  iconOnly = input<boolean>(false);
  
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
  
  // Internal state
  private isFocused = signal<boolean>(false);
  
  // Computed properties for semantic CSS classes
  buttonClasses = computed(() => {
    const classes = ['btn'];
    
    // Size classes
    classes.push(`btn--${this.size()}`);
    
    // Variant classes
    classes.push(`btn--${this.variant()}`);
    
    // Padding classes based on icon presence
    const paddingClass = this.getPaddingClass();
    classes.push(paddingClass);
    
    // State classes
    if (this.pressed()) {
      classes.push('btn--pressed');
    }
    
    return classes.join(' ');
  });
  
  contentClasses = computed(() => {
    const classes = ['btn__content'];
    if (this.loading()) {
      classes.push('btn__content--loading');
    }
    return classes.join(' ');
  });
  
  private getPaddingClass(): string {
    const hasLeadingIcon = !!this.leadingIcon();
    const hasTrailingIcon = !!this.trailingIcon();
    const size = this.size();
    
    // Icon-only buttons get square padding
    if (this.iconOnly()) {
      return `btn--padding-icon-only-${size}`;
    }
    
    if (hasLeadingIcon && hasTrailingIcon) {
      return 'btn--padding-with-both';
    } else if (hasLeadingIcon) {
      return 'btn--padding-with-leading';
    } else if (hasTrailingIcon) {
      return 'btn--padding-with-trailing';
    } else {
      return size === 'sm' ? 'btn--padding-default-sm' : 'btn--padding-default';
    }
  }
  
  iconSize = computed(() => {
    const sizeMap: Record<ButtonSize, string> = {
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
    this.isFocused.set(true);
    this.focused.emit(new FocusEvent('focus'));
  }
  
  onBlur() {
    this.isFocused.set(false);
    this.blurred.emit(new FocusEvent('blur'));
  }
} 