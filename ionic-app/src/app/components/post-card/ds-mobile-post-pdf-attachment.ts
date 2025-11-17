import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';

/**
 * PostPdfAttachmentComponent
 * 
 * PDF file attachment display for posts.
 * Shows PDF info card with icon, filename, and file size.
 * Emits click event to open PDF in viewer.
 */
@Component({
  selector: 'post-pdf-attachment',
  standalone: true,
  imports: [CommonModule, DsAvatarComponent, DsIconComponent],
  host: {
    '(click)': 'handleClick($event)'
  },
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--color-background-neutral-secondary, #f5f5f5);
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    :host:hover {
      background: var(--color-background-neutral-secondary-hover, #ebebeb);
    }
    
    :host:active {
      transform: scale(0.98);
    }
    
    .pdf-avatar {
      flex-shrink: 0;
    }
    
    .pdf-avatar::ng-deep .avatar--icon {
      background-color: #ff5757 !important;
    }
    
    .pdf-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    
    .pdf-name {
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
    
    .pdf-meta {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: -0.26px;
      color: var(--color-text-tertiary, #737373);
    }
    
    .open-icon {
      color: var(--color-text-tertiary, #a3a3a3);
      flex-shrink: 0;
    }
  `],
  template: `
    <div class="pdf-avatar">
      <ds-avatar
        type="icon"
        iconName="remixFileTextLine"
        size="md"
      />
    </div>
    
    <div class="pdf-info">
      <div class="pdf-name">{{ fileName() }}</div>
      <div class="pdf-meta">PDF · {{ fileSize() }}</div>
    </div>
    
    <ds-icon 
      name="remixArrowRightSLine" 
      size="24px"
      class="open-icon"
    />
  `
})
export class PostPdfAttachmentComponent {
  /**
   * PDF file name
   */
  fileName = input<string>('Document.pdf');
  
  /**
   * File size display (e.g., "1.2 MB")
   */
  fileSize = input<string>('');
  
  /**
   * Emits when the PDF attachment is clicked
   */
  pdfClick = output<void>();
  
  handleClick(event: Event): void {
    event.stopPropagation();
    this.pdfClick.emit();
  }
}

