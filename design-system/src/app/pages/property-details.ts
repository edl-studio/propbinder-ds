import { Component, signal, inject, TemplateRef, ViewChild, computed } from '@angular/core';
import { PropertySuggestion } from '../components/ui/property-suggestions/ds-property-suggestions.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsHeaderDetailsComponent } from '../components/ui/header-details/ds-header-details';
import { DsDataItemComponent } from '../components/ui/data-item/ds-data-item';
import { DsTabs } from '../components/ui/tabs/ds-tabs';
import { DsTab } from '../components/ui/tabs/ds-tab';
import { DsPropertySuggestionsComponent } from '../components/ui/property-suggestions/ds-property-suggestions.component';
import { DsDrawerComponent } from '../components/ui/drawer/ds-drawer';
import { DsDrawerHeaderCreateComponent } from '../components/ui/drawer/ds-drawer-header-create';
import { DsDrawerHeaderCreatedComponent } from '../components/ui/drawer/ds-drawer-header-created';
import { DsDrawerHeaderDefaultComponent } from '../components/ui/drawer/ds-drawer-header-default';
import { DsButtonComponent } from '../components/ui/button/ds-button';
import { DsBadgeComponent } from '../components/ui/badge/ds-badge';
import { DsInputComponent } from '../components/ui/input/ds-input';
import { DsTextareaComponent } from '../components/ui/textarea/ds-textarea';
import { DsAvatarComponent } from '../components/ui/avatar/ds-avatar';
import { DsIconComponent } from '../components/ui/icon/ds-icon';
import { DsLinkComponent } from '../components/ui/link/ds-link';
import { DsInlineMessageComponent } from '../components/ui/inline-message/ds-inline-message';
import { DsComboboxComponent } from '../components/ui/combobox/ds-combobox';
import { DsTaskLocationSelectComponent, type TaskLocationData, type Property, type Lease, type Inquiry } from '../components/ui/task-location-select/ds-task-location-select';
import { DsSelectComponent, type DsSelectOption } from '../components/ui/select/ds-select';
import { DsSelectUserComponent, type UserOption } from '../components/ui/select-user/ds-select-user';
import { DsSelectDateComponent } from '../components/ui/select-date/ds-select-date';
import { DsInputTimeComponent } from '../components/ui/input-time/ds-input-time';
import { DsSelectBadgeComponent, type BadgeOption } from '../components/ui/select-badge/ds-select-badge';
import { DsFormFieldComponent } from '../components/ui/form-field/ds-form-field';
import { DsSwitchComponent } from '../components/ui/switch/ds-switch';
import { DsRecurrenceInputComponent, type RecurrenceConfig } from '../components/ui/recurrence-input/ds-recurrence-input';
import { DsListItemComponent } from '../components/ui/list-item/ds-list-item';
import { DsMetadataItemComponent } from '../components/ui/metadata-item/ds-metadata-item';
import { DsDataTableComponent, type DataTableColumn, type DsDataTableColumnMeta, actionsCell } from '../components/ui/data-table/ds-data-table';
import { DsTooltipComponent } from '../components/ui/tooltip/ds-tooltip';
import { DsMenuComponent, type DsMenuItem } from '../components/ui/menu/ds-menu';
import { DsConfirmationDialogComponent } from '../components/ui/dialog/ds-confirmation-dialog';
import { NgpDialogTrigger, NgpDialogOverlay, NgpDialog, NgpDialogManager } from 'ng-primitives/dialog';
import { NgpFocusTrap } from 'ng-primitives/focus-trap';

// Invoice line interface
interface InvoiceLine {
  id: string;
  name: string;
  details: string;
  quantity: number;
  total: string;
  iconName?: string;
}

// Product interface
interface Product {
  id: string;
  number: number;
  name: string;
  costPrice: string;
  listedPrice: string;
}

