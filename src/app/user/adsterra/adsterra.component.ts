import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-adsterra',
  standalone: true,
  templateUrl: './adsterra.component.html',
  styleUrl: './adsterra.component.scss'
})
export class AdsterraComponent implements OnInit, OnDestroy {

  private scriptElement?: HTMLScriptElement;
  private configScript?: HTMLScriptElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Inject atOptions config
    this.configScript = this.renderer.createElement('script');
    if (this.configScript){
    this.configScript.type = 'text/javascript';
    this.configScript.text = `
      atOptions = {
        'key': 'b7cf3011ac7f7a5bb1491ee2f4d8651d',
        'format': 'iframe',
        'height': 50,
        'width': 320,
        'params': {}
      };
    `;
    }
    this.renderer.appendChild(document.body, this.configScript);

    // Inject Adsterra invoke script
    this.scriptElement = this.renderer.createElement('script');
    if (this.scriptElement){
    this.scriptElement.src = 'https://www.highperformanceformat.com/b7cf3011ac7f7a5bb1491ee2f4d8651d/invoke.js';
    this.scriptElement.type = 'text/javascript';
    this.scriptElement.async = true;
    }
    this.renderer.appendChild(document.body, this.scriptElement);
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
