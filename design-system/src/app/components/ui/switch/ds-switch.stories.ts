import type { Meta, StoryObj } from '@storybook/angular';
import { DsSwitchComponent } from './ds-switch';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

const meta: Meta<DsSwitchComponent> = {
  title: 'Global/Switch',
  component: DsSwitchComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'error', 'warning', 'success'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    switchId: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
  },
  args: {
    variant: 'default',
    size: 'md',
    label: 'Enable notifications',
    showLabel: true,
    disabled: false,
    required: false,
  },
};
export default meta;

type Story = StoryObj<DsSwitchComponent>;

export const Default: Story = {};

export const WithoutLabel: Story = {
  args: {
    showLabel: false,
    ariaLabel: 'Enable notifications',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <ds-switch size="sm" label="Small switch"></ds-switch>
        <ds-switch size="md" label="Medium switch"></ds-switch>
        <ds-switch size="lg" label="Large switch"></ds-switch>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <ds-switch variant="default" label="Default switch"></ds-switch>
        <ds-switch variant="success" label="Success switch"></ds-switch>
        <ds-switch variant="warning" label="Warning switch"></ds-switch>
        <ds-switch variant="error" label="Error switch"></ds-switch>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <ds-switch label="Unchecked switch"></ds-switch>
        <ds-switch label="Checked switch" [checked]="true"></ds-switch>
        <ds-switch label="Disabled switch" [disabled]="true"></ds-switch>
        <ds-switch label="Disabled checked switch" [disabled]="true" [checked]="true"></ds-switch>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <ds-switch 
          label="Click me to toggle" 
          (checkedChange)="onCheckedChange($event)">
        </ds-switch>
        <ds-switch 
          label="I'm required" 
          [required]="true"
          variant="error">
        </ds-switch>
        <ds-switch 
          label="Hover over me"
          size="lg">
        </ds-switch>
      </div>
    `,
    props: {
      onCheckedChange: (checked: boolean) => {
        console.log('Switch checked:', checked);
      },
    },
  }),
};

export const WithFormField: Story = {
  render: () => ({
    template: `
      <ds-form-field 
        label="Notification Preferences" 
        description="Choose your notification preferences"
        style="width: 400px;">
        <div style="display: grid; gap: 12px; margin-top: 8px;">
          <ds-switch label="Email notifications"></ds-switch>
          <ds-switch label="Push notifications"></ds-switch>
          <ds-switch label="SMS notifications" variant="warning"></ds-switch>
          <ds-switch label="Security alerts" [checked]="true" [disabled]="true"></ds-switch>
        </div>
      </ds-form-field>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<ds-form-field 
  label="Notification Preferences" 
  description="Choose your notification preferences">
  <div style="display: grid; gap: 12px; margin-top: 8px;">
    <ds-switch label="Email notifications"></ds-switch>
    <ds-switch label="Push notifications"></ds-switch>
    <ds-switch label="SMS notifications" variant="warning"></ds-switch>
    <ds-switch label="Security alerts" [checked]="true" [disabled]="true"></ds-switch>
  </div>
</ds-form-field>`,
      },
    },
  },
};

export const LabelToggle: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <h4>With Labels</h4>
        <ds-switch [showLabel]="true" label="I have a visible label"></ds-switch>
        <ds-switch [showLabel]="true" label="Me too!"></ds-switch>
        
        <h4 style="margin-top: 24px;">Without Labels (using aria-label)</h4>
        <ds-switch [showLabel]="false" ariaLabel="Hidden label switch 1"></ds-switch>
        <ds-switch [showLabel]="false" ariaLabel="Hidden label switch 2"></ds-switch>
      </div>
    `,
  }),
};

export const AllSizesAndVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 24px;">
        <div>
          <h4>Small Size</h4>
          <div style="display: grid; gap: 8px; margin-top: 8px;">
            <ds-switch size="sm" variant="default" label="Default small"></ds-switch>
            <ds-switch size="sm" variant="success" label="Success small"></ds-switch>
            <ds-switch size="sm" variant="warning" label="Warning small"></ds-switch>
            <ds-switch size="sm" variant="error" label="Error small"></ds-switch>
          </div>
        </div>
        
        <div>
          <h4>Medium Size</h4>
          <div style="display: grid; gap: 8px; margin-top: 8px;">
            <ds-switch size="md" variant="default" label="Default medium"></ds-switch>
            <ds-switch size="md" variant="success" label="Success medium"></ds-switch>
            <ds-switch size="md" variant="warning" label="Warning medium"></ds-switch>
            <ds-switch size="md" variant="error" label="Error medium"></ds-switch>
          </div>
        </div>
        
        <div>
          <h4>Large Size</h4>
          <div style="display: grid; gap: 8px; margin-top: 8px;">
            <ds-switch size="lg" variant="default" label="Default large"></ds-switch>
            <ds-switch size="lg" variant="success" label="Success large"></ds-switch>
            <ds-switch size="lg" variant="warning" label="Warning large"></ds-switch>
            <ds-switch size="lg" variant="error" label="Error large"></ds-switch>
          </div>
        </div>
      </div>
    `,
  }),
};

