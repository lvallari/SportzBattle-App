import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { NavigationService } from '../../services/navigation.service';
import { TablesService } from '../../services/tables.service';
import { Subscription } from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-user-dashboard',
  templateUrl: './admin-user-dashboard.component.html',
  styleUrl: './admin-user-dashboard.component.scss'
})
export class AdminUserDashboardComponent implements OnInit, OnDestroy {

  user:any;
  userServiceSubscription!:Subscription;

  games:any[] = [];
  activity:any[] = [];
  max_score!:number;
  points_all_time!:number;
  points_month!:number;

  userx_id!:number;
  userx:any;

  stats:any ={};

  constructor(
    public userService: UserService,
    public commonService: CommonService,
    public navigationService: NavigationService,
    public tablesService: TablesService,
    public router: Router,
    public route: ActivatedRoute
  ){
    this.route.params.subscribe( (params:any) => {
      this.userx_id = params['user_id'];
    });
  }

  ngOnInit(): void {
    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser){
        this.router.navigate(['login']);
        return;
      }
      this.user = currentUser;
      //console.log('this.user', this.user);
      this.getUser();
      this.getData();
    });
  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe()
  }

  getUser(){
    this.tablesService.GetFiltered('users','user_id', this.userx_id).subscribe((data:any) => {
      this.userx = data[0];
    })
  }

  getData(){

    this.userService.getUserStats(this.userx_id).subscribe((data:any) => {
      console.log('stats', data);
      this.stats = data;
    })

    
    this.userService.getUserActivity(this.userx_id).subscribe((data:any) => {
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
      
      //this.max_score = 0;
      //this.points_month = 0;
      //this.points_all_time = 0;
      this.games.forEach((x:any) => {
        x.date = this.commonService.getDateString(x.timestamp);
        //x.is_this_month = this.commonService.isThisMonth(x.date);
        //if (x.is_this_month == true) this.points_month += x.score;
        //this.points_all_time += x.score;
        //if (x.score){
          //if (x.score > this.max_score) this.max_score = x.score;
        //}
      });

      //this.calculateStats();

      //console.log('this.games', this.games);
    })
    
  }

  goPlay(){
    this.router.navigate(['user/play']);
  }

  goBack(){
    var route = this.navigationService.getAdminUserDashboardRoute();
    this.router.navigate([route])
  }

}

