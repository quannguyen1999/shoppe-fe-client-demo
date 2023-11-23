import { Component, OnInit, ViewChild,Input  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter, map, startWith } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { dataLoremFake, imageDataFakeOne } from 'src/app/constants/data-fake.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Input() isAuthorization: boolean = false;

  imageFake: string = imageDataFakeOne;

  dataLoremFake: string = dataLoremFake;

  selectedLanguage!: string;

  isAccountLogin: boolean = false;

  controlSearchInput = new FormControl('');

  dataFakeSearch: string[] = ['NinJago', 'Robot', 'Bakugan', 'Áo lọt khe'];

  filteredSearchInput!: Observable<string[]>;

  isShopping!: boolean;
  
  constructor(private router: Router){
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


}
