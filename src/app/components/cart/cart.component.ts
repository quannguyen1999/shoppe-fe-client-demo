import { Component, OnInit } from '@angular/core';
import { DATA_SIZE_DEVICE } from 'src/app/constants/constant-value-model';
import { SettingService } from 'src/app/services/setting.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  isOnScreenDevice: boolean = false;
  
  constructor(private settingService: SettingService){

  }

  ngOnInit(): void {
    this.settingService.width$.subscribe(width => {
      if(width <= DATA_SIZE_DEVICE){
        this.isOnScreenDevice = true;
      }
    })
  }

}
