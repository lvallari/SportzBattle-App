import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { DatabaseComponent } from './components/database/database.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsService } from './services/questions.service';
import { TablesService } from './services/tables.service';
import { CommonService } from './services/common.service';
import { MyblobService } from './services/myblob.service';
import { UploadService } from './services/upload.service';
import { UserService } from './services/user.service';
import { MailingService } from './services/mailing.service';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    GameScreenComponent,
    DatabaseComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[ QuestionsService, TablesService, CommonService, MyblobService, UploadService, UserService, MailingService, UserStatsComponent, NavbarComponent ]
})
export class AppComponent {
  title = 'sportzbattle';
}
