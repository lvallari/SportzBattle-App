import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
//import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {

  page!:string;
  user!:any;

  constructor(
    //public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService
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
    this.router.navigate([route]);
  }

  
  signOut(){
    this.userService.logoutUser();
  }

  gotoAdminAccount(){
    this.router.navigate(['admin/winners']);
  }
  

}

