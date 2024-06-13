import { CommonModule,  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { UserSidemenuComponent } from '../user-sidemenu/user-sidemenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [CommonModule, UserSidemenuComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.scss'
})
export class BusinessProfileComponent implements OnInit{

  user:any;
  venue_id!:number;
  itemx:any;

  userServiceSubscription!: Subscription;

  constructor(
    public tablesService:TablesService,
    public userService:UserService
  ){}

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      console.log('this.user', this.user);
      if (this.user.account_type == 'business')  this.loadProfile();
     
    });
  }

  loadProfile(){
    this.tablesService.GetFiltered('venues', 'venue_id', this.user.venue_id).subscribe((data:any) => {
      this.itemx = data[0];
      console.log('itemx', this.itemx);
    })
  }

  eval(){
    this.itemx.invalid_business_name = undefined;
    this.itemx.invalid_address1 = undefined;
    this.itemx.invalid_address2 = undefined;
    this.itemx.invalid_city = undefined;
    this.itemx.invalid_state = undefined;
    this.itemx.invalid_postal_code = undefined;
  }

  closeModal(name:string){
    $('#'+ name).modal('hide');
  }

  saveBusiness(){

    this.tablesService.UpdateItem('venues','venue_id', this.itemx).subscribe(() => {
      $('#changesSavedModal').modal('show');
    })

  }

}
