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

  imageFakeTwo: string = 'https://static.vecteezy.com/system/resources/thumbnails/033/343/258/small_2x/pastel-fluffy-teddy-bear-wallpaper-fluffy-teddy-bear-background-teddy-bear-background-teddy-bear-wallpaper-ai-generative-photo.jpg';

  imageFakeThree: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-5iOFgLQfmNQSuSnxMpPWJDWpgSsyrcYc-nrYWydaPg&s';

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
              uri:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-5iOFgLQfmNQSuSnxMpPWJDWpgSsyrcYc-nrYWydaPg&s'
              
          }, 
          { 
              id: '3', 
             uri: 'https://c1.wallpaperflare.com/preview/307/680/936/lucky-pig-pig-swim-figure.jpg'
          }
      ]; 
  } 
}