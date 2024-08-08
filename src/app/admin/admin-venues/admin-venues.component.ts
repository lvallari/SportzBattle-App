import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-venues',
  templateUrl: './admin-venues.component.html',
  styleUrl: './admin-venues.component.scss'
})
export class AdminVenuesComponent implements OnInit{

  venues!:any[];

  constructor(
    public userService:UserService
  ){}

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues(){
    this.userService.getVenueStatsForAdmin().subscribe((data:any) => {
      this.venues = data;
      console.log('this.venues', this.venues);
    });
  }

}
