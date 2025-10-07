import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, contentChildren, ElementRef, inject, input, model, OnDestroy, signal, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NgpTabButton, NgpTabList, NgpTabPanel, NgpTabset } from 'ng-primitives/tabs';
// Using custom dropdown instead of ng-primitives menu due to positioning requirements
import { DsTab } from './ds-tab';
import { DsIconComponent } from '../icon/ds-icon';

interface TabState {
  visible: DsTab[];
  overflow: DsTab[];
}

/**
 * A tabs component that allows switching between different content panels.
 * Uses ng-primitives/tabs under the hood for accessibility and keyboard navigation.
 */
@Component({
  selector: 'ds-tabs',
  standalone: true,
  imports: [NgpTabset, NgpTabButton, NgpTabList, NgpTabPanel, NgTemplateOutlet, DsIconComponent],
  styles: `
    [ngpTabPanel]:not([data-active]) {
      display: none;
    }
    [ngpTabList] {
      position: relative;
    }
    .tabs-divider {
      position: absolute !important;
      bottom: -2px !important;
    }
    [ngpTabButton] {
      position: relative;
      z-index: 1;
      color: var(--text-color-default-tertiary);
    }
    [ngpTabButton][data-active] {
      color: var(--color-brand-base);
    }
    [ngpTabButton]:not([data-active])[data-hover] {
      color: var(--text-color-default-secondary);
    }
    [ngpTabButton]:not([data-active])[data-hover] .tab-label {
      background-color: var(--background-color-interactive-default);
    }
    [ngpTabButton][data-active].pressed .tab-label {
      background-color: var(--background-color-interactive-default);
    }
   
    /* Base styles for both indicators */
    .hover-indicator,
    .active-indicator {
      position: absolute;
      bottom: -2px;
      height: 2px;
      border-radius: 999px;
      pointer-events: none;
    }

    /* Hover indicator specific styles */
    .hover-indicator {
      opacity: 0;
      background-color: var(--text-color-default-tertiary);
      transition: opacity 0.1s ease;
    }

    [ngpTabButton][data-hover]:not([data-active]) ~ .hover-indicator {
      opacity: 1;
    }

    /* Active indicator specific styles */
    .active-indicator {
      transition: transform 0.35s ease, width 0.35s ease;
      transform-origin: left;
      background-color: var(--color-brand-base);
    }

    /* Badge styles */
    .tab-badge {
      display: grid;
      place-items: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      margin-left: 6px;
      border-radius: 6px;
      background-color: var(--background-color-interactive-default-hover);
      color: var(--text-color-default-tertiary);
      font-size: 11px;
      line-height: 1;
      font-weight: 500;
    }

    [ngpTabButton][data-active] .tab-badge {
      background-color: var(--color-brand-weak);
      color: var(--color-brand-base);
    }

    /* Container for measurement */
    .measurement-container {
      position: absolute;
      visibility: hidden;
      pointer-events: none;
      white-space: nowrap;
    }

    /* More dropdown styles - using ds-select patterns */
    .more-dropdown {
      position: relative;
    }

    .more-button {
      display: flex;
      align-items: center;
      gap: 4px;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--text-color-default-tertiary);
    }

    .more-button:hover {
      color: var(--text-color-default-secondary);
    }

    .more-button .tab-label {
      background-color: transparent;
    }

    .more-button:hover .tab-label {
      background-color: var(--background-color-interactive-default);
    }

    /* Dropdown using ng-primitives menu */
    .overflow-menu {
      position: absolute;
      z-index: 50;
      top: 100%;
      right: 0;
      margin-top: 4px;
      background-color: var(--background-color-page);
      border-radius: 6px;
      border: 1px solid var(--border-color-default);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      min-width: 192px;
      max-width: 256px;
      max-height: 240px;
      overflow-y: auto;
      padding: 4px;
    }

    .overflow-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 32px;
      padding: 0 8px;
      cursor: pointer;
      user-select: none;
      transition: colors 200ms ease-in-out;
      color: var(--text-color-default-primary);
      border-radius: 4px;
    }

    .overflow-item[data-hover],
    .overflow-item[data-press] {
      background-color: var(--background-color-interactive-default);
    }

    .overflow-item[data-active] {
      background-color: var(--color-brand-weak);
      color: var(--color-brand-base);
    }

    .overflow-item[data-disabled] {
      opacity: 0.6;
      cursor: not-allowed;
      color: var(--text-color-disabled);
    }
  `,
  template: `
    <div ngpTabset>
      <div #tabList ngpTabList class="tw-flex tw-gap-4 tw-py-2.5 tw-relative">
        <!-- Edge-to-edge divider -->
        <div class="edge-to-edge-divider tabs-divider"></div>
        @for (tab of visibleTabs(); track tab.value()) {
          <button 
            #tabButton
            ngpTabButton 
            [ngpTabButtonValue]="tab.value()"
            (click)="handleClick($event)"
            (mouseenter)="updateHoverIndicator($event)"
            (mouseleave)="hideHoverIndicator()"
          >
            <span class="tab-label tw-py-1.5 tw-px-2 tw-rounded-lg ui-sm-regular tw-flex tw-items-center">
              {{ tab.label() }}
              @if (tab.showBadge()) {
                <span class="tab-badge">{{ tab.badgeCount() }}</span>
              }
            </span>
          </button>
        }

        @if (overflowTabs().length > 0) {
          <div class="more-dropdown tw-relative">
            <button 
              type="button"
              class="more-button tw-rounded-lg"
              (click)="toggleOverflow()"
              (blur)="closeOverflow()"
            >
              <span class="tab-label tw-py-1.5 tw-px-2 tw-rounded-lg ui-sm-regular tw-flex tw-items-center tw-gap-1">
                More
                <ds-icon name="remixArrowDownSLine" size="16px" />
              </span>
            </button>

            @if (showOverflow()) {
              <div class="overflow-menu">
                @for (tab of overflowTabs(); track tab.value()) {
                  <div 
                    class="overflow-item ui-sm-regular"
                    [attr.data-active]="tab.value() === value() ? '' : null"
                    (click)="onOverflowTabSelect(tab.value())"
                    (mouseenter)="setHoverState($event, true)"
                    (mouseleave)="setHoverState($event, false)"
                  >
                    {{ tab.label() }}
                    @if (tab.showBadge()) {
                      <span class="tab-badge">{{ tab.badgeCount() }}</span>
                    }
                  </div>
                }
              </div>
            }
          </div>
        }

        <div #hoverIndicator class="hover-indicator"></div>
        <div #indicator class="active-indicator"></div>
      </div>

      @for (tab of tabs(); track tab.value()) {
        <div 
          ngpTabPanel 
          [ngpTabPanelValue]="tab.value()" 
          class="tw-py-4"
        >
          <ng-container [ngTemplateOutlet]="tab.content()" />
        </div>
      }

      <!-- Hidden container for measurements -->
      <div #measureContainer class="measurement-container"></div>
    </div>
  `
})
export class DsTabs implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  
  readonly value = model<string>();
  readonly tabs = contentChildren(DsTab);

  @ViewChild('indicator') indicator?: ElementRef<HTMLElement>;
  @ViewChild('hoverIndicator') hoverIndicator?: ElementRef<HTMLElement>;
  @ViewChild('tabList') tabList?: ElementRef<HTMLElement>;
  @ViewChild('measureContainer') measureContainer?: ElementRef<HTMLElement>;
  @ViewChildren('tabButton') tabButtons!: QueryList<ElementRef<HTMLElement>>;

  // State signals
  private readonly tabState = signal<TabState>({ visible: [], overflow: [] });
  readonly visibleTabs = signal<DsTab[]>([]);
  readonly overflowTabs = signal<DsTab[]>([]);
  readonly showOverflow = signal(false);

  // ResizeObserver for container width changes
  private resizeObserver?: ResizeObserver;
  private resizeTimeout?: number;
  private mutationObserver?: MutationObserver;

  ngAfterViewInit() {
    // Set initial value if not set
    if (!this.value() && this.tabs().length > 0) {
      this.value.set(this.tabs()[0].value());
    }

    // Set up resize observer
    this.setupResizeObserver();
    
    // Initial measurement
    this.measureAndUpdateTabs();

    // Initialize indicator position
    this.tabButtons.changes.subscribe(() => {
      this.updateActiveIndicator();
    });

    // Set up mutation observer to watch for data-active changes
    this.setupMutationObserver();

    // Double requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.updateActiveIndicator();
      });
    });
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    window.clearTimeout(this.resizeTimeout);
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      // Debounce resize calculations
      window.clearTimeout(this.resizeTimeout);
      this.resizeTimeout = window.setTimeout(() => {
        this.measureAndUpdateTabs();
      }, 150);
    });

    if (this.tabList?.nativeElement) {
      this.resizeObserver.observe(this.tabList.nativeElement);
    }
  }

  private setupMutationObserver() {
    this.mutationObserver = new MutationObserver(() => {
      // Update indicator when data-active attributes change
      requestAnimationFrame(() => {
        this.updateActiveIndicator();
      });
    });

    if (this.tabList?.nativeElement) {
      this.mutationObserver.observe(this.tabList.nativeElement, {
        attributes: true,
        attributeFilter: ['data-active'],
        subtree: true
      });
    }
  }

  private measureAndUpdateTabs() {
    if (!this.measureContainer?.nativeElement || !this.tabList?.nativeElement) return;

    const containerWidth = this.tabList.nativeElement.offsetWidth;
    const measureContainer = this.measureContainer.nativeElement;
    const allTabs = this.tabs();
    const tabWidths: number[] = [];
    
    // Measure each tab's width
    allTabs.forEach(tab => {
      measureContainer.textContent = tab.label();
      if (tab.showBadge()) {
        // Add estimated badge width
        tabWidths.push(measureContainer.offsetWidth + 40);
      } else {
        tabWidths.push(measureContainer.offsetWidth + 16);
      }
    });

    // Calculate how many tabs fit
    let availableWidth = containerWidth - 100; // Reserve space for More button
    let visibleCount = 0;
    let totalWidth = 0;

    for (let i = 0; i < tabWidths.length; i++) {
      if (totalWidth + tabWidths[i] > availableWidth) break;
      totalWidth += tabWidths[i];
      visibleCount++;
    }

    // Update tab states
    const visible = allTabs.slice(0, visibleCount);
    const overflow = allTabs.slice(visibleCount);

    this.visibleTabs.set(visible);
    this.overflowTabs.set(overflow);
  }

  private updateActiveIndicator() {
    // Find the button with data-active attribute (set by ng-primitives)
    const activeButton = this.tabButtons.find(ref => 
      ref.nativeElement.hasAttribute('data-active')
    );

    if (activeButton) {
      this.updateIndicator(activeButton.nativeElement);
    } else {
      // Fallback: use the first tab if no active button found
      const firstButton = this.tabButtons.first;
      if (firstButton) {
        this.updateIndicator(firstButton.nativeElement);
      }
    }
  }

  handleClick(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    this.updateIndicator(button);
    this.hideHoverIndicator();
  }

  updateIndicator(button: HTMLElement) {
    if (this.indicator?.nativeElement) {
      this.indicator.nativeElement.style.width = `${button.offsetWidth}px`;
      this.indicator.nativeElement.style.transform = `translateX(${button.offsetLeft}px)`;
    }
  }

  updateHoverIndicator(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    if (this.hoverIndicator?.nativeElement) {
      this.hoverIndicator.nativeElement.style.width = `${button.offsetWidth}px`;
      this.hoverIndicator.nativeElement.style.transform = `translateX(${button.offsetLeft}px)`;
      this.hoverIndicator.nativeElement.style.opacity = '1';
    }
  }

  hideHoverIndicator() {
    if (this.hoverIndicator?.nativeElement) {
      this.hoverIndicator.nativeElement.style.opacity = '0';
    }
  }

  toggleOverflow() {
    this.showOverflow.update(v => !v);
  }

  closeOverflow() {
    this.showOverflow.set(false);
  }

  setHoverState(event: MouseEvent, isHovered: boolean) {
    const element = event.currentTarget as HTMLElement;
    if (isHovered) {
      element.setAttribute('data-hover', '');
    } else {
      element.removeAttribute('data-hover');
    }
  }

  onOverflowTabSelect(tabValue: string) {
    this.value.set(tabValue);
    this.closeOverflow();
    
    // Update the active indicator after value change
    requestAnimationFrame(() => {
      this.updateActiveIndicator();
    });
  }
}