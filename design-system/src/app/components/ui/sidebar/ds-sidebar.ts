import { Component, ViewEncapsulation, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsSidebarHeaderComponent } from './ds-sidebar-header';
import { DsSidebarGroupComponent, SidebarItem } from './ds-sidebar-group';
import { DsSidebarGroupContentItemComponent } from './ds-sidebar-group-content-item';

export interface SidebarGroup { 
  id: string; 
  label: string; 
  items: SidebarItem[]; 
  expanded?: boolean; 
  showLabel?: boolean; 
}

export type DsSidebarMode = 'default' | 'minimized' | 'drawer';

@Component({
  selector: 'ds-sidebar',
  standalone: true,
  imports: [CommonModule, DsSidebarHeaderComponent, DsSidebarGroupComponent, DsSidebarGroupContentItemComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-sidebar.css'],
  template: `
    <nav 
      class="sidebar" 
      role="navigation" 
      [attr.aria-label]="ariaLabel()" 
      [class]="hostClasses()"
    >
      <div class="sidebar__container" [style.width]="effectiveWidth()">
        <!-- Header (always shown) -->
        <ds-sidebar-header
          [collapsed]="isCollapsed()"
          [mode]="mode()"
          [showGlobalAction]="showGlobalActionInCurrentMode()"
          [hostClass]="classes()?.header ?? ''"
          [globalActionLabel]="globalActionLabel()"
          [globalActionIcon]="globalActionIcon()"
          [globalActionDisabled]="globalActionDisabled()"
          (toggleCollapsed)="onToggleCollapsed()"
          (globalActionClick)="globalActionClick.emit()"
        />

        <!-- Content and Footer (hidden in minimized mode) -->
        @if (mode() !== 'minimized') {
          <div class="sidebar__content" role="list" (scroll)="onContentScroll($event)">
            @for (group of groups(); track group.id) {
              <ds-sidebar-group
                [id]="group.id"
                [label]="group.label"
                [items]="group.items"
                [expanded]="getGroupExpanded(group.id, group.expanded ?? true)"
                [showLabel]="group.showLabel ?? true"
                [collapsed]="isCollapsed()"
                [activeItemId]="activeItemId() ?? ''"
                (toggled)="onGroupToggled($event)"
                (itemSelected)="itemSelected.emit($event)"
              />
            }
          </div>

          <footer class="sidebar__footer">
            <ng-content select="[sidebar-footer]">
              <ds-sidebar-group-content-item
                id="log-out"
                icon="remixLogoutBoxLine"
                label="Log Out"
                [collapsed]="isCollapsed()"
                [active]="false"
                (selected)="onLogOutSelected()"
              />
            </ng-content>
          </footer>
        }
      </div>
    </nav>
  `,
})
export class DsSidebarComponent {
  // Required inputs
  groups = input.required<SidebarGroup[]>();
  
  // Optional inputs
  activeItemId = input<string>();
  collapsed = input<boolean>(false);
  mode = input<DsSidebarMode>('default');
  showGlobalAction = input<boolean>(false);
  ariaLabel = input<string>('Sidebar');
  width = input<string>('256px');
  hostClass = input<string>('');
  classes = input<{ 
    header?: string; 
    globalAction?: string; 
    content?: string; 
    footer?: string; 
    group?: string; 
    groupLabel?: string; 
    groupContent?: string; 
    item?: string; 
  }>();
  globalActionLabel = input<string>('Create');
  globalActionIcon = input<string>('remixAddLine');
  globalActionDisabled = input<boolean>(false);

  // Outputs
  itemSelected = output<string>();
  groupToggled = output<{ groupId: string; expanded: boolean }>();
  collapsedChange = output<boolean>();
  globalActionClick = output<void>();
  expandAllGroups = output<void>();
  toggleCollapsed = output<void>();

  // Internal state
  protected collapsedSig = signal<boolean>(this.collapsed());
  private groupsExpandedSig = signal<{[key: string]: boolean}>({});
  private isScrolledSig = signal<boolean>(false);
  private isScrolledToBottomSig = signal<boolean>(false);

  hostClasses = computed(() => {
    const classes = ['sidebar-host'];
    if (this.isCollapsed()) classes.push('sidebar-host--collapsed');
    if (this.isScrolledSig()) classes.push('sidebar-host--scrolled');
    if (this.isScrolledToBottomSig()) classes.push('sidebar-host--scrolled-to-bottom');
    if (this.mode() === 'minimized') classes.push('sidebar-host--minimized');
    if (this.mode() === 'drawer') classes.push('sidebar-host--drawer');
    const extra = this.hostClass();
    if (extra) classes.push(extra);
    return classes.join(' ');
  });

  effectiveWidth = computed(() => {
    switch (this.mode()) {
      case 'minimized':
        return '100%';
      case 'drawer':
        return this.isCollapsed() ? '80px' : 'min(300px, 80vw)';
      default:
        return this.isCollapsed() ? '80px' : this.width();
    }
  });

  isCollapsed = computed(() => {
    return this.mode() === 'minimized' || this.collapsedSig();
  });

  showGlobalActionInCurrentMode = computed(() => {
    return this.mode() !== 'minimized' && this.showGlobalAction();
  });

  constructor() {
    effect(() => {
      const next = this.collapsed();
      this.collapsedSig.set(next);
    });
  }

  onToggleCollapsed() {
    if (this.mode() === 'minimized' || this.mode() === 'drawer') {
      // For minimized and drawer modes, emit the toggle event for parent to handle
      this.toggleCollapsed.emit();
      return;
    }

    // For default mode, handle internal collapsed state
    const next = !this.collapsedSig();
    this.collapsedSig.set(next);
    
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

  onLogOutSelected() {
    this.itemSelected.emit('log-out');
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