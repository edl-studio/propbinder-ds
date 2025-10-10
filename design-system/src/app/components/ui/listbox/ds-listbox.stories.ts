import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsListboxComponent, DsListboxOption } from './ds-listbox';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconButtonComponent } from '../button/ds-icon-button';

const meta: Meta<DsListboxComponent> = {
  title: 'Primitives/Listbox',
  component: DsListboxComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, DsButtonComponent, DsIconButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    width: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<DsListboxComponent>;

const simpleOptions: DsListboxOption[] = [
  { id: '1', label: 'Option 1', value: 1 },
  { id: '2', label: 'Option 2', value: 2 },
  { id: '3', label: 'Option 3', value: 3 },
  { id: '4', label: 'Option 4', value: 4 },
];

export const SingleSelect: Story = {
  args: {
    options: simpleOptions,
    multiple: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-listbox [options]="options" [multiple]="multiple" [disabled]="disabled">
        <ds-button variant="secondary">Select Option</ds-button>
      </ds-listbox>
    `,
  }),
};

export const MultiSelect: Story = {
  args: {
    options: [
      { id: '1', label: 'Read', value: 'read' },
      { id: '2', label: 'Write', value: 'write' },
      { id: '3', label: 'Delete', value: 'delete' },
      { id: '4', label: 'Admin', value: 'admin' },
    ],
    multiple: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-listbox [options]="options" [multiple]="multiple" [disabled]="disabled">
        <ds-button variant="secondary">Select Permissions</ds-button>
      </ds-listbox>
    `,
  }),
};

export const WithIconButton: Story = {
  args: {
    options: simpleOptions,
    multiple: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-listbox [options]="options" [multiple]="multiple" [disabled]="disabled">
        <ds-icon-button icon="remixMoreLine" variant="ghost" ariaLabel="More options" />
      </ds-listbox>
    `,
  }),
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { id: '1', label: 'Available Option 1', value: 1 },
      { id: '2', label: 'Disabled Option', value: 2, disabled: true },
      { id: '3', label: 'Available Option 2', value: 3 },
      { id: '4', label: 'Another Disabled', value: 4, disabled: true },
    ],
    multiple: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-listbox [options]="options" [multiple]="multiple" [disabled]="disabled">
        <ds-button variant="secondary">Select Options</ds-button>
      </ds-listbox>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    options: simpleOptions,
    multiple: false,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-listbox [options]="options" [multiple]="multiple" [disabled]="disabled">
        <ds-button variant="secondary">Disabled Listbox</ds-button>
      </ds-listbox>
    `,
  }),
};

export const ColumnSelector: Story = {
  args: {
    options: [
      { id: '1', label: 'Name', value: 'name' },
      { id: '2', label: 'Email', value: 'email' },
      { id: '3', label: 'Role', value: 'role' },
      { id: '4', label: 'Status', value: 'status' },
      { id: '5', label: 'Join Date', value: 'joinDate' },
    ],
    multiple: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-listbox [options]="options" [multiple]="multiple" [disabled]="disabled">
        <ds-icon-button icon="remixSettings3Line" variant="ghost" ariaLabel="Select columns" />
      </ds-listbox>
    `,
  }),
};

export const FilterPanel: Story = {
  args: {
    options: [
      { id: '1', label: 'Active', value: 'active' },
      { id: '2', label: 'Inactive', value: 'inactive' },
      { id: '3', label: 'Pending', value: 'pending' },
      { id: '4', label: 'Archived', value: 'archived' },
    ],
    multiple: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-listbox [options]="options" [multiple]="multiple" [disabled]="disabled">
        <ds-button variant="ghost" leadingIcon="remixFilterLine">Filter Status</ds-button>
      </ds-listbox>
    `,
  }),
};

export const CustomWidth: Story = {
  args: {
    options: [
      { id: '1', label: 'Short', value: 1 },
      { id: '2', label: 'Medium Length Option', value: 2 },
      { id: '3', label: 'Very Long Option Name Here', value: 3 },
    ],
    multiple: false,
    disabled: false,
    width: '300px',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-listbox [options]="options" [multiple]="multiple" [disabled]="disabled" [width]="width">
        <ds-button variant="secondary">Custom Width</ds-button>
      </ds-listbox>
    `,
  }),
};

