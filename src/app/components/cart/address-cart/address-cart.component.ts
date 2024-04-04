import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order.model';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-address-cart',
  templateUrl: './address-cart.component.html',
  styleUrls: ['./address-cart.component.scss']
})
export class AddressCartComponent {
  listOrders: string[] = [
    "1","2","3","4"
  ]
  orderForm!: FormGroup;

  order! : Order;

  constructor( 
      private fb: FormBuilder,
      private toastrService: ToastrService,
      private accountService: AccountService
    ){
      this.initFormOrder();
    this.accountService.getInfo().subscribe(data=>{
      this.order.name = data.name;
      this.order.address = data.address;
      this.order.phone = data.phone;
      this.order.email = data.email;
      this.order.username = data.username;

      this.orderForm = this.fb.group({
        name:  [this.order.name, Validators.required],
        address:  ['as', Validators.required],
        phone:  [this.order.phone, Validators.required],
        email:[this.order.email, Validators.required],
      });

    })
    this.orderForm = this.initFormOrder();
  }

  initFormOrder(){
    return this.fb.group({
      name:  ['', Validators.required],
      address:  ['', Validators.required],
      phone:  ['', Validators.required],
      email:['', Validators.required],
    });
  }

  getErrorMessage(nameField: string) {
    return this.orderForm.get(nameField)!.hasError('required') ? 'You must enter a ' + nameField + ' value' : '';
  }

  onSubmit(){
    if(this.orderForm.invalid){
      this.toastrService.getPopUpErrorTypeString("Vui Lòng Nhập Thông Tin Hợp Lệ");
      return;
    }
    // const formData: Account = this.accountForm.value;
    // if(this.isEdit){
    //   this.handleResponseSubscription(this.accountService.updateAccount(formData), 'Account Update Success');
    // }else{
    //   this.handleResponseSubscription(this.accountService.createAccount(formData), 'Account Create Success');
    // }
  }

}
