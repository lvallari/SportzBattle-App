import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFooter4Component } from './question-footer4.component';

describe('QuestionFooter4Component', () => {
  let component: QuestionFooter4Component;
  let fixture: ComponentFixture<QuestionFooter4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionFooter4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionFooter4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
