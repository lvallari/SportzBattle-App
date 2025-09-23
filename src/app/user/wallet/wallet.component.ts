import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
declare var $: any;

@Component({
  selector: 'app-wallet',
  standalone: false,
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit{

  balance!:number;

  userServiceSubscription!:Subscription;
  user:any;

  stats:any;

  constructor(
    public tablesService: TablesService,
    public userService: UserService,
    public commonService: CommonService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser){
        this.router.navigate(['login']);
        return;
      }
      this.user = currentUser;
      if (!this.user.wallet) this.user.wallet = 0;
      this.user.wallet_value = (this.user.wallet / 100).toFixed(2);


      this.userService.getUserStats(this.user.user_id).subscribe((data:any) => {
      //console.log('stats', data);
      this.stats = data;
      this.user.all_time_points = this.user.points;//data.all_time_points; //this.user.points;
      
      console.log('this.user', this.user);
      this.getLevel();
    })
      //console.log('this.user', this.user);
    });
  }

  redeemCash(){
    console.log('sdfsdf');
    if (this.user.wallet_value < 50){
      $('#notEnoughMoneyModal').modal('show');
    }
    else {
      //redeem flow
      var user_object = {
        user_id: this.user.user_id,
        requested_payout: true
      }

      this.tablesService.UpdateItem('users','user_id', user_object).subscribe();
      
    }
  }

   closeModal(name:string){
    $('#' + name).modal('hide');
  }


 getLevel(){
    this.tablesService.GetAll('skill_levels').subscribe((data:any) => {
      this.commonService.assignLevel(this.user, data);
    })
  }

}