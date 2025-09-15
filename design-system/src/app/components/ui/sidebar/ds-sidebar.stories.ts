import type { Meta, StoryObj } from '@storybook/angular';
import { DsSidebarComponent, SidebarGroup } from './ds-sidebar';

const demoGroups: SidebarGroup[] = [
  {
    id: 'grp-top',
    label: '',
    showLabel: false,
    items: [
      { id: 'inbox', icon: 'remixInboxLine', label: 'Inbox', badgeText: '3' },
      { id: 'my-tasks', icon: 'remixTaskLine', label: 'My tasks' },
    ],
  },
  {
    id: 'grp-service',
    label: 'Service hub',
    items: [
      { id: 'inquiries', icon: 'remixQuestionAnswerLine', label: 'Inquiries' },
      { id: 'tasks', icon: 'remixClipboardLine', label: 'Tasks' },
      { id: 'documents', icon: 'remixFile2Line', label: 'Documents' },
      { id: 'notices', icon: 'remixNotificationLine', label: 'Notices' },
    ],
  },
  {
    id: 'grp-company',
    label: 'Company',
    items: [
      { id: 'dashboard', icon: 'remixLayout4Line', label: 'Dashboard' },
      { id: 'ratings', icon: 'remixStarSmileLine', label: 'Ratings' },
      { id: 'calendar', icon: 'remixCalendarLine', label: 'Calendar' },
      { id: 'reports', icon: 'remixBarChart2Line', label: 'Reports' },
      { id: 'kanban', icon: 'remixStackLine', label: 'Kanban' },
      { id: 'surveys', icon: 'remixSurveyLine', label: 'Surveys' },
      { id: 'inspections', icon: 'remixEditBoxLine', label: 'Inspections' },
    ],
  },
  {
    id: 'grp-catalog',
    label: 'Catalog',
    items: [
      { id: 'customers', icon: 'remixUser3Line', label: 'Customers' },
      { id: 'portfolios', icon: 'remixFolderLine', label: 'Portfolios' },
      { id: 'subsidiaries', icon: 'remixGitBranchLine', label: 'Subsidiaries' },
      { id: 'properties', icon: 'remixBuilding2Line', label: 'Properties' },
      { id: 'leases', icon: 'remixFileList3Line', label: 'Leases' },
      { id: 'tenants', icon: 'remixShieldCheckLine', label: 'Tenants' },
      { id: 'vendors', icon: 'remixUserSettingsLine', label: 'Vendors' },
      { id: 'vendor-agreements', icon: 'remixFileShield2Line', label: 'Vendor agreements' },
      { id: 'facilities', icon: 'remixMapPin2Line', label: 'Facilities' },
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


