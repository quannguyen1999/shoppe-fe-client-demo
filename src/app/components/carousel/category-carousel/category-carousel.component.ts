import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATA_SIZE_DEVICE, DEFAULT_CATEGORY_COLUMNS, PRODUCT_FILTER } from 'src/app/constants/constant-value-model';
import { CagegoryRequestModel, Category, ID, IMAGE, NAME } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { SettingService } from 'src/app/services/setting.service';
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

  listItemCategoryGroupDeviceOne: Array<Category> = [];
  listItemCategoryGroupDeviceTwo: Array<Category> = [];
  listItemCategoryGroupDeviceThree: Array<Category> = [];
  listItemCategoryGroupDeviceFour: Array<Category> = [];
  listItemCategoryGroupDeviceFive: Array<Category> = [];
  groupCategory: Array<string> = [];
  categoryRequestModel: CagegoryRequestModel = {
    listFields: DEFAULT_CATEGORY_COLUMNS
  };
  isOnScreenDevice: boolean = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private settingService: SettingService
  ){
    
  }   

  ngOnInit(): void {
    this.groupCategory = ['1','2']
    this.categoryService.getListCategory(0, 40, [NAME, ID, IMAGE], this.categoryRequestModel).subscribe({
      next: data => {
        this.isLoading = false;
        this.listItemCategoryGroupOne = data.data!.slice(0, 20);
        this.listItemCategoryGroupTwo = data.data!.slice(20);

        this.listItemCategoryGroupDeviceOne = data.data!.slice(0, 8);
        this.listItemCategoryGroupDeviceTwo = data.data!.slice(8, 16);
        this.listItemCategoryGroupDeviceThree = data.data!.slice(16, 24);
        this.listItemCategoryGroupDeviceFour = data.data!.slice(24, 32);
        this.listItemCategoryGroupDeviceFive = data.data!.slice(32, 40);
      },
      error: error => {
        this.isLoading = false;
        this.toastrService.getPopUpInternalServerError();
      }
    });

    this.settingService.width$.subscribe(width => {
      if(width <= DATA_SIZE_DEVICE){
        this.isOnScreenDevice = true;
        this.groupCategory = ['1','2','3','4','5']
      }
    })
  }

  getPageCategory(name: string): void{
    this.router.navigate([PRODUCT_FILTER,name]);
  }

  getImageDeviceList(locate: string): Category[] {
    switch (locate) {
      case '1':
          return this.listItemCategoryGroupDeviceOne;
      case '2':
          return this.listItemCategoryGroupDeviceTwo;
      case '3':
          return this.listItemCategoryGroupDeviceThree;
      case '4':
          return this.listItemCategoryGroupDeviceFour;
      case '5':
          return this.listItemCategoryGroupDeviceFive;
      default:
          return [];
  }
  }

}
