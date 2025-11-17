import {
  Component,
  signal,
  computed,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonSpinner,
  ModalController,
  GestureController,
  Gesture
} from '@ionic/angular/standalone';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { DsIconButtonComponent } from '@propbinder/design-system/button/ds-icon-button';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import { DsMobileLightboxHeaderComponent } from './ds-mobile-lightbox-header';
import { DsMobileLightboxFooterComponent } from './ds-mobile-lightbox-footer';
import type { LightboxImage, LightboxAuthor } from './ds-mobile-lightbox.service';

/**
 * DsMobileLightboxImageComponent
 * 
 * Full-screen image lightbox component with native mobile gestures.
 * Supports swipe navigation, pinch-to-zoom, and double-tap zoom.
 * 
 * This component is typically not used directly - use DsMobileLightboxService instead.
 * 
 * Features:
 * - Swipe left/right to navigate between images
 * - Pinch to zoom in/out
 * - Double-tap to toggle zoom
 * - Swipe down to close (when not zoomed)
 * - Image counter and navigation controls
 * - Optional title and description display
 * 
 * @example
 * ```typescript
 * // Don't instantiate directly - use the service:
 * constructor(private lightbox: DsMobileLightboxService) {}
 * 
 * openImage() {
 *   this.lightbox.openImages({
 *     images: [{ type: 'image', src: 'image.jpg', title: 'My Image' }]
 *   });
 * }
 * ```
 */
