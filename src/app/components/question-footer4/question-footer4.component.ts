import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-question-footer4',
  standalone: true,
  imports: [],
  templateUrl: './question-footer4.component.html',
  styleUrl: './question-footer4.component.scss'
})
export class QuestionFooter4Component implements OnChanges {

  @Input() counter!:number;
  banner_index:number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    this.banner_index = Math.ceil(Math.random()*4);
  }

}
