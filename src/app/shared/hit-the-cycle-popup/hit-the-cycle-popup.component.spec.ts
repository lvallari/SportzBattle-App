import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitTheCyclePopupComponent } from './hit-the-cycle-popup.component';

describe('HitTheCyclePopupComponent', () => {
  let component: HitTheCyclePopupComponent;
  let fixture: ComponentFixture<HitTheCyclePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HitTheCyclePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HitTheCyclePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
