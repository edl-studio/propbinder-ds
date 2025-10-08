import type { Meta, StoryObj } from '@storybook/angular';
import { DsHeaderDetailsComponent } from './ds-header-details';
import { DsDataItemComponent } from '../data-item/ds-data-item';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<DsHeaderDetailsComponent> = {
  title: 'Primitives/Header Details',
  component: DsHeaderDetailsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsDataItemComponent]
    })
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: true,
        height: 'auto'
      },
      description: {
        component: `
# Header Details Component

A specialized header component designed for entity detail pages such as Properties, Leases, Inquiries, Assets, and other business entities. It provides a consistent layout with a title row, configurable actions, and flexible content slots for metadata display.

## Design Principles

- **Consistent Spacing**: 24px top padding and gaps for visual hierarchy
- **Content-First**: Responsive width (10/12 columns of parent) ensures optimal reading experience  
- **Action-Oriented**: Prominent placement of primary and secondary actions
- **Flexible Content**: Slot-based architecture for customizable metadata layouts
- **Responsive**: Adapts gracefully from desktop to mobile viewports

## Anatomy

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  24px padding-top                                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Title Row                                             │  │
│  │ ┌─────────────────┐           ┌─────────────────────┐ │  │
│  │ │ Entity Title    │           │ Action Buttons      │ │  │
│  │ │ (H1, 2xl-medium)│           │ [Primary][Secondary]│ │  │
│  │ └─────────────────┘           └─────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│  24px gap                                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Details Row (Content Projection)                     │  │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │  │
│  │ │ Data Item 1 │ │ Data Item 2 │ │ Data Item 3 │ ... │  │
│  │ └─────────────┘ └─────────────┘ └─────────────┘     │  │
│  └───────────────────────────────────────────────────────┘  │
│  Width: 83.33% (10/12 columns of parent), centered        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Usage

Perfect for entity detail pages where you need to display:
- Entity title (e.g., property name, lease reference)
- Action buttons (edit, delete, follow, etc.)
- Metadata items using ds-data-item components

The details row uses content projection with \`slot="details"\` to allow flexible arrangement of data items.

## Content Projection

\`\`\`html
<ds-header-details title="Entity Name">
  <div slot="details" style="display: flex; flex-wrap: wrap; gap: 24px;">
    <ds-data-item label="Field 1" value="Value 1" layout="horizontal" />
    <ds-data-item label="Field 2" value="Value 2" layout="horizontal" />
  </div>
</ds-header-details>
\`\`\`

## Best Practices

### Do ✅
- Use descriptive, entity-specific titles
- Limit to 2-3 primary actions to avoid overwhelming users
- Use horizontal layout for data items in the details row
- Provide meaningful action labels and icons

### Don't ❌
- Don't use generic titles like "Details" or "Entity"
- Don't overcrowd the actions area with too many buttons
- Don't mix vertical and horizontal data item layouts
- Don't forget to handle action click events

## Responsive Behavior

- **Desktop (>768px)**: Full horizontal layout with side-by-side title and actions
- **Tablet (≤768px)**: Title and actions stack vertically with reduced spacing  
- **Mobile (≤480px)**: Compact spacing and optimized touch targets
        `
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title displayed in the header'
    },
    showPrimaryAction: {
      control: 'boolean',
      description: 'Whether to show the primary action button'
    },
    primaryActionText: {
      control: 'text',
      description: 'Text for the primary action button'
    },
    primaryActionIcon: {
      control: 'text',
      description: 'Icon for the primary action button'
    },
    primaryActionVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual variant for the primary action button'
    },
    showSecondaryAction: {
      control: 'boolean',
      description: 'Whether to show the secondary action button'
    },
    secondaryActionText: {
      control: 'text',
      description: 'Text for the secondary action button'
    },
    secondaryActionIcon: {
      control: 'text',
      description: 'Icon for the secondary action button'
    },
    secondaryActionVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual variant for the secondary action button'
    },
    showMoreActions: {
      control: 'boolean',
      description: 'Whether to show the more actions (three dots) button'
    }
  }
};

export default meta;
type Story = StoryObj<DsHeaderDetailsComponent>;

