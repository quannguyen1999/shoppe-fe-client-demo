import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { Product, ProductRequestModel } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { CommonPageInfo } from '../models/common-page.model';
import { getProductDetail } from '../constants/graphql-query-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //Init
  private totalItems = 20;
  queryRequest: string = getProductDetail;

  constructor(
    private apollo: Apollo
  ) {}

  getListProduct(page: number, 
    size: number, 
    fields?: string[], 
    productRequestModel?: ProductRequestModel
  ): Observable<CommonPageInfo<any>>{
    let query = this.queryRequest;
    const filterField = fields?.filter(field => field !== 'function');
    const dynamicFields = filterField ? filterField.join(",") : "";
    query = query.replaceAll('$fields', dynamicFields);
    return this.apollo
      .query<{ listProduct: CommonPageInfo<Product> }>({
        query: gql`${query}`, 
        variables: { 
        page: page, 
        size: size, 
        id: productRequestModel?.id,
        name: productRequestModel?.name,
        image: productRequestModel?.image,
        quantity: productRequestModel?.image,
        price: productRequestModel?.price,
        discount: productRequestModel?.discount,
        createFromDate: this.formatDateToYYYYMMDD(productRequestModel?.createFromDate),
        createToDate: this.formatDateToYYYYMMDD(productRequestModel?.createToDate),
        listSorted: productRequestModel?.listSorted
        },
        fetchPolicy: "network-only"
      })
      .pipe(
      map((response) => response.data.listProduct)
      );
  }

  formatDateToYYYYMMDD(date: Date | null | undefined): string | undefined | null{
    if(date === null){
      return null;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  
    return date?.toLocaleDateString('en-US', options).replace(/\//g, '');
  }

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

    ]
  }

 
}
