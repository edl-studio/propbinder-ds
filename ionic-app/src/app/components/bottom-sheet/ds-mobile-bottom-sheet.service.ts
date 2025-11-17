import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { ComponentRef } from '@angular/core';

/**
 * Configuration options for the bottom sheet modal
 */
export interface BottomSheetOptions {
  /** The component to display in the bottom sheet */
  component: any;
  /** Component props to pass to the modal content */
  componentProps?: { [key: string]: any };
  /** Breakpoints for the bottom sheet (0-1 values representing percentage of screen) */
  breakpoints?: number[];
  /** Initial breakpoint to open the sheet at */
  initialBreakpoint?: number;
  /** Show/hide the drag handle */
  handle?: boolean;
  /** Custom CSS class for styling */
  cssClass?: string | string[];
  /** Whether backdrop dismisses the modal */
  backdropDismiss?: boolean;
  /** Backdrop opacity (0-1) */
  backdropOpacity?: number;
  /** Enable backdrop blur effect */
  backdropBlur?: boolean;
  /** Keyboard close behavior */
  keyboardClose?: boolean;
}

/**
 * DsMobileBottomSheetService
 * 
 * Service for creating and managing Ionic 6 bottom sheet modals.
 * Based on the Ionic blog article: https://ionic.io/blog/5-examples-of-the-new-ionic-6-bottom-sheet-modal
 * 
 * Features:
 * - Multiple breakpoints for snap-to positions
 * - Customizable initial height
 * - Optional drag handle
 * - Backdrop blur effect
 * - Custom styling support
 * 
 * @example
 * ```typescript
 * constructor(private bottomSheet: DsMobileBottomSheetService) {}
 * 
 * async openSheet() {
 *   const sheet = await this.bottomSheet.create({
 *     component: PostCreateComponent,
 *     breakpoints: [0, 0.5, 0.9],
 *     initialBreakpoint: 0.5,
 *     handle: true
 *   });
 *   
 *   const result = await sheet.onWillDismiss();
 *   console.log('Sheet dismissed with:', result.data);
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DsMobileBottomSheetService {
  constructor(private modalController: ModalController) {}

  /**
   * Create and present a bottom sheet modal
   * 
   * @param options Configuration options for the bottom sheet
   * @returns Promise that resolves to the modal instance
   */
  async create(options: BottomSheetOptions): Promise<HTMLIonModalElement> {
    const {
      component,
      componentProps = {},
      breakpoints = [0, 0.5, 0.9],
      initialBreakpoint = 0.5,
      handle = true,
      cssClass = '',
      backdropDismiss = true,
      backdropOpacity,
      backdropBlur = false,
      keyboardClose = true
    } = options;

    // Build CSS classes array
    const cssClasses = ['ds-bottom-sheet'];
    if (backdropBlur) {
      cssClasses.push('ds-bottom-sheet--blur');
    }
    if (typeof cssClass === 'string' && cssClass) {
      cssClasses.push(cssClass);
    } else if (Array.isArray(cssClass)) {
      cssClasses.push(...cssClass);
    }

    const modal = await this.modalController.create({
      component,
      componentProps,
      breakpoints,
      initialBreakpoint,
      handle,
      cssClass: cssClasses,
      backdropDismiss,
      keyboardClose,
      showBackdrop: true,
      canDismiss: backdropDismiss,
      ...(backdropOpacity !== undefined && { 
        cssClass: [...cssClasses, 'ds-bottom-sheet--custom-backdrop']
      })
    });

    // Apply custom backdrop opacity if specified
    if (backdropOpacity !== undefined) {
      modal.style.setProperty('--backdrop-opacity', backdropOpacity.toString());
    }

    await modal.present();
    
    // Don't wait - return immediately so component can try to focus
    // while still in user gesture context
    return modal;
  }

  /**
   * Dismiss all open modals
   */
  async dismiss(data?: any, role?: string): Promise<boolean> {
    return this.modalController.dismiss(data, role);
  }

  /**
   * Get the top-most modal overlay
   */
  async getTop(): Promise<HTMLIonModalElement | undefined> {
    return this.modalController.getTop();
  }
}

