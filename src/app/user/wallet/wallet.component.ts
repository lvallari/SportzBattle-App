import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { MailingService } from '../../services/mailing.service';
import { environment } from '../../../environments/environment';
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
  
  payment_option!:string;
  venmo_handle!:string;
  cashtag_handle!:string;
  zelle_handle!:string;

  user_verification:any;

  constructor(
    public tablesService: TablesService,
    public userService: UserService,
    public commonService: CommonService,
    public mailingService: MailingService,
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
      this.user.wallet_value = (this.user.wallet / 1000).toFixed(2);


      this.userService.getUserStats(this.user.user_id).subscribe((data:any) => {
      //console.log('stats', data);
      this.stats = data;
      this.user.all_time_points = this.user.points;//data.all_time_points; //this.user.points;
      
      console.log('this.user', this.user);
      this.getLevel();
    });

      //check if user verification exists for this user
      this.tablesService.GetFiltered('user_verifications','user_id', this.user.user_id).subscribe((data:any) => {
        //this.user_verification = data[0];
      })

      //console.log('this.user', this.user);
    });
  }

  redeemCash(){
    console.log('sdfsdf');
    if (this.user.wallet_value < 50){
      $('#notEnoughMoneyModal').modal('show');
    }
    else if (!this.user_verification){
      $('#notVerifiedModal').modal('show');
    }
    else {

      $('#payoutMethodModal').modal('show');
      
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

  selectPaymentMethod() {

    $('#payoutMethodModal').modal('hide');

    //redeem flow
    var user_object = {
      user_id: this.user.user_id,
      payout_method: this.payment_option,
      zelle_handle: this.zelle_handle,
      cashtag_handle: this.cashtag_handle,
      venmo_handle: this.venmo_handle,
      payout_amount: (this.user.wallet/1000).toString(),
      wallet: 0,
      username: this.user.username,
      email: this.user.email
    }

    this.tablesService.UpdateItem('users', 'user_id', user_object).subscribe(() => {
      this.userService.updateUserNoBroadCast('wallet', user_object.wallet);

      this.user.wallet = 0;
      this.user.wallet_value = (this.user.wallet / 100).toFixed(2);

      this.mailingService.payoutRequestedNotification(user_object);
      this.mailingService.payoutRequestedConfirmation(user_object);

    });

    $('#payoutRequestedModal').modal('show');

  }

  gotoUserVerification(){
    var token = this.commonService.crypt('sb2024',JSON.stringify({user_id: this.user.user_id}));
    
    if (environment.production) window.open('https://sptzba.com/user-verification/' + token, '_blank', 'noopener,noreferrer');
    else window.open('http://localhost:4200/user-verification/' + token, '_blank', 'noopener,noreferrer');
  }

}