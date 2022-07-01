import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'custom/services/auth.service';
import { Router } from '@angular/router';
import { TimeSongPipe } from 'custom/pipes/time-song.pipe';

@Injectable({
  providedIn: 'root'
})
export class InterceptService {

  constructor(
    private _auth : AuthService,
    private router: Router,

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    const token: string | null = this._auth.getToken();

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        this._auth.deleteUser();
        this.router.navigate(['/pages']);
        return throwError(error);
      })
    )
  }
}
