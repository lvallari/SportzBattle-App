import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainiacPopupComponent } from './brainiac-popup.component';

describe('BrainiacPopupComponent', () => {
  let component: BrainiacPopupComponent;
  let fixture: ComponentFixture<BrainiacPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrainiacPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrainiacPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
