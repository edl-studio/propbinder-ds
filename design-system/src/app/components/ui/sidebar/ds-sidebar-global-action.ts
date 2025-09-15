import { Component, ViewEncapsulation, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';

@Component({
  selector: 'ds-sidebar-global-action',
  standalone: true,
  imports: [CommonModule, DsButtonComponent, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-sidebar-global-action.css'],
  template: `
    <div class="sidebar-global-action" [class]="containerClasses()">
      <ds-button
        variant="primary"
        size="md"
        [iconOnly]="collapsed()"
        [disabled]="disabled()"
        [leadingIcon]="collapsed() ? icon() : undefined"
        (clicked)="onClick()"
        class="sidebar-global-action__button depth-sm"
      >
        <span class="sidebar-global-action__content" [class.sidebar-global-action__content--collapsed]="collapsed()">
          @if (icon() && !collapsed()) {
            <ds-icon [name]="icon()!" size="16px" class="sidebar-global-action__icon" />
          }
          <span class="sidebar-global-action__label" [class.sidebar-global-action__label--collapsed]="collapsed()">{{ label() }}</span>
        </span>
      </ds-button>
    </div>
  `,
})
export class DsSidebarGlobalActionComponent {
  label = input.required<string>();
  icon = input<string>();
  disabled = input<boolean>(false);
  collapsed = input<boolean>(false);
  hostClass = input<string>('');

  clicked = output<void>();

  containerClasses = computed(() => ['sidebar-global-action', this.hostClass()].filter(Boolean).join(' '));

  onClick() {
    if (!this.disabled()) this.clicked.emit();
  }
}


