import { SidebarGroup } from './ds-sidebar';

export const demoGroups: SidebarGroup[] = [
  {
    id: 'servicehub',
    label: 'SERVICEHUB',
    items: [
      { id: 'inbox', label: 'Inbox', icon: 'remixMailLine', badgeText: '2' },
      { id: 'inquiries', label: 'Inquiries', icon: 'remixQuestionAnswerLine', badgeText: '2' },
      { id: 'tasks', label: 'Tasks', icon: 'remixTaskLine' },
      { id: 'invoices', label: 'Invoices', icon: 'remixFileList3Line' },
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
    label: 'CATALOG',
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
