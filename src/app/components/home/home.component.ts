import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  dataFake: Array<string> = [];

  responsiveOptions: any[] | undefined;

  constructor() {}

  ngOnInit() {

    this.dataFake.push("a");
    this.dataFake.push("b");
    this.dataFake.push("c");

    console.log(this.dataFake)

     this.responsiveOptions = [
          {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }
}
