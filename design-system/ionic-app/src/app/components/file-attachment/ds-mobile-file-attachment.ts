import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';

/**
 * DsMobileFileAttachmentComponent
 * 
 * File attachment display for various document types.
 * Shows file info card with icon, filename, and file size.
 * Supports PDF and generic document formats.
 * Emits click event to open file in viewer.
 * 
 * @example
 * ```html
 * <ds-mobile-file-attachment
 *   [fileName]="'Document.pdf'"
 *   [fileSize]="'1.2 MB'"
 *   [variant]="'pdf'"
 *   (fileClick)="openFile()">
 * </ds-mobile-file-attachment>
 * ```
 */
@Component({
  selector: 'ds-mobile-file-attachment',
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
    
    .file-avatar {
      flex-shrink: 0;
    }
    
    .file-avatar.pdf::ng-deep .avatar--icon {
      background-color: #ff5757 !important;
    }
    
    .file-avatar.doc::ng-deep .avatar--icon {
      background-color: var(--color-blue-base, #3B82F6) !important;
    }
    
    .file-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    
    .file-name {
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
    
    .file-meta {
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
    <div class="file-avatar" [class.pdf]="variant() === 'pdf'" [class.doc]="variant() === 'doc'">
      <ds-avatar
        type="icon"
        [iconName]="getIconName()"
        size="md"
      />
    </div>
    
    <div class="file-info">
      <div class="file-name">{{ fileName() }}</div>
      @if (fileSize()) {
        <div class="file-meta">{{ getFileTypeLabel() }} · {{ fileSize() }}</div>
      } @else {
        <div class="file-meta">{{ getFileTypeLabel() }}</div>
      }
    </div>
    
    <ds-icon 
      name="remixArrowRightSLine" 
      size="20px"
      class="open-icon"
    />
  `
})
export class DsMobileFileAttachmentComponent {
  /**
   * File name
   */
  fileName = input<string>('Document');
  
  /**
   * File size display (e.g., "1.2 MB")
   */
  fileSize = input<string>('');
  
  /**
   * File type variant
   * - 'pdf' - PDF document (red icon)
   * - 'doc' - Generic document (blue icon)
   */
  variant = input<'pdf' | 'doc'>('doc');
  
  /**
   * Emits when the file attachment is clicked
   */
  fileClick = output<void>();
  
  /**
   * Get the appropriate icon name based on variant
   */
  getIconName(): string {
    return this.variant() === 'pdf' ? 'remixFileTextLine' : 'remixAttachmentLine';
  }
  
  /**
   * Get the file type label based on variant
   */
  getFileTypeLabel(): string {
    return this.variant() === 'pdf' ? 'PDF' : 'DOC';
  }
  
  handleClick(event: Event): void {
    event.stopPropagation();
    this.fileClick.emit();
  }
}

