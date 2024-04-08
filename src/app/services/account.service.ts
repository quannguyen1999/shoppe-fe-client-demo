import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageCustomService } from './local-storage-custom.service';
import { ToastrService } from './toastr.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ACCOUNT_INFO, ACCOUNT_REFRESH_TOKEN, ACCOUNT_TOKEN, HOME, KEY_ACCESS_TOKEN, KEY_NUMBER_TRY_REQUEST, KEY_REFRESH_TOKEN, KEY_USERNAME } from '../constants/constant-value-model';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public accountSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private localStorageCustom: LocalStorageCustomService,
    private toastrService: ToastrService,
    private router: Router
  ) {
  }

  requestLoginPage(username: string, password: string) {
    const authorizationUrl = environment.apiUrl + ACCOUNT_TOKEN +
      '?grantType=custom_password' +
      '&userName=' + username +
      '&password=' + password;
    this.http.post(authorizationUrl, {}).subscribe({
      next: data => {
        this.handlerSaveToken(data);
      },
      error: data => {
        this.toastrService.getPopUpErrorTypeString("Invalid username or password");
      }
    });
  }

  requestRefreshToken() {
    const tokenEndpoint = environment.apiUrl + ACCOUNT_REFRESH_TOKEN;
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
    this.localStorageCustom.setWithExpiry(KEY_NUMBER_TRY_REQUEST, (currentValue + 1).toString(), 5000);
  }

  getNumberOfRequest() {
    const currentValue = Number.parseInt((this.localStorageCustom.getWithExpiry(KEY_NUMBER_TRY_REQUEST) || '0'));
    return currentValue;
  }


  handlerErrorResponse() {
    let value = localStorage.getItem(KEY_NUMBER_TRY_REQUEST) || 0;
    localStorage.setItem(KEY_NUMBER_TRY_REQUEST, (Number.parseInt(value.toString()) + 1).toString());
  }

  getInfo(): Observable<any>{
    return this.http.get(ACCOUNT_INFO);
  }

  getUserName() {
    if(this.localStorageCustom.getDataInStorage(KEY_USERNAME) == null){
        this.router.navigate(['/login']);
        return null;
    }
    return this.localStorageCustom.getDataInStorage(KEY_USERNAME);
  }

  getToken() {
    return localStorage.getItem(KEY_ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(KEY_REFRESH_TOKEN);
  }

  isAuthen(){
    return this.getToken() != null ? true : false;
  }

  handlerSaveToken(response: any) {
    this.accountSubject.next(true);
    localStorage.setItem(KEY_ACCESS_TOKEN, response.access_token);
    localStorage.setItem(KEY_REFRESH_TOKEN, response.refresh_token);
    this.getInfo().subscribe((data)=>{
      this.localStorageCustom.setDataInStorage(KEY_USERNAME, data.username);
    })
  }

  logout(){
    this.accountSubject.next(false);
    localStorage.removeItem(KEY_ACCESS_TOKEN);
    localStorage.removeItem(KEY_REFRESH_TOKEN);
    this.router.navigate([HOME]);
    this.toastrService.getPopUpSuccess("Đăng xuất thành công");
  }


}
