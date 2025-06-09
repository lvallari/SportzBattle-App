import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-user-stats-h2h',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-stats-h2h.component.html',
  styleUrl: './user-stats-h2h.component.scss'
})
export class UserStatsH2hComponent implements OnChanges{

  @Input() user:any;
  @Input() counter!:number;
  @Input() round_number!:number;
  
  number_of_users!:number;

  constructor(
    public router:Router
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.number_of_users = 10 + Math.round(Math.random()*10);
  }

  confirmExit(){
    //console.log('exitGame');
    $('#confirmExitModal').modal('show');
  }

  exitGame(){
    //console.log('exit game');
    $('#confirmExitModal').modal('hide');
    this.router.navigate(['user/lobby']);
  }

  closeModal(name:string){
    $('#' + name).modal('hide');
  }

  showGameTypeModal(){
    $('#gameTypeModal').modal('show');
  }

  
}
