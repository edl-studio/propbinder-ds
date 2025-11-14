import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsSelectBadgeComponent, type BadgeOption } from './ds-select-badge';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

const priorityOptions: BadgeOption[] = [
  { id: '1', label: 'Low', variant: 'grey' },
  { id: '2', label: 'Medium', variant: 'blue' },
  { id: '3', label: 'High', variant: 'warning' },
  { id: '4', label: 'Critical', variant: 'destructive', icon: 'remixAlertFill' },
];

const statusOptions: BadgeOption[] = [
  { id: '1', label: 'To Do', variant: 'default' },
  { id: '2', label: 'In Progress', variant: 'blue', icon: 'remixTimeLine' },
  { id: '3', label: 'In Review', variant: 'light-purple' },
  { id: '4', label: 'Done', variant: 'success', icon: 'remixCheckboxCircleFill' },
  { id: '5', label: 'Blocked', variant: 'destructive' },
];

const typeOptions: BadgeOption[] = [
  { id: '1', label: 'Bug', variant: 'destructive', icon: 'remixBugLine' },
  { id: '2', label: 'Feature', variant: 'brand', icon: 'remixStarLine' },
  { id: '3', label: 'Improvement', variant: 'lime-green', icon: 'remixArrowUpLine' },
  { id: '4', label: 'Documentation', variant: 'blue', icon: 'remixFileTextLine' },
];

const meta: Meta<DsSelectBadgeComponent> = {
  title: 'Global/Select Badge',
  component: DsSelectBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DsSelectBadgeComponent,
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
    options: priorityOptions,
    placeholder: 'Select priority',
    variant: 'default',
    disabled: false,
    ghost: false,
  },
};

export default meta;
type Story = StoryObj<DsSelectBadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedId: '3',
    },
    template: `
      <div style="width: 320px;">
        <ds-select-badge
          [options]="options"
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [(ngModel)]="selectedId">
        </ds-select-badge>
      </div>
    `,
  }),
};

export const Ghost: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedId: '3',
    },
    template: `
      <div style="width: 320px;">
        <ds-select-badge
          [options]="options"
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [ghost]="true"
          [(ngModel)]="selectedId">
        </ds-select-badge>
      </div>
    `,
  }),
};

export const WithFormField: Story = {
  render: () => ({
    props: {
      priorityOptions,
      statusOptions,
      typeOptions,
      priority: '3',
      status: '2',
      type: '2',
    },
    template: `
      <div style="width: 600px; display: flex; flex-direction: column; gap: 16px;">
        <ds-form-field [label]="'Priority'" [layout]="'horizontal'">
          <ds-select-badge
            [ghost]="true"
            [options]="priorityOptions"
            [(ngModel)]="priority">
          </ds-select-badge>
        </ds-form-field>

        <ds-form-field [label]="'Status'" [layout]="'horizontal'">
          <ds-select-badge
            [ghost]="true"
            [options]="statusOptions"
            [(ngModel)]="status">
          </ds-select-badge>
        </ds-form-field>

        <ds-form-field [label]="'Type'" [layout]="'horizontal'">
          <ds-select-badge
            [ghost]="true"
            [options]="typeOptions"
            [(ngModel)]="type">
          </ds-select-badge>
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
      selectedId: '3',
    },
    template: `
      <div style="width: 320px;">
        <ds-select-badge
          [options]="options"
          [disabled]="true"
          [(ngModel)]="selectedId">
        </ds-select-badge>
      </div>
    `,
  }),
};

