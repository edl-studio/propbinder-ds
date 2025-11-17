import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { DsMobilePageDetailsComponent } from '../components/page-details';
import { 
  DsMobileContentComponent,
  DsMobileContentSectionComponent,
  SectionHeaderComponent,
  ContentRowComponent
} from '../components/content';

@Component({
  selector: 'app-home-detail-page',
  standalone: true,
  imports: [
    DsMobilePageDetailsComponent,
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

    .grey-box.tall {
      height: 200px;
    }
  `],
  template: `
    <ds-mobile-page-details
      title="Property details"
      [backRoute]="'/mobile-tabs-example/home'"
      (back)="goBack()">
      
      <ds-mobile-content>
        <ds-mobile-content-section>
          <section-header width="third"></section-header>
          <content-row>
            <div class="grey-box tall"></div>
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
          </content-row>
        </ds-mobile-content-section>

        <ds-mobile-content-section>
          <section-header width="half"></section-header>
          <content-row>
            <div class="grey-box"></div>
            <div class="grey-box"></div>
          </content-row>
        </ds-mobile-content-section>
      </ds-mobile-content>
    </ds-mobile-page-details>
  `
})
export class MobileHomeDetailPageComponent {
  constructor(private navCtrl: NavController) {}

  goBack(): void {
    // Navigate directly to home instead of using browser history
    // to avoid going back to other tabs visited in between
    this.navCtrl.navigateBack(['/mobile-tabs-example/home']);
  }
}
