import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-user-sidemenu',
  templateUrl: './user-sidemenu.component.html',
  styleUrl: './user-sidemenu.component.scss'
})
export class UserSidemenuComponent implements OnInit, OnDestroy{

  user:any;

  page!:string;
  show_menu:boolean = false;

  userSubscription!:Subscription;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {

    this.userSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      console.log('this.user', this.user);
    });

    //console.log(this.router.url);
    this.page = this.router.url;
  }

  ngOnDestroy(): void {
    if(this.userSubscription) this.userSubscription.unsubscribe();
  }

  goto(route:string){
    this.router.navigate([route]);
  }

  signOut(){
    this.userService.logoutUser();
  }

  gotoAdminAccount(){

    //pass current date as parameter
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    var str = month + '-' + day + '-' + year;
    
    this.router.navigate(['admin/winners/' + str]);
  }

  gotoContact(){
    window.open('https://www.sportzbattle.com/contact-8', '_blank');
  }

  gotoHowToWin(){
    window.open('https://www.sportzbattle.com/different-ways-to-win', '_blank');
  }

  battleTokens(){
    window.open('https://www.sportzbattle.com/battle-tokens', '_blank');
  }
  
  closeModal(name:string){
    $('#' + name).modal('hide');
  }

   goPlay(){
     $('#gameType2Modal').modal('hide');
    this.router.navigate(['user/loop-specs']);
  }

  goPlayH2H(){
     $('#gameType2Modal').modal('hide');
    this.router.navigate(['user/h2h-specs']);
  }

  goPlay20Quest(){
     $('#gameType2Modal').modal('hide');
    this.router.navigate(['user/quest20-specs']);
  }

  playMenu(){
    console.log('playMenu()');
    $('#gameType2Modal').modal('show');
  }



}
