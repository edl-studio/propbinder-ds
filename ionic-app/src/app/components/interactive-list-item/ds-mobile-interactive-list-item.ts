import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * DsMobileInteractiveListItemComponent
 * 
 * A generic, reusable base component for interactive list items.
 * Provides flexible content slots and touch interactions for mobile-optimized list displays.
 * 
 * This component serves as the foundation for specialized list item types like posts,
 * notifications, messages, and other interactive list content.
 * 
 * @example
 * ```html
 * <ds-mobile-interactive-list-item
 *   [clickable]="true"
 *   [leadingSize]="'40px'"
 *   (itemClick)="handleClick()">
 *   
 *   <div content-leading>
 *     <ds-avatar initials="JD" />
 *   </div>
 *   
 *   <div content-main>
 *     <h3>Main Content</h3>
 *     <p>Supporting text goes here...</p>
 *   </div>
 *   
 *   <div content-trailing>
 *     <button>Action</button>
 *   </div>
 * </ds-mobile-interactive-list-item>
 * ```
 */
@Component({
  selector: 'ds-mobile-interactive-list-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class.clickable]': 'clickable()',
    '[class.variant-feed]': 'variant() === "feed"',
    '[class.variant-detail]': 'variant() === "detail"',
    '[class.variant-compact]': 'variant() === "compact"',
    '(click)': 'handleItemClick($event)',
    '(touchstart)': 'handleTouchStart($event)',
    '(touchend)': 'handleTouchEnd($event)',
    '(touchmove)': 'handleTouchMove($event)',
    '(contextmenu)': 'handleContextMenu($event)',
    '[style.--leading-size]': 'leadingSize()'
  },
  styles: [`
    :host {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      background: var(--color-background-primary, #ffffff);
      padding: 8px;
      gap: 12px;
      transition: all 0.2s ease;
      position: relative;
      border-radius: 16px;
      margin-bottom: 8px;
      margin-left: -8px;
      margin-right: -8px;
      --leading-size: 32px;
    }
    
    :host::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: calc(var(--leading-size) + 20px);
      right: 8px;
      height: 1px;
      background: var(--border-color-default);
    }
    
    :host:last-child {
      margin-bottom: 0;
    }
    
    :host:last-child::after {
      display: none;
    }
    
    :host.clickable {
      cursor: pointer;
    }
    
    :host.clickable:active {
      background: var(--color-background-neutral-primary-hover, #f5f5f5);
    }
    
    :host.variant-detail {
      padding: 0;
      margin-bottom: 8px;
    }
    
    :host.variant-detail::after {
      display: none;
    }
    
    :host.variant-compact {
      padding: 8px;
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .content-leading {
      flex-shrink: 0;
      width: var(--leading-size);
      height: var(--leading-size);
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    
    .content-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .content-trailing {
      flex-shrink: 0;
      display: flex;
      align-items: flex-start;
    }
  `],
  template: `
    @if (hasLeadingContent()) {
      <div class="content-leading">
        <ng-content select="[content-leading]" />
      </div>
    }
    
    <div class="content-main">
      <ng-content select="[content-main]" />
      <ng-content />
    </div>
    
    @if (hasTrailingContent()) {
      <div class="content-trailing">
        <ng-content select="[content-trailing]" />
      </div>
    }
  `
})
export class DsMobileInteractiveListItemComponent {
  /**
   * CSS size value for the leading content area (e.g., '32px', '40px', '48px')
   * Defaults to '32px' for standard list item avatars
   */
  leadingSize = input<string>('32px');
  
  /**
   * Display variant
   * - 'feed' - Standard feed display (default)
   * - 'detail' - Full detail view
   * - 'compact' - Compact display for nested/related items
   */
  variant = input<'feed' | 'detail' | 'compact'>('feed');
  
  /**
   * Whether the list item is clickable
   */
  clickable = input<boolean>(false);
  
  /**
   * Emits when the list item is clicked (if clickable)
   */
  itemClick = output<void>();
  
  /**
   * Emits when the list item is long-pressed
   */
  longPress = output<void>();
  
  /**
   * Long press tracking
   */
  private longPressTimer: any = null;
  private longPressTriggered = false;
  private touchStartX = 0;
  private touchStartY = 0;
  private readonly LONG_PRESS_DURATION = 500; // ms
  private readonly MOVE_THRESHOLD = 10; // px
  
  /**
   * Check if leading content slot has content
   */
  hasLeadingContent = computed(() => true); // Always render slot container for consistency
  
  /**
   * Check if trailing content slot has content
   */
  hasTrailingContent = computed(() => true); // Always render slot container for consistency
  
  handleItemClick(event: Event): void {
    if (this.clickable() && !this.longPressTriggered) {
      this.itemClick.emit();
    }
  }
  
  /**
   * Handle touch start for long press detection
   */
  handleTouchStart(event: TouchEvent): void {
    // Don't start long press if touching interactive elements
    const target = event.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea, [role="button"]')) {
      return;
    }
    
    this.longPressTriggered = false;
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    
    // Start long press timer
    this.longPressTimer = setTimeout(async () => {
      this.longPressTriggered = true;
      this.longPress.emit();
      
      // Haptic feedback for long press
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch {
        // Fallback to Web Vibration API if Capacitor Haptics is not available
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }
    }, this.LONG_PRESS_DURATION);
  }
  
  /**
   * Handle touch end to clear long press timer
   */
  handleTouchEnd(event: TouchEvent): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
    
    // Prevent normal click if long press was triggered
    if (this.longPressTriggered) {
      event.preventDefault();
      event.stopPropagation();
      this.longPressTriggered = false;
    }
  }
  
  /**
   * Handle touch move to cancel long press if moved too much
   */
  handleTouchMove(event: TouchEvent): void {
    if (!this.longPressTimer) return;
    
    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - this.touchStartX);
    const deltaY = Math.abs(touch.clientY - this.touchStartY);
    
    // Cancel long press if moved too far
    if (deltaX > this.MOVE_THRESHOLD || deltaY > this.MOVE_THRESHOLD) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
      this.longPressTriggered = false;
    }
  }
  
  /**
   * Handle context menu (right-click on desktop) to trigger long press action
   */
  handleContextMenu(event: Event): void {
    event.preventDefault();
    this.longPress.emit();
  }
}

