import { Component, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { AdsterraComponent } from '../adsterra/adsterra.component';

@Component({
  selector: 'app-question-footer4',
  standalone: true,
  imports: [QRCodeModule, AdsterraComponent],
  templateUrl: './question-footer4.component.html',
  styleUrl: './question-footer4.component.scss'
})
export class QuestionFooter4Component implements OnChanges, OnDestroy {

  @Input() counter!:number;
  @Input() venue_id!:number;
  @Input() banners!:any[];
  
  banner!:string;

  private adScriptElement?: HTMLScriptElement;

  constructor(
    private renderer: Renderer2
  ){}



  ngOnChanges(changes: SimpleChanges): void {

    this.adScriptElement = this.renderer.createElement('script');
    if (this.adScriptElement){
    this.adScriptElement.src = 'https://www.highperformanceformat.com/66083ebfe50e5b624fb823fbc5b10d48/invoke.js'; // replace with your URL
    this.adScriptElement.type = 'text/javascript';
    this.adScriptElement.async = true;
    }

    this.renderer.appendChild(document.body, this.adScriptElement);

    //console.log('banners', this.banners);
    var index = Math.floor(Math.random() * this.banners.length);
    if (index == this.banners.length) index -= 1;
    this.banner = this.banners[index];
  }

  ngOnDestroy() {
    if (this.adScriptElement) {
      this.renderer.removeChild(document.body, this.adScriptElement);
    }
  }

}
