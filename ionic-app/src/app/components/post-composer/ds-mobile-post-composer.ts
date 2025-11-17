import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';

/**
 * DsMobilePostComposerComponent
 * 
 * A "fake" input composer for creating new posts in the community feed.
 * Features a user avatar, placeholder input, and post button.
 * Clicking opens the full post creation modal/page.
 * 
 * @example
 * ```html
 * <ds-mobile-post-composer
 *   [avatarInitials]="'LM'"
 *   [avatarType]="'photo'"
 *   [avatarSrc]="'...'"
 *   (composerClick)="openPostCreator()">
 * </ds-mobile-post-composer>
 * ```
 */
@Component({
  selector: 'ds-mobile-post-composer',
  standalone: true,
  imports: [CommonModule, DsAvatarComponent],
  host: {
    '(click)': 'handleClick()'
  },
  styles: [`
    :host {
      display: block;
      max-width: 640px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .composer-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .composer-input-wrapper {
      flex: 1;
      min-width: 0;
    }
    
    .composer-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 24px;
      padding: 10px 16px;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.3px;
      color: rgba(255, 255, 255, 0.5);
      outline: none;
      cursor: pointer;
      transition: all 0.2s ease;
      pointer-events: none;
      user-select: none;
    }
    
    .composer-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
      opacity: 1;
    }
    
    /* Hover effects for desktop */
    @media (hover: hover) {
      :host:hover .composer-input {
        opacity: 0.8;
      }
    }
  `],
  template: `
    <div class="composer-container">
      <ds-avatar 
        [initials]="avatarInitials()"
        [type]="avatarType()"
        [src]="avatarSrc()"
        [iconName]="avatarIconName()"
        size="md" />
      
      <div class="composer-input-wrapper">
        <input 
          type="text" 
          class="composer-input" 
          [placeholder]="placeholder()"
          readonly
          tabindex="-1"
        />
      </div>
    </div>
  `
})
export class DsMobilePostComposerComponent {
  /**
   * Avatar initials (for initials type)
   */
  avatarInitials = input<string>('');
  
  /**
   * Avatar type
   */
  avatarType = input<'initials' | 'photo' | 'icon'>('initials');
  
  /**
   * Avatar photo source (for photo type)
   */
  avatarSrc = input<string>('');
  
  /**
   * Icon name (for icon type avatars)
   */
  avatarIconName = input<string>('remixUser3Fill');
  
  /**
   * Placeholder text for the input
   */
  placeholder = input<string>("What's new?");
  
  /**
   * Text for the post button
   */
  buttonText = input<string>('Post');
  
  /**
   * Emits when the composer is clicked
   */
  composerClick = output<void>();
  
  handleClick(): void {
    this.composerClick.emit();
  }
}

