import { Component, OnInit } from '@angular/core';
import { TablesService } from './../../services/tables.service';
import * as sha512 from 'js-sha512';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  password: string = '';
  confirm_password: string = '';

  invalid_password:string = '';
  invalid_confirm_password = '';

  user_found: boolean = false;
  user:any;


  constructor(
    public tablesService: TablesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');


    this.tablesService.GetFiltered('users','password_reset_token',token).subscribe((data: any) => {
      console.log('data', data);
      this.user = data[0];
      if (this.user) this.user_found = true;
    });

  }

  submitPassword(){
    if (!this.password) this.invalid_password = 'Please enter a valid password';
    else if (this.password.length < 8) this.invalid_password = 'Password must be at least 8 characters';
    else if (this.password != this.confirm_password) this.invalid_confirm_password = 'Passwords do not match';

    if (this.invalid_password || this.invalid_confirm_password) return;

    //reset password
    var user_object = {
      user_id: this.user.user_id,
      password: sha512.sha512(this.password)
    }

    this.tablesService.UpdateItem('users','user_id',user_object).subscribe((data:any) => {
      $('#resetSuccessModal').modal('show');
    })
  }

  gotoLogin(){
    $('#resetSuccessModal').modal('hide');
    this.router.navigate(['login']); 
  }

  closeModal(name:string){
    $('#'+ name).modal('hide');
  }

  clearAlerts(){
    this.invalid_password = '';
    this.invalid_confirm_password = '';
  }

}
