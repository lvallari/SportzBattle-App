import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {

  @Output() playAgain = new EventEmitter();

  constructor(
    public router:Router
  ){}

  startAgain(){
    this.playAgain.emit();
  }

  gotoDashboard(){
    this.router.navigate(['user/user-dashboard']);
  }

}
