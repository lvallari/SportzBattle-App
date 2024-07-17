import { Component, OnInit } from '@angular/core';
import { AdminSidemenuComponent } from '../admin-sidemenu/admin-sidemenu.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [AdminSidemenuComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  users!:any[];

  constructor(
    public userService:UserService
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUserStatsForAdmin().subscribe((data:any) => {
      this.users = data;
      console.log('this.users', this.users);
    })
  }
}
