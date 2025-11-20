import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { DsMobileHandbookDetailModalComponent, HandbookDetailData } from './ds-mobile-handbook-detail-modal';

/**
 * DsMobileHandbookDetailModalService
 * 
 * Service for displaying handbook folder details in a full-screen modal.
 * Built on Ionic's modal system with native gestures and animations.
 * 
 * Features:
 * - Full handbook content display
 * - Items list with descriptions
 * - Images and attachments
 * - Contact information
 * - Native modal animations
 * - Safe area support
 * 
 * @example
 * ```typescript
 * constructor(private handbookModal: DsMobileHandbookDetailModalService) {}
 * 
 * async openHandbook() {
 *   await this.handbookModal.open({
 *     title: 'Utilities',
 *     variant: 'pink',
 *     iconName: 'remixLightbulbLine',
 *     itemCount: 8,
 *     items: [
 *       {
 *         title: 'Hjertestarter',
 *         description: 'Installed on the 4th floor...',
 *         images: ['/path/to/image.jpg'],
 *         contacts: [
 *           { name: 'Mortensen & Søn ApS', initials: 'M' }
 *         ]
 *       }
 *     ]
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DsMobileHandbookDetailModalService {
  constructor(private modalController: ModalController) {}

  /**
   * Open the handbook detail modal
   * 
   * @param handbookData Handbook data to display
   * @returns Promise that resolves when the modal is presented
   */
  async open(handbookData: HandbookDetailData): Promise<void> {
    console.log('[HandbookDetailModal] Opening with data:', handbookData);
    
    const modal = await this.modalController.create({
      component: DsMobileHandbookDetailModalComponent,
      componentProps: {
        handbookData: handbookData
      },
      cssClass: 'ds-handbook-detail-modal',
      mode: 'ios',
      presentingElement: document.querySelector('ion-router-outlet') || undefined,
      backdropDismiss: true,
      showBackdrop: true,
      animated: true,
      keyboardClose: true,
      enterAnimation: undefined,
      leaveAnimation: undefined
    });

    console.log('[HandbookDetailModal] Modal created, presenting...');
    await modal.present();
    console.log('[HandbookDetailModal] Modal presented');
  }

  /**
   * Close the currently open handbook detail modal
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

