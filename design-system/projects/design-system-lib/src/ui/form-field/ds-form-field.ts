import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { NgpDescription, NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { DsLabelComponent } from '../label/ds-label';

/**
 * Available slots for content projection in DsFormField:
 * - error: Projects error content below the form field
 * - default: Default slot for form field content (no slot attribute needed)
 */
export type DsFormFieldSlots = 'error';
export type DsFormFieldLayout = 'vertical' | 'horizontal';

@Component({
  selector: 'ds-form-field',
  standalone: true,
  imports: [CommonModule, NgpFormField, NgpLabel, NgpDescription, DsLabelComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-form-field.css'],
  template: `
    <div ngpFormField [class]="containerClasses()">
      @if (label()) {
        <div [class]="labelContainerClasses()">
        @if (labelId()) {
            <ds-label ngpLabel [id]="labelId()!" [size]="layout() === 'horizontal' ? 'md' : 'sm'">
              {{ label() }}
            </ds-label>
        } @else {
            <ds-label ngpLabel [size]="layout() === 'horizontal' ? 'md' : 'sm'">
              {{ label() }}
            </ds-label>
        }
        </div>
      }
        
      <div [class]="controlContainerClasses()">
      <ng-content></ng-content>

      @if (description()) {
          <p ngpDescription [attr.id]="descriptionId()" class="ds-form-field__description">
            {{ description() }}
          </p>
      }

      <ng-content select="[slot=error]"></ng-content>
      </div>
    </div>
  `,
})
export class DsFormFieldComponent {
  label = input<string>();
  description = input<string>();
  layout = input<DsFormFieldLayout>('vertical');
  labelId = input<string | undefined>(undefined);
  descriptionId = input<string | undefined>(undefined);
  
  containerClasses = computed(() => {
    const classes = ['ds-form-field'];
    classes.push(`ds-form-field--${this.layout()}`);
    return classes.join(' ');
  });
  
  labelContainerClasses = computed(() => {
    const classes = ['ds-form-field__label'];
    classes.push(`ds-form-field__label--${this.layout()}`);
    return classes.join(' ');
  });
  
  controlContainerClasses = computed(() => {
    const classes = ['ds-form-field__control'];
    classes.push(`ds-form-field__control--${this.layout()}`);
    return classes.join(' ');
  });
}


