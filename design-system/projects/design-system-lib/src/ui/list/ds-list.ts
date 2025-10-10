import { Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsListItemComponent } from '../list-item/ds-list-item';

/**
 * List Component
 * 
 * A container component that provides consistent styling for lists of items.
 * Handles border radius, dividers, and spacing automatically.
 * 
 * @example
 * ```html
 * <ds-list>
 *   <ds-list-item title="Item 1">
 *     <div slot="metadata">...</div>
 *     <div slot="actions">...</div>
 *   </ds-list-item>
 *   <ds-list-item title="Item 2">...</ds-list-item>
 * </ds-list>
 * ```
 */
@Component({
  selector: 'ds-list',
  standalone: true,
  imports: [CommonModule, DsListItemComponent],
  template: `
    <div class="ds-list">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .ds-list {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* List item base styles */
    ds-list-item {
      display: block;
      position: relative;
    }

    /* Hover state border radius */
    ds-list-item:first-child .list-item:hover {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    ds-list-item:last-child .list-item:hover {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class DsListComponent {
  @ContentChildren(DsListItemComponent) items!: QueryList<DsListItemComponent>;
}
