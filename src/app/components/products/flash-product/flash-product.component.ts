import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATA_SIZE_DEVICE, DEFAULT_PRODUCT_COLUMNS, PRODUCT_DETAIL } from 'src/app/constants/constant-value-model';
import { DISCOUNT, ID, IMAGE, NAME, PRICE, Product, ProductRequestModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { SettingService } from 'src/app/services/setting.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-flash-product',
  templateUrl: './flash-product.component.html',
  styleUrls: ['./flash-product.component.scss']
})
export class FlashProductComponent implements OnInit{
  //Init
  isLoading: boolean = true;
  listTopProductSale: Array<Product> = [];
  isOnScreenDevice: boolean = false;
  productRequestModel: ProductRequestModel = {
    id: '',
    name: '',
    image: '',
    quantity: 0,
    price: 0,
    discount: 0,
    idCategory: '',
    createFromDate: null,
    createToDate: null,
    listSorted: null,
    listFields: DEFAULT_PRODUCT_COLUMNS,
    isGetTopProduct: false,
    isSuggestProduct: false
  };
  
  constructor (private router: Router,
              private productService: ProductService,
              private toastrService: ToastrService,
              private settingService: SettingService
  ){}

  ngOnInit(): void {
    this.productRequestModel.isGetTopProduct = true;    
    this.productService.getListProduct(0, 10, [ID, NAME, IMAGE, DISCOUNT, PRICE], this.productRequestModel).subscribe({
      next: data => {
        this.isLoading = false;
        this.listTopProductSale = data.data!;
      },
      error: data => {
        this.isLoading = false;
        this.toastrService.getPopUpInternalServerError();
      }}
    );

    this.settingService.width$.subscribe(width => {
      if(width <= DATA_SIZE_DEVICE){
        this.isOnScreenDevice = true;
      }
    })
  }

  detailProduct(id: string){
    this.router.navigate([PRODUCT_DETAIL, id]);
  }
 


}
