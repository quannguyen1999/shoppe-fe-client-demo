import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_ACCOUNT_COLUMNS } from 'src/app/constants/constant-value-model';
import { CagegoryRequestModel, Category, ID, IMAGE, NAME } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent implements OnInit{

  isLoading: boolean = true;

  @Input() srcImageFake!: string;
  listItemCategoryGroupOne: Array<Category> = [];
  listItemCategoryGroupTwo: Array<Category> = [];

  //Field To Search
  categoryRequestModel: CagegoryRequestModel = {
    id: '',
    name: '',
    image: '',
    createFromDate: null,
    createToDate: null,
    listSorted: null,
    listFields: DEFAULT_ACCOUNT_COLUMNS
  };

  groupCategory: Array<string> = [];

  constructor(private router: Router,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ){}   

  ngOnInit(): void {
    this.groupCategory = ['1','2']
    this.categoryService.getListCategory(0, 40, [NAME, ID, IMAGE], this.categoryRequestModel).subscribe((data)=>{
      this.isLoading = false;
      this.listItemCategoryGroupOne = data.data.slice(0, 20);
      this.listItemCategoryGroupTwo = data.data.slice(20);
    },(error)=>{
      this.isLoading = false;
      this.toastrService.getPopUpErrorTypeString("Internal Server Error");
    }) 
  }

  getPageCategory(id: string): void{
    // this.toastrService.getPopUpErrorTypeString("Internal Server Error");
    this.router.navigate([`/product/filter`,id]);

  }

}
