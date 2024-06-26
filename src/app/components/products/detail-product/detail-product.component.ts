import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DATA_SIZE_DEVICE, DEFAULT_PRODUCT_COLUMNS, NAME_BRANCH } from 'src/app/constants/constant-value-model';
import { ImageCommon } from 'src/app/models/image-common.model';
import { Product, ProductRequestModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SettingService } from 'src/app/services/setting.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  //Init
  productRequestModel: ProductRequestModel = {
    quantity: 0,
    price: 0,
    discount: 0,
    listFields: DEFAULT_PRODUCT_COLUMNS,
    isGetTopProduct: false,
    isSuggestProduct: false
  };
  isOnScreenDevice: boolean = false;
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
  nameBranch: string = NAME_BRANCH;
  cities!: string[];
  images: ImageCommon[] | undefined;
  listImageFake: Array<string> = [];
  starFake: number = 5;
  currentImage: string = '';
  numberOfItem: number = 1;

  constructor(private router: Router,
            private cartService: CartService,
            private messageService: MessageService,
            private productService: ProductService,
            private routerActive: ActivatedRoute,
            private toastrService: ToastrService,
            private settingService: SettingService
    ){
      router.events.subscribe((val) => {
        if(val instanceof ActivationEnd){
          this.productRequestModel.id = val.snapshot.params['id'];
          this.productService.getListProduct(0, 1, DEFAULT_PRODUCT_COLUMNS, this.productRequestModel).subscribe({
            next: data => {
              this.product = data.data![0];
              this.listImageFake = [this.product.image!];
              this.images = [{id: 1, type:'image', image: this.product.image!},
              {id: 2, type:'video', image: this.product.image!},
              {id: 3, type:'image', image: this.product.image!},
              {id: 4, type:'image', image: this.product.image!}];
              this.cities = ['Hà nội', 'Hồ Chí Minh']
            },
            error: data => {
              this.toastrService.getPopUpInternalServerError();
            }
          })
        };
    });

      this.settingService.width$.subscribe(width => {
        if(width <= DATA_SIZE_DEVICE){
          this.isOnScreenDevice = true;
        }
      })
  }


  ngOnInit() {
 
  }

  testClick(image: string){
      this.currentImage = image;
  }

  plusItem(){
    this.numberOfItem++;
  }

  removeItem(){
    if(this.numberOfItem <= 0){
      return;
    }
    this.numberOfItem--;
  }

  Checkout(){
    this.router.navigate(['/cart']);
  }

  addToCart(){
    let productSave: Product = {... this.product};
    productSave.quantity = this.numberOfItem;
    this.cartService.addToCart(productSave);
  }



}
