import { Component, OnInit } from '@angular/core';
import { NAME_BRANCH } from 'src/app/constants/constant-value-model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  listFooterFake: Array<string> = [];
  nameBranch: string = NAME_BRANCH;
  ngOnInit(): void {
    this.listFooterFake = ['1','2','3','4','5']
  }

}
