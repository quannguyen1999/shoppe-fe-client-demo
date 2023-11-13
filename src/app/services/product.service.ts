import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

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
      items.push(`Item ${i+1}`);
    }
   }
   return of(items).pipe(delay(500));
  }

  constructor() { }
}
