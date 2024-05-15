import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-prepare-screen',
  standalone: true,
  imports: [],
  templateUrl: './prepare-screen.component.html',
  styleUrl: './prepare-screen.component.scss'
})
export class PrepareScreenComponent implements OnInit, OnDestroy{

  banner_index:number = 1;

  timerInterval:any;
  countdown_timer:number = 4;

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.countdown_timer -= 1;
      if (this.countdown_timer < 0) this.countdown_timer = 0;
    },1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }


}
