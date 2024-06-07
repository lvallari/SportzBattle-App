import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSidemenuComponent } from '../user-sidemenu/user-sidemenu.component';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, UserSidemenuComponent],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit, OnDestroy{

  players:any[] = [];
  user:any;
  data:any[] = [];
  games:any[] = [];
  tab:string = 'all-time';

  userServiceSubscription!:Subscription;

  constructor(
    public userService: UserService,
    public commonService: CommonService
  ){}

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      //console.log('this.user', this.user);
      this.loadData();
    });
    
  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe();
  }

  loadData(){
    this.userService.getGamesByVenue(this.user.venue_id).subscribe((data:any) => {
      this.games = data;

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
      })

      console.log('this.games', this.games);
      console.log('this.players', this.players);

    })
  }

}
