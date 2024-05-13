import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../../components/timer/timer.component';
import { CommonService } from '../../services/common.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';


@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [CommonModule, TimerComponent, ProgressBarComponent],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.scss'
})
export class GameScreenComponent implements OnInit, OnDestroy {

  message:any;
  options:any[] = [];
  has_joined:boolean = false;
  page:string = 'game';
  debug:boolean = false;
  time!:number;
  skip_one:boolean = true;

  right_answer!:string;
  show_timer:boolean = false;
  countdown_timer!:number;
  time_is_up:boolean = false;

  timerInterval:any;
  banner_index:number = 1;
  
  user_name:string = 'John S.';
  user_points:number = 0;
  user_ranking:number = 3;

  show_point_animation:boolean = false;
  points_value:number = 0;
  lives:number = 3;
  screen_width:number = window.innerWidth;

  users_o:any[] = [
    {position: 1, name: 'Alfred', image: '../../../assets/images/user1.jpeg', points: 112},
    {position: 2, name: 'John', image: '../../../assets/images/user2.jpg', points: 76},
    {position: 3, name: 'Troy', image: '../../../assets/images/user3.jpg', points: 60},
    {position: 4, name: 'Joe', image: '../../../assets/images/user4.jpg', points: 45},
    {position: 5, name: 'Caitlin', image: '../../../assets/images/user5.jpg', points: 39},
    {position: 6, name: 'Charles', image: '../../../assets/images/user6.png', points: 34},
    {position: 7, name: 'Stephanie', image: '../../../assets/images/user7.png', points: 33},
    {position: 8, name: 'Mary', image: '../../../assets/images/user8.jpg', points: 29},
    {position: 9, name: 'Big Bill', image: '../../../assets/images/user9.jpeg', points: 26},
    {position: 10, name: 'MJ', image: '../../../assets/images/user10.jpg', points: 24},
    {position: 11, name: 'Whitney', image: '../../../assets/images/user11.jpg', points: 22},
    {position: 12, name: 'Wendy', image: '../../../assets/images/user12.jpeg', points: 20},
    {position: 13, name: 'Ralph', image: '../../../assets/images/user13.jpeg', points: 18},
    {position: 14, name: 'Brett', image: '../../../assets/images/user14.jpg', points: 16},
    {position: 15, name: 'Sam', image: '../../../assets/images/user15.jpg', points: 12},
  ];

  users:any = [];

  private messagesSubscription!: Subscription;

  constructor(
    public socketioService: SocketioService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {

    
    this.messagesSubscription = this.socketioService._getMessage.subscribe((message: any) => {
      console.log('message', message);
      this.message = message;
      if (this.message) {
        if (this.message.message == 'leaderboard') {
          this.has_joined = true;
          if (this.debug == false) this.page = 'leaderboard';
          clearInterval(this.timerInterval);
          
          this.users = this.users_o.slice(0,8);
          setTimeout(() => {
            this.users = this.users_o.slice(8,16);
          },6500);
        }
        else if (this.message.message == 'advertisement') {
          this.has_joined = true;
          if (this.debug == false) this.page = 'advertisement';
          
          var elapsed_time = 0;
          clearInterval(this.timerInterval);
          this.timerInterval = setInterval(() => {
            elapsed_time += 1;
            if (this.time < 0) this.time = 0;
              
            if (elapsed_time == 10) {
              if (this.debug == false) this.page = 'prepare_screen';
              this.countdown_timer = 3;
              
            }

            this.countdown_timer -= 1;
            if (this.countdown_timer < 0) this.countdown_timer = 0;
          },1000);
         
        }
        else {
          if (this.skip_one == true) {
            this.banner_index = Math.ceil(Math.random()*3);
            if (this.debug == false) this.page = 'game';
            clearInterval(this.timerInterval);
            this.time_is_up = false;
            this.has_joined = true;

            this.right_answer = this.commonService.decrypt('sb', message.key);

            this.options = [];
            this.message.answers.forEach((x: any) => {
              this.options.push({
                text: x,
                is_right_answer: (x == this.right_answer)
              })
            });
          }

          this.time = 7;
          this.show_timer = true;
          var elapsed_time = 0;
          this.skip_one = true;

          this.timerInterval = setInterval(() => {
            this.time -= 1;
            elapsed_time += 1;
            if (this.time < 0) {
              this.time = 0;
              this.time_is_up = true;
            }

            
            if (elapsed_time == 10) {
              if (this.debug == false) this.page = 'prepare_screen';
              this.countdown_timer = 3;
              this.has_joined = true;
            }
            

            this.countdown_timer -= 1;
            if (this.countdown_timer < 0) this.countdown_timer = 0;
            //
          }, 1000);

        }

      }
      //this.messages.push(message);
    });

  }

  answerSelected(option:any){
    
    if (this.screen_width > 768) return;

    console.log('answer selected!', option);
    
    if (option.text == this.right_answer){
      option.show_green = true;
      this.user_points += this.message.value_points;
      this.points_value = this.message.value_points;
      console.log('points_value', this.points_value);
      this.show_point_animation = true;
      setTimeout(() => { this.show_point_animation = false; },1500);
    }
    else {
      option.show_red = true;
      this.lives -= 1;
      if (this.lives == 0) this.gameOver();
    }

    console.log('this.lives', this.lives);

    this.stopTimer();

  }

  gameOver(){
    this.page = 'game_over';
    clearInterval(this.timerInterval);
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();

  }

  stopTimer(){
    this.show_timer = false;
  }

  ngOnDestroy() {
   if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
  }

}
