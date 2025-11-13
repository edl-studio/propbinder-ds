import { Component, input, output, ViewEncapsulation, signal, ContentChild, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';
import { DsAvatarComponent } from '../avatar/ds-avatar';

/**
 * A drawer header component for viewing details of items.
 * Displays an optional avatar, title on the left, and a close button on the right.
 * 
 * @example
 * With avatar initials:
 * ```html
 * <ds-drawer-header-default 
 *   title="Ruggeri VVS & El"
 *   [avatarInitials]="'R'"
 *   (onClose)="close()"
 *   slot="header" />
 * ```
 * 
 * Without avatar:
 * ```html
 * <ds-drawer-header-default 
 *   title="Inquiry Details"
 *   (onClose)="close()"
 *   slot="header" />
 * ```
 * 
 * Custom avatar via slot:
 * ```html
 * <ds-drawer-header-default title="Custom Entity" slot="header">
 *   <ds-avatar slot="avatar" [initials]="'AB'" size="md" />
 * </ds-drawer-header-default>
 * ```
 */
@Component({
  selector: 'ds-drawer-header-default',
  standalone: true,
  imports: [CommonModule, DsButtonComponent, DsIconComponent, DsAvatarComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-drawer-header-default.css'],
  template: `
    <div class="ds-drawer-header-default">
      <div class="ds-drawer-header-default__left">
        <!-- Custom avatar slot takes precedence -->
        <ng-content select="[slot=avatar]"></ng-content>
        @if (!hasAvatarSlot() && (avatarInitials() || avatarSrc())) {
          <ds-avatar
            [type]="avatarSrc() ? 'photo' : 'initials'"
            [initials]="avatarInitials() || ''"
            [src]="avatarSrc() || ''"
            [size]="avatarSize()"
          />
        }
        <h2 class="ds-drawer-header-default__title heading-xl">{{ title() }}</h2>
      </div>
      <div class="ds-drawer-header-default__right">
        @if (showClose()) {
          <ds-button 
            variant="ghost" 
            [iconOnly]="true"
            ariaLabel="Close drawer"
            (clicked)="onClose.emit()">
            <ds-icon slot="leading" name="remixCloseLine" size="18px" />
          </ds-button>
        }
      </div>
    </div>
  `
})
export class DsDrawerHeaderDefaultComponent implements AfterContentInit {
  // Title (required)
  title = input.required<string>();
  
  // Avatar inputs (optional - can use slot instead)
  avatarInitials = input<string>();
  avatarSrc = input<string>();
  avatarSize = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  
  // Close button
  showClose = input(true);
  
  // Track if avatar slot has content
  hasAvatarSlot = signal(false);
  
  @ContentChild('[slot=avatar]') avatarSlot?: any;
  
  ngAfterContentInit() {
    this.hasAvatarSlot.set(!!this.avatarSlot);
  }
  
  // Events
  onClose = output<void>();
}

