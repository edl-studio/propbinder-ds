import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { DsComboboxComponent } from './ds-combobox';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconButtonComponent } from '../button/ds-icon-button';
import { DsSelectComponent } from '../select/ds-select';

const meta: Meta<DsComboboxComponent> = {
  title: 'Primitives/Combobox',
  component: DsComboboxComponent,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: true,
        iframeHeight: 300,
      }
    }
  },
  decorators: [
    moduleMetadata({
      imports: [DsButtonComponent, DsIconButtonComponent, DsSelectComponent],
    }),
    componentWrapperDecorator(
      (story) => `<div style="display: flex; justify-content: center;"><div style="width: 300px;">${story}</div></div>`
    )
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    width: { control: 'text' },
    options: { control: { type: 'object' } },
  },
  args: {
    placeholder: 'Search...',
    disabled: false,
    width: 'auto',
    options: [
      'Marty McFly',
      'Doc Brown',
      'Biff Tannen',
      'George McFly',
      'Jennifer Parker',
      'Emmett Brown',
      'Einstein',
      'Clara Clayton',
      'Needles',
      'Goldie Wilson',
      'Marvin Berry',
      'Lorraine Baines',
      'Strickland',
    ],
  },
};
export default meta;

type Story = StoryObj<DsComboboxComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox 
        [options]="options" 
        [placeholder]="placeholder" 
        [selectPlaceholder]="'Select an option'"
        [disabled]="disabled" 
        [width]="width"
      />
    `,
  }),
};

export const WithSecondaryButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox [options]="options" [placeholder]="placeholder" [disabled]="disabled" [width]="width">
        <ds-button variant="secondary">Select an option</ds-button>
      </ds-combobox>
    `,
  }),
};

export const WithPrimaryButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox [options]="options" [placeholder]="placeholder" [disabled]="disabled" [width]="width">
        <ds-button variant="primary">Choose option</ds-button>
      </ds-combobox>
    `,
  }),
};

export const WithGhostButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox [options]="options" [placeholder]="placeholder" [disabled]="disabled" [width]="width">
        <ds-button variant="ghost">Filter</ds-button>
      </ds-combobox>
    `,
  }),
};

export const WithIconButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox [options]="options" [placeholder]="placeholder" [disabled]="disabled" [width]="width">
        <ds-icon-button icon="remixSettings3Line" variant="ghost" ariaLabel="Open menu" />
      </ds-combobox>
    `,
  }),
};

export const WithFilterIconButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox [options]="options" [placeholder]="placeholder" [disabled]="disabled" [width]="width">
        <ds-icon-button icon="remixFilter3Line" variant="secondary" ariaLabel="Filter options" />
      </ds-combobox>
    `,
  }),
};


export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox 
        [options]="options" 
        [placeholder]="placeholder" 
        [selectPlaceholder]="'Disabled'"
        [disabled]="disabled" 
        [width]="width"
      />
    `,
  }),
};

export const WithFewOptions: Story = {
  args: { 
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Search options...'
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox 
        [options]="options" 
        [placeholder]="placeholder" 
        [selectPlaceholder]="'Select option'"
        [disabled]="disabled" 
        [width]="width"
      />
    `,
  }),
};

export const WithManyOptions: Story = {
  args: { 
    placeholder: 'Search users...',
    options: [
      'Alice Anderson',
      'Bob Brown',
      'Charlie Chen',
      'David Davis',
      'Eve Edwards',
      'Frank Foster',
      'Grace Green',
      'Henry Hill',
      'Ivy Irving',
      'Jack Johnson',
      'Karen King',
      'Larry Lee',
      'Mary Martin',
      'Nancy Nelson',
      'Oliver Owen'
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-combobox 
        [options]="options" 
        [placeholder]="placeholder" 
        [selectPlaceholder]="'Select user'"
        [disabled]="disabled" 
        [width]="width"
      />
    `,
  }),
};
