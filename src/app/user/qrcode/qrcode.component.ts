import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.scss'
})
export class QrcodeComponent implements OnInit, OnChanges {

  @Input() banners!:any[];
  @Input() venue_id!:number;


  width!:number;
  message:string = window.innerWidth >= 768 ? 'Scan here and play for free. You just may win some money!':'Share with a friend!';
  banner!:string;

  
  ngOnInit(): void {

    this.width = window.innerWidth/2 > 350 ? 350:(window.innerWidth/2);
    this.getBanner();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getBanner();
  }

  getBanner(){
    var index = Math.floor(Math.random() * this.banners.length);
    if (index == this.banners.length) index -= 1;
    this.banner = 'https://sportzbattle.blob.core.windows.net/advertisements/' + this.banners[index];
  }


}
