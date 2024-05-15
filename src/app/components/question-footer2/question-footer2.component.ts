import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-question-footer2',
  standalone: true,
  imports: [],
  templateUrl: './question-footer2.component.html',
  styleUrl: './question-footer2.component.scss'
})
export class QuestionFooter2Component implements OnChanges {

  @Input() counter!:number;
  banner_index:number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    this.banner_index = Math.ceil(Math.random()*4);
  }

}
