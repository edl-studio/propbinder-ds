import { Component, signal, computed, effect } from '@angular/core';
import { DsMobilePageMainComponent } from '../../components/page-main';
import { DsMobileContentComponent } from '../../components/content';
import { DsMobileInteractiveListItemInquiryComponent } from '../../components/interactive-list-item-inquiry';
import { DsIconComponent } from '@propbinder/design-system';
import { UserService } from '../../services/user.service';

interface Inquiry {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  timestamp: string;
  category: 'maintenance' | 'plumbing' | 'electrical' | 'heating' | 'security' | 'appliance' | 'other';
}

@Component({
  selector: 'app-mobile-inquiries-page',
  standalone: true,
  imports: [
    DsMobilePageMainComponent,
    DsMobileContentComponent,
    DsMobileInteractiveListItemInquiryComponent,
    DsIconComponent
  ],
  styles: [`
    .inquiries-container {
      display: flex;
      flex-direction: column;
      max-width: 640px;
    }
    
    .filter-tabs {
      display: flex;
      gap: 8px;
    }
    
    .filter-tab {
      padding: 8px 20px;
      border-radius: 20px;
      background: transparent;
      border: none;
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      font-weight: 600;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .filter-tab.active {
      background: var(--color-brand-primary, #5d5fef);
      color: white;
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
    }
    
    .empty-state-title {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-base);
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 16px 0 8px 0;
    }
    
    .empty-state-description {
      font-family: 'Brockmann', sans-serif;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin: 0;
    }
  `],
  template: `
    <ds-mobile-page-main
      title="Your inquiries"
      [avatarInitials]="userService.avatarInitials()"
      [avatarType]="userService.avatarType()">
      
      <!-- Filter tabs in header -->
      <div header-content class="filter-tabs">
        <button 
          class="filter-tab"
          [class.active]="filterStatus() === 'all'"
          (click)="setFilter('all')">
          All
        </button>
        <button 
          class="filter-tab"
          [class.active]="filterStatus() === 'open'"
          (click)="setFilter('open')">
          Open
        </button>
        <button 
          class="filter-tab"
          [class.active]="filterStatus() === 'closed'"
          (click)="setFilter('closed')">
          Closed
        </button>
      </div>
      
      <ds-mobile-content>
        <div class="inquiries-container">
          @if (filteredInquiries().length > 0) {
            <!-- Open inquiries -->
            @if (openInquiries().length > 0 && (filterStatus() === 'all' || filterStatus() === 'open')) {
              @if (filterStatus() === 'all') {
                <h2 class="section-headline">Open</h2>
              }
              
              @for (inquiry of openInquiries(); track inquiry.id) {
                <ds-mobile-interactive-list-item-inquiry
                  [title]="inquiry.title"
                  [description]="inquiry.description"
                  [status]="'open'"
                  [timestamp]="inquiry.timestamp"
                  [iconName]="getInquiryIcon(inquiry.category)"
                  [clickable]="true"
                  (inquiryClick)="openInquiryDetail(inquiry.id)"
                  (longPress)="showInquiryActions(inquiry.id)">
                </ds-mobile-interactive-list-item-inquiry>
              }
            }
            
            <!-- Closed inquiries -->
            @if (closedInquiries().length > 0 && (filterStatus() === 'all' || filterStatus() === 'closed')) {
              @if (filterStatus() === 'all') {
                <h2 class="section-headline">Closed</h2>
              }
              
              @for (inquiry of closedInquiries(); track inquiry.id) {
                <ds-mobile-interactive-list-item-inquiry
                  [title]="inquiry.title"
                  [description]="inquiry.description"
                  [status]="'closed'"
                  [timestamp]="inquiry.timestamp"
                  [iconName]="getInquiryIcon(inquiry.category)"
                  [clickable]="true"
                  (inquiryClick)="openInquiryDetail(inquiry.id)"
                  (longPress)="showInquiryActions(inquiry.id)">
                </ds-mobile-interactive-list-item-inquiry>
              }
            }
          } @else {
            <!-- Empty state -->
            <div class="empty-state">
              <ds-icon name="remixInboxLine" size="48px" color="tertiary" />
              <h3 class="empty-state-title">No inquiries yet</h3>
              <p class="empty-state-description">
                @if (filterStatus() === 'open') {
                  You don't have any open inquiries
                } @else if (filterStatus() === 'closed') {
                  You don't have any closed inquiries
                } @else {
                  You haven't created any inquiries yet
                }
              </p>
            </div>
          }
        </div>
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
export class MobileInquiriesPageComponent {
  constructor(
    public userService: UserService
  ) {}
  
  filterStatus = signal<'all' | 'open' | 'closed'>('all');
  
  inquiries = signal<Inquiry[]>([
    {
      id: '1',
      title: 'Tumble dryer is not working',
      description: 'For the past three days, I have been experiencing persistent problems with the dryer. It starts but stops after a few minutes.',
      status: 'open',
      timestamp: '12 days ago',
      category: 'appliance'
    },
    {
      id: '2',
      title: 'Water pressure issue',
      description: 'Low water pressure in the bathroom sink. It has been getting progressively worse over the past week.',
      status: 'open',
      timestamp: '5 days ago',
      category: 'plumbing'
    },
    {
      id: '3',
      title: 'Heating not working properly',
      description: 'The heating system is not maintaining the set temperature. The apartment is much colder than it should be.',
      status: 'closed',
      timestamp: '2 months ago',
      category: 'heating'
    }
  ]);
  
  // Computed signals that automatically update when dependencies change
  filteredInquiries = computed(() => {
    const all = this.inquiries();
    const status = this.filterStatus();
    
    if (status === 'all') {
      return all;
    } else if (status === 'open') {
      return all.filter(i => i.status === 'open');
    } else {
      return all.filter(i => i.status === 'closed');
    }
  });
  
  openInquiries = computed(() => {
    return this.inquiries().filter(i => i.status === 'open');
  });
  
  closedInquiries = computed(() => {
    return this.inquiries().filter(i => i.status === 'closed');
  });
  
  setFilter(status: 'all' | 'open' | 'closed'): void {
    this.filterStatus.set(status);
  }
  
  getInquiryIcon(category: string): string {
    return 'remixTodoLine';
  }
  
  openInquiryDetail(inquiryId: string): void {
    console.log('Opening inquiry:', inquiryId);
    // Navigate to inquiry detail page or open modal
  }
  
  showInquiryActions(inquiryId: string): void {
    console.log('Showing actions for inquiry:', inquiryId);
    // Show bottom sheet with actions (edit, delete, etc.)
  }
}

