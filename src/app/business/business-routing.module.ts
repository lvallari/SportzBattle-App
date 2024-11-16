import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { BusinessUsersComponent } from '../user/business-users/business-users.component';
import { BusinessAdManagerComponent } from './business-ad-manager/business-ad-manager.component';

const routes: Routes = [
    { path: 'business-dashboard', component: BusinessDashboardComponent},
    { path: 'business-profile', component: BusinessProfileComponent},
    { path: 'business-users', component: BusinessUsersComponent},
    { path: 'business-ads', component: BusinessAdManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }

export const routingComponents = [
    BusinessDashboardComponent,
    BusinessProfileComponent,
    BusinessUsersComponent,
    BusinessAdManagerComponent
]