import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    public router:Router
  ){}

  gotoRegisterBusiness(){
    this.router.navigate(['register-business']);
  }

}
