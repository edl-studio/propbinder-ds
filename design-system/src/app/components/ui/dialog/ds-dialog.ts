import { Component, input, output } from '@angular/core';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';

/**
 * A dialog component that appears in the center of the screen.
 * This component provides the visual styling for a dialog content area.
 * It should be used inside an Angular Primitives dialog template.
 * 
 * @example
 * ```html
 * <button [ngpDialogTrigger]="dialog" ngpButton>Open Dialog</button>
 * 
 * <ng-template #dialog let-close="close">
 *   <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
 *     <ds-dialog 
 *       ngpDialog 
 *       [size]="'md'"
 *       [title]="'Dialog Title'"
 *       (close)="close()">
 *       <div slot="content">Main content</div>
 *       <div slot="footer">
 *         <ds-button variant="ghost" (click)="close()">Cancel</ds-button>
 *         <ds-button variant="primary" (click)="close()">Save</ds-button>
 *       </div>
 *     </ds-dialog>
 *   </div>
 * </ng-template>
 * ```
 */
@Component({
  selector: 'ds-dialog',
  standalone: true,
  imports: [DsButtonComponent, DsIconComponent],
  styleUrls: ['./ds-dialog.css'],
  template: `
    <div 
      class="ds-dialog"
      [class.ds-dialog--sm]="size() === 'sm'"
      [class.ds-dialog--md]="size() === 'md'"
      [class.ds-dialog--lg]="size() === 'lg'"
      [class.ds-dialog--xl]="size() === 'xl'"
      role="dialog"
      aria-modal="true"
    >
      @if (title()) {
      <div class="ds-dialog__header">
          <h2 class="ds-dialog__title heading-xl">{{ title() }}</h2>
          <ds-button 
            variant="ghost" 
            [iconOnly]="true"
            ariaLabel="Close dialog"
            (clicked)="close.emit()">
            <ds-icon slot="leading" name="remixCloseLine" size="18px" />
          </ds-button>
      </div>
      }

      <div class="ds-dialog__content">
        <ng-content select="[slot=content]"></ng-content>
      </div>

      <div class="ds-dialog__footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `
})
export class DsDialogComponent {
  /** Size variant of the dialog */
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  
  /** Title text displayed in the header */
  title = input<string>();
  
  /** Emitted when the close button is clicked */
  close = output<void>();
}
