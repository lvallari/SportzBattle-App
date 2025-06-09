import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatsH2hComponent } from './user-stats-h2h.component';

describe('UserStatsH2hComponent', () => {
  let component: UserStatsH2hComponent;
  let fixture: ComponentFixture<UserStatsH2hComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatsH2hComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserStatsH2hComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
