import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-flash-product',
  templateUrl: './flash-product.component.html',
  styleUrls: ['./flash-product.component.scss']
})
export class FlashProductComponent implements OnInit{
  listTopProductSale: Array<Product> = [];
  
  constructor (private router: Router,
              private productService: ProductService
  ){}

  ngOnInit(): void {
    this.listTopProductSale = this.productService.getTopProductSale();
  }

  detailProduct(id: string){
    this.router.navigate(['/product/detail', id]);
  }
 


}
