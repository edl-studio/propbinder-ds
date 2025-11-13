import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsDrawerComponent } from './ds-drawer';
import { DsDrawerHeaderCreateComponent } from './ds-drawer-header-create';
import { DsDrawerHeaderCreatedComponent } from './ds-drawer-header-created';
import { DsDrawerHeaderDefaultComponent } from './ds-drawer-header-default';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';
import { DsAvatarComponent } from '../avatar/ds-avatar';
import { DsTabs } from '../tabs/ds-tabs';
import { DsTab } from '../tabs/ds-tab';
import { NgpDialogTrigger, NgpDialogOverlay, NgpDialog } from 'ng-primitives/dialog';
import { signal } from '@angular/core';

interface DrawerStoryProps {
  position: 'left' | 'right';
}

const meta: Meta<DrawerStoryProps> = {
  title: 'Global/Drawer',
  component: DsDrawerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        DsDrawerComponent,
        DsDrawerHeaderCreateComponent,
        DsDrawerHeaderCreatedComponent,
        DsDrawerHeaderDefaultComponent,
        DsButtonComponent,
        DsIconComponent,
        DsAvatarComponent,
        DsTabs,
        DsTab,
        NgpDialogTrigger,
        NgpDialogOverlay,
        NgpDialog
      ],
    }),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the drawer',
      defaultValue: 'right'
    }
  }
};

export default meta;
type Story = StoryObj<DrawerStoryProps>;

// Basic drawer story (without header components)
const BasicTemplate: Story['render'] = (args) => ({
  props: args,
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="drawer" variant="primary">Open Drawer</ds-button>
      <p>This is the main page content. When you open the drawer, it should overlay this content with a semi-transparent background.</p>
    </div>

    <ng-template #drawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog [position]="position">
          <h2 slot="header" class="heading-xl">Drawer Title</h2>
          <div slot="content">
            <p class="tw-text-neutral-700 tw-mb-4">This is the main content of the drawer.</p>
            <p class="tw-text-neutral-600 tw-mb-4">You can put any content here including forms, lists, or other components.</p>
            <div class="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
              <h3 class="tw-font-medium tw-mb-2">Example Content</h3>
              <p class="tw-text-sm tw-text-gray-600">This drawer should slide in from the {{ position }} side of the screen.</p>
            </div>
          </div>
        </ds-drawer>
      </div>
    </ng-template>
  `
});

// Create header story
const CreateHeaderTemplate: Story['render'] = (args) => ({
  props: args,
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="drawer" variant="primary">Open Create Drawer</ds-button>
      <p>This drawer uses the <code>ds-drawer-header-create</code> component for creation/editing states.</p>
    </div>

    <ng-template #drawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog [position]="position">
          <ds-drawer-header-create 
            title="Create task"
            confirmText="Create task"
            (onCancel)="close()"
            (onConfirm)="close()"
            slot="header" />
          
          <div slot="content">
            <div class="tw-space-y-4">
              <div>
                <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Task name</label>
                <input 
                  type="text" 
                  placeholder="Enter task name"
                  class="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-neutral-secondary tw-rounded-lg"
                />
              </div>
              <div>
                <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Description</label>
                <textarea 
                  placeholder="Enter task description"
                  class="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-neutral-secondary tw-rounded-lg tw-min-h-[100px]"
                ></textarea>
              </div>
            </div>
          </div>
        </ds-drawer>
      </div>
    </ng-template>
  `
});

