import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-stats.component.html',
  styleUrl: './user-stats.component.scss'
})
export class UserStatsComponent implements OnChanges{

  @Input() user:any;
  @Input() counter!:number;
  @Input() active_players!:number;
  @Input() show_lives!:boolean;

  number_of_users!:number;

  constructor(
    public router:Router
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.number_of_users = 10 + Math.round(Math.random()*10);
  }

  confirmExit(){
    console.log('exitGame');
    $('#confirmExitModal').modal('show');
  }

  exitGame(){
    console.log('exit game');
    $('#confirmExitModal').modal('hide');
    if (this.user.account_type == 'player') this.router.navigate(['user-dashboard']);
    else this.router.navigate(['business-dashboard']);
  }

  closeModal(name:string){
    $('#' + name).modal('hide');
  }

  
}
