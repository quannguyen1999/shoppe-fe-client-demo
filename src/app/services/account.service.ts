import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN, NUMBER_TRY_REQUEST, REFRESH_TOKEN, USERNAME } from '../constants/constant-value-model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageCustomService } from './local-storage-custom.service';
import { ToastrService } from './toastr.service';
import { Observable } from 'rxjs';
import { ACCOUNT_INFO } from '../constants/api-value';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private localStorageCustom: LocalStorageCustomService,
    private toastrService: ToastrService,
    private router: Router
  ) {
  }

  requestLoginPage(username: string, password: string) {
    const authorizationUrl = environment.apiUrl + 'accounts/token' +
      '?grantType=custom_password' +
      '&userName=' + username +
      '&password=' + password;
    this.http.post(authorizationUrl, {}).subscribe((data) => {
      this.handlerSaveToken(data);
    }, (error) => {
      this.toastrService.getPopUpErrorTypeString("Invalid username or password");
    });
  }

  requestRefreshToken() {
    const tokenEndpoint = environment.apiUrl + 'accounts/refreshToken';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refreshToken', this.getRefreshToken() || "");
    this.http.post(tokenEndpoint, body.toString(), { headers }).subscribe({
      next: this.handlerSaveToken.bind(this),
      error: this.handlerErrorResponse.bind(this)
    });
  }

  setNumberOfRequest(currentValue: number){
    this.localStorageCustom.setWithExpiry(NUMBER_TRY_REQUEST, (currentValue + 1).toString(), 5000);
  }

  getNumberOfRequest() {
    const currentValue = Number.parseInt((this.localStorageCustom.getWithExpiry(NUMBER_TRY_REQUEST) || '0'));
    return currentValue;
  }


  handlerErrorResponse() {
    let value = localStorage.getItem(NUMBER_TRY_REQUEST) || 0;
    localStorage.setItem(NUMBER_TRY_REQUEST, (Number.parseInt(value.toString()) + 1).toString());
  }

  getInfo(): Observable<any>{
    return this.http.get(ACCOUNT_INFO);
  }

  getUserName() {
    if(this.localStorageCustom.getDataInStorage(USERNAME) == null){
        this.router.navigate(['/login']);
        return null;
    }
    return this.localStorageCustom.getDataInStorage(USERNAME);
  }

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  isAuthen(){
    return this.getToken() != null ? true : false;
  }

  handlerSaveToken(response: any) {
    this.getInfo().subscribe((data)=>{
      this.localStorageCustom.setDataInStorage(USERNAME, data.username);
    })
    localStorage.setItem(ACCESS_TOKEN, response.access_token);
    localStorage.setItem(REFRESH_TOKEN, response.refresh_token);
  }

}
