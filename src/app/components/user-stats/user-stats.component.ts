import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-stats.component.html',
  styleUrl: './user-stats.component.scss'
})
export class UserStatsComponent {

  @Input() user:any;
  
}
