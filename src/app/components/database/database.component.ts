import { Component, OnInit } from '@angular/core';
//import { TablesService } from '../../services/tables.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { TablesService } from '../../services/tables.service';
import { MyblobService } from '../../services/myblob.service';
import { UploadService } from '../../services/upload.service';
import { SidemenuComponent } from '../../components/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,  SidemenuComponent, CommonModule],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent implements OnInit {

  filters: any = {};

  questions:any[] = [];
  searchTimeout:any;

  questionx:any;
  page:number = 0;

  invalid_category!:string;
  invalid_question!:string;
  invalid_correct_answer!:string;
  invalid_option1!:string;
  invalid_option2!:string;
  invalid_option3!:string;
  invalid_option4!:string;
  invalid_difficulty!:string;
  invalid_value_points!:string;

  file!:File | null;

  fileUploadedSubscription!: Subscription;
  uploaded_message!:string;
  
  constructor(
    //public tablesService: TablesService,
    public questionsService: QuestionsService,
    public tablesService: TablesService,
    public myBlobService: MyblobService,
    public uploadService: UploadService
  ){}


  ngOnInit(): void {

    this.filters.categories = {};
    this.filters.difficulties = {};
    this.filters.categories.all = true;
    this.filters.difficulties.all = true;
    this.setAllCategories();
    this.setAllDifficulties();
    this.getData(0);

    this.fileUploadedSubscription = this.myBlobService._fileUploaded.subscribe((filename) => {
      console.log('image upload status', status);
      if (filename) {
        $('#uploadModal').modal('hide');
        $('#uploadingRecordsModal').modal('show');
        this.uploadService.BatchUpload(filename).subscribe((data:any) => {
          this.uploaded_message = data.message;
          console.log('data', data);
          $('#uploadingRecordsModal').modal('hide');
          $('#uploadedCompleteModal').modal('show');
          this.getData(0);
        });
      }
    });
    

  }

  categorySelected(category:string){

    console.log('category selected');

    setTimeout(() => {
      if (category == 'nfl' && this.filters.categories.nfl){
        this.filters.categories.nba = false;
        this.filters.categories.mlb = false;
      }
      if (category == 'mlb' && this.filters.categories.mlb){
        this.filters.categories.nba = false;
        this.filters.categories.nfl = false;
      }
      if (category == 'nba' && this.filters.categories.nba){
        this.filters.categories.nfl = false;
        this.filters.categories.mlb = false;
      }
  
      this.evalFilters();
    },50)
    
  }

  evalFilters() {


    console.log('this.filters.categories.all', this.filters.categories.all);

    setTimeout(() => {
      if (this.filters.categories.nba != true || this.filters.categories.mlb != true || this.filters.categories.nfl != true) {
        this.filters.categories.all = false;
      }

      else if (this.filters.categories.nba == true || this.filters.categories.mlb == true || this.filters.categories.nfl == true) {
        this.filters.categories.all = true;
      }
    }, 50);

    console.log('this.filters', this.filters);
    this.getData(0);

  }

  evalFilters2() {

    setTimeout(() => {
      if (this.filters.difficulties.one != true || this.filters.difficulties.two != true || this.filters.difficulties.three != true ||
        this.filters.difficulties.four != true || this.filters.difficulties.five != true ||
        this.filters.difficulties.six != true || this.filters.difficulties.seven != true || this.filters.difficulties.zero != true) {
        this.filters.difficulties.all = false;
      }
      else if (this.filters.difficulties.one == true || this.filters.difficulties.two == true || this.filters.difficulties.three == true ||
        this.filters.difficulties.four == true || this.filters.difficulties.five == true ||
        this.filters.difficulties.six == true || this.filters.difficulties.seven == true || this.filters.difficulties.zero == true) {
        this.filters.difficulties.all = true;
      }
      this.getData(0);
    },50);

  }

  setAllCategories() {
    if (this.filters.categories.all == true) {
      this.filters.categories.nba = true;
      this.filters.categories.mlb = true;
      this.filters.categories.nfl = true;
    }
  }

  setAllDifficulties(){
    if (this.filters.difficulties.all == true){
      this.filters.difficulties.one = true;
      this.filters.difficulties.two = true;
      this.filters.difficulties.three = true;
      this.filters.difficulties.four = true;
      this.filters.difficulties.five = true;
      this.filters.difficulties.six = true;
      this.filters.difficulties.seven = true;
      this.filters.difficulties.zero = true;
    }
  }

  getData(page:number){

    this.page = 0;

    if (!this.filters.categories.all && !this.filters.categories.nfl && !this.filters.categories.mlb && !this.filters.categories.nba) {
      this.questions = [];
      return;
    }
    if (!this.filters.difficulties.all && !this.filters.difficulties.one && !this.filters.difficulties.two && !this.filters.difficulties.three
      && !this.filters.difficulties.four && !this.filters.difficulties.five && !this.filters.difficulties.six && !this.filters.difficulties.seven 
      && !this.filters.difficulties.zero) {
        this.questions = [];
        return;
      }

    this.questionsService.Get(this.filters,page).subscribe((data:any) => {
      this.questions = data;
    })
  }

  goSearch(){
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.getData(0);
    },300);
  }

  editQuestion(item:any){
    if (item) this.questionx = item;
    else this.questionx = {};

    $('#editQuestionModal').modal('show');
  }

  saveQuestion(){

    if (!this.questionx.category) this.invalid_category = 'Invalid category';
    if (!this.questionx.question) this.invalid_question = 'Invalid question';
    if (!this.questionx.option1) this.invalid_option1 = 'Invalid wrong answer';
    if (!this.questionx.option2) this.invalid_option2 = 'Invalid wrong answer';
    if (!this.questionx.option3) this.invalid_option3 = 'Invalid wrong answer';
    if (!this.questionx.option4) this.invalid_option4 = 'Invalid wrong answer';
    if (!this.questionx.difficulty) this.invalid_difficulty = 'Invalid difficulty';
    if (!this.questionx.value_points) this.invalid_value_points = 'Invalid value points';

    if (this.invalid_category || this.invalid_question || this.invalid_option1 || this.invalid_option2 || this.invalid_option3 || this.invalid_option4 ||
      this.invalid_difficulty || this.invalid_value_points) return;

    var question_object = {
      question_id: this.questionx.question_id ? this.questionx.question_id:null,
      question: this.questionx.question,
      option1: this.questionx.option1,
      option2: this.questionx.option2,
      option3: this.questionx.option3,
      option4: this.questionx.option4,
      difficulty: this.questionx.difficulty,
      value_points: this.questionx.value_points,
      category: this.questionx.category
    }

    if (question_object.question_id){
      this.tablesService.UpdateItem('questions','question_id', question_object).subscribe(() => {
        $('#editQuestionModal').modal('hide');
        $('#changesSavedModal').modal('show');
      })
    }
    else {
      this.tablesService.AddItem('questions', question_object).subscribe(() => {
        $('#editQuestionModal').modal('hide');
        $('#questionAddedModal').modal('show');
      })
    }

  }

  confirmDelete(item:any){
    this.questionx = item;
    $('#confirmDeleteModal').modal('show');
  }

  deleteQuestion(){
    this.tablesService.DeleteFiltered('questions','question_id',this.questionx.question_id).subscribe(() => {
      $('#confirmDeleteModal').modal('hide');
      $('#questionDeletedModal').modal('show');
      this.getData(0);
    })
  }

  closeModal(name:string){
    $('#'+ name).modal('hide');
  }

  clearAlerts(){
    this.invalid_category = '';
    this.invalid_question = '';
    this.invalid_option1 = '';
    this.invalid_option2 = '';
    this.invalid_option3 = '';
    this.invalid_option4 = '';
    this.invalid_difficulty = '';
    this.invalid_value_points = '';
  }

  clearQuery(){
    this.filters.query = '';
    this.getData(0);
  }

  loadMore(){
    this.page += 1;
    this.questionsService.Get(this.filters,this.page).subscribe((data:any) => {
      this.questions = this.questions.concat(data);
    });
  }

  uploadModal(){
    this.file = null;
    $('#uploadModal').modal('show');
  }

  fileChangeEvent(event:any){
    console.log('event', event);
    if (event.target.files[0]) this.file = event.target.files[0];
  }

  uploadFile(){
    this.myBlobService.uploadBulkFile(this.file,this.file?.name);
  }

}
