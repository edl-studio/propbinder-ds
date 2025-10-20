import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';

/** Visual style variant of the inline message
 * - success: Positive status or successful action
 * - error: Error state or failed action
 * - warning: Warning or caution message
 * - information: Informational message
 */
export type InlineMessageVariant = 'success' | 'error' | 'warning' | 'information';

/**
 * An inline message component for displaying contextual status messages.
 * Supports multiple visual variants with automatic icon selection.
 * 
 * @example
 * Basic usage:
 * ```html
 * <ds-inline-message variant="success" title="Success">
 *   A short description
 * </ds-inline-message>
 * ```
 * 
 * Custom icon:
 * ```html
 * <ds-inline-message
 *   variant="warning"
 *   title="Warning"
 *   icon="remixAlertLine"
 * >
 *   Custom warning message
 * </ds-inline-message>
 * ```
 */
@Component({
  selector: 'ds-inline-message',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['./ds-inline-message.css'],
  template: `
    <div [class]="messageClasses()">
      <div class="inline-message__content">
        <div class="inline-message__header">
          <ds-icon 
            [name]="iconName()" 
            [size]="iconSize()"
            class="inline-message__icon"
          />
          <div class="inline-message__title">
            {{ title() }}
          </div>
        </div>
        @if (description()) {
          <div class="inline-message__description">
            {{ description() }}
          </div>
        } @else {
          <div class="inline-message__description">
            <ng-content></ng-content>
          </div>
        }
      </div>
      <div class="inline-message__actions">
        <ng-content select="[actions]"></ng-content>
      </div>
    </div>
  `,
})
export class DsInlineMessageComponent {
  /** Visual style variant of the message
   * @default 'information'
   */
  variant = input<InlineMessageVariant>('information');

  /** Title text displayed in the message */
  title = input.required<string>();

  /** Optional description text. If not provided, uses ng-content projection */
  description = input<string>();

  /** Custom icon name. If not provided, uses default icon for variant
   * @example 'remixCheckCircleLine'
   */
  icon = input<string>();

  /** Icon size
   * @default '16px'
   */
  iconSize = input<string>('16px');

  // Computed icon name based on variant or custom icon
  iconName = computed(() => {
    if (this.icon()) {
      return this.icon()!;
    }

    const iconMap: Record<InlineMessageVariant, string> = {
      success: 'remixCheckboxCircleLine',
      error: 'remixCloseCircleLine',
      warning: 'remixErrorWarningLine',
      information: 'remixInformationLine',
    };

    return iconMap[this.variant()];
  });

  // Computed classes
  messageClasses = computed(() => {
    const classes = ['inline-message'];
    classes.push(`inline-message--${this.variant()}`);
    return classes.join(' ');
  });
}

