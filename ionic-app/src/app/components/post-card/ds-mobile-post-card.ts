import { Component, input, output, signal, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * DsMobilePostCardComponent
 * 
 * Individual post card for community feed and post details.
 * Displays user posts with avatar, content, media, and action buttons.
 * Follows Threads-inspired design with clean layout and interactions.
 * 
 * @example
 * ```html
 * <ds-mobile-post-card
 *   [authorName]="'John Doe'"
 *   [authorRole]="'Tenant'"
 *   [timestamp]="'2h ago'"
 *   [avatarInitials]="'JD'"
 *   [clickable]="true"
 *   (postClick)="openPost()">
 *   
 *   <post-content>
 *     <post-text>This is a sample post...</post-text>
 *   </post-content>
 *   
 *   <post-actions>
 *     <action-like [active]="true" count="42" />
 *     <action-comment count="12" />
 *     <action-share />
 *   </post-actions>
 * </ds-mobile-post-card>
 * ```
 */
@Component({
  selector: 'ds-mobile-post-card',
  standalone: true,
  imports: [CommonModule, DsAvatarComponent],
  host: {
    '[class.clickable]': 'clickable()',
    '[class.variant-feed]': 'variant() === "feed"',
    '[class.variant-detail]': 'variant() === "detail"',
    '[class.variant-compact]': 'variant() === "compact"',
    '(click)': 'handlePostClick($event)',
    '(touchstart)': 'handleTouchStart($event)',
    '(touchend)': 'handleTouchEnd($event)',
    '(touchmove)': 'handleTouchMove($event)',
    '(contextmenu)': 'handleContextMenu($event)'
  },
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      background: var(--color-background-primary, #ffffff);
      padding: 8px;
      gap: 8px;
      transition: all 0.2s ease;
      position: relative;
      border-radius: 16px;
      margin-bottom: 8px;
      margin-left: -8px;
      margin-right: -8px;
    }
    
    :host::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 52px;
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
    
    .post-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    /* Author styles imported from mobile-common.css */
    
    .menu-slot {
      margin-left: auto;
    }
    
    .avatar-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .avatar-badge {
      position: absolute;
      bottom: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--color-brand-secondary, #5d5fef);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--color-background-primary, #ffffff);
    }
    
    .avatar-badge svg {
      width: 8px;
      fill: white;
    }
  `],
  template: `
    <div class="post-header">
      <div class="avatar-wrapper">
        <ds-avatar 
          [initials]="avatarInitials()"
          [type]="avatarType()"
          [src]="avatarSrc()"
          [iconName]="avatarIconName()"
          size="md" />
        
        @if (showBadge()) {
          <div class="avatar-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 32" fill="none">
              <path d="M33.9862 5.51709H23.1724V8.82743H26.0413C26.2841 8.82743 26.4827 9.02606 26.4827 9.26881V12.7998C26.4827 13.0426 26.2841 13.2412 26.0413 13.2412H23.1724V14.3447H26.0413C26.2841 14.3447 26.4827 14.5433 26.4827 14.7861V18.3171C26.4827 18.5598 26.2841 18.7585 26.0413 18.7585H23.1724V19.8619H26.0413C26.2841 19.8619 26.4827 20.0605 26.4827 20.3033V23.8343C26.4827 24.0771 26.2841 24.2757 26.0413 24.2757H23.1724V26.2619C23.1724 26.7496 23.0267 27.2043 22.7773 27.5861H27.5862L32 31.9999V27.5861H33.9862C34.7167 27.5861 35.3103 26.9924 35.3103 26.2619V6.84123C35.3103 6.11075 34.7167 5.51709 33.9862 5.51709ZM32 23.8343C32 24.0771 31.8013 24.2757 31.5586 24.2757H28.0276C27.7848 24.2757 27.5862 24.0771 27.5862 23.8343V20.3033C27.5862 20.0605 27.7848 19.8619 28.0276 19.8619H31.5586C31.8013 19.8619 32 20.0605 32 20.3033V23.8343ZM32 18.3171C32 18.5598 31.8013 18.7585 31.5586 18.7585H28.0276C27.7848 18.7585 27.5862 18.5598 27.5862 18.3171V14.7861C27.5862 14.5433 27.7848 14.3447 28.0276 14.3447H31.5586C31.8013 14.3447 32 14.5433 32 14.7861V18.3171ZM32 12.7998C32 13.0426 31.8013 13.2412 31.5586 13.2412H28.0276C27.7848 13.2412 27.5862 13.0426 27.5862 12.7998V9.26881C27.5862 9.02606 27.7848 8.82743 28.0276 8.82743H31.5586C31.8013 8.82743 32 9.02606 32 9.26881V12.7998Z" fill="white"/>
              <path d="M20.7448 0H1.32414C0.593655 0 0 0.593655 0 1.32414V26.2621C0 26.9926 0.593655 27.5862 1.32414 27.5862H3.31034V32L7.72414 27.5862H20.7448C21.4753 27.5862 22.069 26.9926 22.069 26.2621V1.32414C22.069 0.593655 21.4753 0 20.7448 0ZM7.72414 23.8345C7.72414 24.0772 7.52552 24.2759 7.28276 24.2759H3.75172C3.50897 24.2759 3.31034 24.0772 3.31034 23.8345V20.3034C3.31034 20.0607 3.50897 19.8621 3.75172 19.8621H7.28276C7.52552 19.8621 7.72414 20.0607 7.72414 20.3034V23.8345ZM7.72414 18.3172C7.72414 18.56 7.52552 18.7586 7.28276 18.7586H3.75172C3.50897 18.7586 3.31034 18.56 3.31034 18.3172V14.7862C3.31034 14.5434 3.50897 14.3448 3.75172 14.3448H7.28276C7.52552 14.3448 7.72414 14.5434 7.72414 14.7862V18.3172ZM7.72414 12.8C7.72414 13.0428 7.52552 13.2414 7.28276 13.2414H3.75172C3.50897 13.2414 3.31034 13.0428 3.31034 12.8V9.26897C3.31034 9.02621 3.50897 8.82759 3.75172 8.82759H7.28276C7.52552 8.82759 7.72414 9.02621 7.72414 9.26897V12.8ZM7.72414 7.28276C7.72414 7.52552 7.52552 7.72414 7.28276 7.72414H3.75172C3.50897 7.72414 3.31034 7.52552 3.31034 7.28276V3.75172C3.31034 3.50897 3.50897 3.31034 3.75172 3.31034H7.28276C7.52552 3.31034 7.72414 3.50897 7.72414 3.75172V7.28276ZM13.2414 23.8345C13.2414 24.0772 13.0428 24.2759 12.8 24.2759H9.26897C9.02621 24.2759 8.82759 24.0772 8.82759 23.8345V20.3034C8.82759 20.0607 9.02621 19.8621 9.26897 19.8621H12.8C13.0428 19.8621 13.2414 20.0607 13.2414 20.3034V23.8345ZM13.2414 18.3172C13.2414 18.56 13.0428 18.7586 12.8 18.7586H9.26897C9.02621 18.7586 8.82759 18.56 8.82759 18.3172V14.7862C8.82759 14.5434 9.02621 14.3448 9.26897 14.3448H12.8C13.0428 14.3448 13.2414 14.5434 13.2414 14.7862V18.3172ZM13.2414 12.8C13.2414 13.0428 13.0428 13.2414 12.8 13.2414H9.26897C9.02621 13.2414 8.82759 13.0428 8.82759 12.8V9.26897C8.82759 9.02621 9.02621 8.82759 9.26897 8.82759H12.8C13.0428 8.82759 13.2414 9.02621 13.2414 9.26897V12.8ZM13.2414 6.84138V7.28276C13.2414 7.52552 13.0428 7.72414 12.8 7.72414H9.26897C9.02621 7.72414 8.82759 7.52552 8.82759 7.28276V3.75172C8.82759 3.50897 9.02621 3.31034 9.26897 3.31034H12.8C13.0428 3.31034 13.2414 3.50897 13.2414 3.75172V6.84138ZM18.7586 23.8345C18.7586 24.0772 18.56 24.2759 18.3172 24.2759H14.7862C14.5434 24.2759 14.3448 24.0772 14.3448 23.8345V20.3034C14.3448 20.0607 14.5434 19.8621 14.7862 19.8621H18.3172C18.56 19.8621 18.7586 20.0607 18.7586 20.3034V23.8345ZM18.7586 18.3172C18.7586 18.56 18.56 18.7586 18.3172 18.7586H14.7862C14.5434 18.7586 14.3448 18.56 14.3448 18.3172V14.7862C14.3448 14.5434 14.5434 14.3448 14.7862 14.3448H18.3172C18.56 14.3448 18.7586 14.5434 18.7586 14.7862V18.3172ZM18.7586 12.8C18.7586 13.0428 18.56 13.2414 18.3172 13.2414H14.7862C14.5434 13.2414 14.3448 13.0428 14.3448 12.8V9.26897C14.3448 9.02621 14.5434 8.82759 14.7862 8.82759H18.3172C18.56 8.82759 18.7586 9.02621 18.7586 9.26897V12.8ZM18.7586 5.51724V7.28276C18.7586 7.52552 18.56 7.72414 18.3172 7.72414H14.7862C14.5434 7.72414 14.3448 7.52552 14.3448 7.28276V3.75172C14.3448 3.50897 14.5434 3.31034 14.7862 3.31034H18.3172C18.56 3.31034 18.7586 3.50897 18.7586 3.75172V5.51724Z" fill="white"/>
            </svg>
          </div>
        }
      </div>
      
      <div class="author-details">
        <div class="author-name">{{ authorName() }}</div>
        <div class="author-meta">{{ authorRole() }} · {{ timestamp() }}</div>
      </div>
      
      <div class="menu-slot">
        <ng-content select="post-menu" />
      </div>
    </div>
    
    <ng-content select="post-content" />
    <ng-content select="post-actions" />
  `
})
export class DsMobilePostCardComponent {
  /**
   * Author's display name
   */
  authorName = input.required<string>();
  
  /**
   * Author's role (e.g., "Tenant", "Property Manager")
   */
  authorRole = input.required<string>();
  
  /**
   * Timestamp text (e.g., "2h ago", "1d ago")
   */
  timestamp = input.required<string>();
  
  /**
   * Avatar initials (for initials type)
   */
  avatarInitials = input<string>('');
  
  /**
   * Avatar type
   */
  avatarType = input<'initials' | 'photo' | 'icon'>('initials');
  
  /**
   * Avatar photo source (for photo type)
   */
  avatarSrc = input<string>('');
  
  /**
   * Icon name (for icon type avatars)
   */
  avatarIconName = input<string>('remixUser3Fill');
  
  /**
   * Show badge on avatar (e.g., for property managers)
   */
  showBadge = input<boolean>(false);
  
  /**
   * Display variant
   * - 'feed' - Standard feed display (default)
   * - 'detail' - Full detail view
   * - 'compact' - Compact display for nested/related posts
   */
  variant = input<'feed' | 'detail' | 'compact'>('feed');
  
  /**
   * Whether the post card is clickable
   */
  clickable = input<boolean>(false);
  
  /**
   * Emits when the post card is clicked (if clickable)
   */
  postClick = output<void>();
  
  /**
   * Emits when the comment button is clicked
   */
  commentClick = output<void>();
  
  /**
   * Emits when the post card is long-pressed
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
  
  handlePostClick(event: Event): void {
    if (this.clickable()) {
      this.postClick.emit();
    }
  }
  
  handleCommentClick(): void {
    this.commentClick.emit();
  }
  
  /**
   * Handle touch start for long press detection
   */
  handleTouchStart(event: TouchEvent): void {
    // Don't start long press if touching action buttons or interactive elements
    const target = event.target as HTMLElement;
    if (target.closest('post-actions, action-like, action-comment, action-share, button, a, img')) {
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

/**
 * PostContentComponent
 * 
 * Main content section of the post.
 * 
 * Contains:
 * - `<post-text>` - Text content
 * - `<post-media>` - Optional images/videos
 * - `<post-attachments>` - Optional file attachments
 */
@Component({
  selector: 'post-content',
  standalone: true,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    :host:not(.no-indent) {
      padding-left: 44px;
    }
  `],
  template: `
    <ng-content select="post-text" />
    <ng-content select="post-media" />
    <ng-content select="post-attachments" />
  `
})
export class PostContentComponent {}

