import { Component, ViewEncapsulation, input, output, signal, computed, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsSidebarGroupLabelComponent } from './ds-sidebar-group-label';
import { DsSidebarGroupContentComponent } from './ds-sidebar-group-content';
import { DsSidebarGroupContentItemComponent } from './ds-sidebar-group-content-item';

export interface SidebarItem { id: string; icon: string; label: string; href?: string; badgeText?: string; disabled?: boolean; }

@Component({
  selector: 'ds-sidebar-group',
  standalone: true,
  imports: [CommonModule, DsSidebarGroupLabelComponent, DsSidebarGroupContentComponent, DsSidebarGroupContentItemComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [
    './ds-sidebar-variables.css',
    './ds-sidebar-group.css'
  ],
  template: `
    <section class="sidebar-group">
      @if (showLabel()) {
        <ds-sidebar-group-label
          [label]="label()"
          [controlsId]="contentId"
          [expanded]="expandedSig()"
          (click)="toggle()"
        />
      }

      <ds-sidebar-group-content 
        [id]="contentId" 
        role="list"
        [class.collapsed]="!expandedSig()">
        @for (item of items(); track item.id) {
          <ds-sidebar-group-content-item
            [id]="item.id"
            [icon]="item.icon"
            [label]="item.label"
            [href]="item.href"
            [badgeText]="item.badgeText"
            [disabled]="item.disabled || false"
            [collapsed]="collapsed()"
            [active]="activeItemId() === item.id"
            (selected)="onItemSelected($event)"
          />
        }
      </ds-sidebar-group-content>
    </section>
  `,
})
export class DsSidebarGroupComponent implements OnChanges {
  id = input.required<string>();
  label = input.required<string>();
  items = input.required<SidebarItem[]>();
  expanded = input<boolean>(true);
  collapsed = input<boolean>(false);
  activeItemId = input<string>();
  showLabel = input<boolean>(true);

  toggled = output<{ groupId: string; expanded: boolean }>();
  itemSelected = output<string>();

  protected expandedSig = signal<boolean>(this.expanded());
  contentId = `sidebar-group-content-${Math.random().toString(36).slice(2, 9)}`;

  ngOnChanges() {
    this.expandedSig.set(this.expanded());
  }

  isExpanded = computed(() => this.expandedSig());

  toggle() {
    const next = !this.expandedSig();
    this.expandedSig.set(next);
    this.toggled.emit({ groupId: this.id(), expanded: next });
  }

  onItemSelected(itemId: string) {
    this.itemSelected.emit(itemId);
  }
}