// Overview story for docs page
export const Overview: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The Header Details component provides a consistent layout for entity detail pages with configurable actions and flexible metadata display.'
      }
    }
  },
  args: {
    title: 'Entity Detail Example',
    showPrimaryAction: true,
    primaryActionText: 'Edit',
    primaryActionIcon: 'remixEditLine',
    primaryActionVariant: 'primary',
    showSecondaryAction: true,
    secondaryActionText: 'Share',
    secondaryActionIcon: 'remixShareLine',
    secondaryActionVariant: 'secondary',
    showMoreActions: true
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-header-details
        [title]="title"
        [showPrimaryAction]="showPrimaryAction"
        [primaryActionText]="primaryActionText"
        [primaryActionIcon]="primaryActionIcon"
        [primaryActionVariant]="primaryActionVariant"
        [showSecondaryAction]="showSecondaryAction"
        [secondaryActionText]="secondaryActionText"
        [secondaryActionIcon]="secondaryActionIcon"
        [secondaryActionVariant]="secondaryActionVariant"
        [showMoreActions]="showMoreActions"
        (primaryActionClick)="onPrimaryAction($event)"
        (secondaryActionClick)="onSecondaryAction($event)"
        (moreActionsClick)="onMoreActions($event)"
      >
        <div slot="details" style="display: flex; flex-wrap: wrap; gap: 48px;">
          <ds-data-item
            label="Status"
            value="Active"
            layout="vertical"
            valueType="badge"
            badgeVariant="success"
            badgeContent="Active"
            badgeContentType="text"
          />
          <ds-data-item
            label="Owner"
            value="Sarah Johnson"
            layout="vertical"
            valueType="avatar-text"
            avatarType="initials"
            avatarInitials="SJ"
          />
          <ds-data-item
            label="Created"
            value="March 15, 2024"
            layout="vertical"
            valueType="text"
          />
          <ds-data-item
            label="Category"
            value="Important"
            layout="vertical"
            valueType="icon-text"
            iconName="remixStarFill"
          />
        </div>
      </ds-header-details>
    `,
    methods: {
      onPrimaryAction: (event: MouseEvent) => {
        console.log('Primary action clicked:', event);
      },
      onSecondaryAction: (event: MouseEvent) => {
        console.log('Secondary action clicked:', event);
      },
      onMoreActions: (event: MouseEvent) => {
        console.log('More actions clicked:', event);
      }
    }
  })
};

// Basic example
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic header details example with a primary action and more actions menu. This demonstrates the typical layout for an entity detail page.'
      }
    }
  },
  args: {
    title: 'Woods Augusthus',
    showPrimaryAction: true,
    primaryActionText: 'Follow',
    primaryActionIcon: 'remixUserFollowLine',
    primaryActionVariant: 'primary',
    showSecondaryAction: false,
    showMoreActions: true
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-header-details
        [title]="title"
        [showPrimaryAction]="showPrimaryAction"
        [primaryActionText]="primaryActionText"
        [primaryActionIcon]="primaryActionIcon"
        [primaryActionVariant]="primaryActionVariant"
        [showSecondaryAction]="showSecondaryAction"
        [secondaryActionText]="secondaryActionText"
        [secondaryActionIcon]="secondaryActionIcon"
        [secondaryActionVariant]="secondaryActionVariant"
        [showMoreActions]="showMoreActions"
      >
        <div slot="details" style="display: flex; flex-wrap: wrap; gap: 48px;">
          <ds-data-item
            label="User name"
            value="Woods Augusthus"
            layout="vertical"
            valueType="avatar-text"
            avatarType="initials"
            avatarInitials="WA"
          />
          <ds-data-item
            label="Company name"
            value="Propbinder Inc."
            layout="vertical"
            valueType="avatar-text"
            avatarType="initials"
            avatarInitials="PI"
          />
        </div>
      </ds-header-details>
    `
  })
};

