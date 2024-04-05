import { Component } from '@angular/core';
import { IMAGE_DATA_FAKE_ONE } from 'src/app/constants/constant-value-model';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent {
  starFake: number = 5
  imageFake: string = IMAGE_DATA_FAKE_ONE;
  listReview: number = 2;
}
