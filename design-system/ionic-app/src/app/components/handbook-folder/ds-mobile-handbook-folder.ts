import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';

/**
 * DsMobileHandbookFolderComponent
 * 
 * A visually rich folder component for displaying handbook categories or sections.
 * Features a two-layer folder design with customizable colors, icon, item count, and label.
 * 
 * Design Details:
 * - Folder back: 72px height with a decorative notch
 * - Folder front: 64px height overlaying the back
 * - Item count displayed in bottom-left corner
 * - Icon displayed in bottom-right corner
 * - Label text centered below the folder
 * 
 * @example
 * ```html
 * <ds-mobile-handbook-folder
 *   [colorBase]="'#d244cf'"
 *   [colorWeak]="'#f9e6f9'"
 *   [iconName]="'remixLightbulbLine'"
 *   [itemCount]="8"
 *   [label]="'Utilities'">
 * </ds-mobile-handbook-folder>
 * ```
 */
@Component({
  selector: 'ds-mobile-handbook-folder',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  styles: [`
    :host {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .folder-container {
      position: relative;
      width: 160px;
    }
    
    .folder-back {
      height: 72px;
      border-radius: 12px 12px 12px 0px;
      position: relative;
      overflow: visible;
    }
    
    .folder-notch {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    
    .folder-front {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 64px;
      border-radius: 12px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 8px;
      z-index: 2;
    }
    
    .item-count {
      font-family: 'Brockmann', sans-serif;
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .item-count-label {
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .folder-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .folder-label {
      font-family: 'Brockmann', sans-serif;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
      text-align: center;
    }
  `],
  template: `
    <div class="folder-container">
      <!-- Folder Back -->
      <div class="folder-back" [style.background-color]="colorBase">
        <!-- SVG Notch Overlay -->
        <svg 
          class="folder-notch" 
          width="102" 
          height="24" 
          viewBox="0 0 102 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M100.037 23.9999L100.5 24L0 24.0001V10.7646C0 4.80853 4.91797 -0.0234985 11 -0.0196688L66.4213 -0.0322266C69.3519 -0.0115886 72.197 1.20548 74.2473 3.29947L90.6765 20.0951C93.1218 22.5925 96.5417 23.9999 100.037 23.9999Z" 
            [attr.fill]="colorBase"/>
        </svg>
      </div>
      
      <!-- Folder Front -->
      <div class="folder-front" [style.background-color]="colorWeak">
        <!-- Item Count (Bottom Left) -->
        <div class="item-count" [style.color]="colorBase">
          <span>{{ itemCount }}</span>
          <span class="item-count-label">ITEMS</span>
        </div>
        
        <!-- Icon (Bottom Right) -->
        <div class="folder-icon">
          <ds-icon 
            [name]="iconName" 
            [size]="'32px'"
            [style.color]="colorBase" />
        </div>
      </div>
    </div>
    
    <!-- Label -->
    <div class="folder-label">{{ label }}</div>
  `
})
export class DsMobileHandbookFolderComponent {
  /**
   * Base color for folder back, icon, and item count text
   * Example: '#d244cf' (pink-base)
   */
  @Input() colorBase: string = '#6B5FF5';
  
  /**
   * Weak/light color for folder front
   * Example: '#f9e6f9' (pink-weak)
   */
  @Input() colorWeak: string = '#E8E0FF';
  
  /**
   * Icon name from the design system icon library
   * Example: 'remixLightbulbLine', 'remixFolder3Line'
   */
  @Input() iconName: string = 'remixFolder3Line';
  
  /**
   * Number of items in the folder
   */
  @Input() itemCount: number = 0;
  
  /**
   * Label text displayed below the folder
   */
  @Input() label: string = 'Folder';
}

