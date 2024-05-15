import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFooter2Component } from './question-footer2.component';

describe('QuestionFooter2Component', () => {
  let component: QuestionFooter2Component;
  let fixture: ComponentFixture<QuestionFooter2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionFooter2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionFooter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
