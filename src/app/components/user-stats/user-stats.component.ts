import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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
  @Input() show_lives!:boolean;

  number_of_users!:number;

  ngOnChanges(changes: SimpleChanges): void {
    this.number_of_users = 10 + Math.round(Math.random()*10);
  }
  
}
