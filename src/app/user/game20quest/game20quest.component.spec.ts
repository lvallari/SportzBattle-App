import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Game20questComponent } from './game20quest.component';

describe('Game20questComponent', () => {
  let component: Game20questComponent;
  let fixture: ComponentFixture<Game20questComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Game20questComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Game20questComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
