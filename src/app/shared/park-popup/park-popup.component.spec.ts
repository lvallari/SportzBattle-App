import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkPopupComponent } from './park-popup.component';

describe('ParkPopupComponent', () => {
  let component: ParkPopupComponent;
  let fixture: ComponentFixture<ParkPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
