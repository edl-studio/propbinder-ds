import { Component, input, output, model, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * DsMobileCommentComponent
 * 
 * Individual comment component for post discussions.
 * Displays user comments with avatar, content, and like action.
 * 
 * @example
 * ```html
 * <ds-mobile-comment
 *   [authorName]="'John Doe'"
 *   [authorRole]="'Tenant'"
 *   [timestamp]="'1h ago'"
 *   [avatarInitials]="'JD'"
 *   [content]="'Great post!'">
 * </ds-mobile-comment>
 * ```
 */
@Component({
  selector: 'ds-mobile-comment',
  standalone: true,
  imports: [CommonModule, DsAvatarComponent, DsIconComponent],
  host: {
    '[class.clickable]': 'clickable()',
    '(click)': 'handleCommentClick($event)',
    '(touchstart)': 'handleTouchStart($event)',
    '(touchend)': 'handleTouchEnd($event)',
    '(touchmove)': 'handleTouchMove($event)',
    '(contextmenu)': 'handleContextMenu($event)'
  },
  styles: [`
    :host {
      display: flex;
      gap: 12px;
      padding: 8px;
      position: relative;
      border-radius: 16px;
      transition: all 0.2s ease;
      background: var(--color-background-primary, #ffffff);
      margin-bottom: 8px;
      margin-left: -8px;
      margin-right: -8px;
    }
    
    :host:last-child {
      margin-bottom: 0;
    }
    
    :host::after {
      content: '';
      position: absolute;
      bottom: -4px;
      /* Align with comment content: padding (8px) + avatar (32px) + gap (12px) */
      left: 44px;
      /* Align with comment content right edge: padding (8px) from right */
      right: 8px;
      height: 1px;
      background: var(--border-color-default);
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
    
    .avatar-wrapper {
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .comment-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .comment-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex-wrap: wrap;
    }
    
    /* Author styles imported from mobile-common.css */
    
    .action-like {
      display: flex;
      align-items: center;
      gap: 2px;
      color: var(--color-text-secondary, #737373);
      cursor: pointer;
      transition: color 0.2s ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 500;
      line-height: 18px;
      margin-left: auto;
    }
    
    .like-count {
      opacity: 1;
    }
    
    .like-count.hidden {
      opacity: 0;
    }
    
    .action-like.active {
      color: #f91880;
    }
    
    .icon-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-pulse {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      pointer-events: none;
    }
    
    .icon-pulse.animating {
      animation: pulse 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes pulse {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.8;
      }
      100% {
        transform: translate(-50%, -50%) scale(2.5);
        opacity: 0;
      }
    }
    
    .comment-text {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .comment-text ::ng-deep .mention {
      color: var(--color-brand-base, #6B5FF5) !important;
      font-weight: 600;
    }
    
    .comment-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 4px;
    }
    
    .action-reply {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 500;
      line-height: 18px;
      color: var(--color-text-secondary, #737373);
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition: color 0.2s ease;
    }
    
    .action-reply:hover {
      color: var(--color-text-primary, #1a1a1a);
    }
    
    .action-edit {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 500;
      line-height: 18px;
      color: var(--color-text-secondary, #737373);
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition: color 0.2s ease;
    }
    
    .action-edit:hover {
      color: var(--color-text-primary, #1a1a1a);
    }
  `],
  template: `
    <div class="avatar-wrapper">
      <ds-avatar 
        [initials]="avatarInitials()"
        [type]="avatarType()"
        size="sm" />
    </div>
    
    <div class="comment-content">
      <div class="comment-header">
        <span class="author-name">{{ authorName() }}</span>
        <span class="author-meta">{{ authorRole() }} · {{ timestamp() }}</span>
        
        <div 
          class="action-like"
          [class.active]="isLiked()"
          (click)="toggleLike()">
          <span class="like-count" [class.hidden]="likeCount() === 0">{{ likeCount() }}</span>
          <div class="icon-wrapper">
            <ds-icon 
              class="icon-pulse"
              [class.animating]="isPulsing()"
              [name]="isLiked() ? 'remixHeart3Fill' : 'remixHeart3Line'" 
              size="16px" />
            <ds-icon 
              [name]="isLiked() ? 'remixHeart3Fill' : 'remixHeart3Line'" 
              size="16px" />
          </div>
        </div>
      </div>
      
      <div class="comment-text" [innerHTML]="formattedContent()"></div>
      
      <div class="comment-actions">
        <div class="action-reply" (click)="handleReply()">
          Reply
        </div>
        @if (isOwnComment()) {
          <div class="action-edit" (click)="handleEdit()">
            Edit
          </div>
        }
      </div>
    </div>
  `
})
export class DsMobileCommentComponent {
  /**
   * Author's display name
   */
  authorName = input.required<string>();
  
  /**
   * Author's role (e.g., "Tenant", "Property Manager")
   */
  authorRole = input.required<string>();
  
  /**
   * Timestamp text (e.g., "1h ago", "2d ago")
   */
  timestamp = input.required<string>();
  
  /**
   * Comment content text
   */
  content = input.required<string>();
  
  /**
   * Avatar initials
   */
  avatarInitials = input<string>('');
  
  /**
   * Avatar type
   */
  avatarType = input<'initials' | 'photo' | 'icon'>('initials');
  
  /**
   * Whether the comment is clickable
   */
  clickable = input<boolean>(false);
  
  /**
   * Whether this comment belongs to the current user
   */
  isOwnComment = input<boolean>(false);
  
  /**
   * Whether the comment is liked by current user
   */
  isLiked = model<boolean>(false);
  
  /**
   * Number of likes
   */
  likeCount = model<number>(0);
  
  /**
   * Signal to control pulse animation
   */
  isPulsing = signal(false);
  
  /**
   * Computed property to format content with @mentions
   */
  formattedContent = computed(() => {
    const text = this.content();
    // Replace @mentions with styled spans
    // Matches @FirstName or @FirstName LastName (max 2 words)
    return text.replace(/@([A-Za-z]+(?:\s+[A-Za-z]+)?)\b/g, '<span class="mention">@$1</span>');
  });
  
  /**
   * Emits when the comment card is clicked (if clickable)
   */
  commentClick = output<void>();
  
  /**
   * Emits when reply is clicked
   */
  replyClick = output<void>();
  
  /**
   * Emits when edit is clicked
   */
  editClick = output<void>();
  
  /**
   * Emits when the comment is long-pressed
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
  
  handleCommentClick(event: Event): void {
    // Only emit if clickable and not clicking on action buttons
    if (this.clickable() && !(event.target as HTMLElement).closest('.comment-actions')) {
      this.commentClick.emit();
    }
  }
  
  async toggleLike(): Promise<void> {
    const newLiked = !this.isLiked();
    this.isLiked.set(newLiked);
    
    const newCount = newLiked ? this.likeCount() + 1 : this.likeCount() - 1;
    this.likeCount.set(Math.max(0, newCount));
    
    // Trigger pulse animation only when liking
    if (newLiked) {
      this.isPulsing.set(true);
      setTimeout(() => this.isPulsing.set(false), 400);
    }
    
    // Haptic feedback for like/unlike
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      // Fallback to Web Vibration API if Capacitor Haptics is not available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  }
  
  handleReply(): void {
    this.replyClick.emit();
  }
  
  handleEdit(): void {
    this.editClick.emit();
  }
  
  /**
   * Handle touch start for long press detection
   */
  handleTouchStart(event: TouchEvent): void {
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

