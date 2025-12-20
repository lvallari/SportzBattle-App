import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaderboard-table',
  templateUrl: './leaderboard-table.component.html',
  styleUrl: './leaderboard-table.component.scss'
})
export class LeaderboardTableComponent implements OnInit, OnDestroy{

  @Input() banners!:any[];

  banner!:string;

  countdown_interval:any;
  countdown!:string;
  user:any;

  is_mobile:boolean = window.innerWidth < 768;

  position_label!:string;
  points_label!:string;
  winnings_label!:string;

  users!:any[];
  users_o:any[] = [];
  games:any[] = [];

  players:any[] = [];

  data_ready:boolean = false;
  daily_start_time: number = this.commonService.getEpochTimeForTodayAtMidnight();

  userServiceSubscription!:Subscription;

  constructor(
    public userService: UserService,
    public commonService: CommonService,
  ){}
  

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      //console.log('this.user', this.user);
      this.loadData();
    });

    this.position_label = this.is_mobile ? 'Pos.':'Position';
    this.points_label = this.is_mobile ? 'Pts.':'Points';
    this.winnings_label = this.is_mobile ? 'PW':'Potential Winnings';


    this.users = this.users_o.slice(0,5);
    setTimeout(() => {
      this.users = this.users_o.slice(5,10);
    },7000)

    this.countdown_interval = setInterval(() => {
      this.countdown = this.timeUntil3AMET();
    },1000);

    var index = Math.floor(Math.random() * this.banners.length);
    if (index == this.banners.length) index -= 1;
    this.banner = this.banners[index];

  }

  ngOnDestroy(): void {
    clearInterval(this.countdown_interval);
  }

  loadData() {

    console.log('load data LEADERBOARD TABLE!!');
    //this.user.venue_id
    //this.userService.getGamesByVenue(1).subscribe((data: any) => {
    /*
    this.userService.getAllGames().subscribe((data: any) => {
      this.games = data.filter((x: any) => { return x.timestamp >= this.daily_start_time });
      //console.log('this.games', this.games);
      this.filterPlayers();
    })
    */
    this.userService.getInGamesLeaderboard().subscribe((data: any) => {
      this.players = data;
      console.log('players', this.players);

      //this.filterPlayers();
      
    })
  }

  filterPlayers() {

    this.data_ready =false;
    //var games:any = [];

    this.players.forEach((x: any) => {
      
     
        var games;
        games = x.games.filter((n: any) => { return n.timestamp >= this.daily_start_time });

        var points = 0;
        games.forEach((x: any) => { points += x.score; });
        x.points = points;
      

    });

    //if (this.filter == 'points') 
      this.players = this.players.sort((a:any, b:any) => { return b.points - a.points});
    //if (this.filter == 'tokens') this.players = this.players.sort((a:any, b:any) => { return b.tokens_number - a.tokens_number});
    //if (this.filter == 'badges') this.players = this.players.sort((a:any, b:any) => { return b.badges_number - a.badges_number});
    
  
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
    //this.assignLevels();
    this.data_ready =true;

    /*
    this.data_ready =false;
    //games = this.games.filter((x: any) => { return x.timestamp >= this.daily_start_time });

    this.players = [];
    this.games.forEach((x: any) => {
      //x.date = this.commonService.getDateString(x.timestamp);

      var record = this.players.find((n: any) => { return n.user_id == x.user_id });
      if (!record) this.players.push({
        user_id: x.user_id,
        username: x.username,
        image: x.user_image
      });

    });

    this.players.forEach((x: any) => {
      var player_games = this.games.filter((n: any) => { return n.user_id == x.user_id });
      x.games = player_games.length;
      
      var points = 0;
      var max_score = 0;
      player_games.forEach((n: any) => { points += (n.score ? n.score : 0) });
      player_games.forEach((n: any) => { if (n.score > max_score) max_score = n.score; });
      x.points = points;
      x.max_score = max_score;
    });

    this.players = this.players.sort((a:any,b:any) => { return a.score - b.score});
    this.players.forEach((x:any,i:number) => {
      x.position = i+1;
    })

    this.data_ready =true;
    */
  }

  timeUntil3AMET() {
    // Get the current time in UTC
    const now = new Date();

    // Convert the current time to Eastern Time (ET)
    const currentETOffset = +4; // Eastern Daylight Time (EDT) UTC-4
    var easternTime:any = new Date(now.getTime() + (currentETOffset * 60 * 60 * 1000));
    
    // Create a Date object for the next 3 AM ET
    var next3AMET:any = new Date(easternTime);
    next3AMET.setHours(3, 0, 0, 0); // Set time to 3 AM

    // If the current time is past 3 AM ET, set the next 3 AM to the next day
    if (easternTime.getHours() >= 3) {
        next3AMET.setDate(next3AMET.getDate() + 1);
    }

    // Calculate the time difference in milliseconds
    var timeDifference = next3AMET - easternTime;

    // Convert the time difference to a human-readable format (hours, minutes, seconds)
    var hours = Math.floor(timeDifference / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    var minutes_str;
    var seconds_str;
    
    minutes_str = minutes < 10 ? '0' + minutes:minutes;
    seconds_str = seconds < 10 ? '0' + seconds:seconds;


    if (this.is_mobile == true) return `${hours}:${minutes_str}::${seconds_str}`;
    else return `${hours} hrs, ${minutes} min, ${seconds} sec`;
}

}
