import { Component, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A section within a `ds-tile` component. Sections can have optional headers
 * with semantic slots for title and actions, and configurable content padding.
 * 
 * ## Features
 * - Optional `<header>` with semantic `<header-title>` and `<header-actions>` slots
 * - Predefined spacing, typography, and layout (with escape hatches)
 * - Configurable content padding (20px default, or none for tables)
 * - Automatic borders between sections
 * 
 * ## Semantic Slots (within `<header>`)
 * 
 * ### `<header-title>` Slot
 * - **Typography**: heading-lg (24px, 700 weight, 32px line height)
 * - **Gap**: 8px between child elements (avatars, icons, text)
 * - **Color**: Primary text color
 * - **Behavior**: Flexes to fill available space
 * - **Override**: Use `style="gap: 12px"` or other CSS to customize
 * 
 * ### `<header-actions>` Slot
 * - **Gap**: 8px between multiple buttons
 * - **Alignment**: Right-aligned in header
 * - **Behavior**: Prevents shrinking/wrapping
 * - **Responsive**: Stacks below title on mobile (< 640px)
 * 
 * ## Markup Guidelines
 * - Must be used inside a `<ds-tile>` component
 * - Header is optional - sections can contain just content
 * - Use `[padding]="false"` for full-width content (tables, charts)
 * - Place avatars/icons as first child in `<header-title>` for automatic 8px gap
 * - Multiple action buttons automatically get 8px spacing
 * 
 * ## Padding Behavior
 * - **Default** (`[padding]="true"`): 20px on all sides
 * - **No padding** (`[padding]="false"`): 0px (useful for tables)
 * - **Automatic**: Tables (`ds-data-table`) automatically get no padding
 * 
 * @example
 * Basic section with header and actions:
 * ```html
 * <ds-tile-section>
 *   <header>
 *     <header-title>Invoice Lines</header-title>
 *     <header-actions>
 *       <ds-button size="sm" leadingIcon="remixAddLine">Add line</ds-button>
 *     </header-actions>
 *   </header>
 *   <p>Section content here</p>
 * </ds-tile-section>
 * ```
 * 
 * @example
 * Title with avatar (automatic 8px gap):
 * ```html
 * <ds-tile-section>
 *   <header>
 *     <header-title>
 *       <ds-avatar size="sm" />
 *       User Profile
 *     </header-title>
 *     <header-actions>
 *       <ds-icon-button icon="remixEditLine" variant="ghost" />
 *     </header-actions>
 *   </header>
 *   <form>...</form>
 * </ds-tile-section>
 * ```
 * 
 * @example
 * Title with icon (automatic 8px gap):
 * ```html
 * <ds-tile-section>
 *   <header>
 *     <header-title>
 *       <ds-icon name="remixFileList3Line" size="20px" />
 *       Invoice Details
 *     </header-title>
 *     <header-actions>
 *       <ds-button size="sm">Edit</ds-button>
 *     </header-actions>
 *   </header>
 *   <p>Invoice information</p>
 * </ds-tile-section>
 * ```
 * 
 * @example
 * Section with table (no padding):
 * ```html
 * <ds-tile-section [padding]="false">
 *   <ds-data-table [data]="users" [columns]="columns" />
 * </ds-tile-section>
 * ```
 * 
 * @example
 * Section without header:
 * ```html
 * <ds-tile-section>
 *   <p>Simple content without a header - just has padding</p>
 * </ds-tile-section>
 * ```
 * 
 * @example
 * Multiple action buttons (automatic 8px gap):
 * ```html
 * <ds-tile-section>
 *   <header>
 *     <header-title>Documents</header-title>
 *     <header-actions>
 *       <ds-button variant="ghost" size="sm">Export</ds-button>
 *       <ds-button variant="ghost" size="sm">Filter</ds-button>
 *       <ds-button size="sm" leadingIcon="remixAddLine">New</ds-button>
 *     </header-actions>
 *   </header>
 *   <ds-data-table [data]="docs" [columns]="docColumns" />
 * </ds-tile-section>
 * ```
 * 
 * @example
 * Override default gap (12px instead of 8px):
 * ```html
 * <ds-tile-section>
 *   <header>
 *     <span class="title" style="gap: 12px">
 *       <ds-icon name="remixFileList3Line" size="20px" />
 *       Custom Gap Example
 *     </header-title>
 *   </header>
 *   <p>Content</p>
 * </ds-tile-section>
 * ```
 * 
 * @example
 * Override title typography:
 * ```html
 * <ds-tile-section>
 *   <header>
 *     <span class="title" style="font-size: 18px; font-weight: 700">
 *       Custom Typography
 *     </header-title>
 *   </header>
 *   <p>Content</p>
 * </ds-tile-section>
 * ```
 * 
 * @see DsTileComponent for parent tile container documentation
 */
@Component({
  selector: 'ds-tile-section',
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-tile.css'],
  styles: [`
    :host {
      display: block;
      flex: 1;
      min-width: 0;
      padding: 20px 24px;
    }
    
    :host(.no-padding) {
      padding: 0;
    }
    
    :host-context(.ds-tile--vertical):not(:last-child) {
      border-bottom: 1px solid var(--border-color-default);
    }
    
    :host-context(.ds-tile--horizontal):not(:last-child) {
      border-right: 1px solid var(--border-color-default);
    }
    
    @media (max-width: 768px) {
      :host {
        padding: 16px 20px;
      }
      
      :host(.no-padding) {
        padding: 0;
      }
      
      :host-context(.ds-tile--horizontal):not(:last-child) {
        border-right: none;
        border-bottom: 1px solid var(--border-color-default);
      }
    }
  `],
  host: {
    '[class.no-padding]': '!padding()'
  },
  template: `
    <div class="ds-tile-section">
      <ng-content select="tile-header" />
      <ng-content />
    </div>
  `,
})
export class DsTileSectionComponent {
  /** 
   * Enable or disable section content padding.
   * 
   * **Options:**
   * - `true` - Content has 20px padding on all sides (default)
   * - `false` - No padding, content extends to edges
   * 
   * **When to Use `[padding]="false"`:**
   * - Tables (`ds-data-table`) - for full-width display
   * - Charts and visualizations - when they need full section width
   * - Custom layouts - when you want manual padding control
   * 
   * **Note:** Tables automatically get no padding via CSS `:has()` selector,
   * but you can explicitly control it with this property.
   * 
   * @default true
   * 
   * @example
   * ```html
   * <!-- With padding (default) -->
   * <ds-tile-section>
   *   <p>This content has 20px padding around it</p>
   * </ds-tile-section>
   * 
   * <!-- Without padding (for tables) -->
   * <ds-tile-section [padding]="false">
   *   <ds-data-table [data]="users" [columns]="columns" />
   * </ds-tile-section>
   * ```
   */
  padding = input<boolean>(true);
}

