import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-question-footer4',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './question-footer4.component.html',
  styleUrl: './question-footer4.component.scss'
})
export class QuestionFooter4Component implements OnChanges {

  @Input() counter!:number;
  @Input() venue_id!:number;
  @Input() banners!:any[];
  
  banner!:string;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('banners', this.banners);
    var index = Math.floor(Math.random() * this.banners.length);
    if (index == this.banners.length) index -= 1;
    this.banner = 'https://sportzbattle.blob.core.windows.net/advertisements/' + this.banners[index];
  }

}
