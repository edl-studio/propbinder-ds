import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsDialogComponent } from './ds-dialog';
import { DsButtonComponent } from '../button/ds-button';
import { DsInputComponent } from '../input/ds-input';
import { DsFormFieldComponent } from '../form-field/ds-form-field';
import { NgpDialogTrigger, NgpDialogOverlay, NgpDialog } from 'ng-primitives/dialog';

const meta: Meta<DsDialogComponent> = {
  title: 'Primitives/Dialog',
  component: DsDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsDialogComponent, DsButtonComponent, DsInputComponent, DsFormFieldComponent, NgpDialogTrigger, NgpDialogOverlay, NgpDialog],
    }),
  ],
};

export default meta;
type Story = StoryObj<DsDialogComponent>;

const BasicDialogTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="primary">Open Dialog</ds-button>
      <p>This is the main page content. When you open the dialog, it should overlay this content with a semi-transparent background.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-dialog ngpDialog>
          <h2 slot="header" class="heading-xl">Confirmation</h2>
          <div slot="content">
            <p class="tw-text-neutral-700 tw-mb-4">Are you sure you want to perform this action? This cannot be undone.</p>
            <p class="tw-text-neutral-600">Click confirm to proceed or cancel to go back.</p>
          </div>
          <div slot="footer">
            <ds-button variant="ghost" (click)="close()">Cancel</ds-button>
            <ds-button variant="primary" (click)="close()">Confirm</ds-button>
          </div>
        </ds-dialog>
      </div>
    </ng-template>
  `
});

const FormDialogTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="primary">Open Form Dialog</ds-button>
      <p>This dialog contains a form for editing user profile information.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-dialog ngpDialog>
          <h2 slot="header" class="heading-xl">Edit Profile</h2>
          <div slot="content">
            <form (submit)="$event.preventDefault(); close()">
              <ds-form-field label="Name">
                <ds-input id="name" type="text" placeholder="Enter your name" />
              </ds-form-field>
              <ds-form-field label="Email">
                <ds-input id="email" type="email" placeholder="Enter your email" />
              </ds-form-field>
            </form>
          </div>
          <div slot="footer">
            <ds-button variant="ghost" type="button" (click)="close()">Cancel</ds-button>
            <ds-button variant="primary" type="submit" (click)="close()">Save Changes</ds-button>
          </div>
        </ds-dialog>
      </div>
    </ng-template>
  `
});

const AlertDialogTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="primary">Open Alert Dialog</ds-button>
      <p>This dialog shows a warning message about session expiration.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-dialog ngpDialog>
          <h2 slot="header" class="heading-xl tw-text-red-600">Warning</h2>
          <div slot="content">
            <p class="tw-text-neutral-700 tw-mb-4">Your session is about to expire in 5 minutes.</p>
            <p class="tw-text-neutral-600">Would you like to extend it?</p>
          </div>
          <div slot="footer">
            <ds-button variant="ghost" (click)="close()">Logout</ds-button>
            <ds-button variant="primary" (click)="close()">Extend Session</ds-button>
          </div>
        </ds-dialog>
      </div>
    </ng-template>
  `
});

export const BasicDialog: Story = {
  render: BasicDialogTemplate
};

export const FormDialog: Story = {
  render: FormDialogTemplate
};

export const AlertDialog: Story = {
  render: AlertDialogTemplate
};

// Size Variations

const SmallDialogTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="primary">Open Small Dialog (400×400)</ds-button>
      <p>Small dialogs are perfect for quick confirmations and simple prompts.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-dialog ngpDialog [size]="'sm'">
          <h2 slot="header" class="heading-xl">Delete Item?</h2>
          <div slot="content">
            <p class="tw-text-neutral-700">This action cannot be undone. Are you sure?</p>
          </div>
          <div slot="footer">
            <ds-button variant="ghost" (click)="close()">Cancel</ds-button>
            <ds-button variant="destructive" (click)="close()">Delete</ds-button>
          </div>
        </ds-dialog>
      </div>
    </ng-template>
  `
});

const MediumDialogTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="primary">Open Medium Dialog (480×600)</ds-button>
      <p>Medium dialogs (default) are ideal for standard forms with 5-8 fields.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-dialog ngpDialog [size]="'md'">
          <h2 slot="header" class="heading-xl">Add Customer</h2>
          <div slot="content">
            <form (submit)="$event.preventDefault(); close()">
              <ds-form-field label="Full Name">
                <ds-input id="name" type="text" placeholder="John Doe" />
              </ds-form-field>
              <ds-form-field label="Email Address">
                <ds-input id="email" type="email" placeholder="john@example.com" />
              </ds-form-field>
              <ds-form-field label="Phone Number">
                <ds-input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </ds-form-field>
              <ds-form-field label="Company">
                <ds-input id="company" type="text" placeholder="Acme Inc." />
              </ds-form-field>
              <ds-form-field label="Address">
                <ds-input id="address" type="text" placeholder="123 Main St" />
              </ds-form-field>
            </form>
          </div>
          <div slot="footer">
            <ds-button variant="ghost" type="button" (click)="close()">Cancel</ds-button>
            <ds-button variant="primary" type="submit" (click)="close()">Add Customer</ds-button>
          </div>
        </ds-dialog>
      </div>
    </ng-template>
  `
});

const LargeDialogTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="primary">Open Large Dialog (600×700)</ds-button>
      <p>Large dialogs provide more space for complex forms with multiple sections.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-dialog ngpDialog [size]="'lg'">
          <h2 slot="header" class="heading-xl">Project Details</h2>
          <div slot="content">
            <form (submit)="$event.preventDefault(); close()">
              <h3 class="tw-font-semibold tw-mb-2 tw-text-neutral-900">Basic Information</h3>
              <ds-form-field label="Project Name">
                <ds-input id="project-name" type="text" placeholder="Q4 Marketing Campaign" />
              </ds-form-field>
              <ds-form-field label="Description">
                <ds-input id="description" type="text" placeholder="Brief project description" />
              </ds-form-field>
              
              <h3 class="tw-font-semibold tw-mb-2 tw-mt-4 tw-text-neutral-900">Timeline</h3>
              <ds-form-field label="Start Date">
                <ds-input id="start-date" type="date" />
              </ds-form-field>
              <ds-form-field label="End Date">
                <ds-input id="end-date" type="date" />
              </ds-form-field>
              
              <h3 class="tw-font-semibold tw-mb-2 tw-mt-4 tw-text-neutral-900">Team</h3>
              <ds-form-field label="Project Manager">
                <ds-input id="manager" type="text" placeholder="Select manager" />
              </ds-form-field>
              <ds-form-field label="Team Members">
                <ds-input id="members" type="text" placeholder="Add team members" />
              </ds-form-field>
              <ds-form-field label="Budget">
                <ds-input id="budget" type="text" placeholder="$50,000" />
              </ds-form-field>
            </form>
          </div>
          <div slot="footer">
            <ds-button variant="ghost" type="button" (click)="close()">Cancel</ds-button>
            <ds-button variant="primary" type="submit" (click)="close()">Create Project</ds-button>
          </div>
        </ds-dialog>
      </div>
    </ng-template>
  `
});

const ExtraLargeDialogTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="primary">Open Extra Large Dialog (768×800)</ds-button>
      <p>Extra large dialogs are suitable for rich content like data tables or complex interfaces with 2-column layouts.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-dialog ngpDialog [size]="'xl'">
          <h2 slot="header" class="heading-xl">Full Application Form</h2>
          <div slot="content">
            <form (submit)="$event.preventDefault(); close()" style="display: contents;">
              <h3 class="tw-font-semibold tw-mb-2 tw-text-neutral-900 tw-col-span-2">Personal Information</h3>
              <div class="tw-grid tw-grid-cols-2 tw-gap-4">
                <ds-form-field label="First Name">
                  <ds-input id="first-name" type="text" placeholder="John" />
                </ds-form-field>
                <ds-form-field label="Last Name">
                  <ds-input id="last-name" type="text" placeholder="Doe" />
                </ds-form-field>
                <ds-form-field label="Email Address">
                  <ds-input id="email-xl" type="email" placeholder="john@example.com" />
                </ds-form-field>
                <ds-form-field label="Phone Number">
                  <ds-input id="phone-xl" type="tel" placeholder="+1 (555) 000-0000" />
                </ds-form-field>
              </div>
              
              <h3 class="tw-font-semibold tw-mb-2 tw-mt-4 tw-text-neutral-900">Address</h3>
              <div class="tw-grid tw-grid-cols-2 tw-gap-4">
                <ds-form-field label="Street Address" class="tw-col-span-2">
                  <ds-input id="street" type="text" placeholder="123 Main St" />
                </ds-form-field>
                <ds-form-field label="City">
                  <ds-input id="city" type="text" placeholder="New York" />
                </ds-form-field>
                <ds-form-field label="State/Province">
                  <ds-input id="state" type="text" placeholder="NY" />
                </ds-form-field>
                <ds-form-field label="Postal Code">
                  <ds-input id="postal" type="text" placeholder="10001" />
                </ds-form-field>
                <ds-form-field label="Country">
                  <ds-input id="country" type="text" placeholder="United States" />
                </ds-form-field>
              </div>
              
              <h3 class="tw-font-semibold tw-mb-2 tw-mt-4 tw-text-neutral-900">Employment</h3>
              <div class="tw-grid tw-grid-cols-2 tw-gap-4">
                <ds-form-field label="Company Name">
                  <ds-input id="company-xl" type="text" placeholder="Acme Inc." />
                </ds-form-field>
                <ds-form-field label="Job Title">
                  <ds-input id="job-title" type="text" placeholder="Senior Developer" />
                </ds-form-field>
                <ds-form-field label="Years of Experience">
                  <ds-input id="experience" type="number" placeholder="5" />
                </ds-form-field>
                <ds-form-field label="Department">
                  <ds-input id="department" type="text" placeholder="Engineering" />
                </ds-form-field>
              </div>
              
              <h3 class="tw-font-semibold tw-mb-2 tw-mt-4 tw-text-neutral-900">Additional Information</h3>
              <div class="tw-grid tw-grid-cols-2 tw-gap-4">
                <ds-form-field label="LinkedIn Profile">
                  <ds-input id="linkedin" type="url" placeholder="https://linkedin.com/in/johndoe" />
                </ds-form-field>
                <ds-form-field label="Portfolio URL">
                  <ds-input id="portfolio" type="url" placeholder="https://johndoe.com" />
                </ds-form-field>
                <ds-form-field label="GitHub Profile">
                  <ds-input id="github" type="url" placeholder="https://github.com/johndoe" />
                </ds-form-field>
                <ds-form-field label="Twitter/X Handle">
                  <ds-input id="twitter" type="text" placeholder="@johndoe" />
                </ds-form-field>
              </div>
            </form>
          </div>
          <div slot="footer">
            <ds-button variant="ghost" type="button" (click)="close()">Cancel</ds-button>
            <ds-button variant="primary" type="submit" (click)="close()">Submit Application</ds-button>
          </div>
        </ds-dialog>
      </div>
    </ng-template>
  `
});

export const SmallDialog: Story = {
  render: SmallDialogTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Small dialog (400×400px) - Perfect for quick confirmations and simple prompts.'
      }
    }
  }
};

export const MediumDialog: Story = {
  render: MediumDialogTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Medium dialog (480×600px) - Default size, ideal for standard forms with 5-8 fields. Matches drawer width for consistency.'
      }
    }
  }
};

export const LargeDialog: Story = {
  render: LargeDialogTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Large dialog (600×700px) - Provides more space for complex forms with multiple sections.'
      }
    }
  }
};

export const ExtraLargeDialog: Story = {
  render: ExtraLargeDialogTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Extra large dialog (768×800px) - Suitable for rich content like data tables or extensive forms.'
      }
    }
  }
};