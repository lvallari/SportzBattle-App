import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-leaderboard-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard-table.component.html',
  styleUrl: './leaderboard-table.component.scss'
})
export class LeaderboardTableComponent implements OnInit, OnDestroy{

  countdown_interval:any;
  countdown!:string;

  is_mobile:boolean = window.innerWidth < 768;

  position_label!:string;
  points_label!:string;
  winnings_label!:string;

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

    this.position_label = this.is_mobile ? 'Pos.':'Position';
    this.points_label = this.is_mobile ? 'Pts.':'Points';
    this.winnings_label = this.is_mobile ? 'PW':'Potential Winnings';


    this.users = this.users_o.slice(0,5);
    setTimeout(() => {
      this.users = this.users_o.slice(5,10);
    },7000)

    this.countdown_interval = setInterval(() => {
      this.countdown = this.timeUntil3AMET();
    },1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.countdown_interval);
  }

  timeUntil3AMET() {
    // Get the current time in UTC
    const now = new Date();

    // Convert the current time to Eastern Time (ET)
    const currentETOffset = +4; // Eastern Daylight Time (EDT) UTC-4
    var easternTime:any = new Date(now.getTime() + (currentETOffset * 60 * 60 * 1000));
    
    // Create a Date object for the next 3 AM ET
    var next3AMET:any = new Date(easternTime);
    next3AMET.setHours(3, 0, 0, 0); // Set time to 3 AM

    // If the current time is past 3 AM ET, set the next 3 AM to the next day
    if (easternTime.getHours() >= 3) {
        next3AMET.setDate(next3AMET.getDate() + 1);
    }

    // Calculate the time difference in milliseconds
    var timeDifference = next3AMET - easternTime;

    // Convert the time difference to a human-readable format (hours, minutes, seconds)
    var hours = Math.floor(timeDifference / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    var minutes_str;
    var seconds_str;
    
    minutes_str = minutes < 10 ? '0' + minutes:minutes;
    seconds_str = seconds < 10 ? '0' + seconds:seconds;


    if (this.is_mobile == true) return `${hours}:${minutes_str}::${seconds_str}`;
    else return `${hours} hrs, ${minutes} min, ${seconds} sec`;
}

}
