import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-prepare-screen',
  templateUrl: './prepare-screen.component.html',
  styleUrl: './prepare-screen.component.scss'
})
export class PrepareScreenComponent implements OnInit, OnDestroy{

  @Input() banners!:any[];

  banner!:string;

  timerInterval:any;
  countdown_timer:number = 4;

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.countdown_timer -= 1;
      if (this.countdown_timer < 0) this.countdown_timer = 0;
    },1000);

    var index = Math.floor(Math.random() * this.banners.length);
    if (index == this.banners.length) index -= 1;
    this.banner = 'https://sportzbattle.blob.core.windows.net/advertisements/' + this.banners[index];
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }


}
