import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserVerificationComponent } from './admin-user-verification.component';

describe('AdminUserVerificationComponent', () => {
  let component: AdminUserVerificationComponent;
  let fixture: ComponentFixture<AdminUserVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
