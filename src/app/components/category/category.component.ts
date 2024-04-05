import { Component, OnInit } from '@angular/core';
import { BACKGROUND_SALE_OFF_ONE } from 'src/app/constants/constant-value-model';
interface Car { 
  id?: string; 
  name?: string; 
  description?: string; 
  price?: number; 
} 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  //Init
  srcImageFake: string = BACKGROUND_SALE_OFF_ONE;
  cars: Car[] = []; 


  ngOnInit(): void {
    this.cars = [ 
        { 
            id: '1', 
            name: 'Bugatti', 
            description: 'Racing car', 
            price: 800, 
        }, 
        { 
            id: '2', 
            name: 'Ferrari', 
            description: 'The Prancing Horse', 
            price: 1500, 
        }, 
        { 
            id: '3', 
            name: 'Porsche', 
            description: 'Full spectrum', 
            price: 10000, 
        }, 
    ]; 
  }

}
