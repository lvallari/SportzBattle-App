import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSuggestionComponent } from './question-suggestion.component';

describe('QuestionSuggestionComponent', () => {
  let component: QuestionSuggestionComponent;
  let fixture: ComponentFixture<QuestionSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionSuggestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
