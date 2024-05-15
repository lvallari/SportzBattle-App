import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit{

  users!:any[];
  users_o:any[] = [
    {position: 1, name: 'Alfred', image: '../../../assets/images/user1.jpeg', points: 112},
    {position: 2, name: 'John', image: '../../../assets/images/user2.jpg', points: 76},
    {position: 3, name: 'Troy', image: '../../../assets/images/user3.jpg', points: 60},
    {position: 4, name: 'Joe', image: '../../../assets/images/user4.jpg', points: 45},
    {position: 5, name: 'Caitlin', image: '../../../assets/images/user5.jpg', points: 39},
    {position: 6, name: 'Charles', image: '../../../assets/images/user6.png', points: 34},
    {position: 7, name: 'Stephanie', image: '../../../assets/images/user7.png', points: 33},
    {position: 8, name: 'Mary', image: '../../../assets/images/user8.jpg', points: 29},
    {position: 9, name: 'Big Bill', image: '../../../assets/images/user9.jpeg', points: 26},
    {position: 10, name: 'MJ', image: '../../../assets/images/user10.jpg', points: 24},
    {position: 11, name: 'Whitney', image: '../../../assets/images/user11.jpg', points: 22},
    {position: 12, name: 'Wendy', image: '../../../assets/images/user12.jpeg', points: 20},
    {position: 13, name: 'Ralph', image: '../../../assets/images/user13.jpeg', points: 18},
    {position: 14, name: 'Brett', image: '../../../assets/images/user14.jpg', points: 16},
    {position: 15, name: 'Sam', image: '../../../assets/images/user15.jpg', points: 12},
  ];

  ngOnInit(): void {
    this.users = this.users_o.slice(0,8);
    setTimeout(() => {
      this.users = this.users_o.slice(8);
    },7000)
  }

}
