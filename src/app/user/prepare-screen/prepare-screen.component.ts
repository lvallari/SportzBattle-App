import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prepare-screen',
  templateUrl: './prepare-screen.component.html',
  styleUrl: './prepare-screen.component.scss'
})
export class PrepareScreenComponent implements OnInit, OnDestroy{

  @Input() banners!:any[];
  @Input() double_option_has_been_used!:boolean;
  @Input() account_type!:string;

  @Output() make_double = new EventEmitter();

  banner!:string;

  option_selected:boolean = false;

  timerInterval:any;
  countdown_timer:number = 4;

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.countdown_timer -= 1;
      if (this.countdown_timer < 0) this.countdown_timer = 0;
    },1000);

    var index = Math.floor(Math.random() * this.banners.length);
    if (index == this.banners.length) index -= 1;
    this.banner = this.banners[index];
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  makeDouble(){
    this.option_selected = true;
    this.make_double.emit();
  }

}
