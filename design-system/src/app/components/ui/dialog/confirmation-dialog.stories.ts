import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsConfirmationDialogComponent } from './ds-confirmation-dialog';
import { DsButtonComponent } from '../button/ds-button';
import { DsInlineMessageComponent } from '../inline-message/ds-inline-message';
import { NgpDialogTrigger, NgpDialogOverlay, NgpDialog } from 'ng-primitives/dialog';

const meta: Meta<DsConfirmationDialogComponent> = {
  title: 'Primitives/Confirmation Dialog',
  component: DsConfirmationDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsConfirmationDialogComponent, DsButtonComponent, DsInlineMessageComponent, NgpDialogTrigger, NgpDialogOverlay, NgpDialog],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
A specialized dialog component optimized for confirmation prompts. Always uses the small (400×400) size for focused, quick decisions.

## Features

- **Fixed Small Size**: Always 400×400px for consistency in confirmation UIs
- **Pre-structured Layout**: Title, message, and action buttons built-in
- **Customizable Actions**: Configure button labels and variants
- **Accessible**: Uses \`alertdialog\` role for screen readers
- **Simple API**: Just pass title and message props

## Use Cases

- Delete confirmations
- Destructive action warnings
- Simple yes/no decisions
- Session timeout notifications
- Unsaved changes warnings
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<DsConfirmationDialogComponent>;

const DeleteConfirmationTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="destructive">Delete Item</ds-button>
      <p>Click the button to see a destructive confirmation dialog.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-confirmation-dialog 
          ngpDialog
          [title]="'Delete Item?'"
          [message]="'This action cannot be undone. Are you sure you want to delete this item?'"
          [confirmLabel]="'Delete'"
          [confirmVariant]="'destructive'"
          [cancelLabel]="'Cancel'"
          (confirm)="handleConfirm(); close()"
          (cancel)="close()">
        </ds-confirmation-dialog>
      </div>
    </ng-template>
  `,
  props: {
    handleConfirm: () => console.log('Item deleted')
  }
});

const PrimaryConfirmationTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="primary">Save Changes</ds-button>
      <p>A primary confirmation for positive actions.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-confirmation-dialog 
          ngpDialog
          [title]="'Save Changes?'"
          [message]="'Your changes will be saved and applied immediately.'"
          [confirmLabel]="'Save'"
          [confirmVariant]="'primary'"
          [cancelLabel]="'Cancel'"
          (confirm)="handleConfirm(); close()"
          (cancel)="close()">
        </ds-confirmation-dialog>
      </div>
    </ng-template>
  `,
  props: {
    handleConfirm: () => console.log('Changes saved')
  }
});

const SuccessConfirmationTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="success">Publish Article</ds-button>
      <p>A success-themed confirmation for publishing or approving actions.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-confirmation-dialog 
          ngpDialog
          [title]="'Publish Article?'"
          [message]="'This article will be visible to all users once published.'"
          [confirmLabel]="'Publish'"
          [confirmVariant]="'success'"
          [cancelLabel]="'Cancel'"
          (confirm)="handleConfirm(); close()"
          (cancel)="close()">
        </ds-confirmation-dialog>
      </div>
    </ng-template>
  `,
  props: {
    handleConfirm: () => console.log('Article published')
  }
});

const LogoutConfirmationTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="ghost">Logout</ds-button>
      <p>A logout confirmation with custom button labels.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-confirmation-dialog 
          ngpDialog
          [title]="'Logout?'"
          [message]="'Are you sure you want to logout? Any unsaved changes will be lost.'"
          [confirmLabel]="'Yes, Logout'"
          [confirmVariant]="'primary'"
          [cancelLabel]="'Stay Logged In'"
          (confirm)="handleConfirm(); close()"
          (cancel)="close()">
        </ds-confirmation-dialog>
      </div>
    </ng-template>
  `,
  props: {
    handleConfirm: () => console.log('User logged out')
  }
});

const WithAdditionalContentTemplate: Story['render'] = () => ({
  template: `
    <div style="padding: 20px;">
      <ds-button [ngpDialogTrigger]="dialog" variant="destructive">Delete Account</ds-button>
      <p>Confirmation dialog with additional warning content using ds-inline-message.</p>
    </div>

    <ng-template #dialog let-close="close">
      <div ngpDialogOverlay class="ds-overlay ds-dialog-overlay">
        <ds-confirmation-dialog 
          ngpDialog
          [title]="'Delete Account?'"
          [message]="'This action is permanent and cannot be undone.'"
          [confirmLabel]="'Delete Account'"
          [confirmVariant]="'destructive'"
          [cancelLabel]="'Keep Account'"
          (confirm)="handleConfirm(); close()"
          (cancel)="close()">
          <ds-inline-message 
            variant="error"
            title="Warning"
            class="tw-mt-4">
            <ul class="tw-list-disc tw-ml-4 tw-space-y-1">
              <li>All your data will be permanently deleted</li>
              <li>You will lose access to all subscriptions</li>
              <li>This cannot be reversed</li>
            </ul>
          </ds-inline-message>
        </ds-confirmation-dialog>
      </div>
    </ng-template>
  `,
  props: {
    handleConfirm: () => console.log('Account deleted')
  }
});

export const DeleteConfirmation: Story = {
  render: DeleteConfirmationTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Destructive confirmation dialog for delete actions. Uses red destructive button variant to emphasize the dangerous action.'
      }
    }
  }
};

export const PrimaryConfirmation: Story = {
  render: PrimaryConfirmationTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Primary confirmation dialog for positive actions like saving changes or proceeding with an operation.'
      }
    }
  }
};

export const SuccessConfirmation: Story = {
  render: SuccessConfirmationTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Success-themed confirmation for publishing, approving, or completing positive actions.'
      }
    }
  }
};

export const LogoutConfirmation: Story = {
  render: LogoutConfirmationTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Custom button labels for more specific confirmation actions. The cancel button text can be more descriptive than just "Cancel".'
      }
    }
  }
};

export const WithAdditionalContent: Story = {
  render: WithAdditionalContentTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog with ds-inline-message component for warnings, errors, or important information. The inline message uses the error variant with a list of consequences.'
      }
    }
  }
};

