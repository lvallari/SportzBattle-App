import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseComponent } from './database/database.component';
import { AdminEditAdvertisementAccountComponent } from './admin-edit-advertisement-account/admin-edit-advertisement-account.component';
import { AdminAdvertisementsManagerComponent } from './admin-advertisements-manager/admin-advertisements-manager.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminVenuesComponent } from './admin-venues/admin-venues.component';
import { AdminWinnersComponent } from './admin-winners/admin-winners.component';
import { AdminUserDashboardComponent } from './admin-user-dashboard/admin-user-dashboard.component';
import { AdminUserVerificationComponent } from './admin-user-verification/admin-user-verification.component';
import { AdminPopUpsComponent } from './admin-pop-ups/admin-pop-ups.component';


const routes: Routes = [
    { path: 'database', component: DatabaseComponent},
    { path: 'edit-advertisement-account/:advertisement_account_id', component: AdminEditAdvertisementAccountComponent},
    { path: 'advertisements-manager', component: AdminAdvertisementsManagerComponent},
    { path: 'users', component: AdminUsersComponent},
    { path: 'venues', component: AdminVenuesComponent},
    { path: 'popups', component: AdminPopUpsComponent},
    { path: 'winners/:date', component: AdminWinnersComponent},
    { path: 'user-dashboard/:user_id', component: AdminUserDashboardComponent},
    { path: 'user-verification/:user_id', component: AdminUserVerificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

export const routingComponents = [
    DatabaseComponent,
    AdminEditAdvertisementAccountComponent,
    AdminAdvertisementsManagerComponent,
    AdminUsersComponent,
    AdminVenuesComponent,
    AdminWinnersComponent,
    AdminUserDashboardComponent,
    AdminUserVerificationComponent,
    AdminPopUpsComponent
]