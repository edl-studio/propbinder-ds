import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsMobilePageMainComponent } from '../../components/page-main';
import { 
  DsMobileContentComponent,
  DsMobileContentSectionComponent,
  SectionHeaderComponent,
  ContentRowComponent
} from '../../components/content';
import { DsMobileHandbookFolderComponent } from '../../components/handbook-folder';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mobile-handbook-page',
  standalone: true,
  imports: [
    FormsModule,
    DsMobilePageMainComponent,
    DsMobileContentComponent,
    DsMobileContentSectionComponent,
    SectionHeaderComponent,
    ContentRowComponent,
    DsMobileHandbookFolderComponent
  ],
  styles: [`
    .folders-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      padding: 0;
      justify-items: center;
    }
    
    .search-container {
      margin-bottom: 24px;
    }
    
    .search-input {
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid var(--border-color-default);
      background: var(--color-background-primary);
      font-family: 'Brockmann', sans-serif;
      font-size: 16px;
      outline: none;
    }
    
    .search-input::placeholder {
      color: var(--color-text-tertiary);
    }
    
    .search-input:focus {
      border-color: var(--color-brand-base);
    }
  `],
  template: `
    <ds-mobile-page-main
      title="Handbook"
      [avatarInitials]="userService.avatarInitials()"
      [avatarType]="userService.avatarType()"
      (refresh)="handleRefresh($event)">
      
      <ds-mobile-content>
        <ds-mobile-content-section>
          <div class="search-container">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search"
              [(ngModel)]="searchQuery">
          </div>
          
          <div class="folders-grid">
            <ds-mobile-handbook-folder
              [colorBase]="'#d244cf'"
              [colorWeak]="'#f9e6f9'"
              [iconName]="'remixLightbulbLine'"
              [itemCount]="8"
              [label]="'Utilities'">
            </ds-mobile-handbook-folder>
            
            <ds-mobile-handbook-folder
              [colorBase]="'#158452'"
              [colorWeak]="'#dcfce7'"
              [iconName]="'remixKey2Line'"
              [itemCount]="1"
              [label]="'Sikkerhedsudstyr'">
            </ds-mobile-handbook-folder>
            
            <ds-mobile-handbook-folder
              [colorBase]="'#1e5aff'"
              [colorWeak]="'#e0e9ff'"
              [iconName]="'remixFileList3Line'"
              [itemCount]="0"
              [label]="'Service contracts'">
            </ds-mobile-handbook-folder>
          </div>
        </ds-mobile-content-section>
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
export class MobileHandbookPageComponent {
  searchQuery: string = '';
  
  constructor(public userService: UserService) {}
  
  handleRefresh(event: any): void {
    console.log('Pull-to-refresh triggered');
    setTimeout(() => {
      console.log('Refresh complete');
      event.target.complete();
    }, 1000);
  }
}
