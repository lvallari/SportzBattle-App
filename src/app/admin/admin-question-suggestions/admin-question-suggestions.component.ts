import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
declare var $: any;

@Component({
  selector: 'app-admin-question-suggestions',
  standalone: false,
  templateUrl: './admin-question-suggestions.component.html',
  styleUrl: './admin-question-suggestions.component.scss'
})
export class AdminQuestionSuggestionsComponent implements OnInit{

  questions!:any[];
  itemx:any;

  constructor(
    public tablesService: TablesService
  ){}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(){
    this.tablesService.GetAll('questions_suggestions').subscribe((data:any) => {
      this.questions = data;
      console.log('questions', this.questions);
    })
  }

  openDetails(item:any){
    this.itemx = item;

    if (this.itemx.category == 'NBA') this.itemx.sport = 'basketball';
    if (this.itemx.category == 'NFL') this.itemx.sport = 'football';
    if (this.itemx.category == 'MLB') this.itemx.sport = 'baseball';

    $('#detailsModal').modal('show');
  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

  deleteItem(item:any){

    //delete from suggestions
    this.tablesService.DeleteFiltered('questions_suggestions', 'question_suggestion_id', item.question_suggestion_id).subscribe(() => {
      $('#detailsModal').modal('hide');
      this.loadQuestions();
    })

  }

  copyItem(){
    
    if (!this.itemx.sport) this.itemx.invalid_sport = 'Please select a sport';
    if (!this.itemx.question || this.itemx.question.length < 20) this.itemx.invalid_question = 'Please enter a valid question';
    if (!this.itemx.correct_answer) this.itemx.invalid_correct_answer = 'Please enter the correct answer';
    if (!this.itemx.option1) this.itemx.invalid_incorrect_answer_1 = 'Please an incorrect answer 1';
    if (!this.itemx.option2) this.itemx.invalid_incorrect_answer_2 = 'Please an incorrect answer 2';
    if (!this.itemx.option3) this.itemx.invalid_incorrect_answer_3 = 'Please an incorrect answer 3';

    if (this.itemx.invalid_sport || this.itemx.invalid_sport || this.itemx.invalid_correct_answer || 
      this.itemx.invalid_incorrect_answer_1 || this.itemx.invalid_incorrect_answer_2 || this.itemx.invalid_incorrect_answer_3){
        return;
    }

     var category;
    if (category == 'basketball') category = 'NBA';
    if (category == 'baseball') category = 'MLB';
    if (category == 'football') category = 'NFL';
    
    var object = {
      question: this.itemx.question,
      category: category,
      correct_answer: this.itemx.correct_answer,
      option1: this.itemx.option1,
      option2: this.itemx.option2,
      option3: this.itemx.option3,
      submitted_by_user_id: this.itemx.submitted_by_user_id,
      difficulty: this.itemx.difficulty
    }

    this.tablesService.AddItem('questions2', object).subscribe((data:any) => {

      console.log('data', data);

      $('#detailsModal').modal('hide');
      $('#questionCopiedModal').modal('show');
      
      this.deleteItem(this.itemx)
      

    });

  }

  eval(){

  }


}
