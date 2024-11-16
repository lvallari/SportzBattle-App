import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAdManagerComponent } from './business-ad-manager.component';

describe('BusinessAdManagerComponent', () => {
  let component: BusinessAdManagerComponent;
  let fixture: ComponentFixture<BusinessAdManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessAdManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessAdManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
