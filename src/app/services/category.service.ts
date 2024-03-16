import { Injectable } from '@angular/core';
import { CagegoryRequestModel, Category } from '../models/category.model';
import { imageDataFakeOne } from '../constants/data-fake.model';
import { Observable, map } from 'rxjs';
import { CommonPageInfo } from '../models/common-page.model';
import { getCategoryDetail } from '../constants/graphql-query-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  queryRequest: string = getCategoryDetail;

  constructor(private http: HttpClient,
    private apollo: Apollo,
    private router: Router
  ) {
  }

  getListCategory(page: number, 
    size: number, 
    fields?: string[], 
    categoryRequestDto?: CagegoryRequestModel
  ): Observable<CommonPageInfo<any>>{
    let query = this.queryRequest;
    const filterField = fields?.filter(field => field !== 'function');
    const dynamicFields = filterField ? filterField.join(",") : "";
    query = query.replaceAll('$fields', dynamicFields);
    return this.apollo
      .query<{ listCategory: CommonPageInfo<Category> }>({
          query: gql`${query}`, 
          variables: { 
          page: page, 
          size: size, 
          id: categoryRequestDto?.id,
          name: categoryRequestDto?.name,
          image: categoryRequestDto?.image,
          createFromDate: this.formatDateToYYYYMMDD(categoryRequestDto?.createFromDate),
          createToDate: this.formatDateToYYYYMMDD(categoryRequestDto?.createToDate),
          listSorted: categoryRequestDto?.listSorted
        },
        fetchPolicy: "network-only"
      })
      .pipe(
        map((response) => response.data.listCategory)
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
}
