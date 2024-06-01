import { Routes } from '@angular/router';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { DatabaseComponent } from './components/database/database.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'play', component: GameScreenComponent},
    { path: 'user-dashboard', component: UserDashboardComponent},
    { path: 'database', component: DatabaseComponent}

];
