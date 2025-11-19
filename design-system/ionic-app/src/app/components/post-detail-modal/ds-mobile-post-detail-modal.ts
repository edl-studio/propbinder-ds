import {
  Component,
  signal,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  ModalController
} from '@ionic/angular/standalone';
import { Keyboard } from '@capacitor/keyboard';
import { DsIconButtonComponent } from '@propbinder/design-system/button/ds-icon-button';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import {
  DsMobilePostCardComponent,
  PostContentComponent,
  PostTextComponent,
  PostMediaComponent,
  PostActionsComponent,
  ActionLikeComponent,
  ActionCommentComponent
} from '../post-card/ds-mobile-post-card';
import { DsMobileCommentComponent } from '../comment/ds-mobile-comment';
import { DsMobileLightboxService, LightboxAuthor } from '../lightbox';
import { 
  DsMobileBottomSheetService, 
  DsMobileCommentActionsBottomSheetComponent,
  CommentActionResult 
} from '../bottom-sheet';

/**
 * Post data interface for the modal
 */
export interface PostDetailData {
  postId: string;
  authorName: string;
  authorRole: string;
  timestamp: string;
  avatarInitials?: string;
  avatarType?: 'photo' | 'initials';
  avatarSrc?: string;
  content: string;
  imageSrc?: string;
  imageAlt?: string;
  isLiked?: boolean;
  likeCount?: number;
  commentCount?: number;
  comments?: CommentData[];
  focusComment?: boolean; // Auto-focus comment input when modal opens
}

export interface CommentData {
  authorName: string;
  authorRole: string;
  timestamp: string;
  avatarInitials: string;
  content: string;
  isLiked?: boolean;
  likeCount?: number;
  isOwnComment?: boolean;
}

/**
 * DsMobilePostDetailModalComponent
 * 
 * Modal wrapper for displaying post details with comments.
 * Follows the same pattern as the lightbox modal for consistent behavior.
 * 
 * Features:
 * - Full post content display
 * - Comments section
 * - Image lightbox integration
 * - Native modal controls (close, swipe down)
 * - Safe area support
 * 
 * This component is typically not used directly - use DsMobilePostDetailModalService instead.
 * 
 * @example
 * ```typescript
 * // Don't instantiate directly - use the service:
 * constructor(private postModal: DsMobilePostDetailModalService) {}
 * 
 * openPost() {
 *   this.postModal.open({
 *     postId: '123',
 *     authorName: 'John Doe',
 *     content: 'Post content...'
 *   });
 * }
 * ```
 */
