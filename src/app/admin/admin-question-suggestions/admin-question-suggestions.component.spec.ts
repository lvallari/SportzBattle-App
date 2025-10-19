import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionSuggestionsComponent } from './admin-question-suggestions.component';

describe('AdminQuestionSuggestionsComponent', () => {
  let component: AdminQuestionSuggestionsComponent;
  let fixture: ComponentFixture<AdminQuestionSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestionSuggestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuestionSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
