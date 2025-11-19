import { Component } from '@angular/core';
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
  `],
  template: `
    <ds-mobile-page-main
      title="Handbook"
      [avatarInitials]="userService.avatarInitials()"
      [avatarType]="userService.avatarType()"
      (refresh)="handleRefresh($event)">
      
      <ds-mobile-content>
        <ds-mobile-content-section>
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
  constructor(public userService: UserService) {}
  
  handleRefresh(event: any): void {
    console.log('Pull-to-refresh triggered');
    setTimeout(() => {
      console.log('Refresh complete');
      event.target.complete();
    }, 1000);
  }
}
