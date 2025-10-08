import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, HostListener, OnDestroy, computed } from '@angular/core';
import { DsAppLayoutComponent } from './ds-app-layout';
import { DsDataItemComponent } from '../data-item/ds-data-item';
import { ViewportService } from '../../../lib/viewport.service';
import { demoGroups } from '../sidebar/demo-data';

@Component({
  selector: 'ds-debug-wrapper',
  standalone: true,
  imports: [DsAppLayoutComponent, DsDataItemComponent],
  // ViewportService is now provided at the module level
  template: `
    <ds-app-layout
      [sidebarGroups]="sidebarGroups"
      [isMobileOverride]="isMobileOverride"
      [isSidebarCollapsed]="isSidebarCollapsed"
      [pageTitle]="'Page Title'"
      [iconName]="'remixHome4Line'"
      [userInitials]="'JD'"
      [showFirstAction]="true"
      [firstActionIcon]="'remixNotification3Line'"
      [firstActionLabel]="'Notifications'"
      [showSecondAction]="true"
      [secondActionIcon]="'remixSettings3Line'"
      [secondActionLabel]="'Settings'"
      (menuOpenChange)="handleMenuOpenChange($event)"
      (collapsedChange)="handleCollapsedChange($event)"
    >
      <div style="padding: 24px;">
        <div style="max-width: 64rem; margin: 0 auto;">
          <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 8px;">Main Content Area</h2>
          <p style="color: rgb(75, 85, 99); margin-bottom: 48px;">This is where your main content would go. The layout handles the responsive behavior automatically.</p>
          
          <div style="margin-bottom: 48px;">
            <div style="background: var(--color-background-neutral-secondary); border-radius: 16px; padding: 24px;">
              <span class="ui-sm-medium">Debug Information</span>
              <div style="margin-top: 16px;">
                <ds-data-item 
                  [label]="'Window width'" 
                  [value]="windowWidth + 'px'" 
                  [layout]="'horizontal'" 
                  [valueType]="'text'"
                ></ds-data-item>
                <ds-data-item 
                  [label]="'Is Mobile'" 
                  [value]="isMobile() ? 'True' : 'False'" 
                  [layout]="'horizontal'" 
                  [valueType]="'text'"
                ></ds-data-item>
                <ds-data-item 
                  [label]="'Menu Open'" 
                  [value]="menuOpen ? 'True' : 'False'" 
                  [layout]="'horizontal'" 
                  [valueType]="'text'"
                ></ds-data-item>
                <ds-data-item 
                  [label]="'Sidebar Collapsed'" 
                  [value]="isSidebarCollapsed ? 'True' : 'False'" 
                  [layout]="'horizontal'" 
                  [valueType]="'text'"
                ></ds-data-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ds-app-layout>
  `
})
class DebugWrapperComponent implements OnDestroy {
  sidebarGroups = demoGroups;
  isMobileOverride?: boolean;
  isSidebarCollapsed = false;
  windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  menuOpen = false;

  constructor(private viewportService: ViewportService) {}

  isMobile = computed(() => this.viewportService.isMobile());

  private resizeTimeout: any;

  @HostListener('window:resize')
  onResize() {
    // Debounce resize updates
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.windowWidth = window.innerWidth;
    }, 100);
  }

  handleMenuOpenChange(isOpen: boolean) {
    this.menuOpen = isOpen;
  }

  handleCollapsedChange(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  ngOnDestroy() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }
}

