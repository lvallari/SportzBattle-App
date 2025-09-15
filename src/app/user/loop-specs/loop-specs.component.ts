import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loop-specs',
  standalone: false,
  templateUrl: './loop-specs.component.html',
  styleUrl: './loop-specs.component.scss'
})
export class LoopSpecsComponent {

  constructor(
    private router: Router
  ){}

  goPlay(){
    this.router.navigate(['user/play'])
  }

}