@Component({
  selector: 'property-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsAppLayoutComponent,
    DsHeaderDetailsComponent,
    DsDataItemComponent,
    DsTabs,
    DsTab,
    DsPropertySuggestionsComponent,
    DsDrawerComponent,
    DsDrawerHeaderCreateComponent,
    DsDrawerHeaderCreatedComponent,
    DsDrawerHeaderDefaultComponent,
    DsButtonComponent,
    DsBadgeComponent,
    DsInputComponent,
    DsTextareaComponent,
    DsAvatarComponent,
    DsIconComponent,
    DsLinkComponent,
    DsInlineMessageComponent,
    DsComboboxComponent,
    DsTaskLocationSelectComponent,
    DsSelectComponent,
    DsSelectUserComponent,
    DsSelectDateComponent,
    DsSelectBadgeComponent,
    DsInputTimeComponent,
    DsFormFieldComponent,
    DsSwitchComponent,
    DsRecurrenceInputComponent,
    DsListItemComponent,
    DsMetadataItemComponent,
    DsDataTableComponent,
    DsTooltipComponent,
    DsMenuComponent,
    DsConfirmationDialogComponent,
    NgpDialogOverlay,
    NgpDialog,
    NgpDialogTrigger,
    NgpFocusTrap
  ],
  template: `
    <ds-app-layout 
      [sidebarGroups]="sidebarGroups"
      [isSidebarCollapsed]="isSidebarCollapsed()"
      [activeItemId]="activeItemId()"
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
      (collapsedChange)="isSidebarCollapsed.set($event)"
    >
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
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <ds-property-suggestions
                  [state]="suggestionsState()"
                  [suggestions]="propertySuggestions()"
                  (generateClick)="handleGenerateSuggestions()"
                  (skipClick)="handleSkipSuggestion($event)"
                  (createTaskClick)="handleCreateTask($event)"
                />

                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="calendar" label="Calendar">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="tasks" label="Tasks" [showBadge]="true" [badgeCount]="5">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <div class="tw-mb-4 tw-flex tw-gap-2">
                  <ds-button 
                    variant="primary" 
                    (clicked)="openTasksDrawer()">
                    Open Drawer
                  </ds-button>
                  <ds-button 
                    variant="secondary" 
                    (clicked)="openCreatedTasksDrawer()">
                    Open Created Drawer
                  </ds-button>
                </div>
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="inquiries" label="Inquiries" [showBadge]="true" [badgeCount]="3">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="assets" label="Assets">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="time-registration" label="Time registration">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="documents" label="Documents">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="vendor-agreements" label="Vendor agreements">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="files" label="Files">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="leases" label="Leases" [showBadge]="true" [badgeCount]="8">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="vendors" label="Vendors">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="handbook" label="Handbook">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
          <ds-tab value="real-esg" label="Real ESG">
            <div class="tab-layout">
              <div class="details-column">
                <div class="details-box"></div>
              </div>
              <div class="content-column">
                <section class="content-section">
                  <div class="section-header tw-w-1/3"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
                <section class="content-section">
                  <div class="section-header tw-w-1/2"></div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                    <div class="grey-box"></div>
                  </div>
                  <div class="content-row">
                    <div class="grey-box"></div>
                  </div>
                </section>
              </div>
            </div>
          </ds-tab>
        </ds-tabs>
        <!-- Edge-to-edge divider -->
        
      </div>
    </ds-app-layout>

    <!-- Task Summary Drawer -->
    <ng-template #taskSummaryDrawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog position="right">
          <div slot="header" class="tw-flex tw-items-center tw-gap-3">
            <h2 class="tw-text-xl tw-font-semibold tw-text-default-primary">Task Summary</h2>
            <div class="ai-badge depth-sm">
              <img src="/Assets/ai-spark.png" alt="" width="14" height="14" />
              <span>Propbinder AI</span>
            </div>
          </div>
          
          <div slot="content" class="tw-space-y-6" *ngIf="currentTaskSummary() as task">
            <div>
              <h3 class="tw-text-lg tw-font-medium tw-text-default-primary tw-mb-2">{{ task.title }}</h3>
              <p class="tw-text-default-secondary">{{ task.description }}</p>
            </div>

            <div class="tw-grid tw-grid-cols-2 tw-gap-4">
              <div>
                <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Estimated Time</label>
                <p class="tw-text-default-primary">{{ task.estimatedTime }}</p>
              </div>
              <div>
                <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Due Date</label>
                <p class="tw-text-default-primary">{{ task.dueDate }}</p>
              </div>
            </div>

            <div>
              <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Assigned To</label>
              <p class="tw-text-default-primary">{{ task.assignedTo }}</p>
            </div>

            <div class="tw-p-4 tw-bg-neutral-50 tw-rounded-lg">
              <h4 class="tw-font-medium tw-text-default-primary tw-mb-2">Next Steps</h4>
              <ul class="tw-text-sm tw-text-default-secondary tw-space-y-1">
                <li>• Task will be added to your task list</li>
                <li>• Assigned team member will be notified</li>
                <li>• You can track progress in the Tasks tab</li>
              </ul>
            </div>
          </div>
        </ds-drawer>
      </div>
    </ng-template>

    <!-- Tasks Drawer -->
    <ng-template #tasksDrawer let-close="close" let-data="data">
      <div 
        ngpDialogOverlay 
        ngpFocusTrap 
        [ngpFocusTrapDisabled]="true" 
        class="ds-overlay ds-drawer-overlay"
        (click)="handleDrawerBackdropClick($event, close, data)">
        <ds-drawer 
          ngpDialog 
          position="right"
          (dismiss)="handleDrawerDismiss(close, data)"
          (click)="$event.stopPropagation()">
          <ds-drawer-header-create 
            title="Create task"
            confirmText="Create task"
            (onCancel)="handleDrawerDismiss(close, data)"
            (onConfirm)="handleCreateTaskFromDrawer() && close()"
            slot="header" />
          
          <div slot="primary-content" class="tw-flex tw-flex-col tw-gap-2" style="margin: -8px; padding: 8px;">
            <ds-task-location-select
              [(ngModel)]="taskLocation"
              (ngModelChange)="showTaskLocationError.set(false)"
              [locationData]="taskLocationData"
              [usePortal]="false"
              [variant]="taskLocationVariant()"
              class="task-location-select"
            />
            <ds-input
              placeholder="Name the task"
              [(ngModel)]="taskName"
              [ghost]="true"
              class="task-name-input"
            />
            <ds-textarea
              placeholder="Tell others what this task is about..."
              [(ngModel)]="taskDescription"
              [rows]="4"
              [ghost]="true"
            />
            @if (showTaskLocationError()) {
              <ds-inline-message 
                variant="error" 
                title="Location required"
                description="Please select a location for this task before creating it."
              />
            }
          </div>
          
                 <ds-tabs slot="tabs" [(value)]="taskDrawerActiveTab" [paddingX]="'1rem'">
            <ds-tab value="overview" label="Overview">
              <div class="tw-space-y-4">
                <!-- Details Section -->
                <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                  <h4 class="heading-base tw-text-default-primary tw-mb-4">Details</h4>
                  <div class="tw-flex tw-flex-col tw-gap-2">
                    <ds-form-field label="Type" layout="horizontal">
                      <ds-select
                        [(ngModel)]="taskType"
                        [options]="taskTypeOptions"
                        [ghost]="true"
                        placeholder="No type"
                    />
                    </ds-form-field>
                    <ds-form-field label="Responsible" layout="horizontal">
                      <ds-select-user
                        [(ngModel)]="taskResponsible"
                        [users]="userOptions"
                        [ghost]="true"
                        [usePortal]="false"
                        placeholder="Select user"
                    />
                    </ds-form-field>
                    <ds-form-field label="Time type" layout="horizontal">
                      <ds-select
                        [(ngModel)]="taskTimeType"
                        [options]="timeTypeOptions"
                        [ghost]="true"
                        placeholder="Select time type"
                      />
                    </ds-form-field>
                    <ds-form-field label="Priority" layout="horizontal">
                      <ds-select-badge
                        [(ngModel)]="taskPriority"
                        [options]="priorityOptions"
                        [ghost]="true"
                        [usePortal]="false"
                        placeholder="No priority"
                    />
                    </ds-form-field>
                    <ds-form-field label="Department" layout="horizontal">
                      <ds-select
                        [(ngModel)]="taskDepartment"
                        [options]="departmentOptions"
                        [ghost]="true"
                        placeholder="No department"
                      />
                    </ds-form-field>
                    <ds-form-field label="Billable" layout="horizontal">
                      <div class="billable-switch-wrapper">
                      <ds-switch
                        [(ngModel)]="taskBillable"
                        [showLabel]="false"
                      />
                      </div>
                    </ds-form-field>
                  </div>
                </div>
                
                <!-- Schedule Section -->
                <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                  <h4 class="heading-base tw-text-default-primary tw-mb-4">Schedule</h4>
                  <div class="tw-flex tw-flex-col tw-gap-2">
                    <ds-form-field label="Start" layout="horizontal">
                      <div class="tw-flex tw-gap-2 tw-items-center">
                      <ds-select-date
                        [(ngModel)]="taskStartDate"
                        [ghost]="true"
                        placeholder="No start date"
                      />
                        @if (taskStartDate) {
                          <ds-input-time
                            [(ngModel)]="taskStartTime"
                            [ghost]="true"
                            placeholder="Select time"
                          />
                        }
                      </div>
                    </ds-form-field>
                    <ds-form-field label="End" layout="horizontal">
                      <div class="tw-flex tw-gap-2 tw-items-center">
                      <ds-select-date
                        [(ngModel)]="taskEndDate"
                        [ghost]="true"
                        placeholder="No end date"
                      />
                        @if (taskEndDate) {
                          <ds-input-time
                            [(ngModel)]="taskEndTime"
                            [ghost]="true"
                            placeholder="Select time"
                          />
                        }
                      </div>
                    </ds-form-field>
                    <ds-form-field label="Recurring" layout="horizontal">
                      <ds-recurrence-input
                        [(ngModel)]="taskRecurrence"
                        [ghost]="true"
                        [startDate]="taskStartDate"
                        placeholder="Not recurring"
                    />
                    </ds-form-field>
                  </div>
                </div>
                
                <!-- Internal Note Section -->
                <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                  <h4 class="heading-base tw-text-default-primary tw-mb-4">Internal note</h4>
                  <ds-textarea
                    placeholder="Write a note for the team..."
                    [rows]="4"
                    [(ngModel)]="internalNote"
                  />
                </div>
              </div>
            </ds-tab>
            <ds-tab value="files" label="Files">
              <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                <div class="tw-flex tw-items-center tw-justify-between tw-mb-6">
                  <h4 class="heading-base tw-text-default-primary">Files</h4>
                  <ds-tooltip text="New file">
                    <ds-button variant="ghost" size="sm" [leadingIcon]="'remixAddLine'" [iconOnly]="true" [ariaLabel]="'Add file'"></ds-button>
                  </ds-tooltip>
                </div>
                <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-12 tw-px-4">
                  <ds-avatar 
                    type="icon" 
                    size="md" 
                    iconName="remixFileTextLine"
                    class="tw-mb-4"
                  />
                  <p class="body-base-regular tw-text-default-primary tw-mb-2">No files yet</p>
                  <p class="body-sm-regular tw-text-default-secondary tw-text-center">
                    <ds-link href="#">Browse files</ds-link> or drag and drop them here.
                  </p>
                </div>
              </div>
            </ds-tab>
          </ds-tabs>
        </ds-drawer>
      </div>
    </ng-template>

    <!-- Created Tasks Drawer -->
    <ng-template #createdTasksDrawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog position="right">
          <ds-drawer-header-created 
            [showMoreOptions]="false"
            (onClose)="close()"
            slot="header">
            <ds-button slot="actions" variant="primary" leadingIcon="remixCheckLine">
              Mark as done
            </ds-button>
            <ds-button slot="actions" variant="secondary" leadingIcon="remixAddLine">
              Add time entry
            </ds-button>
            <ds-menu slot="actions" [items]="taskMoreActionsMenu" [usePortal]="false">
              <ds-button variant="ghost" [iconOnly]="true" ariaLabel="More options">
                <ds-icon slot="leading" name="remixMore2Line" size="18px" />
              </ds-button>
            </ds-menu>
          </ds-drawer-header-created>
          
          <div slot="primary-content" class="tw-flex tw-flex-col tw-gap-2" style="margin: -8px; padding: 8px;">
            <ds-task-location-select
              [(ngModel)]="taskLocation"
              [locationData]="taskLocationData"
              [usePortal]="false"
              [created]="true"
              class="task-location-select"
            />
            <ds-input
              placeholder="Name the task"
              [(ngModel)]="taskName"
              [ghost]="true"
              class="task-name-input"
            />
            <ds-textarea
              placeholder="Tell others what this task is about..."
              [(ngModel)]="taskDescription"
              [rows]="4"
              [ghost]="true"
            />
          </div>
          
          <ds-tabs slot="tabs" [(value)]="taskDrawerActiveTab" [paddingX]="'1rem'">
            <ds-tab value="overview" label="Overview">
              <div class="tw-space-y-4">
                <!-- Details Section -->
                <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                  <h4 class="heading-base tw-text-default-primary tw-mb-4">Details</h4>
                  <div class="tw-flex tw-flex-col tw-gap-2">
                    <ds-form-field label="Type" layout="horizontal">
                      <ds-select
                        [(ngModel)]="taskType"
                        [options]="taskTypeOptions"
                        [ghost]="true"
                        placeholder="No type"
                      />
                    </ds-form-field>
                    <ds-form-field label="Responsible" layout="horizontal">
                      <ds-select-user
                        [(ngModel)]="taskResponsible"
                        [users]="userOptions"
                        [ghost]="true"
                        [usePortal]="false"
                        placeholder="Select user"
                    />
                    </ds-form-field>
                    <ds-form-field label="Time type" layout="horizontal">
                      <ds-select
                        [(ngModel)]="taskTimeType"
                        [options]="timeTypeOptions"
                        [ghost]="true"
                        placeholder="Select time type"
                      />
                    </ds-form-field>
                    <ds-form-field label="Priority" layout="horizontal">
                      <ds-select-badge
                        [(ngModel)]="taskPriority"
                        [options]="priorityOptions"
                        [ghost]="true"
                        [usePortal]="false"
                        placeholder="No priority"
                      />
                    </ds-form-field>
                    <ds-form-field label="Department" layout="horizontal">
                      <ds-select
                        [(ngModel)]="taskDepartment"
                        [options]="departmentOptions"
                        [ghost]="true"
                        placeholder="No department"
                      />
                    </ds-form-field>
                    <ds-form-field label="Billable" layout="horizontal">
                      <div class="billable-switch-wrapper">
                        <ds-switch
                          [(ngModel)]="taskBillable"
                          [showLabel]="false"
                        />
                      </div>
                    </ds-form-field>
                  </div>
                </div>
                
                <!-- Schedule Section -->
                <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                  <h4 class="heading-base tw-text-default-primary tw-mb-4">Schedule</h4>
                  <div class="tw-flex tw-flex-col tw-gap-2">
                    <ds-form-field label="Start" layout="horizontal">
                      <div class="tw-flex tw-gap-2 tw-items-center">
                        <ds-select-date
                          [(ngModel)]="taskStartDate"
                          [ghost]="true"
                          placeholder="No start date"
                        />
                        @if (taskStartDate) {
                          <ds-input-time
                            [(ngModel)]="taskStartTime"
                            [ghost]="true"
                            placeholder="Select time"
                          />
                        }
                      </div>
                    </ds-form-field>
                    <ds-form-field label="End" layout="horizontal">
                      <div class="tw-flex tw-gap-2 tw-items-center">
                        <ds-select-date
                          [(ngModel)]="taskEndDate"
                          [ghost]="true"
                          placeholder="No end date"
                        />
                        @if (taskEndDate) {
                          <ds-input-time
                            [(ngModel)]="taskEndTime"
                            [ghost]="true"
                            placeholder="Select time"
                          />
                        }
                      </div>
                    </ds-form-field>
                    <ds-form-field label="Recurring" layout="horizontal">
                      <ds-recurrence-input
                        [(ngModel)]="taskRecurrence"
                        [ghost]="true"
                        [startDate]="taskStartDate"
                        placeholder="Not recurring"
                      />
                    </ds-form-field>
                  </div>
                </div>
                
                <!-- Internal Note Section -->
                <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                  <h4 class="heading-base tw-text-default-primary tw-mb-4">Internal note</h4>
                  <ds-textarea
                    placeholder="Write a note for the team..."
                    [rows]="4"
                    [(ngModel)]="internalNote"
                  />
                </div>
              </div>
            </ds-tab>
            <ds-tab value="products" label="Products">
              <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
                  <h4 class="heading-base tw-text-default-primary">Products</h4>
                  <ds-combobox
                    [options]="availableProducts"
                    [optionLabelFn]="getProductLabel"
                    [placeholder]="'Search products...'"
                      [selectPlaceholder]="'Search products...'"
                      [(ngModel)]="selectedProductToAdd"
                      (ngModelChange)="handleAddProduct($event)"
                      [usePortal]="false"
                      [width]="'256px'"
                      [align]="'right'"
                      class="products-combobox"
                    >
                    <ds-button variant="secondary" size="sm" [leadingIcon]="'remixAddLine'">Add product</ds-button>

                    <!-- Custom option template -->
                    <ng-template #optionTemplate let-product let-selected="selected">
                      <div class="tw-flex tw-flex-col tw-gap-1">
                        <span class="body-sm-regular">{{ product.number }} · {{ product.name }}</span>
                        <span class="body-sm-regular tw-text-default-secondary">{{ product.listedPrice }}</span>
                      </div>
                    </ng-template>
                  </ds-combobox>
                </div>
                
                <div class="tw-rounded-lg tw-border tw-border-default tw-overflow-hidden">
                  <ds-data-table
                    [data]="products()"
                    [columns]="productColumns"
                    [searchable]="false"
                    [paginated]="false"
                    [showColumnVisibility]="false"
                  />
                </div>
              </div>
            </ds-tab>
            <ds-tab value="time" label="Time">
              <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                <div class="tw-flex tw-items-center tw-justify-between tw-mb-6">
                  <h4 class="heading-base tw-text-default-primary">Time entries</h4>
                  <ds-tooltip text="New time entry">
                    <ds-button variant="ghost" size="sm" [leadingIcon]="'remixAddLine'" [iconOnly]="true" [ariaLabel]="'Add time entry'"></ds-button>
                  </ds-tooltip>
                </div>
                <div class="tw-flex tw-flex-col time-entries-list" style="margin: -12px;">
                  <ds-list-item title="Carsten Rasmussen">
                    <div slot="avatar">
                      <ds-avatar type="initials" initials="CR" size="md" />
                    </div>
                    <div slot="metadata">
                      <ds-metadata-item icon="remixCalendarLine" value="June 18" />
                      <ds-metadata-item value="•" />
                      <ds-metadata-item icon="remixTimeLine" value="12:45" />
                    </div>
                    <div slot="actions">
                      <ds-menu [items]="timeEntryMenu" [usePortal]="false" [align]="'end'">
                        <ds-button variant="ghost" size="sm" [iconOnly]="true" ariaLabel="More options">
                          <ds-icon slot="leading" name="remixMore2Fill" size="18px" />
                        </ds-button>
                      </ds-menu>
                    </div>
                  </ds-list-item>
                  
                  <ds-list-item title="Carsten Rasmussen">
                    <div slot="avatar">
                      <ds-avatar type="initials" initials="CR" size="md" />
                    </div>
                    <div slot="metadata">
                      <ds-metadata-item icon="remixCalendarLine" value="June 12" />
                      <ds-metadata-item value="•" />
                      <ds-metadata-item icon="remixTimeLine" value="12:45" />
                    </div>
                    <div slot="actions">
                      <ds-menu [items]="timeEntryMenu" [usePortal]="false" [align]="'end'">
                        <ds-button variant="ghost" size="sm" [iconOnly]="true" ariaLabel="More options">
                          <ds-icon slot="leading" name="remixMore2Fill" size="18px" />
                        </ds-button>
                      </ds-menu>
                    </div>
                  </ds-list-item>
                  
                  <ds-list-item title="Carsten Rasmussen">
                    <div slot="avatar">
                      <ds-avatar type="initials" initials="CR" size="md" />
                    </div>
                    <div slot="metadata">
                      <ds-metadata-item icon="remixCalendarLine" value="June 6" />
                      <ds-metadata-item value="•" />
                      <ds-metadata-item icon="remixTimeLine" value="12:45" />
                    </div>
                    <div slot="actions">
                      <ds-menu [items]="timeEntryMenu" [usePortal]="false" [align]="'end'">
                        <ds-button variant="ghost" size="sm" [iconOnly]="true" ariaLabel="More options">
                          <ds-icon slot="leading" name="remixMore2Fill" size="18px" />
                        </ds-button>
                      </ds-menu>
                    </div>
                  </ds-list-item>
                </div>
              </div>
            </ds-tab>
            <ds-tab value="invoice" label="Invoice">
              <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
                  <h4 class="heading-base tw-text-default-primary">Invoice</h4>
                  <ds-button variant="ghost" size="sm">
                    View invoice
                  </ds-button>
                </div>
                
                <div class="tw-rounded-lg tw-border tw-border-default tw-overflow-hidden">
                  <ds-data-table
                    [data]="invoiceLines()"
                    [columns]="invoiceColumns"
                    [searchable]="false"
                    [paginated]="false"
                    [showColumnVisibility]="false"
                  />
                </div>
                
                <div class="tw-mt-4 tw-rounded-lg tw-border tw-border-default tw-bg-white tw-p-4 tw-flex tw-flex-col tw-gap-4 tw-items-end">
                  <div class="tw-flex tw-items-center tw-justify-end tw-gap-4 tw-w-full">
                    <span class="body-sm-medium tw-text-default-secondary">Total price (incl. vat)</span>
                    <span class="heading-lg tw-text-default-primary">1000,00 DKK</span>
                  </div>
                  <ds-button variant="primary" size="sm" [leadingIcon]="'remixSendPlane2Line'">
                    Send invoice
                  </ds-button>
                </div>
              </div>
            </ds-tab>
            <ds-tab value="files" label="Files" [showBadge]="true" [badgeCount]="2">
              <div class="tw-bg-white tw-rounded-lg tw-border tw-border-default tw-p-4">
                <div class="tw-flex tw-items-center tw-justify-between tw-mb-6">
                  <h4 class="heading-base tw-text-default-primary">Files</h4>
                  <ds-tooltip text="New file">
                    <ds-button variant="ghost" size="sm" [leadingIcon]="'remixAddLine'" [iconOnly]="true" [ariaLabel]="'Add file'"></ds-button>
                  </ds-tooltip>
                </div>
                <div class="tw-flex tw-flex-col" style="margin: -12px;">
                  <ds-list-item title="billede-af-et-laekkert-toilet.jpg">
                    <div slot="avatar">
                      <img 
                        src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=200&h=200&fit=crop" 
                        alt="Toilet" 
                        class="tw-w-10 tw-h-10 tw-rounded-lg tw-object-cover"
                      />
                    </div>
                    <div slot="metadata">
                      <ds-metadata-item value="Uploaded Sep 22, 2023" />
                    </div>
                    <div slot="actions">
                      <ds-button variant="ghost" size="sm" (clicked)="handlePreviewFile('file-1')">Preview</ds-button>
                      <ds-button variant="ghost" size="sm" [iconOnly]="true" [leadingIcon]="'remixDeleteBinLine'" [ariaLabel]="'Delete file'" (clicked)="handleDeleteFile('file-1')"></ds-button>
                    </div>
                  </ds-list-item>
                  
                  <ds-list-item title="billede-af-et-laekkert-toilet.jpg">
                    <div slot="avatar">
                      <img 
                        src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=200&h=200&fit=crop" 
                        alt="Toilet" 
                        class="tw-w-10 tw-h-10 tw-rounded-lg tw-object-cover"
                      />
                    </div>
                    <div slot="metadata">
                      <ds-metadata-item value="Uploaded Sep 22, 2023" />
                    </div>
                    <div slot="actions">
                      <ds-button variant="ghost" size="sm" (clicked)="handlePreviewFile('file-2')">Preview</ds-button>
                      <ds-button variant="ghost" size="sm" [iconOnly]="true" [leadingIcon]="'remixDeleteBinLine'" [ariaLabel]="'Delete file'" (clicked)="handleDeleteFile('file-2')"></ds-button>
                    </div>
                  </ds-list-item>
                </div>
              </div>
            </ds-tab>
          </ds-tabs>
        </ds-drawer>
      </div>
    </ng-template>

    <!-- Discard Task Confirmation Dialog -->
    <ng-template #discardTaskDialog let-close="close" let-data="data">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-confirmation-dialog
          ngpDialog
          title="Discard task?"
          message="Are you sure you want to discard this task? All unsaved changes will be lost."
          confirmLabel="Discard"
          confirmVariant="destructive"
          cancelLabel="Keep editing"
          (confirm)="handleDiscardTask(data.closeDrawer); close()"
          (cancel)="close()">
        </ds-confirmation-dialog>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
    
    .task-name-input ::ng-deep .ds-input__field {
      font-size: var(--font-size-2xl);
      font-weight: 400;
      line-height: 1.2;
    }
    
    .task-name-input ::ng-deep .ds-input {
      min-height: auto;
      max-height: none;
      height: auto;
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .task-location-select {
      margin-bottom: 8px;
    }

    ds-input-time {
      width: 96px;
      flex-shrink: 0;
    }

    ds-input-time ::ng-deep .ds-input {
      width: 96px !important;
      min-width: 96px !important;
      max-width: 96px !important;
    }

    ds-select-date {
      width: 160px;
      min-width: 160px;
      max-width: 160px;
      flex-shrink: 0;
    }

    ds-select-date ::ng-deep .ds-input {
      width: 160px !important;
      min-width: 160px !important;
      max-width: 160px !important;
    }

    /* Add padding to switch toggle container */
    .billable-switch-wrapper {
      padding-left: 8px;
      padding-right: 8px;
    }

    :host ::ng-deep ds-button.header-details__action-btn--primary .btn.btn--ghost {
      color: var(--color-brand-base) !important;
    }

    :host ::ng-deep ds-button.header-details__action-btn--primary .btn.btn--ghost:hover {
      color: var(--color-brand-base) !important;
      background-color: var(--color-background-neutral-secondary-hover);
    }

    :host ::ng-deep ds-button.header-details__action-btn--primary .btn.btn--ghost .btn__icon {
      color: var(--color-brand-base) !important;
    }

    .tab-layout {
      @apply tw-flex tw-gap-8 tw-py-8;
    }

    .details-column {
      @apply tw-w-[400px] tw-flex-shrink-0;
    }

    .details-box {
      @apply tw-h-[600px] tw-rounded-xl tw-bg-gray-100;
    }

    .content-column {
      @apply tw-flex-1 tw-flex tw-flex-col tw-gap-8;
    }

    .content-section {
      @apply tw-flex tw-flex-col tw-gap-4;
    }

    .content-row {
      @apply tw-flex tw-gap-4;
    }

    .grey-box {
      @apply tw-h-32 tw-rounded-2xl tw-bg-gray-100 tw-flex-1;
    }

    .section-header {
      @apply tw-h-6 tw-rounded-lg tw-bg-gray-100;
    }

    .ai-gradient-button {
      @apply tw-w-fit;
      background: white !important;

      ::ng-deep .btn {
        border: 1px solid rgba(124, 29, 236, 0.05);
        position: relative;
        background: linear-gradient(90deg, 
          rgba(93, 66, 233, 0.05) 0%,
          rgba(124, 29, 236, 0.05) 25%,
          rgba(146, 24, 220, 0.05) 50%,
          rgba(200, 0, 245, 0.05) 75%,
          rgba(244, 20, 188, 0.05) 100%
        );
      }

      ::ng-deep {
        .btn__content span {
          background: linear-gradient(90deg, 
            #5D42E9 0%,
            #7C1DEC 25%,
            #9218DC 50%,
            #C800F5 75%,
            #F414BC 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ds-icon {
          color: #5D42E9;
        }
      }
    }

    .ai-badge {
      @apply tw-bg-[#221A4C] tw-py-1.5 tw-pl-2 tw-pr-3 tw-rounded-full tw-inline-flex tw-items-center tw-gap-1.5;

      img {
        @apply tw-w-3 tw-h-3;
        filter: brightness(1.4) contrast(1.1);
      }

      span {
        @apply tw-text-white tw-text-xs tw-font-medium tw-leading-none;
      }
    }

    /* Time entry hover styles */
    .time-entries-list ds-list-item {
      position: relative;
    }

    .time-entries-list [slot="actions"] {
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .time-entries-list ds-list-item:hover [slot="actions"] {
      opacity: 1;
    }

    /* Products combobox dropdown width */
    .products-combobox ::ng-deep .combobox__dropdown {
      width: 256px !important;
      min-width: 256px !important;
    }
  `]
})
export class PropertyDetailsComponent {
  // Dialog manager for programmatic control
  private dialogManager = inject(NgpDialogManager);
  
