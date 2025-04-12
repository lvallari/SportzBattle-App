import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsterraComponent } from './adsterra.component';

describe('AdsterraComponent', () => {
  let component: AdsterraComponent;
  let fixture: ComponentFixture<AdsterraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsterraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdsterraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
