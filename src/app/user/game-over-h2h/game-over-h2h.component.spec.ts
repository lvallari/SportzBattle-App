import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverH2hComponent } from './game-over-h2h.component';

describe('GameOverH2hComponent', () => {
  let component: GameOverH2hComponent;
  let fixture: ComponentFixture<GameOverH2hComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverH2hComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameOverH2hComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