  // Template reference for the drawer
  @ViewChild('taskSummaryDrawer') taskSummaryDrawer!: TemplateRef<any>;
  @ViewChild('tasksDrawer') tasksDrawer!: TemplateRef<any>;
  @ViewChild('createdTasksDrawer') createdTasksDrawer!: TemplateRef<any>;
  @ViewChild('discardTaskDialog') discardTaskDialog!: TemplateRef<any>;

  // Store drawer dialog reference for re-opening if needed
  private activeDrawerRef: any = null;

  // Active tab state
  activeTab = signal('overview');
  taskDrawerActiveTab = signal('overview');
  
  // Task drawer form state
  taskName = '';
  taskDescription = '';
  internalNote = '';
  taskLocation: any = null;
  taskType: string | null = null;
  taskResponsible: string | null = null;
  taskTimeType: string = 'standard';
  taskPriority: string | null = null;
  taskDepartment: string | null = null;
  taskBillable: boolean = false;
  taskStartDate: Date | null = null;
  taskStartTime: string | null = null;
  taskEndDate: Date | null = null;
  taskEndTime: string | null = null;
  taskRecurrence: RecurrenceConfig | null = null;
  showTaskLocationError = signal(false);
  taskLocationVariant = computed<'default' | 'error' | 'warning' | 'success'>(() => 
    this.showTaskLocationError() ? 'error' : 'default'
  );