const meta: Meta<DsAppLayoutComponent> = {
  title: 'Application shell/App Layout',
  component: DsAppLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [DebugWrapperComponent],
      providers: [ViewportService]
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The main application layout component that provides a responsive shell with sidebar navigation, topbar, and content area. Automatically adapts between mobile and desktop modes based on viewport size.

## Features

- **Responsive Design**: Automatically switches between mobile drawer and desktop sidebar at 992px breakpoint
- **Collapsible Sidebar**: Desktop sidebar can be collapsed from 256px to 80px width
- **Mobile Drawer**: Slide-in navigation drawer with overlay on mobile devices
- **Sticky Topbar**: Page header remains visible while scrolling content
- **Integrated Subcomponents**: Both sidebar and topbar are automatically rendered and configured via props
- **Content Projection**: Default slot for main page content
- **Smooth Transitions**: Animated sidebar collapse/expand and mobile drawer
- **Viewport Service**: Automatic mobile detection or manual override for testing

## Architecture

The component automatically renders both **sidebar** and **topbar** - you don't need to project them as children. Just configure them via props and project your main content.

### Built-in Subcomponents

1. **Sidebar** - Navigation component (always rendered)
2. **Topbar** - Page header component (always rendered)
3. **Main Content** - Your page content (via default slot)

## Content Projection

The component has a **single default slot** for main page content:

\`\`\`html
<ds-app-layout
  [sidebarGroups]="groups"
  [pageTitle]="'Dashboard'"
  [iconName]="'remixHome4Line'"
  [userInitials]="'JD'"
>
  <!-- Your main content goes here -->
  <div class="content-container">
    <h1>Page Content</h1>
  </div>
</ds-app-layout>
\`\`\`

## Props

### Sidebar Configuration
- \`sidebarGroups\`: Array of navigation groups with items
- \`isSidebarCollapsed\`: Control collapsed state (desktop only)
- \`activeItemId\`: Currently active navigation item

**Group Structure:**
\`\`\`typescript
{
  id: 'group-id',
  label: 'GROUP LABEL',
  items: [
    { 
      id: 'item-id', 
      label: 'Item Label', 
      icon: 'remixIconName',
      badgeText?: '5' // Optional badge
    }
  ]
}
\`\`\`

### Topbar Configuration
- \`pageTitle\`: The page title text
- \`iconName\`: Icon to display next to the title
- \`userInitials\`: User avatar initials
- \`showBreadcrumbs\`: Enable breadcrumb navigation (default: false)
- \`breadcrumbItems\`: Array of breadcrumb items
- \`showFirstAction\`: Show first action button (default: true)
- \`firstActionIcon\`: Icon for first action (default: 'remixNotification3Line')
- \`firstActionLabel\`: Aria label for first action (default: 'Notifications')
- \`showSecondAction\`: Show second action button (default: true)
- \`secondActionIcon\`: Icon for second action (default: 'remixSettings3Line')
- \`secondActionLabel\`: Aria label for second action (default: 'Settings')

### Layout Configuration
- \`isMobileOverride\`: Override automatic mobile detection for testing

## Events

- \`(collapsedChange)\`: Emits when desktop sidebar is collapsed/expanded
- \`(menuOpenChange)\`: Emits when mobile drawer is opened/closed

## Layout Behavior

### Desktop Mode (≥ 992px)
- Persistent sidebar on the left (256px expanded, 80px collapsed)
- Grid layout: \`auto minmax(0, 1fr)\`
- Sidebar collapse toggle available
- Main content adjusts width automatically

### Mobile Mode (< 992px)
- Minimized sidebar header (64px height) at the top
- Hamburger menu button to open drawer
- Full sidebar appears as overlay drawer from left
- Semi-transparent backdrop overlay
- Body scroll locked when drawer is open

## Usage Example

\`\`\`html
<ds-app-layout
  [sidebarGroups]="sidebarGroups"
  [isSidebarCollapsed]="isSidebarCollapsed()"
  [activeItemId]="'dashboard'"
  [pageTitle]="'Dashboard'"
  [iconName]="'remixHome4Line'"
  [userInitials]="'JD'"
  [showFirstAction]="true"
  [firstActionIcon]="'remixNotification3Line'"
  [showSecondAction]="true"
  [secondActionIcon]="'remixSettings3Line'"
  (collapsedChange)="isSidebarCollapsed.set($event)"
>
  <!-- Main Content -->
  <div class="content-container">
    <h1>Page Content</h1>
    <p>Your content goes here...</p>
  </div>
</ds-app-layout>
\`\`\`

### With Breadcrumbs

\`\`\`html
<ds-app-layout
  [sidebarGroups]="sidebarGroups"
  [pageTitle]="'Property Details'"
  [iconName]="'remixBuilding2Line'"
  [showBreadcrumbs]="true"
  [breadcrumbItems]="[
    { label: 'Properties', path: '/properties', isLast: false },
    { label: 'Fælledgården Hub', path: '', isLast: true }
  ]"
  [userInitials]="'JD'"
>
  <!-- Content here -->
</ds-app-layout>
\`\`\`

## Viewport Testing

Use the viewport toolbar above to test different screen sizes, or use the \`isMobileOverride\` prop to force mobile/desktop mode:

\`\`\`html
<ds-app-layout
  [isMobileOverride]="false"  <!-- Force desktop mode -->
  [sidebarGroups]="groups"
  [pageTitle]="'Dashboard'"
>
\`\`\`
        `,
      },
    },
    layout: 'fullscreen',
    // Add viewport toolbar to allow easy resizing
    viewport: {
      defaultViewport: 'desktop',
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '100%',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '100%',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '100%',
          },
        },
        'large-desktop': {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '100%',
          },
        },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsAppLayoutComponent>;

