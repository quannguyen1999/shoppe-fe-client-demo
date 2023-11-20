import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { imageDataFakeThree } from './constants/data-fake.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  imgFake: string = imageDataFakeThree;
  visible: boolean = true;

  closePopup(){
    this.visible = false;
  }

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        let url = val.url;
        // this.visible = url === '/home' || url === '/';
        this.visible = false;
      }
    })
  }
}
