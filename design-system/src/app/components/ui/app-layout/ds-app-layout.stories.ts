import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, HostListener, OnDestroy, computed } from '@angular/core';
import { DsAppLayoutComponent } from './ds-app-layout';
import { DsTopbarComponent } from '../topbar/ds-topbar';
import { DsSidebarComponent } from '../sidebar/ds-sidebar';
import { DsDataItemComponent } from '../data-item/ds-data-item';
import { ViewportService } from '../../../lib/viewport.service';
import { demoGroups } from '../sidebar/demo-data';

@Component({
  selector: 'ds-debug-wrapper',
  standalone: true,
  imports: [DsAppLayoutComponent, DsTopbarComponent, DsSidebarComponent, DsDataItemComponent],
  // ViewportService is now provided at the module level
  template: `
    <ds-app-layout
      [sidebarGroups]="sidebarGroups"
      [isMobileOverride]="isMobileOverride"
      [isSidebarCollapsed]="isSidebarCollapsed"
      (menuOpenChange)="handleMenuOpenChange($event)"
      (collapsedChange)="handleCollapsedChange($event)"
    >
      <ds-topbar
        [pageTitle]="'Page Title'"
        [iconName]="'remixHome4Line'"
        [userInitials]="'JD'"
        [showFirstAction]="true"
        [firstActionIcon]="'remixNotification3Line'"
        [firstActionLabel]="'Notifications'"
        [showSecondAction]="true"
        [secondActionIcon]="'remixSettings3Line'"
        [secondActionLabel]="'Settings'"
      />
      <div style="padding: 24px;">
        <div style="max-width: 64rem; margin: 0 auto;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 8px;">Main Content Area</h2>
          <p style="color: rgb(75, 85, 99); margin-bottom: 48px;">This is where your main content would go. The layout handles the responsive behavior automatically.</p>
          
          <div style="margin-bottom: 48px;">
            <div style="background: var(--background-color-interactive-default); border-radius: 16px; padding: 24px;">
              <span class="ui-sm-medium">Debug Information</span>
              <div style="margin-top: 16px;">
                <ds-data-item 
                  [label]="'Window width'" 
                  [value]="windowWidth + 'px'" 
                  [layout]="'horizontal'" 
                  [valueType]="'text'"
                ></ds-data-item>
                <ds-data-item 
                  [label]="'Is Mobile'" 
                  [value]="isMobile() ? 'True' : 'False'" 
                  [layout]="'horizontal'" 
                  [valueType]="'text'"
                ></ds-data-item>
                <ds-data-item 
                  [label]="'Menu Open'" 
                  [value]="menuOpen ? 'True' : 'False'" 
                  [layout]="'horizontal'" 
                  [valueType]="'text'"
                ></ds-data-item>
                <ds-data-item 
                  [label]="'Sidebar Collapsed'" 
                  [value]="isSidebarCollapsed ? 'True' : 'False'" 
                  [layout]="'horizontal'" 
                  [valueType]="'text'"
                ></ds-data-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ds-app-layout>
  `
})
class DebugWrapperComponent implements OnDestroy {
  sidebarGroups = demoGroups;
  isMobileOverride?: boolean;
  isSidebarCollapsed = false;
  windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  menuOpen = false;

  constructor(private viewportService: ViewportService) {}

  isMobile = computed(() => this.viewportService.isMobile());

  private resizeTimeout: any;

  @HostListener('window:resize')
  onResize() {
    // Debounce resize updates
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.windowWidth = window.innerWidth;
    }, 100);
  }

  handleMenuOpenChange(isOpen: boolean) {
    this.menuOpen = isOpen;
  }

  handleCollapsedChange(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  ngOnDestroy() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }
}

const meta: Meta<DsAppLayoutComponent> = {
  title: 'Application shell/App Layout',
  component: DsAppLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [DebugWrapperComponent],
      providers: [ViewportService]
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    // Add viewport toolbar to allow easy resizing
    viewport: {
      defaultViewport: 'desktop',
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '100%',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '100%',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '100%',
          },
        },
        'large-desktop': {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '100%',
          },
        },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsAppLayoutComponent>;

export const Default: Story = {
  args: {
    sidebarGroups: demoGroups,
    isSidebarCollapsed: false,
  },
  render: () => ({
    template: '<ds-debug-wrapper></ds-debug-wrapper>'
  })
};

export const InitiallyCollapsed: Story = {
  args: {
    sidebarGroups: demoGroups,
    isMobileOverride: false, // Force desktop mode
    isSidebarCollapsed: true,
  },
  render: Default.render,
};

// Debug story to test topbar in isolation
export const AutoResponsive: Story = {
  args: {
    sidebarGroups: demoGroups,
    // No isMobileOverride - let ViewportService handle automatic detection
    isSidebarCollapsed: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-app-layout
        [sidebarGroups]="sidebarGroups"
        [isMobileOverride]="isMobileOverride"
        [isSidebarCollapsed]="isSidebarCollapsed"
      >
        <ds-topbar
          [pageTitle]="'Auto Responsive'"
          [iconName]="'remixSmartphoneLine'"
          [userInitials]="'AR'"
          [showFirstAction]="true"
          [firstActionIcon]="'remixNotification3Line'"
          [firstActionLabel]="'Notifications'"
          [showSecondAction]="true"
          [secondActionIcon]="'remixSettings3Line'"
          [secondActionLabel]="'Settings'"
        />
        <div class="p-6">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-semibold mb-4">Auto-Responsive Layout</h2>
            <div class="space-y-4">
              <div class="p-4 bg-white rounded-lg border border-gray-200">
                <h3 class="font-medium mb-2">🚀 Automatic Viewport Detection</h3>
                <p class="text-gray-600">
                  This layout automatically detects your viewport size and switches between mobile and desktop modes at 992px breakpoint.
                </p>
                <p class="mt-2 text-sm text-gray-500">
                  <strong>Try resizing your browser window or using the viewport toolbar above!</strong>
                </p>
              </div>
              
              <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 class="font-medium mb-2 text-blue-900">How it works:</h3>
                <ul class="text-sm text-blue-800 space-y-1">
                  <li>• <strong>≤ 991px:</strong> Mobile mode with collapsible drawer menu</li>
                  <li>• <strong>≥ 992px:</strong> Desktop mode with persistent sidebar</li>
                  <li>• <strong>Automatic:</strong> No manual prop toggling needed!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ds-app-layout>
    `,
  }),
};

export const TopbarDebug: Story = {
  args: {
    sidebarGroups: demoGroups,
    isMobileOverride: false, // Force desktop mode
    isSidebarCollapsed: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-app-layout
        [sidebarGroups]="sidebarGroups"
        [isMobileOverride]="isMobileOverride"
        [isSidebarCollapsed]="isSidebarCollapsed"
      >
        <ds-topbar
          [pageTitle]="'Debug Page'"
          [iconName]="'remixHome4Line'"
          [userInitials]="'DB'"
          [showFirstAction]="false"
          [showSecondAction]="false"
        />
        <div class="p-6">
          <h2>Debug: Check if topbar renders with minimal props</h2>
        </div>
      </ds-app-layout>
    `,
  }),
};