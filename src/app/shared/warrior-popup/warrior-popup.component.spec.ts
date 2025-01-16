import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarriorPopupComponent } from './warrior-popup.component';

describe('WarriorPopupComponent', () => {
  let component: WarriorPopupComponent;
  let fixture: ComponentFixture<WarriorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarriorPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarriorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
