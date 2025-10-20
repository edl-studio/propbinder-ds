import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsInlineMessageComponent } from './ds-inline-message';
import { DsButtonComponent } from '../button/ds-button';

const meta: Meta<DsInlineMessageComponent> = {
  title: 'Primitives/Inline Message',
  component: DsInlineMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [DsButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'information'],
      description: 'Visual style variant of the message',
    },
    title: {
      control: 'text',
      description: 'Title text displayed in the message',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    icon: {
      control: 'text',
      description: 'Custom icon name (optional)',
    },
    iconSize: {
      control: 'text',
      description: 'Icon size',
    },
  },
};

export default meta;
type Story = StoryObj<DsInlineMessageComponent>;

export const SuccessMessage: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    description: 'A short description',
  },
};

export const ErrorMessage: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'A short description',
  },
};

export const WarningMessage: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'A short description',
  },
};

export const Information: Story = {
  args: {
    variant: 'information',
    title: 'Information',
    description: 'A short description',
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <ds-inline-message variant="success" title="Success">
          A short description
        </ds-inline-message>
        
        <ds-inline-message variant="error" title="Error">
          A short description
        </ds-inline-message>
        
        <ds-inline-message variant="warning" title="Warning">
          A short description
        </ds-inline-message>
        
        <ds-inline-message variant="information" title="Information">
          A short description
        </ds-inline-message>
      </div>
    `,
  }),
};

export const LongContent: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <ds-inline-message variant="success" title="Operation Completed Successfully">
          Your changes have been saved and will take effect immediately. You can continue working without any interruptions.
        </ds-inline-message>
        
        <ds-inline-message variant="error" title="Failed to Save Changes">
          An error occurred while trying to save your changes. Please check your connection and try again. If the problem persists, contact support.
        </ds-inline-message>
      </div>
    `,
  }),
};

export const WithCustomIcon: Story = {
  args: {
    variant: 'information',
    title: 'Custom Icon',
    description: 'This message uses a custom icon instead of the default one.',
    icon: 'remixLightbulbLine',
  },
};

export const WithoutDescription: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <ds-inline-message variant="success" title="Success" />
        <ds-inline-message variant="error" title="Error" />
        <ds-inline-message variant="warning" title="Warning" />
        <ds-inline-message variant="information" title="Information" />
      </div>
    `,
  }),
};

export const DifferentWidths: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="max-width: 300px;">
          <ds-inline-message variant="success" title="Narrow">
            This message is in a narrow container.
          </ds-inline-message>
        </div>
        
        <div style="max-width: 600px;">
          <ds-inline-message variant="information" title="Medium">
            This message is in a medium-width container.
          </ds-inline-message>
        </div>
        
        <div>
          <ds-inline-message variant="warning" title="Full Width">
            This message takes up the full width of its container.
          </ds-inline-message>
        </div>
      </div>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 800px;">
        <ds-inline-message variant="success" title="Success" description="Your changes have been saved successfully.">
          <div actions style="display: flex; gap: 8px;">
            <ds-button variant="primary" size="sm">View</ds-button>
            <ds-button variant="ghost" size="sm">Dismiss</ds-button>
          </div>
        </ds-inline-message>
        
        <ds-inline-message variant="warning" title="Warning" description="This action cannot be undone. Please review before continuing.">
          <div actions style="display: flex; gap: 8px;">
            <ds-button variant="primary" size="sm">Continue</ds-button>
            <ds-button variant="ghost" size="sm">Cancel</ds-button>
          </div>
        </ds-inline-message>
        
        <ds-inline-message variant="information" title="Update Available" description="A new version is ready to install.">
          <div actions>
            <ds-button variant="primary" size="sm">Update Now</ds-button>
          </div>
        </ds-inline-message>

        <ds-inline-message variant="error" title="Connection Failed" description="Unable to connect to the server. Please check your internet connection.">
          <div actions style="display: flex; gap: 8px;">
            <ds-button variant="primary" size="sm">Retry</ds-button>
            <ds-button variant="ghost" size="sm">Dismiss</ds-button>
          </div>
        </ds-inline-message>
      </div>
    `,
  }),
};

