import { Component, input, TemplateRef, viewChild } from '@angular/core';

/**
 * Individual tab component that defines a single tab's content and metadata.
 * Used within the DsTabs component.
 * 
 * @example
 * ```html
 * <ds-tabs [(value)]="selectedTab">
 *   <ds-tab value="tab1" label="First Tab" [showBadge]="true" [badgeCount]="4">
 *     Content for first tab
 *   </ds-tab>
 * </ds-tabs>
 * ```
 */
@Component({
  selector: 'ds-tab',
  standalone: true,
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `,
})
export class DsTab {
  /**
   * The unique value of the tab. Used for selection tracking.
   * @required
   */
  readonly value = input.required<string>();

  /**
   * The display label of the tab shown in the tab button.
   * @required
   */
  readonly label = input.required<string>();

  /**
   * Whether to show the badge count.
   */
  readonly showBadge = input<boolean>(false);

  /**
   * The number to display in the badge.
   */
  readonly badgeCount = input<number>(0);

  /**
   * The content template of the tab.
   * @internal
   */
  readonly content = viewChild.required<TemplateRef<void>>('content');
}