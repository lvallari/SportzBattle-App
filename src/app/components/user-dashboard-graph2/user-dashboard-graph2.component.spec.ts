import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardGraph2Component } from './user-dashboard-graph2.component';

describe('UserDashboardGraph2Component', () => {
  let component: UserDashboardGraph2Component;
  let fixture: ComponentFixture<UserDashboardGraph2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardGraph2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDashboardGraph2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
