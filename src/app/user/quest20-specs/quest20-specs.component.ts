import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quest20-specs',
  standalone: false,
  templateUrl: './quest20-specs.component.html',
  styleUrl: './quest20-specs.component.scss'
})
export class Quest20SpecsComponent {

  constructor(
    private router:Router
  ){}

  goPlay(){
    this.router.navigate(['user/play-20quest'])
  }

}
