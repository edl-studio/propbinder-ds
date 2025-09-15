import type { Meta, StoryObj } from '@storybook/angular';
import { DsIconComponent } from './ds-icon';

const meta: Meta<DsIconComponent> = {
  title: 'Primitives/Icon',
  component: DsIconComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'The name of the icon to display',
    },
    size: {
      control: { type: 'select' },
      options: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '32px'],
      description: 'The size of the icon (pixel values or custom CSS value)',
    },
    color: {
      control: { type: 'text' },
      description: 'The color of the icon. Use predefined values (primary, secondary, tertiary, brand, success, warning, destructive) or any CSS color value (#hex, rgb(), hsl(), var(), etc.)',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Whether the icon has interactive states (hover, active)',
    },
  },
};

export default meta;
type Story = StoryObj<DsIconComponent>;

export const Default: Story = {
  args: {
    name: 'remixHomeLine',
    size: '20px'
  }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <ds-icon name="remixHomeLine" size="12px"></ds-icon>
        <ds-icon name="remixHomeLine" size="14px"></ds-icon>
        <ds-icon name="remixHomeLine" size="16px"></ds-icon>
        <ds-icon name="remixHomeLine" size="18px"></ds-icon>
        <ds-icon name="remixHomeLine" size="20px"></ds-icon>
        <ds-icon name="remixHomeLine" size="22px"></ds-icon>
        <ds-icon name="remixHomeLine" size="24px"></ds-icon>
        <ds-icon name="remixHomeLine" size="32px"></ds-icon>
      </div>
    `
  })
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <ds-icon name="remixHomeLine" size="24px" color="primary"></ds-icon>
          <ds-icon name="remixHomeLine" size="24px" color="secondary"></ds-icon>
          <ds-icon name="remixHomeLine" size="24px" color="tertiary"></ds-icon>
          <ds-icon name="remixHomeLine" size="24px" color="brand"></ds-icon>
          <ds-icon name="remixHomeLine" size="24px" color="success"></ds-icon>
          <ds-icon name="remixHomeLine" size="24px" color="warning"></ds-icon>
          <ds-icon name="remixHomeLine" size="24px" color="destructive"></ds-icon>
        </div>
      </div>
    `
  })
};

export const Interactive: Story = {
  args: {
    name: 'remixSettingsLine',
    size: '24px',
    color: 'brand',
    interactive: true
  }
};

export const CustomSize: Story = {
  args: {
    name: 'remixSearchLine',
    size: '48px',
    color: 'brand'
  }
};

export const ColorTest: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px;">
        <!-- Test 1: Hardcoded colors for reference -->
        <div>
          <h4>Reference Colors (hardcoded)</h4>
          <div style="display: flex; gap: 16px; align-items: center;">
            <div style="color: #202227;">■ primary (#202227)</div>
            <div style="color: #545B66;">■ secondary (#545B66)</div>
            <div style="color: #626B78;">■ tertiary (#626B78)</div>
            <div style="color: #6B5FF5;">■ brand (#6B5FF5)</div>
            <div style="color: #158452;">■ success (#158452)</div>
            <div style="color: #d97706;">■ warning (#d97706)</div>
            <div style="color: #dc2626;">■ destructive (#dc2626)</div>
          </div>
        </div>
        
        <!-- Test 2: Our icon component -->
        <div>
          <h4>Icon Component Colors</h4>
          <div style="display: flex; gap: 16px; align-items: center;">
            <ds-icon name="remixHomeLine" size="lg" color="primary"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="secondary"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="tertiary"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="brand"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="success"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="warning"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="destructive"></ds-icon>
          </div>
        </div>
        
        <!-- Test 3: Custom colors that bypass CSS classes -->
        <div>
          <h4>Custom Colors (bypass CSS)</h4>
          <div style="display: flex; gap: 16px; align-items: center;">
            <ds-icon name="remixHomeLine" size="lg" color="#202227"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="#545B66"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="#626B78"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="#6B5FF5"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="#158452"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="#d97706"></ds-icon>
            <ds-icon name="remixHomeLine" size="lg" color="#dc2626"></ds-icon>
          </div>
        </div>
      </div>
    `
  })
};
