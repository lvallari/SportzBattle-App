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

  accuracy:number = 0;
  time_average:number = 0;
  tokens:number = 0;

  duration:number = 4000;


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

    if (this.stats) {
      console.log('thi.stats', this.stats);
      $('#gameStatsModal').modal('show');
      this.playSound();
      //animate
      this.animateNumberAccuracy(Number(this.stats.accuracy),0);
      this.animateNumberTimeAverage(Number(this.stats.time_average),0);
      this.animateNumberTokens(Number(this.stats.tokens),0);
    }

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

  playSound(): void {
    console.log('play sound');
    const audio = new Audio();
    audio.src = 'assets/sounds/404024__joshuaempyre__victory-percussion-music-cue.mp3';
    
    audio.load();
    audio.play().catch(err => {
      console.error('Audio playback failed:', err);
    });
  }

  private animateNumberAccuracy(target:number,start:number): void {
    const range = target - start;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.duration, 1); // Normalize progress to 0–1
      this.accuracy = Math.floor(start + progress * range);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
  private animateNumberTimeAverage(target:number,start:number): void {
    const range = target - start;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.duration, 1); // Normalize progress to 0–1
      this.time_average = Number((start + progress * range).toFixed(1));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  private animateNumberTokens(target:number,start:number): void {
    const range = target - start;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.duration, 1); // Normalize progress to 0–1
      this.tokens = Math.floor(start + progress * range);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

}
