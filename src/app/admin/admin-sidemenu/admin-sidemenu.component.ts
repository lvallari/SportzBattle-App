import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-sidemenu',
  templateUrl: './admin-sidemenu.component.html',
  styleUrl: './admin-sidemenu.component.scss'
})
export class AdminSidemenuComponent implements OnInit {

  page!:string;
  user!:any;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {

    /*
    this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
    });
    */

    this.page = this.router.url.replace('/a/','');
    console.log('page', this.page);
  }

  goto(route:string){
    this.router.navigate(['admin/' + route]);
  }

  gotoWinners(){
    //pass current date as parameter
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    var str = month + '-' + day + '-' + year;
    
    this.router.navigate(['admin/winners/' + str]);
  }

  
  signOut(){
    this.userService.logoutUser();
  }

  gotoUserAccount(){
    this.router.navigate(['user/user-dashboard']);
  }
  

}

