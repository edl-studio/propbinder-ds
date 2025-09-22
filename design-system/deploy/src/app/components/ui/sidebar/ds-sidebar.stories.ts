import type { Meta, StoryObj } from '@storybook/angular';
import { DsSidebarComponent, SidebarGroup } from './ds-sidebar';

export const demoGroups: SidebarGroup[] = [
  {
    id: 'servicehub',
    label: 'SERVICEHUB',
    items: [
      { id: 'inbox', label: 'Inbox', icon: 'remixMailLine', badgeText: '2' },
      { id: 'inquiries', label: 'Inquiries', icon: 'remixQuestionAnswerLine', badgeText: '2' },
      { id: 'tasks', label: 'Tasks', icon: 'remixTaskLine' },
      { id: 'surveys', label: 'Surveys', icon: 'remixSurveyLine' },
    ],
  },
  {
    id: 'company',
    label: 'COMPANY',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'remixDashboardLine' },
      { id: 'rating', label: 'Rating', icon: 'remixStarLine' },
      { id: 'calendar', label: 'Calendar', icon: 'remixCalendarLine' },
      { id: 'settings', label: 'Settings', icon: 'remixSettings4Line' },
    ],
  },
  {
    id: 'kartoteker',
    label: 'KARTOTEKER',
    items: [
      { id: 'customers', label: 'Customers', icon: 'remixTeamLine' },
      { id: 'companies', label: 'Companies', icon: 'remixBuilding4Line' },
      { id: 'properties', label: 'Properties', icon: 'remixBuilding2Line' },
      { id: 'leases', label: 'Leases', icon: 'remixFileListLine' },
      { id: 'tenants', label: 'Tenants', icon: 'remixUserLine' },
      { id: 'vendors', label: 'Vendors', icon: 'remixStore2Line' },
      { id: 'vendor-agreements', label: 'Vendor agreements', icon: 'remixFileTextLine' },
      { id: 'assets', label: 'Assets', icon: 'remixDatabase2Line' },
      { id: 'real-esg', label: 'Real ESG', icon: 'remixLeafLine' },
    ],
  },
  {
    id: 'me',
    label: 'ME',
      items: [
        { id: 'my-details', label: 'My details', icon: 'remixUserSettingsLine' },
        { id: 'whats-new', label: 'What\'s new', icon: 'remixNotification4Line' },
      ],
  },
];

const meta: Meta<DsSidebarComponent> = {
  title: 'Application shell/Sidebar',
  component: DsSidebarComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<DsSidebarComponent>;

export const Default: Story = {
  args: {
    groups: demoGroups,
    ariaLabel: 'Main navigation',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 600px; display: flex;">
        <ds-sidebar [groups]="groups" [ariaLabel]="ariaLabel" />
      </div>
    `,
  }),
};

export const WithGlobalAction: Story = {
  args: { groups: demoGroups, showGlobalAction: true, globalActionLabel: 'New', globalActionIcon: 'remixAddLine' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 600px; display: flex;">
        <ds-sidebar [groups]="groups" [showGlobalAction]="showGlobalAction" [globalActionLabel]="globalActionLabel" [globalActionIcon]="globalActionIcon" />
      </div>
    `,
  }),
};

export const Collapsed: Story = {
  args: { groups: demoGroups, collapsed: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 600px; display: flex;">
        <ds-sidebar [groups]="groups" [collapsed]="collapsed" />
      </div>
    `,
  }),
};

export const ActiveItem: Story = {
  args: { groups: demoGroups, activeItemId: 'inbox' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 600px; display: flex;">
        <ds-sidebar [groups]="groups" [activeItemId]="activeItemId" />
      </div>
    `,
  }),
};

export const CollapsedWithGlobalAction: Story = {
  args: { 
    groups: demoGroups, 
    collapsed: true, 
    showGlobalAction: true, 
    globalActionLabel: 'Create New', 
    globalActionIcon: 'remixAddLine' 
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 600px; display: flex;">
        <ds-sidebar 
          [groups]="groups" 
          [collapsed]="collapsed" 
          [showGlobalAction]="showGlobalAction" 
          [globalActionLabel]="globalActionLabel" 
          [globalActionIcon]="globalActionIcon" 
        />
      </div>
    `,
  }),
};


