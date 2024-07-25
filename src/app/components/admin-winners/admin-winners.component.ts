import { Component, OnInit } from '@angular/core';
import { AdminSidemenuComponent } from '../admin-sidemenu/admin-sidemenu.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-winners',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminSidemenuComponent, DpDatePickerModule],
  templateUrl: './admin-winners.component.html',
  styleUrl: './admin-winners.component.scss'
})
export class AdminWinnersComponent implements OnInit {

  constructor(
    public userService: UserService,
    public navigationService: NavigationService,
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.route.params.subscribe( (params:any) => {
      this.selected_date_route = params['date'];
    });
  }

  selected_date_route:any;
  selected_date:any;
  players:any[] = [];

  datePickerConfig:any = {
    format: "MM-DD-YYYY",
    placeholder: "Select delivery date"
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
    this.userService.getPlayersByDate(selected_date).subscribe((data: any) => {
      this.players = data;
      console.log('this.players', this.players);
    });
  }

  requestInfo(){
//TODO
  }

  gotoUser(item:any){
    //console.log('this.router', this.router.url);
    this.navigationService.storeAdminUserDashboardRoute(this.router.url.slice(1));
    this.router.navigate(['admin/user-dashboard/' + item.user_id])
  }

}