// Created header story
const CreatedHeaderTemplate: Story['render'] = (args) => ({
  props: args,
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="drawer" variant="primary">Open Created Drawer</ds-button>
      <p>This drawer uses the <code>ds-drawer-header-created</code> component with actions on the left.</p>
    </div>

    <ng-template #drawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog [position]="position">
          <ds-drawer-header-created 
            [showMoreOptions]="true"
            (onClose)="close()"
            (onMoreOptions)="alert('More options clicked')"
            slot="header">
            <ds-button slot="actions" variant="primary" leadingIcon="remixCheckLine">
              Mark as done
            </ds-button>
            <ds-button slot="actions" variant="secondary" leadingIcon="remixAddLine">
              Add time entry
            </ds-button>
          </ds-drawer-header-created>
          
          <div slot="content">
            <div class="tw-space-y-4">
              <div>
                <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Check-in with the roofing guys</h3>
                <p class="tw-text-default-secondary">Give the boys a call and make sure they bring the hammer drill.</p>
              </div>
              <div class="tw-grid tw-grid-cols-2 tw-gap-4">
                <div>
                  <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Status</label>
                  <p class="tw-text-default-primary">In Progress</p>
                </div>
                <div>
                  <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Due Date</label>
                  <p class="tw-text-default-primary">Dec 15, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </ds-drawer>
      </div>
    </ng-template>
  `
});

// Default header story
const DefaultHeaderTemplate: Story['render'] = (args) => ({
  props: args,
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="drawer" variant="primary">Open Default Drawer</ds-button>
      <p>This drawer uses the <code>ds-drawer-header-default</code> component with optional avatar.</p>
    </div>

    <ng-template #drawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog [position]="position">
          <ds-drawer-header-default 
            title="Ruggeri VVS & El"
            [avatarInitials]="'R'"
            (onClose)="close()"
            slot="header" />
          
          <div slot="content">
            <div class="tw-space-y-6">
              <div class="tw-grid tw-grid-cols-3 tw-gap-4">
                <div>
                  <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Inquiry no.</label>
                  <p class="tw-text-default-primary"># 85</p>
                </div>
                <div>
                  <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Status</label>
                  <div class="tw-flex tw-items-center tw-gap-2">
                    <span class="tw-w-2 tw-h-2 tw-rounded-full tw-bg-purple-500"></span>
                    <span class="tw-text-default-primary">Open</span>
                  </div>
                </div>
                <div>
                  <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Date sent</label>
                  <div class="tw-flex tw-items-center tw-gap-2">
                    <ds-icon name="remixTimeLine" size="16px" />
                    <span class="tw-text-default-primary">20. september, 2024</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Inquiry description</h3>
                <p class="tw-text-default-secondary">Vindue i køkkenet er flækket.</p>
              </div>
              
              <div>
                <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Supplier details</h3>
                <p class="tw-text-default-secondary tw-text-sm">No details available</p>
              </div>
            </div>
          </div>
        </ds-drawer>
      </div>
    </ng-template>
  `
});

// Default header without avatar
const DefaultHeaderNoAvatarTemplate: Story['render'] = (args) => ({
  props: args,
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="drawer" variant="primary">Open Default Drawer (No Avatar)</ds-button>
      <p>This drawer uses the <code>ds-drawer-header-default</code> component without an avatar.</p>
    </div>

    <ng-template #drawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog [position]="position">
          <ds-drawer-header-default 
            title="Inquiry Details"
            (onClose)="close()"
            slot="header" />
          
          <div slot="content">
            <div class="tw-space-y-4">
              <p class="tw-text-default-secondary">This is an example drawer without an avatar in the header.</p>
            </div>
          </div>
        </ds-drawer>
      </div>
    </ng-template>
  `
});

export const RightDrawer: Story = {
  args: {
    position: 'right'
  },
  render: BasicTemplate
};

export const LeftDrawer: Story = {
  args: {
    position: 'left'
  },
  render: BasicTemplate
};

export const WithCreateHeader: Story = {
  args: {
    position: 'right'
  },
  render: CreateHeaderTemplate
};

export const WithCreatedHeader: Story = {
  args: {
    position: 'right'
  },
  render: CreatedHeaderTemplate
};

export const WithDefaultHeader: Story = {
  args: {
    position: 'right'
  },
  render: DefaultHeaderTemplate
};

export const WithDefaultHeaderNoAvatar: Story = {
  args: {
    position: 'right'
  },
  render: DefaultHeaderNoAvatarTemplate
};

// Primary + Secondary content (without tabs)
const PrimarySecondaryContentTemplate: Story['render'] = (args) => ({
  props: {
    ...args,
    activeTab: signal('overview')
  },
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="drawer" variant="primary">Open Drawer with Primary + Secondary Content</ds-button>
      <p>This drawer demonstrates the new structure with primary-content and secondary-content slots.</p>
    </div>

    <ng-template #drawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog [position]="position">
          <ds-drawer-header-default 
            title="Task Details"
            (onClose)="close()"
            slot="header" />
          
          <div slot="primary-content">
            <div class="tw-text-sm tw-text-default-secondary tw-mb-2">Woods Augusthus / Roof construction</div>
            <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Check-in with the roofing guys</h3>
            <p class="tw-text-default-secondary">Give the boys a call and make sure they bring the hammer drill.</p>
          </div>
          
          <div slot="secondary-content">
            <div class="tw-space-y-4">
              <div>
                <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Status</label>
                <p class="tw-text-default-primary">In Progress</p>
              </div>
              <div>
                <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Due Date</label>
                <p class="tw-text-default-primary">Dec 15, 2024</p>
              </div>
              <div>
                <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Assigned To</label>
                <p class="tw-text-default-primary">John Doe</p>
              </div>
            </div>
          </div>
        </ds-drawer>
      </div>
    </ng-template>
  `
});

