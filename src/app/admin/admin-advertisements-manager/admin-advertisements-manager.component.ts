import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-admin-advertisements-manager',
  templateUrl: './admin-advertisements-manager.component.html',
  styleUrl: './admin-advertisements-manager.component.scss'
})
export class AdminAdvertisementsManagerComponent implements OnInit {

  accounts:any[] = [];
  itemx:any;

  constructor(
    public tablesService: TablesService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(){
    this.tablesService.GetAll('advertisement_accounts').subscribe((data:any) => {
      this.accounts = data;
    })
  }

  createAccount(){
    this.itemx = {};
    $('#addAccountModal').modal('show');

  }

  saveAccount(){

    if (this.itemx.name){
      this.itemx.is_active = 0;
      this.tablesService.AddItem('advertisement_accounts', this.itemx).subscribe((data:any) => {
        $('#addAccountModal').modal('hide');
        this.loadAccounts();
      })
    }

  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

  gotoAccount(item:any){
    this.router.navigate(['admin/edit-advertisement-account/' + item.advertisement_account_id]);
  }

}
