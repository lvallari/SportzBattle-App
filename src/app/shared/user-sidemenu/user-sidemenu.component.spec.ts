import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidemenuComponent } from './user-sidemenu.component';

describe('UserSidemenuComponent', () => {
  let component: UserSidemenuComponent;
  let fixture: ComponentFixture<UserSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSidemenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
