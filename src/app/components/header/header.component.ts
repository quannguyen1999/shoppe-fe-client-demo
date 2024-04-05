import { Component, OnInit, ViewChild,Input  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter, map, startWith } from 'rxjs';
import { SettingService } from 'src/app/services/setting.service';
import { AccountService } from 'src/app/services/account.service';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageCustomService } from 'src/app/services/local-storage-custom.service';
import { CART, IMAGE_DATA_FAKE_ONE, IMAGE_DATA_FAKE_TWO, KEY_ORDER_DATA, NAME_BRANCH } from 'src/app/constants/constant-value-model';
import { NavigationEnd, Router } from '@angular/router';
import { Sidebar } from 'primeng/sidebar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  //Init
  @Input() isAuthorization: boolean = false;
  nameBranch: string = NAME_BRANCH;
  headerBackgroundImage: string =  'assets/images/header-background.jpg';
  imageFake: string = IMAGE_DATA_FAKE_ONE;
  dataLoremFake: string = IMAGE_DATA_FAKE_TWO;
  selectedLanguage!: string;
  isAccountLogin: boolean = false;
  controlSearchInput = new FormControl('');
  dataFakeSearch: string[] = ['NinJago', 'Robot', 'Bakugan', 'Áo lọt khe'];
  filteredSearchInput!: Observable<string[]>;
  isShopping!: boolean;
  isOnScreenDevice: boolean = false;
  isAuthen: boolean = false;
  order: Order = {};
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;
  isOpenCart: boolean = false;
  
  constructor(
    private router: Router, 
    private settingService: SettingService,
    private accountService: AccountService,
    private cartService: CartService,
    private localStorageService: LocalStorageCustomService
  ){
    const dataOrder = this.localStorageService.getDataInStorage(KEY_ORDER_DATA);
    if(dataOrder){
      this.order = JSON.parse(dataOrder);
    }
    this.cartService.dataSubject.subscribe((data)=>{
      this.order = data;
    })
    this.isAuthen = this.accountService.isAuthen();
    this.accountService.accountSubject.subscribe(data=>{
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
        this.isShopping = url !== CART;
      }
    })
  } 

  ngOnInit() {
    this.filteredSearchInput = this.controlSearchInput.valueChanges.pipe(
      startWith(''),
      map(value => this.searchValue(value || '')),
    );
  }

  openSideBar(isOpenCart: boolean){
    this.isOpenCart = isOpenCart;
    this.sidebarVisible = true;
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
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
    this.router.navigate([CART]);
  }

  deleteOrder(id: number){
    this.cartService.removeCart(id);
  }

  logout(){
    this.accountService.logout();
  }


}
