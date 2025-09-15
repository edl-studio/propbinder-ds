import { Meta, StoryObj } from '@storybook/angular';
import { DsShapeIndicatorComponent } from './ds-shape-indicator';

const meta: Meta<DsShapeIndicatorComponent> = {
  title: 'Primitives/Shape Indicator',
  component: DsShapeIndicatorComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['circle', 'square', 'diamond', 'triangle', 'pentagon'],
    },
    variant: {
      control: 'select',
      options: ['default', 'brand', 'success', 'warning', 'destructive', 'blue', 'light-purple', 'pink', 'salmon-orange', 'orange', 'lime-green', 'grey'],
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<DsShapeIndicatorComponent>;

// Basic shapes
export const Circle: Story = {
  args: {
    shape: 'circle',
    variant: 'brand',
    label: 'Received',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    variant: 'destructive',
    label: 'Stage tags',
  },
};

export const Diamond: Story = {
  args: {
    shape: 'diamond',
    variant: 'brand',
    label: 'Contact',
  },
};

export const Triangle: Story = {
  args: {
    shape: 'triangle',
    variant: 'blue',
    label: 'Upcoming',
  },
};

export const Pentagon: Story = {
  args: {
    shape: 'pentagon',
    variant: 'brand',
    label: 'Maintenance',
  },
};

// All shapes showcase
export const AllShapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">All Shape Variants (8x8px)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
            <ds-shape-indicator shape="circle" variant="brand" label="Received"></ds-shape-indicator>
            <ds-shape-indicator shape="square" variant="destructive" label="Stage tags"></ds-shape-indicator>
            <ds-shape-indicator shape="diamond" variant="brand" label="Contact"></ds-shape-indicator>
            <ds-shape-indicator shape="triangle" variant="blue" label="Upcoming"></ds-shape-indicator>
            <ds-shape-indicator shape="pentagon" variant="brand" label="Maintenance"></ds-shape-indicator>
          </div>
        </div>
      </div>
    `,
  }),
};

// Color variations
export const ColorVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">All Color Variants</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; max-width: 600px;">
            <ds-shape-indicator shape="circle" variant="default" label="Default"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="brand" label="Brand"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="success" label="Success"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="warning" label="Warning"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="destructive" label="Destructive"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="blue" label="Blue"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="light-purple" label="Light Purple"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="pink" label="Pink"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="salmon-orange" label="Salmon Orange"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="orange" label="Orange"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="lime-green" label="Lime Green"></ds-shape-indicator>
            <ds-shape-indicator shape="circle" variant="grey" label="Grey"></ds-shape-indicator>
          </div>
        </div>
      </div>
    `,
  }),
};

// Icon only (no labels)
export const IconOnly: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Icons Only</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <ds-shape-indicator shape="circle" variant="brand"></ds-shape-indicator>
            <ds-shape-indicator shape="square" variant="destructive"></ds-shape-indicator>
            <ds-shape-indicator shape="diamond" variant="success"></ds-shape-indicator>
            <ds-shape-indicator shape="triangle" variant="warning"></ds-shape-indicator>
            <ds-shape-indicator shape="pentagon" variant="blue"></ds-shape-indicator>
          </div>
        </div>
      </div>
    `,
  }),
};

// Real-world usage example
export const UsageExample: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Stage Tags</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
            <ds-shape-indicator shape="circle" variant="brand" label="Received"></ds-shape-indicator>
            <ds-shape-indicator shape="diamond" variant="brand" label="Contact"></ds-shape-indicator>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Category Tags</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
            <ds-shape-indicator shape="diamond" variant="brand" label="Maintenance"></ds-shape-indicator>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Inspection Status Tags</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
            <ds-shape-indicator shape="circle" variant="blue" label="Upcoming"></ds-shape-indicator>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Defect Status Tags</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
            <ds-shape-indicator shape="triangle" variant="default" label="Not a defect"></ds-shape-indicator>
          </div>
        </div>
      </div>
    `,
  }),
};
