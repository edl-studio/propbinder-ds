import { Component } from '@angular/core';
import { DsMobilePageMainComponent } from '../../components/page-main';
import { 
  DsMobileContentComponent,
  DsMobileContentSectionComponent,
  SectionHeaderComponent,
  ContentRowComponent
} from '../../components/content';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mobile-inquiries-page',
  standalone: true,
  imports: [
    DsMobilePageMainComponent,
    DsMobileContentComponent,
    DsMobileContentSectionComponent,
    SectionHeaderComponent,
    ContentRowComponent
  ],
  styles: [`
    .grey-box {
      height: 120px;
      border-radius: 12px;
      background: var(--color-background-neutral-tertiary);
      flex: 1;
    }
  `],
  template: `
    <ds-mobile-page-main
      title="Inquiries"
      [avatarInitials]="userService.avatarInitials()"
      [avatarType]="userService.avatarType()"
      (refresh)="handleRefresh($event)">
      
      <ds-mobile-content>
        <ds-mobile-content-section>
          <section-header width="third"></section-header>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
          <content-row>
            <div class="grey-box"></div>
          </content-row>
        </ds-mobile-content-section>

        <ds-mobile-content-section>
          <section-header width="half"></section-header>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
        </ds-mobile-content-section>

        <ds-mobile-content-section>
          <section-header width="third"></section-header>
          <content-row>
            <div class="grey-box"></div>
          </content-row>
        </ds-mobile-content-section>

        <ds-mobile-content-section>
          <section-header width="half"></section-header>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
        </ds-mobile-content-section>

        <ds-mobile-content-section>
          <section-header width="third"></section-header>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
        </ds-mobile-content-section>

        <ds-mobile-content-section>
          <section-header width="half"></section-header>
          <content-row>
            <div class="grey-box"></div>
          </content-row>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
        </ds-mobile-content-section>

        <ds-mobile-content-section>
          <section-header width="third"></section-header>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
        </ds-mobile-content-section>
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
export class MobileInquiriesPageComponent {
  constructor(public userService: UserService) {}
  
  handleRefresh(event: any): void {
    console.log('Pull-to-refresh triggered');
    setTimeout(() => {
      console.log('Refresh complete');
      event.target.complete();
    }, 1000);
  }
}
