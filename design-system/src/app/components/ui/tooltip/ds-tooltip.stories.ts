import type { Meta, StoryObj } from '@storybook/angular';
import { DsTooltipComponent } from './ds-tooltip';
import { DsButtonComponent } from '../button/ds-button';
import { DsInputComponent } from '../input/ds-input';
import { DsCheckboxComponent } from '../checkbox/ds-checkbox';
import { DsLabelComponent } from '../label/ds-label';
import { DsIconComponent } from '../icon/ds-icon';

const meta: Meta<DsTooltipComponent> = {
  title: 'Primitives/Tooltip',
  component: DsTooltipComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'The text content to display in the tooltip',
    },
  },
};

export default meta;
type Story = StoryObj<DsTooltipComponent>;

export const Default: Story = {
  args: {
    text: 'This is a helpful tooltip',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-tooltip [text]="text">
        <ds-button variant="primary">Hover me</ds-button>
      </ds-tooltip>
    `,
    moduleMetadata: {
      imports: [DsTooltipComponent, DsButtonComponent],
    },
  }),
};

export const WithButton: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
        <ds-tooltip text="Primary action button">
          <ds-button variant="primary">Primary</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Secondary action button">
          <ds-button variant="secondary">Secondary</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Ghost style button">
          <ds-button variant="ghost">Ghost</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Destructive action - use with caution">
          <ds-button variant="destructive">Delete</ds-button>
        </ds-tooltip>
      </div>
    `,
    moduleMetadata: {
      imports: [DsTooltipComponent, DsButtonComponent],
    },
  }),
};

export const LongText: Story = {
  render: () => ({
    template: `
      <ds-tooltip text="This is a very long tooltip text that should wrap properly and demonstrate how the tooltip handles longer content gracefully without breaking the layout.">
        <ds-button>Long tooltip text</ds-button>
      </ds-tooltip>
    `,
    moduleMetadata: {
      imports: [DsTooltipComponent, DsButtonComponent],
    },
  }),
};

export const IconButtons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <ds-tooltip text="Add to favorites">
          <ds-button 
            [iconOnly]="true" 
            leadingIcon="remixStarLine" 
            ariaLabel="Favorite"
            variant="ghost"
          ></ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Settings and preferences">
          <ds-button 
            [iconOnly]="true" 
            leadingIcon="remixSettingsLine" 
            ariaLabel="Settings"
            variant="ghost"
          ></ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="More options menu">
          <ds-button 
            [iconOnly]="true" 
            leadingIcon="remixMoreLine" 
            ariaLabel="More options"
            variant="ghost"
          ></ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Delete permanently">
          <ds-button 
            [iconOnly]="true" 
            leadingIcon="remixDeleteBinLine" 
            ariaLabel="Delete"
            variant="ghost"
          ></ds-button>
        </ds-tooltip>
      </div>
    `,
    moduleMetadata: {
      imports: [DsTooltipComponent, DsButtonComponent],
    },
  }),
};

export const WithFormElements: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start; width: 300px;">
        <ds-tooltip text="Enter your email address">
          <ds-input 
            type="email" 
            placeholder="Email address"
            variant="default"
          />
        </ds-tooltip>
        
        <ds-tooltip text="Check this to receive notifications">
          <div style="display: flex; align-items: center; gap: 8px;">
            <ds-checkbox />
            <ds-label>Subscribe to notifications</ds-label>
          </div>
        </ds-tooltip>
        
        <ds-tooltip text="This icon represents settings">
          <ds-icon name="remixSettingsLine" size="24px" style="cursor: pointer;" />
        </ds-tooltip>
        
        <ds-tooltip text="Submit your information">
          <ds-button variant="primary" size="sm">Submit</ds-button>
        </ds-tooltip>
      </div>
    `,
    moduleMetadata: {
      imports: [DsTooltipComponent, DsInputComponent, DsCheckboxComponent, DsLabelComponent, DsIconComponent, DsButtonComponent],
    },
  }),
};

export const ButtonSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
        <ds-tooltip text="Small button tooltip">
          <ds-button size="sm" variant="primary">Small</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Medium button tooltip">
          <ds-button size="md" variant="secondary">Medium</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Large button tooltip">
          <ds-button size="lg" variant="ghost">Large</ds-button>
        </ds-tooltip>
      </div>
    `,
    moduleMetadata: {
      imports: [DsTooltipComponent, DsButtonComponent],
    },
  }),
};

export const DifferentPlacements: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; padding: 4rem; place-items: center;">
        <ds-tooltip text="Tooltip on top">
          <ds-button>Top</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Tooltip on right">
          <ds-button>Right</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Tooltip on bottom">
          <ds-button>Bottom</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Tooltip on left">
          <ds-button>Left</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Auto placement">
          <ds-button>Auto</ds-button>
        </ds-tooltip>
        
        <ds-tooltip text="Another tooltip">
          <ds-button>Center</ds-button>
        </ds-tooltip>
      </div>
    `,
    moduleMetadata: {
      imports: [DsTooltipComponent, DsButtonComponent],
    },
  }),
};

export const Interactive: Story = {
  args: {
    text: 'Click to see the action',
  },
  render: (args) => ({
    props: {
      ...args,
      clickCount: 0,
      onClick: function() {
        this['clickCount']++;
        console.log('Button clicked from tooltip!');
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <ds-tooltip [text]="text">
          <ds-button (clicked)="onClick()">
            Click me ({{clickCount}})
          </ds-button>
        </ds-tooltip>
        <p style="font-size: 0.875rem; color: var(--text-color-default-secondary);">
          Click count: {{clickCount}}
        </p>
      </div>
    `,
    moduleMetadata: {
      imports: [DsTooltipComponent, DsButtonComponent],
    },
  }),
};
