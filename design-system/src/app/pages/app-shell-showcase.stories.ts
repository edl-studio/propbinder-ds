import type { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Component, signal, computed, Input, Output, EventEmitter } from '@angular/core';
import { DsSidebarComponent, SidebarGroup } from '../components/ui/sidebar/ds-sidebar';
import { DsTopbarComponent } from '../components/ui/topbar/ds-topbar';
import { TopbarBreadcrumbItem } from '../components/ui/topbar/ds-topbar-breadcrumb';
import { DsHeaderDetailsComponent } from '../components/ui/header-details/ds-header-details';
import { DsDataItemComponent } from '../components/ui/data-item/ds-data-item';

// Demo data for sidebar
const demoGroups: SidebarGroup[] = [
  {
    id: 'grp-top',
    label: '',
    showLabel: false,
    items: [
      { id: 'inbox', icon: 'remixInboxLine', label: 'Inbox', badgeText: '3' },
      { id: 'my-tasks', icon: 'remixTaskLine', label: 'My tasks' },
    ],
  },
  {
    id: 'grp-service',
    label: 'Service hub',
    items: [
      { id: 'inquiries', icon: 'remixQuestionAnswerLine', label: 'Inquiries' },
      { id: 'tasks', icon: 'remixClipboardLine', label: 'Tasks' },
      { id: 'documents', icon: 'remixFile2Line', label: 'Documents' },
      { id: 'notices', icon: 'remixNotificationLine', label: 'Notices' },
    ],
  },
  {
    id: 'grp-company',
    label: 'Company',
    items: [
      { id: 'dashboard', icon: 'remixLayout4Line', label: 'Dashboard' },
      { id: 'ratings', icon: 'remixStarSmileLine', label: 'Ratings' },
      { id: 'calendar', icon: 'remixCalendarLine', label: 'Calendar' },
      { id: 'reports', icon: 'remixBarChart2Line', label: 'Reports' },
    ],
  },
  {
    id: 'grp-catalog',
    label: 'Catalog',
    items: [
      { id: 'customers', icon: 'remixUser3Line', label: 'Customers' },
      { id: 'portfolios', icon: 'remixFolderLine', label: 'Portfolios' },
      { id: 'properties', icon: 'remixBuilding2Line', label: 'Properties' },
      { id: 'leases', icon: 'remixFileList3Line', label: 'Leases' },
    ],
  },
  {
    id: 'grp-entities',
    label: 'Entity Details (Demo)',
    items: [
      { id: 'property-detail', icon: 'remixBuilding2Line', label: 'Sunset Boulevard Apartments' },
      { id: 'lease-detail', icon: 'remixFileList3Line', label: 'Lease Agreement #LA-2024-001' },
      { id: 'tenant-detail', icon: 'remixUser3Line', label: 'Sarah Johnson' },
      { id: 'inquiry-detail', icon: 'remixQuestionAnswerLine', label: 'Inquiry #INQ-2024-045' },
    ],
  },
];

