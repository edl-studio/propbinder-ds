import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsInputTimeComponent } from './ds-input-time';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

const meta: Meta<DsInputTimeComponent> = {
  title: 'Global/Input Time',
  component: DsInputTimeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DsInputTimeComponent,
        DsFormFieldComponent,
        FormsModule,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success']
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
    ghost: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    disabled: false,
    readonly: false,
    required: false,
    clearable: false,
    ghost: false,
  },
};

export default meta;
type Story = StoryObj<DsInputTimeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      timeValue: '',
    },
    template: `
      <div style="width: 320px;">
        <ds-input-time
          [variant]="variant"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [clearable]="clearable"
          [ghost]="ghost"
          [(ngModel)]="timeValue">
        </ds-input-time>
      </div>
    `,
  }),
};

export const Ghost: Story = {
  render: (args) => ({
    props: {
      ...args,
      timeValue: '15:00',
    },
    template: `
      <div style="width: 320px;">
        <ds-input-time
          [variant]="variant"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [clearable]="clearable"
          [ghost]="true"
          [(ngModel)]="timeValue">
        </ds-input-time>
      </div>
    `,
  }),
};

export const WithFormField: Story = {
  render: () => ({
    props: {
      startTime: '07:00',
      endTime: '15:00',
    },
    template: `
      <div style="width: 600px; display: flex; flex-direction: column; gap: 16px;">
        <ds-form-field [label]="'Start Time'" [layout]="'horizontal'">
          <ds-input-time
            [ghost]="true"
            [(ngModel)]="startTime">
          </ds-input-time>
        </ds-form-field>
        
        <ds-form-field [label]="'End Time'" [layout]="'horizontal'">
          <ds-input-time
            [ghost]="true"
            [(ngModel)]="endTime">
          </ds-input-time>
        </ds-form-field>
      </div>
    `,
  }),
};

export const Clearable: Story = {
  render: (args) => ({
    props: {
      ...args,
      timeValue: '09:30',
      clearable: true,
    },
    template: `
      <div style="width: 320px;">
        <ds-input-time
          [variant]="variant"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [clearable]="true"
          [ghost]="ghost"
          [(ngModel)]="timeValue">
        </ds-input-time>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    props: {
      ...args,
      timeValue: '12:00',
      disabled: true,
    },
    template: `
      <div style="width: 320px;">
        <ds-input-time
          [variant]="variant"
          [disabled]="true"
          [readonly]="readonly"
          [required]="required"
          [clearable]="clearable"
          [ghost]="ghost"
          [(ngModel)]="timeValue">
        </ds-input-time>
      </div>
    `,
  }),
};

export const Readonly: Story = {
  render: (args) => ({
    props: {
      ...args,
      timeValue: '14:30',
      readonly: true,
    },
    template: `
      <div style="width: 320px;">
        <ds-input-time
          [variant]="variant"
          [disabled]="disabled"
          [readonly]="true"
          [required]="required"
          [clearable]="clearable"
          [ghost]="ghost"
          [(ngModel)]="timeValue">
        </ds-input-time>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    props: {
      defaultTime: '08:00',
      errorTime: '09:00',
      warningTime: '10:00',
      successTime: '11:00',
    },
    template: `
      <div style="width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <ds-input-time
          [variant]="'default'"
          [(ngModel)]="defaultTime">
        </ds-input-time>
        
        <ds-input-time
          [variant]="'error'"
          [(ngModel)]="errorTime">
        </ds-input-time>
        
        <ds-input-time
          [variant]="'warning'"
          [(ngModel)]="warningTime">
        </ds-input-time>
        
        <ds-input-time
          [variant]="'success'"
          [(ngModel)]="successTime">
        </ds-input-time>
      </div>
    `,
  }),
};

export const TimeRange: Story = {
  render: () => ({
    props: {
      startTime: '07:00',
      endTime: '15:00',
    },
    template: `
      <div style="width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Start Time</label>
          <ds-input-time
            [(ngModel)]="startTime">
          </ds-input-time>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">End Time</label>
          <ds-input-time
            [(ngModel)]="endTime">
          </ds-input-time>
        </div>
      </div>
    `,
  }),
};

