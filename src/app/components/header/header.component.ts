import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  controlSearchInput = new FormControl('');

  dataFakeSearch: string[] = ['NinJago', 'Robot', 'Bakugan', 'Áo lọt khe'];

  filteredSearchInput!: Observable<string[]>;

  constructor(private router: Router){

  }

  ngOnInit() {
    this.filteredSearchInput = this.controlSearchInput.valueChanges.pipe(
      startWith(''),
      map(value => this.searchValue(value || '')),
    );
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