// Interactive App Shell Component
@Component({
  selector: 'app-shell-showcase',
  standalone: true,
  imports: [CommonModule, DsSidebarComponent, DsTopbarComponent, DsHeaderDetailsComponent, DsDataItemComponent],
  template: `
    <div class="app-shell-demo">
      <!-- Back Button for Full Page Mode -->
      @if (fullPageMode) {
        <div class="full-page-back-button">
          <button 
            (click)="backToMain.emit()"
            class="back-button"
            title="Back to Components Demo"
          >
            ← Back
          </button>
        </div>
      }
      
      <!-- Sidebar -->
      <ds-sidebar 
        [groups]="sidebarGroups"
        [activeItemId]="activeItemId()"
        [collapsed]="sidebarCollapsed()"
        [showGlobalAction]="true"
        [globalActionLabel]="'Create New'"
        [globalActionIcon]="'remixAddLine'"
        [ariaLabel]="'Main navigation'"
        (itemSelected)="onItemSelected($event)"
        (collapsedChange)="onSidebarCollapsedChange($event)"
        (globalActionClick)="onGlobalActionClick()"
        class="demo-sidebar"
        [class.demo-sidebar--collapsed]="sidebarCollapsed()"
      />
      
      <!-- Main Content Area -->
      <div class="demo-main">
        <!-- Header - List View -->
        @if (isListView()) {
          <ds-topbar
            [pageTitle]="currentPageTitle()"
            [iconName]="currentPageIcon()"
            [userInitials]="'JD'"
            [showFirstAction]="true"
            [firstActionIcon]="'remixNotification3Line'"
            [firstActionLabel]="'Notifications'"
            [showSecondAction]="true"
            [secondActionIcon]="'remixSettings3Line'"
            [secondActionLabel]="'Settings'"
            [showBreadcrumbs]="showBreadcrumbs()"
            [breadcrumbItems]="currentBreadcrumbs()"
            class="demo-topbar"
          />
        }
        
        <!-- Header - Detail View -->
        @if (isDetailView()) {
          <ds-topbar
            [pageTitle]="currentPageTitle()"
            [iconName]="currentPageIcon()"
            [userInitials]="'JD'"
            [showFirstAction]="true"
            [firstActionIcon]="'remixNotification3Line'"
            [firstActionLabel]="'Notifications'"
            [showSecondAction]="true"
            [secondActionIcon]="'remixSettings3Line'"
            [secondActionLabel]="'Settings'"
            [showBreadcrumbs]="true"
            [breadcrumbItems]="currentBreadcrumbs()"
            class="demo-topbar"
          />
          <ds-header-details
            [title]="currentEntityTitle()"
            [showPrimaryAction]="true"
            [primaryActionText]="'Edit'"
            [primaryActionIcon]="'remixEditLine'"
            [primaryActionVariant]="'primary'"
            [showSecondaryAction]="true"
            [secondaryActionText]="'Share'"
            [secondaryActionIcon]="'remixShareLine'"
            [secondaryActionVariant]="'secondary'"
            [showMoreActions]="true"
            class="demo-header-details"
          >
            <div slot="details">
              @for (item of currentEntityDetails(); track item.label) {
                <ds-data-item
                  [label]="item.label"
                  [value]="item.value"
                  [layout]="'vertical'"
                  [valueType]="item.valueType"
                  [iconName]="item.iconName"
                  [avatarType]="item.avatarType"
                  [avatarInitials]="item.avatarInitials"
                  [badgeVariant]="item.badgeVariant"
                  [badgeContent]="item.badgeContent"
                  [badgeContentType]="item.badgeContentType"
                />
              }
            </div>
          </ds-header-details>
        }
        
        <!-- Content Area -->
        <main class="demo-content">
          <div class="demo-content-inner">
            @if (isListView()) {
              <h2 class="demo-title">{{ currentPageTitle() }} List</h2>
              <p class="demo-description">
                This is where the list of {{ currentPageTitle().toLowerCase() }} would be displayed.
                Using ds-topbar component for list views.
              </p>
            } @else {
              <h2 class="demo-title">{{ currentEntityTitle() }}</h2>
              <p class="demo-description">
                This is where the detailed content for {{ currentEntityTitle() }} would be displayed.
                Using ds-header-details component with metadata above.
              </p>
            }
            
            <div class="demo-metrics">
              <div class="demo-metric">
                <span class="demo-metric-label">Active Item:</span>
                <span class="demo-metric-value">{{ activeItemId() || 'None' }}</span>
              </div>
              <div class="demo-metric">
                <span class="demo-metric-label">View Type:</span>
                <span class="demo-metric-value">{{ isDetailView() ? 'Detail View (ds-header-details)' : 'List View (ds-topbar)' }}</span>
              </div>
              <div class="demo-metric">
                <span class="demo-metric-label">Sidebar State:</span>
                <span class="demo-metric-value">{{ sidebarCollapsed() ? 'Collapsed' : 'Expanded' }}</span>
              </div>
              <div class="demo-metric">
                <span class="demo-metric-label">Breadcrumbs:</span>
                <span class="demo-metric-value">{{ showBreadcrumbs() ? 'Enabled' : 'Disabled' }}</span>
              </div>
            </div>
            
            <div class="demo-actions">
              <button 
                class="demo-button" 
                (click)="toggleSidebar()"
              >
                {{ sidebarCollapsed() ? 'Expand' : 'Collapse' }} Sidebar
              </button>
              <button 
                class="demo-button" 
                (click)="toggleBreadcrumbs()"
              >
                {{ showBreadcrumbs() ? 'Hide' : 'Show' }} Breadcrumbs
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-shell-demo {
      display: flex;
      height: 600px;
      background: #f8f9fa;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    :host(.tw-h-screen) .app-shell-demo {
      height: 100vh;
      border-radius: 0;
      box-shadow: none;
    }
    
    .demo-sidebar {
      flex-shrink: 0;
      transition: width 0.3s ease;
    }
    
    .demo-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    
    .demo-topbar {
      flex-shrink: 0;
    }
    
    .demo-content {
      flex: 1;
      overflow: auto;
      background: white;
    }
    
    .demo-content-inner {
      padding: 24px;
    }
    
    .demo-title {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
    }
    
    .demo-description {
      margin: 0 0 24px 0;
      color: #666;
      line-height: 1.5;
    }
    
    .demo-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 6px;
    }
    
    .demo-metric {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .demo-metric-label {
      font-size: 12px;
      font-weight: 500;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .demo-metric-value {
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
    }
    
    .demo-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .demo-button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .demo-button:hover {
      background: #0056b3;
    }
    
    .demo-button:active {
      background: #004085;
    }
    
    .full-page-back-button {
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 1000;
    }
    
    .back-button {
      padding: 8px 16px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(4px);
    }
    
    .back-button:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: translateY(-1px);
    }
    
    .back-button:active {
      transform: translateY(0);
    }
  `]
})
export class AppShellShowcaseComponent {
  @Input() fullPageMode = false;
  @Output() backToMain = new EventEmitter<void>();
  
