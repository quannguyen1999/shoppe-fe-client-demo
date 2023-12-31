import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { imageDataFakeOne, imageDataFakeTwo } from 'src/app/constants/data-fake.model';
import { ImageCommon } from 'src/app/models/image-common.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  cities!: string[];

  images: ImageCommon[] | undefined;
  imageDataFakeOne!: string;
  listImageFake: Array<string> = [];
  starFake: number = 5;

  currentImage: string = '';

  numberOfItem: number = 1;

  responsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  constructor(private router: Router,
            private cartService: CartService,
            private messageService: MessageService
    ){
    
  }

  ngOnInit() {
    this.images = [{id: 1, type:'image', image: imageDataFakeOne},
    {id: 2, type:'video', image: imageDataFakeTwo},
    {id: 3, type:'image', image: imageDataFakeOne},
    {id: 4, type:'image', image: imageDataFakeTwo},
    {id: 5, type:'image', image: imageDataFakeOne},
    {id: 6, type:'image', image: imageDataFakeTwo}];

    this.listImageFake = [imageDataFakeOne, imageDataFakeTwo, imageDataFakeOne, imageDataFakeTwo]

    this.cities = ['Hà nội', 'Hồ Chí Minh']

    this.imageDataFakeOne = imageDataFakeOne;

    this.currentImage = imageDataFakeOne;
  }

  testClick(image: string){
      this.currentImage = image;
  }

  plusItem(){
    this.numberOfItem++;
  }

  removeItem(){
    this.numberOfItem--;
  }

  Checkout(){
    this.router.navigate(['/cart']);
  }

  addToCart(){
    this.cartService.addToCart();
  }



}
