import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { forkJoin, lastValueFrom, Subscription } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { TablesService } from '../../services/tables.service';
import { MyblobService } from '../../services/myblob.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from '../../services/apis.service';


@Component({
  selector: 'app-game-20quest',
  templateUrl: './game20quest.component.html',
  styleUrl: './game20quest.component.scss'
})
export class Game20questComponent implements OnInit, OnDestroy {

  message: any;
  options: any[] = [];
  has_checkedin: boolean = false;
  page: string = 'waiting';
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
  //show_on_fire_animation:boolean = false;
  //show_double_or_nothing_animation:boolean = false;
  ///show_double_or_nothing_failed_animation:boolean = false;

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

  debug_ctr:number = 0;
  
  hit_football:boolean = false;
  hit_basketball:boolean = false;
  hit_baseball:boolean = false;

  user_points_o:number = 0;
  popup:string = 'none';

  has_warrior_badge:boolean = false;
  has_hit_the_cycle: boolean = false;

  countdown_interval:any;

  minutes!:number;
  seconds!:number;

  number_of_players!:number;
  number_of_active_players!:number;
  number_of_active_players_o!:number;

  quest20_game_id!:number;
  quest20_player_id!:number;
  elapsed_time!:number;

  private messagesSubscription!: Subscription;
  private userServiceSubscription!: Subscription;
  
  constructor(
    public socketioService: SocketioService,
    public commonService: CommonService,
    public userService: UserService,
    public tablesService: TablesService,
    public myblobService: MyblobService,
    public apisService: ApisService,
    public router: Router
  ) { }

