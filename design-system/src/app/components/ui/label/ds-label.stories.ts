import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsLabelComponent } from './ds-label';
import { DsInputComponent } from '../input/ds-input';

const meta: Meta<DsLabelComponent> = {
  title: 'Primitives/Label',
  component: DsLabelComponent,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    moduleMetadata({
      imports: [DsInputComponent],
    })
  ],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the label',
    },
    for: {
      control: 'text',
      description: 'The ID of the form control this label is associated with',
    },
    id: {
      control: 'text',
      description: 'The ID of the label element',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'The size of the label text (sm = ui-xs-regular, md = ui-sm-regular)',
      defaultValue: 'md',
    },
  },
};

export default meta;
type Story = StoryObj<DsLabelComponent>;

export const Default: Story = {
  args: {
    className: '',
    size: 'md',
  },
  render: (args) => ({
    props: {
      ...args
    },
    styles: [`
      :host {
        display: block;
        padding: 1rem;
        background: white;
      }
    `],
    template: `
      <ds-label [className]="className" [for]="for" [id]="id" [size]="size">
        Label Text
      </ds-label>
    `
  })
};

export const Sizes: Story = {
  args: {
    className: '',
  },
  render: () => ({
    styles: [`
      :host {
        display: block;
        padding: 1rem;
        background: white;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `],
    template: `
      <div class="container">
        <ds-label size="sm">
          Small Label (ui-xs-regular)
        </ds-label>
        <ds-label size="md">
          Medium Label (ui-sm-regular)
        </ds-label>
      </div>
    `
  })
};

export const WithInput: Story = {
  args: {
    className: '',
    for: 'example-input',
    size: 'md',
  },
  render: (args) => ({
    props: {
      ...args
    },
    styles: [`
      :host {
        display: block;
        padding: 1rem;
        background: white;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    `],
    template: `
      <div class="container">
        <ds-label [className]="className" [for]="for" [id]="id" [size]="size">
          Input Label
        </ds-label>
        <ds-input id="example-input" placeholder="Enter text..."></ds-input>
      </div>
    `
  })
};
