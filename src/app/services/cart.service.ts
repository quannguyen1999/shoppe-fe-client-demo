import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private messageService: MessageService) { }
  addToCart(){
    this.messageService.add({ severity: 'success', summary: '', detail: 'Thêm giỏ hàng thành công' });
  }
}
