import { Component } from '@angular/core';
import { BACKGROUND_BEAR_ONE, BACKGROUND_BEAR_TWO, BACKGROUND_SALE_OFF_ONE, BACKGROUND_SALE_OFF_TWO, BACKGROUND_TEDDY_ONE } from 'src/app/constants/constant-value-model';
import { ImageCommon } from 'src/app/models/image-common.model';
import { SettingService } from 'src/app/services/setting.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  backgroundTeddyOne: string | any;
  backgroundSaleOffOne: string | any;
  backgroundSaleOffTwo: string | any;
  images: ImageCommon[] = [];
  isOnScreenDevice: boolean = false; 
  
  constructor(private settingService: SettingService) { 
    this.backgroundTeddyOne = BACKGROUND_TEDDY_ONE;
    this.backgroundSaleOffOne = BACKGROUND_SALE_OFF_ONE;
    this.backgroundSaleOffTwo = BACKGROUND_SALE_OFF_TWO;

    this.images = [ 
      { 
        id: 1, 
        image:  BACKGROUND_BEAR_ONE
      }, 
      { 
        id: 2, 
        image:  BACKGROUND_BEAR_TWO
      }
    ];
    
    this.settingService.width$.subscribe(width => {
      if(width <= 500){
        this.isOnScreenDevice = true;
      }
    })
  } 
}