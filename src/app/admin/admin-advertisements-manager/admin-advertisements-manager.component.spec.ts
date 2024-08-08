import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdvertisementsManagerComponent } from './admin-advertisements-manager.component';

describe('AdminAdvertisementsManagerComponent', () => {
  let component: AdminAdvertisementsManagerComponent;
  let fixture: ComponentFixture<AdminAdvertisementsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAdvertisementsManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAdvertisementsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
