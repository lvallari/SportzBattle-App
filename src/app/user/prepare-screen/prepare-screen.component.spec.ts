import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareScreenComponent } from './prepare-screen.component';

describe('PrepareScreenComponent', () => {
  let component: PrepareScreenComponent;
  let fixture: ComponentFixture<PrepareScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrepareScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
