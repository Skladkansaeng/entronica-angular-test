import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { TimelineComponent } from './components/timeline/timeline.component';


@NgModule({
  declarations: [TimelineComponent, LandingPageComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingModule { }
