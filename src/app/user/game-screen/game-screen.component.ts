import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { TablesService } from '../../services/tables.service';
import { MyblobService } from '../../services/myblob.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-screen',
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

  ads:any[] = [];
  banners!:any[];

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
  active_players!:number;

  private messagesSubscription!: Subscription;
  private userServiceSubscription!: Subscription;
  
  constructor(
    public socketioService: SocketioService,
    public commonService: CommonService,
    public userService: UserService,
    public tablesService: TablesService,
    public myblobService: MyblobService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser){
        this.router.navigate(['login']);
        return;
      }
      this.user = currentUser;
      this.user.lives = 5;
      this.user.points = 0;
      this.user.rank = 3;
      //console.log('this.user', this.user);
      if (this.user.account_type == 'player'){
        this.createGame();
        this.getUserDailyHighScore();
      }
      else if (this.user.account_type == 'business'){
        this.loadScreens();
      }

      this.loadAdvertisements();

    });

    this.subscribeToSocket();
  }

  loadScreens(){
    this.tablesService.GetFiltered('screens','venue_id',this.user.venue_id).subscribe((data:any) => {
      var screens = data;
      var current_dimensions = window.innerWidth + ' x ' + window.innerHeight;
      var record = screens.find((x:any) => { return x.dimensions == current_dimensions});
      
      if (!record){
        //if that screen size not records, store
        var screen_record = {
          venue_id: this.user.venue_id,
          dimensions: current_dimensions
        }

        this.tablesService.AddItem('screens', screen_record).subscribe();
      }
    })
  }

  ngOnDestroy() {
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe();
  }

  subscribeToSocket() {
    this.messagesSubscription = this.socketioService._getMessage.subscribe((message: any) => {
      //console.log('message', message);

      //check that a minimum of 5 sec have passed since loading
      var delta = Date.now() - this.start_timestamp;

      /*
      if (message == 'results') {
        this.question_notification = this.message.percent + '% answered correctly';
        return;
      }
      */

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
        else if (this.message.message == 'qrcode') this.page = 'qrcode';
        else if (this.message.message == 'question') {
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

              
              if (elapsed_time == 9) {
                this.tablesService.GetFiltered('user_activity', 'question_id', this.message.question_id).subscribe((data: any) => {
                  //console.log('user_activity',data);
                  //console.log(Date.now(), data[0].timestamp_question);
                  var time_threshold = Date.now() - 11000;
                  
                  var questions = data.filter((x:any) => { return x.timestamp_question > time_threshold });

                  //console.log('questions', questions);

                  var got_right_ctr = 0;
                  questions.forEach((x:any) => {
                    if (x.got_it_right == 1) got_right_ctr++;
                  })

                  var object = {
                    message: 'results',
                    percent: Math.round(100 * got_right_ctr / questions.length),
                    got_right: got_right_ctr,
                    total_players: questions.length
                  }
                  //this.question_notification = object.got_right + ' out of ' + object.total_players + ' answered correctly';
                  if (questions.length > 0) this.question_notification = object.percent + '% answered correctly';
                  this.active_players = object.total_players;
                })
               
              }

              if (elapsed_time == 11) {
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
    if (this.user.account_type == 'business' || this.question_active == false) return;

    //console.log('answer selected');

    this.question_active = false;
    //clearInterval(this.timerInterval);

    if (option?.text == this.right_answer) {
      option.show_green = true;
      this.user.points += this.message.value_points;
      this.points_value = this.message.value_points;
      this.show_point_animation = true;
      this.updateGameRecord();
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

    clearInterval(this.timerInterval);
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();

  }

  updateGameRecord(){
    //update game record
    var object = {
      game_id: this.game_id,
      score: this.user.points
    }

    this.tablesService.UpdateItem('games', 'game_id', object).subscribe();
  }

  stopTimer() {
    this.show_timer = false;
  }

  playAgain() {
    this.user.lives = 5;
    this.has_joined = false;
    this.page = 'game';
    this.getUserDailyHighScore();
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

    this.tablesService.StoreUserActivity(object).subscribe();
  }

  createGame(){

    //create game
    var game = {
      user_id: this.user.user_id,
      //date: this.commonService.getDateString(),
      venue_id: 1,
      timestamp: Date.now(),
      score: 0,
      dimensions: window.innerWidth + ' x ' + window.innerHeight
    }

    this.tablesService.AddItem('games', game).subscribe((data:any) => {
      //console.log('game created!', data);
      this.game_id = data.id;
      this.game_is_active = true;
    });
  }

  getUserDailyHighScore(){
    this.userService.getUserDailyHighScore(this.user.user_id).subscribe((data:any) => {
      var record = data[0];
      if (record) this.user.daily_high = record.score;
      //console.log('data', data);
    });
  }

  loadAdvertisements(){
    this.myblobService.getActiveFiles().subscribe((data:any) => {
      //console.log('active files', data);
      if (this.screen_width < 540) this.ads = data.filter((x:any) => {return x.indexOf('/mobile/') > -1});
      else this.ads = data.filter((x:any) => {return x.indexOf('/desktop/') > -1});

      this.banners = data.filter((x:any) => {return x.indexOf('/banner/') > -1});

      //console.log('this.banners', this.banners);
    })
    

    
  }

}
