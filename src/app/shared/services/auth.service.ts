import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthToken, userData } from "custom/models/models";
import { CommonService } from 'custom/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private env = environment;
  public tokenReady: EventEmitter<boolean> = new EventEmitter<boolean>();
  porfileData: userData ={
    name: '',
    img: ''
  };
  constructor(
    private _common : CommonService
  ) { }


  /**
   * First step, login with Spotify account
   */
  public authorizeAccess(): void {
    let url = this.env.urlAuthorize;
    url += "?client_id=" + this.env.idClient;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(this.env.returnURL);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private playlist-modify-private playlist-modify user-library-modify";
    window.location.href = url;
  }

  /**
   * Transform code response and delete it from URL
   */
  public handleRedirect(): void {
    console.log("Service");
    let code = this.getCode(window.location.search);
    this.fetchAccessToken(code);    
  }

  private getCode(params: string): string | null {
    let code = null;
    const queryString = params;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code');
    }
    return code;
  }

  /**
   * Prepare second step, get token
   * @param code authorization login code 
   */

  private fetchAccessToken(code: any): void {
    const body = new URLSearchParams();
    body.set('grant_type', "authorization_code");
    body.set('code', code);
    body.set('redirect_uri', encodeURI(this.env.returnURL));
    body.set('client_id', this.env.idClient);
    body.set('client_secret', this.env.secretClient);
    this.callAuthorizationApi(body)
  }

  /**
   * Api token
   * @param body body for form urlencoded 
   */

  private callAuthorizationApi(body: URLSearchParams): void {
    try {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", this.env.urlToken, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.env.idClient + ":" + this.env.secretClient));
      xhr.send(body.toString());
      xhr.onload = (event) =>{
        /* istanbul ignore next */
        this.handleAuthorizationResponse(event.target);
      };
    } catch (error) {
      /* istanbul ignore next */
      console.error(error);
    }
  }

  /**
   * Get and save token
   * @param this response reference
   */

  private handleAuthorizationResponse(res : any) : void {
    console.log(res.status);
    if(res.status == 200){
      let loginResult: AuthToken = JSON.parse(res.responseText);
      if(loginResult.access_token){
        this.setToken(loginResult.access_token);
        this._common.getDataProfile().subscribe(res =>{
          this.infoProfileHandle(res);
          this.tokenReady.emit(true);
        })
      } 
    }
  }

  private infoProfileHandle(res: any): void{
    this.porfileData.name = res.display_name;
    this.porfileData.img = res.images[0].url;
    this.setUser(this.porfileData)
  }

  private setToken(token: string): void{
    sessionStorage.setItem('access_token', token);
  }

  public getToken(): string | null{
    return sessionStorage.getItem('access_token');
  }

  public deleteToken(): void{
    sessionStorage.removeItem('access_token');
  }


  private setUser(data: userData): void{
    sessionStorage.setItem('user_login',JSON.stringify(data));
  }

  public getUser() : any{
    return sessionStorage.getItem('user_login');
  }

  public deleteUser(): void{
    sessionStorage.removeItem('user_login');
  }
}


