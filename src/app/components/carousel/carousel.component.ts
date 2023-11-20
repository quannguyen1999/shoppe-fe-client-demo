import { Component } from '@angular/core';
import { imageDataFakeOne } from 'src/app/constants/data-fake.model';

interface Car { 
  id?: string; 
  name?: string; 
  description?: string; 
  price?: number; 
} 


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  srcImageFake: string = imageDataFakeOne;

  cars: Car[] = []; 
  
  constructor() { } 

  ngOnInit() { 
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