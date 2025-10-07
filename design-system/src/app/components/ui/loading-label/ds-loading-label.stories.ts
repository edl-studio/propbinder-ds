import type { Meta, StoryObj } from '@storybook/angular';
import { DsLoadingLabelComponent } from './ds-loading-label.component';

const meta: Meta<DsLoadingLabelComponent> = {
  title: 'Primitives/Loading Label',
  component: DsLoadingLabelComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A loading label component that displays a sequence of messages with smooth transitions.
Features:
- Vertical slide transitions between messages
- Animated ellipsis dots
- Customizable text styling via design system classes
- Automatic message cycling
        `,
      },
    },
  },
  argTypes: {
    messages: {
      control: 'object',
      description: 'Array of loading messages to cycle through',
    },
    styleClass: {
      control: 'select',
      options: [
        'body-sm-regular',
        'body-sm-medium',
        'body-sm-semiBold',
        'body-base-regular',
        'body-base-medium',
        'body-base-semiBold',
        'body-lg-regular',
        'body-lg-medium',
        'body-lg-semiBold',
      ],
      description: 'CSS class to apply for text styling',
    },
    spinnerSize: {
      control: 'text',
      description: 'Size of the spinner in pixels',
    },
    useShimmer: {
      control: 'boolean',
      description: 'Whether to apply shimmer effect to the text',
    },
  },
};

export default meta;
type Story = StoryObj<DsLoadingLabelComponent>;

export const Default: Story = {
  args: {
    messages: [
      'Reviewing tenant inquiries',
      'Summarising maintenance patterns',
      'Updating your recommendations',
      'Analyzing property data',
    ],
    styleClass: 'body-sm-regular',
    useShimmer: true,
  },
};

export const WithoutShimmer: Story = {
  args: {
    messages: [
      'Reviewing tenant inquiries',
      'Summarising maintenance patterns',
      'Updating your recommendations',
    ],
    styleClass: 'body-sm-regular',
    useShimmer: false,
  },
};

export const LargerText: Story = {
  args: {
    messages: [
      'Processing your data',
      'Analyzing trends',
      'Generating insights',
    ],
    styleClass: 'body-base-medium',
  },
};

export const AIProcessing: Story = {
  args: {
    messages: [
      'Training AI model',
      'Processing historical data',
      'Generating predictions',
      'Optimizing results',
    ],
    styleClass: 'body-sm-regular',
  },
};
