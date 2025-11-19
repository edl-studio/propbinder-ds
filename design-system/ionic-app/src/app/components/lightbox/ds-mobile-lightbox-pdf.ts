import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonSpinner,
  ModalController
} from '@ionic/angular/standalone';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import { DsButtonComponent } from '@propbinder/design-system/button/ds-button';
import { DsMobileLightboxHeaderComponent } from './ds-mobile-lightbox-header';
import { DsMobileLightboxFooterComponent } from './ds-mobile-lightbox-footer';
import type { LightboxPdf, LightboxAuthor } from './ds-mobile-lightbox.service';

/**
 * DsMobileLightboxPdfComponent
 * 
 * PDF viewer component that opens PDFs in the native device viewer.
 * Uses Capacitor's File Opener to provide the best native PDF viewing experience.
 * 
 * This component is typically not used directly - use DsMobileLightboxService instead.
 * 
 * Features:
 * - Native PDF viewing (iOS/Android)
 * - Download and cache support
 * - Share functionality
 * - Loading states
 * 
 * @example
 * ```typescript
 * // Don't instantiate directly - use the service:
 * constructor(private lightbox: DsMobileLightboxService) {}
 * 
 * openPdf() {
 *   this.lightbox.openPdf({
 *     pdf: { type: 'pdf', src: 'document.pdf', title: 'My Document' }
 *   });
 * }
 * ```
 */
