import { Meta, StoryObj } from '@storybook/angular';
import { DsDataItemComponent } from './ds-data-item';

const meta: Meta<DsDataItemComponent> = {
  title: 'Primitives/Data Item',
  component: DsDataItemComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible data item component for displaying label-value pairs with multiple layout options and value types. Perfect for user profiles, task details, settings panels, and structured data displays.

## Features

- **Two Layout Types**: Vertical and horizontal arrangements for different use cases
- **Fixed Value Height**: 32px height for consistent alignment across all value types
- **Four Value Types**: Text, Icon+Text, Avatar+Text, and Badge variants
- **Responsive Design**: Horizontal layout automatically collapses to vertical on mobile
- **Consistent Spacing**: 8px gap between elements in value container
- **Semantic Typography**: Uses ui-sm-regular (14px, 400 weight) for value text

## Layout Types

### Vertical Layout
Stacks label above value with 4px gap. Ideal for compact displays, mobile layouts, and when you need to conserve horizontal space.

### Horizontal Layout
Places label and value side-by-side with 12px gap. Label container has fixed 128px width for consistent alignment across multiple data items.

## Value Types

### Text Only
Simple text display using ui-sm-regular typography with primary text color.

### Icon + Text
16px icon with secondary color paired with text. Perfect for status indicators, locations, or categorized information.

### Avatar + Text
20x20px avatar (xs size) with text. Supports all avatar types: initials, photo, and icon. Ideal for user assignments, ownership, or person-related data.

### Badge
Full badge component with all variants and content types. Perfect for status, priority, categories, or any labeled information.

For complete documentation, properties reference, and implementation guidelines, see the [Data Item README](/?path=/docs/components-data-item--docs).
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text to display',
    },
    value: {
      control: 'text',
      description: 'The value text to display (not used for badge type)',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout arrangement of label and value',
    },
    valueType: {
      control: 'select',
      options: ['text', 'icon-text', 'avatar-text', 'badge'],
      description: 'Type of value display',
    },
    iconName: {
      control: 'text',
      description: 'Icon name for icon-text type',
      if: { arg: 'valueType', eq: 'icon-text' },
    },
    avatarType: {
      control: 'select',
      options: ['initials', 'photo', 'icon'],
      description: 'Avatar type for avatar-text type',
      if: { arg: 'valueType', eq: 'avatar-text' },
    },
    avatarInitials: {
      control: 'text',
      description: 'Avatar initials for initials type',
      if: { arg: 'valueType', eq: 'avatar-text' },
    },
    avatarSrc: {
      control: 'text',
      description: 'Avatar image source for photo type',
      if: { arg: 'valueType', eq: 'avatar-text' },
    },
    avatarIconName: {
      control: 'text',
      description: 'Avatar icon name for icon type',
      if: { arg: 'valueType', eq: 'avatar-text' },
    },
    badgeVariant: {
      control: 'select',
      options: ['default', 'brand', 'success', 'warning', 'destructive', 'blue', 'light-purple', 'pink', 'salmon-orange', 'orange', 'lime-green', 'grey'],
      description: 'Badge color variant',
      if: { arg: 'valueType', eq: 'badge' },
    },
    badgeContentType: {
      control: 'select',
      options: ['text', 'icon-text', 'indicator-text'],
      description: 'Badge content type',
      if: { arg: 'valueType', eq: 'badge' },
    },
    badgeContent: {
      control: 'text',
      description: 'Badge content text',
      if: { arg: 'valueType', eq: 'badge' },
    },
    badgeIcon: {
      control: 'text',
      description: 'Badge icon name for icon-text type',
      if: { arg: 'valueType', eq: 'badge' },
    },
    badgeIndicatorShape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Badge indicator shape for indicator-text type',
      if: { arg: 'valueType', eq: 'badge' },
    },
  },
  args: {
    label: 'Email',
    value: 'user@example.com',
    layout: 'vertical',
    valueType: 'text',
  },
};

export default meta;
type Story = StoryObj<DsDataItemComponent>;

// Basic Examples
export const VerticalText: Story = {
  args: {
    label: 'Email Address',
    value: 'user@example.com',
    layout: 'vertical',
    valueType: 'text',
  },
};

export const HorizontalText: Story = {
  args: {
    label: 'Full Name',
    value: 'John Doe',
    layout: 'horizontal',
    valueType: 'text',
  },
};


// Icon + Text Examples
export const VerticalIconText: Story = {
  args: {
    label: 'Status',
    value: 'Active',
    layout: 'vertical',
    iconName: 'remixCheckboxCircleFill',
  },
};

export const HorizontalIconText: Story = {
  args: {
    label: 'Location',
    value: 'New York, NY',
    layout: 'horizontal',
    iconName: 'remixMapPin2Fill',
  },
};

// Avatar + Text Examples
export const VerticalAvatarInitials: Story = {
  args: {
    label: 'Assigned to',
    value: 'John Doe',
    layout: 'vertical',
    valueType: 'avatar-text',
    avatarType: 'initials',
    avatarInitials: 'JD',
  },
};

export const HorizontalAvatarPhoto: Story = {
  args: {
    label: 'Created by',
    value: 'Sarah Wilson',
    layout: 'horizontal',
    valueType: 'avatar-text',
    avatarType: 'photo',
    avatarSrc: '/Dummy-avatars/dummy-portrait-woman.jpg',
  },
};

