import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent implements OnInit{

  @Input() srcImageFake!: string;
  listItemCategoryGroupOne: Array<string> = [];
  listItemCategoryGroupTwo: Array<string> = [];

  groupCategory: Array<string> = [];

  ngOnInit(): void {
    this.groupCategory = ['1','2']
    this.listItemCategoryGroupOne = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
    this.listItemCategoryGroupTwo = ['21','22','23','24','25','26','27','28','29','30','31','32']

  }
  

  

}
