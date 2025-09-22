import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { remixArrowDownSLine } from '@ng-icons/remixicon';
import { DsAccordion } from './ds-accordion';
import { DsAccordionItem } from './ds-accordion-item';

const meta: Meta<DsAccordion> = {
  title: 'Primitives/Accordion',
  component: DsAccordion,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsAccordion, DsAccordionItem, NgIcon],
      providers: [
        provideIcons({ remixArrowDownSLine })
      ]
    })
  ],
};

export default meta;
type Story = StoryObj<DsAccordion>;

export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-accordion [type]="type" [collapsible]="collapsible">
        <ds-accordion-item value="item-1" heading="What is Propbinder?">
          Propbinder is a modern property management platform that helps you manage your properties efficiently.
        </ds-accordion-item>
        <ds-accordion-item value="item-2" heading="How does it work?">
          Our platform provides tools for property listing, tenant management, maintenance tracking, and financial reporting.
        </ds-accordion-item>
        <ds-accordion-item value="item-3" heading="Is it secure?">
          Yes, we use industry-standard encryption and security practices to protect your data.
        </ds-accordion-item>
      </ds-accordion>
    `
  })
};

export const Multiple: Story = {
  args: {
    type: 'multiple'
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-accordion [type]="type">
        <ds-accordion-item value="features" heading="Key Features">
          <ul class="tw-list-disc">
            <li>Property Management</li>
            <li>Tenant Portal</li>
            <li>Maintenance Tracking</li>
            <li>Financial Reports</li>
          </ul>
        </ds-accordion-item>
        <ds-accordion-item value="pricing" heading="Pricing Plans">
          <ul class="tw-list-disc">
            <li>Basic: Free</li>
            <li>Professional: $29/month</li>
            <li>Enterprise: Custom pricing</li>
          </ul>
        </ds-accordion-item>
        <ds-accordion-item value="support" heading="Support Options">
          <ul class="tw-list-disc">
            <li>24/7 Email Support</li>
            <li>Live Chat</li>
            <li>Phone Support (Enterprise)</li>
          </ul>
        </ds-accordion-item>
      </ds-accordion>
    `
  })
};
