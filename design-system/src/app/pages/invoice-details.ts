import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsHeaderDetailsComponent } from '../components/ui/header-details/ds-header-details';
import { DsDataItemComponent } from '../components/ui/data-item/ds-data-item';
import { DsButtonComponent } from '../components/ui/button/ds-button';

@Component({
  selector: 'invoice-details',
  standalone: true,
  imports: [
    CommonModule,
    DsAppLayoutComponent,
    DsHeaderDetailsComponent,
    DsDataItemComponent,
    DsButtonComponent,
  ],
  template: `
    <ds-app-layout
      [sidebarGroups]="sidebarGroups"
      [isSidebarCollapsed]="isSidebarCollapsed()"
      [activeItemId]="activeItemId()"
      [pageTitle]="'Invoices'"
      [iconName]="'remixFileList3Line'"
      [showFirstAction]="true"
      [showSecondAction]="true"
      [firstActionIcon]="'remixNotification3Line'"
      [secondActionIcon]="'remixMessage2Line'"
      [userInitials]="'JD'"
      [showBreadcrumbs]="true"
      [breadcrumbItems]="[
        { label: 'Invoices', path: '/invoices', isLast: false },
        { label: 'INV-2024-001', path: '', isLast: true }
      ]"
      (collapsedChange)="isSidebarCollapsed.set($event)"
    >
      <!-- Main Content -->
      <div class="content-container">
        <!-- Header Details -->
        <ds-header-details
          [title]="'INV-2024-001'"
          [showPrimaryAction]="false"
          [showSecondaryAction]="false"
          [showMoreActions]="false"
        >
          <!-- Invoice Details -->
          <div slot="details" class="tw-flex tw-flex-wrap tw-gap-8">
            <ds-data-item
              label="Property"
              value="Fælledgården Hub"
              valueType="icon-link"
              iconName="remixBuilding2Line"
              linkHref="/properties/faelledgarden-hub"
            />

            <ds-data-item
              label="Task"
              value="Fix ventilation canal"
              valueType="icon-link"
              iconName="remixCheckboxMultipleLine"
              linkHref="/tasks/fix-ventilation-canal"
            />

            <ds-data-item
              label="Invoice number"
              value="Not available"
              valueType="text"
            />

            <ds-data-item
              label="Coverage per hour"
              value="150,00 DKK"
              valueType="text"
            />

            <ds-data-item
              label="Contribution margin"
              value="3.075,00 DKK"
              valueType="text"
            />

            <ds-data-item
              label="Contribution ratio"
              value="13,0 %"
              valueType="text"
            />
          </div>
        </ds-header-details>

        <!-- Edge-to-edge divider -->
        <div class="edge-to-edge-divider"></div>

        <!-- Content area for invoice details -->
        <div class="tw-p-8">
          <div class="tw-flex tw-flex-col tw-gap-4">
            <!-- Invoice lines section -->
            <div class="elevation-tile tw-rounded-lg tw-p-6">
              <div class="heading-xl">
                Invoice lines
              </div>
              <!-- Content will go here -->
            </div>
          </div>
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
export class InvoiceDetailsComponent {
  // Reactive state
  isSidebarCollapsed = signal(false);
  activeItemId = signal('invoices');

  // Sidebar configuration based on the standard structure
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
}
