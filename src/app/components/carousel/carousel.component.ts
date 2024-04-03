import { Component } from '@angular/core';
import { imageDataFakeOne } from 'src/app/constants/data-fake.model';

interface Image { 
  id?: string,
  uri?: string
} 


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  srcImageFake: string = imageDataFakeOne;

  imageFakeOne: string = 'https://www.desktopbackground.org/p/2015/12/26/1063236_teddy-bear-wallpapers-new-hd-images_1600x900_h.jpg';
  imageFakeTwo: string = 'https://afamilycdn.com/2019/5/22/photo-1-1558509891449589673755.jpg';
  imageFakeThree: string = 'https://images.samsung.com/is/image/samsung/assets/vn/offer/flashsale/20240229/time-slot-MO-V2.jpg?$720_N(540)_JPG$';

  images: Image[] = []; 
  
  constructor() { } 

  ngOnInit() { 
      this.images = [ 
          { 
            id: '1', 
            uri:  'https://marketplace.canva.com/EAFHu3xC03I/1/0/1600w/canva-beige-bear-desktop-wallpaper-9Vrb-3w_jP8.jpg'
          }, 
          { 
            id: '2', 
            uri:  'https://www.theteddybearshop.com/cdn/shop/files/TeddyBearShop_WebContent_Au23_0021_2500px_10a48632-ec6d-4887-ba7f-b39f301675f4.jpg?v=1706051020&width=2048'  
          }
      ]; 
  } 
}