import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cart } from 'src/app/models/cart.model';
import {SelectionModel} from '@angular/cdk/collections';
import { dataLoremFake, imageDataFakeOne } from 'src/app/constants/data-fake.model';
import { NAME_BRANCH } from 'src/app/constants/constant-value-model';

const listCart: Cart[] = [
  { 
    position: 1,
    image: imageDataFakeOne,
    description: dataLoremFake,
    product: 'sex toy',
    price: 10000,
    quantity: 10, 
    money: 10000
  },
  { 
    position: 1,
    image: imageDataFakeOne,
    description: dataLoremFake,
    product: 'sex toy',
    price: 10000,
    quantity: 10, 
    money: 10000
  },
  { 
    position: 1,
    image: imageDataFakeOne,
    description: dataLoremFake,
    product: 'sex toy',
    price: 10000,
    quantity: 10, 
    money: 10000
  },
  { 
    position: 1,
    image: imageDataFakeOne,
    description: dataLoremFake,
    product: 'sex toy',
    price: 10000,
    quantity: 10, 
    money: 10000
  },
  { 
    position: 1,
    image: imageDataFakeOne,
    description: dataLoremFake,
    product: 'sex toy',
    price: 10000,
    quantity: 10, 
    money: 10000
  },
  { 
    position: 1,
    image: imageDataFakeOne,
    description: dataLoremFake,
    product: 'sex toy',
    price: 10000,
    quantity: 10, 
    money: 10000
  },
  { 
    position: 1,
    image: imageDataFakeOne,
    description: dataLoremFake,
    product: 'sex toy',
    price: 10000,
    quantity: 10, 
    money: 10000
  },
  { 
    position: 1,
    image: imageDataFakeOne,
    description: dataLoremFake,
    product: 'sex toy',
    price: 10000,
    quantity: 10, 
    money: 10000
  }
]

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  nameBranch: string = NAME_BRANCH;
  displayedColumns: string[] = ['select','product', 'price', 'quantity', 'money', 'function'];
  // displayedColumns: string[] = ['product'];
  dataSource = new MatTableDataSource<Cart>(listCart);
  selection = new SelectionModel<Cart>(true, []);


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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  
  plusItem(){
    // this.numberOfItem++;
  }

  removeItem(){
    // this.numberOfItem--;
  }


}
