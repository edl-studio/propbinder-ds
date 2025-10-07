import { Component, input, computed, ViewEncapsulation } from '@angular/core';
import { IconSize, IconColorValue } from '../icon/ds-icon';

/**
 * A loading spinner component that provides visual feedback for loading states.
 * Uses a custom SVG implementation with a background track and spinning loader.
 * 
 * @example
 * ```html
 * <ds-spinner />
 * <ds-spinner size="24px" />
 * <ds-spinner color="primary" />
 * ```
 */
@Component({
  selector: 'ds-spinner',
  standalone: true,
  styles: [`
    .spinner {
      transform-origin: center;
        animation: ds-spinner-spin 1s cubic-bezier(0.4, 0.8, 0.8, 0.7) infinite;
    }
    @keyframes ds-spinner-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `],
  template: `
    <div 
      class="tw-relative"
      [style]="{ display: 'block', width: size(), height: size() }"
    >
      <svg
        viewBox="0 0 14 14"
        style="position: absolute; inset: 0; margin: auto"
      >
        <!-- Background track -->
        <circle
          cx="7"
          cy="7"
          r="6"
          [attr.stroke]="computedColor()"
          fill="none"
          stroke-width="1.5"
          class="tw-opacity-25"
        />
        <!-- Spinning loader -->
        <circle
          cx="7"
          cy="7"
          r="6"
          [attr.stroke]="computedColor()"
          fill="none"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-dasharray="8 28"
          class="spinner"
        />
      </svg>
    </div>
  `,
})
export class DsSpinnerComponent {
  /** Size of the spinner. Defaults to '20px'. */
  readonly size = input<IconSize>('20px');

  /** Color of the spinner. Defaults to 'tertiary' for disabled state. */
  readonly color = input<IconColorValue>('tertiary');

  /** Maps semantic colors to CSS variables */
  protected computedColor = computed(() => {
    const colorValue = this.color();
    
    if (!colorValue) {
      return undefined;
    }
    
    // Map predefined colors to CSS variables
    const colorMap: Record<string, string> = {
      'primary': 'var(--text-color-default-primary)',
      'secondary': 'var(--text-color-default-secondary)',
      'tertiary': 'var(--text-color-default-tertiary)',
      'brand': 'var(--text-color-brand)',
      'success': 'var(--color-success-base)',
      'warning': 'var(--color-warning-base)',
      'destructive': 'var(--color-destructive-base)'
    };

    return colorMap[colorValue] || colorValue;
  });
}
