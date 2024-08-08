import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterBusinessComponent } from './register-business/register-business.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';


const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'join/:venue_id', component: RegisterComponent},
    { path: 'register-business', component: RegisterBusinessComponent},
    { path: 'terms-of-service', component: TermsOfServiceComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent},
    { path: 'password-reset', component: PasswordResetComponent},
    { path: 'user-verification/:token', component: UserVerificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

export const routingComponents = [
    LoginComponent,
    RegisterComponent,
    RegisterBusinessComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    PasswordResetComponent,
    UserVerificationComponent
]