import { input, computed, Directive } from '@angular/core';

/**
 * Content width preset values
 * - 'narrow' - 640px max width (reading content)
 * - 'standard' - 1024px max width (default)
 * - 'wide' - 1440px max width (dashboards)
 * - 'full' - 100% width (no max)
 */
export type ContentWidth = 'narrow' | 'standard' | 'wide' | 'full';

/**
 * MobilePageBase
 * 
 * Shared base class for mobile page components (ds-mobile-page-main, ds-mobile-page-details).
 * Provides consistent content width control across all page types.
 * 
 * **Padding Strategy:**
 * - All pages use 20px horizontal padding globally
 * - For tappable lists, use negative margins (e.g., margin: 0 -8px) to create full-width sections
 * - This approach simplifies padding management and provides consistency
 * 
 * @internal This is a base class and should not be used directly.
 */
@Directive()
export abstract class MobilePageBase {
  /**
   * Maximum content width (desktop only)
   * 
   * **Options:**
   * - `'narrow'` (640px) - For reading content, forms
   * - `'standard'` (1024px) - Default for most pages
   * - `'wide'` (1440px) - For dashboards, tables
   * - `'full'` - No max-width constraint
   * 
   * **Note:** Only applies on desktop (>= 768px). Mobile is always full width.
   * 
   * @default 'standard'
   * 
   * @example
   * ```html
   * <!-- Narrow reading layout -->
   * <ds-mobile-page-main title="Article" contentWidth="narrow">
   * 
   * <!-- Wide dashboard -->
   * <ds-mobile-page-main title="Dashboard" contentWidth="wide">
   * ```
   */
  contentWidth = input<ContentWidth>('standard');

  /**
   * Resolved max-width value (computed)
   * Maps preset values to pixel values
   * 
   * @internal
   */
  protected maxWidthValue = computed(() => {
    const w = this.contentWidth();
    
    const widthMap: Record<ContentWidth, string> = {
      'narrow': '640px',
      'standard': '1024px',
      'wide': '1440px',
      'full': '100%'
    };
    
    return widthMap[w];
  });
}

