import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TablesService } from '../../services/tables.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  players: any[] = [];
  record_holders: any[] = [];

  players_map!: any[];
  user: any;
  data: any[] = [];
  games: any[] = [];
  tab: string = 'all-time';

  data_ready:boolean = false;

  filter:string = 'points';


  userServiceSubscription!: Subscription;

  daily_start_time: number = this.commonService.getEpochTimeForTodayAtMidnight();
  monthly_start_time: number = this.commonService.getFirstDayOfMonthEpoch();

  constructor(
    public userService: UserService,
    public commonService: CommonService,
    public tablesService: TablesService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser) {
        this.router.navigate(['login']);
        return;
      }

      this.tablesService.GetFiltered('users', 'user_id', currentUser.user_id).subscribe((data: any) => {
        this.user = data[0];
        //console.log('this.user', this.user);
        this.loadData();
      });
    });

  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe();
  }

  loadData() {

    this.userService.getAllGamesLeaderboard().subscribe((data: any) => {
      this.players = data.users;
      this.record_holders = data.record_holders;

      console.log('record_holders', this.record_holders);
      //console.log('players', this.players);

      this.filterPlayers();
      
    })
  }

  filterPlayers() {
    //console.log('filterPlayers');

    this.data_ready =false;
    //var games:any = [];

    this.players.forEach((x: any) => {
      
      if (this.filter == 'points') {
        var games;
        if (this.tab == 'all-time') games = x.games;
        else if (this.tab == 'monthly') games = x.games.filter((n: any) => { return n.timestamp >= this.monthly_start_time });
        else if (this.tab == 'daily') {
          games = x.games.filter((n: any) => { return n.timestamp >= this.daily_start_time });
          //check for high score
          var max_score = 0;
          games.forEach((g:any) => {
            if (g.score > max_score) max_score = g.score;
          });
          x.max_score = max_score;
        }


        var points = 0;
        if (games){
        games.forEach((x: any) => { points += x.score; });
        x.points = points;
        }
      }

      else if (this.filter == 'badges'){
        var badges;
        if (this.tab == 'all-time') badges = x.badges;
        else if (this.tab == 'monthly') badges = x.badges.filter((n: any) => { return n.timestamp >= this.monthly_start_time });
        else if (this.tab == 'daily') badges = x.badges.filter((n: any) => { return n.timestamp >= this.daily_start_time });

        x.badges_number = badges.length;
      }

      else if (this.filter == 'tokens'){
        var tokens;
        if (this.tab == 'all-time') tokens = x.tokens;
        else if (this.tab == 'monthly') tokens = x.tokens.filter((n: any) => { return n.timestamp >= this.monthly_start_time });
        else if (this.tab == 'daily') tokens = x.tokens.filter((n: any) => { return n.timestamp >= this.daily_start_time });

        var value = 0;
        tokens.forEach((x: any) => { value += (x.value > 0 ? x.value:0); });
        
        x.tokens_number = value;
        console.log(x.username, value, tokens);
      }
    });

    if (this.filter == 'points') this.players = this.players.sort((a:any, b:any) => { return b.points - a.points});
    if (this.filter == 'tokens') this.players = this.players.sort((a:any, b:any) => { return b.tokens_number - a.tokens_number});
    if (this.filter == 'badges') this.players = this.players.sort((a:any, b:any) => { return b.badges_number - a.badges_number});
    
  
    //console.log('this.players', this.players);

      /*
      games = x.games;
    
    else if (this.tab == 'daily') games = this.games.filter((x: any) => { return x.timestamp >= this.daily_start_time });
      */
    

    //this.players = [];
    
/*
    this.players.forEach((x: any) => {
      var player_games = games.filter((n: any) => { return n.user_id == x.user_id });
      x.games = player_games.length;
      var points = 0;
      var max_score = 0;
      player_games.forEach((n: any) => { 
        points += (n.score ? n.score : 0);
        if (n.score > max_score) max_score = n.score; 
      });
      x.points = points;
      x.max_score = max_score;
    });


    if(this.tab == 'all-time'){
      var record = this.players.find((x:any) => { return x.user_id == this.user.user_id});
      if (record) record.points = this.user.points;
    }

    //sort by points
    this.players = this.players.sort((a:any,b:any) => { return b.points - a.points});
    console.log('this.players', this.players);

    if (this.tab == 'all-time' && !this.players_map) {
      this.players_map = this.players.map((x:any) => { 
        return {
          user_id: x.user_id,
          all_time_points: x.points
        };
      });
      
    }

    this.players.forEach((x:any) => {
      //find record
      var record = this.players_map.find((n:any) => { return n.user_id == x.user_id});
      if (record) x.all_time_points = record.all_time_points;
    });

    */
    this.assignLevels();
    this.data_ready =true;

  }

  assignLevels(){
    this.tablesService.GetAll('skill_levels').subscribe((data:any) => {
      this.players.forEach((x:any) => {
        this.commonService.assignLevel(x,data);
      })
    })
  }

}
