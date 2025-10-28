import { Component, ViewEncapsulation, input, output, computed, signal, HostListener, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DsIconComponent } from '../icon/ds-icon';

export interface DsMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  destructive?: boolean;
  action?: () => void;
  separator?: boolean;
}

/**
 * A menu component for displaying contextual actions.
 * Perfect for dropdown actions, context menus, and navigation menus.
 * 
 * @example
 * With button trigger:
 * ```html
 * <ds-menu [items]="menuItems">
 *   <ds-button variant="secondary">Actions</ds-button>
 * </ds-menu>
 * ```
 * 
 * @example
 * With icon button trigger:
 * ```html
 * <ds-menu [items]="menuItemsWithIcons">
 *   <ds-icon-button icon="remixMoreLine" variant="ghost" ariaLabel="More options" />
 * </ds-menu>
 * ```
 * 
 * @example
 * With custom trigger:
 * ```html
 * <ds-menu [items]="menuItems">
 *   <button class="my-custom-trigger">Custom</button>
 * </ds-menu>
 * ```
 */
@Component({
  selector: 'ds-menu',
  standalone: true,
  imports: [CommonModule, DsIconComponent, OverlayModule, CdkOverlayOrigin],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-menu.css'],
  template: `
    <div [class]="containerClasses()">
      <div 
        #trigger
        cdkOverlayOrigin
        #triggerOrigin="cdkOverlayOrigin"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'menu'"
        (click)="toggleMenu()"
        class="ds-menu__trigger-wrapper"
      >
        <ng-content></ng-content>
      </div>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="triggerOrigin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayHasBackdrop]="false"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (backdropClick)="closeMenu()"
      (detach)="closeMenu()"
    >
      <div class="ds-menu__dropdown" [style.min-width.px]="triggerWidth">
        <div class="ds-menu__items" role="menu">
          @for (item of items(); track item.id) {
            @if (item.separator) {
              <div class="ds-menu__separator"></div>
            } @else {
              <button
                [class]="getItemClass(item)"
                [disabled]="item.disabled"
                [attr.aria-label]="item.label"
                (click)="handleItemClick(item)"
                role="menuitem"
                type="button"
              >
              @if (item.icon) {
                <ds-icon 
                  [name]="item.icon" 
                  size="16px" 
                  class="ds-menu__item-icon"
                />
              }
              <span class="body-sm-regular">{{ item.label }}</span>
              </button>
            }
          }
        </div>
      </div>
    </ng-template>
  `
})
export class DsMenuComponent {
  @ViewChild('trigger', { read: ElementRef }) triggerElement!: ElementRef<HTMLElement>;
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideMenu = target.closest('.ds-menu');
    const isInsideDropdown = target.closest('.ds-menu__dropdown');
    
    if (!isInsideMenu && !isInsideDropdown && this.isOpen()) {
      this.closeMenu();
    }
  }
  // Inputs
  items = input.required<DsMenuItem[]>();

  // Outputs
  itemClicked = output<DsMenuItem>();
  opened = output<void>();
  closed = output<void>();

  // Internal state
  private isOpenSig = signal<boolean>(false);

  isOpen = computed(() => this.isOpenSig());

  // Overlay configuration
  triggerWidth = 0;
  
  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ];

  toggleMenu() {
    const newState = !this.isOpenSig();
    
    if (newState && this.triggerElement) {
      this.triggerWidth = this.triggerElement.nativeElement.offsetWidth;
    }
    
    this.isOpenSig.set(newState);
    if (newState) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  closeMenu() {
    if (this.isOpenSig()) {
      this.isOpenSig.set(false);
      this.closed.emit();
    }
  }

  handleItemClick(item: DsMenuItem) {
    if (item.disabled) return;
    
    this.itemClicked.emit(item);
    if (item.action) {
      item.action();
    }
    
    // Close the menu after item click
    this.closeMenu();
  }

  containerClasses = computed(() => {
    const classes = ['ds-menu'];
    if (this.isOpen()) classes.push('ds-menu--open');
    return classes.join(' ');
  });

  getItemClass(item: DsMenuItem): string {
    const classes = ['ds-menu__item'];
    if (item.destructive) classes.push('ds-menu__item--destructive');
    return classes.join(' ');
  }
}

