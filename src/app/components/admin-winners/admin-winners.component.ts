import { Component } from '@angular/core';
import { AdminSidemenuComponent } from '../admin-sidemenu/admin-sidemenu.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-admin-winners',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminSidemenuComponent, DpDatePickerModule],
  templateUrl: './admin-winners.component.html',
  styleUrl: './admin-winners.component.scss'
})
export class AdminWinnersComponent {

  constructor(
    public userService: UserService,
    public commonService: CommonService
  ){}

  selected_date:any;
  players:any[] = [];

  datePickerConfig:any = {
    format: "MM-DD-YYYY",
    placeholder: "Select delivery date"
  }

  evalSelectedDate(){

    console.log('this.selected_date', this.selected_date);

    var selected_date = this.commonService.formatDateToYYYYMMDD(this.selected_date);
    if (selected_date != '0') this.loadPlayers(selected_date);

    //var selected_date_time = new Date(this.commonService.formatDateToYYYYMMDD(this.selected_date)).getTime();// - timezone_offset;
    //console.log('selected_date', selected_date_time);
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

}
