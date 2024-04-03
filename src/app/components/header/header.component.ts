import { Component, OnInit, ViewChild,Input  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter, map, startWith } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { dataLoremFake, imageDataFakeOne } from 'src/app/constants/data-fake.model';
import { SettingService } from 'src/app/services/setting.service';
import { ACCESS_TOKEN, NAME_BRANCH, ORDER_DATA, REFRESH_TOKEN } from 'src/app/constants/constant-value-model';
import { AccountService } from 'src/app/services/account.service';
import { authServiceGuard } from 'src/app/services/auth-service.guard';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageCustomService } from 'src/app/services/local-storage-custom.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Input() isAuthorization: boolean = false;

  nameBranch: string = NAME_BRANCH;

  headerBackgroundImage: string =  'assets/images/header-background.jpg';

  imageFake: string = imageDataFakeOne;

  dataLoremFake: string = dataLoremFake;

  selectedLanguage!: string;

  isAccountLogin: boolean = false;

  controlSearchInput = new FormControl('');

  dataFakeSearch: string[] = ['NinJago', 'Robot', 'Bakugan', 'Áo lọt khe'];

  filteredSearchInput!: Observable<string[]>;

  isShopping!: boolean;

  isOnScreenDevice: boolean = false;

  isAuthen: boolean = false;

  order: Order = {};
  
  constructor(
    private router: Router, 
    private settingService: SettingService,
    private accountService: AccountService,
    private authen: authServiceGuard,
    private cartService: CartService,
    private localStorageService: LocalStorageCustomService
  ){
    const dataOrder = this.localStorageService.getDataInStorage(ORDER_DATA);
    if(dataOrder){
      this.order = JSON.parse(dataOrder);
    }
    this.cartService.dataSubject.subscribe((data)=>{
      this.order = data;
    })
    this.isAuthen = this.accountService.isAuthen();
    this.accountService.accountSubject.subscribe(data=>{
      console.log("working")
      this.isAuthen = data;
    })
    this.settingService.width$.subscribe(width => {
      if(width <= 500){
        this.isOnScreenDevice = true;
      }
    })
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        let url = val.url;
        this.isShopping = url !== '/cart';
      }
    })


  } 

  ngOnInit() {
    this.filteredSearchInput = this.controlSearchInput.valueChanges.pipe(
      startWith(''),
      map(value => this.searchValue(value || '')),
    );
  }

  selectLanguage(language: string) {
    // Update the selectedLanguage variable when a language is selected
    this.selectedLanguage = language;
  }

  private searchValue(value: string): string[] {
    const filterValue = this.convertText(value);
    return this.dataFakeSearch.filter(dataFakeSearch => this.convertText(dataFakeSearch).includes(filterValue));
  }

  private convertText(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  redirectHomePage(){
    this.router.navigate(['/']);
  }

  getPageCart(){
    this.router.navigate(['/cart']);
  }

  deleteOrder(id: number){
    this.cartService.removeCart(id);
  }

  logout(){
    this.accountService.logout();
  }


}
