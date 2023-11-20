import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  // idCategory!: string;

  listProduct: Array<string> = [];
  isLoading=false;
  currentPage=1;
  itemsPerPage=10;

  toggleLoading = () =>  this.isLoading=!this.isLoading;


  constructor(private productService: ProductService,
            private router: Router,
            private activeRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    // this.activeRoute.paramMap.subscribe( paramMap => {
    //   this.idCategory = paramMap.get('id') || '';
    //   if(this.idCategory.length != 0 ){
    //     this.router.navigate(['/']);
    //   }
    // })

    this.loadData();
  }

  // it will be called when this component gets initialized.
  loadData= ()=>{
      this.toggleLoading();
      this.productService.getLists(this.currentPage,this.itemsPerPage).subscribe({
       next:response=>this.listProduct = response,
       error:err=>console.log(err),
       complete:()=>this.toggleLoading()
      })
  }

  appendData= ()=>{
    this.toggleLoading();
    this.productService.getLists(this.currentPage,this.itemsPerPage).subscribe({
     next:response=>this.listProduct = [...this.listProduct,...response],
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
