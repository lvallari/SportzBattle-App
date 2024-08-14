import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { UserRoutingModule, routingComponents } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardGraphComponent } from './user-dashboard-graph/user-dashboard-graph.component';
import { PlotlyModule } from 'angular-plotly.js';
import { UserDashboardGraph2Component } from './user-dashboard-graph2/user-dashboard-graph2.component';
import { TimerComponent } from './timer/timer.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { QuestionFooter4Component } from './question-footer4/question-footer4.component';
import { ProfileImageUploadComponent } from './profile-image-upload/profile-image-upload.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { SplashComponent } from './splash/splash.component';
import { SharedModule } from '../shared/shared.module';
import { LeaderboardTableComponent } from './leaderboard-table/leaderboard-table.component';
import { AdvertisementPageComponent } from './advertisement-page/advertisement-page.component';
import { PrepareScreenComponent } from './prepare-screen/prepare-screen.component';
import { GameOverComponent } from './game-over/game-over.component';
import { QrcodeComponent } from './qrcode/qrcode.component';



@NgModule({
  declarations: [
    routingComponents,
    UserDashboardGraphComponent,
    UserDashboardGraph2Component,
    ProfileImageUploadComponent, 
    SplashComponent,
    LeaderboardTableComponent,
    AdvertisementPageComponent,
    PrepareScreenComponent,
    GameOverComponent, 
    QrcodeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    QRCodeModule,
    PlotlyModule,
    SharedModule,
    ImageCropperComponent, 
    TimerComponent,
    UserStatsComponent,
    QuestionFooter4Component
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
