import { Routes } from '@angular/router';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { DatabaseComponent } from './components/database/database.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterBusinessComponent } from './components/register-business/register-business.component';
import { BusinessDashboardComponent } from './components/business-dashboard/business-dashboard.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { BusinessUsersComponent } from './components/business-users/business-users.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'register-business', component: RegisterBusinessComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'leaderboard', component: LeaderboardComponent},
    { path: 'play', component: GameScreenComponent},
    { path: 'user-dashboard', component: UserDashboardComponent},
    { path: 'business-dashboard', component: BusinessDashboardComponent},
    { path: 'business-profile', component: BusinessProfileComponent},
    { path: 'business-users', component: BusinessUsersComponent},
    { path: 'database', component: DatabaseComponent}

];
