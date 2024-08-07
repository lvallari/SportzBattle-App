import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageUploadComponent } from './profile-image-upload.component';

describe('ProfileImageUploadComponent', () => {
  let component: ProfileImageUploadComponent;
  let fixture: ComponentFixture<ProfileImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileImageUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
