import type { Meta, StoryObj } from '@storybook/angular';
import { DsSidebarComponent } from './ds-sidebar';
import { demoGroups } from './demo-data';

const meta: Meta<DsSidebarComponent> = {
  title: 'Application shell/Sidebar',
  component: DsSidebarComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: true },
      source: { excludeDecorators: true }
    }
  },
  tags: ['autodocs'],
  args: {
    groups: demoGroups,
  },
  argTypes: {
    groups: {
      description: 'Array of sidebar groups with their items',
      control: 'object',
      table: {
        type: { 
          summary: 'SidebarGroup[]',
          detail: `interface SidebarGroup {
  id: string;
  label: string;
  items: {
    id: string;
    label: string;
    icon?: string;
    badgeText?: string;
  }[];
  expanded?: boolean;
  showLabel?: boolean;
}`
        }
      }
    },
    activeItemId: {
      description: 'ID of the currently active item',
      control: 'text'
    },
    collapsed: {
      description: 'Whether the sidebar is collapsed',
      control: 'boolean'
    },
    showGlobalAction: {
      description: 'Whether to show the global action button',
      control: 'boolean'
    },
    globalActionLabel: {
      description: 'Label for the global action button',
      control: 'text'
    },
    globalActionIcon: {
      description: 'Icon for the global action button',
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<DsSidebarComponent>;

export const Default: Story = {
  args: {
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
  args: { 
    showGlobalAction: true, 
    globalActionLabel: 'New', 
    globalActionIcon: 'remixAddLine' 
  },
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
  args: { 
    collapsed: true 
  },
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
  args: { 
    activeItemId: 'inbox' 
  },
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