import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { DATA_SIZE_DEVICE, IMAGE_DATA_FAKE_ONE, NAME_BRANCH } from 'src/app/constants/constant-value-model';
import { Account } from 'src/app/models/account.model';
import { Otp } from 'src/app/models/otp.model';
import { AccountService } from 'src/app/services/account.service';
import { SettingService } from 'src/app/services/setting.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  //Init
  nameBranch: string = NAME_BRANCH;
  private routerSubscription!: Subscription;
  formLogin!: FormGroup;
  formRegister!: FormGroup;
  codeVerify : number = 1111;
  imageFake: string = IMAGE_DATA_FAKE_ONE;
  isQRCode: boolean = false;
  isPageRegister: boolean = true;
  isConfirmCode: boolean = false;
  isOnScreenDevice: boolean = false;

  constructor(
    private formBuilderLogin: FormBuilder,
    private formBuilderRegister: FormBuilder,
    private router: Router,
    private acountService: AccountService,
    private settingService: SettingService,
    private toastrService: ToastrService
  ){
    this.settingService.width$.subscribe(width => {
      if(width <= DATA_SIZE_DEVICE){
        this.isOnScreenDevice = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((val) => {
      if(val instanceof Scroll){
        this.isPageRegister = val.routerEvent.url === '/register';
      }
    })

    this.formLogin = this.formBuilderLogin.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.formRegister = this.formBuilderRegister.group({
      username: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitLoginPage(){
    this.acountService.requestLoginPage(this.formLogin.value?.username, this.formLogin.value?.password).subscribe({
      next: data => {
        this.router.navigate(['/home']);
        this.toastrService.getPopUpSuccess("Đăng Nhập Thành Công")
        this.acountService.handlerSaveToken(data);
      },
      error: data => {
        this.toastrService.getPopUpErrorTypeString("Invalid username or password");
      }
    });;
    
  }

  replacePage(){
    this.isPageRegister = !this.isPageRegister;
  }

  changeTypeLogin(){
    this.isQRCode = !this.isQRCode;
  }

  submitRegister(){
    const account: Account = {
      username: this.formRegister.value?.username
    }
    this.acountService.registerAccount(account).subscribe({
      next: data => {
        this.isConfirmCode = true;
        this.toastrService.getPopUpSuccess("Mã Otp đã gữi qua điện thoại của bạn");
      },
      error: data => {
        if(data.status == 400){
          this.toastrService.getPopUpErrorTypeString(data.error.details[0]);
          return;
        }
        this.toastrService.getPopUpInternalServerError();
      }
    });
   
  }

  submitCodeVerfiy(){
    if(this.codeVerify == undefined || this.codeVerify < 4){
      this.toastrService.getPopUpErrorTypeString("Invalid code");
    };
    const otp: Otp = {
      username: this.formRegister.value.username,
      value: this.codeVerify
    }
    this.acountService.verifyOtp(otp).subscribe({
      next: data => {
        this.toastrService.getPopUpSuccess("Đăng Ký Thành Công");
        this.toastrService.getPopUpSuccess("Mật khẩu đã gửi qua sim của bạn");
        this.isConfirmCode = false;
        this.isPageRegister = false;
      },
      error: data => {
        if(data.status == 400){
          this.toastrService.getPopUpErrorTypeString(data.error.details[0]);
          return;
        }
        this.toastrService.getPopUpInternalServerError();
      }
    });
    
  }
}