  sidebarGroups = demoGroups;
  
  // State signals
  protected activeItemId = signal<string>('dashboard');
  protected sidebarCollapsed = signal<boolean>(false);
  protected currentPageTitle = signal<string>('Dashboard');
  protected currentPageIcon = signal<string>('remixLayout4Line');
  protected showBreadcrumbs = signal<boolean>(false);
  
  // Entity details mapping
  private entityDetailsMap: Record<string, { title: string; details: any[] }> = {
    'property-detail': {
      title: 'Sunset Boulevard Apartments',
      details: [
        { label: 'Property Type', value: 'Residential', valueType: 'icon-text', iconName: 'remixHome4Line' },
        { label: 'Status', value: 'Active', valueType: 'badge', badgeVariant: 'success', badgeContent: 'Active', badgeContentType: 'text' },
        { label: 'Owner', value: 'Sarah Johnson', valueType: 'avatar-text', avatarType: 'initials', avatarInitials: 'SJ' },
        { label: 'Units', value: '24 units', valueType: 'text' },
        { label: 'Built Year', value: '1995', valueType: 'text' },
        { label: 'Address', value: '1234 Sunset Blvd, Los Angeles, CA', valueType: 'icon-text', iconName: 'remixMapPin2Line' },
      ]
    },
    'lease-detail': {
      title: 'Lease Agreement #LA-2024-001',
      details: [
        { label: 'Tenant', value: 'Michael Chen', valueType: 'avatar-text', avatarType: 'initials', avatarInitials: 'MC' },
        { label: 'Property', value: 'Sunset Blvd Apt 4B', valueType: 'icon-text', iconName: 'remixBuildingLine' },
        { label: 'Status', value: 'Active', valueType: 'badge', badgeVariant: 'success', badgeContent: 'Active', badgeContentType: 'text' },
        { label: 'Rent Amount', value: '$2,400/month', valueType: 'text' },
        { label: 'Lease Term', value: '12 months', valueType: 'text' },
        { label: 'Start Date', value: 'Jan 1, 2024', valueType: 'text' },
      ]
    },
    'tenant-detail': {
      title: 'Sarah Johnson',
      details: [
        { label: 'Email', value: 'sarah.johnson@email.com', valueType: 'icon-text', iconName: 'remixMailLine' },
        { label: 'Phone', value: '+1 (555) 123-4567', valueType: 'icon-text', iconName: 'remixPhoneLine' },
        { label: 'Status', value: 'Active', valueType: 'badge', badgeVariant: 'success', badgeContent: 'Active', badgeContentType: 'text' },
        { label: 'Property', value: 'Sunset Blvd Apt 4B', valueType: 'icon-text', iconName: 'remixBuildingLine' },
        { label: 'Lease Start', value: 'Jan 1, 2024', valueType: 'text' },
        { label: 'Emergency Contact', value: 'John Johnson', valueType: 'avatar-text', avatarType: 'initials', avatarInitials: 'JJ' },
      ]
    },
    'inquiry-detail': {
      title: 'Inquiry #INQ-2024-045',
      details: [
        { label: 'From', value: 'Emma Wilson', valueType: 'avatar-text', avatarType: 'initials', avatarInitials: 'EW' },
        { label: 'Subject', value: 'Maintenance Request', valueType: 'icon-text', iconName: 'remixToolsLine' },
        { label: 'Priority', value: 'High', valueType: 'badge', badgeVariant: 'warning', badgeContent: 'High', badgeContentType: 'text' },
        { label: 'Status', value: 'In Progress', valueType: 'badge', badgeVariant: 'blue', badgeContent: 'In Progress', badgeContentType: 'text' },
        { label: 'Created', value: 'March 15, 2024', valueType: 'text' },
        { label: 'Property', value: 'Oak Street Apartments', valueType: 'icon-text', iconName: 'remixBuildingLine' },
      ]
    }
  };

