import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsTopbarComponent } from '../components/ui/topbar/ds-topbar';
import { DsHeaderDetailsComponent } from '../components/ui/header-details/ds-header-details';
import { DsDataItemComponent } from '../components/ui/data-item/ds-data-item';
import { DsIconComponent } from '../components/ui/icon/ds-icon';
import { DsAvatarComponent } from '../components/ui/avatar/ds-avatar';
import { DsBadgeComponent } from '../components/ui/badge/ds-badge';
import { DsButtonComponent } from "../components/ui/button/ds-button";
import { DsTabs } from '../components/ui/tabs/ds-tabs';
import { DsTab } from '../components/ui/tabs/ds-tab';

@Component({
  selector: 'property-details',
  standalone: true,
  imports: [
    CommonModule,
    DsAppLayoutComponent,
    DsTopbarComponent,
    DsHeaderDetailsComponent,
    DsDataItemComponent,
    DsIconComponent,
    DsAvatarComponent,
    DsBadgeComponent,
    DsButtonComponent,
    DsTabs,
    DsTab
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
        slot="topbar"
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
          [primaryActionText]="'Ask property'"
          [primaryActionIcon]="'remixChatSmileAiLine'"
          [primaryActionVariant]="'ghost'"
          [showSecondaryAction]="false"
          [showMoreActions]="false"
        >
          <!-- Property Details -->
          <div slot="details" class="tw-flex tw-flex-wrap tw-gap-8">
            <ds-data-item
              label="Property number"
              value="346-6"
              valueType="icon-text"
              iconName="remixBuildingLine"
              iconSize="16px"
              iconColor="secondary"
            />

            <ds-data-item
              label="BFE"
              value="2056490"
              valueType="icon-text"
              iconName="remixPriceTag3Line"
              iconSize="16px"
              iconColor="secondary"
            />

            <ds-data-item
              label="Responsible"
              value="Christian Ruggeri"
              valueType="avatar-text"
              avatarType="initials"
              avatarInitials="CR"
              avatarSize="xs"
            />

            <ds-data-item
              label="Department"
              value="Sjælland"
              valueType="icon-text"
              iconName="remixMapPin5Line"
              iconSize="16px"
              iconColor="secondary"
            />

            <ds-data-item
              label="Tags"
              valueType="badge"
              badgeVariant="blue"
              badgeContent="Taurus"
            />
            
          </div>
        </ds-header-details>

        <!-- Edge-to-edge divider -->
        <div class="edge-to-edge-divider"></div>

        <!-- Tabs -->
        <ds-tabs [(value)]="activeTab">
          <ds-tab value="overview" label="Overview">
            <div class="tw-p-4">Overview content goes here</div>
          </ds-tab>
          <ds-tab value="calendar" label="Calendar">
            <div class="tw-p-4">Calendar content goes here</div>
          </ds-tab>
          <ds-tab value="tasks" label="Tasks" [showBadge]="true" [badgeCount]="5">
            <div class="tw-p-4">Tasks content goes here</div>
          </ds-tab>
          <ds-tab value="inquiries" label="Inquiries" [showBadge]="true" [badgeCount]="3">
            <div class="tw-p-4">Inquiries content goes here</div>
          </ds-tab>
          <ds-tab value="assets" label="Assets">
            <div class="tw-p-4">Assets content goes here</div>
          </ds-tab>
          <ds-tab value="time-registration" label="Time registration">
            <div class="tw-p-4">Time registration content goes here</div>
          </ds-tab>
          <ds-tab value="documents" label="Documents">
            <div class="tw-p-4">Documents content goes here</div>
          </ds-tab>
          <ds-tab value="vendor-agreements" label="Vendor agreements">
            <div class="tw-p-4">Vendor agreements content goes here</div>
          </ds-tab>
          <ds-tab value="files" label="Files">
            <div class="tw-p-4">Files content goes here</div>
          </ds-tab>
          <ds-tab value="leases" label="Leases" [showBadge]="true" [badgeCount]="8">
            <div class="tw-p-4">Leases content goes here</div>
          </ds-tab>
          <ds-tab value="vendors" label="Vendors">
            <div class="tw-p-4">Vendors content goes here</div>
          </ds-tab>
          <ds-tab value="handbook" label="Handbook">
            <div class="tw-p-4">Handbook content goes here</div>
          </ds-tab>
          <ds-tab value="real-esg" label="Real ESG">
            <div class="tw-p-4">Real ESG content goes here</div>
          </ds-tab>
        </ds-tabs>
        <!-- Edge-to-edge divider -->
        
      </div>
    </ds-app-layout>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }

    :host ::ng-deep ds-button.header-details__action-btn--primary .btn.btn--ghost {
      color: var(--color-brand-base) !important;
    }

    :host ::ng-deep ds-button.header-details__action-btn--primary .btn.btn--ghost:hover {
      color: var(--color-brand-base) !important;
      background-color: var(--background-color-interactive-default-hover);
    }

    :host ::ng-deep ds-button.header-details__action-btn--primary .btn.btn--ghost .btn__icon {
      color: var(--color-brand-base) !important;
    }
  `]
})
export class PropertyDetailsComponent {
  // Active tab state
  activeTab = signal('overview');

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
