import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';
import { DsMobileInteractiveListItemComponent } from '../interactive-list-item';

/**
 * DsMobileContactListItemComponent
 * 
 * Specialized interactive list item for displaying contacts.
 * Built on top of ds-mobile-interactive-list-item base component.
 * Displays contact name with avatar initials and metadata (person name + phone number).
 * 
 * @example
 * ```html
 * <ds-mobile-contact-list-item
 *   [name]="'Mortensen & Søn ApS'"
 *   [initials]="'M'"
 *   [contactPerson]="'John Mortensen'"
 *   [phoneNumber]="'+45 12 34 56 78'"
 *   [clickable]="true"
 *   (contactClick)="openContact()">
 * </ds-mobile-contact-list-item>
 * ```
 */
@Component({
  selector: 'ds-mobile-contact-list-item',
  standalone: true,
  imports: [CommonModule, DsIconComponent, DsAvatarComponent, DsMobileInteractiveListItemComponent],
  styles: [`
    :host {
      display: block;
    }
    
    :host ::ng-deep ds-mobile-interactive-list-item {
      align-items: center;
    }
    
    :host ::ng-deep .content-leading {
      align-items: center;
    }
    
    :host ::ng-deep .content-trailing {
      align-items: center;
    }

    .contact-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }
    
    .contact-name {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .contact-meta {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-xs);
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: -0.26px;
      color: var(--color-text-tertiary, #737373);
      display: flex;
      align-items: center;
      gap: 4px;
      margin: 0;
    }
    
    .meta-separator {
      color: var(--color-text-tertiary, #a0a0a0);
    }
    
    .contact-trailing {
      display: flex;
      align-items: center;
      color: var(--color-text-tertiary, #a3a3a3);
    }
  `],
  template: `
    <ds-mobile-interactive-list-item
      [leadingSize]="'32px'"
      [clickable]="clickable()"
      (itemClick)="handleContactClick()"
      (longPress)="handleLongPress()">
      
      <div content-leading>
        <ds-avatar
          [initials]="initials()"
          type="initials"
          size="md"
        />
      </div>
      
      <div content-main>
        <div class="contact-content">
          <div class="contact-name">{{ name() }}</div>
          
          @if (contactPerson() || phoneNumber()) {
            <div class="contact-meta">
              @if (contactPerson()) {
                <span>{{ contactPerson() }}</span>
              }
              @if (contactPerson() && phoneNumber()) {
                <span class="meta-separator">·</span>
              }
              @if (phoneNumber()) {
                <span>{{ phoneNumber() }}</span>
              }
            </div>
          }
        </div>
      </div>
      
      @if (showChevron()) {
        <div content-trailing>
          <div class="contact-trailing">
            <ds-icon name="remixArrowRightSLine" size="20px" />
          </div>
        </div>
      }
    </ds-mobile-interactive-list-item>
  `
})
export class DsMobileContactListItemComponent {
  /**
   * Contact/company name
   */
  name = input.required<string>();
  
  /**
   * Avatar initials (usually 1-2 letters)
   */
  initials = input.required<string>();
  
  /**
   * Contact person name (optional)
   */
  contactPerson = input<string>('');
  
  /**
   * Phone number (optional)
   */
  phoneNumber = input<string>('');
  
  /**
   * Whether the contact item is clickable
   */
  clickable = input<boolean>(true);
  
  /**
   * Whether to show chevron icon
   */
  showChevron = input<boolean>(true);
  
  /**
   * Emits when the contact item is clicked (if clickable)
   */
  contactClick = output<void>();
  
  /**
   * Emits when the contact item is long-pressed
   */
  longPress = output<void>();
  
  handleContactClick(): void {
    this.contactClick.emit();
  }
  
  handleLongPress(): void {
    this.longPress.emit();
  }
}

