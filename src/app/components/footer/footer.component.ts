import { Component, OnInit } from '@angular/core';
import { DATA_SIZE_DEVICE, NAME_BRANCH } from 'src/app/constants/constant-value-model';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  listFooterFake: Array<string> = [];
  nameBranch: string = NAME_BRANCH;
  isOnScreenDevice: boolean = false;

  constructor(private settingService: SettingService){
    this.settingService.width$.subscribe(width => {
      if(width <= DATA_SIZE_DEVICE){
        this.isOnScreenDevice = true;
      }
    })
  }

  ngOnInit(): void {
    this.listFooterFake = ['1','2','3','4','5']
  }

}
