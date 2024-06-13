import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-sidemenu',
  standalone: true,
  imports: [CommonModule],
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


}
