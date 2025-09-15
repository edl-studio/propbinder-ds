import { Component, ViewEncapsulation, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';
import { DsTooltipComponent } from '../tooltip/ds-tooltip';

@Component({
  selector: 'ds-sidebar-group-content-item',
  standalone: true,
  imports: [CommonModule, DsIconComponent, DsTooltipComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-sidebar-group-content-item.css'],
  template: `
    <ng-container [ngSwitch]="hasHref()">
      <!-- Anchor elements -->
      <ng-container *ngSwitchCase="true">
        <!-- Anchor with tooltip when collapsed -->
        <ds-tooltip [text]="label()" placement="right" [offset]="8" *ngIf="collapsed()">
          <a [href]="href()"
             class="sidebar-item"
             role="listitem"
             [attr.aria-current]="active() ? 'page' : null"
             [attr.aria-disabled]="disabled() ? 'true' : null"
             [attr.tabindex]="disabled() ? -1 : 0"
             (click)="onSelect($event)"
          >
            <ds-icon [name]="icon()" size="16px" class="sidebar-item__icon" />
            <span class="sidebar-item__label" [class.sidebar-item__label--visually-hidden]="collapsed()">{{ label() }}</span>
            @if (badgeText()) {
              <span class="sidebar-item__badge">{{ badgeText() }}</span>
            }
          </a>
        </ds-tooltip>

        <!-- Anchor without tooltip when expanded -->
        <a *ngIf="!collapsed()"
           [href]="href()"
           class="sidebar-item"
           role="listitem"
           [attr.aria-current]="active() ? 'page' : null"
           [attr.aria-disabled]="disabled() ? 'true' : null"
           [attr.tabindex]="disabled() ? -1 : 0"
           (click)="onSelect($event)"
        >
          <ds-icon [name]="icon()" size="16px" class="sidebar-item__icon" />
          <span class="sidebar-item__label" [class.sidebar-item__label--visually-hidden]="collapsed()">{{ label() }}</span>
          @if (badgeText()) {
            <span class="sidebar-item__badge">{{ badgeText() }}</span>
          }
        </a>
      </ng-container>

      <!-- Button elements -->
      <ng-container *ngSwitchDefault>
        <!-- Button with tooltip when collapsed -->
        <ds-tooltip [text]="label()" placement="right" [offset]="8" *ngIf="collapsed()">
          <button type="button"
            class="sidebar-item"
            role="listitem"
            [disabled]="disabled()"
            [attr.aria-current]="active() ? 'page' : null"
            (click)="onSelect($event)"
          >
            <ds-icon [name]="icon()" size="16px" class="sidebar-item__icon" />
            <span class="sidebar-item__label" [class.sidebar-item__label--visually-hidden]="collapsed()">{{ label() }}</span>
            @if (badgeText()) {
              <span class="sidebar-item__badge">{{ badgeText() }}</span>
            }
          </button>
        </ds-tooltip>

        <!-- Button without tooltip when expanded -->
        <button *ngIf="!collapsed()"
          type="button"
          class="sidebar-item"
          role="listitem"
          [disabled]="disabled()"
          [attr.aria-current]="active() ? 'page' : null"
          (click)="onSelect($event)"
        >
          <ds-icon [name]="icon()" size="16px" class="sidebar-item__icon" />
          <span class="sidebar-item__label" [class.sidebar-item__label--visually-hidden]="collapsed()">{{ label() }}</span>
          @if (badgeText()) {
            <span class="sidebar-item__badge">{{ badgeText() }}</span>
          }
        </button>
      </ng-container>
    </ng-container>
  `,
})
export class DsSidebarGroupContentItemComponent {
  id = input.required<string>();
  icon = input.required<string>();
  label = input.required<string>();
  href = input<string>();
  badgeText = input<string>();
  active = input<boolean>(false);
  disabled = input<boolean>(false);
  collapsed = input<boolean>(false);

  selected = output<string>();

  hasHref = computed(() => !!this.href());

  onSelect(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.selected.emit(this.id());
  }
}


