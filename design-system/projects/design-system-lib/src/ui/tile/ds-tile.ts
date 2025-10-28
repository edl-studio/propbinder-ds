import { Component, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Orientation of the tile sections.
 * 
 * - `"vertical"` - Sections stack vertically with bottom borders (default)
 * - `"horizontal"` - Sections appear side-by-side with right borders
 * 
 * Horizontal tiles automatically stack vertically on mobile devices (< 768px).
 */
export type TileOrientation = 'vertical' | 'horizontal';

/**
 * A container component that provides consistent elevation, border radius, and layout
 * for grouped content sections. Works with `ds-tile-section` components to create
 * flexible, composable layouts.
 * 
 * ## Features
 * - Consistent elevation (shadow) and 8px border radius
 * - Vertical (stacked) or horizontal (side-by-side) layouts
 * - Responsive: horizontal tiles automatically stack on mobile
 * - Automatic border separators between sections
 * 
 * ## Markup Guidelines
 * - Must contain one or more `<ds-tile-section>` components
 * - Each section can have an optional `<header>` with semantic `<header-title>` and `<header-actions>` slots
 * - Use `orientation="vertical"` for stacked sections (default)
 * - Use `orientation="horizontal"` for side-by-side sections
 * 
 * ## When to Use
 * - Grouping related content that needs visual separation
 * - Creating cards or panels in a dashboard
 * - Displaying tables, forms, or charts with headers
 * - Building multi-section layouts (e.g., invoice details)
 * 
 * @example
 * Basic tile with header and table:
 * ```html
 * <ds-tile orientation="vertical">
 *   <ds-tile-section>
 *     <header>
 *       <header-title>Invoice Lines</header-title>
 *       <header-actions>
 *         <ds-button size="sm" leadingIcon="remixAddLine">Add line</ds-button>
 *       </header-actions>
 *     </header>
 *   </ds-tile-section>
 *   <ds-tile-section [padding]="false">
 *     <ds-data-table [data]="lines" [columns]="columns" />
 *   </ds-tile-section>
 * </ds-tile>
 * ```
 * 
 * @example
 * Tile with icon in title (8px gap automatic):
 * ```html
 * <ds-tile>
 *   <ds-tile-section>
 *     <header>
 *       <header-title>
 *         <ds-avatar size="sm" />
 *         User Profile
 *       </header-title>
 *       <header-actions>
 *         <ds-icon-button icon="remixEditLine" variant="ghost" />
 *       </header-actions>
 *     </header>
 *     <p>User information here</p>
 *   </ds-tile-section>
 * </ds-tile>
 * ```
 * 
 * @example
 * Multiple vertical sections:
 * ```html
 * <ds-tile orientation="vertical">
 *   <ds-tile-section>
 *     <header>
 *       <header-title>Personal Information</header-title>
 *       <header-actions>
 *         <ds-icon-button icon="remixEditLine" />
 *       </header-actions>
 *     </header>
 *     <p>Name, email, etc.</p>
 *   </ds-tile-section>
 *   
 *   <ds-tile-section>
 *     <header>
 *       <header-title>Account Settings</header-title>
 *     </header>
 *     <p>Plan, status, etc.</p>
 *   </ds-tile-section>
 * </ds-tile>
 * ```
 * 
 * @example
 * Horizontal layout (side-by-side sections):
 * ```html
 * <ds-tile orientation="horizontal">
 *   <ds-tile-section>
 *     <header>
 *       <header-title>Overview</header-title>
 *     </header>
 *     <p>Left content</p>
 *   </ds-tile-section>
 *   
 *   <ds-tile-section>
 *     <header>
 *       <header-title>Activity</header-title>
 *     </header>
 *     <p>Right content</p>
 *   </ds-tile-section>
 * </ds-tile>
 * ```
 * 
 * @example
 * Multiple action buttons (8px gap automatic):
 * ```html
 * <ds-tile>
 *   <ds-tile-section>
 *     <header>
 *       <header-title>Documents</header-title>
 *       <header-actions>
 *         <ds-button variant="ghost" size="sm">Export</ds-button>
 *         <ds-button variant="ghost" size="sm">Filter</ds-button>
 *         <ds-button size="sm" leadingIcon="remixAddLine">New</ds-button>
 *       </header-actions>
 *     </header>
 *     <ds-data-table [data]="docs" [columns]="columns" />
 *   </ds-tile-section>
 * </ds-tile>
 * ```
 * 
 * @see DsTileSectionComponent for section-level documentation
 */
@Component({
  selector: 'ds-tile',
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-tile.css'],
  template: `
    <div 
      class="ds-tile elevation-tile tw-rounded-lg"
      [class.ds-tile--vertical]="orientation() === 'vertical'"
      [class.ds-tile--horizontal]="orientation() === 'horizontal'">
      <ng-content select="ds-tile-section" />
    </div>
  `,
})
export class DsTileComponent {
  /** 
   * Orientation of the tile sections.
   * 
   * **Options:**
   * - `"vertical"` - Sections stack vertically with bottom borders between them (default)
   * - `"horizontal"` - Sections appear side-by-side with right borders between them
   * 
   * **Responsive Behavior:**
   * - Horizontal tiles automatically stack vertically on mobile (< 768px)
   * 
   * @default "vertical"
   * 
   * @example
   * ```html
   * <!-- Vertical layout (default) -->
   * <ds-tile orientation="vertical">
   *   <ds-tile-section>...</ds-tile-section>
   *   <ds-tile-section>...</ds-tile-section>
   * </ds-tile>
   * 
   * <!-- Horizontal layout (side-by-side) -->
   * <ds-tile orientation="horizontal">
   *   <ds-tile-section>...</ds-tile-section>
   *   <ds-tile-section>...</ds-tile-section>
   * </ds-tile>
   * ```
   */
  orientation = input<TileOrientation>('vertical');
}