@Component({
  selector: 'ds-mobile-lightbox-pdf',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonSpinner,
    DsAvatarComponent,
    DsButtonComponent,
    DsMobileLightboxHeaderComponent,
    DsMobileLightboxFooterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ion-content 
      [fullscreen]="true"
      class="lightbox-content pdf-viewer">
      
      <div class="lightbox-wrapper">
        <!-- Header with author info and close button -->
        <ds-mobile-lightbox-header 
          [author]="author"
          (closeClick)="close()"
        />

        <!-- PDF Info & Actions -->
        <div class="pdf-container">
          @if (isLoading) {
            <div class="loading-state">
              <ion-spinner name="crescent"></ion-spinner>
              <p>Loading PDF...</p>
            </div>
          } @else if (hasError) {
            <div class="error-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h3>Failed to Load PDF</h3>
              <p>{{ errorMessage }}</p>
              <button class="retry-button" (click)="openPdfInNativeViewer()">
                Try Again
              </button>
            </div>
          } @else {
            <div class="pdf-content">
              <!-- PDF Icon -->
              <ds-avatar
                type="icon"
                iconName="remixFileTextLine"
                size="xl"
              />
              
              <!-- PDF Title (same as attachment fileName) -->
              <h2 class="pdf-title">{{ getDisplayTitle() }}</h2>
              
              <!-- PDF Metadata (same format as attachment: PDF · fileSize) -->
              <div class="pdf-meta">
                PDF · {{ pdf.fileSize ? formatFileSize(pdf.fileSize) : '' }}
              </div>
              
              <!-- Open Button -->
              <ds-button
                variant="secondary"
                size="lg"
                (clicked)="openPdfInNativeViewer()"
                class="open-pdf-button">
                Open
              </ds-button>
            </div>
          }
        </div>

        <!-- Bottom actions -->
        <ds-mobile-lightbox-footer
          [isLiked]="false"
          [likeCount]="0"
          [commentCount]="0"
          (likeClick)="onLikeToggle()"
          (commentClick)="onReply()"
          (shareClick)="onShare()"
        />
      </div>
    </ion-content>
  `,
  styleUrl: './ds-mobile-lightbox-pdf.css'
})
export class DsMobileLightboxPdfComponent implements OnInit {
  // Inputs (passed from service as regular properties)
  pdf!: LightboxPdf;
  author?: LightboxAuthor;

  // State
  isLoading = false;
  hasError = false;
  errorMessage = '';
  cachedFilePath?: string;

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    console.log('[PDF Lightbox] Initializing with PDF:', this.pdf);
    
    // Automatically open the PDF in native viewer
    this.openPdfInNativeViewer();
  }

  /**
   * Open the PDF in the native device viewer
   */
  async openPdfInNativeViewer(): Promise<void> {
    if (!this.pdf?.src) {
      console.error('[PDF Lightbox] No PDF source provided');
      this.hasError = true;
      this.errorMessage = 'No PDF file provided';
      return;
    }

    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    try {
      console.log('[PDF Lightbox] Opening PDF:', this.pdf.src);
      
      // Check if it's already a full URL
      let pdfUrl: string;
      
      if (this.pdf.src.startsWith('http://') || this.pdf.src.startsWith('https://')) {
        // Already a full URL
        pdfUrl = this.pdf.src;
      } else {
        // Relative path - construct full URL
        // Use current origin (which includes the dev server URL in Capacitor)
        // Remove leading slash if present to avoid double slashes
        const cleanPath = this.pdf.src.startsWith('/') ? this.pdf.src.slice(1) : this.pdf.src;
        pdfUrl = `${window.location.origin}/${cleanPath}`;
      }
      
      console.log('[PDF Lightbox] Opening PDF at URL:', pdfUrl);
      
      // Use Browser to open the PDF
      await Browser.open({ 
        url: pdfUrl,
        presentationStyle: 'fullscreen'
      });
      
      this.isLoading = false;
      
      // Close the modal after opening browser
      setTimeout(() => {
        this.close();
      }, 500);
    } catch (error: any) {
      console.error('[PDF Lightbox] Error opening PDF:', error);
      this.isLoading = false;
      this.hasError = true;
      this.errorMessage = error?.message || 'Failed to open PDF';
    }
  }

  /**
   * Download a remote PDF and open it
   */
  private async downloadAndOpenPdf(): Promise<void> {
    try {
      console.log('[PDF Lightbox] Downloading PDF from:', this.pdf.src);
      
      // Fetch the PDF
      const response = await fetch(this.pdf.src);
      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const base64Data = await this.blobToBase64(blob);
      
      // Generate a filename
      const fileName = this.pdf.title 
        ? `${this.pdf.title.replace(/[^a-z0-9]/gi, '_')}.pdf`
        : 'document.pdf';
      
      // Save to cache directory
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache
      });
      
      console.log('[PDF Lightbox] PDF saved to cache:', result.uri);
      this.cachedFilePath = result.uri;
      
      // Open using Browser
      await Browser.open({ 
        url: result.uri,
        presentationStyle: 'fullscreen'
      });
      
      console.log('[PDF Lightbox] PDF opened successfully');
    } catch (error) {
      console.error('[PDF Lightbox] Error downloading/opening PDF:', error);
      throw error;
    }
  }

  /**
   * Open a local PDF file
   */
  private async openLocalPdf(): Promise<void> {
    try {
      // Remove leading slash if present to avoid double slashes
      const cleanPath = this.pdf.src.startsWith('/') ? this.pdf.src.slice(1) : this.pdf.src;
      const fullUrl = window.location.origin + '/' + cleanPath;
      
      await Browser.open({ 
        url: fullUrl,
        presentationStyle: 'fullscreen'
      });
      
      console.log('[PDF Lightbox] Local PDF opened successfully');
    } catch (error) {
      console.error('[PDF Lightbox] Error opening local PDF:', error);
      throw error;
    }
  }

  /**
   * Convert Blob to base64 string
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Get display title with file extension
   * If title is provided, ensure it has .pdf extension
   * Otherwise, extract filename from src
   */
  getDisplayTitle(): string {
    if (this.pdf.title) {
      // If title doesn't end with .pdf, add it
      return this.pdf.title.endsWith('.pdf') ? this.pdf.title : `${this.pdf.title}.pdf`;
    }
    
    // Extract filename from src
    if (this.pdf.src) {
      const filename = this.pdf.src.split('/').pop() || 'PDF Document.pdf';
      return filename;
    }
    
    return 'PDF Document.pdf';
  }

  /**
   * Format file size for display
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Share the PDF
   */
  async onShare(): Promise<void> {
    console.log('[PDF Lightbox] Share button clicked');
    
    if (!this.pdf?.src) return;
    
    try {
      await Share.share({
        title: this.pdf.title || 'PDF Document',
        text: this.pdf.description || '',
        url: this.pdf.src,
        dialogTitle: 'Share PDF'
      });
      
      console.log('[PDF Lightbox] PDF shared successfully');
    } catch (error) {
      console.error('[PDF Lightbox] Error sharing PDF:', error);
    }
  }

  /**
   * Close the PDF viewer
   */
  close(): void {
    this.modalController.dismiss();
  }

  /**
   * Handle like toggle
   */
  onLikeToggle(): void {
    console.log('[PDF Lightbox] Like toggled');
    // TODO: Implement like logic for PDFs if needed
  }

  /**
   * Handle reply/comment
   * Close the lightbox and signal to open post detail with comment focus
   */
  onReply(): void {
    console.log('[PDF Lightbox] Reply button clicked');
    this.modalController.dismiss({ action: 'comment' });
  }
}

