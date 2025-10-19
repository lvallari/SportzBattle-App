import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsufficientFundsComponent } from './insufficient-funds.component';

describe('InsufficientFundsComponent', () => {
  let component: InsufficientFundsComponent;
  let fixture: ComponentFixture<InsufficientFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsufficientFundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsufficientFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
