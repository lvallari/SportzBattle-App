import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() is_home!:boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){
    
  }

  goto(route:string){
    this.router.navigate([route]);
  }
}
