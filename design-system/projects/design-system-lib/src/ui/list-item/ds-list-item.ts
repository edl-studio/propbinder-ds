import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-list-item',
  imports: [CommonModule],
  styleUrl: './ds-list-item.css',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="list-item">
      <!-- Main content container -->
      <div class="list-item__content">
        <!-- Title and metadata section -->
        <div class="list-item__content-section">
          <!-- Title -->
          <div class="list-item__title">
            <p class="body-base-regular">{{ title() }}</p>
          </div>
          
          <!-- Metadata row -->
          <div class="list-item__meta">
            <ng-content select="[slot=metadata]"></ng-content>
          </div>
        </div>
      </div>
      
      <!-- Action buttons -->
      <div class="list-item__actions">
        <ng-content select="[slot=actions]"></ng-content>
      </div>
    </div>
  `,
})
export class DsListItemComponent {
  title = input.required<string>();
}
