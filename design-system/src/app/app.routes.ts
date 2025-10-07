import { Routes } from '@angular/router';
import { LayoutPreviewComponent } from './pages/layout-preview';
import { LandingComponent } from './pages/landing';
import { PropertyDetailsComponent } from './pages/property-details';
import { InvoiceDetailsComponent } from './pages/invoice-details';

export const routes: Routes = [
  {
    path: 'layout-preview',
    component: LayoutPreviewComponent
  },
  {
    path: 'property-details',
    component: PropertyDetailsComponent
  },
  {
    path: 'invoice-details',
    component: InvoiceDetailsComponent
  },
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  }
];