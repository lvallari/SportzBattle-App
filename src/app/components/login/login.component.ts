import { Component, Input } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { MailingService } from '../../services/mailing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
declare var $: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email!: string;
  reset_email!:string;
  password!: string;

  invalid_email: string | undefined;
  invalid_password: string | undefined;

  show_incorrect_credentials: boolean = false;
  show_email_not_verified: boolean = false;
  show_password_needed: boolean = false;
  page:string = 'form';

  constructor(
    public userService: UserService,
    public mailingService: MailingService,
    public tablesService: TablesService,
    public commonService: CommonService
  ){

    this.userService._loginStatus.subscribe((data) => {
      console.log('data', data);
      if (data){
        if (data.message == 'Password needed'){
          this.show_incorrect_credentials = true;
        }
        if (data.message == 'User not found.' || data.message == 'Password is incorrect.') this.show_incorrect_credentials = true;
        else if (data.message == 'Email has not been verified') this.show_email_not_verified = true;
        else if (data.message == 'Login successful'){
          this.userService.loginReq(data.user);
        }
      }
    });

  }

  submit(){

    if (!this.email) this.invalid_email = 'Please enter your email';
    if (!this.password) this.invalid_password = 'Please enter your password';

    if (this.invalid_email || this.invalid_password) return;

    this.userService.loginUser(this.email, this.password);

  }

  forgotPassword(){
    this.reset_email = this.email;
    $('#passwordResetModal').modal('show');
  }

  verifyEmail(){
    $('#emailVerificationLinkSentModal').modal('show');
    this.tablesService.GetFilteredX('users','email',this.email,'user_id,email,first_name').subscribe((data:any) => {
      var user = data[0];
      this.mailingService.verifyEmail(user);
    })
  }

  /*
  resetPassword(){
    $('#passwordResetSentModal').modal('show');
    this.tablesService.GetFilteredX('users','email',this.email,'user_id,email').subscribe((data:any) => {
      var user = data[0];
      this.mailingService.passwordReset(user);
    })
  }
  */

  sendResetPassword(){
    this.tablesService.GetFilteredX('users','email',this.reset_email,'user_id,email').subscribe((data:any) => {
      var user = data[0];
      if(user) {
        
        //write token and expiration date
        var user_object = {
          user_id: user.user_id,
          password_reset_token: this.commonService.generateToken(),
          password_reset_expiration: Date.now() + (1000 * 60 * 60 * 24 * 1)
        }

        this.tablesService.UpdateItem('users', 'user_id', user_object).subscribe();

        this.mailingService.passwordReset(user, user_object.password_reset_token);

      }
      $('#passwordResetModal').modal('hide');
      //$('#emailVerificationLinkSentModal').modal('show');
      this.page = 'notification';
    })
  }



  clearAlerts(){
    this.invalid_email = undefined;
    this.invalid_password = undefined;

    this.show_email_not_verified = false;
    this.show_incorrect_credentials = false;

  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

}

