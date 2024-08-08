import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWinnersComponent } from './admin-winners.component';

describe('AdminWinnersComponent', () => {
  let component: AdminWinnersComponent;
  let fixture: ComponentFixture<AdminWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWinnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
