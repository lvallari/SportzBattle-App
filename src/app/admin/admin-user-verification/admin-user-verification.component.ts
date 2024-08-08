import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { TablesService } from '../../services/tables.service';
import { NavigationService } from '../../services/navigation.service';
declare var $: any;

@Component({
  selector: 'app-admin-user-verification',
  templateUrl: './admin-user-verification.component.html',
  styleUrl: './admin-user-verification.component.scss'
})
export class AdminUserVerificationComponent implements OnInit{

  user_id!:number;
  itemx:any;

  image!:string;

  constructor(
    public tablesService: TablesService,
    public navigationService: NavigationService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.route.params.subscribe( (params:any) => {
      this.user_id = params['user_id'];
    });
  }

  ngOnInit(): void {
    this.tablesService.GetFiltered('user_verifications','user_id', this.user_id).subscribe((data:any) => {
      this.itemx = data[0];
    });
  }

  seeImage(image:string){
    this.image = image;
    $('#imagePreviewModal').modal('show');
  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

  goBack(){
    var route = this.navigationService.getAdminUserDashboardRoute();
    this.router.navigate([route]);
  }

}
