import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Router, RouteReuseStrategy } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrl: './register-business.component.scss'
})
export class RegisterBusinessComponent implements OnInit {

  step: string = 'form';

  queryString: string = window.location.search;
  urlParams: any;

  registration_data:any;
  account_type:string = 'applicant';

  itemx:any = {};
  user_agreed_to_terms:boolean = true;
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
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(route, params));
    //this.router.navigate(route, params);
  }

  registerBusiness(){

    if (!this.itemx.venue || this.itemx.venue.length == 0) this.itemx.invalid_venue = 'Please enter a valid venue name';
    
    if (!this.itemx.name || this.itemx.name.length == 0) this.itemx.invalid_name = 'Please enter a valid name';
    
    if (!this.itemx.email || this.itemx.email.length == 0) this.itemx.invalid_email = 'Please enter a valid email';
    else {
      var emailPatternMatch = this.itemx.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
      if (!emailPatternMatch) this.itemx.invalid_email = 'Please enter a valid email';
    }
    
    if (!this.itemx.password || this.itemx.password.length == 0) this.itemx.invalid_password = 'Please enter a password';
    else if (this.itemx.password.length < 8) this.itemx.invalid_password = 'Password must be at least 8 characters';

    if (this.itemx.password != this.itemx.password_confirm) this.itemx.invalid_password_confirm = 'Passwords do not match';

    if (this.itemx.invalid_name || this.itemx.invalid_email || this.itemx.invalid_password 
      || this.itemx.invalid_password_confirm || this.itemx.invalid_agency_name) return;

    this.tablesService.GetFiltered('users','email',this.itemx.email.toLowerCase()).subscribe((data:any) => {
      var user_object = data[0];
      
      console.log('this.user_agreed_to_terms',this.user_agreed_to_terms);
      
      if (user_object)  this.itemx.invalid_email = 'Email already exists';


      else if (this.user_agreed_to_terms == true) {

        var business_object = {
          business_name: this.itemx.venue
        }

        this.tablesService.AddItem('venues', business_object).subscribe((data: any) => {

          var venue_id = data.id;

          var advertisement_object = {
            name: business_object.business_name,
            is_active: true,
            venue_id: venue_id
          }

          this.tablesService.AddItem('advertisement_accounts', advertisement_object).subscribe((data2:any) => {

            this.userService.signUpUser({
              name: this.itemx.name,
              email: this.itemx.email,
              password: this.itemx.password,
              account_type: 'business',
              venue_id: venue_id
            }).subscribe(() => {
              this.step = 'notification';
            });

          })

          

        });
     
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

