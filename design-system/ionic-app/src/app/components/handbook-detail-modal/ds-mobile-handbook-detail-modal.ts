import {
  Component,
  signal,
  Input,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  ModalController
} from '@ionic/angular/standalone';
import { DsIconButtonComponent } from '@propbinder/design-system/button/ds-icon-button';
import { DsMobileHandbookFolderMiniComponent } from '../handbook-folder/ds-mobile-handbook-folder-mini';
import { DsMobileFileAttachmentComponent } from '../file-attachment';
import { DsMobileContactListItemComponent } from '../contact-list-item';

/**
 * Handbook detail data interface
 */
export interface HandbookDetailData {
  title: string;
  variant: string;
  iconName: string;
  itemCount: number;
  items?: HandbookItem[];
}

export interface HandbookItem {
  title: string;
  description?: string;
  images?: string[];
  attachments?: AttachmentItem[];
  contacts?: ContactItem[];
}

export interface AttachmentItem {
  name: string;
  type?: string;
}

export interface ContactItem {
  name: string;
  initials: string;
  contactPerson?: string;
  phoneNumber?: string;
}

/**
 * DsMobileHandbookDetailModalComponent
 * 
 * Modal wrapper for displaying handbook folder details.
 * 
 * Features:
 * - Folder content display
 * - Items list with descriptions
 * - Images and attachments
 * - Contact information
 * - Native modal controls (close, swipe down)
 * - Safe area support
 * 
 * This component is typically not used directly - use DsMobileHandbookDetailModalService instead.
 */
