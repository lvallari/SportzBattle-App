import { Component, OnInit } from '@angular/core';
import { AdminSidemenuComponent } from '../admin-sidemenu/admin-sidemenu.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TablesService } from '../../services/tables.service';
import { NavigationService } from '../../services/navigation.service';
import { CommonService } from '../../services/common.service';
import { MailingService } from '../../services/mailing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-winners',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminSidemenuComponent, DpDatePickerModule],
  templateUrl: './admin-winners.component.html',
  styleUrl: './admin-winners.component.scss'
})
export class AdminWinnersComponent implements OnInit {

  selected_date_route:any;
  selected_date:any;
  players:any[] = [];
  itemx:any;

  datePickerConfig:any = {
    format: "MM-DD-YYYY",
    placeholder: "Select delivery date"
  }

  constructor(
    public userService: UserService,
    public navigationService: NavigationService,
    public commonService: CommonService,
    public tablesService: TablesService,
    public mailingService: MailingService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.route.params.subscribe( (params:any) => {
      this.selected_date_route = params['date'];
    });
  }

  

  ngOnInit(): void {
    if (this.selected_date_route) {
      this.loadPlayers(this.selected_date_route);
      //this.selected_date = new Date(this.selected_date_route).toISOString();
    }
  }

  evalSelectedDate(){


    console.log('this.selected_date', this.selected_date);

   
    var selected_date = this.commonService.formatDateToYYYYMMDD(this.selected_date);
    if (selected_date != '0') {
    this.redirectTo(['admin/winners/' + selected_date.replace(/\//g,'-')],{});
    //if (selected_date != '0') this.loadPlayers(selected_date);
    }

    //var selected_date_time = new Date(this.commonService.formatDateToYYYYMMDD(this.selected_date)).getTime();// - timezone_offset;
    //console.log('selected_date', selected_date_time);
  }

  redirectTo(route: string[],params:any){
    this.router.navigateByUrl('/no-page', {skipLocationChange: true}).then(()=>
    this.router.navigate(route, params));
    //this.router.navigate(route, params);
 }


  loadPlayers(selected_date:string){

    forkJoin([
      this.userService.getPlayersByDate(selected_date),
      this.tablesService.GetAll('user_verifications')
    ]).subscribe((data: any) => {
      this.players = data[0];
      var user_verifications = data[1];

      this.players.forEach((x:any) => {
        var record = user_verifications.find((n:any) => {return n.user_id == x.user_id});
        if (record) x.is_verified = true;
        else x.is_verified = false;
      });

      console.log('this.players', this.players);
    });
  }

  requestInfo(item:any, rank:number){
    //username, rank, price, verification_link
    var token = this.commonService.crypt('sb2024',JSON.stringify({user_id: item.user_id}));

    var object = {
      username: item.username,
      email: item.email,
      token: token,
      rank: this.convertToOrdinal(rank),
      prize: this.getPrize(rank),
      date: this.selected_date_route
    }

    this.mailingService.requestInfo(object);

  }

  convertToOrdinal(rank:number){
    if (rank == 1) return '1st';
    else if (rank == 2) return '2nd';
    else if (rank == 3) return '3rd';
    else if (rank == 4) return '4th';
    else return;
  }

  getPrize(rank:number){
    if (rank == 1) return '$100';
    else if (rank == 2) return '$50';
    else if (rank == 3) return '$25';
    else if (rank == 4) return '$10';
    else return;
  }

  gotoUser(item:any){
    //console.log('this.router', this.router.url);
    this.navigationService.storeAdminUserDashboardRoute(this.router.url.slice(1));
    this.router.navigate(['admin/user-dashboard/' + item.user_id])
  }

  seeDetails(item:any){
   this.navigationService.storeAdminUserDashboardRoute(this.router.url.slice(1));
   this.router.navigate(['admin/user-verification/' + item.user_id]);
  }

}
