import { Meta, StoryObj } from '@storybook/angular';
import { DsBadgeComponent } from './ds-badge';

const meta: Meta<DsBadgeComponent> = {
  title: 'Primitives/Badge',
  component: DsBadgeComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'brand', 'success', 'warning', 'destructive', 'blue', 'light-purple', 'pink', 'salmon-orange', 'orange', 'lime-green', 'grey'],
    },
    contentType: {
      control: 'select',
      options: ['text', 'icon-text', 'indicator-text'],
    },
    content: {
      control: 'text',
    },
    leadingIcon: {
      control: 'text',
    },
    indicatorShape: {
      control: 'select',
      options: ['circle', 'square', 'diamond', 'triangle', 'pentagon'],
    },
  },
};

export default meta;
type Story = StoryObj<DsBadgeComponent>;

// Basic badge with text only
export const Default: Story = {
  args: {
    content: 'Badge',
    contentType: 'text',
    variant: 'default',
  },
};

// Text-only variants
export const TextDefault: Story = {
  args: {
    content: 'Default',
    contentType: 'text',
    variant: 'default',
  },
};

export const TextBrand: Story = {
  args: {
    content: 'Brand',
    contentType: 'text',
    variant: 'brand',
  },
};

export const TextSuccess: Story = {
  args: {
    content: 'Success',
    contentType: 'text',
    variant: 'success',
  },
};

export const TextWarning: Story = {
  args: {
    content: 'Warning',
    contentType: 'text',
    variant: 'warning',
  },
};

export const TextDestructive: Story = {
  args: {
    content: 'Error',
    contentType: 'text',
    variant: 'destructive',
  },
};

export const TextBlue: Story = {
  args: {
    content: 'Blue',
    contentType: 'text',
    variant: 'blue',
  },
};

export const TextLightPurple: Story = {
  args: {
    content: 'Light Purple',
    contentType: 'text',
    variant: 'light-purple',
  },
};

export const TextPink: Story = {
  args: {
    content: 'Pink',
    contentType: 'text',
    variant: 'pink',
  },
};

export const TextSalmonOrange: Story = {
  args: {
    content: 'Salmon Orange',
    contentType: 'text',
    variant: 'salmon-orange',
  },
};

export const TextOrange: Story = {
  args: {
    content: 'Orange',
    contentType: 'text',
    variant: 'orange',
  },
};

export const TextLimeGreen: Story = {
  args: {
    content: 'Lime Green',
    contentType: 'text',
    variant: 'lime-green',
  },
};

export const TextGrey: Story = {
  args: {
    content: 'Grey',
    contentType: 'text',
    variant: 'grey',
  },
};

// Icon + Text variants
export const IconTextDefault: Story = {
  args: {
    content: 'Feature',
    contentType: 'icon-text',
    leadingIcon: 'remixStarLine',
    variant: 'default',
  },
};

export const IconTextBrand: Story = {
  args: {
    content: 'New Feature',
    contentType: 'icon-text',
    leadingIcon: 'remixStarFill',
    variant: 'brand',
  },
};

export const IconTextSuccess: Story = {
  args: {
    content: 'Verified',
    contentType: 'icon-text',
    leadingIcon: 'remixCheckboxCircleFill',
    variant: 'success',
  },
};

export const IconTextWarning: Story = {
  args: {
    content: 'Attention',
    contentType: 'icon-text',
    leadingIcon: 'remixAlertFill',
    variant: 'warning',
  },
};

export const IconTextDestructive: Story = {
  args: {
    content: 'Critical',
    contentType: 'icon-text',
    leadingIcon: 'remixErrorWarningFill',
    variant: 'destructive',
  },
};

// Indicator + Text variants
export const IndicatorTextDefault: Story = {
  args: {
    content: 'Default',
    contentType: 'indicator-text',
    variant: 'default',
    indicatorShape: 'circle',
  },
};

export const IndicatorTextBrand: Story = {
  args: {
    content: 'In Progress',
    contentType: 'indicator-text',
    variant: 'brand',
    indicatorShape: 'circle',
  },
};

export const IndicatorTextSuccess: Story = {
  args: {
    content: 'Completed',
    contentType: 'indicator-text',
    variant: 'success',
    indicatorShape: 'circle',
  },
};

export const IndicatorTextWarning: Story = {
  args: {
    content: 'Pending',
    contentType: 'indicator-text',
    variant: 'warning',
    indicatorShape: 'triangle',
  },
};

export const IndicatorTextDestructive: Story = {
  args: {
    content: 'Failed',
    contentType: 'indicator-text',
    variant: 'destructive',
    indicatorShape: 'square',
  },
};

export const IndicatorTextBlue: Story = {
  args: {
    content: 'Info',
    contentType: 'indicator-text',
    variant: 'blue',
    indicatorShape: 'circle',
  },
};

export const IndicatorTextLightPurple: Story = {
  args: {
    content: 'Special',
    contentType: 'indicator-text',
    variant: 'light-purple',
    indicatorShape: 'diamond',
  },
};

export const IndicatorTextPink: Story = {
  args: {
    content: 'Accent',
    contentType: 'indicator-text',
    variant: 'pink',
    indicatorShape: 'circle',
  },
};

