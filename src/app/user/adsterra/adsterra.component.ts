import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-adsterra',
  standalone: true,
  templateUrl: './adsterra.component.html',
  styleUrl: './adsterra.component.scss'
})
export class AdsterraComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Input() counter!:number;

  private scriptElement?: HTMLScriptElement;
  private configScript?: HTMLScriptElement;

  is_mobile:boolean = window.innerWidth < 768;

  @ViewChild('adDiv') adDiv!: ElementRef<HTMLDivElement> | undefined;

  /*
  
*/
    atOptions:any;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {

    /*
    // Inject atOptions config
    this.configScript = this.renderer.createElement('script');
    if (this.configScript){
    this.configScript.type = 'text/javascript';
    this.configScript.text = `
      atOptions = {
        'key': '66083ebfe50e5b624fb823fbc5b10d48',
        'format': 'iframe',
        'height': 50,
        'width': 320,
        'params': {},
        'container': 'ad-wrapper'
      };
    `;
    }
    this.renderer.appendChild(document.body, this.configScript);

    // Inject Adsterra invoke script
    this.scriptElement = this.renderer.createElement('script');
    if (this.scriptElement){
    this.scriptElement.src = 'https://www.highperformanceformat.com/66083ebfe50e5b624fb823fbc5b10d48/invoke.js';
    this.scriptElement.type = 'text/javascript';
    this.scriptElement.async = true;
    }
    this.renderer.appendChild(document.body, this.scriptElement);


    console.log('adsterra changes ----');
    */
  }

  ngAfterViewInit() {

    if (this.is_mobile){
      this.atOptions = {
        'key' : '66083ebfe50e5b624fb823fbc5b10d48',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
    };
    }
    else {
      this.atOptions = {
        'key' : '809c7d8fd9f4fb93260caa4f27322a7e',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    }

    console.log("adsloading")
    const conf = document.createElement('script')
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://www.highperformanceformat.com/66083ebfe50e5b624fb823fbc5b10d48/invoke.js";
    conf.innerHTML = `atOptions = ${JSON.stringify(this.atOptions)}`;
    this.adDiv?.nativeElement.append(conf);
    this.adDiv?.nativeElement.append(s);
  }


  ngOnDestroy() {
    if (this.scriptElement) {
      this.renderer.removeChild(document.body, this.scriptElement);
    }
    if (this.configScript) {
      this.renderer.removeChild(document.body, this.configScript);
    }
  }

}