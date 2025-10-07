import { Component, ViewEncapsulation, input, output, signal, computed, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsSidebarComponent, SidebarGroup } from '../sidebar/ds-sidebar';
import { DsTopbarComponent } from '../topbar/ds-topbar';
import { ViewportService } from '../../../lib/viewport.service';

/**
 * Available slots for content projection in DsAppLayout:
 * - topbar: Projects content into the top bar area of the layout
 * - default: Default slot for main content (no slot attribute needed)
 */
export type DsAppLayoutSlots = 'topbar';

@Component({
  selector: 'ds-app-layout',
  standalone: true,
  imports: [CommonModule, DsSidebarComponent, DsTopbarComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-app-layout.css'],
  template: `
    <div 
      class="app-layout" 
      [class.app-layout--mobile]="isMobile()"
      [class.app-layout--sidebar-open]="shouldShowMobileDrawer()"
      [class.app-layout--sidebar-collapsed]="shouldCollapseSidebar()"
      [class.app-layout--scrolled]="isScrolledSig()"
      role="application"
      aria-label="Application layout"
    >
      <!-- Mobile minimized sidebar (always present on mobile) -->
      @if (isMobile()) {
        <div class="app-layout__sidebar app-layout__sidebar--minimized">
          <ds-sidebar
            mode="minimized"
            [groups]="[]"
            [collapsed]="true"
            [activeItemId]="activeItemId()"
            (toggleCollapsed)="toggleMobileMenu()"
          />
        </div>
      }

      <!-- Mobile drawer (always in DOM for animation) -->
      @if (isMobile()) {
        <div class="app-layout__drawer" [class.app-layout__drawer--open]="shouldShowMobileDrawer()">
          <ds-sidebar
            mode="drawer"
            [groups]="sidebarGroups()"
            [collapsed]="false"
            [activeItemId]="activeItemId()"
            (itemSelected)="handleSidebarItemSelected()"
            (toggleCollapsed)="closeMobileMenu()"
          />
        </div>
      }

      <!-- Desktop sidebar -->
      @if (!isMobile()) {
        <div class="app-layout__sidebar app-layout__sidebar--desktop">
          <ds-sidebar
            mode="default"
            [groups]="sidebarGroups()"
            [collapsed]="shouldCollapseSidebar()"
            [activeItemId]="activeItemId()"
            (itemSelected)="handleSidebarItemSelected()"
            (collapsedChange)="handleSidebarCollapsedChange($event)"
          />
        </div>
      }

      <!-- Mobile overlay (always in DOM for animation) -->
      @if (isMobile()) {
        <div 
          class="app-layout__overlay"
          [class.app-layout__overlay--visible]="shouldShowMobileOverlay()"
          (click)="closeMobileMenu()"
          role="presentation"
          aria-hidden="true"
        ></div>
      }

      <!-- Main content area -->
      <div class="app-layout__main" (scroll)="handleContentScroll($event)">
        <div class="app-layout__topbar">
          <ng-content select="[slot=topbar]"></ng-content>
        </div>
        
        <div class="app-layout__content">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class DsAppLayoutComponent implements OnDestroy {
  // Inputs - using input signals for better reactivity
  sidebarGroups = input<SidebarGroup[]>([]);
  isSidebarCollapsed = input<boolean>(true); // Default to collapsed
  activeItemId = input<string>();

  // Optional override for mobile detection - if not provided, use ViewportService
  isMobileOverride = input<boolean | undefined>(undefined);

  // Use viewport service for automatic mobile detection, with optional override
  isMobile = computed(() => {
    const override = this.isMobileOverride();
    return override !== undefined ? override : this.viewportService.isMobile();
  });

  constructor(private viewportService: ViewportService) {}

  // Internal state
  private mobileMenuOpenSig = signal(false);
  protected isScrolledSig = signal(false);
  
  // Outputs
  menuOpenChange = output<boolean>();
  collapsedChange = output<boolean>();

  // Computed properties for clean template logic
  shouldShowMobileDrawer = computed(() => 
    this.isMobile() && this.mobileMenuOpenSig()
  );
  
  shouldShowMobileOverlay = computed(() => 
    this.isMobile() && this.mobileMenuOpenSig()
  );
  
  shouldCollapseSidebar = computed(() => 
    !this.isMobile() && this.isSidebarCollapsed()
  );

  // Effect to handle mobile state changes
  private mobileStateEffect = effect(() => {
    // When switching from mobile to desktop, ensure mobile menu is closed
    if (!this.isMobile() && this.mobileMenuOpenSig()) {
      this.mobileMenuOpenSig.set(false);
      this.restoreBodyScroll();
    }
  });

  ngOnDestroy() {
    // Cleanup: restore body scroll if component is destroyed while menu is open
    this.restoreBodyScroll();
  }

  toggleMobileMenu() {
    // Only allow toggle in mobile mode
    if (!this.isMobile()) return;
    
    const isCurrentlyOpen = this.mobileMenuOpenSig();
    const newState = !isCurrentlyOpen;
    
    this.mobileMenuOpenSig.set(newState);
    this.menuOpenChange.emit(newState);
    
    // Handle body scroll prevention
    if (newState) {
      this.preventBodyScroll();
    } else {
      this.restoreBodyScroll();
    }
  }

  closeMobileMenu() {
    if (!this.mobileMenuOpenSig()) return;
    
    this.mobileMenuOpenSig.set(false);
    this.menuOpenChange.emit(false);
    this.restoreBodyScroll();
  }

  handleSidebarItemSelected() {
    // Auto-close mobile menu when item is selected
    if (this.isMobile() && this.mobileMenuOpenSig()) {
      this.closeMobileMenu();
    }
  }

  handleSidebarCollapsedChange(collapsed: boolean) {
    // Only emit for desktop sidebar changes
    if (!this.isMobile()) {
      this.collapsedChange.emit(collapsed);
    }
  }

  private preventBodyScroll() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  private restoreBodyScroll() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  handleContentScroll(event: Event) {
    const target = event.target as HTMLElement;
    const isScrolled = target.scrollTop > 0;
    
    // Only update if the state changes to avoid unnecessary renders
    if (this.isScrolledSig() !== isScrolled) {
      this.isScrolledSig.set(isScrolled);
    }
  }
}