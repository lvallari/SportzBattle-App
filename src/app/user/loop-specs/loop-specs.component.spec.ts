import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopSpecsComponent } from './loop-specs.component';

describe('LoopSpecsComponent', () => {
  let component: LoopSpecsComponent;
  let fixture: ComponentFixture<LoopSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoopSpecsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoopSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