/**
 * PostTextComponent
 * 
 * Text content of the post.
 */
@Component({
  selector: 'post-text',
  standalone: true,
  styles: [`
    :host {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `],
  template: `<ng-content />`
})
export class PostTextComponent {}

/**
 * PostMediaComponent
 * 
 * Media container for images/videos.
 */
@Component({
  selector: 'post-media',
  standalone: true,
  styles: [`
    :host {
      display: block;
      border-radius: 8px;
      overflow: hidden;
    }
    
    ::ng-deep img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    ::ng-deep video {
      width: 100%;
      height: auto;
      display: block;
    }
  `],
  template: `<ng-content />`
})
export class PostMediaComponent {}

/**
 * PostAttachmentsComponent
 * 
 * Container for file attachments, links, etc.
 */
@Component({
  selector: 'post-attachments',
  standalone: true,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `],
  template: `<ng-content />`
})
export class PostAttachmentsComponent {}

/**
 * PostActionsComponent
 * 
 * Action buttons container (like, comment, share).
 * 
 * Contains:
 * - `<action-like>` - Like button with count
 * - `<action-comment>` - Comment button with count
 * - `<action-share>` - Share button
 */
@Component({
  selector: 'post-actions',
  standalone: true,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: 16px;
      padding-top: 4px;
    }
    
    :host:not(.no-indent) {
      padding-left: 44px;
    }
  `],
  template: `<ng-content />`
})
export class PostActionsComponent {}

