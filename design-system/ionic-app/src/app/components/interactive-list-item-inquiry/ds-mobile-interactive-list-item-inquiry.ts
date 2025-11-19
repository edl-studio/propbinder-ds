import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { DsShapeIndicatorComponent } from '@propbinder/design-system';
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
  imports: [CommonModule, DsIconComponent, DsShapeIndicatorComponent, DsMobileInteractiveListItemComponent],
  styleUrls: ['./ds-mobile-interactive-list-item-inquiry.css'],
  styles: [`
    :host {
      display: block;
    }
    
    .inquiry-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
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
      font-size: var(--font-size-sm);
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.3px;
      color: var(--text-color-default-primary, #202227);
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
      color: var(--text-color-default-secondary, #545B66);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .inquiry-meta {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: -0.26px;
      color: var(--text-color-default-secondary, #545B66);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
    }
    
    .inquiry-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 500;
      line-height: 1.2;
      letter-spacing: -0.26px;
      color: var(--text-color-default-secondary, #545B66);
    }
    
    .inquiry-status.open {
      color: var(--color-brand-primary, #5d5fef);
    }
    
    .inquiry-status.closed {
      color: var(--text-color-default-tertiary, #737373);
    }
    
    .inquiry-timestamp {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: -0.26px;
      color: var(--text-color-default-secondary, #545B66);
    }
    
    .inquiry-trailing {
      display: flex;
      align-items: center;
      color: var(--color-text-tertiary, #a3a3a3);
    }
  `],
  template: `
    <ds-mobile-interactive-list-item
      [leadingSize]="'32px'"
      [variant]="variant()"
      [clickable]="clickable()"
      (itemClick)="handleInquiryClick()"
      (longPress)="handleLongPress()">
      
      <div content-leading>
        <div class="inquiry-icon">
          <ds-icon 
            [name]="iconName()"
            size="20px"
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
              <ds-shape-indicator 
                shape="circle" 
                [variant]="status() === 'open' ? 'brand' : 'grey'">
              </ds-shape-indicator>
              <span>{{ computedStatusLabel() }}</span>
            </div>
            
            <div class="inquiry-timestamp">
              <ds-icon name="remixTimeLine" size="14px" color="--color-text-secondary" />
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
  iconName = input<string>('remixTodoLine');
  
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