@Component({
  selector: 'ds-mobile-post-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    DsIconButtonComponent,
    DsIconComponent,
    DsAvatarComponent,
    PostTextComponent,
    PostMediaComponent,
    ActionLikeComponent,
    ActionCommentComponent,
    DsMobileCommentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ion-content [fullscreen]="true" [scrollY]="true" class="post-modal-content">
      <div class="post-modal-wrapper">
        <!-- Header with post author info -->
        <div class="post-modal-header">
          <div class="header-content">
            <!-- Post author info -->
            <div class="post-author-info">
              <ds-avatar
                [initials]="post().avatarInitials || ''"
                [type]="post().avatarType || 'initials'"
                [src]="post().avatarSrc || ''"
                size="md"
              />
              <div class="author-details">
                <div class="author-name">{{ post().authorName }}</div>
                <div class="author-meta">
                  <span>{{ post().authorRole }}</span>
                  <span class="separator">·</span>
                  <span>{{ post().timestamp }}</span>
                </div>
              </div>
            </div>
            
            <!-- Close button -->
            <ds-icon-button
              icon="remixCloseLine"
              variant="secondary"
              size="lg"
              (click)="close()"
              class="close-button"
              aria-label="Close post">
            </ds-icon-button>
          </div>
        </div>

        <!-- Post content -->
        <div class="post-detail-container">
          <!-- Post Section -->
          <div class="post-section">
            <div class="post-content-only">
              <post-text>{{ post().content }}</post-text>
              @if (post().imageSrc) {
                <post-media>
                  <img 
                    [src]="post().imageSrc"
                    [alt]="post().imageAlt || 'Post image'"
                    class="clickable-image"
                    (click)="openImageLightbox()"
                  />
                </post-media>
              }
            </div>
            
            <!-- Post actions -->
            <div class="post-actions">
              <action-like 
                [active]="post().isLiked || false" 
                [count]="post().likeCount || 0" />
              <action-comment 
                [count]="post().commentCount || 0"
                (commentClick)="focusCommentInput()" />
            </div>
          </div>
        
        <!-- Comments Section -->
        <div class="comments-section">
          @if (post().comments && post().comments!.length > 0) {
            <h2 class="comments-header">{{ post().comments!.length }} {{ post().comments!.length === 1 ? 'reply' : 'replies' }}</h2>
            
            <div class="comments-list">
              @for (comment of post().comments!; track comment.authorName + comment.timestamp) {
                <ds-mobile-comment
                  [authorName]="comment.authorName"
                  [authorRole]="comment.authorRole"
                  [timestamp]="comment.timestamp"
                  [avatarInitials]="comment.avatarInitials"
                  [content]="comment.content"
                  [isLiked]="comment.isLiked || false"
                  [likeCount]="comment.likeCount || 0"
                  [clickable]="true"
                  [isOwnComment]="comment.isOwnComment || false"
                  (replyClick)="handleReply(comment.authorName, comment.content)"
                  (editClick)="handleEditComment(comment.authorName, comment.content, comment.timestamp)"
                  (longPress)="handleCommentLongPress(comment.authorName, comment.content, comment.isOwnComment || false)" />
              }
            </div>
          } @else {
            <!-- Empty State -->
            <div class="comments-empty-state">
              <img 
                src="/Assets/Empty state-chat.png" 
                alt="No comments yet" 
                class="empty-state-image"
              />
              <h3 class="empty-state-title">No replies yet</h3>
              <p class="empty-state-description">Be the first to reply to this post</p>
            </div>
          }
          
          <!-- Bottom spacer for fixed composer -->
          <div class="composer-spacer"></div>
        </div>
        </div>
      </div>
    </ion-content>
    
    <!-- Fixed comment composer -->
    <div class="comment-composer-fixed">
      <div class="comment-composer">
        <!-- Edit indicator -->
        @if (editingComment()) {
          <div class="edit-indicator">
            <div class="edit-indicator-content">
              <ds-icon name="remixEditLine" size="16px" />
              <span class="edit-text">Editing comment</span>
            </div>
            <button class="cancel-edit" (click)="cancelEdit()">
              <ds-icon name="remixCloseLine" size="16px" />
            </button>
          </div>
        } @else if (replyingTo()) {
          <!-- Reply indicator -->
          <div class="reply-indicator">
            <div class="reply-indicator-content">
              <ds-icon name="remixReplyLine" size="16px" />
              <span class="reply-to-text">
                Replying to <span class="reply-author">{{ replyingTo()!.authorName }}</span>
              </span>
            </div>
            <button class="cancel-reply" (click)="cancelReply()">
              <ds-icon name="remixCloseLine" size="16px" />
            </button>
          </div>
        }
        
        <div class="composer-content">
          <ds-avatar
            [initials]="currentUserInitials()"
            [type]="'initials'"
            size="md"
          />
          <div class="composer-input-wrapper">
            <!-- Mention menu -->
            @if (showMentionMenu() && filteredUsers().length > 0 && !editingComment()) {
              <div class="mention-menu">
                @for (user of filteredUsers(); track user.name) {
                  <button 
                    class="mention-menu-item" 
                    (click)="selectMention(user.name)">
                    <ds-avatar 
                      [initials]="user.initials"
                      [type]="'initials'"
                      size="sm" />
                    <div class="mention-user-info">
                      <span class="mention-user-name">{{ user.name }}</span>
                      <span class="mention-user-role">{{ user.role }}</span>
                    </div>
                  </button>
                }
              </div>
            }
            
            <textarea
              #commentInput
              class="composer-input"
              [placeholder]="editingComment() ? 'Edit your comment...' : (replyingTo() ? 'Add a reply...' : 'Add a reply...')"
              [(ngModel)]="commentText"
              (input)="handleInput($event)"
              (focus)="showKeyboard()"
              (click)="showKeyboard()"
              rows="1"
            ></textarea>
          </div>
          @if (commentText().trim().length > 0) {
            <ds-icon-button
              icon="remixCheckLine"
              variant="primary"
              size="sm"
              (clicked)="submitComment()"
              aria-label="Send comment"
              class="send-button-fixed">
            </ds-icon-button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .post-modal-content {
      --background: var(--color-background-neutral-primary, #ffffff);
    }

    .post-modal-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      min-height: 100dvh; /* Use dynamic viewport height for proper iOS safe area handling */
      background: var(--color-background-neutral-primary, #ffffff);
    }

    .post-modal-header {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--color-background-neutral-primary, #ffffff);
      border-bottom: 1px solid var(--border-color-default);
      padding: 0 16px;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 72px;
      /* No padding needed - StatusBar.setOverlaysWebView(false) handles all spacing */
    }

    .post-author-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
    }

    .author-details {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }

    /* Author name and meta styles imported from mobile-common.css */

    .author-meta .separator {
      color: var(--color-text-tertiary, #a0a0a0);
    }

    .close-button {
      flex-shrink: 0;
      border-radius: 50%;
    }
    
    .close-button::ng-deep button {
      border-radius: 50% !important;
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      min-height: 44px !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .post-detail-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      max-width: 640px;
      margin: 0 auto;
      padding: 16px 0 20px 0;
      flex: 1;
    }
    
    .post-section {
      width: 100%;
      border-bottom: 1px solid var(--border-color-default);
      padding: 0 0 16px 0;
    }

    .post-content-only {
      font-size: var(--font-size-sm);
      line-height: 24px;
      color: var(--color-text-primary, #1a1a1a);
      margin-bottom: 16px;
      padding: 0 20px;
    }
    
    .post-content-only post-media {
      margin-top: 16px;
    }

    .post-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 20px;
    }
    
    .clickable-image {
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease;
      border-radius: 8px;
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
    }
    
    .clickable-image:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
    
    .comments-section {
      display: flex;
      flex-direction: column;
      margin-left: 0;
      margin-right: 0;
      padding: 0 20px;
      padding-bottom: 0;
    }
    
    .comments-header {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 600;
      line-height: 24px;
      color: var(--color-text-primary, #1a1a1a);
      margin: 0 0 16px 0;
      padding-left: 0;
      padding-right: 0;
    }
    
    .comments-list {
      display: flex;
      flex-direction: column;
    }
    
    /* Empty State */
    .comments-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
    }
    
    .empty-state-image {
      width: 96px;
      height: 96px;
      margin-bottom: 24px;
    }
    
    .empty-state-title {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 600;
      line-height: 1.3;
      color: var(--color-text-primary, #1a1a1a);
      margin: 0 0 8px 0;
    }
    
    .empty-state-description {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 400;
      line-height: 1.4;
      color: var(--color-text-secondary, #737373);
      margin: 0;
    }
    
    .composer-spacer {
      /* Match full composer height using safe area variable:
         - Border: 1px
         - Top padding: 12px
         - Input wrapper min-height: 44px
         - Input wrapper vertical padding: 8px * 2 = 16px
         - Avatar size: ~32px (with 12px gap)
         - Bottom padding: 12px
         - Safe area bottom: dynamic (34px on iPhone with notch)
         - Extra buffer: 50px to ensure full visibility */
      height: calc(135px + env(safe-area-inset-bottom, 34px));
    }
    
    .bottom-spacer {
      height: 0px;
    }

    /* Fixed Comment Composer Container */
    .comment-composer-fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      pointer-events: none;
      /* Slide up with keyboard, and lift it slightly higher in the viewport */
      transform: translateY(calc(-1 * var(--keyboard-height, 0px) - 10px));
      transition: transform 0.3s ease-out;
      /* Account for modal margin-top to ensure visibility */
      bottom: env(safe-area-inset-bottom, 0px);
    }

    /* Comment Composer */
    .comment-composer {
      pointer-events: auto;
      background: var(--color-background-neutral-primary, #ffffff);
      border-top: 1px solid var(--border-color-default);
      padding: 12px 16px;
      /* Use dynamic viewport height safe area - matches tabs fix */
      /* iPhone home indicator safe area is 34px total in simulator */
      padding-bottom: max(12px, env(safe-area-inset-bottom, 34px));
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      /* White box shadow to cover content gap between keyboard and composer */
      box-shadow: 100px 150px 0 150px var(--color-background-neutral-primary, #ffffff);
    }
    
    /* Edit indicator */
    .edit-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--color-background-brand-subtle, #f0edfe);
      border-radius: 8px;
      animation: slideDown 0.2s ease-out;
    }
    
    .edit-indicator-content {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--color-brand-base, #6B5FF5);
      flex: 1;
      min-width: 0;
    }
    
    .edit-text {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 500;
      line-height: 18px;
      color: var(--color-brand-base, #6B5FF5);
    }
    
    .cancel-edit {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-brand-base, #6B5FF5);
      border-radius: 4px;
      transition: background 0.2s ease;
      flex-shrink: 0;
    }
    
    .cancel-edit:active {
      background: var(--color-brand-subtle, #e0dbfe);
    }
    
    /* Reply indicator */
    .reply-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--color-background-neutral-secondary, #f5f5f5);
      border-radius: 8px;
      animation: slideDown 0.2s ease-out;
    }
    
    .reply-indicator-content {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--color-text-secondary, #737373);
      flex: 1;
      min-width: 0;
    }
    
    .reply-to-text {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      line-height: 18px;
      color: var(--color-text-secondary, #737373);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .reply-author {
      color: var(--color-brand-base, #6B5FF5);
      font-weight: 600;
    }
    
    .cancel-reply {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-secondary, #737373);
      border-radius: 4px;
      transition: background 0.2s ease;
      flex-shrink: 0;
    }
    
    .cancel-reply:active {
      background: var(--color-background-neutral-secondary, #f5f5f5);
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .composer-content {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
      position: relative;
    }
    
    .composer-content ds-avatar {
      position: relative;
      top: 6px;
    }
    
    .composer-input-wrapper {
      flex: 1;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      background: var(--color-background-neutral-secondary, #f5f5f5);
      border-radius: 24px;
      padding: 12px 16px;
      padding-right: 48px; /* Extra padding for fixed send button */
      min-height: 44px;
      position: relative;
    }
    
    /* Mention menu */
    .mention-menu {
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      background: var(--color-background-neutral-primary, #ffffff);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      margin-bottom: 8px;
      max-height: 200px;
      overflow-y: auto;
      z-index: 10;
      animation: slideUp 0.2s ease-out;
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .mention-menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      transition: background 0.2s ease;
      border-bottom: 1px solid var(--border-color-default);
    }
    
    .mention-menu-item:last-child {
      border-bottom: none;
    }
    
    .mention-menu-item:active {
      background: var(--color-background-neutral-secondary, #f5f5f5);
    }
    
    .mention-user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }
    
    .mention-user-name {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 600;
      line-height: 20px;
      color: var(--color-text-primary, #1a1a1a);
    }
    
    .mention-user-role {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      line-height: 18px;
      color: var(--color-text-secondary, #737373);
    }
    
    .composer-input {
      flex: 1;
      border: none;
      background: transparent;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      line-height: 20px;
      color: var(--color-text-primary, #1a1a1a);
      outline: none;
      resize: none;
      min-height: 20px;
      max-height: 120px;
      overflow-y: auto;
      padding: 0;
      margin: 0;
    }
    
    .composer-input::placeholder {
      color: var(--color-text-tertiary, #a0a0a0);
      font-size: var(--font-size-sm);
    }
    
    /* Style the send button (ds-icon-button) - positioned in top right corner */
    .send-button-fixed {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 10;
      flex-shrink: 0;
      animation: slideInFromRight 0.2s ease-out;
    }
    
    .send-button-fixed::ng-deep button {
      width: 32px !important;
      height: 32px !important;
      min-width: 32px !important;
      min-height: 32px !important;
      padding: 0 !important;
      border-radius: 50% !important;
    }
    
    /* Keep old style for reference but won't be used */
    .composer-input-wrapper ds-icon-button {
      flex-shrink: 0;
      animation: slideInFromRight 0.2s ease-out;
    }
    
    .composer-input-wrapper ds-icon-button::ng-deep button {
      width: 32px !important;
      height: 32px !important;
      min-width: 32px !important;
      min-height: 32px !important;
      padding: 0 !important;
      border-radius: 50% !important;
    }
    
    /* Slide in animation from right */
    @keyframes slideInFromRight {
      from {
        opacity: 0;
        transform: translateX(20px) scale(0.8);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    /* Safe area support */
    @supports (padding: env(safe-area-inset-bottom)) {
      .post-detail-container {
        padding-bottom: calc(20px + env(safe-area-inset-bottom));
      }
    }
  `]
})
export class DsMobilePostDetailModalComponent implements AfterViewInit {
  // Post data passed from service
  @Input() postData!: PostDetailData;
  
  // ViewChild for comment input
  @ViewChild('commentInput') commentInput?: ElementRef<HTMLTextAreaElement>;

  // Signal for reactive post data
  post = signal<PostDetailData>({
    postId: '',
    authorName: '',
    authorRole: '',
    timestamp: '',
    content: '',
    comments: []
  });

  // Comment composer state
  commentText = signal('');
  currentUserInitials = signal('LM');
  replyingTo = signal<{ authorName: string; content: string } | null>(null);
  editingComment = signal<{ authorName: string; originalContent: string; timestamp: string } | null>(null);
  
  // Mention menu state
  showMentionMenu = signal(false);
  mentionQuery = signal('');
  
  // Get available users to mention (post author + commenters)
  availableUsers = computed(() => {
    const post = this.post();
    const users: Array<{ name: string; initials: string; role: string }> = [];
    
    // Add post author
    users.push({
      name: post.authorName,
      initials: post.avatarInitials || post.authorName.split(' ').map(n => n[0]).join(''),
      role: post.authorRole
    });
    
    // Add unique commenters
    const commenterNames = new Set<string>();
    post.comments?.forEach(comment => {
      if (!commenterNames.has(comment.authorName)) {
        commenterNames.add(comment.authorName);
        users.push({
          name: comment.authorName,
          initials: comment.avatarInitials,
          role: comment.authorRole
        });
      }
    });
    
    return users;
  });
  
  // Filtered users based on mention query
  filteredUsers = computed(() => {
    const query = this.mentionQuery().toLowerCase();
    if (!query) return this.availableUsers();
    return this.availableUsers().filter(user => 
      user.name.toLowerCase().includes(query)
    );
  });

  constructor(
    private modalController: ModalController,
    private lightbox: DsMobileLightboxService,
    private bottomSheet: DsMobileBottomSheetService
  ) {}

  ngOnInit(): void {
    // Initialize post data from input
    if (this.postData) {
      this.post.set(this.postData);
    }
  }

  ngAfterViewInit(): void {
    // Auto-focus comment input if requested
    if (this.postData?.focusComment) {
      // Small delay to ensure modal animation is complete
      setTimeout(() => {
        this.commentInput?.nativeElement.focus();
        // Show keyboard on mobile
        this.showKeyboard();
      }, 300);
    }
  }

  /**
   * Show the keyboard when user interacts with input
   */
  showKeyboard(): void {
    Keyboard.show().catch(e => console.log('Keyboard.show() not available'));
  }
  
  /**
   * Focus the comment input when comment icon is tapped
   */
  focusCommentInput(): void {
    // Focus the input
    this.commentInput?.nativeElement.focus();
    // Show keyboard on mobile
    this.showKeyboard();
  }
  
  /**
   * Handle input changes and detect @ mentions
   */
  handleInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const text = textarea.value;
    const cursorPosition = textarea.selectionStart || 0;
    
    // Auto-resize textarea
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    
    // Find the last @ before cursor
    const textBeforeCursor = text.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtIndex !== -1) {
      // Check if there's a space after @
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
      const hasSpace = textAfterAt.includes(' ');
      
      if (!hasSpace) {
        // Show mention menu
        this.showMentionMenu.set(true);
        this.mentionQuery.set(textAfterAt);
      } else {
        this.showMentionMenu.set(false);
      }
    } else {
      this.showMentionMenu.set(false);
    }
  }
  
  /**
   * Select a user from mention menu - show as reply indicator instead of inline mention
   */
  selectMention(userName: string): void {
    // Set as reply (similar to clicking Reply on a comment)
    this.replyingTo.set({ authorName: userName, content: '' });
    
    // Clear the @ from the input
    const currentText = this.commentText();
    const textWithoutMention = currentText.substring(0, currentText.lastIndexOf('@'));
    this.commentText.set(textWithoutMention);
    
    // Hide mention menu
    this.showMentionMenu.set(false);
    
    // Focus back on input
    setTimeout(() => {
      this.commentInput?.nativeElement.focus();
    }, 0);
  }
  
  /**
   * Handle reply to a comment
   */
  handleReply(authorName: string, content: string): void {
    this.replyingTo.set({ authorName, content });
    // Focus the input and show keyboard
    setTimeout(() => {
      this.commentInput?.nativeElement.focus();
      this.showKeyboard();
    }, 100);
  }
  
  /**
   * Cancel reply
   */
  cancelReply(): void {
    this.replyingTo.set(null);
  }
  
  /**
   * Cancel edit
   */
  cancelEdit(): void {
    this.editingComment.set(null);
    this.commentText.set('');
  }
  
  /**
   * Handle edit comment
   */
  handleEditComment(authorName: string, originalContent: string, timestamp: string): void {
    // Clear reply state if active
    this.replyingTo.set(null);
    
    // Remove @mention from the content if it exists
    let contentToEdit = originalContent;
    const mentionMatch = originalContent.match(/^@([A-Za-z]+(?:\s+[A-Za-z]+)?)\s+/);
    if (mentionMatch) {
      contentToEdit = originalContent.substring(mentionMatch[0].length);
    }
    
    // Set edit state
    this.editingComment.set({ authorName, originalContent, timestamp });
    
    // Populate the input with existing content
    this.commentText.set(contentToEdit);
    
    // Focus the input, show keyboard, and auto-resize
    setTimeout(() => {
      if (this.commentInput?.nativeElement) {
        const textarea = this.commentInput.nativeElement;
        textarea.focus();
        
        // Auto-resize textarea to fit content
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        
        this.showKeyboard();
      }
    }, 100);
  }

  /**
   * Close the modal
   */
  close(): void {
    this.modalController.dismiss();
  }

  /**
   * Submit a comment
   */
  submitComment(): void {
    const text = this.commentText().trim();
    if (!text) return;

    const currentPost = this.post();
    
    // Check if we're editing an existing comment
    if (this.editingComment()) {
      console.log('[PostDetailModal] Updating comment:', text);
      
      const editing = this.editingComment()!;
      
      // Update the existing comment
      const updatedComments = currentPost.comments?.map(comment => {
        if (comment.authorName === editing.authorName && 
            comment.content === editing.originalContent &&
            comment.timestamp === editing.timestamp) {
          return {
            ...comment,
            content: text,
            timestamp: 'Just now (edited)'
          };
        }
        return comment;
      });
      
      this.post.set({
        ...currentPost,
        comments: updatedComments
      });
      
      // Clear edit state
      this.editingComment.set(null);
    } else {
      // Create new comment
      console.log('[PostDetailModal] Submitting comment:', text);
      
      const newComment: CommentData = {
        authorName: 'Lars Mikkelsen',
        authorRole: 'You',
        timestamp: 'Just now',
        avatarInitials: this.currentUserInitials(),
        content: this.replyingTo() 
          ? `@${this.replyingTo()!.authorName} ${text}`
          : text,
        isLiked: false,
        likeCount: 0,
        isOwnComment: true
      };

      // Add comment to the list
      const updatedComments = [...(currentPost.comments || []), newComment];
      
      this.post.set({
        ...currentPost,
        comments: updatedComments,
        commentCount: updatedComments.length
      });
      
      // Clear reply state
      this.replyingTo.set(null);
    }

    // Clear the input
    this.commentText.set('');
    this.showMentionMenu.set(false);
    
    // Reset textarea height to initial state
    if (this.commentInput?.nativeElement) {
      this.commentInput.nativeElement.style.height = 'auto';
    }
    
    // Blur the input to hide the keyboard
    this.commentInput?.nativeElement.blur();
    
    // Hide keyboard explicitly
    Keyboard.hide().catch(e => console.log('Keyboard.hide() not available'));

    // In a real app, you would also send this to your backend
    // this.commentService.addComment(currentPost.postId, text);
  }

  /**
   * Open image in lightbox
   */
  openImageLightbox(): void {
    const postData = this.post();
    
    if (!postData.imageSrc) return;

    const authorMeta: LightboxAuthor = {
      name: postData.authorName,
      role: postData.authorRole,
      avatarInitials: postData.avatarInitials || '',
      avatarType: postData.avatarType || 'initials',
      avatarSrc: postData.avatarSrc || '',
      timestamp: postData.timestamp
    };

    this.lightbox.open({
      images: [
        {
          type: 'image',
          src: postData.imageSrc,
          alt: postData.imageAlt || 'Post image',
          title: postData.imageAlt || '',
          description: postData.content,
          isLiked: postData.isLiked || false,
          likeCount: postData.likeCount || 0,
          commentCount: postData.commentCount || 0
        }
      ],
      author: authorMeta,
      enableZoom: true,
      showControls: false,
      showInfo: true
    });
  }
  
  /**
   * Handle long press on a comment to show action sheet
   */
  async handleCommentLongPress(authorName: string, content: string, isOwnComment: boolean): Promise<void> {
    const sheet = await this.bottomSheet.create({
      component: DsMobileCommentActionsBottomSheetComponent,
      componentProps: {
        isOwnComment: isOwnComment,
        commentAuthor: authorName,
        commentPreview: content
      },
      breakpoints: [0, 0.25, 0.5],
      initialBreakpoint: isOwnComment ? 0.35 : 0.25,
      handle: true,
      backdropDismiss: true
    });
    
    const result = await sheet.onWillDismiss();
    
    if (result.role === 'select' && result.data) {
      const action = (result.data as CommentActionResult).action;
      const currentPost = this.post();
      
      switch (action) {
        case 'like':
          console.log('Like comment by', authorName);
          // Find and toggle like on the comment
          const updatedComments = currentPost.comments?.map(comment => {
            if (comment.authorName === authorName && comment.content === content) {
              const isLiked = !comment.isLiked;
              return {
                ...comment,
                isLiked,
                likeCount: isLiked ? (comment.likeCount || 0) + 1 : Math.max(0, (comment.likeCount || 0) - 1)
              };
            }
            return comment;
          });
          this.post.set({ ...currentPost, comments: updatedComments });
          break;
        case 'reply':
          console.log('Reply to comment by', authorName);
          this.handleReply(authorName, content);
          break;
        case 'edit':
          console.log('Edit comment by', authorName);
          // Find the full comment data to get timestamp
          const commentToEdit = currentPost.comments?.find(
            comment => comment.authorName === authorName && comment.content === content
          );
          if (commentToEdit) {
            this.handleEditComment(authorName, content, commentToEdit.timestamp);
          }
          break;
        case 'delete':
          console.log('Delete comment by', authorName);
          // Show confirmation before deleting
          if (confirm('Are you sure you want to delete this comment?')) {
            const updatedCommentsAfterDelete = currentPost.comments?.filter(
              comment => !(comment.authorName === authorName && comment.content === content)
            );
            this.post.set({ 
              ...currentPost, 
              comments: updatedCommentsAfterDelete,
              commentCount: updatedCommentsAfterDelete?.length || 0
            });
          }
          break;
      }
    }
  }
}

