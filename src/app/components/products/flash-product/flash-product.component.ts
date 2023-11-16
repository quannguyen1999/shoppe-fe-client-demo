import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash-product',
  templateUrl: './flash-product.component.html',
  styleUrls: ['./flash-product.component.scss']
})
export class FlashProductComponent implements OnInit{
  listProductFlashSaleFake: Array<number> = [];

  listItemCategory: Array<string> = [];
  

  ngOnInit(): void {
    this.listProductFlashSaleFake = [1,2,3,4,5,6]

    this.listItemCategory = ['1','2','3','4','5','6','7','8']

  }
 


}
