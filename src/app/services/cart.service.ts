import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { MessageService } from 'primeng/api';
import { LocalStorageCustomService } from './local-storage-custom.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Order, OrderRequestModel } from '../models/order.model';
import { ORDER_DATA } from '../constants/constant-value-model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  order: Order = {};
  private dataSubject = new Subject<Order>();

  constructor(private messageService: MessageService,
              private localStorageService: LocalStorageCustomService,
              private accountService: AccountService
    ) { 
      const storedData = localStorageService.getDataInSession(ORDER_DATA);
      if(storedData){
        this.order = JSON.parse(storedData);
      }else{
        this.order = {
          username: accountService.getUserName()!
        }
      }
  }
  addToCart(){
    this.order = {

    }
    this.messageService.add({ severity: 'success', summary: '', detail: 'Thêm giỏ hàng thành công' });
  }
}
