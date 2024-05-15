import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {

  @Output() playAgain = new EventEmitter();

  startAgain(){
    this.playAgain.emit();
  }

}
