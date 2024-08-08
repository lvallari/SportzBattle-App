import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFooter3Component } from './question-footer3.component';

describe('QuestionFooter3Component', () => {
  let component: QuestionFooter3Component;
  let fixture: ComponentFixture<QuestionFooter3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionFooter3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionFooter3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
