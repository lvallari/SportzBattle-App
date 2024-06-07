import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
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
