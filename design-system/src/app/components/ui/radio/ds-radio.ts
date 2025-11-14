import { Component, ViewEncapsulation, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgpRadioItem, NgpRadioIndicator } from 'ng-primitives/radio';
import { DsLabelComponent } from '../label/ds-label';

export type RadioVariant = 'default' | 'error' | 'warning' | 'success';
export type RadioSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-radio',
  standalone: true,
  imports: [CommonModule, NgpRadioItem, NgpRadioIndicator, DsLabelComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-radio.css'],
  template: `
    <div [class]="containerClasses()">
      <button 
        ngpRadioItem 
        [ngpRadioItemValue]="value()"
        [attr.disabled]="disabled() ? '' : null"
        [class]="radioClasses()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-describedby]="ariaDescribedBy()"
        [attr.aria-labelledby]="ariaLabelledBy()"
        [attr.aria-invalid]="variant() === 'error' ? 'true' : null"
      >
        <span ngpRadioIndicator [class]="indicatorClasses()"></span>
      </button>
      
      @if (showLabel()) {
        <ds-label 
          [for]="radioId()" 
          [class]="labelClasses()"
        >
          {{ label() }}
        </ds-label>
      }
    </div>
  `,
})
export class DsRadioComponent {
  // Inputs
  variant = input<RadioVariant>('default');
  size = input<RadioSize>('md');
  label = input<string>('');
  showLabel = input<boolean>(true);
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  value = input.required<string>();
  radioId = input<string>();
  ariaLabel = input<string>();
  ariaDescribedBy = input<string>();
  ariaLabelledBy = input<string>();

  // Outputs
  valueChange = output<string>();

  containerClasses = computed(() => {
    const classes = ['radio-container', `radio-container--${this.size()}`];
    if (this.disabled()) classes.push('radio-container--disabled');
    if (this.showLabel() && this.label()) classes.push('radio-container--with-label');
    return classes.join(' ');
  });

  radioClasses = computed(() => {
    const classes = ['radio', `radio--${this.size()}`, `radio--${this.variant()}`];
    if (this.disabled()) classes.push('radio--disabled');
    return classes.join(' ');
  });

  indicatorClasses = computed(() => {
    const classes = ['radio__indicator'];
    if (this.disabled()) classes.push('radio__indicator--disabled');
    return classes.join(' ');
  });

  labelClasses = computed(() => {
    const classes = ['radio__label', `radio__label--${this.size()}`];
    if (this.disabled()) classes.push('radio__label--disabled');
    if (this.variant() !== 'default') classes.push(`radio__label--${this.variant()}`);
    return classes.join(' ');
  });
}

