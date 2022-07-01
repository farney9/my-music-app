import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { UiModule } from '../ui/ui.module';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    UiModule,
  ]
})
export class PagesModule { }
