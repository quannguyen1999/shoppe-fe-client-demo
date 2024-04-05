import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cart } from 'src/app/models/cart.model';
import {SelectionModel} from '@angular/cdk/collections';
import { NAME_BRANCH, PRODUCT_DETAIL } from 'src/app/constants/constant-value-model';
import { CartService } from 'src/app/services/cart.service';
import { Order, OrderDetailRequestDto } from 'src/app/models/order.model';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.scss']
})
export class DetailCartComponent {
  //Define value
  nameBranch: string = NAME_BRANCH;
  isProcessOrderAddress: boolean = false;
  totalProduct: number = 0;
  totalPrice: number = 0;
  displayedColumns: string[] = ['select','product', 'price', 'quantity', 'money', 'function'];
  dataSource = new MatTableDataSource<OrderDetailRequestDto>();
  selection = new SelectionModel<OrderDetailRequestDto>(true, []);
  orderSession: Order = {};
  orderBuy: Order = {
    orderDetailRequestDtoList: []
  };

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
    ){

  }

  ngOnInit(): void {
    this.dataSource.data = this.cartService.getOrder().orderDetailRequestDtoList!;
    this.cartService.dataSubject.subscribe((data)=>{
      this.orderSession = data;
      this.dataSource.data = this.orderSession.orderDetailRequestDtoList!;
    });

    this.selection.changed.subscribe(selection => {
      if(selection.added.length > 0){
        selection.added.forEach(data=>{
          this.orderBuy.orderDetailRequestDtoList?.push(data);
        })
      }

      if(selection.removed.length > 0){
        selection.removed.forEach(data=>{
          const index = this.orderBuy.orderDetailRequestDtoList?.findIndex(item => item.productId === data.productId)!;
          if(index !== -1){
            this.orderBuy.orderDetailRequestDtoList?.splice(index, 1);
          }
        })
      }

      this.updateTotalOrder();
    })
  }

  updateTotalOrder(){
    this.totalProduct =  this.orderBuy.orderDetailRequestDtoList?.reduce((total, currentItem) => {
      return total + currentItem.quantity!;
    }, 0)!;

    this.totalPrice = this.orderBuy.orderDetailRequestDtoList?.reduce((total, currentItem) => {
    return total + (currentItem.price! * currentItem.quantity!);
    }, 0)!;
  }



  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
     /** The label for the checkbox on the passed row */
     checkboxLabel(row?: Cart): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position! + 1}`;
    }
  
    
    plusItem(id: number){
      const indexItem = this.dataSource.data.findIndex((data)=> data.productId == id);
      if(indexItem !== -1){
        this.dataSource.data[indexItem].quantity = this.dataSource.data[indexItem].quantity! + 1;
      }
  
      const index = this.orderBuy.orderDetailRequestDtoList?.findIndex(item => item.productId === id)!;
      if(index !== -1){
        this.orderBuy.orderDetailRequestDtoList![index].quantity = this.orderBuy.orderDetailRequestDtoList![index].quantity! + 1;
      }
  
      this.updateTotalOrder();
  
    }
  
    removeItem(id: number){
      const indexItem = this.dataSource.data.findIndex((data)=> data.productId == id);
      if(indexItem !== -1){
        if(this.dataSource.data[indexItem].quantity! <= 1){
          return;
        }
        this.dataSource.data[indexItem].quantity = this.dataSource.data[indexItem].quantity! - 1;
  
        const index = this.orderBuy.orderDetailRequestDtoList?.findIndex(item => item.productId === id)!;
        
        if(index !== -1){
          this.orderBuy.orderDetailRequestDtoList![index].quantity = this.orderBuy.orderDetailRequestDtoList![index].quantity! - 1;
        }
        
        this.updateTotalOrder();
      }
    }
  
    removeCart(id: number){
      this.cartService.removeCart(id);
    }
  
    detailProduct(id: string){
      this.router.navigate([PRODUCT_DETAIL, id]);
    }
  
    processOrder(){
      if(this.orderBuy.orderDetailRequestDtoList?.length! <= 0){
        this.toastrService.getPopUpErrorTypeString("Tối thiểu 1 order");
      }
      this.isProcessOrderAddress = true;
    }


}
