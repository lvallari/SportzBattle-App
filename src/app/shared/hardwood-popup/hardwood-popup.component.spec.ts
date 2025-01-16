import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwoodPopupComponent } from './hardwood-popup.component';

describe('HardwoodPopupComponent', () => {
  let component: HardwoodPopupComponent;
  let fixture: ComponentFixture<HardwoodPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardwoodPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HardwoodPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
