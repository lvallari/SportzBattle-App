import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gameh2hComponent } from './gameh2h.component';

describe('Gameh2hComponent', () => {
  let component: Gameh2hComponent;
  let fixture: ComponentFixture<Gameh2hComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gameh2hComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Gameh2hComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
