import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-suggestion',
  standalone: false,
  templateUrl: './question-suggestion.component.html',
  styleUrl: './question-suggestion.component.scss'
})
export class QuestionSuggestionComponent implements OnInit {

  itemx:any = {};
  page:number = 1;

  user:any;
    userServiceSubscription!:Subscription;

  constructor(
    public tablesService: TablesService,
    public userService: UserService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      if (!this.user.wallet) this.user.wallet = 0;
    });
  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe();
  }


  submit(){
    if (!this.itemx.sport) this.itemx.invalid_sport = 'Please select a sport';
    if (!this.itemx.question || this.itemx.question.length < 20) this.itemx.invalid_question = 'Please enter a valid question';
    if (!this.itemx.correct_answer) this.itemx.invalid_correct_answer = 'Please enter the correct answer';
    if (!this.itemx.incorrect_answer_1) this.itemx.invalid_incorrect_answer_1 = 'Please an incorrect answer 1';
    if (!this.itemx.incorrect_answer_2) this.itemx.invalid_incorrect_answer_2 = 'Please an incorrect answer 2';
    if (!this.itemx.incorrect_answer_3) this.itemx.invalid_incorrect_answer_3 = 'Please an incorrect answer 3';

    if (this.itemx.invalid_sport || this.itemx.invalid_sport || this.itemx.invalid_correct_answer || 
      this.itemx.invalid_incorrect_answer_1 || this.itemx.invalid_incorrect_answer_2 || this.itemx.invalid_incorrect_answer_3){
        return;
      }
    
    var category;
    if (this.itemx.sport == 'basketball') category = 'NBA';
    if (this.itemx.sport == 'baseball') category = 'MLB';
    if (this.itemx.sport == 'football') category = 'NFL';

    var object = {
      question: this.itemx.question,
      category: category,
      correct_answer: this.itemx.correct_answer,
      option1: this.itemx.incorrect_answer_1,
      option2: this.itemx.incorrect_answer_2,
      option3: this.itemx.incorrect_answer_3,
      submitted_by_user_id: this.user.user_id
    }

    this.tablesService.AddItem('questions_suggestions', object).subscribe(() => {
      this.page = 2;

      //award tokens
      var user_object = {
        user_id: this.user.user_id,
        wallet: this.user.wallet + 10000
      }

      this.tablesService.UpdateItem('users','user_id',user_object).subscribe((data:any) => {
        //this.userService.updateUserNoBroadCast('wallet', user_object.wallet);
      });

      var transaction_object = {
        user_id: this.user.user_id,
        timestamp: Date.now(),
        value: 10000,
        description: 'Question submission'
      }

      this.tablesService.AddItem('transactions', transaction_object).subscribe();

    });

  }

  gotoDashboard(){
    this.router.navigate(['user/user-dashboard'])
  }

  eval(){
    this.itemx.invalid_sport = undefined;
    this.itemx.invalid_correct_answer = undefined;
    this.itemx.invalid_question = undefined;
    this.itemx.invalid_incorrect_answer_1 = undefined;
    this.itemx.invalid_incorrect_answer_2 = undefined;
    this.itemx.invalid_incorrect_answer_3 = undefined;
  }

}
