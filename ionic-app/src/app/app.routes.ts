import { Routes } from '@angular/router';
import { MobileTabsExampleComponent } from './pages/mobile-tabs-example.component';
import { MobileHomePageComponent } from './pages/demos/home.page';
import { MobileHomeDetailPageComponent } from './pages/home-detail.page';
import { MobileInquiriesPageComponent } from './pages/demos/inquiries.page';
import { MobileCommunityPageComponent } from './pages/community.page';
import { MobilePostDetailPageComponent } from './pages/post-detail.page';
import { PostCreatePageComponent } from './pages/post-create.page';
import { MobileHandbookPageComponent } from './pages/demos/handbook.page';

// Mobile App Routes
export const routes: Routes = [
  {
    path: '',
    component: MobileTabsExampleComponent,
    children: [
      {
        path: 'home',
        component: MobileHomePageComponent
      },
      {
        path: 'home/detail',
        component: MobileHomeDetailPageComponent
      },
      {
        path: 'inquiries',
        component: MobileInquiriesPageComponent
      },
      {
        path: 'announcements',
        component: MobileCommunityPageComponent
      },
      {
        path: 'announcements/create-post',
        component: PostCreatePageComponent
      },
      {
        path: 'announcements/post/:id',
        component: MobilePostDetailPageComponent
      },
      {
        path: 'handbook',
        component: MobileHandbookPageComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

