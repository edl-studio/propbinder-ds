import { Component, ViewEncapsulation, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsSidebarHeaderComponent } from './ds-sidebar-header';
import { DsSidebarGroupComponent, SidebarItem } from './ds-sidebar-group';
import { DsSidebarGroupContentItemComponent } from './ds-sidebar-group-content-item';

export interface SidebarGroup { id: string; label: string; items: SidebarItem[]; expanded?: boolean; showLabel?: boolean; }

@Component({
  selector: 'ds-sidebar',
  standalone: true,
  imports: [CommonModule, DsSidebarHeaderComponent, DsSidebarGroupComponent, DsSidebarGroupContentItemComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-sidebar.css'],
  template: `
    <nav class="sidebar" role="navigation" [attr.aria-label]="ariaLabel()" [class]="hostClasses()">
      <div class="sidebar__container" [style.width]="effectiveWidth()">
        <ds-sidebar-header
          [collapsed]="collapsedSig()"
          [showGlobalAction]="showGlobalAction()"
          [hostClass]="classes()?.header ?? ''"
          [globalActionLabel]="globalActionLabel()"
          [globalActionIcon]="globalActionIcon()"
          [globalActionDisabled]="globalActionDisabled()"
          (toggleCollapsed)="onToggleCollapsed()"
          (globalActionClick)="globalActionClick.emit()"
        />

        <div class="sidebar__content" role="list" (scroll)="onContentScroll($event)">
          @for (group of groups(); track group.id) {
            <ds-sidebar-group
              [id]="group.id"
              [label]="group.label"
              [items]="group.items"
              [expanded]="getGroupExpanded(group.id, group.expanded ?? true)"
              [showLabel]="group.showLabel ?? true"
              [collapsed]="collapsedSig()"
              [activeItemId]="activeItemId() ?? ''"
              (toggled)="onGroupToggled($event)"
              (itemSelected)="itemSelected.emit($event)"
            />
          }
        </div>

        <footer class="sidebar__footer">
          <ng-content select="[sidebar-footer]">
            <ds-sidebar-group-content-item
              id="settings"
              icon="remixSettings3Line"
              label="Settings"
              [collapsed]="collapsedSig()"
              [active]="false"
              (selected)="onSettingsSelected()"
            />
          </ng-content>
        </footer>
      </div>
    </nav>
  `,
})
export class DsSidebarComponent {
  groups = input.required<SidebarGroup[]>();
  activeItemId = input<string>();
  collapsed = input<boolean>(false);
  mode = input<'auto' | 'sidebar' | 'drawer'>('auto');
  drawerOpen = input<boolean>(false);
  showGlobalAction = input<boolean>(false);
  ariaLabel = input<string>('Sidebar');
  width = input<string>('256px');
  hostClass = input<string>('');
  classes = input<{ header?: string; globalAction?: string; content?: string; footer?: string; group?: string; groupLabel?: string; groupContent?: string; item?: string }>();
  globalActionLabel = input<string>('Create');
  globalActionIcon = input<string>('remixAddLine');
  globalActionDisabled = input<boolean>(false);

  itemSelected = output<string>();
  groupToggled = output<{ groupId: string; expanded: boolean }>();
  drawerOpenChange = output<boolean>();
  collapsedChange = output<boolean>();
  globalActionClick = output<void>();
  expandAllGroups = output<void>();

  protected collapsedSig = signal<boolean>(this.collapsed());
  private groupsExpandedSig = signal<{[key: string]: boolean}>({});
  private isScrolledSig = signal<boolean>(false);
  private isScrolledToBottomSig = signal<boolean>(false);

  hostClasses = computed(() => {
    const classes = ['sidebar-host'];
    if (this.collapsedSig()) classes.push('sidebar-host--collapsed');
    if (this.isScrolledSig()) classes.push('sidebar-host--scrolled');
    if (this.isScrolledToBottomSig()) classes.push('sidebar-host--scrolled-to-bottom');
    const extra = this.hostClass();
    if (extra) classes.push(extra);
    return classes.join(' ');
  });

  effectiveWidth = computed(() => (this.collapsedSig() ? '80px' : this.width()));

  constructor() {
    effect(() => {
      const next = this.collapsed();
      this.collapsedSig.set(next);
    });
  }

  onToggleCollapsed() {
    const next = !this.collapsedSig();
    this.collapsedSig.set(next);
    
    // When collapsing sidebar, expand all groups
    if (next) {
      this.expandAllGroupsInternal();
    }
    
    this.collapsedChange.emit(next);
  }

  getGroupExpanded(groupId: string, defaultExpanded: boolean): boolean {
    const groupsExpanded = this.groupsExpandedSig();
    return groupsExpanded[groupId] !== undefined ? groupsExpanded[groupId] : defaultExpanded;
  }

  onGroupToggled(event: { groupId: string; expanded: boolean }) {
    const currentState = this.groupsExpandedSig();
    this.groupsExpandedSig.set({
      ...currentState,
      [event.groupId]: event.expanded
    });
    this.groupToggled.emit(event);
  }

  onContentScroll(event: Event) {
    const target = event.target as HTMLElement;
    const isScrolled = target.scrollTop > 0;
    const isScrolledToBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
    
    this.isScrolledSig.set(isScrolled);
    this.isScrolledToBottomSig.set(isScrolledToBottom);
  }

  onSettingsSelected() {
    // Handle settings selection - could emit an event or navigate
    console.log('Settings selected');
  }

  private expandAllGroupsInternal() {
    const expandedState: {[key: string]: boolean} = {};
    this.groups().forEach(group => {
      expandedState[group.id] = true;
    });
    this.groupsExpandedSig.set(expandedState);
    this.expandAllGroups.emit();
  }
}


