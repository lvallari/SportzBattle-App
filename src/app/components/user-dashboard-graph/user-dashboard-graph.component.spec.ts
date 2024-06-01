import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardGraphComponent } from './user-dashboard-graph.component';

describe('UserDashboardGraphComponent', () => {
  let component: UserDashboardGraphComponent;
  let fixture: ComponentFixture<UserDashboardGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDashboardGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
