import { Component, input } from '@angular/core';

/**
 * A drawer component that slides in from the side of the screen.
 * This component provides the visual styling for a drawer content area.
 * It should be used inside an Angular Primitives dialog template.
 * 
 * @example
 * ```html
 * <button [ngpDialogTrigger]="drawer" ngpButton>Open Drawer</button>
 * 
 * <ng-template #drawer let-close="close">
 *   <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
 *     <ds-drawer ngpDialog [position]="'right'">
 *       <h2 slot="header">Drawer Title</h2>
 *       <div slot="content">Main content</div>
 *     </ds-drawer>
 *   </div>
 * </ng-template>
 * ```
 */
@Component({
  selector: 'ds-drawer',
  standalone: true,
  imports: [],
  styleUrls: ['./ds-drawer.css'],
  template: `
    <div 
      class="ds-drawer"
      [class.ds-drawer--right]="position() === 'right'"
      [class.ds-drawer--left]="position() === 'left'"
      role="dialog"
      aria-modal="true"
    >
      <div class="ds-drawer__header">
        <ng-content select="[slot=header]"></ng-content>
      </div>

      <!-- Primary content: white bg, border-bottom, padding -->
      <div class="ds-drawer__primary-content">
        <ng-content select="[slot=primary-content]"></ng-content>
      </div>

      <!-- Secondary content: neutral-secondary bg, padding, gap (for regular content) -->
      <div class="ds-drawer__secondary-content">
        <ng-content select="[slot=secondary-content]"></ng-content>
      </div>

      <!-- Tabs: white bg, border-bottom, edge-to-edge, 0 padding -->
      <div class="ds-drawer__tabs">
        <ng-content select="[slot=tabs]"></ng-content>
      </div>

      <!-- Backward compatible: simple content slot -->
      <div class="ds-drawer__content">
        <ng-content select="[slot=content]"></ng-content>
      </div>
    </div>
  `
})
export class DsDrawerComponent {
  /** Position of the drawer. Determines which side it slides in from. */
  position = input<'left' | 'right'>('right');
}