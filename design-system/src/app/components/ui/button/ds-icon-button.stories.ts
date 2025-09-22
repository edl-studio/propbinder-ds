import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { DsIconButtonComponent } from './ds-icon-button';
import { DsIconComponent } from '../icon/ds-icon';
import { provideAllRemixIcons } from '../../../lib/icons';

const meta: Meta<DsIconButtonComponent> = {
  decorators: [
    applicationConfig({
      providers: [provideAllRemixIcons()]
    })
  ],
  parameters: {
    layout: 'centered'
  },
  title: 'Primitives/IconButton',
  component: DsIconButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual style variant of the button',
      table: {
        defaultValue: { summary: 'ghost' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the button',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    icon: {
      control: 'text',
      description: 'Icon name to display (only used when no custom content is projected)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    pressed: {
      control: 'boolean',
      description: 'Whether the button is in a pressed state (for toggle buttons)',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the button controls an expanded element',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the button (required for icon buttons)',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text to display on hover',
    }
  }
};

export default meta;
type Story = StoryObj<DsIconButtonComponent>;

// Simple icon usage (preferred pattern)
export const SimpleIcon: Story = {
  args: {
    icon: 'remixEditLine',
    variant: 'ghost',
    size: 'md',
    ariaLabel: 'Edit item',
    tooltip: 'Edit this item'
  }
};

// Custom content projection
export const CustomContent: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    ariaLabel: 'Star item'
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-icon-button [variant]="variant" [size]="size" [ariaLabel]="ariaLabel">
        <ds-icon name="remixStarFill" />
      </ds-icon-button>
    `,
    moduleMetadata: {
      imports: [DsIconComponent]
    }
  })
};

// Loading state
export const Loading: Story = {
  args: {
    icon: 'remixRefreshLine',
    variant: 'secondary',
    size: 'md',
    loading: true,
    ariaLabel: 'Refreshing'
  }
};

// Disabled state
export const Disabled: Story = {
  args: {
    icon: 'remixDeleteBinLine',
    variant: 'destructive',
    size: 'md',
    disabled: true,
    ariaLabel: 'Delete item',
    tooltip: 'Cannot delete this item'
  }
};

// Size variants
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ds-icon-button
          icon="remixSettingsLine"
          variant="ghost"
          size="sm"
          ariaLabel="Small settings button"
          tooltip="Settings (small)"
        />
        <ds-icon-button
          icon="remixSettingsLine"
          variant="ghost"
          size="md"
          ariaLabel="Medium settings button"
          tooltip="Settings (medium)"
        />
        <ds-icon-button
          icon="remixSettingsLine"
          variant="ghost"
          size="lg"
          ariaLabel="Large settings button"
          tooltip="Settings (large)"
        />
      </div>
    `
  })
};

// Variant showcase
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ds-icon-button
          icon="remixHeartLine"
          variant="primary"
          ariaLabel="Primary variant"
          tooltip="Primary action"
        />
        <ds-icon-button
          icon="remixHeartLine"
          variant="secondary"
          ariaLabel="Secondary variant"
          tooltip="Secondary action"
        />
        <ds-icon-button
          icon="remixHeartLine"
          variant="ghost"
          ariaLabel="Ghost variant"
          tooltip="Ghost action"
        />
        <ds-icon-button
          icon="remixHeartLine"
          variant="destructive"
          ariaLabel="Destructive variant"
          tooltip="Destructive action"
        />
      </div>
    `
  })
};
