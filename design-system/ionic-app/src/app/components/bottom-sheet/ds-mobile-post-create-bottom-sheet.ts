import { Component, signal, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/angular/standalone';
import { Keyboard } from '@capacitor/keyboard';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StatusBar } from '@capacitor/status-bar';
import { DsButtonComponent } from '@propbinder/design-system/button/ds-button';
import { DsIconButtonComponent } from '@propbinder/design-system/button/ds-icon-button';

/**
 * DsMobilePostCreateBottomSheetComponent
 * 
 * Bottom sheet modal for creating new posts in the community feed.
 * This is the modal content that gets displayed in the bottom sheet.
 * Features Threads-inspired interface with rich text editing capabilities.
 * 
 * Auto-focuses the textarea and brings up the keyboard when opened.
 * 
 * Usage: Use with DsMobileBottomSheetService to present as a bottom sheet
 */
@Component({
  selector: 'ds-mobile-post-create-bottom-sheet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    DsButtonComponent,
    DsIconButtonComponent
  ],
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    /* ============================================
       HEADER
       ============================================ */
    
    ion-header {
      box-shadow: none;
    }

    ion-toolbar {
      --background: var(--color-background-neutral-primary, #ffffff);
      --border-width: 0 0 1px 0;
      --border-color: var(--border-color-default);
      --padding-top: 12px;
      --padding-bottom: 8px;
      --min-height: 56px;
    }

    ion-title {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 600;
      line-height: 22px;
      letter-spacing: -0.4px;
      color: var(--color-text-primary, #1a1a1a);
    }

    ion-button {
      --color: var(--color-text-secondary, #737373);
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 400;
    }

    /* Make Post button pill-shaped */
    ion-buttons[slot="end"] ds-button {
      --border-radius: 100px;
    }
    
    ion-buttons[slot="end"] ds-button::ng-deep button {
      border-radius: 100px;
    }
    
    /* Make Cancel button pill-shaped */
    ion-buttons[slot="start"] ds-button {
      --border-radius: 100px;
    }
    
    ion-buttons[slot="start"] ds-button::ng-deep button {
      border-radius: 100px;
    }

    /* ============================================
       CONTENT AREA
       ============================================ */
    
    ion-content {
      --background: var(--color-background-neutral-primary, #ffffff);
      --padding-top: 0;
      --padding-bottom: 0;
    }

    .post-create-container {
      padding: 24px 16px 16px;
      max-width: 640px;
      margin: 0 auto;
    }
    
    .post-composer {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    
    .post-composer__main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .post-composer__header {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 32px;
    }
    
    .post-composer__username {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
    }
    
    .post-composer__textarea {
      width: 100%;
      min-height: 60px;
      max-height: 400px;
      border: none;
      outline: none;
      resize: none;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
      background: transparent;
      padding: 0;
      cursor: text;
      overflow-y: auto;
      /* Auto-resize as user types */
      field-sizing: content;
    }
    
    .post-composer__textarea::placeholder {
      color: var(--color-text-tertiary, #999999);
    }
    
    /* Visual focus indicator - helps users see the textarea is ready */
    .post-composer__textarea:focus {
      outline: none;
    }
    
    /* Subtle animation to draw attention when empty */
    @keyframes gentlePulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    
    .post-composer__textarea:not(:focus):empty + .focus-hint {
      animation: gentlePulse 2s ease-in-out 1;
    }
    
    .post-composer__actions {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-top: 12px;
    }
    
    .post-composer__actions ds-icon-button::ng-deep button {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    
    /* ============================================
       IMAGE PREVIEW
       ============================================ */
    
    .image-previews {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    
    .image-preview {
      position: relative;
      width: 96px;
      height: 96px;
      border-radius: 12px;
      overflow: visible;
    }
    
    .preview-image {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 12px;
      border: 1px solid var(--border-color-default);
      object-fit: cover;
    }
    
    .remove-image-btn {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      border: 2px solid white;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 0;
    }
    
    .remove-image-btn:hover {
      background: rgba(0, 0, 0, 0.8);
      transform: scale(1.05);
    }
    
    .remove-image-btn:active {
      transform: scale(0.95);
    }
    
    /* ============================================
       MOBILE OPTIMIZATIONS
       ============================================ */
    
    @media (max-width: 768px) {
      .post-create-container {
        padding: 12px 16px 24px;
      }

      .post-composer__textarea {
        min-height: 60px;
        max-height: 300px;
        /* Make tap target larger on mobile */
        padding: 8px;
        margin: -8px;
      }
    }
  `],
  template: `
    <!-- Header with cancel and post buttons -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ds-button
            variant="secondary"
            size="sm"
            (clicked)="handleCancel()">
            Cancel
          </ds-button>
        </ion-buttons>
        <ion-title>{{ modalTitle() }}</ion-title>
        <ion-buttons slot="end">
          <ds-button
            variant="primary"
            size="sm"
            [disabled]="!canPost()"
            (clicked)="handlePost()">
            {{ submitButtonLabel() }}
          </ds-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <div class="post-create-container">
        <div class="post-composer">
          <div class="post-composer__main">
            <textarea
              #textareaInput
              class="post-composer__textarea"
              [(ngModel)]="postContent"
              [placeholder]="placeholder()"
              [readonly]="isReadonly"
              (input)="handleInput()"
              (focus)="handleFocus()"
              inputmode="text"
              enterkeyhint="done"
              rows="1">
            </textarea>
            
            <!-- Image Previews -->
            @if (selectedImages().length > 0) {
              <div class="image-previews">
                @for (image of selectedImages(); track image; let i = $index) {
                  <div class="image-preview">
                    <img [src]="image" alt="Selected image" class="preview-image" />
                    <button 
                      class="remove-image-btn" 
                      (click)="handleRemoveImage(i)"
                      type="button"
                      aria-label="Remove image">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    </button>
                  </div>
                }
              </div>
            }
            
            <div class="post-composer__actions">
              <ds-icon-button
                icon="remixImageLine"
                variant="secondary"
                size="md"
                (clicked)="handleAddImage()"
                aria-label="Add image">
              </ds-icon-button>
              <ds-icon-button
                icon="remixAttachmentLine"
                variant="secondary"
                size="md"
                (clicked)="handleAddAttachment()"
                aria-label="Add attachment">
              </ds-icon-button>
              
              <!-- Hidden file input for file selection -->
              <input
                #fileInput
                type="file"
                accept="*/*"
                multiple
                (change)="handleFileSelect($event)"
                style="display: none;"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `
})
export class DsMobilePostCreateBottomSheetComponent implements AfterViewInit, OnInit {
  @ViewChild('textareaInput') textareaInput?: ElementRef<HTMLTextAreaElement>;
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  
  // Optional input to control auto-focus behavior
  autoFocus = true;
  
  // Control readonly state for keyboard trick
  isReadonly = true;
  
  // Edit mode properties - can be set via componentProps
  isEditMode = false;
  postId?: string;
  initialContent = '';
  
  postContent = '';
  selectedImages = signal<string[]>([]);
  username = signal('Lars Mikkelsen');
  placeholder = signal("What's new?");
  modalTitle = signal('New post');
  submitButtonLabel = signal('Post');
  
  constructor(
    private modalController: ModalController,
    private elementRef: ElementRef
  ) {}
  
  /**
   * Ensure toolbar doesn't have unnecessary padding
   * Modal is already positioned below status bar, so no extra safe area needed
   */
  private applySafeAreaToToolbar(): void {
    try {
      const hostElement = this.elementRef?.nativeElement;
      if (hostElement) {
        const header = hostElement.querySelector('ion-header');
        if (header) {
          const toolbar = header.querySelector('ion-toolbar');
          if (toolbar) {
            const toolbarElement = toolbar as HTMLElement;
            // Ensure toolbar uses standard padding (no safe area since modal is already offset)
            toolbarElement.style.setProperty('--padding-top', '12px', 'important');
            toolbarElement.style.setProperty('--min-height', '56px', 'important');
          }
        }
      }
    } catch (e) {
      console.log('[SafeArea] Failed to apply to toolbar:', e);
    }
  }
  
  ngOnInit(): void {
    // Initialize edit mode if provided
    if (this.isEditMode && this.initialContent) {
      this.postContent = this.initialContent;
      this.modalTitle.set('Edit post');
      this.submitButtonLabel.set('Save');
    }
  }
  
  ngAfterViewInit(): void {
    // Apply safe area padding immediately to prevent corruption
    this.applySafeAreaToToolbar();
    
    // Auto-resize textarea if there's initial content (edit mode)
    if (this.postContent && this.textareaInput) {
      setTimeout(() => {
        this.resizeTextarea();
      }, 0);
    }
    
    // Try to focus IMMEDIATELY - no delay
    // This maximizes our chance of being in user gesture context
    if (this.autoFocus && this.textareaInput) {
      const textarea = this.textareaInput.nativeElement;
      
      // Remove readonly immediately
      this.isReadonly = false;
      
      // Try focusing with minimal delay
      setTimeout(() => {
        textarea.focus();
        textarea.click();
        
        // Explicitly show keyboard
        Keyboard.show().catch(e => console.log('Keyboard.show() not available'));
        
        // iOS sometimes needs a second attempt
        setTimeout(() => {
          textarea.focus();
          Keyboard.show().catch(e => console.log('Keyboard.show() not available'));
        }, 100);
      }, 10);
    }
  }
  
  /**
   * Ionic lifecycle hook - called when modal enters view
   * At 95% height, this acts more like a page than a modal
   * which might allow keyboard to open
   */
  ionViewDidEnter(): void {
    // Resize textarea in case initial attempt didn't work
    if (this.postContent && this.textareaInput) {
      this.resizeTextarea();
    }
    
    // Final focus attempt when view fully enters
    if (this.autoFocus && this.textareaInput) {
      this.isReadonly = false;
      const textarea = this.textareaInput.nativeElement;
      
      // Try to focus as if this was a page navigation
      textarea.focus();
      textarea.click();
      
      // Explicitly show keyboard
      Keyboard.show().catch(e => console.log('Keyboard.show() not available'));
      
      // Set cursor position
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }
  
  handleFocus(): void {
    // When user focuses (or we focus programmatically), remove readonly
    this.isReadonly = false;
    // Explicitly show keyboard
    Keyboard.show().catch(e => console.log('Keyboard.show() not available'));
  }
  
  handleInput(): void {
    this.resizeTextarea();
  }
  
  /**
   * Auto-resize textarea based on content
   */
  private resizeTextarea(): void {
    if (this.textareaInput) {
      const textarea = this.textareaInput.nativeElement;
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height based on content, respecting min/max from CSS
      textarea.style.height = Math.min(textarea.scrollHeight, 400) + 'px';
    }
  }
  
  canPost(): boolean {
    return this.postContent.trim().length > 0 || this.selectedImages().length > 0;
  }
  
  async handleCancel(): Promise<void> {
    if (this.postContent.trim().length > 0 || this.selectedImages().length > 0) {
      // Show confirmation
      const confirmed = confirm('Discard this post?');
      if (confirmed) {
        await this.modalController.dismiss(null, 'cancel');
      }
    } else {
      await this.modalController.dismiss(null, 'cancel');
    }
  }
  
  async handlePost(): Promise<void> {
    if (!this.canPost()) return;
    
    if (this.isEditMode) {
      console.log('Updating post:', this.postId, this.postContent);
    } else {
      console.log('Creating post:', this.postContent, 'with images:', this.selectedImages().length);
    }
    
    // Pass the post content, images, and edit info back to the parent
    await this.modalController.dismiss(
      { 
        content: this.postContent,
        images: this.selectedImages(),
        timestamp: new Date(),
        isEdit: this.isEditMode,
        postId: this.postId
      },
      'post'
    );
  }
  
  async handleAddImage(): Promise<void> {
    console.log('Add image button clicked');
    
    // Re-apply safe area padding before opening camera (preventive)
    // This ensures the value is locked in before iOS corrupts it
    this.applySafeAreaToToolbar();
    
    try {
      console.log('Requesting photo from library...');
      
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Only show photo library, not camera
      });

      console.log('Photo selected successfully:', image);
      
      // Add the image path to the array
      if (image.webPath) {
        this.selectedImages.update(images => [...images, image.webPath!]);
        console.log('Image added to preview:', image.webPath);
      }
      
      // Re-apply safe area padding immediately after returning
      // Since we're using fixed values, this won't cause flickering
      requestAnimationFrame(() => {
        this.applySafeAreaToToolbar();
      });
      
      // Restore StatusBar configuration (background task)
      this.restoreStatusBar();
      
    } catch (error) {
      console.error('Photo selection error:', error);
      // Only show alert for non-cancellation errors
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as any).message;
        if (!errorMessage.includes('cancel')) {
          alert(`Error selecting photo: ${JSON.stringify(error)}`);
        }
      }
    }
  }
  
  /**
   * Restore StatusBar configuration (background task)
   * Safe area padding is now handled preventively via applySafeAreaToToolbar()
   */
  private restoreStatusBar(): void {
    setTimeout(async () => {
      try {
        await StatusBar.setBackgroundColor({ color: '#221a4c' });
        await StatusBar.setOverlaysWebView({ overlay: false });
      } catch (e) {
        // StatusBar API not available, ignore
      }
    }, 0);
  }
  
  handleRemoveImage(index: number): void {
    console.log('Removing image at index:', index);
    this.selectedImages.update(images => images.filter((_, i) => i !== index));
  }
  
  handleAddAttachment(): void {
    console.log('Add attachment button clicked');
    // Trigger the hidden file input
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
  
  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }
    
    console.log('Files selected:', files.length);
    
    // Process each selected file
    Array.from(files).forEach(file => {
      console.log('File:', file.name, file.type, file.size);
      
      // Create a data URL for preview (for images and other files)
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          // Add to selectedImages array for preview
          this.selectedImages.update(images => [...images, result]);
          console.log('File added to preview:', file.name);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input so the same file can be selected again
    input.value = '';
  }
}

