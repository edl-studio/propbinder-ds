import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsListItemComponent } from './ds-list-item';
import { DsButtonComponent } from '../button/ds-button';
import { DsMetadataItemComponent } from '../metadata-item/ds-metadata-item';

const meta: Meta<DsListItemComponent> = {
  title: 'Primitives/List Item',
  component: DsListItemComponent,
  decorators: [
    moduleMetadata({
      imports: [DsButtonComponent, DsMetadataItemComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile list item component that supports a title with metadata and action buttons.

## Features

- **Title Property**: Configurable title with consistent typography
- **Metadata Slot**: Flexible slot for metadata items (status, timestamps, etc.)
- **Actions Slot**: Action buttons that appear on hover
- **Hover State**: Subtle background change and action reveal on hover
- **Responsive Layout**: Adapts to different screen sizes

## Slots

- **metadata**: For metadata items like status indicators, timestamps, etc.
- **actions**: For action buttons that appear on hover

## Examples

\`\`\`html
<ds-list-item title="Review pending changes">
  <!-- Metadata slot -->
  <div slot="metadata">
    <ds-metadata-item icon="remixTimeLine" value="2 hours ago" />
    <ds-metadata-item icon="remixUserLine" value="Assigned to John" />
  </div>
  
  <!-- Actions slot -->
  <div slot="actions">
    <ds-button variant="ghost" size="sm">Skip</ds-button>
    <ds-button variant="primary" size="sm">Review</ds-button>
  </div>
</ds-list-item>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title text to display',
    },
  },
};

export default meta;
type Story = StoryObj<DsListItemComponent>;

// Basic Example with minimal metadata
export const Basic: Story = {
  args: {
    title: 'Review documentation changes',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-list-item [title]="title">
        <div slot="metadata">
          <ds-metadata-item icon="remixTimeLine" value="2 hours ago" />
        </div>
      </ds-list-item>
    `,
  }),
};

// With Long Title
export const LongTitle: Story = {
  args: {
    title: 'This is a very long title that should demonstrate how the component handles longer text content and wrapping behavior while maintaining proper alignment',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-list-item [title]="title">
        <div slot="metadata">
          <ds-metadata-item icon="remixTimeLine" value="Just now" />
          <ds-metadata-item icon="remixFileTextLine" value="Documentation" />
        </div>
      </ds-list-item>
    `,
  }),
};

// With Metadata
export const WithMetadata: Story = {
  args: {
    title: 'Review and approve design changes',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-list-item [title]="title">
        <div slot="metadata">
          <ds-metadata-item icon="remixTimeLine" value="4 hours ago" />
          <ds-metadata-item icon="remixUserLine" value="Based on 8 reviews" />
          <ds-metadata-item icon="remixAlarmLine" value="Important" variant="warning" />
        </div>
      </ds-list-item>
    `,
  }),
};

// With Actions
export const WithActions: Story = {
  args: {
    title: 'Update user documentation',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-list-item [title]="title">
        <div slot="metadata">
          <ds-metadata-item icon="remixFileTextLine" value="Documentation" />
          <ds-metadata-item icon="remixTimeLine" value="3 days ago" />
        </div>
        <div slot="actions">
          <ds-button variant="ghost" size="sm">Skip</ds-button>
          <ds-button variant="primary" size="sm">Review</ds-button>
        </div>
      </ds-list-item>
    `,
  }),
};

// Complete Example
export const Complete: Story = {
  args: {
    title: 'Inspect for signs of leaks or dampness',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-list-item [title]="title">
        <div slot="metadata">
          <ds-metadata-item icon="remixAlertLine" value="Important" variant="warning" />
          <ds-metadata-item icon="remixTeamLine" value="Based on 12 inquiries" />
          <ds-metadata-item icon="remixTimeLine" value="4 hours ago" />
        </div>
        <div slot="actions">
          <ds-button variant="ghost" size="sm">Skip</ds-button>
          <ds-button variant="primary" size="sm">Create task</ds-button>
        </div>
      </ds-list-item>
    `,
  }),
};