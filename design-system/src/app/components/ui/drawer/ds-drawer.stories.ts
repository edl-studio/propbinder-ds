import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsDrawerComponent } from './ds-drawer';
import { DsButtonComponent } from '../button/ds-button';
import { NgpDialogTrigger, NgpDialogOverlay, NgpDialog } from 'ng-primitives/dialog';

interface DrawerStoryProps {
  position: 'left' | 'right';
}

const meta: Meta<DrawerStoryProps> = {
  title: 'Primitives/Drawer',
  component: DsDrawerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsDrawerComponent, DsButtonComponent, NgpDialogTrigger, NgpDialogOverlay, NgpDialog],
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

const Template: Story['render'] = (args) => ({
  props: args,
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="drawer" variant="primary">Open Drawer</ds-button>
      <p>This is the main page content. When you open the drawer, it should overlay this content with a semi-transparent background.</p>
    </div>

    <ng-template #drawer let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-drawer-overlay">
        <ds-drawer ngpDialog [position]="position">
          <h2 slot="header" class="tw-text-xl tw-font-semibold">Drawer Title</h2>
          <div slot="content">
            <p class="tw-text-neutral-700 tw-mb-4">This is the main content of the drawer.</p>
            <p class="tw-text-neutral-600 tw-mb-4">You can put any content here including forms, lists, or other components.</p>
            <div class="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
              <h3 class="tw-font-medium tw-mb-2">Example Content</h3>
              <p class="tw-text-sm tw-text-gray-600">This drawer should slide in from the {{ position }} side of the screen.</p>
            </div>
          </div>
          <div slot="footer">
            <ds-button variant="ghost" (click)="close()">Cancel</ds-button>
            <ds-button variant="primary" (click)="close()">Save Changes</ds-button>
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
  render: Template
};

export const LeftDrawer: Story = {
  args: {
    position: 'left'
  },
  render: Template
};