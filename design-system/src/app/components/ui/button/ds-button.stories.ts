import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from './ds-button';

const meta: Meta<DsButtonComponent> = {
  title: 'Primitives/Button',
  component: DsButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive', 'ai-primary', 'ai-ghost'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in loading state',
    },
    pressed: {
      control: { type: 'boolean' },
      description: 'Whether the button appears pressed (for toggle buttons)',
    },
    expanded: {
      control: { type: 'boolean' },
      description: 'Whether the button is expanded (for dropdown buttons)',
    },
    leadingIcon: {
      control: { type: 'text' },
      description: 'Icon to display before the button text',
    },
    trailingIcon: {
      control: { type: 'text' },
      description: 'Icon to display after the button text',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessibility label for the button',
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Whether the button displays only an icon without text',
    },
  },
};

export default meta;
type Story = StoryObj<DsButtonComponent>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Default Button</ds-button>`,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ds-button variant="primary">Primary</ds-button>
        <ds-button variant="secondary">Secondary</ds-button>
        <ds-button variant="ghost">Ghost</ds-button>
        <ds-button variant="destructive">Destructive</ds-button>
        <ds-button variant="ai-primary" class="depth-xs">
          <ds-icon slot="leading" name="remixSparkling2Fill" [color]="'var(--ai-gradient-color-1)'" />
          <span>AI Primary</span>
        </ds-button>
        <ds-button variant="ai-ghost" class="depth-xs">
          <ds-icon slot="leading" name="remixSparkling2Fill" [color]="'var(--ai-gradient-color-1)'" />
          <span>AI Ghost</span>
        </ds-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <ds-button size="sm">Small</ds-button>
        <ds-button size="md">Medium</ds-button>
        <ds-button size="lg">Large</ds-button>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ds-button leadingIcon="remixHomeLine">
          Home
        </ds-button>
        <ds-button trailingIcon="remixArrowRightLine">
          Continue
        </ds-button>
        <ds-button 
          leadingIcon="remixUserLine"
          variant="secondary"
        >
          Profile
        </ds-button>
      </div>
    `,
  }),
};

export const IconButtonVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ds-button 
          [iconOnly]="true" 
          leadingIcon="remixStarLine" 
          ariaLabel="Favorite"
          variant="primary"
        ></ds-button>
        <ds-button 
          [iconOnly]="true" 
          leadingIcon="remixSettingsLine" 
          ariaLabel="Settings"
          variant="secondary"
        ></ds-button>
        <ds-button 
          [iconOnly]="true" 
          leadingIcon="remixMoreLine" 
          ariaLabel="More options"
          variant="ghost"
        ></ds-button>
        <ds-button 
          [iconOnly]="true" 
          leadingIcon="remixDeleteBinLine" 
          ariaLabel="Delete"
          variant="destructive"
        ></ds-button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ds-button>Normal</ds-button>
        <ds-button [disabled]="true">Disabled</ds-button>
        <ds-button [loading]="true">Loading</ds-button>
        <ds-button [pressed]="true" variant="ghost">Pressed</ds-button>
        <ds-button 
          [expanded]="true" 
          trailingIcon="remixArrowDownLine"
          variant="secondary"
        >
          Expanded
        </ds-button>
      </div>
    `,
  }),
};

export const LoadingStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ds-button [loading]="true" variant="primary">
          Saving...
        </ds-button>
        <ds-button 
          [loading]="true" 
          variant="ghost"
          leadingIcon="remixUploadLine"
        >
          Uploading...
        </ds-button>
        <ds-button 
          [loading]="true" 
          variant="secondary"
        >
          Processing
        </ds-button>
        <ds-button 
          [loading]="true" 
          variant="destructive"
        >
          Deleting...
        </ds-button>
      </div>
    `,
  }),
};


export const AIVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ds-button variant="ai-primary" class="depth-xs">
          <ds-icon slot="leading" name="remixSparkling2Fill" />
          <span>Generate suggestions</span>
        </ds-button>
        <ds-button variant="ai-ghost" class="depth-xs">
          <ds-icon slot="leading" name="remixSparkling2Fill" />
          <span>Generate suggestions</span>
        </ds-button>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    leadingIcon: 'remixThumbUpLine',
  },
  render: (args) => ({
    props: {
      ...args,
      clickCount: 0,
      onClick: function(event: MouseEvent) {
        this['clickCount']++;
        console.log('Button clicked!', event);
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <ds-button 
          [variant]="variant"
          [size]="size"
          [leadingIcon]="leadingIcon"
          (clicked)="onClick($event)"
        >
          Like ({{clickCount}})
        </ds-button>
        <p style="font-size: 0.875rem; color: var(--color-gray-600);">
          Click count: {{clickCount}}
        </p>
      </div>
    `,
  }),
}; 