  // Select options for task drawer
  taskTypeOptions: DsSelectOption<string>[] = [
    { id: 'type-1', value: 'maintenance', label: 'Maintenance' },
    { id: 'type-2', value: 'repair', label: 'Repair' },
    { id: 'type-3', value: 'inspection', label: 'Inspection' },
    { id: 'type-4', value: 'cleaning', label: 'Cleaning' },
  ];

  timeTypeOptions: DsSelectOption<string>[] = [
    { id: 'time-1', value: 'standard', label: 'Standard' },
    { id: 'time-2', value: 'overtime', label: 'Overtime' },
    { id: 'time-3', value: 'emergency', label: 'Emergency' },
  ];

  priorityOptions: BadgeOption[] = [
    { id: '1', label: 'Critical', variant: 'destructive' },
    { id: '2', label: 'High', variant: 'orange' },
    { id: '3', label: 'Medium', variant: 'warning' },
    { id: '4', label: 'Low', variant: 'blue' },
  ];

  departmentOptions: DsSelectOption<string>[] = [
    { id: 'dept-1', value: 'sjælland', label: 'Sjælland' },
    { id: 'dept-2', value: 'jylland', label: 'Jylland' },
    { id: 'dept-3', value: 'fyn', label: 'Fyn' },
    { id: 'dept-4', value: 'copenhagen', label: 'Copenhagen' },
  ];