export const HorizontalAvatarIcon: Story = {
  args: {
    label: 'Owner',
    value: 'System User',
    layout: 'horizontal',
    valueType: 'avatar-text',
    avatarType: 'icon',
    avatarIconName: 'remixRobotFill',
  },
};

// Badge Examples
export const VerticalBadge: Story = {
  args: {
    label: 'Priority',
    layout: 'vertical',
    valueType: 'badge',
    badgeVariant: 'destructive',
    badgeContentType: 'text',
    badgeContent: 'High',
  },
};

export const HorizontalBadgeIcon: Story = {
  args: {
    label: 'Status',
    layout: 'horizontal',
    valueType: 'badge',
    badgeVariant: 'success',
    badgeContentType: 'icon-text',
    badgeContent: 'Completed',
    badgeIcon: 'remixCheckboxCircleFill',
  },
};

export const HorizontalBadgeIndicator: Story = {
  args: {
    label: 'Type',
    layout: 'horizontal',
    valueType: 'badge',
    badgeVariant: 'brand',
    badgeContentType: 'indicator-text',
    badgeContent: 'Premium',
    badgeIndicatorShape: 'circle',
  },
};

// Layout Comparison
export const LayoutComparison: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Vertical Layout</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <ds-data-item
              label="Email address"
              value="user@example.com"
              layout="vertical"
              valueType="text"
            />
            <ds-data-item
              label="Status"
              value="Active"
              layout="vertical"
              valueType="icon-text"
              iconName="remixCheckboxCircleFill"
            />
            <ds-data-item
              label="Assigned to"
              value="John Doe"
              layout="vertical"
              valueType="avatar-text"
              avatarType="initials"
              avatarInitials="JD"
            />
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Horizontal Layout</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <ds-data-item
              label="Email address"
              value="user@example.com"
              layout="horizontal"
              valueType="text"
            />
            <ds-data-item
              label="Status"
              value="Active"
              layout="horizontal"
              valueType="icon-text"
              iconName="remixCheckboxCircleFill"
            />
            <ds-data-item
              label="Assigned to"
              value="John Doe"
              layout="horizontal"
              valueType="avatar-text"
              avatarType="initials"
              avatarInitials="JD"
            />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// Value Types Showcase
export const ValueTypesShowcase: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <ds-data-item
          label="Text value"
          value="Simple text content"
          layout="horizontal"
          valueType="text"
        />
        <ds-data-item
          label="Icon + Text"
          value="With icon prefix"
          layout="horizontal"
          valueType="icon-text"
          iconName="remixStarFill"
        />
        <ds-data-item
          label="Avatar + Text"
          value="John Doe"
          layout="horizontal"
          valueType="avatar-text"
          avatarType="initials"
          avatarInitials="JD"
        />
        <ds-data-item
          label="Badge value"
          layout="horizontal"
          valueType="badge"
          badgeVariant="success"
          badgeContentType="icon-text"
          badgeContent="Verified"
          badgeIcon="remixShieldCheckFill"
        />
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// Real-world Examples
export const UserProfile: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px; padding: 24px; border: 1px solid var(--border-color-default); border-radius: 8px;">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">User Profile</h3>
        
        <ds-data-item
          label="Full name"
          value="Sarah Wilson"
          layout="horizontal"
          valueType="text"
        />
        <ds-data-item
          label="Email"
          value="sarah.wilson@company.com"
          layout="horizontal"
          valueType="text"
        />
        <ds-data-item
          label="Role"
          layout="horizontal"
          valueType="badge"
          badgeVariant="brand"
          badgeContentType="text"
          badgeContent="Admin"
        />
        <ds-data-item
          label="Status"
          value="Online"
          layout="horizontal"
          valueType="icon-text"
          iconName="remixCheckboxCircleFill"
        />
        <ds-data-item
          label="Manager"
          value="John Doe"
          layout="horizontal"
          valueType="avatar-text"
          avatarType="initials"
          avatarInitials="JD"
        />
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const TaskDetails: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px; padding: 24px; border: 1px solid var(--border-color-default); border-radius: 8px;">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Task Details</h3>
        
        <ds-data-item
          label="Title"
          value="Implement user authentication"
          layout="horizontal"
          valueType="text"
        />
        <ds-data-item
          label="Priority"
          layout="horizontal"
          valueType="badge"
          badgeVariant="warning"
          badgeContentType="text"
          badgeContent="High"
        />
        <ds-data-item
          label="Status"
          layout="horizontal"
          valueType="badge"
          badgeVariant="blue"
          badgeContentType="indicator-text"
          badgeContent="In Progress"
          badgeIndicatorShape="circle"
        />
        <ds-data-item
          label="Assignee"
          value="Sarah Wilson"
          layout="horizontal"
          valueType="avatar-text"
          avatarType="photo"
          avatarSrc="/Dummy-avatars/dummy-portrait-woman.jpg"
        />
        <ds-data-item
          label="Due date"
          value="March 15, 2024"
          layout="horizontal"
          valueType="icon-text"
          iconName="remixCalendarLine"
        />
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};
