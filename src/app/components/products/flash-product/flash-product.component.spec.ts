import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashProductComponent } from './flash-product.component';

describe('FlashProductComponent', () => {
  let component: FlashProductComponent;
  let fixture: ComponentFixture<FlashProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashProductComponent]
    });
    fixture = TestBed.createComponent(FlashProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
