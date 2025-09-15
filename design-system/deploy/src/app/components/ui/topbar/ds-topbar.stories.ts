import type { Meta, StoryObj } from '@storybook/angular';
import { DsTopbarComponent } from './ds-topbar';
import { TopbarBreadcrumbItem } from './ds-topbar-breadcrumb';

const meta: Meta<DsTopbarComponent> = {
  title: 'Application shell/Topbar',
  component: DsTopbarComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A page header component that displays a page title with icon on the left and action buttons with user avatar on the right. Can optionally show breadcrumb navigation for nested pages.',
      },
    },
  },
  argTypes: {
    pageTitle: {
      control: 'text',
      description: 'The title of the page',
    },
    iconName: {
      control: 'text',
      description: 'Icon name to display next to the page title',
    },
    userInitials: {
      control: 'text',
      description: 'User initials to display in the avatar',
    },
    showBreadcrumbs: {
      control: 'boolean',
      description: 'Whether to show breadcrumb navigation',
    },
    breadcrumbItems: {
      control: 'object',
      description: 'Array of breadcrumb items to display',
    },
    showFirstAction: {
      control: 'boolean',
      description: 'Whether to show the first action button',
    },
    firstActionIcon: {
      control: 'text',
      description: 'Icon name for the first action button',
    },
    firstActionLabel: {
      control: 'text',
      description: 'Aria label for the first action button',
    },
    showSecondAction: {
      control: 'boolean',
      description: 'Whether to show the second action button',
    },
    secondActionIcon: {
      control: 'text',
      description: 'Icon name for the second action button',
    },
    secondActionLabel: {
      control: 'text',
      description: 'Aria label for the second action button',
    },
  },
  args: {
    pageTitle: 'Dashboard',
    iconName: 'remixHome4Line',
    userInitials: 'JD',
    showBreadcrumbs: false,
    breadcrumbItems: [],
    showFirstAction: true,
    firstActionIcon: 'remixNotification3Line',
    firstActionLabel: 'Notifications',
    showSecondAction: true,
    secondActionIcon: 'remixSettings3Line',
    secondActionLabel: 'Settings',
  },
};

export default meta;
type Story = StoryObj<DsTopbarComponent>;

// Default story - without breadcrumbs
export const Default: Story = {};

// With breadcrumbs
export const WithBreadcrumbs: Story = {
  args: {
    pageTitle: 'PFA Pension',
    iconName: 'remixBuilding4Line',
    showBreadcrumbs: true,
    breadcrumbItems: [
      { label: 'Customers', path: '/customers', isLast: false },
      { label: 'PFA Pension', path: '/customers/pfa-pension', isLast: true }
    ],
  },
};

// Nested page with breadcrumbs
export const NestedPageWithBreadcrumbs: Story = {
  args: {
    pageTitle: 'Edit Profile',
    iconName: 'remixUser3Line',
    showBreadcrumbs: true,
    breadcrumbItems: [
      { label: 'Settings', path: '/settings', isLast: false },
      { label: 'Users', path: '/settings/users', isLast: false },
      { label: 'Edit Profile', path: '/settings/users/profile', isLast: true }
    ],
  },
};

// Different page titles without breadcrumbs
export const ProjectOverview: Story = {
  args: {
    pageTitle: 'Project Overview',
    iconName: 'remixFolderLine',
    userInitials: 'AM',
  },
};

export const UserSettings: Story = {
  args: {
    pageTitle: 'User Settings',
    iconName: 'remixSettings3Line',
    userInitials: 'SM',
    firstActionIcon: 'remixSaveLine',
    firstActionLabel: 'Save Settings',
    secondActionIcon: 'remixRefreshLine',
    secondActionLabel: 'Reset Settings',
  },
};

// Long title example
export const LongTitleWithBreadcrumbs: Story = {
  args: {
    pageTitle: 'This is a Very Long Page Title That Should Be Truncated',
    iconName: 'remixFileTextLine',
    userInitials: 'LT',
    showBreadcrumbs: true,
    breadcrumbItems: [
      { label: 'Documents', path: '/documents', isLast: false },
      { label: 'Reports', path: '/documents/reports', isLast: false },
      { label: 'This is a Very Long Page Title That Should Be Truncated', path: '/documents/reports/long-title', isLast: true }
    ],
  },
};

// Single action button
export const SingleAction: Story = {
  args: {
    pageTitle: 'Profile',
    iconName: 'remixUser3Line',
    userInitials: 'SA',
    showFirstAction: true,
    showSecondAction: false,
    firstActionIcon: 'remixEditLine',
    firstActionLabel: 'Edit Profile',
  },
};

// No action buttons
export const NoActions: Story = {
  args: {
    pageTitle: 'Read Only Page',
    iconName: 'remixEyeLine',
    userInitials: 'RO',
    showFirstAction: false,
    showSecondAction: false,
  },
};

// Mobile responsive preview with breadcrumbs
export const MobileViewWithBreadcrumbs: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    pageTitle: 'Account Details',
    iconName: 'remixSmartphoneLine',
    userInitials: 'MB',
    showBreadcrumbs: true,
    breadcrumbItems: [
      { label: 'Settings', path: '/settings', isLast: false },
      { label: 'Account', path: '/settings/account', isLast: false },
      { label: 'Details', path: '/settings/account/details', isLast: true }
    ],
  },
};