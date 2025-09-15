import { Component, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-sidebar-group-content',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-sidebar-group-content.css'],
  template: `
    <div class="sidebar-group-content" role="list" [id]="id()">
      <ng-content />
    </div>
  `,
})
export class DsSidebarGroupContentComponent {
  id = input.required<string>();
}


