import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccountService } from './account.service';

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
      const tokenEndpoint = environment.apiUrl + 'accounts/token';
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
      this.router.navigate(['/login']);
    } else if(numberOfRequest >= 2) {
      return false;
    }
    return true;
  }

}