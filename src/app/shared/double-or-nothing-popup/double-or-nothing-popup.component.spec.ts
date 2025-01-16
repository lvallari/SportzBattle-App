import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleOrNothingPopupComponent } from './double-or-nothing-popup.component';

describe('DoubleOrNothingPopupComponent', () => {
  let component: DoubleOrNothingPopupComponent;
  let fixture: ComponentFixture<DoubleOrNothingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubleOrNothingPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoubleOrNothingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
