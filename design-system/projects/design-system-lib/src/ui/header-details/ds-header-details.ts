import { Component, input, ViewEncapsulation, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';

@Component({
  selector: 'ds-header-details',
  standalone: true,
  imports: [CommonModule, DsButtonComponent, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-header-details.css'],
  template: `
    <div class="header-details">
        <!-- Title Row -->
        <div class="header-details__title-row">
          <h1 class="header-details__title heading-2xl">
            {{ title() }}
          </h1>
          
          <!-- Actions on the right -->
          <div class="header-details__actions">
            @if (showPrimaryAction()) {
              <ds-button
                [variant]="primaryActionVariant()"
                [size]="'md'"
                [disabled]="primaryActionDisabled()"
                [loading]="primaryActionLoading()"
                (clicked)="onPrimaryActionClick($event)"
                class="header-details__action-btn header-details__action-btn--primary"
              >
                @if (primaryActionIcon()) {
                  <ds-icon slot="leading" [name]="primaryActionIcon()!" size="18px" />
                }
                <span>{{ primaryActionText() }}</span>
              </ds-button>
            }
            
            @if (showSecondaryAction()) {
              <ds-button
                [variant]="secondaryActionVariant()"
                [size]="'md'"
                (clicked)="onSecondaryActionClick($event)"
                class="header-details__action-btn header-details__action-btn--secondary"
              >
                @if (secondaryActionIcon()) {
                  <ds-icon slot="leading" [name]="secondaryActionIcon()!" size="18px" />
                }
                <span>{{ secondaryActionText() }}</span>
              </ds-button>
            }
            
            @if (showMoreActions()) {
              <ds-button
                variant="ghost"
                size="md"
                [iconOnly]="true"
                ariaLabel="More actions"
                (clicked)="onMoreActionsClick($event)"
                class="header-details__action-btn header-details__action-btn--more"
              >
                <ds-icon slot="leading" name="remixMore2Fill" size="18px" />
              </ds-button>
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
  primaryActionDisabled = input<boolean>(false);
  primaryActionLoading = input<boolean>(false);
  
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
