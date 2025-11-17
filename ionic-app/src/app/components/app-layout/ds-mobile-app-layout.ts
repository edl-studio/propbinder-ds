import { Component, ElementRef, signal, ViewChild, AfterViewInit, input, output, effect, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonLabel,
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonRefresher, 
  IonRefresherContent 
} from '@ionic/angular/standalone';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { DsAvatarComponent } from '@propbinder/design-system/avatar/ds-avatar';

export interface TabConfig {
  id: string;
  label: string;
  route: string;
  icon: string;
  iconActive: string;
}

export type HeaderVariant = 'home' | 'simple' | 'back' | 'none';

/**
 * DsMobileAppLayoutComponent
 * 
 * A complete mobile application shell component based on actual mobile page patterns.
 * Provides tab navigation, flexible headers, and mobile-optimized layout.
 * 
 * Features:
 * - Tab bar navigation with active state
 * - Multiple header variants (home with logomark, simple title, back button)
 * - Pull-to-refresh support
 * - Purple brand background with content wrapper
 * - iOS safe area support
 * 
 * @example
 * ```html
 * <ds-mobile-app-layout
 *   [showTabBar]="true"
 *   [tabs]="tabsConfig"
 *   [headerVariant]="'home'"
 *   [avatarInitials]="'JD'"
 * />
 * ```
 */
