import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quest20SpecsComponent } from './quest20-specs.component';

describe('Quest20SpecsComponent', () => {
  let component: Quest20SpecsComponent;
  let fixture: ComponentFixture<Quest20SpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quest20SpecsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Quest20SpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
