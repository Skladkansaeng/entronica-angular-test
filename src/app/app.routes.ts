import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing/containers/landing-page/landing-page.component';
import { ListPageComponent } from './modules/list-page/list-page.component';

export const routes: Routes = [
  { path: '', component: ListPageComponent },
  {
    path: 'create',
    component: LandingPageComponent
  },
   {
    path: 'view/:id',
    component: LandingPageComponent
  },
];