@Component({
  selector: 'ds-mobile-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    DsIconComponent,
    DsAvatarComponent
  ],
  styleUrls: ['./ds-mobile-app-layout.css'],
  template: `
    @if (showTabBar()) {
      <!-- Layout with tab bar - NO ion-content, pages provide their own -->
      <ion-tabs>
        <!-- Tab Bar - dynamic slot based on viewport -->
        <ion-tab-bar [attr.slot]="isDesktop() ? 'top' : 'bottom'">
          @for (tab of tabs(); track tab.id) {
            <ion-tab-button 
              [tab]="tab.id" 
              (click)="navigateToTab(tab.route)">
              <ds-icon 
                [name]="isTabActive(tab.id) ? tab.iconActive : tab.icon" 
                size="24px" 
              />
              <ion-label>{{ tab.label }}</ion-label>
            </ion-tab-button>
          }
        </ion-tab-bar>
      </ion-tabs>
    } @else {
      <!-- Standalone layout (no tabs) -->
      @if (headerVariant() !== 'none') {
        <ion-header>
          <ion-toolbar>
            @switch (headerVariant()) {
              @case ('home') {
                <div class="header-home">
                  <svg class="logomark" width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.9862 5.51709H23.1724V8.82743H26.0413C26.2841 8.82743 26.4827 9.02606 26.4827 9.26881V12.7998C26.4827 13.0426 26.2841 13.2412 26.0413 13.2412H23.1724V14.3447H26.0413C26.2841 14.3447 26.4827 14.5433 26.4827 14.7861V18.3171C26.4827 18.5598 26.2841 18.7585 26.0413 18.7585H23.1724V19.8619H26.0413C26.2841 19.8619 26.4827 20.0605 26.4827 20.3033V23.8343C26.4827 24.0771 26.2841 24.2757 26.0413 24.2757H23.1724V26.2619C23.1724 26.7496 23.0267 27.2043 22.7773 27.5861H27.5862L32 31.9999V27.5861H33.9862C34.7167 27.5861 35.3103 26.9924 35.3103 26.2619V6.84123C35.3103 6.11075 34.7167 5.51709 33.9862 5.51709ZM32 23.8343C32 24.0771 31.8013 24.2757 31.5586 24.2757H28.0276C27.7848 24.2757 27.5862 24.0771 27.5862 23.8343V20.3033C27.5862 20.0605 27.7848 19.8619 28.0276 19.8619H31.5586C31.8013 19.8619 32 20.0605 32 20.3033V23.8343ZM32 18.3171C32 18.5598 31.8013 18.7585 31.5586 18.7585H28.0276C27.7848 18.7585 27.5862 18.5598 27.5862 18.3171V14.7861C27.5862 14.5433 27.7848 14.3447 28.0276 14.3447H31.5586C31.8013 14.3447 32 14.5433 32 14.7861V18.3171ZM32 12.7998C32 13.0426 31.8013 13.2412 31.5586 13.2412H28.0276C27.7848 13.2412 27.5862 13.0426 27.5862 12.7998V9.26881C27.5862 9.02606 27.7848 8.82743 28.0276 8.82743H31.5586C31.8013 8.82743 32 9.02606 32 9.26881V12.7998Z" fill="white"/>
                    <path d="M20.7448 0H1.32414C0.593655 0 0 0.593655 0 1.32414V26.2621C0 26.9926 0.593655 27.5862 1.32414 27.5862H3.31034V32L7.72414 27.5862H20.7448C21.4753 27.5862 22.069 26.9926 22.069 26.2621V1.32414C22.069 0.593655 21.4753 0 20.7448 0ZM7.72414 23.8345C7.72414 24.0772 7.52552 24.2759 7.28276 24.2759H3.75172C3.50897 24.2759 3.31034 24.0772 3.31034 23.8345V20.3034C3.31034 20.0607 3.50897 19.8621 3.75172 19.8621H7.28276C7.52552 19.8621 7.72414 20.0607 7.72414 20.3034V23.8345ZM7.72414 18.3172C7.72414 18.56 7.52552 18.7586 7.28276 18.7586H3.75172C3.50897 18.7586 3.31034 18.56 3.31034 18.3172V14.7862C3.31034 14.5434 3.50897 14.3448 3.75172 14.3448H7.28276C7.52552 14.3448 7.72414 14.5434 7.72414 14.7862V18.3172ZM7.72414 12.8C7.72414 13.0428 7.52552 13.2414 7.28276 13.2414H3.75172C3.50897 13.2414 3.31034 13.0428 3.31034 12.8V9.26897C3.31034 9.02621 3.50897 8.82759 3.75172 8.82759H7.28276C7.52552 8.82759 7.72414 9.02621 7.72414 9.26897V12.8ZM7.72414 7.28276C7.72414 7.52552 7.52552 7.72414 7.28276 7.72414H3.75172C3.50897 7.72414 3.31034 7.52552 3.31034 7.28276V3.75172C3.31034 3.50897 3.50897 3.31034 3.75172 3.31034H7.28276C7.52552 3.31034 7.72414 3.50897 7.72414 3.75172V7.28276ZM13.2414 23.8345C13.2414 24.0772 13.0428 24.2759 12.8 24.2759H9.26897C9.02621 24.2759 8.82759 24.0772 8.82759 23.8345V20.3034C8.82759 20.0607 9.02621 19.8621 9.26897 19.8621H12.8C13.0428 19.8621 13.2414 20.0607 13.2414 20.3034V23.8345ZM13.2414 18.3172C13.2414 18.56 13.0428 18.7586 12.8 18.7586H9.26897C9.02621 18.7586 8.82759 18.56 8.82759 18.3172V14.7862C8.82759 14.5434 9.02621 14.3448 9.26897 14.3448H12.8C13.0428 14.3448 13.2414 14.5434 13.2414 14.7862V18.3172ZM13.2414 12.8C13.2414 13.0428 13.0428 13.2414 12.8 13.2414H9.26897C9.02621 13.2414 8.82759 13.0428 8.82759 12.8V9.26897C8.82759 9.02621 9.02621 8.82759 9.26897 8.82759H12.8C13.0428 8.82759 13.2414 9.02621 13.2414 9.26897V12.8ZM13.2414 6.84138V7.28276C13.2414 7.52552 13.0428 7.72414 12.8 7.72414H9.26897C9.02621 7.72414 8.82759 7.52552 8.82759 7.28276V3.75172C8.82759 3.50897 9.02621 3.31034 9.26897 3.31034H12.8C13.0428 3.31034 13.2414 3.50897 13.2414 3.75172V6.84138ZM18.7586 23.8345C18.7586 24.0772 18.56 24.2759 18.3172 24.2759H14.7862C14.5434 24.2759 14.3448 24.0772 14.3448 23.8345V20.3034C14.3448 20.0607 14.5434 19.8621 14.7862 19.8621H18.3172C18.56 19.8621 18.7586 20.0607 18.7586 20.3034V23.8345ZM18.7586 18.3172C18.7586 18.56 18.56 18.7586 18.3172 18.7586H14.7862C14.5434 18.7586 14.3448 18.56 14.3448 18.3172V14.7862C14.3448 14.5434 14.5434 14.3448 14.7862 14.3448H18.3172C18.56 14.3448 18.7586 14.5434 18.7586 14.7862V18.3172ZM18.7586 12.8C18.7586 13.0428 18.56 13.2414 18.3172 13.2414H14.7862C14.5434 13.2414 14.3448 13.0428 14.3448 12.8V9.26897C14.3448 9.02621 14.5434 8.82759 14.7862 8.82759H18.3172C18.56 8.82759 18.7586 9.02621 18.7586 9.26897V12.8ZM18.7586 5.51724V7.28276C18.7586 7.52552 18.56 7.72414 18.3172 7.72414H14.7862C14.5434 7.72414 14.3448 7.52552 14.3448 7.28276V3.75172C14.3448 3.50897 14.5434 3.31034 14.7862 3.31034H18.3172C18.56 3.31034 18.7586 3.50897 18.7586 3.75172V5.51724Z" fill="white"/>
                  </svg>
                  <div class="header-home__actions">
                    <ds-avatar
                      [size]="'md'"
                      [type]="avatarType()"
                      [initials]="avatarInitials()"
                      [src]="avatarSrc()"
                      [iconName]="avatarIconName()"
                      (click)="handleAvatarClick()"
                    />
                  </div>
                </div>
              }
              @case ('back') {
                <div class="header-back">
                  @if (showBackButton()) {
                    <button class="back-button" (click)="handleBackClick()">
                      <ds-icon name="remixArrowLeftSLine" size="24px" />
                    </button>
                  }
                  <h1 class="header-title">{{ pageTitle() }}</h1>
                </div>
              }
              @case ('simple') {
                <div class="header-simple">
                  <h1 class="header-title">{{ pageTitle() }}</h1>
                </div>
              }
            }
          </ion-toolbar>
        </ion-header>
      }

      <ion-content [scrollEvents]="true" (ionScroll)="handleScroll($event)">
        @if (showPullToRefresh()) {
          <ion-refresher
            slot="fixed"
            (ionRefresh)="handleRefresh($event)"
            [pullFactor]="0.4"
            [pullMin]="80"
            [pullMax]="240"
            closeDuration="600ms">
            <ion-refresher-content
              pullingIcon="chevron-down-circle-outline"
              refreshingSpinner="lines">
            </ion-refresher-content>
          </ion-refresher>
        }

        <ng-content></ng-content>
      </ion-content>
    }
  `
})
export class DsMobileAppLayoutComponent implements AfterViewInit {
  @ViewChild(IonContent, { static: false }) ionContent!: IonContent;

