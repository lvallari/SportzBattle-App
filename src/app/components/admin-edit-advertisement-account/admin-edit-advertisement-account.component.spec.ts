import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAdvertisementAccountComponent } from './admin-edit-advertisement-account.component';

describe('AdminEditAdvertisementAccountComponent', () => {
  let component: AdminEditAdvertisementAccountComponent;
  let fixture: ComponentFixture<AdminEditAdvertisementAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditAdvertisementAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditAdvertisementAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
