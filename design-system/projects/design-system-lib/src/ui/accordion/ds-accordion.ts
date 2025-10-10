import { Component } from '@angular/core';
import { NgpAccordion } from 'ng-primitives/accordion';

/**
 * A component that displays a list of expandable/collapsible sections.
 * Based on ng-primitives accordion component.
 * 
 * @example
 * ```html
 * <ds-accordion-2 [value]="expandedItems" [type]="'single'" [collapsible]="true">
 *   <ds-accordion-item-2 value="item-1" heading="Section 1">
 *     Content for section 1
 *   </ds-accordion-item-2>
 * </ds-accordion-2>
 * ```
 */
@Component({
  selector: 'ds-accordion',
  standalone: true,
  hostDirectives: [
    {
      directive: NgpAccordion,
      inputs: [
        'ngpAccordionValue:value',
        'ngpAccordionType:type',
        'ngpAccordionCollapsible:collapsible',
        'ngpAccordionDisabled:disabled',
        'ngpAccordionOrientation:orientation',
      ],
    },
  ],
  template: `
    <ng-content />
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      max-width: 24rem;
      border-radius: 8px;
      border: 1px solid var(--border-color-default);
      background-color: white;
      box-shadow: 0 1px 0 0 var(--border-color-default);
      overflow: hidden;
    }
  `,
})
export class DsAccordion {}
