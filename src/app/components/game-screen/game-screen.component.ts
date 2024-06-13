import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../../components/timer/timer.component';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { TablesService } from '../../services/tables.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { QuestionFooterComponent } from '../question-footer/question-footer.component';
import { SplashComponent } from '../splash/splash.component';
import { PrepareScreenComponent } from '../prepare-screen/prepare-screen.component';
import { UserStatsComponent } from '../user-stats/user-stats.component';
import { GameOverComponent } from '../game-over/game-over.component';
import { QuestionFooter2Component } from '../question-footer2/question-footer2.component';
import { QuestionFooter3Component } from '../question-footer3/question-footer3.component';
import { QuestionFooter4Component } from '../question-footer4/question-footer4.component';
import { AdvertisementPageComponent } from '../advertisement-page/advertisement-page.component';
import { LeaderboardTableComponent } from '../leaderboard-table/leaderboard-table.component';


@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [CommonModule, TimerComponent, ProgressBarComponent, QuestionFooterComponent, UserStatsComponent,
    SplashComponent, PrepareScreenComponent, LeaderboardTableComponent, GameOverComponent, QuestionFooter2Component, 
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

  user:any;
  /*
  user: any = {
    name: 'John S.',
    points: 0,
    rank: 3,
    lives: 5
  }
  */

  show_point_animation: boolean = false;
  points_value: number = 0;
  screen_width: number = window.innerWidth;
  question_active: boolean = false;

  users: any = [];
  start_timestamp = Date.now();
  counter:number = 0;
  cycle_counter:number = 1;
  question_notification!:string;
  game_id!:number;
  game_is_active:boolean = false;

  private messagesSubscription!: Subscription;
  private userServiceSubscription!: Subscription;
  
  constructor(
    public socketioService: SocketioService,
    public commonService: CommonService,
    public userService: UserService,
    public tablesService: TablesService
  ) { }

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      this.user.lives = 5;
      this.user.points = 0;
      this.user.rank = 3;
      console.log('this.user', this.user);
      if (this.user.account_type == 'player'){
        this.createGame();
      }
    });

    this.subscribeToSocket();
  }

  ngOnDestroy() {
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe();
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
          this.question_notification = this.message.value_points + ' Pts';

          setTimeout(() => {
            this.page = 'game';
            this.time_is_up = false;
            this.has_joined = true;
            this.question_active = true;

            this.message.question = this.commonService.decrypt('sb', message.question);
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

              if (elapsed_time == 8){
                this.question_notification = Math.round(Math.random()*100) + '% answered correctly';
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

    //if (this.screen_width > 768 || this.question_active == false) return;
    if (this.user.account_type == 'player' || this.question_active == false) return;

    console.log('answer selected');

    this.question_active = false;
    //clearInterval(this.timerInterval);

    if (option?.text == this.right_answer) {
      option.show_green = true;
      this.user.points += this.message.value_points;
      this.points_value = this.message.value_points;
      this.show_point_animation = true;
      this.storeAnswer(true);
      setTimeout(() => { this.show_point_animation = false; }, 1500);
    }
    else {
      if (option) option.show_red = true;
      this.storeAnswer(false);
      this.user.lives -= 1;
    }

    //console.log('this.lives', this.user.lives);

    this.stopTimer();

  }

  gameOver() {
    this.page = 'game_over';
    this.game_is_active = false;

    //update game record
    var object = {
      game_id: this.game_id,
      score: this.user.points
    }

    this.tablesService.UpdateItem('games', 'game_id', object).subscribe();

    clearInterval(this.timerInterval);
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();

  }

  stopTimer() {
    this.show_timer = false;
  }

  playAgain() {
    this.user.lives = 5;
    this.has_joined = false;
    this.page = 'game';
    this.subscribeToSocket();
  }

  storeAnswer(value:boolean){
    
    if (this.game_is_active != true) return;

    var object = {
      user_id: this.user.user_id,
      got_it_right: value,
      game_id: this.game_id,
      question_id: this.message.question_id
    }

    this.tablesService.AddItem('user_activity', object).subscribe();
    console.log('answer stored');
  }

  createGame(){

    //create game
    var game = {
      user_id: this.user.user_id,
      //date: this.commonService.getDateString(),
      venue_id: 1,
      timestamp: Date.now(),
      score: 0
    }

    this.tablesService.AddItem('games', game).subscribe((data:any) => {
      console.log('game created!', data);
      this.game_id = data.id;
      this.game_is_active = true;
    });
  }

}