// Property detail example
export const PropertyDetail: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real estate property management example showing how to display property information with relevant actions like editing and viewing related leases.'
      }
    }
  },
  args: {
    title: 'Sunset Boulevard Apartments',
    showPrimaryAction: true,
    primaryActionText: 'Edit Property',
    primaryActionIcon: 'remixEditLine',
    primaryActionVariant: 'primary',
    showSecondaryAction: true,
    secondaryActionText: 'View Leases',
    secondaryActionIcon: 'remixFileList3Line',
    secondaryActionVariant: 'secondary',
    showMoreActions: true
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-header-details
        [title]="title"
        [showPrimaryAction]="showPrimaryAction"
        [primaryActionText]="primaryActionText"
        [primaryActionIcon]="primaryActionIcon"
        [primaryActionVariant]="primaryActionVariant"
        [showSecondaryAction]="showSecondaryAction"
        [secondaryActionText]="secondaryActionText"
        [secondaryActionIcon]="secondaryActionIcon"
        [secondaryActionVariant]="secondaryActionVariant"
        [showMoreActions]="showMoreActions"
      >
        <div slot="details" style="display: flex; flex-wrap: wrap; gap: 48px;">
          <ds-data-item
            label="Property Type"
            value="Residential"
            layout="vertical"
            valueType="icon-text"
            iconName="remixHome4Line"
          />
          <ds-data-item
            label="Status"
            value="Active"
            layout="vertical"
            valueType="badge"
            badgeVariant="success"
            badgeContent="Active"
            badgeContentType="text"
          />
          <ds-data-item
            label="Owner"
            value="Sarah Johnson"
            layout="vertical"
            valueType="avatar-text"
            avatarType="initials"
            avatarInitials="SJ"
          />
          <ds-data-item
            label="Units"
            value="24 units"
            layout="vertical"
            valueType="text"
          />
        </div>
      </ds-header-details>
    `
  })
};

// Lease detail example
export const LeaseDetail: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Lease management example demonstrating how to display lease agreement details with actions for renewal and report generation.'
      }
    }
  },
  args: {
    title: 'Lease Agreement #LA-2024-001',
    showPrimaryAction: true,
    primaryActionText: 'Renew Lease',
    primaryActionIcon: 'remixRefreshLine',
    primaryActionVariant: 'primary',
    showSecondaryAction: true,
    secondaryActionText: 'Generate Report',
    secondaryActionIcon: 'remixFileTextLine',
    secondaryActionVariant: 'secondary',
    showMoreActions: true
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-header-details
        [title]="title"
        [showPrimaryAction]="showPrimaryAction"
        [primaryActionText]="primaryActionText"
        [primaryActionIcon]="primaryActionIcon"
        [primaryActionVariant]="primaryActionVariant"
        [showSecondaryAction]="showSecondaryAction"
        [secondaryActionText]="secondaryActionText"
        [secondaryActionIcon]="secondaryActionIcon"
        [secondaryActionVariant]="secondaryActionVariant"
        [showMoreActions]="showMoreActions"
      >
        <div slot="details" style="display: flex; flex-wrap: wrap; gap: 48px;">
          <ds-data-item
            label="Tenant"
            value="Michael Chen"
            layout="vertical"
            valueType="avatar-text"
            avatarType="initials"
            avatarInitials="MC"
          />
          <ds-data-item
            label="Property"
            value="Sunset Blvd Apt 4B"
            layout="vertical"
            valueType="icon-text"
            iconName="remixBuildingLine"
          />
          <ds-data-item
            label="Status"
            value="Active"
            layout="vertical"
            valueType="badge"
            badgeVariant="success"
            badgeContent="Active"
            badgeContentType="text"
          />
          <ds-data-item
            label="Rent Amount"
            value="$2,400/month"
            layout="vertical"
            valueType="text"
          />
          <ds-data-item
            label="Lease Term"
            value="12 months"
            layout="vertical"
            valueType="text"
          />
        </div>
      </ds-header-details>
    `
  })
};

// Minimal example with no actions
export const MinimalNoActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal header example with no action buttons, useful for read-only entity displays or when actions are handled elsewhere on the page.'
      }
    }
  },
  args: {
    title: 'Simple Entity Details',
    showPrimaryAction: false,
    showSecondaryAction: false,
    showMoreActions: false
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-header-details
        [title]="title"
        [showPrimaryAction]="showPrimaryAction"
        [showSecondaryAction]="showSecondaryAction"
        [showMoreActions]="showMoreActions"
      >
        <div slot="details" style="display: flex; flex-wrap: wrap; gap: 48px;">
          <ds-data-item
            label="Created"
            value="March 15, 2024"
            layout="vertical"
            valueType="text"
          />
          <ds-data-item
            label="Last Modified"
            value="Yesterday"
            layout="vertical"
            valueType="text"
          />
        </div>
      </ds-header-details>
    `
  })
};

// Mobile responsive example
export const MobileView: Story = {
  args: {
    title: 'Mobile Responsive Header',
    showPrimaryAction: true,
    primaryActionText: 'Edit',
    primaryActionIcon: 'remixEditLine',
    primaryActionVariant: 'primary',
    showSecondaryAction: true,
    secondaryActionText: 'Share',
    secondaryActionIcon: 'remixShareLine',
    secondaryActionVariant: 'secondary',
    showMoreActions: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile responsive behavior showing how the header adapts to smaller screens with stacked layout and compact spacing. Data items switch to vertical layout for better mobile experience.'
      }
    }
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-header-details
        [title]="title"
        [showPrimaryAction]="showPrimaryAction"
        [primaryActionText]="primaryActionText"
        [primaryActionIcon]="primaryActionIcon"
        [primaryActionVariant]="primaryActionVariant"
        [showSecondaryAction]="showSecondaryAction"
        [secondaryActionText]="secondaryActionText"
        [secondaryActionIcon]="secondaryActionIcon"
        [secondaryActionVariant]="secondaryActionVariant"
        [showMoreActions]="showMoreActions"
      >
        <div slot="details" style="display: flex; flex-wrap: wrap; gap: 48px;">
          <ds-data-item
            label="Status"
            value="Active"
            layout="vertical"
            valueType="badge"
            badgeVariant="success"
            badgeContent="Active"
            badgeContentType="text"
          />
          <ds-data-item
            label="Owner"
            value="John Doe"
            layout="vertical"
            valueType="avatar-text"
            avatarType="initials"
            avatarInitials="JD"
          />
        </div>
      </ds-header-details>
    `
  })
};