export const IndicatorTextSalmonOrange: Story = {
  args: {
    content: 'Warm',
    contentType: 'indicator-text',
    variant: 'salmon-orange',
    indicatorShape: 'circle',
  },
};

export const IndicatorTextOrange: Story = {
  args: {
    content: 'Alert',
    contentType: 'indicator-text',
    variant: 'orange',
    indicatorShape: 'triangle',
  },
};

export const IndicatorTextLimeGreen: Story = {
  args: {
    content: 'Fresh',
    contentType: 'indicator-text',
    variant: 'lime-green',
    indicatorShape: 'circle',
  },
};

export const IndicatorTextGrey: Story = {
  args: {
    content: 'Neutral',
    contentType: 'indicator-text',
    variant: 'grey',
    indicatorShape: 'circle',
  },
};

// Content type comparison
export const ContentTypeComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Text Only</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <ds-badge content="Default" contentType="text" variant="default"></ds-badge>
            <ds-badge content="Brand" contentType="text" variant="brand"></ds-badge>
            <ds-badge content="Success" contentType="text" variant="success"></ds-badge>
            <ds-badge content="Warning" contentType="text" variant="warning"></ds-badge>
            <ds-badge content="Destructive" contentType="text" variant="destructive"></ds-badge>
            <ds-badge content="Blue" contentType="text" variant="blue"></ds-badge>
            <ds-badge content="Light Purple" contentType="text" variant="light-purple"></ds-badge>
            <ds-badge content="Pink" contentType="text" variant="pink"></ds-badge>
            <ds-badge content="Salmon Orange" contentType="text" variant="salmon-orange"></ds-badge>
            <ds-badge content="Orange" contentType="text" variant="orange"></ds-badge>
            <ds-badge content="Lime Green" contentType="text" variant="lime-green"></ds-badge>
            <ds-badge content="Grey" contentType="text" variant="grey"></ds-badge>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Icon + Text</h3>
          <div style="display: flex; gap: 8px;">
            <ds-badge content="Feature" contentType="icon-text" leadingIcon="remixStarLine" variant="default"></ds-badge>
            <ds-badge content="Premium" contentType="icon-text" leadingIcon="remixStarFill" variant="brand"></ds-badge>
            <ds-badge content="Verified" contentType="icon-text" leadingIcon="remixCheckboxCircleFill" variant="success"></ds-badge>
            <ds-badge content="Alert" contentType="icon-text" leadingIcon="remixAlertFill" variant="warning"></ds-badge>
            <ds-badge content="Error" contentType="icon-text" leadingIcon="remixErrorWarningFill" variant="destructive"></ds-badge>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Indicator + Text (Always white background)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <ds-badge content="Default" contentType="indicator-text" variant="default" indicatorShape="circle"></ds-badge>
            <ds-badge content="Brand" contentType="indicator-text" variant="brand" indicatorShape="circle"></ds-badge>
            <ds-badge content="Success" contentType="indicator-text" variant="success" indicatorShape="circle"></ds-badge>
            <ds-badge content="Warning" contentType="indicator-text" variant="warning" indicatorShape="triangle"></ds-badge>
            <ds-badge content="Destructive" contentType="indicator-text" variant="destructive" indicatorShape="square"></ds-badge>
            <ds-badge content="Blue" contentType="indicator-text" variant="blue" indicatorShape="circle"></ds-badge>
            <ds-badge content="Light Purple" contentType="indicator-text" variant="light-purple" indicatorShape="diamond"></ds-badge>
            <ds-badge content="Pink" contentType="indicator-text" variant="pink" indicatorShape="circle"></ds-badge>
            <ds-badge content="Salmon Orange" contentType="indicator-text" variant="salmon-orange" indicatorShape="circle"></ds-badge>
            <ds-badge content="Orange" contentType="indicator-text" variant="orange" indicatorShape="triangle"></ds-badge>
            <ds-badge content="Lime Green" contentType="indicator-text" variant="lime-green" indicatorShape="circle"></ds-badge>
            <ds-badge content="Grey" contentType="indicator-text" variant="grey" indicatorShape="circle"></ds-badge>
          </div>
        </div>
      </div>
    `,
  }),
};

// All color variants showcase
export const AllColorVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <h3 style="margin: 0; font-size: 16px; font-weight: 600;">All Badge Color Variants</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; max-width: 600px;">
          <ds-badge content="Default" variant="default"></ds-badge>
          <ds-badge content="Brand" variant="brand"></ds-badge>
          <ds-badge content="Success" variant="success"></ds-badge>
          <ds-badge content="Warning" variant="warning"></ds-badge>
          <ds-badge content="Destructive" variant="destructive"></ds-badge>
          <ds-badge content="Blue" variant="blue"></ds-badge>
          <ds-badge content="Light Purple" variant="light-purple"></ds-badge>
          <ds-badge content="Pink" variant="pink"></ds-badge>
          <ds-badge content="Salmon Orange" variant="salmon-orange"></ds-badge>
          <ds-badge content="Orange" variant="orange"></ds-badge>
          <ds-badge content="Lime Green" variant="lime-green"></ds-badge>
          <ds-badge content="Grey" variant="grey"></ds-badge>
        </div>
      </div>
    `,
  }),
};
