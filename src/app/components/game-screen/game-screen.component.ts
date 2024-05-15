import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../../components/timer/timer.component';
import { CommonService } from '../../services/common.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { QuestionFooterComponent } from '../question-footer/question-footer.component';
import { SplashComponent } from '../splash/splash.component';
import { PrepareScreenComponent } from '../prepare-screen/prepare-screen.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { UserStatsComponent } from '../user-stats/user-stats.component';
import { GameOverComponent } from '../game-over/game-over.component';
import { QuestionFooter2Component } from '../question-footer2/question-footer2.component';
import { QuestionFooter3Component } from '../question-footer3/question-footer3.component';
import { QuestionFooter4Component } from '../question-footer4/question-footer4.component';
import { AdvertisementPageComponent } from '../advertisement-page/advertisement-page.component';


@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [CommonModule, TimerComponent, ProgressBarComponent, QuestionFooterComponent, UserStatsComponent,
    SplashComponent, PrepareScreenComponent, LeaderboardComponent, GameOverComponent, QuestionFooter2Component, 
    QuestionFooter3Component, QuestionFooter4Component, AdvertisementPageComponent],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.scss'
})
export class GameScreenComponent implements OnInit, OnDestroy {

  message: any;
  options: any[] = [];
  has_joined: boolean = false;
  page: string = 'game';
  debug: boolean = false;
  time!: number;
  
  right_answer!: string;
  show_timer: boolean = false;
  time_is_up: boolean = false;

  timerInterval: any;

  user: any = {
    name: 'John S.',
    points: 0,
    rank: 3,
    lives: 5
  }

  show_point_animation: boolean = false;
  points_value: number = 0;
  screen_width: number = window.innerWidth;
  question_active: boolean = false;

  users: any = [];
  start_timestamp = Date.now();
  counter:number = 0;
  cycle_counter:number = 1;

  private messagesSubscription!: Subscription;

  constructor(
    public socketioService: SocketioService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.subscribeToSocket();
  }

  subscribeToSocket() {
    this.messagesSubscription = this.socketioService._getMessage.subscribe((message: any) => {
      console.log('message', message);

      //check that a minimum of 5 sec have passed since loading
      var delta = Date.now() - this.start_timestamp;

      if (message && delta > 5000) {
        clearInterval(this.timerInterval);

        if (this.user.lives <= 0) {
          this.gameOver();
          return;
        }

        this.message = message;
        this.has_joined = true;
        if (this.message.message == 'leaderboard') this.page = 'leaderboard';
        else if (this.message.message == 'advertisement') {
          this.page = 'advertisement';
          this.cycle_counter += 1;
        }
        else {

          this.counter += 1;
          this.page = 'prepare_screen';

          setTimeout(() => {
            this.page = 'game';
            this.time_is_up = false;
            this.has_joined = true;
            this.question_active = true;

            this.right_answer = this.commonService.decrypt('sb', message.key);

            this.options = [];
            this.message.answers.forEach((x: any) => {
              this.options.push({
                text: x,
                is_right_answer: (x == this.right_answer)
              })
            });

            this.time = 7;
            this.show_timer = true;
            var elapsed_time = 0;
            
            this.timerInterval = setInterval(() => {
              this.time -= 1;
              elapsed_time += 1;
              if (this.time < 0) {
                this.time = 0;
                this.time_is_up = true;
                if (this.question_active == true) this.answerSelected(undefined);
              }


              if (elapsed_time == 10) {
                if (this.user.lives <= 0) {
                  this.gameOver();
                  return;
                }
              }
              //
            }, 1000);
          }, 4000);
        }

      }
      //this.messages.push(message);
    });
  }

  answerSelected(option: any) {

    if (this.screen_width > 768 || this.question_active == false) return;

    console.log('answer selected!', option);
    this.question_active = false;
    //clearInterval(this.timerInterval);

    if (option?.text == this.right_answer) {
      option.show_green = true;
      this.user.points += this.message.value_points;
      this.points_value = this.message.value_points;
      console.log('points_value', this.points_value);
      this.show_point_animation = true;
      setTimeout(() => { this.show_point_animation = false; }, 1500);
    }
    else {
      if (option) option.show_red = true;
      this.user.lives -= 1;
    }

    console.log('this.lives', this.user.lives);

    this.stopTimer();

  }

  gameOver() {
    this.page = 'game_over';
    clearInterval(this.timerInterval);
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();

  }

  stopTimer() {
    this.show_timer = false;
  }

  playAgain() {
    this.user.lives = 3;
    this.has_joined = false;
    this.page = 'game';
    this.subscribeToSocket();
  }

  ngOnDestroy() {
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
  }

}
