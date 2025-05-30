import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ScoutingComponent } from './scouting/scouting.component';
import { LobbyComponent } from './lobby/lobby.component';
import { Gameh2hComponent } from './gameh2h/gameh2h.component';


const routes: Routes = [
    { path: 'settings', component: SettingsComponent},
    { path: 'leaderboard', component: LeaderboardComponent},
    { path: 'play', component: GameScreenComponent},
    { path: 'playh2h/:h2h_game_id', component: Gameh2hComponent},
    { path: 'user-dashboard', component: UserDashboardComponent},
    { path: 'scouting', component: ScoutingComponent},
    { path: 'lobby', component: LobbyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

export const routingComponents = [
    SettingsComponent,
    LeaderboardComponent,
    GameScreenComponent,
    UserDashboardComponent,
    ScoutingComponent,
    LobbyComponent,
    Gameh2hComponent
]