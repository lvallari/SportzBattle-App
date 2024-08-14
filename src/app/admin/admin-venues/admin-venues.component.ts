import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TablesService } from '../../services/tables.service';
declare var $: any;

@Component({
  selector: 'app-admin-venues',
  templateUrl: './admin-venues.component.html',
  styleUrl: './admin-venues.component.scss'
})
export class AdminVenuesComponent implements OnInit{

  venues!:any[];
  users!:any[];
  itemx:any;

  constructor(
    public userService:UserService, 
    public tablesService: TablesService
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

  showPlayers(item:any){
    this.itemx = item;
    this.tablesService.GetFiltered('users','venue_id', item.venue_id).subscribe((data:any) => {
      this.users = data.filter((x:any) => { return x.account_type == 'player'});
      $('#usersModal').modal('show');
    })
  }

  closeModal(name:string){
    $('#'+ name).modal('hide');
  }

}
