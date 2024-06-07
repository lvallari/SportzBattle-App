import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { TablesService } from '../../services/tables.service';
import { Subscription } from 'rxjs';
import { UserSidemenuComponent } from '../user-sidemenu/user-sidemenu.component';
import { BusinessDashboardGraphComponent } from '../business-dashboard-graph/business-dashboard-graph.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-dashboard',
  standalone: true,
  imports: [BusinessDashboardGraphComponent, UserSidemenuComponent, CommonModule],
  templateUrl: './business-dashboard.component.html',
  styleUrl: './business-dashboard.component.scss'
})
export class BusinessDashboardComponent implements OnInit, OnDestroy {

  user:any;
  userServiceSubscription!:Subscription;

  games:any[] = [];
  activity:any[] = [];
  max_score!:number;
  venue:any;
  players:any[] = [];

  constructor(
    public userService: UserService,
    public commonService: CommonService,
    public tablesService: TablesService,
    public router: Router
  ){

  }

  ngOnInit(): void {
    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
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

  goPlay(){
    this.router.navigate(['play']);
  }

}

