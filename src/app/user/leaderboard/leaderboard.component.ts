import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  players: any[] = [];
  user: any;
  data: any[] = [];
  games: any[] = [];
  tab: string = 'all-time';

  data_ready:boolean = false;



  userServiceSubscription!: Subscription;

  daily_start_time: number = this.commonService.getEpochTimeForTodayAtMidnight();
  monthly_start_time: number = this.commonService.getFirstDayOfMonthEpoch();

  constructor(
    public userService: UserService,
    public commonService: CommonService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser){
        this.router.navigate(['login']);
        return;
      }
      this.user = currentUser;
      //console.log('this.user', this.user);
      this.loadData();
    });

  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe();
  }

  loadData() {

    this.userService.getAllGames().subscribe((data: any) => {
      this.games = data;
      //console.log('games', this.games, this.user.venue_id);

      this.filterPlayers();
    })
  }

  filterPlayers() {

    this.data_ready =false;
    var games:any = [];

    if (this.tab == 'all-time') games = this.games;
    else if (this.tab == 'monthly') games = this.games.filter((x: any) => { return x.timestamp >= this.monthly_start_time });
    else if (this.tab == 'daily') games = this.games.filter((x: any) => { return x.timestamp >= this.daily_start_time });

    this.players = [];
    games.forEach((x: any) => {
      //x.date = this.commonService.getDateString(x.timestamp);

      var record = this.players.find((n: any) => { return n.user_id == x.user_id });
      if (!record) this.players.push({
        user_id: x.user_id,
        username: x.username,
        image: x.user_image
      });

    });

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

    //sort by points
    this.players = this.players.sort((a:any,b:any) => { return b.points - a.points});

    this.data_ready =true;

    console.log('this.games', this.games);
    console.log('this.players', this.players);

  }

}
