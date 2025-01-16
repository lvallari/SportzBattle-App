import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-pop-ups',
  templateUrl: './admin-pop-ups.component.html',
  styleUrl: './admin-pop-ups.component.scss'
})
export class AdminPopUpsComponent {

  popup!:string;

  show(type:string){
    this.popup = type;
    setTimeout(() => {
      this.popup = '';
    },4000);
  }
}
