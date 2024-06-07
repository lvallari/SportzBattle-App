import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDashboardGraphComponent } from './business-dashboard-graph.component';

describe('BusinessDashboardGraphComponent', () => {
  let component: BusinessDashboardGraphComponent;
  let fixture: ComponentFixture<BusinessDashboardGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessDashboardGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessDashboardGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
