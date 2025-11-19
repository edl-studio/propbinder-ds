import { Component, Input, signal } from '@angular/core';
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
      display: flex;
      flex-direction: column;
      perspective: 600px;
    }
    
    .folder-container.open .page-sheet {
      transform: translateY(-8px);
      transition-delay: 0.2s;
    }
    
    .folder-container.open .page-sheet:nth-child(1) {
      transform: scale(0.90) translateY(-28px) rotateX(0deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(2) {
      transform: scale(0.92) translateY(-24px) rotateX(-9deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(3) {
      transform: scale(0.94) translateY(-20px) rotateX(-18deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(4) {
      transform: scale(0.96) translateY(-16px) rotateX(-27deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(5) {
      transform: scale(0.98) translateY(-12px) rotateX(-36deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(6) {
      transform: scale(1) translateY(-8px) rotateX(-45deg) translateZ(0.1px);
    }
    
    .folder-container.open .folder-front {
      -webkit-transform: rotateX(-30deg) translateZ(0.1px);
      transform: rotateX(-45deg) translateZ(0.1px);
    }
    
    .folder-tab {
      width: 50%;
      height: auto;
      display: block;
    }
    
    .folder-back {
      height: 72px;
      border-radius: 0px 12px 12px 12px;
      position: relative;
      margin-top: -1px;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    
    .page-sheet {
      position: absolute;
      width: 128px;
      height: 56px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
      border: 1px solid var(--border-color-default);
      transition: transform 0.3s ease-out;
      left: 16px;
    }
    
    .page-sheet:nth-child(1) {
      bottom: 20px;
      z-index: 1;
      transform-origin: bottom center;
      transform: scale(0.90);
    }
    
    .page-sheet:nth-child(2) {
      bottom: 18px;
      z-index: 1;
      transform-origin: bottom center;
      transform: scale(0.92);
    }
    
    .page-sheet:nth-child(3) {
      bottom: 16px;
      z-index: 1;
      transform-origin: bottom center;
      transform: scale(0.94);
    }
    
    .page-sheet:nth-child(4) {
      bottom: 14px;
      z-index: 1;
      transform-origin: bottom center;
      transform: scale(0.96);
    }
    
    .page-sheet:nth-child(5) {
      bottom: 12px;
      z-index: 1;
      transform-origin: bottom center;
      transform: scale(0.98);
    }
    
    .page-sheet:nth-child(6) {
      bottom: 10px;
      z-index: 1;
      transform-origin: bottom center;
      transform: scale(1);
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
      transform-origin: bottom center;
      transform-style: preserve-3d;
      transition: transform 0.4s ease-in-out;
      will-change: transform;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-font-smoothing: antialiased;
      -webkit-transform: rotateX(0deg) translateZ(0.1px);
      transform: rotateX(0deg) translateZ(0.1px);
      border-left: 1px solid var(--border-color, transparent);
      border-right: 1px solid var(--border-color, transparent);
      border-bottom: 1px solid var(--border-color, transparent);
      box-shadow: inset 0 10px 10px rgba(255, 255, 255, 0.2), 
                  inset 0 1px 1px rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    
    .item-count {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 500;
      line-height: 1.2;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .item-count-label {
      font-size: var(--font-size-sm);
      font-weight: 500;
      line-height: 1.2;
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
    <div class="folder-container" [class.open]="isOpen()" (click)="toggleOpen()">
      <!-- Folder Tab SVG -->
      <svg 
        class="folder-tab" 
        width="101" 
        height="24" 
        viewBox="0 0 101 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M100.037 23.9999L100.5 24L0 24.0001V10.7646C0 4.80853 4.91797 -0.0234985 11 -0.0196688L66.4213 -0.0322266C69.3519 -0.0115886 72.197 1.20548 74.2473 3.29947L90.6765 20.0951C93.1218 22.5925 96.5417 23.9999 100.037 23.9999Z" 
          [attr.fill]="colorBase"/>
      </svg>
      
      <!-- Folder Back -->
      <div class="folder-back" [style.background-color]="colorBase">
        <!-- Page Sheets -->
        @for (sheet of getPageSheets(); track $index) {
          <div class="page-sheet"></div>
        }
        
        <!-- Folder Front -->
        <div 
          class="folder-front" 
          [style.--border-color]="colorBase">
          <!-- Item Count (Bottom Left) -->
          <div class="item-count" [style.color]="colorBase">
            <span>{{ itemCount }}</span>
            <span class="item-count-label">ITEMS</span>
          </div>
          
          <!-- Icon (Bottom Right) -->
          <div class="folder-icon">
            <ds-icon 
              [name]="iconName" 
              [size]="'20px'"
              [style.color]="colorBase" />
          </div>
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
  
  /**
   * Track open/closed state for animation
   */
  isOpen = signal(false);
  
  /**
   * Toggle folder open/closed animation
   */
  toggleOpen(): void {
    this.isOpen.set(!this.isOpen());
  }
  
  /**
   * Calculate the number of page sheets to display
   * Max 6 sheets regardless of item count
   */
  getPageSheets(): number[] {
    const count = Math.min(this.itemCount, 6);
    return Array(count).fill(0);
  }
}

