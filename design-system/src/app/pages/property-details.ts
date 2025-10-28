import { Component, signal, inject, TemplateRef, ViewChild } from '@angular/core';
import { PropertySuggestion } from '../components/ui/property-suggestions/ds-property-suggestions.component';
import { CommonModule } from '@angular/common';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsHeaderDetailsComponent } from '../components/ui/header-details/ds-header-details';
import { DsDataItemComponent } from '../components/ui/data-item/ds-data-item';
import { DsTabs } from '../components/ui/tabs/ds-tabs';
import { DsTab } from '../components/ui/tabs/ds-tab';
import { DsPropertySuggestionsComponent } from '../components/ui/property-suggestions/ds-property-suggestions.component';
import { DsDrawerComponent } from '../components/ui/drawer/ds-drawer';
import { DsButtonComponent } from '../components/ui/button/ds-button';
import { DsBadgeComponent } from '../components/ui/badge/ds-badge';
import { NgpDialogTrigger, NgpDialogOverlay, NgpDialog, NgpDialogManager } from 'ng-primitives/dialog';

@Component({
  selector: 'property-details',
  standalone: true,
  imports: [
    CommonModule,
    DsAppLayoutComponent,
    DsHeaderDetailsComponent,
    DsDataItemComponent,
    DsTabs,
    DsTab,
    DsPropertySuggestionsComponent,
    DsDrawerComponent,
    DsButtonComponent,
    NgpDialogOverlay,
    NgpDialog
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
          
          <div slot="footer">
            <ds-button variant="ghost" (click)="close()">Cancel</ds-button>
            <ds-button variant="primary" (click)="confirmCreateTask(); close()">Create Task</ds-button>
          </div>
        </ds-drawer>
      </div>
    </ng-template>
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

  `]
})
export class PropertyDetailsComponent {
  // Dialog manager for programmatic control
  private dialogManager = inject(NgpDialogManager);
  
  // Template reference for the drawer
  @ViewChild('taskSummaryDrawer') taskSummaryDrawer!: TemplateRef<any>;

  // Active tab state
  activeTab = signal('overview');

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
}
