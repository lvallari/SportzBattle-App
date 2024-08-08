import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-business-users',
  templateUrl: './business-users.component.html',
  styleUrl: './business-users.component.scss'
})
export class BusinessUsersComponent implements OnInit {
  user:any;
  venue_id!:number;
  players!:any[];

  userServiceSubscription!: Subscription;

  constructor(
    public tablesService:TablesService,
    public userService: UserService
  ){}

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      console.log('this.user', this.user);
      if (this.user.account_type == 'business')  this.loadPlayers();
     
    });
  }

  loadPlayers(){
    this.userService.getUsersByVenue(this.user.venue_id).subscribe((data:any) => {
      this.players = data;
      console.log('players', this.players);
    })
  }

  downloadUsers(){
    //TODO
    this.userService.downloadUsersByVenue(this.user.venue_id).subscribe((data:any) => {
      console.log('download data', data);
      this.downloadReport(data.path);
    })
  }

  downloadReport(file_path:string){
    window.open(environment.baseurl + '/' + file_path);
  }

}