  private entityParentMap: Record<string, string> = {
    'property-detail': 'Properties',
    'lease-detail': 'Leases',
    'tenant-detail': 'Tenants',
    'inquiry-detail': 'Inquiries'
  };

  // Page configurations for different sidebar items
  private pageConfigs: Record<string, { title: string; icon: string; breadcrumbs?: TopbarBreadcrumbItem[] }> = {
    'inbox': { 
      title: 'Inbox', 
      icon: 'remixInboxLine',
      breadcrumbs: [
        { label: 'Messages', path: '/messages', isLast: false },
        { label: 'Inbox', path: '/messages/inbox', isLast: true }
      ]
    },
    'my-tasks': { title: 'My Tasks', icon: 'remixTaskLine' },
    'inquiries': { 
      title: 'Inquiries', 
      icon: 'remixQuestionAnswerLine',
      breadcrumbs: [
        { label: 'Service Hub', path: '/service', isLast: false },
        { label: 'Inquiries', path: '/service/inquiries', isLast: true }
      ]
    },
    'tasks': { title: 'Tasks', icon: 'remixClipboardLine' },
    'documents': { title: 'Documents', icon: 'remixFile2Line' },
    'notices': { title: 'Notices', icon: 'remixNotificationLine' },
    'dashboard': { title: 'Dashboard', icon: 'remixLayout4Line' },
    'ratings': { title: 'Ratings', icon: 'remixStarSmileLine' },
    'calendar': { title: 'Calendar', icon: 'remixCalendarLine' },
    'reports': { 
      title: 'Reports', 
      icon: 'remixBarChart2Line',
      breadcrumbs: [
        { label: 'Company', path: '/company', isLast: false },
        { label: 'Analytics', path: '/company/analytics', isLast: false },
        { label: 'Reports', path: '/company/analytics/reports', isLast: true }
      ]
    },
    'customers': { 
      title: 'Customers', 
      icon: 'remixUser3Line',
      breadcrumbs: [
        { label: 'Catalog', path: '/catalog', isLast: false },
        { label: 'Customers', path: '/catalog/customers', isLast: true }
      ]
    },
    'portfolios': { title: 'Portfolios', icon: 'remixFolderLine' },
    'properties': { title: 'Properties', icon: 'remixBuilding2Line' },
    'leases': { title: 'Leases', icon: 'remixFileList3Line' },
    'property-detail': { title: 'Property Details', icon: 'remixBuilding2Line' },
    'lease-detail': { title: 'Lease Details', icon: 'remixFileList3Line' },
    'tenant-detail': { title: 'Tenant Details', icon: 'remixUser3Line' },
    'inquiry-detail': { title: 'Inquiry Details', icon: 'remixQuestionAnswerLine' },
  };
  
