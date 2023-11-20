import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Product } from '../models/product.model';
import { imageDataFakeOne } from '../constants/data-fake.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private totalItems=20;

  getLists(page=1,itemsPerPage=10):Observable<string[]>{
   const startIndex=(page-1)*itemsPerPage;
   const endIndex=startIndex+itemsPerPage;
   const items=[];
   for(let i=startIndex;i<endIndex;i++){
    if(i < this.totalItems){
      items.push(`${i+1}`);
    }
   }
   return of(items).pipe(delay(500));
  }

  getTopProductSale(): Array<Product>{
    return [
      {
        id: 1,
        type: 'Sex toy',
        description: 'xnxx',
        image: imageDataFakeOne,
        price: 10000
      },
      {
        id: 1,
        type: 'Sex toy',
        description: 'xnxx',
        image: imageDataFakeOne,
        price: 10000
      },
      {
        id: 1,
        type: 'Sex toy',
        description: 'xnxx',
        image: imageDataFakeOne,
        price: 10000
      },
      {
        id: 1,
        type: 'Sex toy',
        description: 'xnxx',
        image: imageDataFakeOne,
        price: 10000
      },
      {
        id: 1,
        type: 'Sex toy',
        description: 'xnxx',
        image: imageDataFakeOne,
        price: 10000
      },
      {
        id: 1,
        type: 'Sex toy',
        description: 'xnxx',
        image: imageDataFakeOne,
        price: 10000
      },
      {
        id: 1,
        type: 'Sex toy',
        description: 'xnxx',
        image: imageDataFakeOne,
        price: 10000
      },
      {
        id: 1,
        type: 'Sex toy',
        description: 'xnxx',
        image: imageDataFakeOne,
        price: 10000
      }
    ]
  }

  constructor() { }
}
