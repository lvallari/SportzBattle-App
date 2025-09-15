import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-h2h-specs',
  standalone: false,
  templateUrl: './h2h-specs.component.html',
  styleUrl: './h2h-specs.component.scss'
})
export class H2hSpecsComponent {

  constructor(
      private router:Router
    ){}
  
    goPlay(){
      this.router.navigate(['user/lobby'])
    }

  }
