import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRollerPopupComponent } from './high-roller-popup.component';

describe('HighRollerPopupComponent', () => {
  let component: HighRollerPopupComponent;
  let fixture: ComponentFixture<HighRollerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighRollerPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighRollerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
