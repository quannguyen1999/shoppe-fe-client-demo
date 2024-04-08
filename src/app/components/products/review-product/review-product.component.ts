import { Component } from '@angular/core';
import { DATA_SIZE_DEVICE, IMAGE_DATA_FAKE_ONE } from 'src/app/constants/constant-value-model';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent {
  starFake: number = 5
  imageFake: string = IMAGE_DATA_FAKE_ONE;
  listReview: number = 2;
  isOnScreenDevice: boolean = false;

  constructor(private settingService: SettingService){
    this.settingService.width$.subscribe(width => {
      if(width <= DATA_SIZE_DEVICE){
        this.isOnScreenDevice = true;
      }
    })
  }
}
