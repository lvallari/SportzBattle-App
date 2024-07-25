import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  admin_user_dashboard_route!:string;

  constructor() { }

  storeAdminUserDashboardRoute(route: string) {
    this.admin_user_dashboard_route = route;
  }

  getAdminUserDashboardRoute() {
    return this.admin_user_dashboard_route;
  }
}