  userOptions: UserOption[] = [
    { id: 'user-1', name: 'Niels Harring', initials: 'NH' },
    { id: 'user-2', name: 'Christian Ruggeri', initials: 'CR' },
    { id: 'user-3', name: 'Lars Mikkelsen', initials: 'LM' },
    { id: 'user-4', name: 'Maria Hansen', initials: 'MH' },
  ];

  // Sample data for task location select
  private sampleProperties: Property[] = [
    { id: 'prop-1', name: 'Amagerholm' },
    { id: 'prop-2', name: 'Lindegaard' },
    { id: 'prop-3', name: 'Toftegårds Allé' },
    { id: 'prop-4', name: 'Trianglen' },
    { id: 'prop-5', name: 'Nyhavn residence' },
    { id: 'prop-6', name: 'Woods Augusthus' },
    { id: 'prop-7', name: 'Zytgloggenparken' },
  ];

  private sampleLeases: Lease[] = [
    // Leases for Woods Augusthus (prop-6)
    { id: 'lease-1', name: 'EDL ApS', propertyId: 'prop-6', address: 'Else Alfelts Vej 58B 1. th.' },
    { id: 'lease-2', name: 'TechCorp', propertyId: 'prop-6', address: 'Else Alfelts Vej 58B 2. tv.' },
    { id: 'lease-3', name: 'Nordic Solutions', propertyId: 'prop-6', address: 'Else Alfelts Vej 58B 3. mf.' },
    
    // Leases for Amagerholm (prop-1)
    { id: 'lease-4', name: 'Design Studio', propertyId: 'prop-1', address: 'Amagerbrogade 100' },
    { id: 'lease-5', name: 'Marketing Agency', propertyId: 'prop-1', address: 'Amagerbrogade 102' },
    
    // Leases for Lindegaard (prop-2)
    { id: 'lease-6', name: 'Software Co', propertyId: 'prop-2', address: 'Lindegårdsvej 15' },
    { id: 'lease-7', name: 'Consulting Firm', propertyId: 'prop-2', address: 'Lindegårdsvej 17' },
    
    // Leases for Toftegårds Allé (prop-3)
    { id: 'lease-8', name: 'Retail Shop A/S', propertyId: 'prop-3', address: 'Toftegårds Allé 45A' },
    { id: 'lease-9', name: 'Café Nordic', propertyId: 'prop-3', address: 'Toftegårds Allé 45B' },
    
    // Leases for Trianglen (prop-4)
    { id: 'lease-10', name: 'Financial Services', propertyId: 'prop-4', address: 'Trianglen 12, 1. sal' },
    { id: 'lease-11', name: 'Law Office', propertyId: 'prop-4', address: 'Trianglen 12, 2. sal' },
    
    // Leases for Nyhavn residence (prop-5)
    { id: 'lease-12', name: 'Art Gallery', propertyId: 'prop-5', address: 'Nyhavn 17' },
    { id: 'lease-13', name: 'Tourist Agency', propertyId: 'prop-5', address: 'Nyhavn 19' },
    
    // Leases for Zytgloggenparken (prop-7)
    { id: 'lease-14', name: 'Medical Clinic', propertyId: 'prop-7', address: 'Zytgloggenparken 8' },
    { id: 'lease-15', name: 'Dental Practice', propertyId: 'prop-7', address: 'Zytgloggenparken 10' },
  ];

