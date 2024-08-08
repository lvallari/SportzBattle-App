import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { TablesService } from '../../services/tables.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrl: './business-dashboard.component.scss'
})
export class BusinessDashboardComponent implements OnInit, OnDestroy {

  user:any;
  userServiceSubscription!:Subscription;

  daily_start_time: number = this.commonService.getEpochTimeForTodayAtMidnight();
  monthly_start_time: number = this.commonService.getFirstDayOfMonthEpoch();

  games:any[] = [];
  activity:any[] = [];
  max_score!:number;
  venue:any;
  players:any[] = [];

  games_today!:number;
  games_this_month!:number;

  constructor(
    public userService: UserService,
    public commonService: CommonService,
    public tablesService: TablesService,
    public router: Router
  ){

  }

  ngOnInit(): void {
    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser){
        this.router.navigate(['login']);
        return;
      }
      this.user = currentUser;
      //console.log('this.user', this.user);
      this.getVenue();
      this.getData();
    });
  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe()
  }

  getVenue(){
    this.tablesService.GetFiltered('venues','venue_id', this.user.venue_id).subscribe((data:any) => {
      this.venue = data[0];
    })
  }

  getData(){
    this.userService.getGamesByVenue(this.user.venue_id).subscribe((data:any) => {
      this.games = data;
      //console.log('this.games', this.games);
      //console.log('daily_start_time', this.daily_start_time);
      this.players = [];


      this.games.forEach((x:any) => {
        x.date = this.commonService.getDateString(x.timestamp);

        var record = this.players.find((n:any) => { return n.user_id == x.user_id});
        if (!record) this.players.push({
          user_id: x.user_id,
          username: x.username,
          image: x.user_image
        });

      });

      this.players.forEach((x:any) => {
        var player_games = this.games.filter((n:any) => {return n.user_id == x.user_id});
        x.games = player_games.length;
        var points = 0;
        player_games.forEach((n:any) => {points += ( n.score ? n.score : 0) });
        x.points = points;
      });

      //get games played today
      this.games_today = this.games.filter((x:any) => {return x.timestamp > this.daily_start_time}).length;

      //get games played this monthy
      this.games_this_month = this.games.filter((x:any) => {return x.timestamp > this.monthly_start_time}).length;


      //console.log('this.games', this.games);
      //console.log('this.players', this.players);
    })
  }

  goPlay(){
    this.router.navigate(['user/play']);
  }

}

