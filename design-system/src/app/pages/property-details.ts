import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsTopbarComponent } from '../components/ui/topbar/ds-topbar';
import { DsHeaderDetailsComponent } from '../components/ui/header-details/ds-header-details';
import { DsDataItemComponent } from '../components/ui/data-item/ds-data-item';

@Component({
  selector: 'property-details',
  standalone: true,
  imports: [
    CommonModule, 
    DsAppLayoutComponent, 
    DsTopbarComponent, 
    DsHeaderDetailsComponent,
    DsDataItemComponent
  ],
  template: `
    <ds-app-layout 
      [sidebarGroups]="sidebarGroups"
      [isSidebarCollapsed]="isSidebarCollapsed()"
      [activeItemId]="activeItemId()"
      (collapsedChange)="isSidebarCollapsed.set($event)"
    >
      <!-- Topbar -->
      <ds-topbar 
        [pageTitle]="'Properties'"
        [iconName]="'remixBuilding2Line'"
        [showFirstAction]="true"
        [showSecondAction]="true"
        [firstActionIcon]="'remixNotification3Line'"
        [secondActionIcon]="'remixMessage2Line'"
        [userInitials]="'JD'"
        [showBreadcrumbs]="true"
        [breadcrumbItems]="[
          { label: 'Properties', path: '/properties', isLast: false },
          { label: 'Nørrebrogade 44', path: '', isLast: true }
        ]"
      ></ds-topbar>

      <!-- Main Content -->
      <div class="content-container">
        <!-- Header Details -->
        <ds-header-details
          [title]="'Nørrebrogade 44'"
          [showPrimaryAction]="true"
          [primaryActionText]="'Edit Property'"
          [primaryActionIcon]="'remixEditLine'"
          [showSecondaryAction]="true"
          [secondaryActionText]="'Archive'"
          [secondaryActionIcon]="'remixArchiveLine'"
          [secondaryActionVariant]="'ghost'"
          [showMoreActions]="true"
        >
          <!-- Property Details -->
          <div slot="details" class="flex flex-wrap gap-8">
            <ds-data-item
              [label]="'Property number'"
              [value]="'346-6'"
              [valueType]="'icon-text'"
              [iconName]="'remixBuildingLine'"
            />
            <ds-data-item
              [label]="'BFE'"
              [value]="'2056490'"
              [valueType]="'icon-text'"
              [iconName]="'remixPriceTag3Line'"
            />
            <ds-data-item
              [label]="'Responsible'"
              [value]="'Christian Ruggeri'"
              [valueType]="'avatar-text'"
              [avatarType]="'initials'"
              [avatarInitials]="'CR'"
            />
            <ds-data-item
              [label]="'Department'"
              [value]="'Sjælland'"
              [valueType]="'icon-text'"
              [iconName]="'remixMapPin5Line'"
            />
            <ds-data-item
              [label]="'Tags'"
              [valueType]="'badge'"
              [badgeVariant]="'blue'"
              [badgeContent]="'Taurus'"
            />
          </div>
        </ds-header-details>

        <!-- Edge-to-edge divider -->
        <div class="edge-to-edge-divider"></div>

        <!-- Content sections -->
        <div class="mt-8">
          <!-- Placeholder for content sections -->
          <p class="text-gray-600">This is a template for property details page. Add your content sections here.</p>
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
  `]
})
export class PropertyDetailsComponent {
  // Sidebar configuration based on the standard structure
  sidebarGroups = [
    {
      id: 'servicehub',
      label: 'SERVICEHUB',
      items: [
        { id: 'inbox', label: 'Inbox', icon: 'remixMailLine', badgeText: '2' },
        { id: 'inquiries', label: 'Inquiries', icon: 'remixQuestionAnswerLine', badgeText: '2' },
        { id: 'tasks', label: 'Tasks', icon: 'remixTaskLine' },
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
      label: 'KARTOTEKER',
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

  // Reactive state
  isSidebarCollapsed = signal(false);
  activeItemId = signal('properties');
}
