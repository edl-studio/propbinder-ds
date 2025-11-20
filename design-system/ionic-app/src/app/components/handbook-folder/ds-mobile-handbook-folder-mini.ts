import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';

/**
 * DsMobileHandbookFolderMiniComponent
 * 
 * A minimized folder icon component for use in headers and small spaces.
 * Simplified version without animations or page sheets - just folder and icon.
 * 
 * @example
 * ```html
 * <ds-mobile-handbook-folder-mini
 *   [variant]="'pink'"
 *   [iconName]="'remixLightbulbLine'">
 * </ds-mobile-handbook-folder-mini>
 * ```
 */
@Component({
  selector: 'ds-mobile-handbook-folder-mini',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  styles: [`
    :host {
      display: inline-block;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
    }
    
    .mini-folder-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .mini-folder-tab {
      width: 50%;
      height: auto;
      display: block;
    }
    
    .mini-folder-back {
      height: 28px;
      border-radius: 0px 4px 4px 4px;
      position: relative;
      margin-top: -1px;
    }
    
    .mini-folder-front {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      box-shadow: inset 0 8px 8px rgba(255, 255, 255, 0.2), 
                  inset 0 0.5px 0.5px rgba(255, 255, 255, 0.3);
    }
  `],
  template: `
    <div class="mini-folder-container">
      <!-- Folder Tab SVG -->
      <svg 
        class="mini-folder-tab" 
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
      <div class="mini-folder-back" [style.background-color]="getColorVar('strong')">
        <!-- Folder Front -->
        <div 
          class="mini-folder-front" 
          [style.background-color]="getColorVar('strong')">
          <ds-icon 
            [name]="iconName" 
            [size]="'14px'"
            [style.color]="'white'" />
        </div>
      </div>
    </div>
  `
})
export class DsMobileHandbookFolderMiniComponent {
  /**
   * Color variant for the folder
   * Available variants: success, warning, destructive, blue, light-purple, pink, salmon-orange, orange, lime-green, grey
   */
  @Input() variant: string = 'light-purple';
  
  /**
   * Icon name from the design system icon library
   */
  @Input() iconName: string = 'remixFolder3Line';
  
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
}

