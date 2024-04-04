import { Component } from '@angular/core';

@Component({
  selector: 'app-result-cart',
  templateUrl: './result-cart.component.html',
  styleUrls: ['./result-cart.component.scss']
})
export class ResultCartComponent {
  listOrders: string[] = [
    "1","2","3","4"
  ]

}