  // Inputs
  headerVariant = input<HeaderVariant>('simple');
  pageTitle = input<string>('');
  showBackButton = input<boolean>(false);
  showPullToRefresh = input<boolean>(false);
  showTabBar = input<boolean>(false);
  tabs = input<TabConfig[]>([]);
  
  // Avatar inputs (for home header)
  avatarType = input<'initials' | 'photo' | 'icon'>('initials');
  avatarInitials = input<string>('U');
  avatarSrc = input<string>('');
  avatarIconName = input<string>('remixUser3Line');

  // Outputs
  backClick = output<void>();
  refresh = output<any>();
  avatarClick = output<void>();
  scroll = output<any>();

  // Internal state
  private scrollY = signal(0);
  activeTab = signal<string>('home');
  isDesktop = signal<boolean>(false);

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {
    // Track active tab based on current route
    this.router.events.subscribe(() => {
      const url = this.router.url;
      const tab = this.tabs().find(t => url.includes(t.route));
      if (tab) {
        this.activeTab.set(tab.id);
      }
    });
    
    // Track breakpoint for tab bar positioning
    this.breakpointObserver.observe(['(min-width: 768px)'])
      .subscribe(result => {
        this.isDesktop.set(result.matches);
      });
  }

  ngAfterViewInit(): void {
    if (this.ionContent) {
      this.ionContent.scrollEvents = true;
      this.ensureScrollable();
    }
  }

  handleScroll(event: any): void {
    const scrollTop = event.detail.scrollTop || 0;
    this.scrollY.set(scrollTop);
    this.scroll.emit(event);
  }

  async handleRefresh(event: any): Promise<void> {
    // Haptic feedback for pull-to-refresh
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch {
      // Fallback to Web Vibration API if Capacitor Haptics is not available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
    
    this.refresh.emit(event);
    // Note: Parent component should handle event.target.complete()
    // If no handler is provided, you can add a default timeout in the parent
  }

  handleBackClick(): void {
    this.backClick.emit();
  }

  handleAvatarClick(): void {
    this.avatarClick.emit();
  }

  navigateToTab(route: string): void {
    this.router.navigateByUrl(route, { replaceUrl: true });
  }

  private ensureScrollable(): void {
    if (this.ionContent) {
      this.ionContent.getScrollElement().then((scrollEl: HTMLElement) => {
        if (scrollEl) {
          scrollEl.style.overscrollBehaviorY = 'none';
          (scrollEl.style as any).webkitOverflowScrolling = 'touch';
        }
      });
    }
  }

  isTabActive(tabId: string): boolean {
    return this.activeTab() === tabId;
  }
}

