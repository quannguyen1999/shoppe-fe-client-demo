import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SettingService } from './setting.service';
import { DATA_SIZE_DEVICE, ERROR_VALUE, SUCCESS_VALUE } from '../constants/constant-value-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  isOnScreenDevice: boolean = false;

  constructor(
    private messageService: MessageService,
    private settingService: SettingService
    ) {
      this.settingService.width$.subscribe(width => {
        if(width <= DATA_SIZE_DEVICE){
          this.isOnScreenDevice = true;
        }
      })
  }

  getPopUpSuccess(message: string){
    this.handlerPopup(SUCCESS_VALUE, SUCCESS_VALUE, message);
  }

  getPopUpErrorTypeString(value: any){
    this.handlerPopup(ERROR_VALUE, ERROR_VALUE, value);
  }

  getPopUpInternalServerError(){
    this.handlerPopup(ERROR_VALUE, ERROR_VALUE, 'Internal Server Error')
  }

  handlerPopup(type: string, summary: string, detail: string){
    this.messageService.clear();
    if(this.isOnScreenDevice){
      this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Message Content' });
  
    }else{
      this.messageService.add({severity:type, summary: summary, detail: detail});
    }

          
  }

}
