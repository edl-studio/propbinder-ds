import type { Meta, StoryObj } from '@storybook/angular';
import { DsTextareaComponent } from './ds-textarea';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

const meta: Meta<DsTextareaComponent> = {
  title: 'Primitives/Textarea',
  component: DsTextareaComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'error', 'warning', 'success'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    cols: { control: { type: 'number', min: 10, max: 100 } },
    maxlength: { control: { type: 'number', min: 1, max: 1000 } },
    minlength: { control: { type: 'number', min: 0, max: 100 } },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
  },
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Enter your message...',
    disabled: false,
    readonly: false,
    required: false,
    rows: 4,
  },
};
export default meta;

type Story = StoryObj<DsTextareaComponent>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { 
    placeholder: 'Write your thoughts here...',
    rows: 6 
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 400px;">
        <ds-textarea size="sm" placeholder="Small textarea" rows="3"></ds-textarea>
        <ds-textarea size="md" placeholder="Medium textarea" rows="4"></ds-textarea>
        <ds-textarea size="lg" placeholder="Large textarea" rows="5"></ds-textarea>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 400px;">
        <ds-textarea variant="default" placeholder="Default textarea" rows="3"></ds-textarea>
        <ds-textarea variant="success" placeholder="Success textarea" rows="3"></ds-textarea>
        <ds-textarea variant="warning" placeholder="Warning textarea" rows="3"></ds-textarea>
        <ds-textarea variant="error" placeholder="Error textarea" rows="3"></ds-textarea>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; width: 400px;">
        <ds-textarea placeholder="Normal textarea" rows="3"></ds-textarea>
        <ds-textarea placeholder="Disabled textarea" [disabled]="true" rows="3"></ds-textarea>
        <ds-textarea placeholder="Readonly textarea" [readonly]="true" rows="3"></ds-textarea>
        <ds-textarea placeholder="Required textarea" [required]="true" rows="3"></ds-textarea>
      </div>
    `,
  }),
};

export const WithLimits: Story = {
  args: {
    placeholder: 'This textarea has a 100 character limit...',
    maxlength: 100,
    minlength: 10,
    rows: 4,
  },
};

export const LargeTextarea: Story = {
  args: {
    placeholder: 'This is a large textarea for longer content...',
    rows: 8,
    size: 'lg',
  },
};

export const WithFormField: Story = {
  render: () => ({
    template: `
      <ds-form-field 
        label="Message" 
        description="Please provide detailed feedback"
        style="width: 400px;">
        <ds-textarea 
          placeholder="Enter your feedback here..." 
          rows="5"
          [required]="true">
        </ds-textarea>
      </ds-form-field>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<ds-form-field 
  label="Message" 
  description="Please provide detailed feedback">
  <ds-textarea 
    placeholder="Enter your feedback here..." 
    rows="5"
    [required]="true">
  </ds-textarea>
</ds-form-field>`,
      },
    },
  },
};
