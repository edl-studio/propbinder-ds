import { Meta, StoryObj } from '@storybook/angular';
import { DsSpinnerComponent } from './ds-spinner.component';
import { IconSize } from '../icon/ds-icon';

const meta: Meta<DsSpinnerComponent> = {
  title: 'Primitives/Spinner',
  component: DsSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '32px'],
      description: 'Size of the spinner',
      table: {
        defaultValue: { summary: '20px' }
      }
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'brand', 'success', 'warning', 'destructive'],
      description: 'Color of the spinner',
      table: {
        defaultValue: { summary: 'tertiary' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<DsSpinnerComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="tw-flex">
        <ds-spinner size="20px" color="tertiary" />
      </div>
    `
  })
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="tw-flex tw-items-center tw-gap-4">
        <ds-spinner size="12px" />
        <ds-spinner size="16px" />
        <ds-spinner size="20px" />
        <ds-spinner size="24px" />
        <ds-spinner size="32px" />
      </div>
    `
  })
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div class="tw-flex tw-items-center tw-gap-4">
        <ds-spinner color="primary" />
        <ds-spinner color="secondary" />
        <ds-spinner color="tertiary" />
        <ds-spinner color="brand" />
        <ds-spinner color="success" />
        <ds-spinner color="warning" />
        <ds-spinner color="destructive" />
      </div>
    `
  })
};