  private sampleInquiries: Inquiry[] = [
    // Inquiries for EDL ApS (Woods Augusthus)
    { id: 'inq-1', title: 'Roof construction', leaseId: 'lease-1', description: 'Need repair on the roofing tiles' },
    { id: 'inq-2', title: 'HVAC Maintenance', leaseId: 'lease-1', description: 'Annual maintenance check' },
    { id: 'inq-3', title: 'Window replacement', leaseId: 'lease-1', description: 'Replace broken window in living room' },
    
    // Inquiries for TechCorp (Woods Augusthus)
    { id: 'inq-4', title: 'Plumbing issue', leaseId: 'lease-2', description: 'Leaking pipe in bathroom' },
    { id: 'inq-5', title: 'Electrical work', leaseId: 'lease-2', description: 'Install additional outlets' },
    
    // Inquiries for Design Studio (Amagerholm)
    { id: 'inq-6', title: 'Flooring replacement', leaseId: 'lease-4', description: 'Replace worn carpet' },
    { id: 'inq-7', title: 'Paint job', leaseId: 'lease-4', description: 'Repaint office walls' },
  ];

  taskLocationData: TaskLocationData = {
    properties: this.sampleProperties,
    leases: this.sampleLeases,
    inquiries: this.sampleInquiries,
  };

  // Property suggestions state
  suggestionsState = signal<'loading' | 'empty' | 'results'>('empty');
  propertySuggestions = signal<PropertySuggestion[]>([
    {
      title: 'Inspect for signs of leaks or dampness',
      priority: 'Critical',
      inquiryCount: 12,
      timeAgo: '1 minute ago'
    },
    {
      title: 'Check heating system efficiency',
      priority: 'Important',
      inquiryCount: 8,
      timeAgo: '1 minute ago'
    },
    {
      title: 'Review tenant feedback on common areas',
      priority: 'Moderate',
      inquiryCount: 15,
      timeAgo: '1 minute ago'
    }
  ]);

  // Task summary state for drawer
  currentTaskSummary = signal<{
    title: string;
    priority: string;
    description: string;
    estimatedTime: string;
    assignedTo: string;
    dueDate: string;
  } | null>(null);

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

  // Reactive state
  isSidebarCollapsed = signal(false);
  activeItemId = signal('properties');

  // Handle property suggestions actions
  handleGenerateSuggestions() {
    this.suggestionsState.set('loading');
    // Simulate API call
    setTimeout(() => {
      this.suggestionsState.set('results');
    }, 8000);
  }

  handleSkipSuggestion(suggestion: PropertySuggestion) {
    this.propertySuggestions.update(suggestions => 
      suggestions.filter(s => s.title !== suggestion.title)
    );
  }

  handleCreateTask(suggestion: PropertySuggestion) {
    // Create task summary with additional details
    const taskSummary = {
      title: suggestion.title,
      priority: suggestion.priority,
      description: this.generateTaskDescription(suggestion),
      estimatedTime: this.getEstimatedTime(suggestion.priority),
      assignedTo: 'Christian Ruggeri', // Default assigned person
      dueDate: this.getDueDate(suggestion.priority)
    };
    
    this.currentTaskSummary.set(taskSummary);
    
    // Open the drawer programmatically
    this.dialogManager.open(this.taskSummaryDrawer);
  }

