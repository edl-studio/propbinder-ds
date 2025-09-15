import { Routes } from '@angular/router';
import { LayoutPreviewComponent } from './pages/layout-preview';
import { LandingComponent } from './pages/landing';

export const routes: Routes = [
  {
    path: 'layout-preview',
    component: LayoutPreviewComponent
  },
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  }
];