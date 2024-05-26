import { Component, Input } from '@angular/core';
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

  @Input() isOnScreenDevice: boolean = false;

  //Define value
  nameBranch: string = NAME_BRANCH;
  isProcessOrderAddress: boolean = false;
  totalProduct: number = 0;
  totalPrice: number = 0;
  displayedColumns: string[] = ['select','product', 'price', 'quantity', 'money', 'function'];
  dataSource = new MatTableDataSource<OrderDetailRequestDto>();
  selection = new SelectionModel<number>(true, []);

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
    ){

  }

  ngOnInit(): void {
    this.updateTotalOrder();
    this.dataSource.data = this.cartService.getOrder().orderDetailRequestDtoList!;
    this.cartService.dataSubject.subscribe((data)=>{
      this.dataSource.data = data.orderDetailRequestDtoList!;
      // this.selection.select(data)
    });
 
    // this.cartService.getOrder().orderDetailRequestDtoList?.forEach(t => {
    //   this.selection.select(t);
    // });
  
    this.selection.changed.subscribe(selection => {
      if(selection.added.length > 0){
        selection.added.forEach(data=>{
          this.cartService.addItemToCheckout(data);
        })
      }

      if(selection.removed.length > 0){
        selection.removed.forEach(data=>{
          this.cartService.removeItemInCheckout(data.productId || -1);
        })
      }

      this.updateTotalOrder();
    })
  }

  updateTotalOrder(){
    const data = this.cartService.getCurrentCheckout();
    this.totalProduct =  data.orderDetailRequestDtoList?.reduce((total, currentItem) => {
      return total + currentItem.quantity!;
    }, 0)!;

    this.totalPrice = data.orderDetailRequestDtoList?.reduce((total, currentItem) => {
    return total + (currentItem.price! * currentItem.quantity!);
    }, 0)!;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    // this.selection.select(...this.dataSource.data);
  }

  isSelected(row: OrderDetailRequestDto){
    let isMatch: boolean = false;
    this.cartService.getCurrentCheckout().orderDetailRequestDtoList?.forEach(t => {
        if(t.productId === row.productId){
          // this.selection.select(row);
          isMatch = true;
        }
    })
    return isMatch;
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      // const numSelected = this.selection.selected.length;
      // const numRows = this.dataSource.data.length;
      // return numSelected === numRows;
      return false;
    }
  
     /** The label for the checkbox on the passed row */
     checkboxLabel(row?: number): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row! + 1}`;
    }
  
    
    plusItem(id: number){
      this.cartService.addItemToCheckoutById(id);
      this.updateTotalOrder();
      this.dataSource.data = this.cartService.getOrder().orderDetailRequestDtoList!;
    }
  
    removeItem(id: number){
      const indexItem = this.cartService.removeItemToCheckoutById(id);
      if(indexItem !== -1){
        this.updateTotalOrder();
      }
      this.dataSource.data = this.cartService.getOrder().orderDetailRequestDtoList!;
    }
  
    removeCart(id: number){
      this.cartService.removeCart(id);
    }
  
    detailProduct(id: string){
      this.router.navigate([PRODUCT_DETAIL, id]);
    }
  
    processOrder(){
      if(this.cartService.getCurrentCheckout().orderDetailRequestDtoList?.length! <= 0){
        this.toastrService.getPopUpErrorTypeString("Tối thiểu 1 order");
      } else {
        this.isProcessOrderAddress = true;
      }
    }

    getDisplayedColumns(): string[] {
      return this.displayedColumns;
    }


}
