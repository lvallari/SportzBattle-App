import { Routes } from '@angular/router';

export const routes: Routes = [
    
    { path: 'business', loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)},
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
];
