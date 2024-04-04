import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/services/toastr.service';
import { DESCRIPTION, DISCOUNT, ID, IMAGE, NAME, PRICE, Product, ProductRequestModel } from 'src/app/models/product.model';
import { DEFAULT_PRODUCT_COLUMNS } from 'src/app/constants/constant-value-model';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  @Input() numberOfCol!: string;
  listProduct: Array<Product> = [];
  isLoading=false;
  currentPage=0;
  itemsPerPage=10;

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

  toggleLoading = () =>  this.isLoading=!this.isLoading;


  constructor(private productService: ProductService,
            private router: Router,
            private activeRoute: ActivatedRoute,
            private toastrService: ToastrService
  ){
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  // it will be called when this component gets initialized.
  loadData= ()=>{
      this.toggleLoading();
      this.productService.getListProduct(this.currentPage, this.itemsPerPage, [ID, NAME, DISCOUNT, IMAGE, PRICE, DESCRIPTION], this.productRequestModel).subscribe(
        (data)=>{
          this.isLoading = false;
          this.listProduct = data.data;
        },(error)=>{
          this.isLoading = false;
          this.toastrService.getPopUpErrorTypeString("Internal Server Error");
        }
      );
  }

  appendData = ()=>{
    this.toggleLoading();
    this.productService.getListProduct(this.currentPage,this.itemsPerPage, [ID, NAME, DISCOUNT, IMAGE, PRICE, DESCRIPTION], this.productRequestModel).subscribe({
      next:response=> this.listProduct = [...this.listProduct,...response.data],
      error:err=>console.log(err),
      complete:()=>this.toggleLoading()
    })
  }

  onScroll= ()=>{
    this.currentPage++;
    this.appendData();
  }

  detailProduct(id: string){
    this.router.navigate(['/product/detail', id]);
  }

}
