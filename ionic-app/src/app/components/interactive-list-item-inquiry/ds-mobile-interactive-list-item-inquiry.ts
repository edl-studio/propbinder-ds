import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { DsMobileInteractiveListItemComponent } from '../interactive-list-item';

/**
 * DsMobileInteractiveListItemInquiryComponent
 * 
 * Specialized interactive list item for displaying inquiries/tickets.
 * Built on top of ds-mobile-interactive-list-item base component.
 * Displays inquiry title, description, status, and timestamp.
 * 
 * @example
 * ```html
 * <ds-mobile-interactive-list-item-inquiry
 *   [title]="'Tumble dryer is not working'"
 *   [description]="'For the past three days, I have been experiencing...'"
 *   [status]="'open'"
 *   [timestamp]="'12 days ago'"
 *   [iconName]="'remixCalendarLine'"
 *   [clickable]="true"
 *   (inquiryClick)="openInquiry()">
 * </ds-mobile-interactive-list-item-inquiry>
 * ```
 */
@Component({
  selector: 'ds-mobile-interactive-list-item-inquiry',
  standalone: true,
  imports: [CommonModule, DsIconComponent, DsMobileInteractiveListItemComponent],
  styles: [`
    :host {
      display: block;
    }
    
    .inquiry-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--color-background-neutral-secondary, #f5f5f5);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .inquiry-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      min-width: 0;
    }
    
    .inquiry-title {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 600;
      line-height: 24px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .inquiry-description {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.3px;
      color: var(--color-text-secondary, #737373);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .inquiry-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }
    
    .inquiry-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.28px;
    }
    
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .status-dot.open {
      background: var(--color-brand-primary, #5d5fef);
    }
    
    .status-dot.closed {
      background: var(--color-text-tertiary, #a3a3a3);
    }
    
    .inquiry-status.open {
      color: var(--color-brand-primary, #5d5fef);
    }
    
    .inquiry-status.closed {
      color: var(--color-text-tertiary, #737373);
    }
    
    .inquiry-timestamp {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.28px;
      color: var(--color-text-tertiary, #a3a3a3);
    }
    
    .inquiry-trailing {
      display: flex;
      align-items: center;
      color: var(--color-text-tertiary, #a3a3a3);
    }
  `],
  template: `
    <ds-mobile-interactive-list-item
      [leadingSize]="'48px'"
      [variant]="variant()"
      [clickable]="clickable()"
      (itemClick)="handleInquiryClick()"
      (longPress)="handleLongPress()">
      
      <div content-leading>
        <div class="inquiry-icon">
          <ds-icon 
            [name]="iconName()"
            size="24px"
            [color]="iconColor()" />
        </div>
      </div>
      
      <div content-main>
        <div class="inquiry-content">
          <h3 class="inquiry-title">{{ title() }}</h3>
          
          @if (description()) {
            <p class="inquiry-description">{{ description() }}</p>
          }
          
          <div class="inquiry-meta">
            <div class="inquiry-status" [class.open]="status() === 'open'" [class.closed]="status() === 'closed'">
              <span class="status-dot" [class.open]="status() === 'open'" [class.closed]="status() === 'closed'"></span>
              <span>{{ statusLabel() }}</span>
            </div>
            
            <div class="inquiry-timestamp">
              <ds-icon name="remixTimeLine" size="16px" />
              <span>{{ timestamp() }}</span>
            </div>
          </div>
        </div>
      </div>
      
      @if (showChevron()) {
        <div content-trailing>
          <div class="inquiry-trailing">
            <ds-icon name="remixArrowRightSLine" size="20px" />
          </div>
        </div>
      }
    </ds-mobile-interactive-list-item>
  `
})
export class DsMobileInteractiveListItemInquiryComponent {
  /**
   * Inquiry title
   */
  title = input.required<string>();
  
  /**
   * Inquiry description/preview text
   */
  description = input<string>('');
  
  /**
   * Inquiry status
   */
  status = input<'open' | 'closed'>('open');
  
  /**
   * Status label (defaults to capitalized status)
   */
  statusLabel = input<string>('');
  
  /**
   * Timestamp text (e.g., "12 days ago", "2 months ago")
   */
  timestamp = input.required<string>();
  
  /**
   * Icon name for the leading icon
   */
  iconName = input<string>('remixCalendarLine');
  
  /**
   * Icon color
   */
  iconColor = input<string>('secondary');
  
  /**
   * Display variant
   * - 'feed' - Standard feed display (default)
   * - 'detail' - Full detail view
   * - 'compact' - Compact display
   */
  variant = input<'feed' | 'detail' | 'compact'>('feed');
  
  /**
   * Whether the inquiry item is clickable
   */
  clickable = input<boolean>(true);
  
  /**
   * Whether to show chevron icon
   */
  showChevron = input<boolean>(true);
  
  /**
   * Emits when the inquiry item is clicked (if clickable)
   */
  inquiryClick = output<void>();
  
  /**
   * Emits when the inquiry item is long-pressed
   */
  longPress = output<void>();
  
  /**
   * Get computed status label
   */
  computedStatusLabel(): string {
    if (this.statusLabel()) {
      return this.statusLabel();
    }
    return this.status() === 'open' ? 'Open' : 'Closed';
  }
  
  handleInquiryClick(): void {
    this.inquiryClick.emit();
  }
  
  handleLongPress(): void {
    this.longPress.emit();
  }
}