export const Default: Story = {
  args: {
    sidebarGroups: demoGroups,
    isSidebarCollapsed: false,
  },
  render: () => ({
    template: '<ds-debug-wrapper></ds-debug-wrapper>'
  })
};

export const InitiallyCollapsed: Story = {
  args: {
    sidebarGroups: demoGroups,
    isMobileOverride: false, // Force desktop mode
    isSidebarCollapsed: true,
  },
  decorators: [
    moduleMetadata({
      imports: [DsAppLayoutComponent, DsDataItemComponent],
    }),
  ],
  render: (args) => ({
    props: {
      ...args,
      handleCollapsedChange(isCollapsed: boolean) {
        this['isSidebarCollapsed'] = isCollapsed;
      }
    },
    template: `
      <ds-app-layout
        [sidebarGroups]="sidebarGroups"
        [isMobileOverride]="isMobileOverride"
        [isSidebarCollapsed]="isSidebarCollapsed"
        [pageTitle]="'Initially Collapsed'"
        [iconName]="'remixHome4Line'"
        [userInitials]="'JD'"
        [showFirstAction]="true"
        [firstActionIcon]="'remixNotification3Line'"
        [firstActionLabel]="'Notifications'"
        [showSecondAction]="true"
        [secondActionIcon]="'remixSettings3Line'"
        [secondActionLabel]="'Settings'"
        (collapsedChange)="handleCollapsedChange($event)"
      >
        <div style="padding: 24px;">
          <div style="max-width: 64rem; margin: 0 auto;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 8px;">Initially Collapsed Sidebar</h2>
            <p style="color: rgb(75, 85, 99); margin-bottom: 48px;">This story demonstrates the sidebar starting in a collapsed state on desktop. Users can expand it using the collapse toggle button.</p>
            
            <div style="margin-bottom: 48px;">
              <div style="background: var(--color-background-neutral-secondary); border-radius: 16px; padding: 24px;">
                <span class="ui-sm-medium">Debug Information</span>
                <div style="margin-top: 16px;">
                  <ds-data-item 
                    [label]="'Is Mobile'" 
                    [value]="'False (Desktop mode forced)'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                  <ds-data-item 
                    [label]="'Sidebar Collapsed'" 
                    [value]="'True'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                  <ds-data-item 
                    [label]="'Note'" 
                    [value]="'Click the collapse toggle to expand the sidebar'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ds-app-layout>
    `,
  }),
};

