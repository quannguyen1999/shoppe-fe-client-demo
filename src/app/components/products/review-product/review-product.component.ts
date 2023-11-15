import { Component } from '@angular/core';
import { imageDataFakeOne } from 'src/app/constants/data-fake.model';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent {
  starFake: number = 5
  imageFake: string = imageDataFakeOne;
  listReview: number = 2;
}
