import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconButtonComponent } from '@propbinder/design-system/button/ds-icon-button';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import type { LightboxAuthor } from './ds-mobile-lightbox.service';

/**
 * DsMobileLightboxHeaderComponent
 * 
 * Shared header component for all lightbox types (image, PDF, etc.)
 * Displays author information and close button with consistent styling.
 */
@Component({
  selector: 'ds-mobile-lightbox-header',
  standalone: true,
  imports: [CommonModule, DsIconButtonComponent, DsAvatarComponent],
  template: `
    @if (author()) {
      <div class="lightbox-header">
        <div class="header-content">
          <!-- Post author info -->
          <div class="post-author-info">
            <ds-avatar
              [initials]="author()!.avatarInitials ?? ''"
              [type]="author()!.avatarType ?? 'initials'"
              [src]="author()!.avatarSrc ?? ''"
              size="md"
            />
            <div class="author-details">
              <div class="author-name">{{ author()!.name }}</div>
              <div class="author-meta">
                @if (author()!.role) {
                  <span>{{ author()!.role }}</span>
                }
                @if (author()!.role && author()!.timestamp) {
                  <span class="separator">·</span>
                }
                @if (author()!.timestamp) {
                  <span>{{ author()!.timestamp }}</span>
                }
              </div>
            </div>
          </div>
          
          <!-- Close button -->
          <ds-icon-button
            icon="remixCloseLine"
            variant="ghost"
            size="md"
            (click)="closeClick.emit()"
            class="close-button"
            [ariaLabel]="'Close'">
          </ds-icon-button>
        </div>
      </div>
    }
  `,
  styles: [`
    .lightbox-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 0 16px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 80%, transparent 100%);
      pointer-events: none;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 72px;
      pointer-events: auto;
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

    .author-name {
      color: white;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.3px;
    }

    .author-meta {
      color: rgba(255, 255, 255, 0.7);
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: -0.26px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .author-meta .separator {
      color: rgba(255, 255, 255, 0.5);
    }

    .close-button {
      pointer-events: auto;
      flex-shrink: 0;
      border-radius: 50%;
    }

    .close-button::ng-deep button {
      color: white !important;
      background: rgba(255, 255, 255, 0.1) !important;
      border-radius: 50%;
      transition: background 0.2s ease;
      border: none;
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      min-height: 44px !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .close-button::ng-deep button:hover {
      background: rgba(255, 255, 255, 0.15) !important;
    }

    .close-button::ng-deep button:active {
      background: rgba(255, 255, 255, 0.15) !important;
    }

    .close-button::ng-deep svg {
      color: white !important;
      fill: white !important;
    }

    /* Safe area support for notched devices */
    @supports (padding-top: env(safe-area-inset-top)) {
      .lightbox-header {
        padding-top: calc(16px + env(safe-area-inset-top));
      }
    }
  `]
})
export class DsMobileLightboxHeaderComponent {
  /**
   * Author information to display
   */
  author = input<LightboxAuthor>();

  /**
   * Emitted when close button is clicked
   */
  closeClick = output<void>();
}

