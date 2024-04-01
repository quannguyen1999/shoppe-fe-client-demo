import { Component, OnInit } from '@angular/core';
import { imageDataFakeOne } from 'src/app/constants/data-fake.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  srcImageFake: string = imageDataFakeOne;
  listItemCategory: Array<string> = [];
  visible: boolean = true;

  ngOnInit(): void {
    this.listItemCategory = ['1','2','3','4','5','6','7','8']
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