/**
 * ActionLikeComponent
 * 
 * Like action button with count display and animated heart icon.
 */
@Component({
  selector: 'action-like',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  host: {
    '[class.active]': 'active()',
    '(click)': 'handleClick($event)'
  },
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: 2px;
      color: var(--color-text-secondary, #737373);
      cursor: pointer;
      transition: color 0.2s ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    :host.active {
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
    
    .count {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.28px;
    }
  `],
  template: `
    <div class="icon-wrapper">
      <ds-icon 
        #pulseIcon
        class="icon-pulse"
        [class.animating]="isPulsing()"
        [name]="active() ? 'remixHeart3Fill' : 'remixHeart3Line'" 
        size="20px" />
      <ds-icon 
        [name]="active() ? 'remixHeart3Fill' : 'remixHeart3Line'" 
        size="20px" />
    </div>
    @if (count() > 0) {
      <span class="count">{{ count() }}</span>
    }
  `
})
export class ActionLikeComponent {
  /**
   * Whether the like is active (user has liked)
   * Using model() for two-way binding
   */
  active = model<boolean>(false);
  
  /**
   * Number of likes
   * Using model() for two-way binding
   */
  count = model<number>(0);
  
  /**
   * Emits when the like button is clicked
   */
  likeClick = output<{ active: boolean; count: number }>();
  
  /**
   * Signal to control pulse animation
   */
  isPulsing = signal(false);
  
  async handleClick(event: Event): Promise<void> {
    event.stopPropagation();
    
    // Toggle active state
    const newActive = !this.active();
    this.active.set(newActive);
    
    // Update count
    const newCount = newActive ? this.count() + 1 : this.count() - 1;
    this.count.set(Math.max(0, newCount));
    
    // Trigger pulse animation only when liking
    if (newActive) {
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
    
    // Emit the event with the new state
    this.likeClick.emit({ active: newActive, count: newCount });
  }
}

/**
 * ActionCommentComponent
 * 
 * Comment action button with count display.
 */
@Component({
  selector: 'action-comment',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  host: {
    '(click)': 'handleClick($event)'
  },
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: 2px;
      color: var(--color-text-secondary, #737373);
      cursor: pointer;
      transition: color 0.2s ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    :host:active {
      transform: scale(0.95);
    }
    
    :host:hover {
      color: var(--color-text-primary, #1a1a1a);
    }
    
    .count {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.28px;
    }
  `],
  template: `
    <ds-icon name="remixChat3Line" size="20px" />
    @if (count() > 0) {
      <span class="count">{{ count() }}</span>
    }
  `
})
export class ActionCommentComponent {
  /**
   * Number of comments
   */
  count = input<number>(0);
  
  /**
   * Emits when the comment button is clicked
   */
  commentClick = output<void>();
  
  handleClick(event: Event): void {
    event.stopPropagation();
    this.commentClick.emit();
  }
}