@Component({
  selector: 'ds-mobile-handbook-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    DsIconButtonComponent,
    DsMobileHandbookFolderMiniComponent,
    DsMobileFileAttachmentComponent,
    DsMobileContactListItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ion-content [fullscreen]="true" [scrollY]="true" class="handbook-modal-content">
      <div class="handbook-modal-wrapper">
        <!-- Header -->
        <div class="handbook-modal-header">
          <div class="header-content">
            <!-- Handbook folder info -->
            <div class="handbook-folder-info">
              <ds-mobile-handbook-folder-mini
                [variant]="handbook().variant"
                [iconName]="handbook().iconName">
              </ds-mobile-handbook-folder-mini>
              <div class="folder-details">
                <div class="folder-name">{{ handbook().title }}</div>
                <div class="folder-meta">
                  <span>{{ handbook().itemCount }} items</span>
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
              aria-label="Close">
            </ds-icon-button>
          </div>
        </div>

        <!-- Content -->
        <div class="handbook-detail-container">
          @if (handbook().items && handbook().items!.length > 0) {
            @for (item of handbook().items!; track item.title; let isLast = $last) {
              <div class="handbook-item" [class.last-item]="isLast">
                <h2 class="item-title">{{ item.title }}</h2>
                
                @if (item.description) {
                  <p class="item-description">{{ item.description }}</p>
                }
                
                @if (item.images && item.images.length > 0) {
                  <div class="images-grid">
                    @for (image of item.images; track image) {
                      <img 
                        [src]="image" 
                        [alt]="item.title"
                        class="item-image"
                      />
                    }
                  </div>
                }
                
                @if (item.contacts && item.contacts.length > 0) {
                  <div class="contacts-list">
                    @for (contact of item.contacts; track contact.name) {
                      <ds-mobile-contact-list-item
                        [name]="contact.name"
                        [initials]="contact.initials"
                        [contactPerson]="contact.contactPerson || ''"
                        [phoneNumber]="contact.phoneNumber || ''"
                        [clickable]="true"
                        (contactClick)="handleContactClick(contact)">
                      </ds-mobile-contact-list-item>
                    }
                  </div>
                }
                
                @if (item.attachments && item.attachments.length > 0) {
                  <div class="attachments-list">
                    @for (attachment of item.attachments; track attachment.name) {
                      <ds-mobile-file-attachment
                        [fileName]="attachment.name"
                        [variant]="attachment.type === 'pdf' ? 'pdf' : 'doc'"
                        (fileClick)="handleAttachmentClick(attachment)">
                      </ds-mobile-file-attachment>
                    }
                  </div>
                }
              </div>
            }
          } @else {
            <!-- Empty State -->
            <div class="handbook-empty-state">
              <img 
                src="/Assets/Empty state-chat.png" 
                alt="No items yet" 
                class="empty-state-image"
              />
              <h3 class="empty-state-title">No items yet</h3>
              <p class="empty-state-description">This folder is empty</p>
            </div>
          }
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .handbook-modal-content {
      --background: var(--color-background-neutral-primary, #ffffff);
    }

    .handbook-modal-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      min-height: 100dvh;
      background: var(--color-background-neutral-primary, #ffffff);
    }

    .handbook-modal-header {
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
    }

    .handbook-folder-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
    }

    .folder-details {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }

    .folder-name {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .folder-meta {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: -0.26px;
      color: var(--color-text-tertiary, #737373);
      display: flex;
      align-items: center;
      gap: 4px;
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

    .handbook-detail-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 640px;
      margin: 0 auto;
      padding: 16px 0 20px 0;
      flex: 1;
    }
    
    .handbook-item {
      width: 100%;
      padding: 24px 20px 24px 20px;
      border-bottom: 1px solid var(--border-color-default);
    }
    
    .handbook-item.last-item {
      border-bottom: none;
    }

    .item-title {
      font-family: 'Brockmann', sans-serif;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: var(--color-text-primary, #1a1a1a);
      margin: 0 0 12px 0;
    }

    .item-description {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      line-height: 20px;
      color: var(--color-text-primary, #1a1a1a);
      margin: 0 0 12px 0;
    }

    .images-grid {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
      overflow-x: auto;
    }

    .item-image {
      width: auto;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .contacts-list {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-bottom: 12px;
    }
    
    .contacts-list ds-mobile-contact-list-item:not(:last-child) {
      position: relative;
      padding-bottom: 8px;
    }
    
    .contacts-list ds-mobile-contact-list-item:not(:first-child) {
      padding-top: 8px;
    }
    
    .contacts-list ds-mobile-contact-list-item:not(:last-child)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 44px;
      right: 0;
      height: 1px;
      background: var(--border-color-default);
    }
    
    .contacts-list:last-child,
    .attachments-list:last-child,
    .images-grid:last-child {
      margin-bottom: 0;
    }

    .attachments-list {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-bottom: 12px;
    }
    
    .attachments-list ds-mobile-file-attachment:not(:last-child) {
      margin-bottom: 8px;
    }

    /* Empty State */
    .handbook-empty-state {
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

    /* Safe area support */
    @supports (padding: env(safe-area-inset-bottom)) {
      .handbook-detail-container {
        padding-bottom: calc(20px + env(safe-area-inset-bottom));
      }
    }
  `]
})
export class DsMobileHandbookDetailModalComponent {
  // Handbook data passed from service
  @Input() handbookData!: HandbookDetailData;
  
  // Signal for reactive handbook data
  handbook = signal<HandbookDetailData>({
    title: '',
    variant: 'light-purple',
    iconName: 'remixFolder3Line',
    itemCount: 0,
    items: []
  });

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    // Initialize handbook data from input
    if (this.handbookData) {
      this.handbook.set(this.handbookData);
    }
  }

  /**
   * Close the modal
   */
  close(): void {
    this.modalController.dismiss();
  }
  
  /**
   * Handle contact click
   */
  handleContactClick(contact: ContactItem): void {
    console.log('Contact clicked:', contact);
    // Implement contact action (e.g., show contact details, call, etc.)
  }
  
  /**
   * Handle attachment click
   */
  handleAttachmentClick(attachment: AttachmentItem): void {
    console.log('Attachment clicked:', attachment);
    // Implement attachment action (e.g., open file viewer, download, etc.)
  }
}

