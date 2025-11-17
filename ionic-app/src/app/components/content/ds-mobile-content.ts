import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * DsMobileContentComponent
 * 
 * Main content container for mobile pages with flexible layout options.
 * Provides consistent spacing and layout patterns.
 * 
 * @example
 * ```html
 * <!-- Default: stacked layout -->
 * <ds-mobile-content>
 *   <ds-mobile-content-section>...</ds-mobile-content-section>
 *   <ds-mobile-content-section>...</ds-mobile-content-section>
 * </ds-mobile-content>
 * 
 * <!-- Grid layout -->
 * <ds-mobile-content layout="grid-2">
 *   <ds-mobile-content-section>...</ds-mobile-content-section>
 *   <ds-mobile-content-section>...</ds-mobile-content-section>
 * </ds-mobile-content>
 * ```
 */
@Component({
  selector: 'ds-mobile-content',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class.layout-stacked]': 'layout() === "stacked"',
    '[class.layout-grid-2]': 'layout() === "grid-2"',
    '[class.layout-grid-3]': 'layout() === "grid-3"'
  },
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    
    /* Grid layouts */
    :host.layout-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    
    :host.layout-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    
    @media (max-width: 768px) {
      :host.layout-grid-2,
      :host.layout-grid-3 {
        grid-template-columns: 1fr;
      }
    }
  `],
  template: `<ng-content />`
})
export class DsMobileContentComponent {
  /**
   * Layout mode for content sections
   * - 'stacked' - Vertical stack with 32px gap (default)
   * - 'grid-2' - 2 column grid
   * - 'grid-3' - 3 column grid (stacks on mobile)
   */
  layout = input<'stacked' | 'grid-2' | 'grid-3'>('stacked');
}

/**
 * DsMobileContentSectionComponent
 * 
 * Section within mobile content with optional header.
 * 
 * @example
 * ```html
 * <ds-mobile-content-section>
 *   <section-header width="half"></section-header>
 *   <content-row>
 *     <div class="grey-box"></div>
 *   </content-row>
 * </ds-mobile-content-section>
 * ```
 */
@Component({
  selector: 'ds-mobile-content-section',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `],
  template: `
    <ng-content select="section-header" />
    <ng-content />
  `
})
export class DsMobileContentSectionComponent {}

/**
 * SectionHeaderComponent
 * 
 * Semantic placeholder header for content sections.
 * Used for prototyping/placeholders.
 */
@Component({
  selector: 'section-header',
  standalone: true,
  host: {
    '[class.w-half]': 'width() === "half"',
    '[class.w-third]': 'width() === "third"',
    '[class.w-full]': 'width() === "full"'
  },
  styles: [`
    :host {
      height: 20px;
      border-radius: 8px;
      background: var(--color-background-neutral-tertiary);
      display: block;
    }
    
    :host.w-half { width: 50%; }
    :host.w-third { width: 33%; }
    :host.w-full { width: 100%; }
  `],
  template: `<ng-content />`
})
export class SectionHeaderComponent {
  /** Width of the header placeholder */
  width = input<'half' | 'third' | 'full'>('half');
}

/**
 * ContentRowComponent
 * 
 * Horizontal row container for content items.
 */
@Component({
  selector: 'content-row',
  standalone: true,
  styles: [`
    :host {
      display: flex;
      gap: 12px;
    }
  `],
  template: `<ng-content />`
})
export class ContentRowComponent {}

