import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsFormFieldComponent } from './ds-form-field';
import { DsInputComponent } from '../input/ds-input';
import { NgpError } from 'ng-primitives/form-field';

const meta: Meta<DsFormFieldComponent> = {
  title: 'Primitives/Form Field',
  component: DsFormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [DsFormFieldComponent, DsInputComponent, NgpError],
    }),
  ],
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    labelId: { control: 'text' },
    descriptionId: { control: 'text' },
  },
  args: {
    label: 'Email',
    description: 'We will never share your email.',
    labelId: 'email-label',
    descriptionId: 'email-desc',
  },
};
export default meta;

type Story = StoryObj<DsFormFieldComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 360px;">
        <ds-form-field [label]="label" [description]="description" [labelId]="labelId" [descriptionId]="descriptionId">
          <ds-input ariaLabelledBy="email-label" ariaDescribedBy="email-desc" placeholder="you@example.com"></ds-input>
        </ds-form-field>
      </div>
    `,
  }),
};

export const WithError: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 360px;">
        <ds-form-field [label]="label" [description]="description" [labelId]="labelId" [descriptionId]="descriptionId">
          <ds-input ariaLabelledBy="email-label" ariaDescribedBy="email-desc" placeholder="you@example.com"></ds-input>
          <p ngpError ngpErrorValidator="required">Email is required.</p>
        </ds-form-field>
      </div>
    `,
  }),
};


