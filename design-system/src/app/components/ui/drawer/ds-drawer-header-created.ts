import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';

/**
 * A drawer header component for viewing/editing existing items.
 * Displays action buttons on the left and utility actions (more options, close) on the right.
 * 
 * @example
 * Basic usage:
 * ```html
 * <ds-drawer-header-created 
 *   (onClose)="close()"
 *   (onMoreOptions)="handleMoreOptions()"
 *   slot="header">
 *   <ds-button slot="actions" variant="primary" leadingIcon="remixCheckLine">
 *     Mark as done
 *   </ds-button>
 *   <ds-button slot="actions" variant="secondary" leadingIcon="remixAddLine">
 *     Add time entry
 *   </ds-button>
 * </ds-drawer-header-created>
 * ```
 */
@Component({
  selector: 'ds-drawer-header-created',
  standalone: true,
  imports: [CommonModule, DsButtonComponent, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-drawer-header-created.css'],
  template: `
    <div class="ds-drawer-header-created">
      <div class="ds-drawer-header-created__actions-left">
        <ng-content select="[slot=actions]"></ng-content>
      </div>
      <div class="ds-drawer-header-created__actions-right">
        @if (showMoreOptions()) {
          <ds-button 
            variant="ghost" 
            [iconOnly]="true"
            [ariaLabel]="moreOptionsLabel()"
            (clicked)="onMoreOptions.emit()">
            <ds-icon slot="leading" [name]="moreOptionsIcon()" size="18px" />
          </ds-button>
        }
        @if (showClose()) {
          <ds-button 
            variant="ghost" 
            [iconOnly]="true"
            ariaLabel="Close drawer"
            (clicked)="onClose.emit()">
            <ds-icon slot="leading" name="remixCloseLine" size="18px" />
          </ds-button>
        }
      </div>
    </div>
  `
})
export class DsDrawerHeaderCreatedComponent {
  // More options button (optional, default false)
  showMoreOptions = input(false);
  moreOptionsIcon = input('remixMore2Line');
  moreOptionsLabel = input('More options');
  
  // Close button
  showClose = input(true);
  
  // Events
  onMoreOptions = output<void>();
  onClose = output<void>();
}

