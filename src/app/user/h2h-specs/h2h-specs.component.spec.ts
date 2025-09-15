import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2hSpecsComponent } from './h2h-specs.component';

describe('H2hSpecsComponent', () => {
  let component: H2hSpecsComponent;
  let fixture: ComponentFixture<H2hSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [H2hSpecsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(H2hSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
