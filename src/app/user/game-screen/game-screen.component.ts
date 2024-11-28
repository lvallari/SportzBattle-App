import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { forkJoin, Subscription } from 'rxjs';
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
  timer2Interval: any;

  user:any;

  ads:any[] = [];
  banners!:any[];

  show_point_animation: boolean = false;
  show_on_fire_animation:boolean = false;
  show_double_or_nothing_animation:boolean = false;
  show_double_or_nothing_failed_animation:boolean = false;

  points_value: number = 0;
  screen_width: number = window.innerWidth;
  question_active: boolean = false;

  users: any = [];
  start_timestamp = Date.now();
  counter:number = 0;
  cycle_counter:number = 1;
  question_notification:string | undefined;
  game_id!:number;
  game_is_active:boolean = false;
  active_players!:number;
  hiding_order!:any[];
  user_on_fire:boolean = false;

  question_start_time!:number;

  correct_answers_in_a_row:number = 0;
  value_points!:number;

  is_double_or_nothing:boolean = false;
  double_option_has_been_used:boolean = false;

  percent_correct!:number;

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
      this.user.lives = 3;
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
      if (document.hidden) return;

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
        clearInterval(this.timer2Interval);

        if (this.user.lives <= 0) {
          this.gameOver();
          return;
        }

        this.message = message;
        console.log('this.message', this.message);
        
        this.has_joined = true;
        if (this.message.message == 'leaderboard') this.page = 'leaderboard';
        else if (this.message.message == 'advertisement') {
          this.page = 'advertisement';
          this.cycle_counter += 1;
          //console.log('cycle_counter',this.cycle_counter);
        }
        else if (this.message.message == 'qrcode') this.page = 'qrcode';
        else if (this.message.message == 'question') {
          this.counter += 1;
          //console.log('this.counter', this.counter);
          this.page = 'prepare_screen';
          this.is_double_or_nothing = false;

          this.question_notification = undefined;

          setTimeout(() => {
            this.page = 'game';
            this.time_is_up = false;
            this.has_joined = true;
            this.question_active = true;
            

            this.message.question = this.commonService.decrypt('sb', message.question);
            this.right_answer = this.commonService.decrypt('sb', message.key);
            this.hiding_order = JSON.parse(this.commonService.decrypt('sb',message.hiding_order));

            console.log('this.hiding_order', this.hiding_order);

            this.options = [];
            this.message.answers.forEach((x: any) => {
              this.options.push({
                text: x,
                is_right_answer: (x == this.right_answer)
              })
            });

            this.time = 10;
            this.show_timer = true;
            var elapsed_time = 0;
            this.question_start_time = Date.now();
            
            if (this.timerInterval) clearInterval(this.timerInterval);
            if (this.timer2Interval) clearInterval(this.timer2Interval);

            this.timer2Interval = setInterval(() => {
              this.value_points = (100 - Math.round((Date.now() - this.question_start_time)/100)); 
            },200);
            
            this.timerInterval = setInterval(() => {
              this.time -= 1;
              elapsed_time += 1;
              if (this.time < 0) {
                this.time = 0;
                this.time_is_up = true;
                if (this.question_active == true) this.answerSelected(undefined);
              }

              if (elapsed_time == 4){
                this.options[this.hiding_order[0]].hide = true;
                //this.message.value_points = 75;
                //this.question_notification = this.message.value_points + ' Pts';
              }
              if (elapsed_time == 7){
                this.options[this.hiding_order[1]].hide = true;
                //this.message.value_points = 50;
                //this.question_notification = this.message.value_points + ' Pts';
              } 

              
              if (elapsed_time == 12) {
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

                  this.percent_correct = object.percent;
                  //this.question_notification = object.got_right + ' out of ' + object.total_players + ' answered correctly';
                  if (questions.length > 0) this.question_notification = object.percent + '% answered correctly';
                  this.active_players = object.total_players;
                })
               
              }

              if (elapsed_time == 14) {
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

  async answerSelected(option: any) {

    //if (this.screen_width > 768 || this.question_active == false) return;
    if (this.user.account_type == 'business' || this.question_active == false) return;

    //console.log('answer selected');

    this.question_active = false;
    if (this.timer2Interval) clearInterval(this.timer2Interval);

    if (option?.text == this.right_answer) {
      option.show_green = true;
      this.user.points += this.user_on_fire ? (2*this.value_points):this.value_points;
      this.points_value = this.user_on_fire ? (2*this.value_points):this.value_points;

      this.show_point_animation = true;
      this.updateGameRecord();
      this.storeAnswer(true);
      //if (this.correct_answers_in_a_row >= 3) this.user_on_fire = true;
      this.correct_answers_in_a_row += 1;
      
      await this.delay(1500);
      this.show_point_animation = false;
      
      if (this.correct_answers_in_a_row == 3) {
        this.show_on_fire_animation = true;
        this.user_on_fire = true;
        await this.delay(3000);
        this.show_on_fire_animation = false;
      }

      if(this.is_double_or_nothing){
        this.user.points += this.user.points;
        this.show_double_or_nothing_animation = true;
        await this.delay(3000);
        this.show_double_or_nothing_animation = false;
      }

      //setTimeout(() => { 
        //this.show_point_animation = false;
        //this.checkOnFireStatus();
        
      //}, 1500);
      
    }
    else {
      if (option) option.show_red = true;
      this.storeAnswer(false);
      this.user.lives -= 1;
      this.user_on_fire = false;
      this.correct_answers_in_a_row = 0;

      if(this.is_double_or_nothing){
        this.user.points = 0;
        this.show_double_or_nothing_failed_animation = true;
        await this.delay(3000);
        this.show_double_or_nothing_failed_animation = false;
      }

    }

    //console.log('this.lives', this.user.lives);
    this.stopTimer();

  }

  async delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 

  gameOver() {
    this.page = 'game_over';
    this.game_is_active = false;

    clearInterval(this.timerInterval);
    clearInterval(this.timer2Interval);
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
    this.user.lives = 3;
    this.has_joined = false;
    this.double_option_has_been_used = false;
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

    this.user_on_fire = false;
  }

  getUserDailyHighScore(){
    this.userService.getUserDailyHighScore(this.user.user_id).subscribe((data:any) => {
      var record = data[0];
      if (record) this.user.daily_high = record.score;
      //console.log('data', data);
    });
  }

  loadAdvertisements(){
    forkJoin([
      this.myblobService.getActiveFiles(),
      this.tablesService.GetFiltered('advertisement_accounts','venue_id',this.user.venue_id)
    ]).subscribe((data:any) => {
      var advertisement_account = data[1][0];
      var files = data[0].filter((x:any) => {
        return x.indexOf(advertisement_account.advertisement_account_id + '/') == 0;
      });

      console.log('active files', files);
      if (this.screen_width < 540) {
        this.ads = files.filter((x:any) => {return x.indexOf('/mobile/') > -1}).map((x:any) => {
          return 'https://sportzbattle.blob.core.windows.net/advertisements/' + x;
        });
        if (this.ads.length == 0) {
          this.ads.push('https://sportzbattle.blob.core.windows.net/system/mobile_ad.jpg')
        }
      }
      else {
        this.ads = files.filter((x:any) => {return x.indexOf('/desktop/') > -1}).map((x:any) => {
          return 'https://sportzbattle.blob.core.windows.net/advertisements/' + x;
        });
        if (this.ads.length == 0) {
          this.ads.push('https://sportzbattle.blob.core.windows.net/system/desktop_ad.jpg')
        }
      }

      this.banners = files.filter((x:any) => {return x.indexOf('/banner/') > -1}).map((x:any) => {
        return 'https://sportzbattle.blob.core.windows.net/advertisements/' + x;
      });
      if (this.banners.length == 0) {
        this.banners.push('https://sportzbattle.blob.core.windows.net/system/banner_ad.jpg')
      }

      //console.log('this.banners', this.banners);
    })
  }

  makeDouble(){
    this.is_double_or_nothing = true;
    this.double_option_has_been_used = true;
  }

}
