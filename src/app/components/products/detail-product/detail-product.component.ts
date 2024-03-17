import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DEFAULT_PRODUCT_COLUMNS } from 'src/app/constants/constant-value-model';
import { imageDataFakeOne, imageDataFakeTwo } from 'src/app/constants/data-fake.model';
import { ImageCommon } from 'src/app/models/image-common.model';
import { Product, ProductRequestModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  productRequestModel: ProductRequestModel = {
    id: '',
    name: '',
    image: '',
    quantity: 0,
    price: 0,
    discount: 0,
    idCategory: '',
    createFromDate: null,
    createToDate: null,
    listSorted: null,
    listFields: DEFAULT_PRODUCT_COLUMNS,
    isGetTopProduct: false,
    isSuggestProduct: false
  };
  
  cities!: string[];

  images: ImageCommon[] | undefined;
  imageDataFakeOne!: string;
  listImageFake: Array<string> = [];
  starFake: number = 5;

  currentImage: string = '';

  numberOfItem: number = 1;

  product: Product = {
    id: 0,
    name: '',
    image: '',
    quantity: 0,
    price: 0,
    discount: 0,
    description: ''
  };

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
            private messageService: MessageService,
            private productService: ProductService,
            private routerActive: ActivatedRoute,
            private toastrService: ToastrService
    ){
     this.productRequestModel.id = this.routerActive.snapshot.params['id'];
     this.productService.getListProduct(0, 1, DEFAULT_PRODUCT_COLUMNS, this.productRequestModel).subscribe(
      (data)=>{
        this.product = data.data[0];
        this.listImageFake = [this.product.image];
        this.images = [{id: 1, type:'image', image: this.product.image},
    {id: 2, type:'video', image: this.product.image},
    {id: 3, type:'image', image: this.product.image},
    {id: 4, type:'image', image: this.product.image},
    {id: 5, type:'image', image: this.product.image},
    {id: 6, type:'image', image: this.product.image}];
        this.cities = ['Hà nội', 'Hồ Chí Minh']

        this.imageDataFakeOne = imageDataFakeOne;

        this.currentImage = imageDataFakeOne;
      },
      (error)=>{
        toastrService.getPopUpErrorTypeString("Internal Server Error");
      }
     )
  }

  ngOnInit() {
    // this.images = [{id: 1, type:'image', image: imageDataFakeOne},
    // {id: 2, type:'video', image: imageDataFakeTwo},
    // {id: 3, type:'image', image: imageDataFakeOne},
    // {id: 4, type:'image', image: imageDataFakeTwo},
    // {id: 5, type:'image', image: imageDataFakeOne},
    // {id: 6, type:'image', image: imageDataFakeTwo}];

    // this.listImageFake = [imageDataFakeOne, imageDataFakeTwo, imageDataFakeOne, imageDataFakeTwo]

    
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
