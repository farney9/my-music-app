import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "custom/guards/auth.guard";
import { PagesGuard } from 'custom/guards/pages.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [PagesGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
