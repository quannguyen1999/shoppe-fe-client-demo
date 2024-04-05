import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_CATEGORY_COLUMNS, PRODUCT_FILTER } from 'src/app/constants/constant-value-model';
import { CagegoryRequestModel, Category, ID, IMAGE, NAME } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent implements OnInit{
  //Init
  isLoading: boolean = true;
  listItemCategoryGroupOne: Array<Category> = [];
  listItemCategoryGroupTwo: Array<Category> = [];
  groupCategory: Array<string> = [];
  categoryRequestModel: CagegoryRequestModel = {
    listFields: DEFAULT_CATEGORY_COLUMNS
  };

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ){}   

  ngOnInit(): void {
    this.groupCategory = ['1','2']
    this.categoryService.getListCategory(0, 40, [NAME, ID, IMAGE], this.categoryRequestModel).subscribe({
      next: data => {
        this.isLoading = false;
        this.listItemCategoryGroupOne = data.data!.slice(0, 20);
        this.listItemCategoryGroupTwo = data.data!.slice(20);
      },
      error: error => {
        this.isLoading = false;
        this.toastrService.getPopUpInternalServerError();
      }
    });
  }

  getPageCategory(name: string): void{
    this.router.navigate([PRODUCT_FILTER,name]);
  }

}
