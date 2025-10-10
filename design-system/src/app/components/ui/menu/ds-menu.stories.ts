import { Meta, StoryObj, componentWrapperDecorator, applicationConfig } from '@storybook/angular';
import { DsMenuComponent, DsMenuItem } from './ds-menu';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconButtonComponent } from '../button/ds-icon-button';

const meta: Meta<DsMenuComponent> = {
  title: 'Primitives/Menu',
  component: DsMenuComponent,
  tags: ['autodocs'],
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="display: flex; justify-content: center;">${story}</div>`
    ),
    applicationConfig({
      providers: [],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: true,
        iframeHeight: 100,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsMenuComponent>;

const basicMenuItems: DsMenuItem[] = [
  { id: '1', label: 'Edit', action: () => console.log('Edit clicked') },
  { id: '2', label: 'Duplicate', action: () => console.log('Duplicate clicked') },
  { id: '3', label: 'Archive', action: () => console.log('Archive clicked') },
  { id: 'sep1', label: '', separator: true },
  { id: '4', label: 'Delete', destructive: true, action: () => console.log('Delete clicked') },
];

const menuWithIcons: DsMenuItem[] = [
  { id: '1', label: 'Edit', icon: 'remixEditLine', action: () => console.log('Edit clicked') },
  { id: '2', label: 'Copy', icon: 'remixFileCopyLine', action: () => console.log('Copy clicked') },
  { id: '3', label: 'Share', icon: 'remixShareLine', action: () => console.log('Share clicked') },
  { id: 'sep1', label: '', separator: true },
  { id: '4', label: 'Download', icon: 'remixDownloadLine', action: () => console.log('Download clicked') },
  { id: 'sep2', label: '', separator: true },
  { id: '5', label: 'Delete', icon: 'remixDeleteBinLine', destructive: true, action: () => console.log('Delete clicked') },
];

const menuWithDisabled: DsMenuItem[] = [
  { id: '1', label: 'New File', icon: 'remixFileAddLine' },
  { id: '2', label: 'New Folder', icon: 'remixFolderAddLine' },
  { id: '3', label: 'Upload', icon: 'remixUploadLine', disabled: true },
  { id: 'sep1', label: '', separator: true },
  { id: '4', label: 'Settings', icon: 'remixSettingsLine' },
];

export const Default: Story = {
  args: {
    items: basicMenuItems,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-menu [items]="items">
        <ds-button variant="secondary">Actions</ds-button>
      </ds-menu>
    `,
    moduleMetadata: {
      imports: [DsMenuComponent, DsButtonComponent],
    },
  }),
};

export const WithIcons: Story = {
  args: {
    items: menuWithIcons,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-menu [items]="items">
        <ds-button variant="secondary">Options</ds-button>
      </ds-menu>
    `,
    moduleMetadata: {
      imports: [DsMenuComponent, DsButtonComponent],
    },
  }),
};

export const WithDisabledItems: Story = {
  args: {
    items: menuWithDisabled,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-menu [items]="items">
        <ds-button variant="secondary">File</ds-button>
      </ds-menu>
    `,
    moduleMetadata: {
      imports: [DsMenuComponent, DsButtonComponent],
    },
  }),
};

export const ActionMenu: Story = {
  args: {
    items: [
      { id: '1', label: 'View Details', icon: 'remixEyeLine' },
      { id: '2', label: 'Edit Properties', icon: 'remixEditLine' },
      { id: 'sep1', label: '', separator: true },
      { id: '3', label: 'Make a Copy', icon: 'remixFileCopyLine' },
      { id: '4', label: 'Move to...', icon: 'remixFolderTransferLine' },
      { id: '5', label: 'Add to Favorites', icon: 'remixStarLine' },
      { id: 'sep2', label: '', separator: true },
      { id: '6', label: 'Remove', icon: 'remixDeleteBinLine', destructive: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-menu [items]="items">
        <ds-icon-button icon="remixMore2Line" variant="ghost" ariaLabel="Item actions" />
      </ds-menu>
    `,
    moduleMetadata: {
      imports: [DsMenuComponent, DsIconButtonComponent],
    },
  }),
};

