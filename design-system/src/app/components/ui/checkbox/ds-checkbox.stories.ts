import type { Meta, StoryObj } from '@storybook/angular';
import { DsCheckboxComponent } from './ds-checkbox';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

const meta: Meta<DsCheckboxComponent> = {
  title: 'Primitives/Checkbox',
  component: DsCheckboxComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'error', 'warning', 'success'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    checkboxId: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
  },
  args: {
    variant: 'default',
    size: 'md',
    label: 'Accept terms and conditions',
    showLabel: true,
    disabled: false,
    required: false,
    indeterminate: false,
  },
};
export default meta;

type Story = StoryObj<DsCheckboxComponent>;

export const Default: Story = {};

export const WithoutLabel: Story = {
  args: {
    showLabel: false,
    ariaLabel: 'Accept terms and conditions',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <ds-checkbox size="sm" label="Small checkbox"></ds-checkbox>
        <ds-checkbox size="md" label="Medium checkbox"></ds-checkbox>
        <ds-checkbox size="lg" label="Large checkbox"></ds-checkbox>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <ds-checkbox variant="default" label="Default checkbox"></ds-checkbox>
        <ds-checkbox variant="success" label="Success checkbox"></ds-checkbox>
        <ds-checkbox variant="warning" label="Warning checkbox"></ds-checkbox>
        <ds-checkbox variant="error" label="Error checkbox"></ds-checkbox>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <ds-checkbox label="Unchecked checkbox"></ds-checkbox>
        <ds-checkbox label="Checked checkbox" [checked]="true"></ds-checkbox>
        <ds-checkbox label="Indeterminate checkbox" [indeterminate]="true"></ds-checkbox>
        <ds-checkbox label="Disabled checkbox" [disabled]="true"></ds-checkbox>
        <ds-checkbox label="Disabled checked checkbox" [disabled]="true" [checked]="true"></ds-checkbox>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 300px;">
        <ds-checkbox 
          label="Click me to toggle" 
          (checkedChange)="onCheckedChange($event)">
        </ds-checkbox>
        <ds-checkbox 
          label="I'm required" 
          [required]="true"
          variant="error">
        </ds-checkbox>
        <ds-checkbox 
          label="Hover over me"
          size="lg">
        </ds-checkbox>
      </div>
    `,
    props: {
      onCheckedChange: (checked: boolean) => {
        console.log('Checkbox checked:', checked);
      },
    },
  }),
};

export const WithFormField: Story = {
  render: () => ({
    template: `
      <ds-form-field 
        label="Newsletter Preferences" 
        description="Choose your newsletter preferences"
        style="width: 400px;">
        <div style="display: grid; gap: 12px; margin-top: 8px;">
          <ds-checkbox label="Weekly newsletter"></ds-checkbox>
          <ds-checkbox label="Product updates"></ds-checkbox>
          <ds-checkbox label="Marketing emails" variant="warning"></ds-checkbox>
          <ds-checkbox label="Security notifications" [checked]="true" [disabled]="true"></ds-checkbox>
        </div>
      </ds-form-field>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<ds-form-field 
  label="Newsletter Preferences" 
  description="Choose your newsletter preferences">
  <div style="display: grid; gap: 12px; margin-top: 8px;">
    <ds-checkbox label="Weekly newsletter"></ds-checkbox>
    <ds-checkbox label="Product updates"></ds-checkbox>
    <ds-checkbox label="Marketing emails" variant="warning"></ds-checkbox>
    <ds-checkbox label="Security notifications" [checked]="true" [disabled]="true"></ds-checkbox>
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
        <ds-checkbox [showLabel]="true" label="I have a visible label"></ds-checkbox>
        <ds-checkbox [showLabel]="true" label="Me too!"></ds-checkbox>
        
        <h4 style="margin-top: 24px;">Without Labels (using aria-label)</h4>
        <ds-checkbox [showLabel]="false" ariaLabel="Hidden label checkbox 1"></ds-checkbox>
        <ds-checkbox [showLabel]="false" ariaLabel="Hidden label checkbox 2"></ds-checkbox>
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
            <ds-checkbox size="sm" variant="default" label="Default small"></ds-checkbox>
            <ds-checkbox size="sm" variant="success" label="Success small"></ds-checkbox>
            <ds-checkbox size="sm" variant="warning" label="Warning small"></ds-checkbox>
            <ds-checkbox size="sm" variant="error" label="Error small"></ds-checkbox>
          </div>
        </div>
        
        <div>
          <h4>Medium Size</h4>
          <div style="display: grid; gap: 8px; margin-top: 8px;">
            <ds-checkbox size="md" variant="default" label="Default medium"></ds-checkbox>
            <ds-checkbox size="md" variant="success" label="Success medium"></ds-checkbox>
            <ds-checkbox size="md" variant="warning" label="Warning medium"></ds-checkbox>
            <ds-checkbox size="md" variant="error" label="Error medium"></ds-checkbox>
          </div>
        </div>
        
        <div>
          <h4>Large Size</h4>
          <div style="display: grid; gap: 8px; margin-top: 8px;">
            <ds-checkbox size="lg" variant="default" label="Default large"></ds-checkbox>
            <ds-checkbox size="lg" variant="success" label="Success large"></ds-checkbox>
            <ds-checkbox size="lg" variant="warning" label="Warning large"></ds-checkbox>
            <ds-checkbox size="lg" variant="error" label="Error large"></ds-checkbox>
          </div>
        </div>
      </div>
    `,
  }),
};
