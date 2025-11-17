import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { DsIconComponent } from '@propbinder/design-system';
import { DsMobilePageMainComponent } from '../../components/page-main';
import { 
  DsMobileHeaderContentComponent,
  DsMobileHeaderContentTileComponent,
  TileIconComponent,
  TileContentComponent,
  TileLabelComponent,
  TileValueComponent
} from '../../components/header-content';
import { 
  DsMobileContentComponent,
  DsMobileContentSectionComponent,
  SectionHeaderComponent,
  ContentRowComponent
} from '../../components/content';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    DsIconComponent,
    DsMobilePageMainComponent,
    DsMobileHeaderContentComponent,
    DsMobileHeaderContentTileComponent,
    TileIconComponent,
    TileContentComponent,
    TileLabelComponent,
    TileValueComponent,
    DsMobileContentComponent,
    DsMobileContentSectionComponent,
    SectionHeaderComponent,
    ContentRowComponent
  ],
  styles: [`
    /* Placeholder grey boxes for content */
    .grey-box {
      height: 120px;
      border-radius: 12px;
      background: var(--color-background-neutral-tertiary);
      flex: 1;
    }

    .grey-box.clickable {
      background: var(--color-background-brand);
      cursor: pointer;
      transition: transform var(--transition-duration-fast) var(--ease-smooth);
    }

    .grey-box.clickable:active {
      transform: scale(0.98);
    }
  `],
  template: `
    <ds-mobile-page-main
      title="Home"
      headerTitle="Welcome, Lars"
      headerSubtitle="Your rental property at a glance."
      [avatarInitials]="userService.avatarInitials()"
      [avatarType]="userService.avatarType()"
      (refresh)="handleRefresh($event)">
      
      <!-- Property info tiles in header -->
      <ds-mobile-header-content header-content>
        <ds-mobile-header-content-tile>
          <tile-icon>
              <ds-icon name="remixHome4Line" size="20px" color="#DFE4FF" />
          </tile-icon>
          <tile-content>
            <tile-label>Area</tile-label>
            <tile-value>120 m²</tile-value>
          </tile-content>
        </ds-mobile-header-content-tile>

        <ds-mobile-header-content-tile>
          <tile-icon>
              <ds-icon name="remixCollageLine" size="20px" color="#DFE4FF" />
          </tile-icon>
          <tile-content>
            <tile-label>Rooms</tile-label>
            <tile-value>3 rooms</tile-value>
          </tile-content>
        </ds-mobile-header-content-tile>
      </ds-mobile-header-content>
      
      <!-- Main page content -->
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

        <!-- Purple box - clickable with brand background -->
        <content-row>
          <div class="grey-box clickable" (click)="navigateToDetail()"></div>
        </content-row>

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
export class MobileHomePageComponent {
  constructor(
    private navCtrl: NavController,
    public userService: UserService
  ) {
    console.log('MobileHomePageComponent constructor');
  }

  handleRefresh(event: any): void {
    console.log('Pull-to-refresh triggered');
    setTimeout(() => {
      console.log('Refresh complete');
      event.target.complete();
    }, 1000);
  }

  navigateToDetail(): void {
    this.navCtrl.navigateForward('/mobile-tabs-example/home/detail');
  }
}
