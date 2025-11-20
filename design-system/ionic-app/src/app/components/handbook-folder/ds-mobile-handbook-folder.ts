import { Component, Input, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { DsMobileHandbookDetailModalService, HandbookDetailData, HandbookItem } from '../handbook-detail-modal';

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
      gap: 12px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      padding: 8px 8px 12px 8px;
      border-radius: 16px;
      background: var(--color-background-neutral-secondary, #f0f0f0);
      transition: background 0.2s ease;
    }
    
    :host:active {
      background: var(--color-background-neutral-secondary-hover, #ebebeb);
    }
    
    @media (hover: hover) {
      :host:hover {
        background: var(--color-background-neutral-secondary-hover, #ebebeb);
      }
    }
    
    .folder-container {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      perspective: 800px;
    }
    
    .folder-container.open .page-sheet {
      transform: translateY(-8px);
      transition-delay: 0.2s;
    }
    
    .folder-container.open .page-sheet:nth-child(1) {
      transform: scale(1) translateY(-8px) rotateX(-45deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(2) {
      transform: scale(0.98) translateY(-12px) rotateX(-36deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(3) {
      transform: scale(0.96) translateY(-16px) rotateX(-27deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(4) {
      transform: scale(0.94) translateY(-20px) rotateX(-18deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(5) {
      transform: scale(0.92) translateY(-24px) rotateX(-9deg) translateZ(0.1px);
    }
    
    .folder-container.open .page-sheet:nth-child(6) {
      transform: scale(0.90) translateY(-28px) rotateX(0deg) translateZ(0.1px);
    }
    
    .folder-container.open .folder-front {
      -webkit-transform: rotateX(-45deg) translateZ(0.1px);
      transform: rotateX(-45deg) translateZ(0.1px);
    }
    
    .folder-tab {
      width: 50%;
      height: auto;
      display: block;
    }
    
    .folder-back {
      height: 128px;
      border-radius: 0px 12px 12px 12px;
      position: relative;
      margin-top: -1px;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    
    .page-sheet {
      position: absolute;
      width: 80%;
      height: 120px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
      border: 1px solid var(--border-color-default);
      transition: transform 0.3s ease-out;
      left: 10%;
    }
    
    .page-sheet:nth-child(1) {
      bottom: 2px;
      z-index: 6;
      transform-origin: bottom center;
      transform: scale(1);
    }
    
    .page-sheet:nth-child(2) {
      bottom: 8px;
      z-index: 5;
      transform-origin: bottom center;
      transform: scale(0.98);
    }
    
    .page-sheet:nth-child(3) {
      bottom: 14px;
      z-index: 4;
      transform-origin: bottom center;
      transform: scale(0.96);
    }
    
    .page-sheet:nth-child(4) {
      bottom: 20px;
      z-index: 3;
      transform-origin: bottom center;
      transform: scale(0.94);
    }
    
    .page-sheet:nth-child(5) {
      bottom: 26px;
      z-index: 2;
      transform-origin: bottom center;
      transform: scale(0.92);
    }
    
    .page-sheet:nth-child(6) {
      bottom: 32px;
      z-index: 1;
      transform-origin: bottom center;
      transform: scale(0.90);
    }
    
    .folder-front {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 116px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      z-index: 2;
      transform-origin: bottom center;
      transform-style: preserve-3d;
      transition: transform 0.4s ease-in-out;
      will-change: transform;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-font-smoothing: antialiased;
      -webkit-transform: rotateX(-20deg) translateZ(0.1px);
      transform: rotateX(-20deg) translateZ(0.1px);
      box-shadow: inset 0 64px 48px rgba(255, 255, 255, 0.2), 
                  inset 0 2px 4px rgba(255, 255, 255, 0.3),
                  inset 0 1px 1px rgba(255, 255, 255, 0.3);
    }
    
    .item-count {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .item-count-label {
      letter-spacing: 0.5px;
    }
    
    .folder-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .folder-label-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    
    .folder-label {
      text-align: center;
    }
  `],
  template: `
    <div class="folder-container" 
         [class.open]="isOpen()">
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
          [attr.fill]="getColorVar('strong')"/>
      </svg>
      
      <!-- Folder Back -->
      <div class="folder-back" [style.background-color]="getColorVar('strong')">
        <!-- Page Sheets -->
        @for (sheet of getPageSheets(); track $index) {
          <div class="page-sheet"></div>
        }
        
        <!-- Folder Front -->
        <div 
          class="folder-front" 
          [style.--border-color]="getColorVar('strong')"
          [style.background-color]="getColorVar('base')">
          <!-- Icon (Centered) -->
          <div class="folder-icon">
            <ds-icon 
              [name]="iconName" 
              [size]="'32px'"
              [style.color]="getColorVar('strong')" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Label and Item Count -->
    <div class="folder-label-container">
      <div class="folder-label ui-sm-medium">{{ label }}</div>
      <div class="item-count ui-sm-regular" [style.color]="'var(--color-text-secondary, #6b7280)'">
        <span>{{ itemCount }}</span>
        <span class="item-count-label">items</span>
      </div>
    </div>
  `
})
export class DsMobileHandbookFolderComponent {
  /**
   * Color variant for the folder
   * Available variants: success, warning, destructive, blue, light-purple, pink, salmon-orange, orange, lime-green, grey
   * Example: 'pink', 'success', 'blue'
   */
  @Input() variant: string = 'light-purple';
  
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
   * Optional items data for the handbook folder
   */
  @Input() items?: HandbookItem[];
  
  /**
   * Track open/closed state for animation
   */
  isOpen = signal(false);
  
  /**
   * Get the CSS variable name for the color variant
   */
  getColorVar(suffix: 'base' | 'strong'): string {
    const variantMap: Record<string, string> = {
      'success': 'success',
      'warning': 'warning',
      'destructive': 'destructive',
      'blue': 'blue',
      'light-purple': 'light-purple',
      'pink': 'pink',
      'salmon-orange': 'salmon-orange',
      'orange': 'orange',
      'lime-green': 'lime-green',
      'grey': 'grey'
    };
    
    const colorName = variantMap[this.variant] || 'light-purple';
    return `var(--color-${colorName}-${suffix})`;
  }
  
  /**
   * Open folder animation
   */
  @HostListener('mouseenter')
  open(): void {
    this.isOpen.set(true);
  }
  
  /**
   * Close folder animation
   */
  @HostListener('mouseleave')
  close(): void {
    this.isOpen.set(false);
  }
  
  /**
   * Handle touch start - open animation
   */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.isOpen.set(true);
  }
  
  /**
   * Handle touch end - close animation
   */
  @HostListener('touchend')
  onTouchEnd(): void {
    this.isOpen.set(false);
  }
  
  /**
   * Handle touch cancel - close animation
   */
  @HostListener('touchcancel')
  onTouchCancel(): void {
    this.isOpen.set(false);
  }
  
  /**
   * Handle click - open modal
   */
  @HostListener('click')
  async onClick(): Promise<void> {
    const handbookData: HandbookDetailData = {
      title: this.label,
      variant: this.variant,
      iconName: this.iconName,
      itemCount: this.itemCount,
      items: this.items
    };

    await this.handbookModal.open(handbookData);
  }
  
  /**
   * Calculate the number of page sheets to display
   * Max 6 sheets regardless of item count
   */
  getPageSheets(): number[] {
    const count = Math.min(this.itemCount, 6);
    return Array(count).fill(0);
  }

  constructor(
    private handbookModal: DsMobileHandbookDetailModalService
  ) {}
}

