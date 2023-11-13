import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tip-carousel',
  templateUrl: './tip-carousel.component.html',
  styleUrls: ['./tip-carousel.component.scss']
})
export class TipCarouselComponent {
  @Input() srcImageFake!: string;
  @Input() listItemCategory!: Array<string>;
}
