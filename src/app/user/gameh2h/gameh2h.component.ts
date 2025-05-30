import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TablesService } from '../../services/tables.service';
import { ApisService } from '../../services/apis.service';
import { lastValueFrom, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-gameh2h',
  standalone: false,
  templateUrl: './gameh2h.component.html',
  styleUrl: './gameh2h.component.scss'
})
export class Gameh2hComponent implements OnInit {

  h2h_game_id!:number;
  game:any;

  points!:number;

  page:string = 'splash';
  userServiceSubscription!:Subscription;
  user:any;
  question_index:number = 0;

  counter:number = 0;
  message!:any;

   options: any[] = [];
  has_joined: boolean = false;

  right_answer!: string;
  show_timer: boolean = false;
  time_is_up: boolean = false;

  timerInterval: any;
  timer2Interval: any;

  points_value: number = 0;
  question_active: boolean = false;
  
  hiding_order!:any[];
  value_points!:number;

  time!: number;
  question_start_time!:number;

  question!:string;
  show_point_animation: boolean = false;
  game_is_active:boolean = false;

  user_points_o:number = 0;
  question_notification:string | undefined;

  banners:any[] = [];

  books:any[] = [];

  constructor(
    public tablesService: TablesService,
    public apisService: ApisService,
    public userService: UserService,
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.h2h_game_id = params['h2h_game_id'];
    });

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser) {
        this.router.navigate(['login']);
        return;
      }
      else this.user = currentUser;
    });
  }

  ngOnInit(): void {
    this.loadGame();
  }

  loadGame(){
    this.apisService.getH2HGame(this.h2h_game_id).subscribe((data:any) => {
      this.game = data.game;
      this.user.points = 0;
      console.log('this.game', this.game);
      this.page = 'splash';
      setTimeout(() => {
         this.playGame();
      }, 5000);
    });
  }

  playGame(){
    if (this.question_index < this.game.questions.length){
     
          this.counter += 1;
          //console.log('this.counter', this.counter);
          this.page = 'prepare_screen';
          //this.is_double_or_nothing = false;

         // this.question_notification = undefined;

          setTimeout(() => {
            this.playQuestion();
          }, 4000);
       
    }
  }

  playQuestion(){
console.log('here!');
            this.page = 'game';
            this.time_is_up = false;
            this.has_joined = true;
            this.question_active = true;
            

            this.question = this.commonService.decrypt('sb', this.game.questions[this.question_index].question);
            this.right_answer = this.commonService.decrypt('sb', this.game.questions[this.question_index].key);
            this.hiding_order = JSON.parse(this.commonService.decrypt('sb',this.game.questions[this.question_index].hiding_order));

            console.log('this.hiding_order', this.hiding_order);

            this.options = [];
            this.game.questions[this.question_index].answers.forEach((x: any) => {
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
                /*
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
                */
                  /*
                  var object = {
                    message: 'results',
                    percent: Math.round(100 * got_right_ctr / questions.length),
                    got_right: got_right_ctr,
                    total_players: questions.length
                  }
                  */

                  /*
                  this.percent_correct = object.percent;
                  //this.question_notification = object.got_right + ' out of ' + object.total_players + ' answered correctly';
                  if (questions.length > 0) this.question_notification = object.percent + '% answered correctly';
                  this.active_players = object.total_players;
                  */
                //})
               
              }

              if (elapsed_time == 14) {
                this.question_index += 1;
                if (this.question_index == this.game.questions.length) this.gameOver();
                else this.playGame();
              }

              

              //
              //console.log('interval, 1000',this.debug_ctr);
              //this.debug_ctr+=1;
            }, 1000);
  }

  async answerSelected(option: any) {
  
      //if (this.screen_width > 768 || this.question_active == false) return;
      if (this.user.account_type == 'business' || this.question_active == false) return;
  
      //console.log('answer selected');
  
      this.question_active = false;
      if (this.timer2Interval) clearInterval(this.timer2Interval);
  
      if (option?.text == this.right_answer) {
        option.show_green = true;
        this.user.points += this.value_points;
        this.points_value = this.value_points;
  
        this.show_point_animation = true;
        this.updateGameRecord();
        this.storeAnswer(true);
        //if (this.correct_answers_in_a_row >= 3) this.user_on_fire = true;
        //this.correct_answers_in_a_row += 1;
        
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
        */

        /*
        if (this.correct_answers_in_a_row == 7) await this.giveAward('brainiac');
        if (this.hit_football == true && this.hit_baseball == true && this.hit_basketball == true) {
          if (this.has_hit_the_cycle == false) await this.giveAward('hit-the-cycle');
          this.has_hit_the_cycle = true;
        }
        if (this.user.points >= 1500 && this.user_points_o < 1500) await this.giveAward('high-roller');
        */
  
        /*
        var data =  await lastValueFrom(this.userService.updateBadgesCounter(this.user.user_id, this.message.category));
        console.log('^^^^^^^^^^^^ update counters', data);
        //this.userService.updateBadgesCounter(this.user.user_id, this.message.category).subscribe((data:any) => {
          var award = data.award;
          if (award == 'gridion') await this.giveAward('gridion');
          else if (award == 'hardwood') await this.giveAward('hardwood');
          else if (award == 'park') await this.giveAward('park');
        //})
        */
        //setTimeout(() => { 
          //this.show_point_animation = false;
          //this.checkOnFireStatus();
          
        //}, 1500);
        this.user_points_o = this.user.points;
        
      }
      else {
        if (option) option.show_red = true;
        this.storeAnswer(false);
        this.user.lives -= 1;
        //this.user_on_fire = false;
        //this.correct_answers_in_a_row = 0;
  
        /*
        if(this.is_double_or_nothing){
          this.user.points = 0;
          this.showPopUp('double-or-nothing-failed');
        }
        */
  
      }
  
      //console.log('this.lives', this.user.lives);
      this.stopTimer();
  
    }

    updateGameRecord(){
      /*
    //update game record
    var object = {
      h2h_game_id: this.h2h_game_id,
      score: this.user.points
    }

    this.tablesService.UpdateItem('games', 'game_id', object).subscribe();
    */
  }
  storeAnswer(value:boolean){


    if (this.game_is_active != true) return;

    /*

    var object = {
      user_id: this.user.user_id,
      got_it_right: value,
      game_id: this.game_id,
      question_id: this.message.question_id
    }

    this.tablesService.StoreUserActivity(object).subscribe();
    */
  }

   async delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stopTimer() {
    this.show_timer = false;
  }

  gameOver() {


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
      
      this.game_is_active = false;

      //save user points
      var object = {
        h2h_game_id: this.game.h2h_game_id,
        user_id: this.user.user_id,
        score: this.user.points,
        type: this.game.bet_mode,
        amount: this.game.amount
      }

      this.tablesService.AddItem('books', object).subscribe((data:any) => {
       // this.loadBooks();
       this.page = 'game_over';
      })

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

  /*
  loadBooks(){
    this.tablesService.GetFiltered('books','h2h_game_id', this.game.h2h_game_id).subscribe((data:any) => {
      this.books = data.sort((a:any, b:any) => { return a.score - b.score});
    })
  }
  */



}
