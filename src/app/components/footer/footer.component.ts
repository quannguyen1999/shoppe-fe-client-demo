import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  listFooterFake: Array<string> = [];
  ngOnInit(): void {
    this.listFooterFake = ['1','2','3','4','5']
  }

}
