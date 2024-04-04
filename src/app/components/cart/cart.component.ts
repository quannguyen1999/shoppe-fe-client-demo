import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cart } from 'src/app/models/cart.model';
import {SelectionModel} from '@angular/cdk/collections';
import { dataLoremFake, imageDataFakeOne } from 'src/app/constants/data-fake.model';
import { NAME_BRANCH } from 'src/app/constants/constant-value-model';
import { CartService } from 'src/app/services/cart.service';
import { Order, OrderDetailRequestDto } from 'src/app/models/order.model';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  ngOnInit(): void {
   
  }

}
