import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsAppLayoutComponent } from './ds-app-layout';
import { DsTopbarComponent } from '../topbar/ds-topbar';
import { DsSidebarComponent } from '../sidebar/ds-sidebar';
import { signal } from '@angular/core';

const meta: Meta<DsAppLayoutComponent> = {
  title: 'Components/Layout/App Layout',
  component: DsAppLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [DsTopbarComponent, DsSidebarComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isSidebarCollapsed: {
      control: 'boolean',
      description: 'Whether the sidebar is collapsed',
    },
    isMobile: {
      control: 'boolean',
      description: 'Whether to use mobile layout',
    },
  },
};

export default meta;
type Story = StoryObj<DsAppLayoutComponent>;

const sidebarGroups = [
  {
    id: 'main',
    label: 'Main Navigation',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'remixDashboardLine' },
      { id: 'properties', label: 'Properties', icon: 'remixBuilding2Line' },
      { id: 'settings', label: 'Settings', icon: 'remixSettings3Line' },
    ],
  },
];

export const Default: Story = {
  args: {
    sidebarGroups,
    isSidebarCollapsed: true, // Start collapsed by default
    isMobile: false,
  },
  render: (args) => ({
    props: {
      ...args,
      sidebarCollapsedSig: signal(args.isSidebarCollapsed ?? true),
      mobileMenuOpenSig: signal(false), // Mobile menu starts closed
    },
    template: `
      <ds-app-layout 
        [sidebarGroups]="sidebarGroups"
        [isSidebarCollapsed]="sidebarCollapsedSig()"
        [isMobile]="isMobile"
        (collapsedChange)="sidebarCollapsedSig.set($event)"
        (menuOpenChange)="mobileMenuOpenSig.set($event)"
      >
        <ds-topbar 
          [title]="'Dashboard'"
          [iconName]="'remixDashboardLine'"
          [showFirstAction]="true"
          [showSecondAction]="true"
          [firstActionIcon]="'remixNotification3Line'"
          [secondActionIcon]="'remixMessage2Line'"
          [userInitials]="'JD'"
        ></ds-topbar>
        <div style="padding: 24px;">
          <h1>Main Content Area</h1>
          <p>This is where your main content would go. The layout handles the responsive behavior automatically.</p>
          
          <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
            <h3 style="margin: 0 0 16px 0; color: #495057;">Layout State</h3>
            <div style="display: grid; gap: 8px; font-family: monospace; font-size: 14px;">
              <div><strong>Mobile Mode:</strong> {{ isMobile ? 'Yes' : 'No' }}</div>
              <div><strong>Sidebar Collapsed:</strong> {{ sidebarCollapsedSig() ? 'Yes' : 'No' }}</div>
              <div><strong>Mobile Menu Open:</strong> {{ mobileMenuOpenSig() ? 'Yes' : 'No' }}</div>
            </div>
            
            <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
              @if (!isMobile) {
                <button 
                  (click)="sidebarCollapsedSig.set(!sidebarCollapsedSig())"
                  style="padding: 8px 16px; background: #6B5FF5; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                  {{ sidebarCollapsedSig() ? 'Expand' : 'Collapse' }} Sidebar
                </button>
              }
              
              @if (isMobile) {
                <div style="color: #6c757d; font-style: italic;">
                  Use the hamburger menu in the top-left to toggle mobile drawer
                </div>
              }
            </div>
          </div>
        </div>
      </ds-app-layout>
    `,
  }),
};

export const Expanded: Story = {
  ...Default,
  args: {
    ...Default.args,
    isSidebarCollapsed: false, // Start expanded
  },
};

export const Mobile: Story = {
  ...Default,
  args: {
    ...Default.args,
    isMobile: true,
    isSidebarCollapsed: true, // Collapsed state doesn't matter in mobile
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  ...Default,
  args: {
    ...Default.args,
    isMobile: true,
    isSidebarCollapsed: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};