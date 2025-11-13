import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsSelectDateComponent } from './ds-select-date';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

const meta: Meta<DsSelectDateComponent> = {
  title: 'Global/Select Date',
  component: DsSelectDateComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DsSelectDateComponent,
        DsFormFieldComponent,
        FormsModule,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success']
    },
    disabled: { control: 'boolean' },
    ghost: { control: 'boolean' },
    dateFormat: {
      control: 'select',
      options: ['short', 'medium', 'long']
    },
    disableFutureDates: { control: 'boolean' },
  },
  args: {
    placeholder: 'Select date',
    variant: 'default',
    disabled: false,
    ghost: false,
    dateFormat: 'medium',
    disableFutureDates: false,
  },
};

export default meta;
type Story = StoryObj<DsSelectDateComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedDate: new Date(),
    },
    template: `
      <div style="width: 320px;">
        <ds-select-date
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [dateFormat]="dateFormat"
          [disableFutureDates]="disableFutureDates"
          [(ngModel)]="selectedDate">
        </ds-select-date>
      </div>
    `,
  }),
};

export const Ghost: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedDate: new Date(),
    },
    template: `
      <div style="width: 320px;">
        <ds-select-date
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [dateFormat]="dateFormat"
          [disableFutureDates]="disableFutureDates"
          [ghost]="true"
          [(ngModel)]="selectedDate">
        </ds-select-date>
      </div>
    `,
  }),
};

export const WithFormField: Story = {
  render: () => ({
    props: {
      selectedDate: null,
    },
    template: `
      <div style="width: 600px;">
        <ds-form-field [label]="'Due Date'" [layout]="'horizontal'">
          <ds-select-date
            [ghost]="true"
            [placeholder]="'Select date'"
            [(ngModel)]="selectedDate">
          </ds-select-date>
        </ds-form-field>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: {
      ...args,
      selectedDate: new Date(),
    },
    template: `
      <div style="width: 320px;">
        <ds-select-date
          [placeholder]="placeholder"
          [disabled]="true"
          [(ngModel)]="selectedDate">
        </ds-select-date>
      </div>
    `,
  }),
};

export const DateFormats: Story = {
  render: () => ({
    props: {
      shortDate: new Date(),
      mediumDate: new Date(),
      longDate: new Date(),
    },
    template: `
      <div style="width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <ds-select-date
          [dateFormat]="'short'"
          [placeholder]="'Short format'"
          [(ngModel)]="shortDate">
        </ds-select-date>
        
        <ds-select-date
          [dateFormat]="'medium'"
          [placeholder]="'Medium format'"
          [(ngModel)]="mediumDate">
        </ds-select-date>
        
        <ds-select-date
          [dateFormat]="'long'"
          [placeholder]="'Long format'"
          [(ngModel)]="longDate">
        </ds-select-date>
      </div>
    `,
  }),
};

