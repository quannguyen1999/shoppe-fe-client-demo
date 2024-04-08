import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/services/toastr.service';
import { DESCRIPTION, DISCOUNT, ID, IMAGE, NAME, PRICE, Product, ProductRequestModel } from 'src/app/models/product.model';
import { DATA_SIZE_DEVICE, DEFAULT_PRODUCT_COLUMNS, PRODUCT_DETAIL } from 'src/app/constants/constant-value-model';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  //Init
  @Input() numberOfCol!: string;
  listProduct: Array<Product> = [];
  isLoading=false;
  currentPage=0;
  itemsPerPage=10;
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
  listDefaultColumn: string[] = [ID, NAME, DISCOUNT, IMAGE, PRICE, DESCRIPTION];

  constructor(private productService: ProductService,
            private router: Router,
            private activeRoute: ActivatedRoute,
            private toastrService: ToastrService,
            private settingService: SettingService
  ){}

  toggleLoading = () =>  this.isLoading=!this.isLoading;

  ngOnInit(): void {
    this.loadData();

    this.settingService.width$.subscribe(width => {
      if(width <= DATA_SIZE_DEVICE){
        this.isOnScreenDevice = true;
      }
    })

  }

  // it will be called when this component gets initialized.
  loadData= ()=>{
      this.toggleLoading();
      this.productService.getListProduct(this.currentPage, this.itemsPerPage, this.listDefaultColumn, this.productRequestModel).subscribe(
        {
          next: data => {
            this.isLoading = false;
            this.listProduct = data.data!;
          },
          error: err => {
            this.isLoading = false;
          this.toastrService.getPopUpInternalServerError();
          }
        }
      );
  }

  appendData = ()=>{
    this.toggleLoading();
    this.productService.getListProduct(this.currentPage,this.itemsPerPage, this.listDefaultColumn, this.productRequestModel).subscribe({
      next:response=> this.listProduct = [...this.listProduct,...response.data!],
      error:err=>console.log(err),
      complete:()=>this.toggleLoading()
    })
  }

  onScroll= ()=>{
    this.currentPage++;
    this.appendData();
  }

  detailProduct(id: string){
    this.router.navigate([PRODUCT_DETAIL, id]);
  }

  handlerSize(): string{
    if(this.isOnScreenDevice){
      return 'grid-cols-2';
    }
    return this.numberOfCol ?? 'grid-cols-5';

  }

}
