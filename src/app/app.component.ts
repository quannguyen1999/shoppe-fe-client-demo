import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DATA_LOREM_FAKE, HOME, IMAGE_DATA_FAKE_ONE, LOGIN, REGISTER } from './constants/constant-value-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  //Init
  private routerSubscription!: Subscription;
  dataLoremFake: string = DATA_LOREM_FAKE;
  imgFake: string = IMAGE_DATA_FAKE_ONE;
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
        this.isLoginPage = val.url === LOGIN;
        this.isRegisterPage = val.url === REGISTER;
        this.isHomePage = val.url === HOME;
      }
    })
  }
}
