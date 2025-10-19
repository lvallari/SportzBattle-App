import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insufficient-funds',
  standalone: false,
  templateUrl: './insufficient-funds.component.html',
  styleUrl: './insufficient-funds.component.scss'
})
export class InsufficientFundsComponent {

  game!:string | null;

  constructor(

    private router: Router

  ){

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      this.game = urlParams.get('g');
      console.log('game', this.game);

  }

  gotoSubmitQuestion(){
    this.router.navigate(['user/question-suggestion']);
  }

  gotoDashboard(){
    this.router.navigate(['user/user-dashboard']);
  }


}