  ngOnInit(): void {

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        console.log('Tab is in the background');
        // Optionally adjust ping interval or handle disconnection logic
      } else {
        console.log('Tab is active again');
        // Reconnect or re-establish the socket if necessary
        
        /*
        if (!this.socketioService.connected) {
          this.socketioService.connect();
        }
        */
        
      }
    });

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
        this.getUserBadges();
      }
      else if (this.user.account_type == 'business'){
        this.loadScreens();
      }

      this.loadAdvertisements();

    });

    this.subscribeToSocket();

    this.checkForScheduledGames();
    this.startCountdown();

  }

  startCountdown(){
    //start countdown interval
    var ctr = 0;
    this.countdown_interval = setInterval(() => {
      const { minutes, seconds } = this.getCountdownToNextInterval(10);
      this.minutes = minutes;
      this.seconds = seconds;
      ctr += 1;

      if (ctr % 5 == 0 && this.quest20_game_id) this.getNumberOfPlayers();
      //console.log(`${minutes} min ${seconds} sec left`);
    }, 1000);
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
    this.socketioService.joinRoom('quest20');
    this.messagesSubscription = this.socketioService._getMessage20quest.subscribe((messagex: any) => {
      if (!messagex) return;

      var message = messagex;

      console.log('message 111', message);
      //if (document.hidden) return;
      if (!this.has_checkedin) return;

      
      //this.number_of_players = -1;

      //check that a minimum of 5 sec have passed since loading
      var delta = Date.now() - this.start_timestamp;

      //return ping to avoid idle disconnet
      //if (this.user.account_type == 'business') this.socketioService.sendMessage('ping');

      /*
      if (message == 'results') {
        this.question_notification = this.message.percent + '% answered correctly';
        return;
      }
      */

      //this.debug_ctr=0;
      //console.log('this.message ----', this.debug_ctr);

      console.log('aaaaaaaaaa');
      if (message && delta > 5000) {
        clearInterval(this.timerInterval);
        clearInterval(this.timer2Interval);

        /*
        if (this.user.lives <= 0) {
          this.gameOver();
          return;
        }
        */

        this.message = message;
        console.log('this.message 222', this.message);
        
        
        //this.has_joined = true;
        /*
        if (this.message.message == 'leaderboard') this.page = 'leaderboard';
        else if (this.message.message == 'advertisement') {
          this.page = 'advertisement';
          this.cycle_counter += 1;
          //console.log('cycle_counter',this.cycle_counter);
        }
        else if (this.message.message == 'qrcode') this.page = 'qrcode';
        else 
        */
        if (this.message.message == 'starting-soon') {
          this.page = 'starting-soon';
          clearInterval(this.countdown_interval);
          this.game_is_active = true;
          this.correct_answers_in_a_row = 0;
          console.log('update player record to playing')
          this.updatePlayerRecord('playing');
        }
        if (this.message.message == 'question') {
          if (!this.game_is_active) return;
          this.counter += 1;
          //console.log('this.counter', this.counter);
          this.page = 'prepare_screen';
          //this.is_double_or_nothing = false;

          this.question_notification = undefined;
          

          setTimeout(() => {
            this.page = 'game';
            this.time_is_up = false;
            //this.has_joined = true;
            this.question_active = true;
            

            //console.log('this.message.question - before',message.question);
            this.message.question = this.commonService.decrypt('sb', message.question);
            // console.log('this.message.fater - after',this.message.question)
            
            this.right_answer = this.commonService.decrypt('sb', message.key);
            //this.hiding_order = JSON.parse(this.commonService.decrypt('sb',message.hiding_order));

            //console.log('this.hiding_order', this.hiding_order);

            this.options = [];
            this.message.answers.forEach((x: any) => {
              this.options.push({
                text: x,
                is_right_answer: (x == this.right_answer)
              })
            });

            this.time = message.duration;
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
              this.elapsed_time = elapsed_time;
              if (this.time < 0) {
                this.time = 0;
                this.time_is_up = true;
                if (this.question_active == true) this.answerSelected(undefined);
              }

              /*
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
              */
              /*
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
              */
              if (elapsed_time == 14) {
                this.page = 'stats';
              }
              //
              //console.log('interval, 1000',this.debug_ctr);
              //this.debug_ctr+=1;
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
      //this.user.points += this.user_on_fire ? (2*this.value_points):this.value_points;
      //this.points_value = this.user_on_fire ? (2*this.value_points):this.value_points;

      this.show_point_animation = true;
      this.updateGameRecord();
      this.storeAnswer(true);
      //if (this.correct_answers_in_a_row >= 3) this.user_on_fire = true;
      this.correct_answers_in_a_row += 1;
      
      await this.delay(1500);
      this.show_point_animation = false;
      
      /*
      if (this.correct_answers_in_a_row == 3) {
        //this.show_on_fire_animation = true;
        this.user_on_fire = true;
        //await this.delay(3000);
        //this.show_on_fire_animation = false;
        await this.showPopUp('on-fire');
      }
      */

      /*
      if(this.is_double_or_nothing){
        this.user.points += this.user.points;
        await this.showPopUp('double-or-nothing');
        //this.show_double_or_nothing_animation = true;
        //await this.delay(3000);
        //this.show_double_or_nothing_animation = false;
      }
      */
      /*
      if (this.message.category == 'NFL') this.hit_football = true;
      else if (this.message.category == 'NBA') this.hit_basketball = true;
      else if (this.message.category == 'MLB') this.hit_baseball = true;

      if (this.correct_answers_in_a_row == 7) await this.giveAward('brainiac');
      if (this.hit_football == true && this.hit_baseball == true && this.hit_basketball == true) {
        if (this.has_hit_the_cycle == false) await this.giveAward('hit-the-cycle');
        this.has_hit_the_cycle = true;
      }
      if (this.user.points >= 1500 && this.user_points_o < 1500) await this.giveAward('high-roller');

      var data =  await lastValueFrom(this.userService.updateBadgesCounter(this.user.user_id, this.message.category));
      console.log('^^^^^^^^^^^^ update counters', data);
      //this.userService.updateBadgesCounter(this.user.user_id, this.message.category).subscribe((data:any) => {
        var award = data.award;
        if (award == 'gridion') await this.giveAward('gridion');
        else if (award == 'hardwood') await this.giveAward('hardwood');
        else if (award == 'park') await this.giveAward('park');
      //})

      //setTimeout(() => { 
        //this.show_point_animation = false;
        //this.checkOnFireStatus();
        
      //}, 1500);
      */
      this.user_points_o = this.user.points;
      
    }
    else {
      if (option) option.show_red = true;
      //this.storeAnswer(false);
      //this.user.lives -= 1;
      //this.user_on_fire = false;
      //this.correct_answers_in_a_row = 0;

      /*
      if(this.is_double_or_nothing){
        this.user.points = 0;
        this.showPopUp('double-or-nothing-failed');
      }
      */
      this.gameOver();

    }

    

    //this.number_of_active_players_o = this.number_of_active_players;
    this.getNumberOfPlayers();

    //this.answered_correctly_last_question = 

    //console.log('this.lives', this.user.lives);
    this.stopTimer();

  }

  async delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 

  gameOver() {

    this.updatePlayerRecord('out');
    this.quest20_game_id = -1;
    this.number_of_players = 0;

    /*
    //award warrior badge if it doesnt have one
    if (this.has_warrior_badge == false) {
      this.has_warrior_badge = true;
      this.giveAward('warrior');
      setTimeout(() => {
        this.page = 'game_over';
        this.game_is_active = false;

        clearInterval(this.timerInterval);
        clearInterval(this.timer2Interval);
        if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
      }, 4000)
    }
    */
    //else {
    setTimeout(() => {
      this.page = 'game_over';
      this.game_is_active = false;

      //award wallet prices
      if (this.correct_answers_in_a_row  > 20) this.walletAward(100000);
      else if (this.correct_answers_in_a_row > 15) this.walletAward(25000);
      else if (this.correct_answers_in_a_row > 10) this.walletAward(10000);
      else if (this.correct_answers_in_a_row > 8) this.walletAward(2500);
      else if (this.correct_answers_in_a_row > 5) this.walletAward(500); //free game
    }, 4000);
      

      /*
      if (this.has_warrior_badge == false) {
        this.has_warrior_badge = true;
        this.giveAward('warrior');
      }

      //update user points
      this.apisService.awardPoints(this.user.user_id, this.user.points).subscribe((data:any) => {
        console.log(data);
      });
      */

      clearInterval(this.timerInterval);
      clearInterval(this.timer2Interval);
      //if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
    //}
    
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
    /*
    this.user.lives = 3;
    //this.has_joined = false;
    this.double_option_has_been_used = false;

    this.correct_answers_in_a_row = 0;
    this.hit_football = false;
    this.hit_basketball = false;
    this.hit_baseball = false;
    */

    this.page = 'waiting';
    this.has_checkedin = false;
    this.startCountdown();
    this.checkForScheduledGames();
    //this.getUserDailyHighScore();
    //this.subscribeToSocket();
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
      //this.game_is_active = true;
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
    forkJoin([
      this.myblobService.getActiveFiles(),
      this.tablesService.GetFiltered('advertisement_accounts','venue_id',this.user.venue_id)
    ]).subscribe((data:any) => {
      var advertisement_account = data[1][0];
      var files = data[0].filter((x:any) => {
        return x.indexOf(advertisement_account.advertisement_account_id + '/') == 0;
      });

      //console.log('active files', files);
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

  async giveAward(type:string){

    console.log('GIVE AWARD!', type);


    var user_badge = {
      user_id: this.user.user_id,
      timestamp: Date.now(),
      badge_name: type,
      badge_icon: this.selectIcon(type),
    }

    this.tablesService.AddItem('user_badges',user_badge).subscribe();
    await this.showPopUp(type);
  }

  async showPopUp(type:string){
    this.popup = type;
    await this.delay(3000);
    this.popup = 'none';
  }

  getUserBadges(){
    this.tablesService.GetFiltered('user_badges','user_id', this.user.user_id).subscribe((data:any) => {
      var user_badges = data;
      var warrior_badge = user_badges.find((x:any) => { return x.badge_name == 'warrior'});
      if (warrior_badge) this.has_warrior_badge = true;
    })
  }

  selectIcon(type:string){
    if (type == 'high-roller') return 'https://sportzbattle.blob.core.windows.net/system/dice.png';
    else if (type == 'brainiac') return 'https://sportzbattle.blob.core.windows.net/system/brain.png';
    else if (type == 'hit-the-cycle') return 'https://sportzbattle.blob.core.windows.net/system/cycle.png';
    else if (type == 'warrior') return 'https://sportzbattle.blob.core.windows.net/system/sword.png';
    else if (type == 'gridion') return 'https://sportzbattle.blob.core.windows.net/system/football.png';
    else if (type == 'hardwood') return 'https://sportzbattle.blob.core.windows.net/system/basketball.png';
    else if (type == 'park') return 'https://sportzbattle.blob.core.windows.net/system/baseball.png';
    else return;
  }

  getCountdownToNextInterval(intervalMinutes: number): { minutes: number; seconds: number } {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const block = intervalMinutes * 60;
  const elapsed = (minutes % intervalMinutes) * 60 + seconds;
  const totalRemaining = elapsed === 0 ? block : block - elapsed;

  return {
    minutes: Math.floor(totalRemaining / 60),
    seconds: totalRemaining % 60
  };
}

checkForScheduledGames(){
 //get game id
    this.tablesService.GetFiltered('quest20_games', 'status', 'scheduled').subscribe((data:any) => {
      var game = data[0];
      if (game) {
        this.quest20_game_id = game.quest20_game_id;
        this.getNumberOfPlayers();
      }
      else {
        this.quest20_game_id = -1;
        this.number_of_players = 0;
      }
    });
    
}

  async checkinUser() {

    if (this.user.wallet < 5000) this.router.navigate(['user/insufficient-funds'], { queryParams: { g: 'quest20' } });
    else {
      this.user.wallet -= 5000;
      this.userService.updateUserNoBroadCast('wallet', this.user.wallet);
      this.tablesService.UpdateItem('users', 'user_id', { user_id: this.user.user_id, wallet: this.user.wallet });
    }

    this.has_checkedin = true;
    console.log('this.has_checkedin',this.has_checkedin);

    if (this.quest20_game_id == -1){
      var object = await lastValueFrom(this.apisService.createGameQuest20());
      this.quest20_game_id = object.id;
      console.log('this.quest20_game_id',this.quest20_game_id);
      //create player object
      await this.createPlayerRecord(this.quest20_game_id);
    }

    //create player object
    else {
      console.log('this.quest20_game_id',this.quest20_game_id);
      await this.createPlayerRecord(this.quest20_game_id);
    }

    this.getNumberOfPlayers();
    //this.subscribeToSocket();

  }

  async createPlayerRecord(game_id:number){
     var player_object = {
      quest20_game_id: game_id,
      user_id: this.user.user_id,
      status: 'checked-in'
    }

    var object = await lastValueFrom(this.tablesService.AddItem('quest20_players', player_object));
    this.quest20_player_id = object.id;
    console.log('player_id', this.quest20_player_id);

  }

  getNumberOfPlayers(){
     this.tablesService.GetFiltered('quest20_players','quest20_game_id', this.quest20_game_id).subscribe((data: any) => {
      //console.log('players', data);
      this.number_of_players = data.length;
      this.number_of_active_players = data.filter((x:any) => { return x.status == 'playing'}).length;
      //console.log('number_of_active_players',this.number_of_active_players);
    });
  }

  updatePlayerRecord(status:string){
    if (this.quest20_player_id){
      var player_object = {
        quest20_player_id: this.quest20_player_id,
        status: status
      }

      this.tablesService.UpdateItem('quest20_players', 'quest20_player_id', player_object).subscribe();
    }
  }

  gotoDashboard(){
    this.router.navigate(['user/user-dashboard']);
  }

  walletAward(amount:number){

    console.log('wallet award!!', amount);
    var user_object = {
      user_id: this.user.user_id,
      wallet: this.user.wallet ? (this.user.wallet += amount):amount
    }

    this.tablesService.UpdateItem('users','user_id',user_object).subscribe();
  }

}
