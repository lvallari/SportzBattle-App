import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TablesService } from '../../services/tables.service';
import { MailingService } from '../../services/mailing.service';
declare var $: any;


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  users!:any[];
  users_o:any[] = [];
  query:string = '';

  itemx:any;

  tokens:number = 500;

  // filtering direction
  sort_direction_all_time_points:string = 'desc';
  sort_direction_high_points_today:string = 'desc';
  sort_direction_monthly_points:string = 'desc';
  sort_direction_top_score_all_time:string = 'desc';
  sort_direction_games_today:string = 'desc';
  sort_direction_number_of_games:string = 'desc';
  sort_direction_number_of_days_played_in_a_row:string = 'desc';
  sort_direction_longest_streak_questions_in_a_row:string = 'desc';
  sort_direction_last_played:string = 'desc';
  
  constructor(
    public userService:UserService,
    public tablesService: TablesService,
    public navigationService:NavigationService,
    public mailingService:MailingService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUserStatsForAdmin().subscribe((data:any) => {
      this.users = data;
      this.users.forEach((x:any) => {
        if (!x.wallet) x.wallet = 0;
      })
      this.users_o = JSON.parse(JSON.stringify(this.users));
      console.log('this.users', this.users);
      this.sortBy('all_time_points');
    })
  }

  filter(){
    console.log('filter');

    var query = this.query.toLowerCase();
    if (this.query.length > 1){
      this.users = this.users_o.filter((x:any) => {
        return (x.email.toLowerCase().indexOf(query) > -1 || x.username.toLowerCase().indexOf(query) > -1);
      })
    }
    else this.users = this.users_o;
    
  }

  gotoUser(item:any){
    this.navigationService.storeAdminUserDashboardRoute('admin/users');
    this.router.navigate(['admin/user-dashboard/' + item.user_id])
  }

  sortBy(field:string){
    if (field == 'all_time_points'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_all_time_points == 'asc') return a.all_time_points - b.all_time_points;
        else return b.all_time_points - a.all_time_points;
      });
      if (this.sort_direction_all_time_points == 'asc') this.sort_direction_all_time_points = 'desc';
      else this.sort_direction_all_time_points = 'asc';
    }

    if (field == 'high_points_today'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_high_points_today == 'asc') return a.high_points_today - b.high_points_today;
        else return b.high_points_today - a.high_points_today;
      });
      if (this.sort_direction_high_points_today == 'asc') this.sort_direction_high_points_today = 'desc';
      else this.sort_direction_high_points_today = 'asc';
    }

    if (field == 'monthly_points'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_monthly_points == 'asc') return a.monthly_points - b.monthly_points;
        else return b.monthly_points - a.monthly_points;
      });
      if (this.sort_direction_monthly_points == 'asc') this.sort_direction_monthly_points = 'desc';
      else this.sort_direction_monthly_points = 'asc';
    }

    if (field == 'top_score_all_time'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_top_score_all_time == 'asc') return a.top_score_all_time - b.top_score_all_time;
        else return b.top_score_all_time - a.top_score_all_time;
      });
      if (this.sort_direction_top_score_all_time == 'asc') this.sort_direction_top_score_all_time = 'desc';
      else this.sort_direction_top_score_all_time = 'asc';
    }

    if (field == 'games_today'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_games_today == 'asc') return a.games_today - b.games_today;
        else return b.games_today - a.games_today;
      });
      if (this.sort_direction_games_today == 'asc') this.sort_direction_games_today = 'desc';
      else this.sort_direction_games_today = 'asc';
    }

    if (field == 'number_of_games'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_number_of_games == 'asc') return a.number_of_games - b.number_of_games;
        else return b.number_of_games - a.number_of_games;
      });
      if (this.sort_direction_number_of_games == 'asc') this.sort_direction_number_of_games = 'desc';
      else this.sort_direction_number_of_games = 'asc';
    }

    if (field == 'number_of_days_played_in_a_row'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_number_of_days_played_in_a_row == 'asc') return a.number_of_days_played_in_a_row - b.number_of_days_played_in_a_row;
        else return b.number_of_days_played_in_a_row - a.number_of_days_played_in_a_row;
      });
      if (this.sort_direction_number_of_days_played_in_a_row == 'asc') this.sort_direction_number_of_days_played_in_a_row = 'desc';
      else this.sort_direction_number_of_days_played_in_a_row = 'asc';
    }

    if (field == 'longest_streak_questions_in_a_row'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_longest_streak_questions_in_a_row == 'asc') return a.longest_streak_questions_in_a_row - b.longest_streak_questions_in_a_row;
        else return b.longest_streak_questions_in_a_row - a.longest_streak_questions_in_a_row;
      });
      if (this.sort_direction_longest_streak_questions_in_a_row == 'asc') this.sort_direction_longest_streak_questions_in_a_row = 'desc';
      else this.sort_direction_longest_streak_questions_in_a_row = 'asc';
    }

    if (field == 'last_played'){
      this.users = this.users.sort((a:any,b:any) => {
        if (this.sort_direction_last_played == 'asc') return a.last_played_timestamp - b.last_played_timestamp;
        else return b.last_played_timestamp - a.last_played_timestamp;
      });
      if (this.sort_direction_last_played == 'asc') this.sort_direction_last_played = 'desc';
      else this.sort_direction_last_played = 'asc';
    }
    
  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

  saveTokens(){
    var object = {
      user_id: this.itemx.user_id,
      wallet: this.itemx.wallet + this.tokens
    }

    this.tablesService.UpdateItem('users', 'user_id', object).subscribe((data:any) => {
      this.itemx.wallet = this.itemx.wallet + this.tokens;
      $('#tokensModal').modal('hide');

      this.mailingService.tokensAwarded({
        username: this.itemx.name,
        email: this.itemx.email,
        tokens: this.tokens
      });

    })
    
  }

  awardTokens(item:any){
    this.itemx = item;
    $('#tokensModal').modal('show');
  }

  requestedPayout(item:any){
    this.itemx = item;
    $('#payoutRequestedModal').modal('show');
  }

  paymentSent(){
    
  }



}
