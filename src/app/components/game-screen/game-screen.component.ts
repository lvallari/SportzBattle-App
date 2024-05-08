import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../../components/timer/timer.component';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.scss'
})
export class GameScreenComponent implements OnInit, OnDestroy {

  question!:string;
  options!:any[];
  has_joined:boolean = false;
  page:string = 'game';
  time!:number;

  right_answer!:string;
  show_timer:boolean = false;

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
      if (message) {
        if (message.message == 'leaderboard') {
          this.page = 'leaderboard';
          this.users = this.users_o.slice(0,8);
          setTimeout(() => {
            this.users = this.users_o.slice(8,16);
          },5000);
        }
        else if (message.message == 'advertisement') {
          this.page = 'advertisement';
         
        }
        else {
          this.page = 'game';
          this.question = message.question;
          var answers = message.answers;
          this.has_joined = true;

          this.right_answer = this.commonService.decrypt('sb',message.key);

          this.options = [];
          answers.forEach((x:any) => {
            this.options.push({
              text: x,
              is_right_answer: (x == this.right_answer)
            })
          })

          this.time = 7;
          this.show_timer = true;
          setTimeout(() => {this.time = 6},1000);
          setTimeout(() => {this.time = 5},2000);
          setTimeout(() => {this.time = 4},3000);
          setTimeout(() => {this.time = 3},4000);
          setTimeout(() => {this.time = 2},5000);
          setTimeout(() => {this.time = 1},6000);
          setTimeout(() => {this.time = 0},7000);
        }

      }
      //this.messages.push(message);
    });

  }

  answerSelected(option:any){

    console.log('answer selected!', option);
    
    if (option.text == this.right_answer){
      option.show_green = true;
    }
    else option.show_red = true;

    this.stopTimer();

  }

  stopTimer(){
    this.show_timer = false;
  }

  ngOnDestroy() {
   if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
  }

}
