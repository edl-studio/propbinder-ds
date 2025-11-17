import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';

export interface PostActionResult {
  action: 'edit' | 'delete' | 'like' | 'reply';
}

/**
 * DsMobilePostActionsBottomSheetComponent
 * 
 * Bottom sheet for post actions. Shows different actions based on whether
 * the post belongs to the current user.
 * 
 * For own posts:
 * - Edit
 * - Delete
 * - ----
 * - Like
 * - Reply
 * 
 * For other users' posts:
 * - Like
 * - Reply
 * 
 * @example
 * ```typescript
 * const sheet = await this.bottomSheet.create({
 *   component: DsMobilePostActionsBottomSheetComponent,
 *   componentProps: {
 *     isOwnPost: false
 *   },
 *   breakpoints: [0, 0.25],
 *   initialBreakpoint: 0.25,
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
  selector: 'ds-mobile-post-actions-bottom-sheet',
  standalone: true,
  imports: [CommonModule, DsIconComponent],
  template: `
    <div class="post-actions-sheet">
      <!-- Actions List -->
      <div class="actions-list">
        <!-- Own Post Actions -->
        @if (isOwnPost) {
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
    .post-actions-sheet {
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
      background: var(--color-border-subtle, #e5e5e5);
      margin: 0 8px;
    }
  `]
})
export class DsMobilePostActionsBottomSheetComponent {
  /**
   * Whether this post belongs to the current user
   */
  @Input() isOwnPost: boolean = false;
  
  constructor(private modalController: ModalController) {}
  
  /**
   * Handle action selection and dismiss with result
   */
  selectAction(action: 'edit' | 'delete' | 'like' | 'reply'): void {
    this.modalController.dismiss(
      { action } as PostActionResult,
      'select'
    );
  }
}

