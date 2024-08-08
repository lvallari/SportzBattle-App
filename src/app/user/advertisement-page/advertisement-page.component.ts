import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertisement-page',
  templateUrl: './advertisement-page.component.html',
  styleUrl: './advertisement-page.component.scss'
})
export class AdvertisementPageComponent implements OnInit {

  @Input() ads!:any[];

  advertisement!:string;

  ngOnInit(): void {
    var index = Math.floor(Math.random() * this.ads.length);
    if (index == this.ads.length) index -= 1;
    this.advertisement = 'https://sportzbattle.blob.core.windows.net/advertisements/' + this.ads[index];
  }

}
