import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DATA_LOREM_FAKE, DATA_SIZE_DEVICE, HOME, IMAGE_DATA_FAKE_ONE, LOGIN, REGISTER } from './constants/constant-value-model';
import { SettingService } from './services/setting.service';
import { MenuItem } from 'primeng/api';
import { ToastrService } from './services/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  tooltipItems: MenuItem[] | undefined;
  
  //Init
  private routerSubscription!: Subscription;
  dataLoremFake: string = DATA_LOREM_FAKE;
  imgFake: string = IMAGE_DATA_FAKE_ONE;
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isHomePage: boolean = false;
  isOnScreenDevice: boolean = false;

  constructor(private router: Router, private toastrService: ToastrService, private settingService: SettingService){}

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

    this.tooltipItems = [
        {
            icon: 'pi pi-facebook',
            label: 'facebook',
            command: () => {
                this.toastrService.getPopUpSuccess("facebook work");
            }
        },
        {
            icon: 'pi pi-phone',
            command: () => {
              this.toastrService.getPopUpSuccess("phone work");
            }
        },
        {
            icon: 'pi pi-instagram',
            command: () => {
              this.toastrService.getPopUpSuccess("instagram work");
            }
        }
      ];
    }

  ngAfterViewInit(): void {
    this.settingService.width$.subscribe(width => {
      if(width <= DATA_SIZE_DEVICE){
        this.isOnScreenDevice = true;
      }
    })
    
  }
}