// Debug story to test topbar in isolation
export const AutoResponsive: Story = {
  args: {
    sidebarGroups: demoGroups,
    // No isMobileOverride - let ViewportService handle automatic detection
    isSidebarCollapsed: false,
  },
  decorators: [
    moduleMetadata({
      imports: [DsAppLayoutComponent, DsDataItemComponent],
    }),
  ],
  render: (args) => ({
    props: {
      ...args,
      handleCollapsedChange(isCollapsed: boolean) {
        this['isSidebarCollapsed'] = isCollapsed;
      }
    },
    template: `
      <ds-app-layout
        [sidebarGroups]="sidebarGroups"
        [isMobileOverride]="isMobileOverride"
        [isSidebarCollapsed]="isSidebarCollapsed"
        [pageTitle]="'Auto Responsive'"
        [iconName]="'remixSmartphoneLine'"
        [userInitials]="'AR'"
        [showFirstAction]="true"
        [firstActionIcon]="'remixNotification3Line'"
        [firstActionLabel]="'Notifications'"
        [showSecondAction]="true"
        [secondActionIcon]="'remixSettings3Line'"
        [secondActionLabel]="'Settings'"
        (collapsedChange)="handleCollapsedChange($event)"
      >
        <div style="padding: 24px;">
          <div style="max-width: 64rem; margin: 0 auto;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 8px;">Auto-Responsive Layout</h2>
            <p style="color: rgb(75, 85, 99); margin-bottom: 48px;">This layout automatically detects your viewport size and switches between mobile and desktop modes at 992px breakpoint. Try resizing your browser window or using the viewport toolbar!</p>
            
            <div style="margin-bottom: 48px;">
              <div style="background: var(--color-background-neutral-secondary); border-radius: 16px; padding: 24px;">
                <span class="ui-sm-medium">Debug Information</span>
                <div style="margin-top: 16px;">
                  <ds-data-item 
                    [label]="'Breakpoint'" 
                    [value]="'992px'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                  <ds-data-item 
                    [label]="'Mobile Mode'" 
                    [value]="'≤ 991px (drawer menu)'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                  <ds-data-item 
                    [label]="'Desktop Mode'" 
                    [value]="'≥ 992px (persistent sidebar)'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                  <ds-data-item 
                    [label]="'Detection'" 
                    [value]="'Automatic via ViewportService'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ds-app-layout>
    `,
  }),
};

export const TopbarDebug: Story = {
  args: {
    sidebarGroups: demoGroups,
    isMobileOverride: false, // Force desktop mode
    isSidebarCollapsed: false,
  },
  decorators: [
    moduleMetadata({
      imports: [DsAppLayoutComponent, DsDataItemComponent],
    }),
  ],
  render: (args) => ({
    props: {
      ...args,
      handleCollapsedChange(isCollapsed: boolean) {
        this['isSidebarCollapsed'] = isCollapsed;
      }
    },
    template: `
      <ds-app-layout
        [sidebarGroups]="sidebarGroups"
        [isMobileOverride]="isMobileOverride"
        [isSidebarCollapsed]="isSidebarCollapsed"
        [pageTitle]="'Debug Page'"
        [iconName]="'remixHome4Line'"
        [userInitials]="'DB'"
        [showFirstAction]="false"
        [showSecondAction]="false"
        (collapsedChange)="handleCollapsedChange($event)"
      >
        <div style="padding: 24px;">
          <div style="max-width: 64rem; margin: 0 auto;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 8px;">Topbar Debug</h2>
            <p style="color: rgb(75, 85, 99); margin-bottom: 48px;">This story tests the topbar component with minimal props to ensure it renders correctly in the app layout.</p>
            
            <div style="margin-bottom: 48px;">
              <div style="background: var(--color-background-neutral-secondary); border-radius: 16px; padding: 24px;">
                <span class="ui-sm-medium">Debug Information</span>
                <div style="margin-top: 16px;">
                  <ds-data-item 
                    [label]="'Topbar Slot'" 
                    [value]="'Using slot=topbar attribute'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                  <ds-data-item 
                    [label]="'First Action'" 
                    [value]="'Hidden (showFirstAction=false)'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                  <ds-data-item 
                    [label]="'Second Action'" 
                    [value]="'Hidden (showSecondAction=false)'" 
                    [layout]="'horizontal'" 
                    [valueType]="'text'"
                  ></ds-data-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ds-app-layout>
    `,
  }),
};