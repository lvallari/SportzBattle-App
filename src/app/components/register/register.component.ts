import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouteReuseStrategy } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NavbarComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  step: string = 'form';

  queryString: string = window.location.search;
  urlParams: any;

  registration_data:any;
  account_type:string = 'applicant';

  itemx:any = {};
  user_agreed_to_terms:boolean = false;
  user_is18:boolean = false;
  highlight_terms:boolean = false;

  constructor(
    public tablesService: TablesService,
    public userService: UserService,
    private router: Router,
    private routeReuseStrategy: RouteReuseStrategy
  ) {
    var regdata = localStorage.getItem('regdata');
    if (regdata) { 
      try { 
        this.registration_data = JSON.parse(regdata); 
      }
      catch (e) {
        this.registration_data = {};
      }

      console.log('regdata', this.registration_data);
    }
    
  }

  ngOnInit(): void {
    
    this.routeReuseStrategy.shouldReuseRoute  = () => false;

  }

  registerStaffer(){
    
  }
  redirectTo(route: string[], params: any) {
    this.router.navigateByUrl('/no-page', { skipLocationChange: true }).then(() =>
      this.router.navigate(route, params));
    //this.router.navigate(route, params);
  }

  registerUser(){

    console.log('here');

    //if (!this.itemx.name || this.itemx.name.length == 0) this.itemx.invalid_name = 'Please enter a valid name';
    if (!this.itemx.username || this.itemx.username.length == 0) this.itemx.invalid_username = 'Please enter a valid username';
    
    if (!this.itemx.email || this.itemx.email.length == 0) this.itemx.invalid_email = 'Please enter a valid email';
    else {
      var emailPatternMatch = this.itemx.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
      if (!emailPatternMatch) this.itemx.invalid_email = 'Please enter a valid email';
    }
    
    if (!this.itemx.password || this.itemx.password.length == 0) this.itemx.invalid_password = 'Please enter a password';
    else if (this.itemx.password.length < 8) this.itemx.invalid_password = 'Password must be at least 8 characters';

    if (this.itemx.password != this.itemx.password_confirm) this.itemx.invalid_password_confirm = 'Passwords do not match';

    console.log(this.itemx.invalid_username,this.itemx.invalid_email,this.itemx.invalid_password 
      ,this.itemx.invalid_password_confirm,this.itemx.invalid_agency_name);

    if (this.itemx.invalid_username || this.itemx.invalid_email || this.itemx.invalid_password 
      || this.itemx.invalid_password_confirm || this.itemx.invalid_agency_name) return;

    this.tablesService.GetFiltered('users','email',this.itemx.email.toLowerCase()).subscribe((data:any) => {
      var user_object = data[0];
      
      console.log('this.user_agreed_to_terms',this.user_agreed_to_terms);
      
      if (user_object)  this.itemx.invalid_email = 'Email already exists';


      else if (this.user_agreed_to_terms == true && this.user_is18 == true) {

       
          this.userService.signUpUser({
            username: this.itemx.username,
            email: this.itemx.email,
            password: this.itemx.password,
            account_type: 'player'
          }).subscribe(() => {
            this.step = 'notification';
          })
        
      }
      else {
        
        this.highlight_terms = true;
        setTimeout(() => {
          this.highlight_terms = false;
        },1000)
        
      }
    });
  }

  continue(){

  }

  eval(){
    this.itemx.invalid_name = undefined;
    this.itemx.invalid_agency_name = undefined;
    this.itemx.invalid_email = undefined;
    this.itemx.invalid_password = undefined;
    this.itemx.invalid_password_confirm = undefined;
  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

  goToLogin(){

    //$('#accountCreatedSuccessModal').modal('hide');
    this.router.navigate(['login']);
  }


}
