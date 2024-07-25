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
import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { AdminEditAdvertisementAccountComponent } from './components/admin-edit-advertisement-account/admin-edit-advertisement-account.component';
import { AdminAdvertisementsManagerComponent } from './components/admin-advertisements-manager/admin-advertisements-manager.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminVenuesComponent } from './components/admin-venues/admin-venues.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AdminWinnersComponent } from './components/admin-winners/admin-winners.component';
import { AdminUserDashboardComponent } from './components/admin-user-dashboard/admin-user-dashboard.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'register-business', component: RegisterBusinessComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'leaderboard', component: LeaderboardComponent},
    { path: 'play', component: GameScreenComponent},
    { path: 'terms-of-service', component: TermsOfServiceComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent},
    { path: 'user-dashboard', component: UserDashboardComponent},
    { path: 'business-dashboard', component: BusinessDashboardComponent},
    { path: 'business-profile', component: BusinessProfileComponent},
    { path: 'business-users', component: BusinessUsersComponent},
    { path: 'user-verification', component: UserVerificationComponent},
    { path: 'password-reset', component: PasswordResetComponent},
    { path: 'admin/database', component: DatabaseComponent},
    { path: 'admin/edit-advertisement-account/:advertisement_account_id', component: AdminEditAdvertisementAccountComponent},
    { path: 'admin/advertisements-manager', component: AdminAdvertisementsManagerComponent},
    { path: 'admin/users', component: AdminUsersComponent},
    { path: 'admin/venues', component: AdminVenuesComponent},
    { path: 'admin/winners/:date', component: AdminWinnersComponent},
    { path: 'admin/user-dashboard/:user_id', component: AdminUserDashboardComponent},
    { path: '**', component: HomeComponent}

];
