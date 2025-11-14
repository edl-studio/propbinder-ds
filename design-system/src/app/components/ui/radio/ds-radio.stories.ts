import type { Meta, StoryObj } from '@storybook/angular';
import { DsRadioComponent } from './ds-radio';
import { NgpRadioGroup } from 'ng-primitives/radio';
import { FormsModule } from '@angular/forms';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

const meta: Meta<DsRadioComponent> = {
  title: 'Global/Radio',
  component: DsRadioComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'error', 'warning', 'success'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    value: { control: 'text' },
    radioId: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
  },
  args: {
    variant: 'default',
    size: 'md',
    label: 'Option 1',
    showLabel: true,
    disabled: false,
    required: false,
    value: 'option1',
  },
};
export default meta;

type Story = StoryObj<DsRadioComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValue" style="display: grid; gap: 12px;">
        <ds-radio value="option1" label="Option 1"></ds-radio>
        <ds-radio value="option2" label="Option 2"></ds-radio>
        <ds-radio value="option3" label="Option 3"></ds-radio>
      </div>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule],
    },
    props: {
      selectedValue: 'option1',
    },
  }),
};

export const WithoutLabel: Story = {
  render: () => ({
    template: `
      <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValue" style="display: grid; gap: 12px;">
        <ds-radio value="option1" [showLabel]="false" ariaLabel="Option 1"></ds-radio>
        <ds-radio value="option2" [showLabel]="false" ariaLabel="Option 2"></ds-radio>
        <ds-radio value="option3" [showLabel]="false" ariaLabel="Option 3"></ds-radio>
      </div>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule],
    },
    props: {
      selectedValue: 'option1',
    },
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 24px;">
        <div>
          <h4>Small Size</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueSm" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio size="sm" value="sm1" label="Small option 1"></ds-radio>
            <ds-radio size="sm" value="sm2" label="Small option 2"></ds-radio>
            <ds-radio size="sm" value="sm3" label="Small option 3"></ds-radio>
          </div>
        </div>
        
        <div>
          <h4>Medium Size</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueMd" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio size="md" value="md1" label="Medium option 1"></ds-radio>
            <ds-radio size="md" value="md2" label="Medium option 2"></ds-radio>
            <ds-radio size="md" value="md3" label="Medium option 3"></ds-radio>
          </div>
        </div>
        
        <div>
          <h4>Large Size</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueLg" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio size="lg" value="lg1" label="Large option 1"></ds-radio>
            <ds-radio size="lg" value="lg2" label="Large option 2"></ds-radio>
            <ds-radio size="lg" value="lg3" label="Large option 3"></ds-radio>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule],
    },
    props: {
      selectedValueSm: 'sm1',
      selectedValueMd: 'md1',
      selectedValueLg: 'lg1',
    },
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 24px;">
        <div>
          <h4>Default</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueDefault" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio variant="default" value="default1" label="Default option 1"></ds-radio>
            <ds-radio variant="default" value="default2" label="Default option 2"></ds-radio>
          </div>
        </div>
        
        <div>
          <h4>Success</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueSuccess" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio variant="success" value="success1" label="Success option 1"></ds-radio>
            <ds-radio variant="success" value="success2" label="Success option 2"></ds-radio>
          </div>
        </div>
        
        <div>
          <h4>Warning</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueWarning" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio variant="warning" value="warning1" label="Warning option 1"></ds-radio>
            <ds-radio variant="warning" value="warning2" label="Warning option 2"></ds-radio>
          </div>
        </div>
        
        <div>
          <h4>Error</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueError" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio variant="error" value="error1" label="Error option 1"></ds-radio>
            <ds-radio variant="error" value="error2" label="Error option 2"></ds-radio>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule],
    },
    props: {
      selectedValueDefault: 'default1',
      selectedValueSuccess: 'success1',
      selectedValueWarning: 'warning1',
      selectedValueError: 'error1',
    },
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 24px;">
        <div>
          <h4>Normal States</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueNormal" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio value="normal1" label="Unselected option"></ds-radio>
            <ds-radio value="normal2" label="Selected option"></ds-radio>
          </div>
        </div>
        
        <div>
          <h4>Disabled States</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueDisabled" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio value="disabled1" label="Disabled option" [disabled]="true"></ds-radio>
            <ds-radio value="disabled2" label="Disabled selected option" [disabled]="true"></ds-radio>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule],
    },
    props: {
      selectedValueNormal: 'normal2',
      selectedValueDisabled: 'disabled2',
    },
  }),
};

export const Interactive: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 24px;">
        <div>
          <h4>Interactive Group</h4>
          <p>Selected: {{ selectedValue }}</p>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValue" (ngpRadioGroupValueChange)="onValueChange($event)" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio value="opt1" label="Option 1"></ds-radio>
            <ds-radio value="opt2" label="Option 2"></ds-radio>
            <ds-radio value="opt3" label="Option 3"></ds-radio>
          </div>
        </div>
        
        <div>
          <h4>Required Field</h4>
          <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValueRequired" style="display: grid; gap: 12px; margin-top: 8px;">
            <ds-radio value="req1" label="Required option 1" [required]="true" variant="error"></ds-radio>
            <ds-radio value="req2" label="Required option 2" [required]="true" variant="error"></ds-radio>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule],
    },
    props: {
      selectedValue: 'opt1',
      selectedValueRequired: 'req1',
      onValueChange: (value: string) => {
        console.log('Radio value changed:', value);
      },
    },
  }),
};

export const WithFormField: Story = {
  render: () => ({
    template: `
      <ds-form-field 
        label="Account Type" 
        description="Select your account type"
        style="width: 400px;">
        <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedAccountType" style="display: grid; gap: 12px; margin-top: 8px;">
          <ds-radio value="personal" label="Personal account"></ds-radio>
          <ds-radio value="business" label="Business account"></ds-radio>
          <ds-radio value="enterprise" label="Enterprise account"></ds-radio>
        </div>
      </ds-form-field>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule, DsFormFieldComponent],
    },
    props: {
      selectedAccountType: 'personal',
    },
  }),
  parameters: {
    docs: {
      source: {
        code: `<ds-form-field 
  label="Account Type" 
  description="Select your account type">
  <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValue">
    <ds-radio value="personal" label="Personal account"></ds-radio>
    <ds-radio value="business" label="Business account"></ds-radio>
    <ds-radio value="enterprise" label="Enterprise account"></ds-radio>
  </div>
</ds-form-field>`,
      },
    },
  },
};

