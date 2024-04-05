import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivationEnd, Router } from '@angular/router';
import { CITIES, DEFAULT_CATEGORY_COLUMNS } from 'src/app/constants/constant-value-model';
import { CagegoryRequestModel, Category, ID, IMAGE, NAME } from 'src/app/models/category.model';
import { City, SortOrder } from 'src/app/models/common.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss']
})
export class FilterProductComponent implements OnInit{
  //Init
  sortOrders: SortOrder[] = [
    {name: 'Từ Thấp tới Cao', code: 'DESC'},
    {name: 'Từ Cao tới Thấp', code: 'ASC'}
  ];
  selectedSortOrder: SortOrder | undefined;
  dataSource = new MatTableDataSource<City>();
  selection = new SelectionModel<City>(true, []);
  displayedColumns: string[] = ['select','code'];
  fiveStar: number = 5;
  fourStar: number = 4;
  threeStar: number = 3;
  twoStar: number = 2;
  oneStar: number = 1;
  isLoading: boolean = true;
  categoryRequestModel: CagegoryRequestModel = {
      id: '',
      name: '',
      image: '',
      createFromDate: null,
      createToDate: null,
      listSorted: null,
      listFields: DEFAULT_CATEGORY_COLUMNS
  };
  category: Category = {
    id: 0,
    name: '',
    image: ''
  };

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ){
    router.events.subscribe((val) => {
      if(val instanceof ActivationEnd){
        this.categoryRequestModel.name = val.snapshot.params['name'];

        this.categoryService.getListCategory(0, 40, [NAME, ID, IMAGE], this.categoryRequestModel).subscribe((data)=>{
          this.category = data.data![0];
          this.isLoading = false;
          // this.listItemCategoryGroupOne = data.data.slice(0, 20);
          // this.listItemCategoryGroupTwo = data.data.slice(20);
        },(error)=>{
          this.isLoading = false;
          this.toastrService.getPopUpErrorTypeString("Internal Server Error");
        }) 


      }
    });
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
