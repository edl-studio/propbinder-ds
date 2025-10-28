import { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from './ds-button';
import { DsIconComponent } from '../icon/ds-icon';

const meta: Meta<DsButtonComponent> = {
  title: 'Primitives/Button',
  component: DsButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'ai-primary', 'ai-ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    pressed: { control: 'boolean' },
    expanded: { control: 'boolean' },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
    ariaLabel: { control: 'text' },
    iconOnly: { control: 'boolean' },
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
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
    props: args,
    template: `<ds-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Default Button</ds-button>`,
  }),
};

export const Variants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
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
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
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
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
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
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
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
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
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
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
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
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
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
  render: () => ({
    moduleMetadata: {
      imports: [DsButtonComponent, DsIconComponent],
    },
    props: {
      clickCount: 0,
      onClick: function(this: { clickCount: number }) {
        this.clickCount++;
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <ds-button 
          variant="primary"
          leadingIcon="remixThumbUpLine"
          (clicked)="onClick()"
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