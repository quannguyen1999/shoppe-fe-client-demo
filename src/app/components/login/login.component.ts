import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { imageDataFakeOne } from 'src/app/constants/data-fake.model';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { NAME_BRANCH } from 'src/app/constants/constant-value-model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  nameBranch: string = NAME_BRANCH;

  private routerSubscription!: Subscription;

  formLogin!: FormGroup;

  formRegister!: FormGroup;

  imageFake: string = imageDataFakeOne;

  isQRCode: boolean = false;

  isPageRegister: boolean = true;

  constructor(private formBuilderLogin: FormBuilder,
    private formBuilderRegister: FormBuilder,
            private router: Router,
            private acountService: AccountService
            ){}

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
      phone: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitLoginPage(){
    this.acountService.requestLoginPage(this.formLogin.value?.username, this.formLogin.value?.password);
    this.router.navigate(['/home']);
  }

  replacePage(){
    this.isPageRegister = !this.isPageRegister;
  }

  changeTypeLogin(){
    this.isQRCode = !this.isQRCode;
  }

  submitRegister(){
    console.log('register work')
  }
}
