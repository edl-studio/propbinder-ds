import { Meta, StoryObj, moduleMetadata, componentWrapperDecorator } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsSelectComponent, DsSelectOption } from './ds-select';

interface ExampleOption {
  id: string;
  name: string;
}

const meta: Meta<DsSelectComponent> = {
  title: 'Primitives/Select',
  component: DsSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="display: flex; justify-content: center;"><div style="width: 200px;">${story}</div></div>`
    )
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: true,
        iframeHeight: 100,
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    ghost: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<DsSelectComponent>;

const simpleOptions: DsSelectOption[] = [
  { id: '1', label: 'Option 1', value: 1 },
  { id: '2', label: 'Option 2', value: 2 },
  { id: '3', label: 'Option 3', value: 3 },
  { id: '4', label: 'Option 4', value: 4 },
];

const groupedOptions: DsSelectOption[] = [
  { id: '1', label: 'Apple', value: 'apple', group: 'Fruits' },
  { id: '2', label: 'Banana', value: 'banana', group: 'Fruits' },
  { id: '3', label: 'Orange', value: 'orange', group: 'Fruits' },
  { id: '4', label: 'Carrot', value: 'carrot', group: 'Vegetables' },
  { id: '5', label: 'Broccoli', value: 'broccoli', group: 'Vegetables' },
  { id: '6', label: 'Potato', value: 'potato', group: 'Vegetables' },
];

export const Default: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Select an option',
    variant: 'default',
    disabled: false,
    required: false,
    ghost: false,
  },
};

export const WithGroups: Story = {
  args: {
    options: groupedOptions,
    placeholder: 'Select food',
    variant: 'default',
  },
};

export const Disabled: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Select an option',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Select an option',
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Select an option',
    variant: 'warning',
  },
};

export const Success: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Select an option',
    variant: 'success',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { id: '1', label: 'Option 1', value: 1 },
      { id: '2', label: 'Option 2', value: 2, disabled: true },
      { id: '3', label: 'Option 3', value: 3 },
      { id: '4', label: 'Option 4', value: 4, disabled: true },
    ],
    placeholder: 'Select an option',
  },
};

export const Ghost: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Ghost select',
    ghost: true,
  },
};

export const GhostWithGroups: Story = {
  args: {
    options: groupedOptions,
    placeholder: 'Ghost select with groups',
    ghost: true,
  },
};
