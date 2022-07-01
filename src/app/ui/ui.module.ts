import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ButtonComponent } from './atoms/button/button.component';
import { TrackCardComponent } from './molecules/track-card/track-card.component';
import {MatIconModule} from '@angular/material/icon';
import { CardsContentComponent } from './templates/cards-content/cards-content.component';
import { NavbarComponent } from './organisms/navbar/navbar.component';
import { SharedModule } from 'custom/shared.module';
import { LoaderComponent } from './molecules/loader/loader.component';



@NgModule({
  declarations: [
    ButtonComponent,
    TrackCardComponent,
    CardsContentComponent,
    NavbarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule
  ],
  exports:[
    ButtonComponent,
    TrackCardComponent,
    CardsContentComponent,
    NavbarComponent,
    LoaderComponent
  ]
})
export class UiModule { }
