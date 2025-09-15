import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsAppLayoutComponent } from '../components/ui/app-layout/ds-app-layout';
import { DsTopbarComponent } from '../components/ui/topbar/ds-topbar';
import { DsIconComponent } from '../components/ui/icon/ds-icon';

@Component({
  selector: 'layout-preview',
  standalone: true,
  imports: [CommonModule, DsAppLayoutComponent, DsTopbarComponent, DsIconComponent],
  template: `
    <ds-app-layout 
      [sidebarGroups]="sidebarGroups"
      [isSidebarCollapsed]="isSidebarCollapsed()"
      [isMobile]="isMobile()"
      (menuOpenChange)="menuOpen.set($event)"
      (collapsedChange)="isSidebarCollapsed.set($event)"
    >
      <ds-topbar 
        [title]="'Layout Preview'"
        [iconName]="'remixDashboardLine'"
        [showFirstAction]="true"
        [showSecondAction]="true"
        [firstActionIcon]="'remixNotification3Line'"
        [secondActionIcon]="'remixMessage2Line'"
        [userInitials]="'JD'"
      ></ds-topbar>
      <div class="content-container">
        <h1>Main Content Area</h1>
        <p>This is where your main content would go. The layout handles the responsive behavior automatically.</p>
        
        <!-- Debug info -->
        <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
          <h2>Debug Information</h2>
          <pre>Window width: {{ windowWidth() }}px</pre>
          <pre>Is Mobile: {{ isMobile() }}</pre>
          <pre>Menu Open: {{ menuOpen() }}</pre>
          <pre>Sidebar Collapsed: {{ isSidebarCollapsed() }}</pre>
          <button (click)="toggleSidebar()">{{ isSidebarCollapsed() ? 'Expand' : 'Collapse' }} Sidebar</button>
          <button (click)="toggleDevTools()">{{ showDevTools() ? 'Hide' : 'Show' }} Element Inspector</button>
          @if (showDevTools()) {
            <div style="margin-top: 16px;">
              <h3>Element Inspector</h3>
              <ul>
                <li>Sidebar elements: {{ sidebarCount() }}</li>
                <li>Visible sidebars: {{ visibleSidebarCount() }}</li>
              </ul>
            </div>
          }
        </div>
      </div>
    </ds-app-layout>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }

    pre {
      margin: 8px 0;
      padding: 8px;
      background: #fff;
      border-radius: 4px;
    }

    button {
      margin-top: 8px;
      margin-right: 8px;
      padding: 8px 16px;
      background: #6B5FF5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #5D42E9;
    }
  `]
})
export class LayoutPreviewComponent {
  sidebarGroups = [
    {
      id: 'main',
      label: 'Main Navigation',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'remixDashboardLine' },
        { id: 'properties', label: 'Properties', icon: 'remixBuilding2Line' },
        { id: 'settings', label: 'Settings', icon: 'remixSettings4Line' },
      ],
    },
  ];

  // Reactive state using signals
  menuOpen = signal(false);
  showDevTools = signal(false);
  isSidebarCollapsed = signal(false); // Start expanded to show the layout better
  private windowWidthSig = signal(window.innerWidth);

  // Computed properties
  windowWidth = computed(() => this.windowWidthSig());
  isMobile = computed(() => this.windowWidth() <= 991);
  
  sidebarCount = computed(() => document.querySelectorAll('ds-sidebar').length);
  
  visibleSidebarCount = computed(() => {
    const sidebars = document.querySelectorAll('ds-sidebar');
    let count = 0;
    sidebars.forEach(sidebar => {
      const style = window.getComputedStyle(sidebar);
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        count++;
      }
    });
    return count;
  });

  constructor() {
    // Listen for window resize
    window.addEventListener('resize', () => {
      this.windowWidthSig.set(window.innerWidth);
    });
  }

  toggleDevTools() {
    this.showDevTools.set(!this.showDevTools());
  }

  toggleSidebar() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
  }
}