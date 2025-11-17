import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';

export interface CommentActionResult {
  action: 'like' | 'reply' | 'edit' | 'delete';
}

/**
 * DsMobileCommentActionsBottomSheetComponent
 * 
 * Bottom sheet for comment actions. Shows different actions based on whether
 * the comment belongs to the current user.
 * 
 * For other users' comments:
 * - Like
 * - Reply
 * 
 * For own comments:
 * - Edit
 * - Delete
 * - Divider
 * - Like
 * - Reply
 * 
 * @example
 * ```typescript
 * const sheet = await this.bottomSheet.create({
 *   component: DsMobileCommentActionsBottomSheetComponent,
 *   componentProps: {
 *     isOwnComment: false,
 *     commentAuthor: 'John Doe',
 *     commentPreview: 'This is a great post!'
 *   },
 *   breakpoints: [0, 0.35],
 *   initialBreakpoint: 0.35,
 *   handle: true
 * });
 * 
 * const result = await sheet.onWillDismiss();
 * if (result.data?.action) {
 *   // Handle the action
 * }
 * ```
 */
@Component({
  selector: 'ds-mobile-comment-actions-bottom-sheet',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  template: `
    <div class="comment-actions-sheet">
      <!-- Actions List -->
      <div class="actions-list">
        <!-- Own Comment Actions -->
        @if (isOwnComment) {
          <button class="action-item" (click)="selectAction('edit')">
            <ds-icon name="remixEditLine" size="20px" />
            <span class="action-label">Edit</span>
          </button>
          
          <button class="action-item destructive" (click)="selectAction('delete')">
            <ds-icon name="remixDeleteBinLine" size="20px" />
            <span class="action-label">Delete</span>
          </button>
          
          <div class="action-divider"></div>
        }
        
        <!-- Common Actions -->
        <button class="action-item" (click)="selectAction('like')">
          <ds-icon name="remixHeart3Line" size="20px" />
          <span class="action-label">Like</span>
        </button>
        
        <button class="action-item" (click)="selectAction('reply')">
          <ds-icon name="remixReplyLine" size="20px" />
          <span class="action-label">Reply</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .comment-actions-sheet {
      display: flex;
      flex-direction: column;
      background: var(--color-background-neutral-primary, #ffffff);
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }
    
    /* Actions List */
    .actions-list {
      display: flex;
      flex-direction: column;
      padding: 8px;
      gap: 4px;
    }
    
    .action-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: background 0.2s ease;
      width: 100%;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
      border-radius: 12px;
    }
    
    .action-item:active {
      background: var(--color-background-neutral-secondary, #f5f5f5);
    }
    
    .action-item ds-icon {
      color: var(--color-text-primary, #1a1a1a);
      flex-shrink: 0;
    }
    
    .action-item.destructive ds-icon {
      color: var(--color-error-base, #ef4444);
    }
    
    .action-label {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 500;
      line-height: 24px;
      color: var(--color-text-primary, #1a1a1a);
      flex: 1;
    }
    
    .action-item.destructive .action-label {
      color: var(--color-error-base, #ef4444);
    }
    
    /* Divider */
    .action-divider {
      height: 1px;
      background: var(--border-color-default);
      margin: 0 8px;
    }
  `]
})
export class DsMobileCommentActionsBottomSheetComponent {
  /**
   * Whether this comment belongs to the current user
   */
  @Input() isOwnComment: boolean = false;
  
  /**
   * Author name for preview
   */
  @Input() commentAuthor: string = '';
  
  /**
   * Comment text preview (will be truncated)
   */
  @Input() commentPreview: string = '';
  
  constructor(private modalController: ModalController) {}
  
  /**
   * Handle action selection and dismiss with result
   */
  selectAction(action: 'like' | 'reply' | 'edit' | 'delete'): void {
    this.modalController.dismiss(
      { action } as CommentActionResult,
      'select'
    );
  }
}

