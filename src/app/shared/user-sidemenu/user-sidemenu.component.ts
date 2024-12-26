import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-sidemenu',
  templateUrl: './user-sidemenu.component.html',
  styleUrl: './user-sidemenu.component.scss'
})
export class UserSidemenuComponent {

  user:any;

  page!:string;
  show_menu:boolean = false;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {

    this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      console.log('this.user', this.user);
    });

    //console.log(this.router.url);
    this.page = this.router.url;
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
  


}
