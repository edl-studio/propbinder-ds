import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsTopbarComponent } from '../components/ui/topbar/ds-topbar';
import { DsIconComponent } from '../components/ui/icon/ds-icon';
import { DsAvatarComponent } from '../components/ui/avatar/ds-avatar';
import { DsButtonComponent } from '../components/ui/button/ds-button';

@Component({
  selector: 'layout-preview',
  standalone: true,
  imports: [
    CommonModule,
    DsAppLayoutComponent,
    DsTopbarComponent,
    DsIconComponent,
    DsAvatarComponent,
    DsButtonComponent
  ],
  template: `
    <ds-app-layout 
      [sidebarGroups]="sidebarGroups"
      [isSidebarCollapsed]="isSidebarCollapsed()"
      [isMobileOverride]="isMobile()"
      (menuOpenChange)="menuOpen.set($event)"
      (collapsedChange)="isSidebarCollapsed.set($event)"
    >
      <ds-topbar slot="topbar">
        <ds-avatar
          type="icon"
          [iconName]="'remixDashboardLine'"
          size="md"
        />
        <h1 class="topbar__title heading-xl">Layout Preview</h1>
        <ds-button
          slot="trailing"
          variant="ghost"
          size="md"
          [iconOnly]="true"
          ariaLabel="Notifications"
        >
          <ds-icon slot="leading" name="remixNotification3Line" size="18px" />
        </ds-button>
        <ds-button
          slot="trailing"
          variant="ghost"
          size="md"
          [iconOnly]="true"
          ariaLabel="Messages"
        >
          <ds-icon slot="leading" name="remixMessage2Line" size="18px" />
        </ds-button>
        <ds-avatar
          slot="trailing"
          type="initials"
          initials="JD"
          size="md"
        />
      </ds-topbar>
      <div class="content-container">
        <h1>Main Content Area</h1>
        <p>This is where your main content would go. The layout handles the responsive behavior automatically.</p>
        
        <!-- Debug info -->
        <div class="tw-mt-6 tw-p-4 tw-bg-interactive-default tw-rounded">
          <h2 class="tw-text-xl tw-font-semibold tw-mb-4">Debug Information</h2>
          <pre class="tw-bg-surface tw-p-2 tw-rounded tw-mb-2">Window width: {{ windowWidth() }}px</pre>
          <pre class="tw-bg-surface tw-p-2 tw-rounded tw-mb-2">Is Mobile: {{ isMobile() }}</pre>
          <pre class="tw-bg-surface tw-p-2 tw-rounded tw-mb-2">Menu Open: {{ menuOpen() }}</pre>
          <pre class="tw-bg-surface tw-p-2 tw-rounded tw-mb-4">Sidebar Collapsed: {{ isSidebarCollapsed() }}</pre>
          <div class="tw-space-x-4">
            <button class="tw-px-4 tw-py-2 tw-bg-brand-base tw-text-white tw-rounded tw-transition-colors hover:tw-bg-brand-base-hover" 
                    (click)="toggleSidebar()">{{ isSidebarCollapsed() ? 'Expand' : 'Collapse' }} Sidebar</button>
            <button class="tw-px-4 tw-py-2 tw-bg-brand-base tw-text-white tw-rounded tw-transition-colors hover:tw-bg-brand-base-hover" 
                    (click)="toggleDevTools()">{{ showDevTools() ? 'Hide' : 'Show' }} Element Inspector</button>
          </div>
          @if (showDevTools()) {
            <div class="tw-mt-4">
              <h3 class="tw-text-lg tw-font-medium tw-mb-2">Element Inspector</h3>
              <ul class="tw-space-y-2">
                <li class="tw-text-secondary">Sidebar elements: {{ sidebarCount() }}</li>
                <li class="tw-text-secondary">Visible sidebars: {{ visibleSidebarCount() }}</li>
              </ul>
            </div>
          }
        </div>
      </div>
    </ds-app-layout>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }

    pre {
      margin: 8px 0;
      padding: 8px;
      background: #fff;
      border-radius: 4px;
    }

    button {
      margin-top: 8px;
      margin-right: 8px;
      padding: 8px 16px;
      background: #6B5FF5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #5D42E9;
    }
  `]
})
export class LayoutPreviewComponent {
  sidebarGroups = [
    {
      id: 'servicehub',
      label: 'SERVICEHUB',
      items: [
        { id: 'inbox', label: 'Inbox', icon: 'remixMailLine', badgeText: '2' },
        { id: 'inquiries', label: 'Inquiries', icon: 'remixQuestionAnswerLine', badgeText: '2' },
      { id: 'tasks', label: 'Tasks', icon: 'remixTaskLine' },
      { id: 'invoices', label: 'Invoices', icon: 'remixFileList3Line' },
      { id: 'surveys', label: 'Surveys', icon: 'remixSurveyLine' },
      ],
    },
    {
      id: 'company',
      label: 'COMPANY',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'remixDashboardLine' },
        { id: 'rating', label: 'Rating', icon: 'remixStarLine' },
        { id: 'calendar', label: 'Calendar', icon: 'remixCalendarLine' },
        { id: 'settings', label: 'Settings', icon: 'remixSettings4Line' },
      ],
    },
    {
      id: 'kartoteker',
      label: 'CATALOG',
      items: [
        { id: 'customers', label: 'Customers', icon: 'remixTeamLine' },
        { id: 'companies', label: 'Companies', icon: 'remixBuilding4Line' },
        { id: 'properties', label: 'Properties', icon: 'remixBuilding2Line' },
        { id: 'leases', label: 'Leases', icon: 'remixFileListLine' },
        { id: 'tenants', label: 'Tenants', icon: 'remixUserLine' },
        { id: 'vendors', label: 'Vendors', icon: 'remixStore2Line' },
        { id: 'vendor-agreements', label: 'Vendor agreements', icon: 'remixFileTextLine' },
        { id: 'assets', label: 'Assets', icon: 'remixDatabase2Line' },
        { id: 'real-esg', label: 'Real ESG', icon: 'remixLeafLine' },
      ],
    },
    {
      id: 'me',
      label: 'ME',
      items: [
        { id: 'my-details', label: 'My details', icon: 'remixUserSettingsLine' },
        { id: 'whats-new', label: 'What\'s new', icon: 'remixNotification4Line' },
      ],
    },
  ];

  // Reactive state using signals
  menuOpen = signal(false);
  showDevTools = signal(false);
  isSidebarCollapsed = signal(false); // Start expanded to show the layout better
  private windowWidthSig = signal(window.innerWidth);

  // Computed properties
  windowWidth = computed(() => this.windowWidthSig());
  isMobile = computed(() => this.windowWidth() <= 991);
  
  sidebarCount = computed(() => document.querySelectorAll('ds-sidebar').length);
  
  visibleSidebarCount = computed(() => {
    const sidebars = document.querySelectorAll('ds-sidebar');
    let count = 0;
    sidebars.forEach(sidebar => {
      const style = window.getComputedStyle(sidebar);
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        count++;
      }
    });
    return count;
  });

  constructor() {
    // Listen for window resize
    window.addEventListener('resize', () => {
      this.windowWidthSig.set(window.innerWidth);
    });
  }

  toggleDevTools() {
    this.showDevTools.set(!this.showDevTools());
  }

  toggleSidebar() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
  }
}