import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingUtilComponent } from './loading-util.component';

describe('LoadingUtilComponent', () => {
  let component: LoadingUtilComponent;
  let fixture: ComponentFixture<LoadingUtilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingUtilComponent]
    });
    fixture = TestBed.createComponent(LoadingUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
