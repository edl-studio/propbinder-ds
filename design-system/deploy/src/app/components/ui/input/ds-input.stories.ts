import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { DsInputComponent } from './ds-input';

const meta: Meta<DsInputComponent> = {
  title: 'Primitives/Input',
  component: DsInputComponent,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: true,
        iframeHeight: 100,
      }
    }
  },
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="display: flex; justify-content: center;"><div style="width: 200px;">${story}</div></div>`
    )
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'error', 'warning', 'success'] },
    type: { control: { type: 'select' }, options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
  },
  args: {
    variant: 'default',
    type: 'text',
    placeholder: 'Enter text...',
    disabled: false,
    readonly: false,
    required: false,
    clearable: false,
  },
};
export default meta;

type Story = StoryObj<DsInputComponent>;

export const Default: Story = {};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: 'remixUserLine', placeholder: 'Username' },
};
