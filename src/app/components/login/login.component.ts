import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { imageDataFakeOne } from 'src/app/constants/data-fake.model';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  private routerSubscription!: Subscription;

  formLogin!: FormGroup;

  formRegister!: FormGroup;

  imageFake: string = imageDataFakeOne;

  isQRCode: boolean = false;

  isPageRegister: boolean = true;

  constructor(private formBuilderLogin: FormBuilder,
    private formBuilderRegister: FormBuilder,
            private router: Router){}

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((val) => {
      console.log(val)
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
