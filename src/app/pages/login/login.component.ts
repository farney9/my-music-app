import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loading : boolean = false;
  constructor(
    private _auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initOperation(window.location.search.length);
  }

  public initOperation(params : any): void{
    if (params > 0) {
      this.loading = true;
      this._auth.handleRedirect();
      this._auth.tokenReady.subscribe(res =>{
        if(res){
          this.loading = false;
          this.redirectHomePage();
        }
      })
    }
  }

  private redirectHomePage(): void{
    this.router.navigate(['/pages/home']);
  }

  public autorizateLogin(event: string) : void {
    this._auth.authorizeAccess();
  }

}
