import { Component, input, ViewEncapsulation, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from '../button/ds-button';

@Component({
  selector: 'ds-header-details',
  standalone: true,
  imports: [CommonModule, DsButtonComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-header-details.css'],
  template: `
    <div class="header-details">
        <!-- Title Row -->
        <div class="header-details__title-row">
          <h1 class="header-details__title ui-2xl-medium">
            {{ title() }}
          </h1>
          
          <!-- Actions on the right -->
          <div class="header-details__actions">
            @if (showPrimaryAction()) {
              <ds-button
                [variant]="primaryActionVariant()"
                [size]="'md'"
                [leadingIcon]="primaryActionIcon()"
                (clicked)="onPrimaryActionClick($event)"
                class="header-details__action-btn header-details__action-btn--primary"
              >
                {{ primaryActionText() }}
              </ds-button>
            }
            
            @if (showSecondaryAction()) {
              <ds-button
                [variant]="secondaryActionVariant()"
                [size]="'md'"
                [leadingIcon]="secondaryActionIcon()"
                (clicked)="onSecondaryActionClick($event)"
                class="header-details__action-btn header-details__action-btn--secondary"
              >
                {{ secondaryActionText() }}
              </ds-button>
            }
            
            @if (showMoreActions()) {
              <ds-button
                variant="ghost"
                size="md"
                [iconOnly]="true"
                leadingIcon="remixMore2Fill"
                ariaLabel="More actions"
                (clicked)="onMoreActionsClick($event)"
                class="header-details__action-btn header-details__action-btn--more"
              />
            }
          </div>
        </div>
        
        <!-- Details Row with slots for ds-data-item -->
        <div class="header-details__details-row">
          <ng-content select="[slot=details]"></ng-content>
        </div>
    </div>
  `,
})
export class DsHeaderDetailsComponent {
  // Title
  title = input.required<string>();
  
  // Primary action
  showPrimaryAction = input<boolean>(false);
  primaryActionText = input<string>('Primary Action');
  primaryActionIcon = input<string>();
  primaryActionVariant = input<'primary' | 'secondary' | 'ghost' | 'destructive'>('primary');
  
  // Secondary action
  showSecondaryAction = input<boolean>(false);
  secondaryActionText = input<string>('Secondary Action');
  secondaryActionIcon = input<string>();
  secondaryActionVariant = input<'primary' | 'secondary' | 'ghost' | 'destructive'>('secondary');
  
  // More actions (three dots menu)
  showMoreActions = input<boolean>(false);
  
  // Event outputs
  primaryActionClick = output<MouseEvent>();
  secondaryActionClick = output<MouseEvent>();
  moreActionsClick = output<MouseEvent>();
  
  // Event handlers
  onPrimaryActionClick(event: MouseEvent) {
    this.primaryActionClick.emit(event);
  }
  
  onSecondaryActionClick(event: MouseEvent) {
    this.secondaryActionClick.emit(event);
  }
  
  onMoreActionsClick(event: MouseEvent) {
    this.moreActionsClick.emit(event);
  }
}
