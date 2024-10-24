import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnFirePopupComponent } from './on-fire-popup.component';

describe('OnFirePopupComponent', () => {
  let component: OnFirePopupComponent;
  let fixture: ComponentFixture<OnFirePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnFirePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnFirePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
