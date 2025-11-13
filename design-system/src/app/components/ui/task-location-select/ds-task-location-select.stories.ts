import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsTaskLocationSelectComponent, type TaskLocationData, type Property, type Lease, type Inquiry } from './ds-task-location-select';
import { DsFormFieldComponent } from '../form-field/ds-form-field';

// Sample data for drill-down navigation
const sampleProperties: Property[] = [
  { id: 'prop-1', name: 'Amagerholm' },
  { id: 'prop-2', name: 'Lindegaard' },
  { id: 'prop-3', name: 'Toftegårds Allé' },
  { id: 'prop-4', name: 'Trianglen' },
  { id: 'prop-5', name: 'Nyhavn residence' },
  { id: 'prop-6', name: 'Woods Augusthus' },
  { id: 'prop-7', name: 'Zytgloggenparken' },
];

const sampleLeases: Lease[] = [
  // Leases for Woods Augusthus
  { id: 'lease-1', name: 'EDL ApS', propertyId: 'prop-6', address: 'Else Alfelts Vej 58B 1. th.' },
  { id: 'lease-2', name: 'TechCorp', propertyId: 'prop-6', address: 'Else Alfelts Vej 58B 2. tv.' },
  { id: 'lease-3', name: 'Nordic Solutions', propertyId: 'prop-6', address: 'Else Alfelts Vej 58B 3. mf.' },
  
  // Leases for Amagerholm
  { id: 'lease-4', name: 'Design Studio', propertyId: 'prop-1', address: 'Amagerbrogade 100' },
  { id: 'lease-5', name: 'Marketing Agency', propertyId: 'prop-1', address: 'Amagerbrogade 102' },
  
  // Leases for Lindegaard
  { id: 'lease-6', name: 'Software Co', propertyId: 'prop-2', address: 'Lindegårdsvej 15' },
];

const sampleInquiries: Inquiry[] = [
  // Inquiries for EDL ApS (Woods Augusthus)
  { id: 'inq-1', title: 'Roof construction', leaseId: 'lease-1', description: 'Need repair on the roofing tiles' },
  { id: 'inq-2', title: 'HVAC Maintenance', leaseId: 'lease-1', description: 'Annual maintenance check' },
  { id: 'inq-3', title: 'Window replacement', leaseId: 'lease-1', description: 'Replace broken window in living room' },
  
  // Inquiries for TechCorp (Woods Augusthus)
  { id: 'inq-4', title: 'Plumbing issue', leaseId: 'lease-2', description: 'Leaking pipe in bathroom' },
  { id: 'inq-5', title: 'Electrical work', leaseId: 'lease-2', description: 'Install additional outlets' },
  
  // Inquiries for Design Studio (Amagerholm)
  { id: 'inq-6', title: 'Flooring replacement', leaseId: 'lease-4', description: 'Replace worn carpet' },
  { id: 'inq-7', title: 'Paint job', leaseId: 'lease-4', description: 'Repaint office walls' },
];

const sampleLocationData: TaskLocationData = {
  properties: sampleProperties,
  leases: sampleLeases,
  inquiries: sampleInquiries,
};

const meta: Meta<DsTaskLocationSelectComponent> = {
  title: 'Global/Task Location Select',
  component: DsTaskLocationSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DsTaskLocationSelectComponent,
        DsFormFieldComponent,
        FormsModule,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success']
    },
    disabled: { control: 'boolean' },
    ghost: { control: 'boolean' },
    created: { control: 'boolean' },
  },
  args: {
    locationData: sampleLocationData,
    placeholder: 'Select location',
    variant: 'default',
    disabled: false,
    ghost: false,
    created: false,
  },
};

export default meta;
type Story = StoryObj<DsTaskLocationSelectComponent>;

