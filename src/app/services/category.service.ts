import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { imageDataFakeOne } from '../constants/data-fake.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getAllLists(): Array<Category>{
    return [
      {
        id: 1,
        typeName: 'Thời Trang Nam',
        img: imageDataFakeOne
      },
      {
        id: 1,
        typeName: 'Thời Trang Nam',
        img: imageDataFakeOne
      },
      {
        id: 1,
        typeName: 'Thời Trang Nam',
        img: imageDataFakeOne
      },
      {
        id: 1,
        typeName: 'Thời Trang Nam',
        img: imageDataFakeOne
      },
      {
        id: 1,
        typeName: 'Thời Trang Nam',
        img: imageDataFakeOne
      },
      {
        id: 1,
        typeName: 'Thời Trang Nam',
        img: imageDataFakeOne
      },
      {
        id: 1,
        typeName: 'Thời Trang Nam',
        img: imageDataFakeOne
      },
      {
        id: 1,
        typeName: 'Thời Trang Nam',
        img: imageDataFakeOne
      }
    ]
  }
}
