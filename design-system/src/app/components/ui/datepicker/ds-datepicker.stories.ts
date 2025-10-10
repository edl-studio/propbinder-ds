import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { DsDatepickerComponent } from './ds-datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';
import { DsFormFieldComponent } from '../form-field/ds-form-field';
import { DsButtonComponent } from '../button/ds-button';
import { DsInputComponent } from '../input/ds-input';
import { provideIcons } from '@ng-icons/core';
import { 
  remixArrowLeftSLine,
  remixArrowRightSLine,
  remixCloseLine,
  remixCalendarLine,
} from '@ng-icons/remixicon';

const meta: Meta<DsDatepickerComponent> = {
  title: 'Components/Datepicker',
  component: DsDatepickerComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideIcons({
          remixArrowLeftSLine,
          remixArrowRightSLine,
          remixCloseLine,
          remixCalendarLine,
        }),
      ],
    }),
    moduleMetadata({
      imports: [
        DsDatepickerComponent, 
        ReactiveFormsModule,
        FormsModule,
        DsFormFieldComponent, 
        DsButtonComponent,
        DsInputComponent,
      ],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success'],
      description: 'Visual variant of the datepicker calendar',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the datepicker is disabled',
    },
    disableFutureDates: {
      control: 'boolean',
      description: 'When true, disables all dates after today',
    },
    isDateDisabled: {
      control: false,
      description: 'Advanced: Custom function to determine if a specific date should be disabled. Return true to disable the date.',
      table: {
        type: { summary: '(date: Date) => boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsDatepickerComponent>;

export const Default: Story = {
  render: (args) => ({
    template: `
      <ds-datepicker [variant]="variant" [disabled]="disabled">
        <ds-button variant="secondary" iconLeft="remixCalendarLine">
          Select Date
        </ds-button>
      </ds-datepicker>
    `,
    props: args,
  }),
  args: {
    variant: 'default',
    disabled: false,
  },
};

export const WithInputTrigger: Story = {
  render: () => {
    @Component({
      selector: 'datepicker-with-input',
      standalone: true,
      imports: [DsDatepickerComponent, DsInputComponent, FormsModule],
      template: `
        <ds-datepicker (dateChange)="onDateChange($event)">
            <ds-input 
              [ngModel]="selectedDate() ? selectedDate()!.toLocaleDateString() : ''" 
              placeholder="Select date"
              [readonly]="true"
              iconRight="remixCalendarLine" />
        </ds-datepicker>
        <p class="body-sm-regular tw-mt-4">Selected: {{ selectedDate() ? selectedDate()!.toLocaleDateString() : 'None' }}</p>
      `,
    })
    class DatepickerWithInput {
      selectedDate = signal<Date | null>(null);
      
      onDateChange(date: Date | null) {
        this.selectedDate.set(date);
      }
    }

    return {
      component: DatepickerWithInput,
      props: {},
    };
  },
};


export const Disabled: Story = {
  render: () => ({
    template: `
      <ds-datepicker [disabled]="true">
        <ds-button variant="secondary" iconLeft="remixCalendarLine">
          Select Date
        </ds-button>
      </ds-datepicker>
    `,
  }),
};

export const ErrorVariant: Story = {
  render: () => ({
    template: `
      <ds-datepicker variant="error">
        <ds-button variant="destructive" iconLeft="remixCalendarLine">
          Select Date
        </ds-button>
      </ds-datepicker>
    `,
  }),
};

export const WarningVariant: Story = {
  render: () => ({
    template: `
      <ds-datepicker variant="warning">
        <ds-button variant="secondary" iconLeft="remixCalendarLine">
          Select Date
        </ds-button>
      </ds-datepicker>
    `,
  }),
};

export const SuccessVariant: Story = {
  render: () => ({
    template: `
      <ds-datepicker variant="success">
        <ds-button variant="secondary" iconLeft="remixCalendarLine">
          Select Date
        </ds-button>
      </ds-datepicker>
    `,
  }),
};

export const PastAndCurrentDatesOnly: Story = {
  render: () => ({
    template: `
      <ds-datepicker [disableFutureDates]="true">
        <ds-button variant="secondary" iconLeft="remixCalendarLine">
          Select Past Date
        </ds-button>
      </ds-datepicker>
      <p class="body-sm-regular tw-mt-2 tw-text-gray-600">Future dates are disabled</p>
    `,
  }),
};

export const WithReactiveForms: Story = {
  decorators: [
    moduleMetadata({
      imports: [DsDatepickerComponent, DsInputComponent, ReactiveFormsModule, FormsModule],
    }),
  ],
  render: () => {
    @Component({
      selector: 'datepicker-form-example',
      standalone: true,
      imports: [DsDatepickerComponent, DsInputComponent, ReactiveFormsModule, FormsModule],
      template: `
        <form>
          <ds-datepicker [formControl]="dateControl">
            <ds-input 
              [ngModel]="dateControl.value ? dateControl.value.toLocaleDateString() : ''" 
              placeholder="Select date"
              [readonly]="true"
              iconRight="remixCalendarLine" />
          </ds-datepicker>
          <p class="body-sm-regular tw-mt-4">
            Form Value: {{ dateControl.value ? dateControl.value.toLocaleDateString() : 'None' }}
          </p>
          <p class="body-sm-regular">Valid: {{ dateControl.valid }}</p>
        </form>
      `,
    })
    class DatepickerFormExample {
      dateControl = new FormControl(new Date());
    }

    return {
      component: DatepickerFormExample,
      props: {},
    };
  },
};

export const WithFormField: Story = {
  decorators: [
    moduleMetadata({
      imports: [DsDatepickerComponent, DsFormFieldComponent, DsInputComponent, ReactiveFormsModule, FormsModule],
    }),
  ],
  render: () => {
    @Component({
      selector: 'datepicker-with-form-field',
      standalone: true,
      imports: [DsDatepickerComponent, DsFormFieldComponent, DsInputComponent, ReactiveFormsModule, FormsModule],
      template: `
        <ds-form-field 
          label="Birth Date" 
          description="Select your date of birth">
          <ds-datepicker [formControl]="dateControl" [disableFutureDates]="true">
            <ds-input 
              [ngModel]="dateControl.value ? dateControl.value.toLocaleDateString() : ''" 
              placeholder="Select your birth date"
              [readonly]="true"
              [required]="true"
              iconRight="remixCalendarLine" />
          </ds-datepicker>
          @if (dateControl.invalid && dateControl.touched) {
            <p slot="error" class="ds-form-field__error">Please select a valid date</p>
          }
        </ds-form-field>
      `,
    })
    class DatepickerWithFormField {
      dateControl = new FormControl<Date | null>(null);
    }

    return {
      component: DatepickerWithFormField,
      props: {},
    };
  },
};

export const Interactive: Story = {
  decorators: [
    moduleMetadata({
      imports: [DsDatepickerComponent, DsButtonComponent, ReactiveFormsModule],
    }),
  ],
  render: () => {
    @Component({
      selector: 'datepicker-interactive',
      standalone: true,
      imports: [DsDatepickerComponent, DsButtonComponent, ReactiveFormsModule],
      template: `
        <div class="tw-space-y-4">
          <ds-datepicker 
            [variant]="variant()" 
            [disabled]="disabled()"
            (dateChange)="onDateChange($event)">
            <ds-button variant="secondary" iconLeft="remixCalendarLine">
              {{ selectedDate() ? selectedDate()!.toLocaleDateString() : 'Select Date' }}
            </ds-button>
          </ds-datepicker>
          
          <div class="tw-flex tw-gap-2">
            <button 
              class="tw-px-3 tw-py-1 tw-rounded tw-border"
              (click)="variant.set('default')">
              Default
            </button>
            <button 
              class="tw-px-3 tw-py-1 tw-rounded tw-border"
              (click)="variant.set('error')">
              Error
            </button>
            <button 
              class="tw-px-3 tw-py-1 tw-rounded tw-border"
              (click)="variant.set('warning')">
              Warning
            </button>
            <button 
              class="tw-px-3 tw-py-1 tw-rounded tw-border"
              (click)="variant.set('success')">
              Success
            </button>
          </div>
          
          <div class="tw-flex tw-gap-2">
            <button 
              class="tw-px-3 tw-py-1 tw-rounded tw-border"
              (click)="disabled.set(!disabled())">
              Toggle Disabled ({{ disabled() ? 'Currently Disabled' : 'Currently Enabled' }})
            </button>
          </div>
          
          <p class="body-sm-regular">Selected: {{ selectedDate() ? selectedDate()!.toLocaleDateString() : 'None' }}</p>
        </div>
      `,
    })
    class DatepickerInteractive {
      variant = signal<'default' | 'error' | 'warning' | 'success'>('default');
      disabled = signal(false);
      selectedDate = signal<Date | null>(null);
      
      onDateChange(date: Date | null) {
        this.selectedDate.set(date);
      }
    }

    return {
      component: DatepickerInteractive,
      props: {},
    };
  },
};

