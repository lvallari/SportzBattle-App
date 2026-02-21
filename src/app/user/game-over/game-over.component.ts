import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent implements OnInit{

  @Output() playAgain = new EventEmitter();
  @Input() game!:string;
  @Input() stats!:any;

  message!:string;

  constructor(
    public router:Router
  ){}

  ngOnInit(): void {
    var messages = [
      'Challenge a friend to beat your score!',
      'Share your rankings within your group chat!',
      'Play again and try and top your score!',
      'Be sure to check us out and like/follow us on the socials!',
      'Be sure to share the game and help build and grow SportzBattle\'s user base!'
    ];

    this.message = messages[Math.floor(Math.random() * 5)];

    if (this.stats) $('#gameStatsModal').modal('show');

  }

  startAgain(){
    this.playAgain.emit();
  }

  gotoDashboard(){
    this.router.navigate(['user/user-dashboard']);
  }

  closeModal(name:string){
    $('#' + name).modal('hide');
  }

}
