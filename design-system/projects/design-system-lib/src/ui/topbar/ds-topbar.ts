import { Component, input, ViewEncapsulation, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from '../button/ds-button';
import { DsAvatarComponent } from '../avatar/ds-avatar';
import { DsIconComponent } from '../icon/ds-icon';
import { DsTopbarBreadcrumbComponent, TopbarBreadcrumbItem } from './ds-topbar-breadcrumb';

@Component({
  selector: 'ds-topbar',
  standalone: true,
  imports: [CommonModule, DsButtonComponent, DsAvatarComponent, DsIconComponent, DsTopbarBreadcrumbComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-topbar.css'],
  template: `
    <header class="topbar">
      <!-- Left side: Icon, Title and Breadcrumbs -->
      <div class="topbar__left">
        <ds-avatar
          type="icon"
          [size]="showBreadcrumbs() ? 'sm' : 'md'"
          [iconName]="iconName()"
          class="topbar__icon"
        />
        @if (!showBreadcrumbs()) {
          <h1 class="topbar__title heading-xl">
            {{ pageTitle() }}
          </h1>
        }
        @if (showBreadcrumbs()) {
          <div class="topbar__breadcrumbs">
            <ds-topbar-breadcrumb [items]="breadcrumbItems()" />
          </div>
        }
      </div>
      
      <!-- Right side: Action Buttons and Avatar -->
      <div class="topbar__right">
        <!-- Action container with ghost icon buttons -->
        <div class="topbar__actions">
          @if (showFirstAction()) {
            <ds-button
              variant="ghost"
              size="md"
              [iconOnly]="true"
              [ariaLabel]="firstActionLabel()"
              (clicked)="onFirstActionClick($event)"
              class="topbar__action-btn"
            >
              <ds-icon slot="leading" [name]="firstActionIcon()!" size="18px" />
            </ds-button>
          }
          @if (showSecondAction()) {
            <ds-button
              variant="ghost"
              size="md"
              [iconOnly]="true"
              [ariaLabel]="secondActionLabel()"
              (clicked)="onSecondActionClick($event)"
              class="topbar__action-btn"
            >
              <ds-icon slot="leading" [name]="secondActionIcon()!" size="18px" />
            </ds-button>
          }
        </div>
        
        <!-- User Avatar -->
        <ds-avatar
          type="initials"
          size="md"
          [initials]="userInitials()"
          class="topbar__avatar"
        />
      </div>
    </header>
  `,
})
export class DsTopbarComponent implements AfterViewInit, OnDestroy {
  private scrollListener: (() => void) | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // Add scroll listener
    this.scrollListener = () => {
      const scrolled = window.scrollY > 0;
      console.log('Scroll position:', window.scrollY, 'Scrolled:', scrolled);
      console.log('Adding class to:', this.elementRef.nativeElement);
      this.elementRef.nativeElement.classList.toggle('scrolled', scrolled);
    };
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy() {
    // Remove scroll listener
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }
  }
  // Input signals
  pageTitle = input<string>('Page Title');
  iconName = input<string>('remixHome4Line');
  userInitials = input<string>('JD');
  
  // Breadcrumb controls
  showBreadcrumbs = input<boolean>(false);
  breadcrumbItems = input<TopbarBreadcrumbItem[]>([]);
  
  // Action button inputs
  showFirstAction = input<boolean>(true);
  firstActionIcon = input<string>('remixNotification3Line');
  firstActionLabel = input<string>('Notifications');
  
  showSecondAction = input<boolean>(true);
  secondActionIcon = input<string>('remixSettings3Line');
  secondActionLabel = input<string>('Settings');
  
  // Event handlers
  onFirstActionClick(event: MouseEvent) {
    // Emit event or handle action
    console.log('First action clicked', event);
  }
  
  onSecondActionClick(event: MouseEvent) {
    // Emit event or handle action
    console.log('Second action clicked', event);
  }
}