  // Helper method to generate task description
  private generateTaskDescription(suggestion: PropertySuggestion): string {
    const descriptions = {
      'Inspect for signs of leaks or dampness': 'Conduct a thorough inspection of the property for any signs of water damage, leaks, or dampness. Check all plumbing fixtures, walls, and basement areas.',
      'Check heating system efficiency': 'Perform a comprehensive assessment of the heating system including boiler inspection, radiator check, and energy efficiency evaluation.',
      'Review tenant feedback on common areas': 'Analyze tenant feedback regarding common areas and identify areas for improvement to enhance tenant satisfaction.'
    };
    return descriptions[suggestion.title as keyof typeof descriptions] || 'Complete the assigned property maintenance task according to standard procedures.';
  }

  // Helper method to get estimated time based on priority
  private getEstimatedTime(priority: string): string {
    switch (priority) {
      case 'Critical': return '2-4 hours';
      case 'Important': return '4-6 hours';
      case 'Moderate': return '1-2 hours';
      default: return '2-3 hours';
    }
  }

  // Helper method to get due date based on priority
  private getDueDate(priority: string): string {
    const today = new Date();
    let daysToAdd = 7; // Default 1 week
    
    switch (priority) {
      case 'Critical': daysToAdd = 1; break; // Tomorrow
      case 'Important': daysToAdd = 3; break; // 3 days
      case 'Moderate': daysToAdd = 7; break; // 1 week
    }
    
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + daysToAdd);
    
    return dueDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // Method called when user confirms task creation
  confirmCreateTask() {
    const task = this.currentTaskSummary();
    if (task) {
      console.log('Task confirmed and created:', task);
      // Here you would typically call an API to create the task
      
      // Remove the suggestion from the list
      this.propertySuggestions.update(suggestions => 
        suggestions.filter(s => s.title !== task.title)
      );
      
      // Clear the current task summary
      this.currentTaskSummary.set(null);
    }
  }

  // Helper method to get priority variant for badges (already exists in suggestions component)
  getPriorityVariant(priority: string): 'destructive' | 'warning' | 'blue' {
    switch (priority) {
      case 'Critical': return 'destructive';
      case 'Important': return 'warning';
      case 'Moderate': return 'blue';
      default: return 'blue';
    }
  }

  // Method to open the tasks drawer
  openTasksDrawer() {
    // Clear all fields for creation drawer
    this.taskName = '';
    this.taskDescription = '';
    this.internalNote = '';
    this.taskLocation = null;
    this.taskType = null;
    this.taskResponsible = null;
    this.taskTimeType = 'standard';
    this.taskPriority = null;
    this.taskDepartment = null;
    this.taskBillable = false;
    this.taskStartDate = null;
    this.taskStartTime = null;
    this.taskEndDate = null;
    this.taskEndTime = null;
    this.taskRecurrence = null;
    this.showTaskLocationError.set(false);
    
    this.dialogManager.open(this.tasksDrawer);
  }

  openCreatedTasksDrawer() {
    // Prefill fields with sample data
    this.taskName = 'Check-in with the roofing guys';
    this.taskDescription = 'Give the boys a call and make sure they bring the hammer drill.';
    this.taskLocation = { type: 'property', id: '325', name: 'Nørrebrogade 44', propertyId: 'prop-1' };
    this.taskType = 'maintenance';
    this.taskResponsible = 'user-1';
    this.taskTimeType = 'standard';
    this.taskPriority = '2';
    this.taskDepartment = 'sjælland';
    this.taskBillable = false;
    this.taskStartDate = new Date(2024, 10, 12); // Nov 12, 2024
    this.taskStartTime = '09:00';
    this.taskEndDate = new Date(2024, 10, 12); // Nov 12, 2024
    this.taskEndTime = '15:00';
    this.taskRecurrence = null;
    this.internalNote = 'Make sure to coordinate with the building manager before the team arrives.';
    
    this.dialogManager.open(this.createdTasksDrawer);
  }

  // Task more actions menu
  taskMoreActionsMenu: DsMenuItem[] = [
    {
      id: 'copy-link',
      label: 'Copy link',
      icon: 'remixLinkM',
      action: () => this.handleCopyLink()
    },
    {
      id: 'copy-id',
      label: 'Copy ID',
      icon: 'remixFileTextLine',
      action: () => this.handleCopyId()
    },
    {
      id: 'separator-1',
      label: '',
      separator: true
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: 'remixFileCopyLine',
      action: () => this.handleDuplicate()
    },
    {
      id: 'separator-2',
      label: '',
      separator: true
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'remixDeleteBinLine',
      destructive: true,
      action: () => this.handleDelete()
    }
  ];

