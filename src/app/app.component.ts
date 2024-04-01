import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { dataLoremFake, imageDataFakeThree } from './constants/data-fake.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  private routerSubscription!: Subscription;

  dataLoremFake: string = dataLoremFake;
  imgFake: string = imageDataFakeThree;

  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isHomePage: boolean = false;



  constructor(private router: Router){}

  ngOnDestroy(): void {
    // Unsubscribe from the router events when the component is destroyed
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.isLoginPage = val.url === '/login';
        this.isRegisterPage = val.url === '/register';
        this.isHomePage = val.url === '/home';
      }
    })
  }
}
