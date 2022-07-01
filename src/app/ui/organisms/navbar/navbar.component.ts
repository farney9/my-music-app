import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { userData } from "custom/models/models";
import { AuthService } from 'custom/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  porfileData: userData ={
    name: '',
    img: ''
  };

  constructor(
    private router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.verifyUserLogin();
  }

  private verifyUserLogin(){
    if(this._auth.getUser()){
      console.log(JSON.parse(this._auth.getUser()))
      this.porfileData = JSON.parse(this._auth.getUser())
    }
  }

  public goPage(type: string): void{
    switch(type){
      case 'FAV':
        this.router.navigate(['/pages/favorites']);
        break;
      case 'HOME':
        this.router.navigate(['/pages/home']);
    }
  }

  public logout(){
    this.router.navigate(['/pages']);
    this._auth.deleteToken();
    this._auth.deleteUser();
  }

}
