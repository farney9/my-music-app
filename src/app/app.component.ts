import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'myMusicApp';
  constructor(
    private router: Router,
    private _auth: AuthService
  ) {

  }

  public showNav(): boolean{
    return JSON.parse(this._auth.getUser()) !== null
  }
}
