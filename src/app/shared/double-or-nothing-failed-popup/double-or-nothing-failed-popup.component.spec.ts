import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleOrNothingFailedPopupComponent } from './double-or-nothing-failed-popup.component';

describe('DoubleOrNothingFailedPopupComponent', () => {
  let component: DoubleOrNothingFailedPopupComponent;
  let fixture: ComponentFixture<DoubleOrNothingFailedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubleOrNothingFailedPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoubleOrNothingFailedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
