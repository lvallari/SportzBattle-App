import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
import { UserDashboardGraphComponent } from '../user-dashboard-graph/user-dashboard-graph.component';
import { UserDashboardGraph2Component } from '../user-dashboard-graph2/user-dashboard-graph2.component';
import { UserSidemenuComponent } from '../user-sidemenu/user-sidemenu.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserDashboardGraphComponent, UserDashboardGraph2Component, UserSidemenuComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  user:any;
  userServiceSubscription!:Subscription;

  games:any[] = [];
  activity:any[] = [];
  max_score!:number;

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
      this.games.forEach((x:any) => {
        x.date = this.commonService.getDateString(x.timestamp);
        if (x.score){
          if (x.score > this.max_score) this.max_score = x.score;
        }
      });

      //console.log('this.games', this.games);
    })
  }

  goPlay(){
    this.router.navigate(['play']);
  }

}
