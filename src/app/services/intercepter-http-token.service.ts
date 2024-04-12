import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';
import { ACCOUNT_REFRESH_TOKEN, ACCOUNT_TOKEN, ERROR, KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from '../constants/constant-value-model';

@Injectable({
  providedIn: 'root'
})
export class IntercepterHttpTokenService implements HttpInterceptor {

  constructor(private accountService: AccountService,
            private router: Router,
            private http: HttpClient
    ){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<Object>> {
    if(this.accountService.getToken() !== null){
      console.log("ok")
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + this.accountService.getToken()
        }
      });
    }
   
    if(this.accountService.getNumberOfRequest() >= 2){
      this.router.navigate([ERROR]);
      return throwError(null);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse  && error.status === 401) {
        return this.handle401Error(request, next);
      }
      if (error.url == environment.apiUrl + ACCOUNT_TOKEN && error instanceof HttpErrorResponse  && error.status === 500) {
        localStorage.removeItem(KEY_ACCESS_TOKEN);
        localStorage.removeItem(KEY_REFRESH_TOKEN);
        this.router.navigate([ERROR]);
        return next.handle(request);
      }
      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let value = this.accountService.getNumberOfRequest();
    this.accountService.setNumberOfRequest(value);
    if(value >= 2){
      this.router.navigate([ERROR]);
      return throwError(null);
    }
    //get refresh token 
    localStorage.removeItem(KEY_ACCESS_TOKEN);
    const tokenEndpoint = environment.apiUrl + ACCOUNT_REFRESH_TOKEN;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refreshToken', this.accountService.getRefreshToken() || "");
    this.http.post(tokenEndpoint, body.toString(), { headers }).subscribe({
      next: this.accountService.handlerSaveToken.bind(this),
      error: this.accountService.handlerErrorResponse.bind(this)
    });
    return next.handle(request);
  }


}
