import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tile-header',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  styles: [`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 32px;
    }
    
    /* Title slot - predefined typography and internal gap */
    ::ng-deep header-title {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
      font-family: var(--font-family-primary);
      font-size: 18px;
      font-weight: 500;
      line-height: 1.5;
      color: var(--text-color-default-primary);
    }
    
    /* Actions slot - handles multiple buttons */
    ::ng-deep header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    
    @media (max-width: 640px) {
      :host {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        height: auto;
      }
      
      ::ng-deep header-title {
        width: 100%;
      }
      
      ::ng-deep header-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `],
  template: `
    <ng-content select="header-title" />
    <ng-content select="header-actions" />
  `,
})
export class TileHeaderComponent {}

