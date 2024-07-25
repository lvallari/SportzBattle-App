import { Component, OnInit } from '@angular/core';
import { AdminSidemenuComponent } from '../admin-sidemenu/admin-sidemenu.component';
import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [AdminSidemenuComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  users!:any[];
  users_o:any[] = [];
  query:string = '';

  constructor(
    public userService:UserService,
    public navigationService:NavigationService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUserStatsForAdmin().subscribe((data:any) => {
      this.users = data;
      this.users_o = JSON.parse(JSON.stringify(this.users));
      console.log('this.users', this.users);
    })
  }

  filter(){
    console.log('filter');

    var query = this.query.toLowerCase();
    if (this.query.length > 1){
      this.users = this.users_o.filter((x:any) => {
        return (x.email.toLowerCase().indexOf(query) > -1 || x.username.toLowerCase().indexOf(query) > -1);
      })
    }
    else this.users = this.users_o;
    
  }

  gotoUser(item:any){
    this.navigationService.storeAdminUserDashboardRoute('admin/users');
    this.router.navigate(['admin/user-dashboard/' + item.user_id])
  }
}
