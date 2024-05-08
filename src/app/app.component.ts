import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { DatabaseComponent } from './components/database/database.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsService } from './services/questions.service';
import { TablesService } from './services/tables.service';
import { CommonService } from './services/common.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    GameScreenComponent,
    DatabaseComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[ QuestionsService, TablesService, CommonService ]
})
export class AppComponent {
  title = 'sportzbattle';
}
