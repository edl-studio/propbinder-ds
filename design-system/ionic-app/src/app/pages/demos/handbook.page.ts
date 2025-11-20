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
import { HandbookItem } from '../../components/handbook-detail-modal/ds-mobile-handbook-detail-modal';

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
      gap: 12px;
      padding: 0 0 12px 0;
      justify-items: center;
      margin: -8px;
    }
    
    ds-mobile-handbook-folder {
      width: 100%;
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
              [variant]="'pink'"
              [iconName]="'remixLightbulbLine'"
              [itemCount]="8"
              [label]="'Utilities'">
            </ds-mobile-handbook-folder>

            <ds-mobile-handbook-folder
              [variant]="'success'"
              [iconName]="'remixKey2Line'"
              [itemCount]="3"
              [label]="'Sikkerhedsudstyr'"
              [items]="sikkerhedsudstyrItems">
            </ds-mobile-handbook-folder>

            <ds-mobile-handbook-folder
              [variant]="'blue'"
              [iconName]="'remixFileList3Line'"
              [itemCount]="5"
              [label]="'Service contracts'">
            </ds-mobile-handbook-folder>

            <ds-mobile-handbook-folder
              [variant]="'warning'"
              [iconName]="'remixToolsLine'"
              [itemCount]="4"
              [label]="'Equipment'">
            </ds-mobile-handbook-folder>
          </div>
        </ds-mobile-content-section>
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
export class MobileHandbookPageComponent {
  // Sample data for Sikkerhedsudstyr folder
  sikkerhedsudstyrItems: HandbookItem[] = [
    {
      title: 'Hjertestarter',
      description: 'Installed on the 4th floor at the doctors with access from a small entrance. The alarm is at the entrance from the stairs. Code is 2217.',
      images: [
        '/Assets/Dummy-photos/balcony-view.jpg',
        '/Assets/Dummy-photos/balcony-view.jpg',
        '/Assets/Dummy-photos/balcony-view.jpg'
      ],
      contacts: [
        { name: 'Mortensen & Søn ApS', initials: 'M', contactPerson: 'John Mortensen', phoneNumber: '+45 12 34 56 78' },
        { name: 'Glarmester S. Dax ApS', initials: 'G', contactPerson: 'Sarah Dax', phoneNumber: '+45 98 76 54 32' }
      ]
    },
    {
      title: 'Brandslukker',
      description: 'Key box is placed on the facade facing Vesterbrogade to the left of the small entrance; door phone systems at the front and back door. Main key is in the safety cabinet at Bings.',
      attachments: [
        { name: 'integration_widget.pdf', type: 'pdf' }
      ]
    },
    {
      title: 'Indbrud',
      description: 'Installed on the 4th floor at the doctors with access from a small entrance. The alarm is at the entrance from the stairs. Code is 2217.',
      images: [
        '/Assets/Dummy-photos/balcony-view.jpg',
        '/Assets/Dummy-photos/balcony-view.jpg'
      ],
      attachments: [
        { name: 'Cleaning instructions', type: 'doc' }
      ]
    }
  ];
  
  constructor(public userService: UserService) {}
  
  handleRefresh(event: any): void {
    console.log('Pull-to-refresh triggered');
    setTimeout(() => {
      console.log('Refresh complete');
      event.target.complete();
    }, 1000);
  }
}