// Primary content + Tabs
const PrimaryContentWithTabsTemplate: Story['render'] = (args) => ({
  props: {
    ...args,
    activeTab: signal('overview')
  },
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="drawer" variant="primary">Open Drawer with Primary Content + Tabs</ds-button>
      <p>This drawer demonstrates the new structure with primary-content and tabs slots.</p>
    </div>

    <ng-template #drawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog [position]="position">
          <ds-drawer-header-default 
            title="Task Details"
            (onClose)="close()"
            slot="header" />
          
          <div slot="primary-content">
            <div class="tw-text-sm tw-text-default-secondary tw-mb-2">Woods Augusthus / Roof construction</div>
            <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Check-in with the roofing guys</h3>
            <p class="tw-text-default-secondary">Give the boys a call and make sure they bring the hammer drill.</p>
          </div>
          
          <ds-tabs slot="tabs" [(value)]="activeTab" [paddingX]="'1rem'">
            <ds-tab value="overview" label="Overview">
              <div class="tw-space-y-4">
                <div>
                  <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Status</label>
                  <p class="tw-text-default-primary">In Progress</p>
                </div>
                <div>
                  <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Due Date</label>
                  <p class="tw-text-default-primary">Dec 15, 2024</p>
                </div>
                <div>
                  <label class="tw-text-sm tw-font-medium tw-text-default-secondary tw-block tw-mb-1">Assigned To</label>
                  <p class="tw-text-default-primary">John Doe</p>
                </div>
              </div>
            </ds-tab>
            <ds-tab value="comments" label="Comments">
              <div class="tw-space-y-4">
                <div class="tw-p-4 tw-bg-white tw-rounded-lg tw-border tw-border-default">
                  <p class="tw-text-sm tw-text-default-primary tw-mb-1">John Doe</p>
                  <p class="tw-text-sm tw-text-default-secondary">This task is progressing well. The team is on schedule.</p>
                </div>
                <div class="tw-p-4 tw-bg-white tw-rounded-lg tw-border tw-border-default">
                  <p class="tw-text-sm tw-text-default-primary tw-mb-1">Jane Smith</p>
                  <p class="tw-text-sm tw-text-default-secondary">Please update the status when complete.</p>
                </div>
              </div>
            </ds-tab>
            <ds-tab value="history" label="History">
              <div class="tw-space-y-3">
                <div class="tw-flex tw-items-start tw-gap-3">
                  <div class="tw-w-2 tw-h-2 tw-rounded-full tw-bg-brand-base tw-mt-1.5"></div>
                  <div>
                    <p class="tw-text-sm tw-font-medium tw-text-default-primary">Task created</p>
                    <p class="tw-text-xs tw-text-default-secondary">Dec 10, 2024 at 10:30 AM</p>
                  </div>
                </div>
                <div class="tw-flex tw-items-start tw-gap-3">
                  <div class="tw-w-2 tw-h-2 tw-rounded-full tw-bg-brand-base tw-mt-1.5"></div>
                  <div>
                    <p class="tw-text-sm tw-font-medium tw-text-default-primary">Status changed to In Progress</p>
                    <p class="tw-text-xs tw-text-default-secondary">Dec 12, 2024 at 2:15 PM</p>
                  </div>
                </div>
              </div>
            </ds-tab>
          </ds-tabs>
        </ds-drawer>
      </div>
    </ng-template>
  `
});

export const WithPrimaryAndSecondaryContent: Story = {
  args: {
    position: 'right'
  },
  render: PrimarySecondaryContentTemplate
};

export const WithPrimaryContentAndTabs: Story = {
  args: {
    position: 'right'
  },
  render: PrimaryContentWithTabsTemplate
};
