import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { imageDataFakeThree } from './constants/data-fake.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgFake: string = imageDataFakeThree;
  visible: boolean = true;
  closePopup(){
    this.visible = false;
  }
}
