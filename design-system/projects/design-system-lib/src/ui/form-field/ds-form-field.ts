import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, input } from '@angular/core';
import { NgpDescription, NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { DsLabelComponent } from '../label/ds-label';

/**
 * Available slots for content projection in DsFormField:
 * - error: Projects error content below the form field
 * - default: Default slot for form field content (no slot attribute needed)
 */
export type DsFormFieldSlots = 'error';

@Component({
  selector: 'ds-form-field',
  standalone: true,
  imports: [CommonModule, NgpFormField, NgpLabel, NgpDescription, DsLabelComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-form-field.css'],
  template: `
    <div ngpFormField class="ds-form-field">
      @if (label()) {
        @if (labelId()) {
          <ds-label ngpLabel [id]="labelId()!">{{ label() }}</ds-label>
        } @else {
          <ds-label ngpLabel>{{ label() }}</ds-label>
        }
      }
        

      <ng-content></ng-content>

      @if (description()) {
        <p ngpDescription [attr.id]="descriptionId()" class="ds-form-field__description">{{ description() }}</p>
      }

      <ng-content select="[slot=error]"></ng-content>
    </div>
  `,
})
export class DsFormFieldComponent {
  label = input<string>();
  description = input<string>();
  labelId = input<string | undefined>(undefined);
  descriptionId = input<string | undefined>(undefined);
}


