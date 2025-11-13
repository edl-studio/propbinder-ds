import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsSelectUserComponent, type UserOption } from './ds-select-user';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

const sampleUsers: UserOption[] = [
  { id: '1', name: 'Niels Harring', email: 'niels@propbinder.com', initials: 'NH' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@propbinder.com', initials: 'SW' },
  { id: '3', name: 'John Doe', email: 'john@propbinder.com', initials: 'JD' },
  { id: '4', name: 'Emily Chen', email: 'emily@propbinder.com', initials: 'EC' },
  { id: '5', name: 'Michael Brown', email: 'michael@propbinder.com', initials: 'MB' },
];

const meta: Meta<DsSelectUserComponent> = {
  title: 'Global/Select User',
  component: DsSelectUserComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DsSelectUserComponent,
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
  },
  args: {
    users: sampleUsers,
    placeholder: 'Select user',
    variant: 'default',
    disabled: false,
    ghost: false,
  },
};

export default meta;
type Story = StoryObj<DsSelectUserComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedUserId: '1',
    },
    template: `
      <div style="width: 320px;">
        <ds-select-user
          [users]="users"
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [(ngModel)]="selectedUserId">
        </ds-select-user>
      </div>
    `,
  }),
};

export const Ghost: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedUserId: '1',
    },
    template: `
      <div style="width: 320px;">
        <ds-select-user
          [users]="users"
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [ghost]="true"
          [(ngModel)]="selectedUserId">
        </ds-select-user>
      </div>
    `,
  }),
};

export const WithFormField: Story = {
  render: () => ({
    props: {
      users: sampleUsers,
      selectedUserId: '1',
    },
    template: `
      <div style="width: 600px;">
        <ds-form-field [label]="'Assignee'" [layout]="'horizontal'">
          <ds-select-user
            [ghost]="true"
            [users]="users"
            [placeholder]="'Select user'"
            [(ngModel)]="selectedUserId">
          </ds-select-user>
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
      selectedUserId: '1',
    },
    template: `
      <div style="width: 320px;">
        <ds-select-user
          [users]="users"
          [disabled]="true"
          [(ngModel)]="selectedUserId">
        </ds-select-user>
      </div>
    `,
  }),
};

export const MultipleFields: Story = {
  render: () => ({
    props: {
      users: sampleUsers,
      assignee: '1',
      reviewer: '2',
      observer: null,
    },
    template: `
      <div style="width: 600px; display: flex; flex-direction: column; gap: 16px;">
        <ds-form-field [label]="'Assignee'" [layout]="'horizontal'">
          <ds-select-user
            [ghost]="true"
            [users]="users"
            [(ngModel)]="assignee">
          </ds-select-user>
        </ds-form-field>

        <ds-form-field [label]="'Reviewer'" [layout]="'horizontal'">
          <ds-select-user
            [ghost]="true"
            [users]="users"
            [(ngModel)]="reviewer">
          </ds-select-user>
        </ds-form-field>

        <ds-form-field [label]="'Observer'" [layout]="'horizontal'">
          <ds-select-user
            [ghost]="true"
            [users]="users"
            [placeholder]="'Add observer'"
            [(ngModel)]="observer">
          </ds-select-user>
        </ds-form-field>
      </div>
    `,
  }),
};

