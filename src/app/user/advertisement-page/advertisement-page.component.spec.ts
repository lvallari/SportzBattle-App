import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementPageComponent } from './advertisement-page.component';

describe('AdvertisementPageComponent', () => {
  let component: AdvertisementPageComponent;
  let fixture: ComponentFixture<AdvertisementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
