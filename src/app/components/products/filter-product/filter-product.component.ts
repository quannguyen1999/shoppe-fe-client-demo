import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CITIES } from 'src/app/constants/constant-value-model';
import { City, SortOrder } from 'src/app/models/common.model';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss']
})
export class FilterProductComponent implements OnInit{

  sortOrders: SortOrder[] | undefined;
  selectedSortOrder: SortOrder | undefined;

  dataSource = new MatTableDataSource<City>();
  selection = new SelectionModel<City>(true, []);
  displayedColumns: string[] = ['select','code'];
  fiveStar: number = 5;
  fourStar: number = 4;
  threeStar: number = 3;
  twoStar: number = 2;
  oneStar: number = 1;

  constructor(private router: Router){
    this.sortOrders = [
      {name: 'Từ Thấp tới Cao', code: 'DESC'},
      {name: 'Từ Cao tới Thấp', code: 'ASC'}
    ]
  }

  ngOnInit(): void {
    this.dataSource.data = CITIES;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
 toggleAllRows() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSource.data);
}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

}