@Component({
  selector: 'ds-mobile-lightbox-image',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonSpinner,
    DsIconButtonComponent,
    DsAvatarComponent,
    DsMobileLightboxHeaderComponent,
    DsMobileLightboxFooterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ion-content 
      [fullscreen]="true"
      [scrollY]="false"
      [scrollX]="false"
      class="lightbox-content"
      [class.zoomed]="isZoomed()">
      
      <div class="lightbox-wrapper">
        <!-- Header with author info and close button -->
        <ds-mobile-lightbox-header 
          [author]="author"
          (closeClick)="close()"
        />

        <!-- Image container with gesture support -->
        <div class="lightbox-container" #container>
          <div 
            class="image-wrapper"
            #imageWrapper
            [style.transform]="transform()">
            <img 
              #image
              [src]="currentImage().src"
              [alt]="currentImage().alt || 'Lightbox image'"
              class="lightbox-image"
              (load)="onImageLoad()"
              (error)="onImageError()">
          </div>
          
          <!-- Loading indicator -->
          @if (isLoading()) {
            <div class="loading-spinner">
              <ion-spinner name="crescent"></ion-spinner>
            </div>
          }
          
          <!-- Error message -->
          @if (hasError()) {
            <div class="error-message">
              <p>Failed to load image</p>
            </div>
          }
        </div>

        <!-- Navigation controls -->
        @if (showControls && images.length > 1) {
          <div class="lightbox-controls">
            <button 
              class="nav-button prev"
              (click)="previousImage()"
              [disabled]="currentIndex() === 0"
              aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <div class="counter">
              {{ currentIndex() + 1 }} / {{ images.length }}
            </div>
            
            <button 
              class="nav-button next"
              (click)="nextImage()"
              [disabled]="currentIndex() === images.length - 1"
              aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        }

        <!-- Bottom actions -->
        <ds-mobile-lightbox-footer
          [isLiked]="isLiked()"
          [likeCount]="likeCount()"
          [commentCount]="commentCount()"
          (likeClick)="onLikeToggle()"
          (commentClick)="onReply()"
          (shareClick)="onShare()"
        />
      </div>
    </ion-content>
  `,
  styleUrl: './ds-mobile-lightbox.css'
})
export class DsMobileLightboxImageComponent implements OnInit, AfterViewInit, OnDestroy {
  // Inputs (passed from service as regular properties, not signals)
  images!: LightboxImage[];
  author?: LightboxAuthor;
  initialIndex: number = 0;
  enableZoom: boolean = true;
  showControls: boolean = true;
  enableSwipe: boolean = true;
  showInfo: boolean = true;
  animation: 'fade' | 'zoom' | 'slide' = 'fade';

  // View children
  @ViewChild('container', { read: ElementRef }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('imageWrapper', { read: ElementRef }) imageWrapperRef!: ElementRef<HTMLDivElement>;
  @ViewChild('image', { read: ElementRef }) imageRef!: ElementRef<HTMLImageElement>;

  // State
  currentIndex = signal(0);
  scale = signal(1);
  translateX = signal(0);
  translateY = signal(0);
  isZoomed = signal(false);
  isLoading = signal(true);
  hasError = signal(false);
  
  // Action states
  isLiked = signal(false);
  likeCount = signal(0);
  commentCount = signal(0);

  // Computed
  currentImage = computed(() => this.images[this.currentIndex()]);
  transform = computed(() => {
    const s = this.scale();
    const x = this.translateX();
    const y = this.translateY();
    return `scale(${s}) translate(${x}px, ${y}px)`;
  });

  // Gesture tracking
  private gesture?: Gesture;
  private swipeGesture?: Gesture;
  private pinchGesture?: Gesture;
  private initialScale = 1;
  private initialTranslateX = 0;
  private initialTranslateY = 0;
  private lastPinchScale = 1;

  constructor(
    private modalController: ModalController,
    private gestureCtrl: GestureController
  ) {}

  ngOnInit(): void {
    // Set initial index from the passed property
    if (this.initialIndex !== undefined) {
      this.currentIndex.set(this.initialIndex);
    }
    
    // Initialize action states from current image
    const currentImg = this.images[this.currentIndex()];
    if (currentImg) {
      this.isLiked.set(currentImg.isLiked ?? false);
      this.likeCount.set(currentImg.likeCount ?? 0);
      this.commentCount.set(currentImg.commentCount ?? 0);
    }
  }

  ngAfterViewInit(): void {
    console.log('[Lightbox] ngAfterViewInit called');
    console.log('[Lightbox] Current image:', this.currentImage());
    console.log('[Lightbox] Images array:', this.images);
    console.log('[Lightbox] Container ref:', this.containerRef?.nativeElement);
    console.log('[Lightbox] Image wrapper ref:', this.imageWrapperRef?.nativeElement);
    console.log('[Lightbox] Image ref:', this.imageRef?.nativeElement);
    
    // Initialize gestures after view is ready
    if (this.enableZoom) {
      this.initializeZoomGesture();
      this.initializePinchZoom();
    }
    if (this.enableSwipe) {
      this.initializeSwipeGesture();
    }
  }

  ngOnDestroy(): void {
    // Clean up gestures
    this.gesture?.destroy();
    this.swipeGesture?.destroy();
    this.pinchGesture?.destroy();
  }

  /**
   * Initialize double-tap zoom gesture
   */
  private initializeZoomGesture(): void {
    if (!this.imageWrapperRef) return;

    let lastTap = 0;
    const element = this.imageWrapperRef.nativeElement;

    element.addEventListener('click', (event: MouseEvent) => {
      const now = Date.now();
      const timeSinceLastTap = now - lastTap;

      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        // Double tap detected
        event.preventDefault();
        this.onDoubleTap();
      }

      lastTap = now;
    });
  }

  /**
   * Initialize pinch-to-zoom gesture
   */
  private initializePinchZoom(): void {
    if (!this.imageWrapperRef) return;

    const element = this.imageWrapperRef.nativeElement;
    let initialDistance = 0;
    let initialCenterX = 0;
    let initialCenterY = 0;

    const getTouchDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getTouchCenter = (touches: TouchList) => {
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2
      };
    };

    element.addEventListener('touchstart', (event: TouchEvent) => {
      if (event.touches.length === 2) {
        event.preventDefault();
        initialDistance = getTouchDistance(event.touches);
        const center = getTouchCenter(event.touches);
        initialCenterX = center.x;
        initialCenterY = center.y;
        this.initialScale = this.scale();
        this.lastPinchScale = 1;
      }
    }, { passive: false });

    element.addEventListener('touchmove', (event: TouchEvent) => {
      if (event.touches.length === 2) {
        event.preventDefault();
        
        const currentDistance = getTouchDistance(event.touches);
        const pinchScale = currentDistance / initialDistance;
        
        // Calculate new scale
        let newScale = this.initialScale * pinchScale;
        newScale = Math.max(1, Math.min(newScale, 4)); // Clamp between 1x and 4x
        
        this.scale.set(newScale);
        
        if (newScale > 1) {
          this.isZoomed.set(true);
        } else {
          this.isZoomed.set(false);
          this.translateX.set(0);
          this.translateY.set(0);
        }
        
        this.lastPinchScale = pinchScale;
      }
    }, { passive: false });

    element.addEventListener('touchend', (event: TouchEvent) => {
      if (event.touches.length < 2) {
        // Reset to 1x if we're close to it
        if (this.scale() < 1.1) {
          this.resetZoom();
        }
      }
    });
  }

  /**
   * Initialize swipe gesture for navigation
   */
  private initializeSwipeGesture(): void {
    if (!this.containerRef) return;

    this.swipeGesture = this.gestureCtrl.create({
      el: this.containerRef.nativeElement,
      gestureName: 'swipe-navigate',
      direction: 'x',
      threshold: 50,
      onStart: () => {
        this.initialTranslateX = this.translateX();
      },
      onMove: (detail) => {
        // Only allow swipe if not zoomed
        if (!this.isZoomed() && detail.deltaX !== undefined) {
          this.translateX.set(this.initialTranslateX + detail.deltaX / 2);
        }
      },
      onEnd: (detail) => {
        if (!this.isZoomed() && detail.deltaX !== undefined) {
          const threshold = 100;
          
          if (detail.deltaX > threshold) {
            // Swipe right - previous image
            this.previousImage();
          } else if (detail.deltaX < -threshold) {
            // Swipe left - next image
            this.nextImage();
          } else {
            // Reset position
            this.translateX.set(0);
          }
        }
      }
    }, true);

    this.swipeGesture.enable();
  }

  /**
   * Close the lightbox
   */
  close(): void {
    this.modalController.dismiss();
  }

  async onShare(): Promise<void> {
    console.log('[Lightbox] Share button clicked');
    const currentImg = this.currentImage();
    
    if (!currentImg?.src) return;
    
    try {
      // Use Capacitor Share API for native share sheet
      await Share.share({
        title: currentImg.title || 'Image',
        text: currentImg.description || '',
        url: currentImg.src,
        dialogTitle: 'Share Image'
      });
      
      console.log('[Lightbox] Image shared successfully');
    } catch (error) {
      console.error('[Lightbox] Error sharing image:', error);
      // If share fails or is cancelled, do nothing
      // Note: User canceling the share dialog will throw an error, which is expected
    }
  }

  onLike(event: { active: boolean; count: number }): void {
    console.log('[Lightbox] Like toggled:', event);
    this.isLiked.set(event.active);
    this.likeCount.set(event.count);
    // You can emit an event or call a service here to persist the like
  }

  async onLikeToggle(): Promise<void> {
    const newLikedState = !this.isLiked();
    const newCount = newLikedState ? this.likeCount() + 1 : Math.max(0, this.likeCount() - 1);
    
    console.log('[Lightbox] Like toggled:', { active: newLikedState, count: newCount });
    this.isLiked.set(newLikedState);
    this.likeCount.set(newCount);
    
    // Haptic feedback for like/unlike
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      // Fallback to Web Vibration API if Capacitor Haptics is not available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
    
    // You can emit an event or call a service here to persist the like
  }

  onReply(): void {
    console.log('[Lightbox] Reply button clicked');
    // Close the lightbox and signal to open post detail with comment focus
    this.modalController.dismiss({ action: 'comment' });
  }

  /**
   * Navigate to the next image
   */
  nextImage(): void {
    if (this.currentIndex() < this.images.length - 1) {
      this.resetZoom();
      this.currentIndex.update(i => i + 1);
      this.isLoading.set(true);
      this.hasError.set(false);
    }
  }

  /**
   * Navigate to the previous image
   */
  previousImage(): void {
    if (this.currentIndex() > 0) {
      this.resetZoom();
      this.currentIndex.update(i => i - 1);
      this.isLoading.set(true);
      this.hasError.set(false);
    }
  }

  /**
   * Handle double-tap to toggle zoom
   */
  onDoubleTap(): void {
    if (!this.enableZoom) return;
    
    if (this.isZoomed()) {
      this.resetZoom();
    } else {
      this.scale.set(2);
      this.isZoomed.set(true);
    }
  }

  /**
   * Reset zoom and pan to default state
   */
  resetZoom(): void {
    this.scale.set(1);
    this.translateX.set(0);
    this.translateY.set(0);
    this.isZoomed.set(false);
  }

  /**
   * Handle image load success
   */
  onImageLoad(): void {
    console.log('[Lightbox] Image loaded successfully');
    this.isLoading.set(false);
    this.hasError.set(false);
  }

  /**
   * Handle image load error
   */
  onImageError(): void {
    console.error('[Lightbox] Image failed to load');
    this.isLoading.set(false);
    this.hasError.set(true);
  }
}

