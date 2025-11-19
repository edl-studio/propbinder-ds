import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { DsMobileLightboxImageComponent } from './ds-mobile-lightbox-image';
import { DsMobileLightboxPdfComponent } from './ds-mobile-lightbox-pdf';

/**
 * Media file types supported by the lightbox
 */
export type LightboxMediaType = 'image' | 'pdf';

/**
 * Base media file interface
 */
export interface LightboxMediaFile {
  /** File source URL */
  src: string;
  /** Media type - determines which viewer to use */
  type: LightboxMediaType;
  /** File title */
  title?: string;
  /** File description */
  description?: string;
}

/**
 * Image data for lightbox display
 */
export interface LightboxImage extends LightboxMediaFile {
  type: 'image';
  /** Alt text for accessibility */
  alt?: string;
  /** Thumbnail URL for faster loading (optional) */
  thumbnail?: string;
  /** Whether the image is liked */
  isLiked?: boolean;
  /** Number of likes */
  likeCount?: number;
  /** Number of comments */
  commentCount?: number;
}

/**
 * PDF document data for lightbox display
 */
export interface LightboxPdf extends LightboxMediaFile {
  type: 'pdf';
  /** File size in bytes (optional, for display) */
  fileSize?: number;
  /** Number of pages (optional, for display) */
  pageCount?: number;
}

/**
 * Author metadata for the lightbox
 */
export interface LightboxAuthor {
  /** Author name */
  name: string;
  /** Author role/subtitle */
  role?: string;
  /** Author avatar URL */
  avatarSrc?: string;
  /** Author avatar initials (if no photo) */
  avatarInitials?: string;
  /** Avatar type */
  avatarType?: 'photo' | 'initials';
  /** Timestamp */
  timestamp?: string;
}

/**
 * Configuration options for image lightbox
 */
export interface LightboxImageOptions {
  /** Array of images to display */
  images: LightboxImage[];
  /** Author information to display in header */
  author?: LightboxAuthor;
  /** Initial image index to show (0-based) */
  initialIndex?: number;
  /** Enable pinch-to-zoom and double-tap zoom */
  enableZoom?: boolean;
  /** Show navigation controls (arrows, counter) */
  showControls?: boolean;
  /** Enable swipe gestures to navigate between images */
  enableSwipe?: boolean;
  /** Show image info (title, description) */
  showInfo?: boolean;
  /** Animation type for opening */
  animation?: 'fade' | 'zoom' | 'slide';
}

/**
 * Configuration options for PDF lightbox
 */
export interface LightboxPdfOptions {
  /** PDF document to display */
  pdf: LightboxPdf;
  /** Author information to display */
  author?: LightboxAuthor;
}

/**
 * Generic lightbox options (for backward compatibility)
 */
export type LightboxOptions = LightboxImageOptions;

/**
 * DsMobileLightboxService
 * 
 * Service for displaying media files (images and PDFs) in full-screen viewers.
 * - Images: Full-screen modal with gestures (pinch-zoom, swipe navigation)
 * - PDFs: Native device PDF viewer (iOS/Android)
 * 
 * Features:
 * - Full-screen image viewing with gestures
 * - Native PDF viewing
 * - Swipe navigation between images
 * - Pinch-to-zoom and double-tap zoom for images
 * - Mobile-optimized touch gestures
 * - Share functionality
 * 
 * @example
 * ```typescript
 * constructor(private lightbox: DsMobileLightboxService) {}
 * 
 * // Open images
 * async openImages() {
 *   const modal = await this.lightbox.openImages({
 *     images: [
 *       {
 *         type: 'image',
 *         src: 'https://example.com/image1.jpg',
 *         title: 'Beautiful Sunset'
 *       }
 *     ]
 *   });
 *   
 *   // Listen for when lightbox is dismissed
 *   const { data } = await modal.onDidDismiss();
 *   if (data?.action === 'comment') {
 *     // Open post detail modal with comment focus
 *     this.openPostDetail({ focusComment: true });
 *   }
 * }
 * 
 * // Open PDF
 * async openPdf() {
 *   await this.lightbox.openPdf({
 *     pdf: {
 *       type: 'pdf',
 *       src: 'https://example.com/document.pdf',
 *       title: 'Document'
 *     }
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DsMobileLightboxService {
  constructor(private modalController: ModalController) {}

  /**
   * Open the lightbox with images (backward compatible method)
   * 
   * @param options Configuration options for the image lightbox
   * @returns Promise that resolves to the modal instance
   */
  async open(options: LightboxOptions): Promise<HTMLIonModalElement> {
    return this.openImages(options);
  }

  /**
   * Open the image lightbox with one or more images
   * 
   * @param options Configuration options for the image lightbox
   * @returns Promise that resolves to the modal instance
   */
  async openImages(options: LightboxImageOptions): Promise<HTMLIonModalElement> {
    console.log('[Lightbox] Opening images with options:', options);
    
    const modal = await this.modalController.create({
      component: DsMobileLightboxImageComponent,
      componentProps: {
        images: options.images,
        author: options.author,
        initialIndex: options.initialIndex ?? 0,
        enableZoom: options.enableZoom !== false,
        showControls: options.showControls !== false,
        enableSwipe: options.enableSwipe !== false,
        showInfo: options.showInfo !== false,
        animation: options.animation ?? 'fade'
      },
      cssClass: 'ds-lightbox-modal',
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

    console.log('[Lightbox] Image modal created, presenting...');
    await modal.present();
    console.log('[Lightbox] Image modal presented');
    
    return modal;
  }

  /**
   * Open the PDF lightbox (opens native PDF viewer)
   * 
   * @param options Configuration options for the PDF lightbox
   * @returns Promise that resolves to the modal instance
   */
  async openPdf(options: LightboxPdfOptions): Promise<HTMLIonModalElement> {
    console.log('[Lightbox] Opening PDF with options:', options);
    
    const modal = await this.modalController.create({
      component: DsMobileLightboxPdfComponent,
      componentProps: {
        pdf: options.pdf,
        author: options.author
      },
      cssClass: 'ds-lightbox-modal',
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

    console.log('[Lightbox] PDF modal created, presenting...');
    await modal.present();
    console.log('[Lightbox] PDF modal presented');
    
    return modal;
  }

  /**
   * Close the currently open lightbox
   * 
   * @param data Optional data to pass back when dismissing
   * @returns Promise that resolves when the lightbox is dismissed
   */
  async close(data?: any): Promise<boolean> {
    return this.modalController.dismiss(data);
  }

  /**
   * Get the top-most lightbox modal if one exists
   * 
   * @returns Promise that resolves to the modal element or undefined
   */
  async getTop(): Promise<HTMLIonModalElement | undefined> {
    return this.modalController.getTop();
  }
}

