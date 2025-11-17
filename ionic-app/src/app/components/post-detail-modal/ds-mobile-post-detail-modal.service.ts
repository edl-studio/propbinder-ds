import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { DsMobilePostDetailModalComponent, PostDetailData } from './ds-mobile-post-detail-modal';

/**
 * DsMobilePostDetailModalService
 * 
 * Service for displaying post details in a full-screen modal.
 * Built on Ionic's modal system with native gestures and animations.
 * Follows the same pattern as DsMobileLightboxService for consistent behavior.
 * 
 * Features:
 * - Full post content display
 * - Comments section
 * - Like/comment actions
 * - Image lightbox integration
 * - Native modal animations
 * - Safe area support
 * 
 * @example
 * ```typescript
 * constructor(private postModal: DsMobilePostDetailModalService) {}
 * 
 * async openPost() {
 *   await this.postModal.open({
 *     postId: '123',
 *     authorName: 'John Doe',
 *     authorRole: 'Tenant',
 *     timestamp: '2h ago',
 *     avatarInitials: 'JD',
 *     content: 'Just moved into my new apartment!',
 *     isLiked: false,
 *     likeCount: 42,
 *     commentCount: 12,
 *     comments: [
 *       {
 *         authorName: 'Jane Smith',
 *         authorRole: 'Tenant',
 *         timestamp: '1h ago',
 *         avatarInitials: 'JS',
 *         content: 'Welcome to the community!'
 *       }
 *     ]
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DsMobilePostDetailModalService {
  constructor(private modalController: ModalController) {}

  /**
   * Open the post detail modal
   * 
   * @param postData Post data to display
   * @returns Promise that resolves when the modal is presented
   */
  async open(postData: PostDetailData): Promise<void> {
    console.log('[PostDetailModal] Opening with data:', postData);
    
    const modal = await this.modalController.create({
      component: DsMobilePostDetailModalComponent,
      componentProps: {
        postData: postData
      },
      cssClass: 'ds-post-detail-modal',
      mode: 'ios',
      presentingElement: document.querySelector('ion-router-outlet') || undefined,
      backdropDismiss: true,
      showBackdrop: true,
      animated: true,
      keyboardClose: true,
      // Control the presenting element animation
      enterAnimation: undefined, // Use default
      leaveAnimation: undefined  // Use default
    });

    console.log('[PostDetailModal] Modal created, presenting...');
    await modal.present();
    console.log('[PostDetailModal] Modal presented');
  }

  /**
   * Close the currently open post detail modal
   * 
   * @param data Optional data to pass back when dismissing
   * @returns Promise that resolves when the modal is dismissed
   */
  async close(data?: any): Promise<boolean> {
    return this.modalController.dismiss(data);
  }

  /**
   * Get the top-most modal if one exists
   * 
   * @returns Promise that resolves to the modal element or undefined
   */
  async getTop(): Promise<HTMLIonModalElement | undefined> {
    return this.modalController.getTop();
  }
}

