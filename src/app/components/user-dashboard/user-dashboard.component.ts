import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
import { UserDashboardGraphComponent } from '../user-dashboard-graph/user-dashboard-graph.component';
import { UserSidemenuComponent } from '../user-sidemenu/user-sidemenu.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserDashboardGraphComponent, UserSidemenuComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  user:any;
  userServiceSubscription!:Subscription;

  games:any[] = [];
  activity:any[] = [];
  max_score!:number;
  points_all_time!:number;
  points_month!:number;

  stats:any ={};

  constructor(
    public userService: UserService,
    public commonService: CommonService,
    public router: Router
  ){

  }

  ngOnInit(): void {
    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      //console.log('this.user', this.user);
      this.getData();
    });
  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe()
  }

  getData(){
    this.userService.getUserActivity(this.user.user_id).subscribe((data:any) => {
      var user_data = data;
      //console.log('user_data', user_data);
      this.activity = user_data;

      //organize by games
      this.games = [];
      user_data.forEach((x:any) => {
        var gamex = this.games.find((n:any) => {return n.game_id == x.game_id});
        if (!gamex) {
          var game_object = {
            game_id: x.game_id,
            timestamp: x.timestamp,
            score: x.score
          }

          this.games.push(game_object);
        }
      });
      
      this.max_score = 0;
      this.points_month = 0;
      this.points_all_time = 0;
      this.games.forEach((x:any) => {
        x.date = this.commonService.getDateString(x.timestamp);
        x.is_this_month = this.commonService.isThisMonth(x.date);
        if (x.is_this_month == true) this.points_month += x.score;
        this.points_all_time += x.score;
        if (x.score){
          if (x.score > this.max_score) this.max_score = x.score;
        }
      });

      this.calculateStats();

      //console.log('this.games', this.games);
    })
  }

  goPlay(){
    this.router.navigate(['play']);
  }

  calculateStats(){
    //sort by category
  var nba_questions = this.activity.filter((n:any) => {return n.category == 'NBA'});
  var nfl_questions = this.activity.filter((n:any) => {return n.category == 'NFL'});
  var mlb_questions = this.activity.filter((n:any) => {return n.category == 'MLB'});

  var nba_pct = 100* nba_questions.filter((x:any) => {return x.got_it_right == 1}).length / nba_questions.length;
  var nfl_pct = 100* nfl_questions.filter((x:any) => {return x.got_it_right == 1}).length / nfl_questions.length;
  var mlb_pct = 100* mlb_questions.filter((x:any) => {return x.got_it_right == 1}).length / mlb_questions.length;

  
  this.stats.all = this.activity.length;
  this.stats.all_correct = this.activity.filter((x:any) => {  return x.got_it_right == 1 }).length;
  this.stats.all_pct = Math.round(100 * this.stats.all_correct/this.stats.all);

  this.stats.all_nba = nba_questions.length;
  this.stats.nba_correct = nba_questions.filter((x:any) => {return x.got_it_right == 1}).length
  this.stats.nba_pct = Math.round(100 * this.stats.nba_correct/this.stats.all_nba);

  this.stats.all_nfl = nfl_questions.length;
  this.stats.nfl_correct = nfl_questions.filter((x:any) => {return x.got_it_right == 1}).length
  this.stats.nfl_pct = Math.round(100 * this.stats.nfl_correct/this.stats.all_nfl);

  this.stats.all_mlb = mlb_questions.length;
  this.stats.mlb_correct = mlb_questions.filter((x:any) => {return x.got_it_right == 1}).length
  this.stats.mlb_pct = Math.round(100 * this.stats.mlb_correct/this.stats.all_mlb);

  }

}
