import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { MessageService } from 'primeng/api';
import { LocalStorageCustomService } from './local-storage-custom.service';
import { Subject } from 'rxjs';
import { Order, OrderDetailRequestDto } from '../models/order.model';
import { AccountService } from './account.service';
import { KEY_ORDER_DATA } from '../constants/constant-value-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //Init
  order: Order = {
    orderDetailRequestDtoList: []
  };
  public dataSubject = new Subject<Order>();

  constructor(private messageService: MessageService,
              private localStorageService: LocalStorageCustomService,
              private accountService: AccountService
    ) { 
     
  }

  getOrder(){
    const storedData = this.localStorageService.getDataInStorage(KEY_ORDER_DATA);
    if(storedData){
      this.order = JSON.parse(storedData);
    }
    return this.order;
  }

  addToCart(product: Product){
    const orderDetail: OrderDetailRequestDto = {
      productId: product.id,
      quantity: product.quantity,
      image: product.image,
      description: product.description,
      price: product.price,
      discount: product.discount
    };

    //check if the list order detail is null or not 
    if(!this.order.orderDetailRequestDtoList){
      this.order.orderDetailRequestDtoList = [];
    }

    //Find the index of the existing record 
    const existingIndex = this.order.orderDetailRequestDtoList.findIndex(detail => detail.productId === product.id);
    if(existingIndex !== -1){
      this.order.orderDetailRequestDtoList[existingIndex].quantity!+=product.quantity!;
    }else{
      this.order.orderDetailRequestDtoList?.push(orderDetail);
    }
    this.localStorageService.setDataInStorage(KEY_ORDER_DATA, this.order);
    this.messageService.add({ severity: 'success', summary: '', detail: 'Thêm giỏ hàng thành công' });
    this.dataSubject.next(this.order);
  }

  removeCart(id: number){
    const removeIndex: number = this.getOrder().orderDetailRequestDtoList?.findIndex(element => element.productId === id)!;
    if(removeIndex !== -1){
      this.order.orderDetailRequestDtoList?.splice(removeIndex, 1);
    }
    this.localStorageService.setDataInStorage(KEY_ORDER_DATA, this.order);
    this.dataSubject.next(this.order);

  }
}
