import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * DsMobileHeaderContentComponent
 * 
 * Container for header content tiles - displays tiles in a responsive grid.
 * Used within the expandable header section of mobile pages to show
 * summary information like property details, statistics, etc.
 * 
 * @example
 * ```html
 * <ds-mobile-header-content header-content>
 *   <ds-mobile-header-content-tile>
 *     <tile-icon>
 *       <ds-icon name="remixHome4Line" />
 *     </tile-icon>
 *     <tile-content>
 *       <tile-label>Area</tile-label>
 *       <tile-value>120 m²</tile-value>
 *     </tile-content>
 *   </ds-mobile-header-content-tile>
 * </ds-mobile-header-content>
 * ```
 */
@Component({
  selector: 'ds-mobile-header-content',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    @media (min-width: 768px) {
      :host {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }
  `],
  template: `<ng-content select="ds-mobile-header-content-tile" />`
})
export class DsMobileHeaderContentComponent {}

/**
 * DsMobileHeaderContentTileComponent
 * 
 * Individual tile for displaying summary information in the header.
 * Styled with purple background to match the mobile header theme.
 * 
 * Must contain:
 * - `<tile-icon>` - Icon container (optional)
 * - `<tile-content>` - Label and value container
 * 
 * @example
 * ```html
 * <ds-mobile-header-content-tile>
 *   <tile-icon>
 *     <ds-icon name="remixHome4Line" size="20px" color="#DFE4FF" />
 *   </tile-icon>
 *   <tile-content>
 *     <tile-label>Rooms</tile-label>
 *     <tile-value>3 rooms</tile-value>
 *   </tile-content>
 * </ds-mobile-header-content-tile>
 * ```
 */
@Component({
  selector: 'ds-mobile-header-content-tile',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      background: #291f5b;
      border: 1px solid #3c3465;
      border-radius: 12px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `],
  template: `
    <ng-content select="tile-icon" />
    <ng-content select="tile-content" />
  `
})
export class DsMobileHeaderContentTileComponent {}

/**
 * TileIconComponent
 * 
 * Semantic slot for tile icon with dark purple background.
 * Use within `ds-mobile-header-content-tile`.
 */
@Component({
  selector: 'tile-icon',
  standalone: true,
  styles: [`
    :host {
      background: #221a4c;
      border-radius: 8px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  `],
  template: `<ng-content />`
})
export class TileIconComponent {}

/**
 * TileContentComponent
 * 
 * Semantic slot for tile content containing label and value.
 * Use within `ds-mobile-header-content-tile`.
 * 
 * Contains:
 * - `<tile-label>` - Small label text
 * - `<tile-value>` - Large value text
 */
@Component({
  selector: 'tile-content',
  standalone: true,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    
    ::ng-deep tile-label {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.56px;
      color: #a095db;
      display: block;
    }
    
    ::ng-deep tile-value {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-lg);
      font-weight: 600;
      line-height: 26px;
      letter-spacing: -0.72px;
      color: #ffffff;
      display: block;
    }
  `],
  template: `
    <ng-content select="tile-label" />
    <ng-content select="tile-value" />
  `
})
export class TileContentComponent {}

/**
 * TileLabelComponent
 * 
 * Label text for tile content.
 * Use within `tile-content` inside `ds-mobile-header-content-tile`.
 */
@Component({
  selector: 'tile-label',
  standalone: true,
  styles: [`
    :host {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.56px;
      color: #a095db;
      display: block;
    }
  `],
  template: `<ng-content />`
})
export class TileLabelComponent {}

/**
 * TileValueComponent
 * 
 * Value text for tile content.
 * Use within `tile-content` inside `ds-mobile-header-content-tile`.
 */
@Component({
  selector: 'tile-value',
  standalone: true,
  styles: [`
    :host {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-lg);
      font-weight: 600;
      line-height: 26px;
      letter-spacing: -0.72px;
      color: #ffffff;
      display: block;
    }
  `],
  template: `<ng-content />`
})
export class TileValueComponent {}

