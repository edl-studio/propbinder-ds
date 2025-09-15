import { Meta, StoryObj } from '@storybook/angular';
import { DsLinkComponent } from './ds-link';

const meta: Meta<DsLinkComponent> = {
  title: 'Primitives/Link',
  component: DsLinkComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    rel: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
    showIcon: {
      control: 'boolean',
    },
    iconName: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<DsLinkComponent>;

// Basic link with text only
export const Default: Story = {
  args: {
    content: 'This is a link',
    href: '#',
    showIcon: false,
  },
};

// Link with icon
export const WithIcon: Story = {
  args: {
    content: 'External link',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    showIcon: true,
    iconName: 'remixExternalLinkLine',
  },
};

// Link with different icon
export const WithCustomIcon: Story = {
  args: {
    content: 'Download file',
    href: '#',
    showIcon: true,
    iconName: 'remixDownloadLine',
  },
};

// Link using slot content
export const SlotContent: Story = {
  args: {
    href: '#',
    showIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-link [href]="href" [showIcon]="showIcon">
        Link with <strong>formatted</strong> content
      </ds-link>
    `,
  }),
};

// Link with slot content and icon
export const SlotContentWithIcon: Story = {
  args: {
    href: 'mailto:contact@example.com',
    showIcon: true,
    iconName: 'remixMailLine',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-link [href]="href" [showIcon]="showIcon" [iconName]="iconName">
        Send us an <em>email</em>
      </ds-link>
    `,
  }),
};

// Interactive examples
export const InteractiveExamples: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <ds-link href="#" content="Simple link"></ds-link>
        <ds-link href="https://example.com" target="_blank" rel="noopener noreferrer" [showIcon]="true" iconName="remixExternalLinkLine" content="External link"></ds-link>
        <ds-link href="mailto:test@example.com" [showIcon]="true" iconName="remixMailLine" content="Email link"></ds-link>
        <ds-link href="#" [showIcon]="true" iconName="remixDownloadLine" content="Download link"></ds-link>
        <ds-link href="#">Link with <strong>formatted</strong> content</ds-link>
      </div>
    `,
  }),
};
