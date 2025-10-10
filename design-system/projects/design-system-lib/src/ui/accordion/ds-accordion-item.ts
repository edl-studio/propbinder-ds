import { Component, input, ElementRef } from '@angular/core';
import { DsIconButtonComponent } from '../button/ds-icon-button';
import { DsIconComponent } from '../icon/ds-icon';
import {
  NgpAccordionContent,
  NgpAccordionItem,
  NgpAccordionTrigger,
} from 'ng-primitives/accordion';

/**
 * An individual item within an accordion component.
 * 
 * @example
 * ```html
 * <ds-accordion-item-2 value="item-1" heading="Section Title">
 *   Content goes here
 * </ds-accordion-item-2>
 * ```
 */
@Component({
  selector: 'ds-accordion-item',
  standalone: true,
  imports: [NgpAccordionContent, NgpAccordionTrigger, DsIconButtonComponent, DsIconComponent],
  hostDirectives: [
    {
      directive: NgpAccordionItem,
      inputs: ['ngpAccordionItemValue:value', 'ngpAccordionItemDisabled:disabled'],
    },
  ],
  template: `
    <div ngpAccordionTrigger #trigger class="accordion-trigger">
      <span>{{ heading() }}</span>
      <ds-icon-button
        variant="ghost"
        [tooltipDisabled]="true"
        class="accordion-icon"
      >
        <ds-icon
          name="remixArrowDownSLine"
          size="20px"
          slot="leading"
        />
      </ds-icon-button>
    </div>
    <div ngpAccordionContent class="accordion-content">
      <div class="accordion-content-inner body-sm-regular">
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    :host:not(:last-child) {
      border-bottom: 1px solid var(--border-color-default);
    }

    .accordion-trigger {
      display: flex;
      padding: 12px 12px 12px 24px;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      color: var(--text-color-default-primary);
      background-color: white;
      cursor: pointer;
    }

    .accordion-trigger span {
      @extend .ui-base-medium;
    }

    .accordion-content {
      overflow: hidden;
      padding: 0 24px;
      box-sizing: border-box;
    }

    .accordion-content-inner {
      padding: 0 0 20px;
      color: var(--text-color-default-secondary);
    }

    [ngpAccordionContent][data-open] {
      animation: slideDown 0.2s ease-in-out forwards;
    }

    [ngpAccordionContent][data-closed] {
      animation: slideUp 0.2s ease-in-out forwards;
    }

    @keyframes slideDown {
      from {
        height: 0;
      }
      to {
        height: var(--ngp-accordion-content-height);
      }
    }

    @keyframes slideUp {
      from {
        height: var(--ngp-accordion-content-height);
      }
      to {
        height: 0;
      }
    }

    ds-icon {
      display: block;
      transition: transform 0.2s ease;
    }

    [ngpAccordionTrigger][data-open] ds-icon {
      transform: rotate(180deg);
    }
  `,
})
export class DsAccordionItem {
  /** The accordion item heading */
  readonly heading = input.required<string>();
}
