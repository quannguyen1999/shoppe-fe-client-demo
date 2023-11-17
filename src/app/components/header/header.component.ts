import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter, map, startWith } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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
}
