import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsTabs } from './ds-tabs';
import { DsTab } from './ds-tab';
import { signal } from '@angular/core';

const meta: Meta<DsTabs> = {
  title: 'Primitives/Tabs',
  component: DsTabs,
  decorators: [
    moduleMetadata({
      imports: [DsTabs, DsTab],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsTabs>;

export const Basic: Story = {
  render: () => ({
    props: {
      value: signal('tab1'),
    },
    template: `
      <ds-tabs [(value)]="value">
        <ds-tab value="tab1" label="First Tab">
          <p>Content for first tab</p>
        </ds-tab>
        <ds-tab value="tab2" label="Second Tab">
          <p>Content for second tab</p>
        </ds-tab>
        <ds-tab value="tab3" label="Third Tab">
          <p>Content for third tab</p>
        </ds-tab>
      </ds-tabs>
    `,
  }),
};

export const WithBadges: Story = {
  render: () => ({
    props: {
      value: signal('inbox'),
    },
    template: `
      <ds-tabs [(value)]="value">
        <ds-tab value="inbox" label="Inbox" [showBadge]="true" [badgeCount]="3">
          <p>Inbox content</p>
        </ds-tab>
        <ds-tab value="tasks" label="My tasks" [showBadge]="true" [badgeCount]="12">
          <p>Tasks content</p>
        </ds-tab>
        <ds-tab value="archive" label="Archive">
          <p>Archive content</p>
        </ds-tab>
      </ds-tabs>
    `,
  }),
};

export const WithCustomContent: Story = {
  render: () => ({
    props: {
      value: signal('settings'),
    },
    template: `
      <ds-tabs [(value)]="value">
        <ds-tab value="profile" label="Profile">
          <div class="tw-p-4">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Profile Settings</h3>
            <p>Manage your profile information here.</p>
          </div>
        </ds-tab>
        <ds-tab value="settings" label="Settings">
          <div class="tw-p-4">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Account Settings</h3>
            <p>Configure your account preferences.</p>
          </div>
        </ds-tab>
        <ds-tab value="notifications" label="Notifications" [showBadge]="true" [badgeCount]="5">
          <div class="tw-p-4">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-2">Notification Settings</h3>
            <p>Manage your notification preferences.</p>
          </div>
        </ds-tab>
      </ds-tabs>
    `,
  }),
};