import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DsIconComponent } from '../icon/ds-icon';

export interface TopbarBreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

@Component({
  selector: 'ds-topbar-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-topbar-breadcrumb.css'],
  template: `
    <nav aria-label="Breadcrumb navigation" class="breadcrumb">
      <ol class="breadcrumb__list">
        <li class="breadcrumb__item" *ngFor="let item of items()">
          <span 
            [class]="item.isLast ? 'breadcrumb__current ui-sm-regular' : 'breadcrumb__link ui-sm-regular'"
            [attr.data-path]="item.path"
            [attr.data-clickable]="!item.isLast"
            (click)="onBreadcrumbClick(item)"
          >
            {{ item.label }}
          </span>
          <span 
            *ngIf="!item.isLast"
            class="breadcrumb__separator ui-sm-regular"
          >
            /
          </span>
        </li>
      </ol>
    </nav>
  `
})
export class DsTopbarBreadcrumbComponent {
  items = input<TopbarBreadcrumbItem[]>([]);
  
  onBreadcrumbClick(item: TopbarBreadcrumbItem) {
    if (!item.isLast && item.path) {
      // Handle navigation programmatically
      // You can inject Router and navigate here
      console.log('Navigate to:', item.path);
    }
  }
}