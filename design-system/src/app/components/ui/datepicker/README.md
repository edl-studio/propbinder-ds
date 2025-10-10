# Datepicker Component

A fully accessible datepicker component built on [Angular Primitives](https://angularprimitives.com/primitives/date-picker), following WAI-ARIA design patterns.

## Features

- ✅ **Fully Accessible**: Adheres to WAI-ARIA design patterns with comprehensive keyboard navigation
- ✅ **Reactive Forms**: Full support for Angular Reactive Forms with `ControlValueAccessor`
- ✅ **Variants**: Supports default, error, warning, and success states
- ✅ **Customizable**: Configure first day of week (Sunday or Monday start)
- ✅ **Today Indicator**: Highlights the current date
- ✅ **Disabled State**: Support for disabled dates and entire datepicker
- ✅ **Design System Integration**: Uses design system tokens for consistent styling

## Basic Usage

```typescript
import { DsDatepickerComponent } from './components/ui/datepicker';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [DsDatepickerComponent],
  template: `
    <ds-datepicker [(ngModel)]="selectedDate" />
  `
})
export class MyComponent {
  selectedDate: Date | null = new Date();
}
```

## With Reactive Forms

```typescript
import { DsDatepickerComponent } from './components/ui/datepicker';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [DsDatepickerComponent, ReactiveFormsModule],
  template: `
    <ds-datepicker [formControl]="dateControl" />
  `
})
export class MyComponent {
  dateControl = new FormControl(new Date());
}
```

## With Form Field

```typescript
import { DsDatepickerComponent } from './components/ui/datepicker';
import { DsFormFieldComponent } from './components/ui/form-field';

@Component({
  selector: 'my-component',
  standalone: true,
  imports: [DsDatepickerComponent, DsFormFieldComponent, ReactiveFormsModule],
  template: `
    <ds-form-field 
      label="Birth Date" 
      [required]="true"
      helperText="Select your date of birth"
      [error]="dateControl.invalid ? 'Please select a valid date' : undefined">
      <ds-datepicker [formControl]="dateControl" />
    </ds-form-field>
  `
})
export class MyComponent {
  dateControl = new FormControl(null);
}
```

## API

### Inputs

| Input            | Type                                          | Default     | Description                                                          |
| ---------------- | --------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| `variant`        | `'default' \| 'error' \| 'warning' \| 'success'` | `'default'` | Visual variant of the datepicker                                     |
| `disabled`       | `boolean`                                     | `false`     | Whether the datepicker is disabled                                   |
| `placeholder`    | `string`                                      | `'Select date'` | Placeholder text                                                 |
| `ariaLabel`      | `string`                                      | -           | Accessible label for screen readers                                  |
| `ariaDescribedBy`| `string`                                      | -           | ID of element that describes the datepicker                          |
| `disableFutureDates` | `boolean`                                 | `false`     | When true, disables all dates after today                            |
| `isDateDisabled` | `(date: Date) => boolean`                     | -           | Advanced: Custom function to determine if a date should be disabled  |

### Outputs

| Output       | Type                    | Description                           |
| ------------ | ----------------------- | ------------------------------------- |
| `dateChange` | `EventEmitter<Date \| null>` | Emitted when the selected date changes |

## Variants

```html
<!-- Default -->
<ds-datepicker variant="default" />

<!-- Error state -->
<ds-datepicker variant="error" />

<!-- Warning state -->
<ds-datepicker variant="warning" />

<!-- Success state -->
<ds-datepicker variant="success" />
```

## Week Start

The datepicker always starts the week on Monday, following the international standard (ISO 8601).

## Disabling Future Dates

For the common use case of disabling future dates (e.g., for expense reports or historical records), simply use the `disableFutureDates` property:

```html
<!-- Only allow today and past dates -->
<ds-datepicker [disableFutureDates]="true" />
```

## Advanced: Custom Date Disabling

For more complex scenarios (weekends, holidays, etc.), you can provide a custom `isDateDisabled` function. This works alongside `disableFutureDates` - both conditions will be checked.

### Example: Disable Weekends

```typescript
isDateDisabled = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};
```

### Example: Disable Specific Dates

```typescript
isDateDisabled = (date: Date): boolean => {
  const holidays = [
    new Date('2024-12-25'),
    new Date('2024-01-01'),
  ];
  return holidays.some(holiday => 
    holiday.toDateString() === date.toDateString()
  );
};
```

## Keyboard Navigation

The datepicker supports comprehensive keyboard navigation:

- **Space / Enter**: Select the focused date
- **Arrow Up**: Move focus to the same day of the previous week
- **Arrow Down**: Move focus to the same day of the next week
- **Arrow Left**: Move focus to the previous day
- **Arrow Right**: Move focus to the next day
- **Home**: Move focus to the first day of the month
- **End**: Move focus to the last day of the month
- **Page Up**: Move focus to the same date in the previous month
- **Page Down**: Move focus to the same date in the next month

## Accessibility

- Adheres to WAI-ARIA design patterns
- Full keyboard navigation support
- ARIA attributes for screen readers
- Focus management and indicators
- Disabled state handling

## Styling

The component uses design system CSS custom properties for theming:

- `--color-brand-base`: Selected date background
- `--color-brand-hover`: Selected date hover state
- `--text-color-default-primary`: Primary text color
- `--text-color-default-secondary`: Secondary text color
- `--color-background-neutral-primary-hover`: Hover background
- Variant colors for error, warning, and success states

## Future Enhancements

- Date range picker support (infrastructure already in place)
- Min/max date constraints
- Custom date formatters
- Date library adapters (Luxon, Day.js, etc.)
- Custom disabled dates
- Multiple month views

