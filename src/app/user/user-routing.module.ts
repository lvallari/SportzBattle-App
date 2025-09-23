import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ScoutingComponent } from './scouting/scouting.component';
import { LobbyComponent } from './lobby/lobby.component';
import { Gameh2hComponent } from './gameh2h/gameh2h.component';
import { Game20questComponent } from './game20quest/game20quest.component';
import { LoopSpecsComponent } from './loop-specs/loop-specs.component';
import { Quest20SpecsComponent } from './quest20-specs/quest20-specs.component';
import { H2hSpecsComponent } from './h2h-specs/h2h-specs.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
    { path: 'settings', component: SettingsComponent},
    { path: 'leaderboard', component: LeaderboardComponent},
    { path: 'play', component: GameScreenComponent},
    { path: 'playh2h/:h2h_game_id', component: Gameh2hComponent},
    { path: 'user-dashboard', component: UserDashboardComponent},
    { path: 'scouting', component: ScoutingComponent},
    { path: 'lobby', component: LobbyComponent},
    { path: 'play-20quest', component: Game20questComponent},
    { path: 'loop-specs', component: LoopSpecsComponent},
    { path: 'quest20-specs', component: Quest20SpecsComponent},
    { path: 'h2h-specs', component: H2hSpecsComponent},
    { path: 'wallet', component: WalletComponent}
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
    Gameh2hComponent,
    Game20questComponent,
    LoopSpecsComponent,
    Quest20SpecsComponent,
    H2hSpecsComponent,
    WalletComponent
]