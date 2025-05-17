import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsService } from './services/questions.service';
import { TablesService } from './services/tables.service';
import { CommonService } from './services/common.service';
import { MyblobService } from './services/myblob.service';
import { UploadService } from './services/upload.service';
import { UserService } from './services/user.service';
import { MailingService } from './services/mailing.service';
import { ApisService } from './services/apis.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[ QuestionsService, TablesService, CommonService, MyblobService, UploadService, UserService, MailingService, ApisService ]
})
export class AppComponent {
  title = 'sportzbattle';
}
