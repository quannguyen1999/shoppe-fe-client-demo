import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipCarouselComponent } from './tip-carousel.component';

describe('TipCarouselComponent', () => {
  let component: TipCarouselComponent;
  let fixture: ComponentFixture<TipCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipCarouselComponent]
    });
    fixture = TestBed.createComponent(TipCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