  protected currentBreadcrumbs = signal<TopbarBreadcrumbItem[]>([]);

  // Computed properties
  protected isDetailView = computed(() => {
    const activeId = this.activeItemId();
    return activeId.endsWith('-detail');
  });

  protected isListView = computed(() => {
    return !this.isDetailView();
  });

  protected currentEntityTitle = computed(() => {
    const activeId = this.activeItemId();
    const entityInfo = this.entityDetailsMap[activeId];
    return entityInfo?.title || 'Entity Details';
  });

  protected currentEntityDetails = computed(() => {
    const activeId = this.activeItemId();
    const entityInfo = this.entityDetailsMap[activeId];
    return entityInfo?.details || [];
  });

  onItemSelected(itemId: string) {
    this.activeItemId.set(itemId);
    const config = this.pageConfigs[itemId];
    if (config) {
      this.currentPageTitle.set(config.title);
      this.currentPageIcon.set(config.icon);
      
      // Update breadcrumbs for detail views
      if (itemId.endsWith('-detail')) {
        const parent = this.entityParentMap[itemId];
        const entityTitle = this.entityDetailsMap[itemId]?.title;
        
        if (parent && entityTitle) {
          this.currentBreadcrumbs.set([
            { label: parent, path: '#', isLast: false },
            { label: entityTitle, path: '', isLast: true }
          ]);
          this.showBreadcrumbs.set(true);
        }
      } else {
        // Update breadcrumbs if available in config
        if (config.breadcrumbs) {
          this.currentBreadcrumbs.set(config.breadcrumbs);
          if (!this.showBreadcrumbs()) {
            this.showBreadcrumbs.set(true);
          }
        } else {
          this.currentBreadcrumbs.set([]);
        }
      }
    }
  }

  onSidebarCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }

  onGlobalActionClick() {
    console.log('Global action clicked!');
  }
  
  toggleSidebar() {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }
  
  toggleBreadcrumbs() {
    this.showBreadcrumbs.set(!this.showBreadcrumbs());
  }
}

const meta: Meta<AppShellShowcaseComponent> = {
  title: 'Application shell/App Shell Showcase',
  component: AppShellShowcaseComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive showcase demonstrating the sidebar and topbar components working together in a complete application shell layout. Click sidebar items to see the topbar update dynamically with different page titles, icons, and breadcrumbs.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AppShellShowcaseComponent>;

// Interactive showcase with both components
export const Interactive: Story = {
  name: 'Interactive App Shell',
  parameters: {
    docs: {
      description: {
        story: 'Click on different sidebar items to see how the topbar updates with contextual information. Use the action buttons to toggle sidebar collapse and breadcrumb visibility.',
      },
    },
  },
};

// Collapsed sidebar variant
export const CollapsedSidebar: Story = {
  name: 'With Collapsed Sidebar',
  render: () => ({
    template: `
      <app-shell-showcase style="display: block;"></app-shell-showcase>
      <script>
        setTimeout(() => {
          const component = document.querySelector('app-shell-showcase');
          if (component) {
            component.toggleSidebar();
          }
        }, 100);
      </script>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'App shell with the sidebar in collapsed state, showing icons only.',
      },
    },
  },
};

// With breadcrumbs enabled
export const WithBreadcrumbs: Story = {
  name: 'With Breadcrumbs',
  render: () => ({
    template: `
      <app-shell-showcase style="display: block;"></app-shell-showcase>
      <script>
        setTimeout(() => {
          const component = document.querySelector('app-shell-showcase');
          if (component) {
            component.onItemSelected('reports');
          }
        }, 100);
      </script>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'App shell showing breadcrumb navigation in the topbar for nested page contexts.',
      },
    },
  },
};

// Mobile responsive preview
export const MobileView: Story = {
  name: 'Mobile Responsive',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'App shell optimized for mobile viewports with responsive behavior.',
      },
    },
  },
};
