import { Injectable, Type } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

/**
 * Configuration options for modal presentation
 */
export interface ModalOptions<T = any> {
  /** The component to display in the modal */
  component: Type<T>;
  /** Props to pass to the component */
  componentProps?: Record<string, any>;
  /** CSS class(es) to apply to the modal */
  cssClass?: string | string[];
  /** Modal presentation style */
  presentationStyle?: 'fullscreen' | 'card' | 'sheet';
  /** Enable backdrop dismiss (tap outside to close) */
  backdropDismiss?: boolean;
  /** Show backdrop */
  showBackdrop?: boolean;
  /** Enable keyboard close (ESC key) */
  keyboardClose?: boolean;
  /** Enable swipe to close */
  swipeToClose?: boolean;
  /** Initial breakpoint (0-1) for sheet presentation */
  initialBreakpoint?: number;
  /** Available breakpoints for sheet presentation */
  breakpoints?: number[];
  /** Animation type */
  animated?: boolean;
  /** Mode (ios or md) */
  mode?: 'ios' | 'md';
  /** Whether to handle navigation back button */
  handleNavigationBack?: boolean;
}

/**
 * DsMobileModalService
 * 
 * Generic service for displaying any component as a modal.
 * Built on Ionic's modal system with customizable presentation styles.
 * 
 * Features:
 * - Open any component as a modal
 * - Fullscreen, card, or sheet presentation styles
 * - Customizable backdrop and dismissal behavior
 * - Native gestures and animations
 * - Type-safe component props
 * 
 * @example
 * ```typescript
 * import { MobilePostDetailPageComponent } from './post-detail.page';
 * 
 * constructor(private modal: DsMobileModalService) {}
 * 
 * async openPostModal() {
 *   await this.modal.open({
 *     component: MobilePostDetailPageComponent,
 *     componentProps: {
 *       postId: '123',
 *       authorName: 'John Doe'
 *     },
 *     presentationStyle: 'card',
 *     backdropDismiss: true
 *   });
 * }
 * ```
 * 
 * @example Sheet presentation with breakpoints
 * ```typescript
 * async openSheet() {
 *   await this.modal.open({
 *     component: CommentsComponent,
 *     presentationStyle: 'sheet',
 *     initialBreakpoint: 0.5,
 *     breakpoints: [0, 0.5, 0.75, 1],
 *     swipeToClose: true
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DsMobileModalService {
  constructor(private modalController: ModalController) {}

  /**
   * Open a component as a modal
   * 
   * @param options Configuration options for the modal
   * @returns Promise that resolves when the modal is presented
   * 
   * @example
   * ```typescript
   * await this.modal.open({
   *   component: MyComponent,
   *   componentProps: { data: 'value' },
   *   presentationStyle: 'fullscreen'
   * });
   * ```
   */
  async open<T = any>(options: ModalOptions<T>): Promise<HTMLIonModalElement> {
    console.log('[Modal] Opening modal with options:', options);
    
    const {
      component,
      componentProps,
      cssClass,
      presentationStyle = 'card',
      backdropDismiss = true,
      showBackdrop = true,
      keyboardClose = true,
      swipeToClose,
      initialBreakpoint,
      breakpoints,
      animated = true,
      mode = 'ios',
      handleNavigationBack = true
    } = options;

    // Build modal configuration
    const modalConfig: any = {
      component,
      componentProps: componentProps || {},
      cssClass: this.buildCssClasses(cssClass, presentationStyle),
      mode,
      backdropDismiss,
      showBackdrop,
      animated,
      keyboardClose,
      presentingElement: document.querySelector('ion-router-outlet') || undefined,
      handle: presentationStyle === 'sheet', // Show handle for sheet presentation
    };

    // Add swipe to close for sheet presentation
    if (swipeToClose !== undefined) {
      modalConfig.canDismiss = swipeToClose;
    }

    // Add breakpoints for sheet presentation
    if (presentationStyle === 'sheet' && breakpoints) {
      modalConfig.breakpoints = breakpoints;
      if (initialBreakpoint !== undefined) {
        modalConfig.initialBreakpoint = initialBreakpoint;
      }
    }

    // Handle navigation back button
    if (handleNavigationBack) {
      modalConfig.canDismiss = async () => {
        // You can add custom logic here if needed
        return true;
      };
    }

    const modal = await this.modalController.create(modalConfig);

    console.log('[Modal] Modal created, presenting...');
    await modal.present();
    console.log('[Modal] Modal presented');

    return modal;
  }

  /**
   * Open a component as a fullscreen modal
   * 
   * @param component Component to display
   * @param componentProps Props to pass to the component
   * @returns Promise that resolves when the modal is presented
   * 
   * @example
   * ```typescript
   * await this.modal.openFullscreen(PostDetailPage, { postId: '123' });
   * ```
   */
  async openFullscreen<T = any>(
    component: Type<T>,
    componentProps?: Record<string, any>
  ): Promise<HTMLIonModalElement> {
    return this.open({
      component,
      componentProps,
      presentationStyle: 'fullscreen',
      backdropDismiss: false,
      showBackdrop: false
    });
  }

  /**
   * Open a component as a card modal
   * 
   * @param component Component to display
   * @param componentProps Props to pass to the component
   * @returns Promise that resolves when the modal is presented
   * 
   * @example
   * ```typescript
   * await this.modal.openCard(DetailComponent, { itemId: '456' });
   * ```
   */
  async openCard<T = any>(
    component: Type<T>,
    componentProps?: Record<string, any>
  ): Promise<HTMLIonModalElement> {
    return this.open({
      component,
      componentProps,
      presentationStyle: 'card',
      backdropDismiss: true,
      showBackdrop: true
    });
  }

  /**
   * Open a component as a bottom sheet
   * 
   * @param component Component to display
   * @param componentProps Props to pass to the component
   * @param options Additional sheet options (breakpoints, etc.)
   * @returns Promise that resolves when the modal is presented
   * 
   * @example
   * ```typescript
   * await this.modal.openSheet(
   *   CommentsComponent,
   *   { postId: '789' },
   *   { initialBreakpoint: 0.5, breakpoints: [0, 0.5, 1] }
   * );
   * ```
   */
  async openSheet<T = any>(
    component: Type<T>,
    componentProps?: Record<string, any>,
    options?: {
      initialBreakpoint?: number;
      breakpoints?: number[];
      swipeToClose?: boolean;
    }
  ): Promise<HTMLIonModalElement> {
    return this.open({
      component,
      componentProps,
      presentationStyle: 'sheet',
      backdropDismiss: true,
      showBackdrop: true,
      swipeToClose: options?.swipeToClose ?? true,
      initialBreakpoint: options?.initialBreakpoint ?? 0.5,
      breakpoints: options?.breakpoints ?? [0, 0.5, 0.75, 1]
    });
  }

  /**
   * Close the currently open modal
   * 
   * @param data Optional data to pass back when dismissing
   * @param role Optional role (e.g., 'cancel', 'confirm')
   * @returns Promise that resolves when the modal is dismissed
   * 
   * @example
   * ```typescript
   * await this.modal.dismiss({ saved: true }, 'confirm');
   * ```
   */
  async dismiss(data?: any, role?: string): Promise<boolean> {
    return this.modalController.dismiss(data, role);
  }

  /**
   * Get the top-most modal if one exists
   * 
   * @returns Promise that resolves to the modal element or undefined
   * 
   * @example
   * ```typescript
   * const topModal = await this.modal.getTop();
   * if (topModal) {
   *   await topModal.dismiss();
   * }
   * ```
   */
  async getTop(): Promise<HTMLIonModalElement | undefined> {
    return this.modalController.getTop();
  }

  /**
   * Get all currently open modals
   * 
   * @returns Promise that resolves to an array of modal elements
   */
  async getAll(): Promise<HTMLIonModalElement[]> {
    const modals: HTMLIonModalElement[] = [];
    let modal = await this.modalController.getTop();
    
    while (modal) {
      modals.push(modal);
      // Get the next modal in the stack
      await modal.dismiss();
      modal = await this.modalController.getTop();
    }
    
    return modals;
  }

  /**
   * Build CSS classes for the modal
   */
  private buildCssClasses(
    customClass?: string | string[],
    presentationStyle?: string
  ): string[] {
    const classes: string[] = ['ds-mobile-modal'];
    
    if (presentationStyle) {
      classes.push(`ds-modal-${presentationStyle}`);
    }
    
    if (customClass) {
      if (Array.isArray(customClass)) {
        classes.push(...customClass);
      } else {
        classes.push(customClass);
      }
    }
    
    return classes;
  }
}