  // Time entry menu
  timeEntryMenu: DsMenuItem[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: 'remixEditLine',
      action: () => this.handleEditTimeEntry()
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'remixDeleteBinLine',
      destructive: true,
      action: () => this.handleDeleteTimeEntry()
    }
  ];

  handleCopyLink() {
    console.log('Copy link clicked');
    // Add your copy link logic here
  }

  handleCopyId() {
    console.log('Copy ID clicked');
    // Add your copy ID logic here
  }

  handleDuplicate() {
    console.log('Duplicate clicked');
    // Add your duplicate logic here
  }

  handleDelete() {
    console.log('Delete clicked');
    // Add your delete logic here
  }

  handleEditTimeEntry() {
    console.log('Edit time entry clicked');
    // Add your edit time entry logic here
  }

  handleDeleteTimeEntry() {
    console.log('Delete time entry clicked');
    // Add your delete time entry logic here
  }

  handlePreviewFile(fileId: string) {
    console.log('Preview file clicked:', fileId);
    // Add your preview file logic here
  }

  handleDeleteFile(fileId: string) {
    console.log('Delete file clicked:', fileId);
    // Add your delete file logic here
  }

  // Handle drawer dismissal (called by cancel button, ESC key, or backdrop click)
  handleDrawerDismiss(closeDrawer: () => void, data?: any) {
    // Check if there's any input data FIRST (before closing)
    const hasInput = this.taskName || 
                    this.taskDescription || 
                    this.internalNote || 
                    this.taskLocation;
    
    if (hasInput) {
      // Show confirmation dialog WITHOUT closing the drawer
      this.dialogManager.open(this.discardTaskDialog, {
        data: { closeDrawer }
      });
    } else {
      // No input, safe to close
      closeDrawer();
    }
  }

  // Handle backdrop click
  handleDrawerBackdropClick(event: MouseEvent, closeDrawer: () => void, data?: any) {
    // Check if the click was on the overlay itself (not a child element)
    const target = event.target as HTMLElement;
    if (target.classList.contains('ds-drawer-overlay')) {
      this.handleDrawerDismiss(closeDrawer, data);
    }
  }

  // Discard changes and close drawer
  handleDiscardTask(closeDrawer: () => void) {
    closeDrawer();
  }

  handleMoreOptions() {
    console.log('More options clicked');
  }

  // Method to handle task creation from drawer
  handleCreateTaskFromDrawer() {
    // Validate that a location is selected
    if (!this.taskLocation) {
      this.showTaskLocationError.set(true);
      return false;
    }
    
    this.showTaskLocationError.set(false);
    console.log('Creating task from drawer...');
    // Add your task creation logic here
    return true;
  }

  // Invoice line interface for the minimized table
  invoiceLines = signal<InvoiceLine[]>([
    {
      id: '1',
      name: '001 - Administration fee',
      details: 'Covers handling, coordination, and documentation.',
      quantity: 1,
      total: '575,00 DKK',
      iconName: 'remixMenuAddLine',
    },
    {
      id: '2',
      name: '004 - Miscellaneous',
      details: '',
      quantity: 2,
      total: '920,00 DKK',
      iconName: 'remixMenuAddLine',
    },
    {
      id: '3',
      name: '013 - Maintenance plans',
      details: '',
      quantity: 2,
      total: '2.760,00 DKK',
      iconName: 'remixMenuAddLine',
    },
    {
      id: '4',
      name: 'Technical Manager',
      details: 'Sep 30, 25',
      quantity: 6.5,
      total: '5.980,00 DKK',
      iconName: 'remixTimeLine',
    },
    {
      id: '5',
      name: 'Technical Manager',
      details: 'Sep 29, 25',
      quantity: 7.5,
      total: '6.900,00 DKK',
      iconName: 'remixTimeLine',
    },
    {
      id: '6',
      name: 'Technical Manager',
      details: 'Sep 28, 25',
      quantity: 7,
      total: '6.440,00 DKK',
      iconName: 'remixTimeLine',
    },
  ]);

  // Column definitions for the minimized invoice table (read-only)
  invoiceColumns: DataTableColumn<InvoiceLine>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => {
        const row = info.row.original;
        const iconHtml = row.iconName 
          ? `<ds-icon name="${row.iconName}" size="16px" color="secondary" style="margin-right: 8px;"></ds-icon>`
          : '';
        return `${iconHtml}<span class="body-sm-regular">${info.getValue()}</span>`;
      },
      meta: {
        sizing: {
          minWidth: 'lg',
        },
      } as DsDataTableColumnMeta,
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: (info) => `<span class="body-sm-regular">${info.getValue()}</span>`,
      meta: {
        sizing: {
          minWidth: 'xs',
        },
      } as DsDataTableColumnMeta,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: (info) => `<span class="body-sm-medium">${info.getValue()}</span>`,
      meta: {
        sizing: {
          minWidth: '160px',
          maxWidth: '160px',
        },
      } as DsDataTableColumnMeta,
    },
  ];

  // Products data
  products = signal<Product[]>([
    {
      id: '1',
      number: 1,
      name: 'Toilet',
      costPrice: '800,00 DKK',
      listedPrice: '1.000,00 DKK',
    },
    {
      id: '2',
      number: 2,
      name: 'Toilet seat',
      costPrice: '200,00 DKK',
      listedPrice: '400,00 DKK',
    },
    {
      id: '3',
      number: 3,
      name: 'Toilet mounts',
      costPrice: '50,00 DKK',
      listedPrice: '100,00 DKK',
    },
  ]);

  // Product column definitions
  productColumns: DataTableColumn<Product>[] = [
    {
      accessorKey: 'number',
      header: 'Number',
      cell: (info) => `<span class="body-sm-regular">${info.getValue()}</span>`,
      meta: {
        sizing: {
          minWidth: 'xs',
        },
      } as DsDataTableColumnMeta,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => `<span class="body-sm-regular">${info.getValue()}</span>`,
      meta: {
        sizing: {
          minWidth: 'md',
        },
      } as DsDataTableColumnMeta,
    },
    {
      accessorKey: 'costPrice',
      header: 'Cost price',
      cell: (info) => `<div style="text-align: right;"><span class="body-sm-regular">${info.getValue()}</span></div>`,
      meta: {
        sizing: {
          minWidth: 'sm',
        },
        align: 'right',
      } as DsDataTableColumnMeta,
    },
    {
      accessorKey: 'listedPrice',
      header: 'Listed price',
      cell: (info) => `<div style="text-align: right;"><span class="body-sm-regular">${info.getValue()}</span></div>`,
      meta: {
        sizing: {
          minWidth: 'sm',
        },
        align: 'right',
      } as DsDataTableColumnMeta,
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      enableHiding: false,
      meta: {
        sizing: {
          width: '60px',
        },
      } as DsDataTableColumnMeta,
      cell: (info) => actionsCell({
        row: info.row.original,
        onDelete: (product: Product) => this.handleDeleteProduct(product.id),
      }),
    },
  ];

  // Product filters
  productSearchQuery = '';
  productCategoryFilter: string | null = null;
  productPriceTypeFilter: string | null = null;

  productCategoryOptions: DsSelectOption<string>[] = [
    { id: 'cat-1', value: 'vvs', label: 'VVS' },
    { id: 'cat-2', value: 'electrical', label: 'Electrical' },
    { id: 'cat-3', value: 'carpentry', label: 'Carpentry' },
    { id: 'cat-4', value: 'plumbing', label: 'Plumbing' },
  ];

  productPriceTypeOptions: DsSelectOption<string>[] = [
    { id: 'price-1', value: 'standard', label: 'Standard price' },
    { id: 'price-2', value: 'cost', label: 'Cost price' },
    { id: 'price-3', value: 'list', label: 'List price' },
  ];

  // Available products for combobox
  selectedProductToAdd: Product | null = null;
  
  availableProducts: Product[] = [
    { id: '4', number: 4, name: 'Sink', costPrice: '1.200,00 DKK', listedPrice: '1.500,00 DKK' },
    { id: '5', number: 5, name: 'Faucet', costPrice: '600,00 DKK', listedPrice: '800,00 DKK' },
    { id: '6', number: 6, name: 'Mirror', costPrice: '300,00 DKK', listedPrice: '450,00 DKK' },
    { id: '7', number: 7, name: 'Shower head', costPrice: '250,00 DKK', listedPrice: '350,00 DKK' },
    { id: '8', number: 8, name: 'Towel rack', costPrice: '150,00 DKK', listedPrice: '200,00 DKK' },
  ];

  getProductLabel = (product: Product): string => {
    return product.name;
  };

  handleAddProduct(product: Product | null) {
    if (product) {
      // Add the product to the products list
      this.products.update(products => [...products, product]);
      // Clear the selection
      this.selectedProductToAdd = null;
      console.log('Product added:', product);
    }
  }

  handleDeleteProduct(productId: string) {
    // Remove the product from the list
    this.products.update(products => products.filter(p => p.id !== productId));
    console.log('Product deleted:', productId);
  }
}

// Expose the delete function to window for onclick handler
declare global {
  interface Window {
    deleteProduct: (productId: string) => void;
  }
}

// Set up the global function
if (typeof window !== 'undefined') {
  window.deleteProduct = (productId: string) => {
    // This will be handled by the component instance
    const event = new CustomEvent('deleteProduct', { detail: productId });
    document.dispatchEvent(event);
  };
}
