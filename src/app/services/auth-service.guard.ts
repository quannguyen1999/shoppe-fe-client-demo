import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccountService } from './account.service';
import { ACCOUNT_TOKEN, LOGIN } from '../constants/constant-value-model';

@Injectable({
  providedIn: 'root'
})
export class authServiceGuard  implements CanActivate {

  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const numberOfRequest = this.accountService.getNumberOfRequest();
    const code = route.queryParams['code'];
    if (code && this.accountService.getToken() == null && numberOfRequest <= 1
    ) { 
      const tokenEndpoint = environment.apiUrl + ACCOUNT_TOKEN;
      const redirectUri = environment.redirectUrl;
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const body = new HttpParams()
        .set('code', code)
        .set('redirectUrl', redirectUri);
      this.http.post(tokenEndpoint, body.toString(), { headers }).subscribe({
        next: this.accountService.handlerSaveToken.bind(this),
        error: this.accountService.handlerErrorResponse.bind(this)
      });
    } else if (this.accountService.getToken() == null && numberOfRequest <= 1){
      this.router.navigate([LOGIN]);
    } else if(numberOfRequest >= 2) {
      return false;
    }
    return true;
  }

}