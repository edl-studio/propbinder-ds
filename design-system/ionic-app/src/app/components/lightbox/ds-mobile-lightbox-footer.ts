import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconButtonComponent } from '@propbinder/design-system/button/ds-icon-button';

/**
 * DsMobileLightboxFooterComponent
 * 
 * Shared footer component for all lightbox types (image, PDF, etc.)
 * Displays like, comment, and share action buttons with consistent styling.
 */
@Component({
  selector: 'ds-mobile-lightbox-footer',
  standalone: true,
  imports: [CommonModule, DsIconButtonComponent],
  template: `
    <div class="lightbox-footer">
      <div class="footer-actions">
        <div class="action-buttons-left">
          <!-- Like button -->
          <ds-icon-button
            [icon]="isLiked() ? 'remixHeart3Fill' : 'remixHeart3Line'"
            variant="ghost"
            size="md"
            (click)="likeClick.emit()"
            [attr.data-liked]="isLiked()"
            class="action-button-like"
            [ariaLabel]="'Like'">
          </ds-icon-button>
          
          <!-- Comment button -->
          <ds-icon-button
            icon="remixChat3Line"
            variant="ghost"
            size="md"
            (click)="commentClick.emit()"
            class="action-button-comment"
            [ariaLabel]="'Comment'">
          </ds-icon-button>
        </div>
        
        <ds-icon-button
          icon="remixShare2Line"
          variant="ghost"
          size="md"
          (click)="shareClick.emit()"
          class="action-button-share"
          [ariaLabel]="'Share'">
        </ds-icon-button>
      </div>
    </div>
  `,
  styles: [`
    .lightbox-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 20px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
      pointer-events: none;
    }

    .footer-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      pointer-events: auto;
    }

    .action-buttons-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    /* Style the action buttons to match the ghost/transparent look */
    .action-button-like::ng-deep button,
    .action-button-comment::ng-deep button,
    .action-button-share::ng-deep button {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      color: white !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: all 0.2s ease;
    }

    .action-button-like::ng-deep button:hover,
    .action-button-comment::ng-deep button:hover,
    .action-button-share::ng-deep button:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      transform: scale(1.02);
    }

    .action-button-like::ng-deep button:active,
    .action-button-comment::ng-deep button:active,
    .action-button-share::ng-deep button:active {
      transform: scale(0.98);
    }

    /* Icon and label colors */
    .action-button-like::ng-deep button svg,
    .action-button-comment::ng-deep button svg,
    .action-button-share::ng-deep button svg,
    .action-button-like::ng-deep button .btn__icon,
    .action-button-comment::ng-deep button .btn__icon,
    .action-button-share::ng-deep button .btn__icon,
    .action-button-like::ng-deep button .btn__content,
    .action-button-comment::ng-deep button .btn__content {
      color: white !important;
      fill: white !important;
    }

    /* Make sure icons are visible */
    .action-button-like::ng-deep button .btn__icon svg,
    .action-button-comment::ng-deep button .btn__icon svg,
    .action-button-share::ng-deep button .btn__icon svg {
      color: white !important;
      fill: white !important;
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      width: 20px !important;
      height: 20px !important;
    }

    /* Ensure icon wrapper is visible */
    .action-button-like::ng-deep button .btn__icon,
    .action-button-comment::ng-deep button .btn__icon,
    .action-button-share::ng-deep button .btn__icon {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
    }

    /* Like button active state (pink heart) */
    .action-button-like[data-liked="true"]::ng-deep button svg {
      fill: #f91880 !important;
      color: #f91880 !important;
    }

    .action-button-like[data-liked="true"]::ng-deep button {
      border-color: rgba(249, 24, 128, 0.3) !important;
    }

    /* All action buttons should have same circular styling */
    .action-button-like,
    .action-button-comment,
    .action-button-share {
      flex-shrink: 0;
      border-radius: 50%;
    }

    .action-button-like::ng-deep button,
    .action-button-comment::ng-deep button,
    .action-button-share::ng-deep button {
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

    /* Safe area support for footer */
    @supports (padding-bottom: env(safe-area-inset-bottom)) {
      .lightbox-footer {
        padding-bottom: calc(20px + env(safe-area-inset-bottom));
      }
    }
  `]
})
export class DsMobileLightboxFooterComponent {
  /**
   * Whether the content is liked
   */
  isLiked = input<boolean>(false);

  /**
   * Number of likes
   */
  likeCount = input<number>(0);

  /**
   * Number of comments
   */
  commentCount = input<number>(0);

  /**
   * Emitted when like button is clicked
   */
  likeClick = output<void>();

  /**
   * Emitted when comment button is clicked
   */
  commentClick = output<void>();

  /**
   * Emitted when share button is clicked
   */
  shareClick = output<void>();
}

