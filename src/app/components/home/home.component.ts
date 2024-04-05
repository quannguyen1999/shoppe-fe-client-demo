import { Component, OnInit } from '@angular/core';
import { IMAGE_DATA_FAKE_ONE } from 'src/app/constants/constant-value-model';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  //Init
  srcImageFake: string = IMAGE_DATA_FAKE_ONE;
  listItemCategory: Array<string> = [];
  visible: boolean = true;
  isOnScreenDevice: boolean = false;

  constructor(private settingService: SettingService){

  }

  ngOnInit(): void {
    this.listItemCategory = ['1','2','3','4','5','6','7','8'];
    this.settingService.width$.subscribe(width => {
      if(width <= 500){
        this.isOnScreenDevice = true;
      }
    })
  }

  closePopup(){
    this.visible = false;
  }

  onDialogVisibilityChange(event: boolean) {
    if (!event) {
      this.closePopup();
    }
  }


 
}
