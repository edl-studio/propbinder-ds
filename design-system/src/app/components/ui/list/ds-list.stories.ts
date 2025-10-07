import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsListComponent } from './ds-list';
import { DsListItemComponent } from '../list-item/ds-list-item';
import { DsButtonComponent } from '../button/ds-button';
import { DsMetadataItemComponent } from '../metadata-item/ds-metadata-item';

const meta: Meta<DsListComponent> = {
  title: 'Primitives/List',
  component: DsListComponent,
  decorators: [
    moduleMetadata({
      imports: [DsListItemComponent, DsButtonComponent, DsMetadataItemComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A container component that provides consistent styling for lists of items.
Handles border radius, dividers, and spacing automatically.

## Features
- Consistent border radius handling
- Automatic dividers between items
- Proper hover state management
- Responsive padding and spacing

## Usage
\`\`\`html
<ds-list>
  <ds-list-item title="First item">
    <div slot="metadata">
      <ds-metadata-item icon="remixTimeLine" value="2 hours ago" />
    </div>
    <div slot="actions">
      <ds-button variant="ghost" size="sm">Skip</ds-button>
      <ds-button variant="primary" size="sm">Action</ds-button>
    </div>
  </ds-list-item>
  <ds-list-item title="Second item">...</ds-list-item>
</ds-list>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsListComponent>;

export const Basic: Story = {
  render: () => ({
    template: `
      <ds-list>
        <ds-list-item title="Review documentation changes">
          <div slot="metadata">
            <ds-metadata-item icon="remixTimeLine" value="2 hours ago" />
          </div>
          <div slot="actions">
            <ds-button variant="ghost" size="sm">Skip</ds-button>
            <ds-button variant="primary" size="sm">Review</ds-button>
          </div>
        </ds-list-item>
        <ds-list-item title="Update user settings">
          <div slot="metadata">
            <ds-metadata-item icon="remixUserLine" value="Assigned to you" />
            <ds-metadata-item icon="remixTimeLine" value="1 day ago" />
          </div>
          <div slot="actions">
            <ds-button variant="ghost" size="sm">Skip</ds-button>
            <ds-button variant="primary" size="sm">Update</ds-button>
          </div>
        </ds-list-item>
        <ds-list-item title="Deploy new features">
          <div slot="metadata">
            <ds-metadata-item icon="remixRocketLine" value="Release" variant="success" />
            <ds-metadata-item icon="remixTimeLine" value="3 days ago" />
          </div>
          <div slot="actions">
            <ds-button variant="ghost" size="sm">Skip</ds-button>
            <ds-button variant="primary" size="sm">Deploy</ds-button>
          </div>
        </ds-list-item>
      </ds-list>
    `,
  }),
};