export const DrillDownDefault: Story = {
  name: 'Drill-Down Navigation',
  render: (args) => ({
    props: {
      ...args,
      onValueChange: (value: any) => {
        console.log('Selected location:', value);
      }
    },
    template: `
      <div style="width: 400px;">
        <ds-task-location-select
          [locationData]="locationData"
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [ghost]="ghost"
          [created]="created"
          (valueChange)="onValueChange($event)">
        </ds-task-location-select>
        
        <div style="margin-top: 16px; padding: 12px; background: var(--color-background-neutral-secondary); border-radius: 6px; font-size: 12px;">
          <strong>Instructions:</strong>
          <ol style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>Click to select a property</li>
            <li>Select a lease within that property</li>
            <li>Select an inquiry for that lease</li>
            <li>Use the back button (←) to navigate backwards</li>
          </ol>
        </div>
      </div>
    `,
  }),
};

export const WithSelectedValue: Story = {
  name: 'Pre-selected Value',
  render: (args) => ({
    props: {
      ...args,
      location: {
        type: 'inquiry',
        id: 'inq-1',
        name: 'Roof construction',
        propertyId: 'prop-6',
        leaseId: 'lease-1',
        inquiryId: 'inq-1'
      },
    },
    template: `
      <div style="width: 400px;">
        <ds-task-location-select
          [locationData]="locationData"
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [ghost]="ghost"
          [created]="false"
          [(ngModel)]="location">
        </ds-task-location-select>
        
        <div style="margin-top: 16px; padding: 12px; background: var(--color-background-neutral-secondary); border-radius: 6px; font-size: 12px;">
          <strong>Selected:</strong> {{ location?.name || 'None' }}
        </div>
      </div>
    `,
  }),
};

export const CreatedState: Story = {
  name: 'After Task Created',
  args: {
    created: true,
  },
  render: (args) => ({
    props: {
      ...args,
      location: {
        type: 'inquiry',
        id: 'inq-1',
        name: 'Roof construction',
        propertyId: 'prop-6',
        leaseId: 'lease-1',
        inquiryId: 'inq-1'
      },
  },
    template: `
      <div style="width: 480px;">
        <ds-task-location-select
          [locationData]="locationData"
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="disabled"
          [ghost]="ghost"
          [created]="true"
          [(ngModel)]="location">
        </ds-task-location-select>
        
        <div style="margin-top: 16px; padding: 12px; background: var(--color-background-neutral-secondary); border-radius: 6px; font-size: 12px;">
          <strong>Note:</strong> In created state, the component shows the icon and ID badge. Click the ID badge to copy it!
        </div>
      </div>
    `,
  }),
};

export const InFormField: Story = {
  name: 'In Form Field (Horizontal)',
  render: (args) => ({
    props: {
      ...args,
      location: null,
    },
    template: `
      <div style="width: 600px;">
        <ds-form-field label="Location" layout="horizontal">
          <ds-task-location-select
            [locationData]="locationData"
            [placeholder]="'Select location'"
            [(ngModel)]="location">
          </ds-task-location-select>
        </ds-form-field>
        
        <div style="margin-top: 16px; padding: 12px; background: var(--color-background-neutral-secondary); border-radius: 6px; font-size: 12px;">
          <strong>Perfect for inline editing!</strong> Try the drill-down flow in a form context.
        </div>
      </div>
    `,
  }),
};

export const GhostMode: Story = {
  name: 'Ghost Mode',
  args: {
    ghost: true,
  },
  render: (args) => ({
    props: {
      ...args,
      location: {
        type: 'inquiry',
        id: 'inq-1',
        name: 'Roof construction',
        propertyId: 'prop-6',
        leaseId: 'lease-1',
        inquiryId: 'inq-1'
      },
  },
    template: `
      <div style="width: 480px;">
        <ds-form-field label="Location" layout="horizontal">
          <ds-task-location-select
            [locationData]="locationData"
            [placeholder]="'Select location'"
            [ghost]="true"
            [(ngModel)]="location">
          </ds-task-location-select>
        </ds-form-field>
        
        <div style="margin-top: 16px; padding: 12px; background: var(--color-background-neutral-secondary); border-radius: 6px; font-size: 12px;">
          <strong>Ghost mode:</strong> Transparent until hover - perfect for inline editing!
        </div>
      </div>
    `,
  }),
};