export const HorizontalLayout: Story = {
  render: () => ({
    template: `
      <div ngpRadioGroup [(ngpRadioGroupValue)]="selectedValue" ngpRadioGroupOrientation="horizontal" style="display: flex; gap: 24px;">
        <ds-radio value="left" label="Left"></ds-radio>
        <ds-radio value="center" label="Center"></ds-radio>
        <ds-radio value="right" label="Right"></ds-radio>
      </div>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule],
    },
    props: {
      selectedValue: 'center',
    },
  }),
};

export const AllSizesAndVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 32px;">
        <div>
          <h4>Small Size</h4>
          <div style="display: grid; gap: 16px; margin-top: 8px;">
            <div ngpRadioGroup [(ngpRadioGroupValue)]="smDefault" style="display: grid; gap: 8px;">
              <ds-radio size="sm" variant="default" value="sm-default-1" label="Default small"></ds-radio>
              <ds-radio size="sm" variant="default" value="sm-default-2" label="Default small 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="smSuccess" style="display: grid; gap: 8px;">
              <ds-radio size="sm" variant="success" value="sm-success-1" label="Success small"></ds-radio>
              <ds-radio size="sm" variant="success" value="sm-success-2" label="Success small 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="smWarning" style="display: grid; gap: 8px;">
              <ds-radio size="sm" variant="warning" value="sm-warning-1" label="Warning small"></ds-radio>
              <ds-radio size="sm" variant="warning" value="sm-warning-2" label="Warning small 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="smError" style="display: grid; gap: 8px;">
              <ds-radio size="sm" variant="error" value="sm-error-1" label="Error small"></ds-radio>
              <ds-radio size="sm" variant="error" value="sm-error-2" label="Error small 2"></ds-radio>
            </div>
          </div>
        </div>
        
        <div>
          <h4>Medium Size</h4>
          <div style="display: grid; gap: 16px; margin-top: 8px;">
            <div ngpRadioGroup [(ngpRadioGroupValue)]="mdDefault" style="display: grid; gap: 8px;">
              <ds-radio size="md" variant="default" value="md-default-1" label="Default medium"></ds-radio>
              <ds-radio size="md" variant="default" value="md-default-2" label="Default medium 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="mdSuccess" style="display: grid; gap: 8px;">
              <ds-radio size="md" variant="success" value="md-success-1" label="Success medium"></ds-radio>
              <ds-radio size="md" variant="success" value="md-success-2" label="Success medium 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="mdWarning" style="display: grid; gap: 8px;">
              <ds-radio size="md" variant="warning" value="md-warning-1" label="Warning medium"></ds-radio>
              <ds-radio size="md" variant="warning" value="md-warning-2" label="Warning medium 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="mdError" style="display: grid; gap: 8px;">
              <ds-radio size="md" variant="error" value="md-error-1" label="Error medium"></ds-radio>
              <ds-radio size="md" variant="error" value="md-error-2" label="Error medium 2"></ds-radio>
            </div>
          </div>
        </div>
        
        <div>
          <h4>Large Size</h4>
          <div style="display: grid; gap: 16px; margin-top: 8px;">
            <div ngpRadioGroup [(ngpRadioGroupValue)]="lgDefault" style="display: grid; gap: 8px;">
              <ds-radio size="lg" variant="default" value="lg-default-1" label="Default large"></ds-radio>
              <ds-radio size="lg" variant="default" value="lg-default-2" label="Default large 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="lgSuccess" style="display: grid; gap: 8px;">
              <ds-radio size="lg" variant="success" value="lg-success-1" label="Success large"></ds-radio>
              <ds-radio size="lg" variant="success" value="lg-success-2" label="Success large 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="lgWarning" style="display: grid; gap: 8px;">
              <ds-radio size="lg" variant="warning" value="lg-warning-1" label="Warning large"></ds-radio>
              <ds-radio size="lg" variant="warning" value="lg-warning-2" label="Warning large 2"></ds-radio>
            </div>
            <div ngpRadioGroup [(ngpRadioGroupValue)]="lgError" style="display: grid; gap: 8px;">
              <ds-radio size="lg" variant="error" value="lg-error-1" label="Error large"></ds-radio>
              <ds-radio size="lg" variant="error" value="lg-error-2" label="Error large 2"></ds-radio>
            </div>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [DsRadioComponent, NgpRadioGroup, FormsModule],
    },
    props: {
      smDefault: 'sm-default-1',
      smSuccess: 'sm-success-1',
      smWarning: 'sm-warning-1',
      smError: 'sm-error-1',
      mdDefault: 'md-default-1',
      mdSuccess: 'md-success-1',
      mdWarning: 'md-warning-1',
      mdError: 'md-error-1',
      lgDefault: 'lg-default-1',
      lgSuccess: 'lg-success-1',
      lgWarning: 'lg-warning-1',
      lgError: 'lg-error-1',
    },
  }),
};

