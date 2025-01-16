import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridionPopupComponent } from './gridion-popup.component';

describe('GridionPopupComponent', () => {
  let component: GridionPopupComponent;
  let fixture: ComponentFixture<GridionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridionPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