export const DisabledState: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: {
      ...args,
      location: {
        type: 'inquiry',
        id: 'inq-1',
        name: 'Roof construction',
        propertyId: 'prop-6',
        leaseId: 'lease-1',
        inquiryId: 'inq-1'
      },
  },
    template: `
      <div style="width: 400px;">
        <ds-task-location-select
          [locationData]="locationData"
          [placeholder]="placeholder"
          [variant]="variant"
          [disabled]="true"
          [(ngModel)]="location">
        </ds-task-location-select>
      </div>
    `,
  }),
};

export const ErrorState: Story = {
  name: 'Error Variant',
  args: {
    variant: 'error',
  },
  render: (args) => ({
    props: {
      ...args,
      location: null,
  },
    template: `
      <div style="width: 400px;">
        <ds-task-location-select
          [locationData]="locationData"
          [placeholder]="'Location is required'"
          [variant]="'error'"
          [(ngModel)]="location">
        </ds-task-location-select>
        
        <div style="margin-top: 8px; color: var(--color-destructive-base); font-size: 12px;">
          Please select a location
        </div>
      </div>
    `,
  }),
};

export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: (args) => ({
    props: {
      ...args,
      location1: null,
      location2: {
        type: 'inquiry',
        id: 'inq-1',
        name: 'Roof construction',
        propertyId: 'prop-6',
        leaseId: 'lease-1',
        inquiryId: 'inq-1'
      },
    },
    template: `
      <div style="width: 600px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">During Task Creation</h3>
          <ds-task-location-select
          [locationData]="locationData"
          [placeholder]="'Select location'"
            [created]="false"
          [(ngModel)]="location1">
        </ds-task-location-select>
        
        <div style="margin: 16px 0; padding: 12px; background: var(--color-background-neutral-secondary); border-radius: 6px; font-size: 13px;">
          <strong>Selected:</strong> {{ location1?.name || 'None' }}
        </div>
        
        <hr style="margin: 24px 0; border: none; border-top: 1px solid var(--border-color-default);" />
        
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">After Task Created</h3>
          <ds-task-location-select
          [locationData]="locationData"
          [placeholder]="'Select location'"
            [created]="true"
          [(ngModel)]="location2">
        </ds-task-location-select>
        
        <div style="margin: 16px 0; padding: 12px; background: var(--color-background-neutral-secondary); border-radius: 6px; font-size: 13px;">
          <strong>Try clicking the ID badge to copy it!</strong>
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    props: {
      locationData: sampleLocationData,
      location: {
        type: 'inquiry',
        id: 'inq-1',
        name: 'Roof construction',
        propertyId: 'prop-6',
        leaseId: 'lease-1',
        inquiryId: 'inq-1'
      },
    },
    template: `
      <div style="width: 600px; display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: var(--text-color-default-secondary);">
            DEFAULT
          </div>
          <ds-task-location-select
            [locationData]="locationData"
            [placeholder]="'Select location'"
            [variant]="'default'"
            [(ngModel)]="location">
          </ds-task-location-select>
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: var(--text-color-default-secondary);">
            ERROR
          </div>
          <ds-task-location-select
            [locationData]="locationData"
            [placeholder]="'Select location'"
            [variant]="'error'"
            [(ngModel)]="location">
          </ds-task-location-select>
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: var(--text-color-default-secondary);">
            WARNING
          </div>
          <ds-task-location-select
            [locationData]="locationData"
            [placeholder]="'Select location'"
            [variant]="'warning'"
            [(ngModel)]="location">
          </ds-task-location-select>
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: var(--text-color-default-secondary);">
            SUCCESS
          </div>
          <ds-task-location-select
            [locationData]="locationData"
            [placeholder]="'Select location'"
            [variant]="'success'"
            [(ngModel)]="location">
          </ds-task-location-select>
        </div>
      </div>
    `,
  }),
};
