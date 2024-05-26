import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { MessageService } from 'primeng/api';
import { LocalStorageCustomService } from './local-storage-custom.service';
import { Subject } from 'rxjs';
import { Order, OrderDetailRequestDto } from '../models/order.model';
import { AccountService } from './account.service';
import { KEY_CHECKOUT_DATA, KEY_ORDER_DATA } from '../constants/constant-value-model';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //Init
  order: Order = {
    orderDetailRequestDtoList: []
  };

  // checkoutOrder: Order = {
  //   orderDetailRequestDtoList: []
  // }

  public dataSubject = new Subject<Order>();

  constructor(private toastrService: ToastrService,
              private localStorageService: LocalStorageCustomService,
              private accountService: AccountService,

    ) { 
     
  }

  getOrder(){
    const storedData = this.localStorageService.getDataInStorage(KEY_ORDER_DATA);
    if(storedData){
      this.order = JSON.parse(storedData);
    }
    return this.order;
  }

  getCurrentCheckout(){
    let data: Order = {
      orderDetailRequestDtoList: []
    };
    const storedData = this.localStorageService.getDataInStorage(KEY_CHECKOUT_DATA);
    if(storedData){
      data = JSON.parse(storedData);
    }
    return data;
  }

  addItemToCheckout(orderDetail: OrderDetailRequestDto){
    let data: Order = {
      orderDetailRequestDtoList: []
    };
    const storedData = this.localStorageService.getDataInStorage(KEY_CHECKOUT_DATA);
    if(storedData){
      data = JSON.parse(storedData);
    }
    data.orderDetailRequestDtoList?.push(orderDetail);
    this.localStorageService.setDataInStorage(KEY_CHECKOUT_DATA, data);
     
  }

  addItemToCheckoutById(id: number){
    let dataOrder = this.getOrder() || {};
    let dataCheckout = this.getCurrentCheckout() || {};

    let getListOrder = dataOrder.orderDetailRequestDtoList || [];
    let getListCheckout = dataCheckout.orderDetailRequestDtoList || []; 

    let indexItem = getListOrder.findIndex((data)=> data.productId == id);
    if(indexItem !== -1){
      getListOrder[indexItem].quantity = getListOrder[indexItem].quantity! + 1;
      dataOrder.orderDetailRequestDtoList = getListOrder;
      this.localStorageService.setDataInStorage(KEY_ORDER_DATA, dataOrder);
    }

    let index = getListCheckout.findIndex(item => item.productId === id)!;
    if(index !== -1){
      getListCheckout![index].quantity = getListCheckout![index].quantity! + 1;
      dataCheckout.orderDetailRequestDtoList = getListCheckout;
      this.localStorageService.setDataInStorage(KEY_CHECKOUT_DATA, dataCheckout)
    }
  }

  removeItemToCheckoutById(id: number){
    let dataOrder = this.getOrder();
    let dataCheckout = this.getCurrentCheckout();

    let getListOrder = dataOrder.orderDetailRequestDtoList || [];
    let getListCheckout = dataCheckout.orderDetailRequestDtoList || []; 

    const indexItem = getListOrder.findIndex((data)=> data.productId == id);
    if(indexItem !== -1){
      if(getListOrder[indexItem].quantity! <= 1){
        return -1;
      }
      getListOrder[indexItem].quantity = getListOrder[indexItem].quantity! - 1;
      dataOrder.orderDetailRequestDtoList = getListOrder;
      this.localStorageService.setDataInStorage(KEY_ORDER_DATA, dataOrder);

      let index = getListCheckout.findIndex(item => item.productId === id)!;
      
      if(index !== -1){
        getListCheckout[index].quantity = getListCheckout[index].quantity! - 1;
        dataCheckout.orderDetailRequestDtoList = getListCheckout;
        this.localStorageService.setDataInStorage(KEY_CHECKOUT_DATA, dataCheckout)
      }   
    }
    return indexItem;

  }

  removeItemInCheckout(productId: number){
    if(productId == -1){
      return;
    }
    let data = this.getCurrentCheckout() || {};
    let index = data.orderDetailRequestDtoList?.findIndex(item => item.productId === productId)!;
    console.log(index)
    if(index !== -1){
      data.orderDetailRequestDtoList?.splice(index, 1);
    }

    this.localStorageService.setDataInStorage(KEY_CHECKOUT_DATA, data);
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
    this.toastrService.getPopUpSuccess("Thêm Vào Giỏ Hàng Thành Công");
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
