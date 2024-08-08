import { Component, OnInit } from '@angular/core';
import { MyblobService } from '../../services/myblob.service';
import { TablesService } from '../../services/tables.service';
import {ActivatedRoute, Router} from "@angular/router";
import { lastValueFrom, firstValueFrom } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-admin-edit-advertisement-account',
  templateUrl: './admin-edit-advertisement-account.component.html',
  styleUrl: './admin-edit-advertisement-account.component.scss'
})
export class AdminEditAdvertisementAccountComponent implements OnInit {

  itemx:any = {};
  image_preview:any;
  image_ratio_ok:boolean = false;
  image_type!:string;

  type_text!:string;
  ratio_per_type!:string;
  ratio_ok:boolean = true;

  show_spinner:boolean = false;

  advertisement_account_id!:number;
  file!:File;

  images_desktop!:any[];
  images_mobile!:any[];
  images_banner!:any[];

  account_images!:any[];
  imagex!:string;
  status!:string;
  has_changed:boolean = false;

  constructor(
    public myblobService: MyblobService,
    private route: ActivatedRoute,
    public tablesService: TablesService,
    private router: Router,
  ){
    this.route.params.subscribe( params => {
      this.advertisement_account_id = params['advertisement_account_id'];
    });
  }

  ngOnInit(): void {
    if (this.advertisement_account_id > 0) this.loadAccount();
    else this.itemx = {};

    this.getImages();
  }

  loadAccount(){
    this.tablesService.GetFiltered('advertisement_accounts','advertisement_account_id', this.advertisement_account_id).subscribe((data:any) => {
      this.itemx = data[0];
      if (!this.itemx) this.router.navigate(['admin/advertisements-manager']);

      if (this.itemx.is_active == 1) this.status = 'Active';
      else this.status = 'Not Active';
      
    })
  }

  eval(){
    this.has_changed = true;
  }

  fileChangeEvent(event: any, type: string) {
    console.log('event', event);
    this.image_type = type;
    //this.image_preview = event.target.result;
    const file = event.target.files[0];
    this.file = file;
    const preview = document.getElementById('image_preview');
    const reader = new FileReader();
    var thisx = this;
   
    if (file) {
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function() {
          //console.log(img.width, img.height);
          var ratio = img.width / img.height;
          
          if (type == 'desktop'){
            thisx.type_text = 'full-page ads on large screens';
            thisx.ratio_per_type = '16:9';
            if (ratio > 1.4 && ratio < 2.0) thisx.ratio_ok = true;
            else thisx.ratio_ok = false;
          }
          else if (type == 'mobile'){
            thisx.type_text = 'full-page ads on mobile devices';
            thisx.ratio_per_type = '1:2';
            if (ratio > 0.3 && ratio < 0.7) thisx.ratio_ok = true;
            else thisx.ratio_ok = false;
          }
          else if (type == 'banner'){
            thisx.type_text = 'banners';
            thisx.ratio_per_type = '3:1';
            if (ratio > 2.4 && ratio < 10) thisx.ratio_ok = true;
            else thisx.ratio_ok = false;
          }
          console.log('1111',  ratio, thisx.type_text, thisx.ratio_per_type);
        }
        if (e.target) img.src = <string>e.target.result;
        
        //if (e.target) img.src = <string>e.target.result;
        if (preview && e.target) {
          preview.innerHTML = `<img style="margin:auto;display:block;max-width:100%;" src="${e.target.result}" alt="Image Preview">`;
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (preview) preview.innerHTML = '<span>No image selected</span>';
    }
    $('#imagePreviewModal').modal('show');
  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

  async uploadImage(){

    this.show_spinner = true;

    //if advertisement_account_id is 0 create it
    if (this.advertisement_account_id == 0){
      var data =  await lastValueFrom(this.tablesService.AddItem('advertisement_accounts',{}));
      this.advertisement_account_id = data.id;
      this.itemx.advertisement_account_id = data.id;
    }


    await this.myblobService.uploadAdImageBlob(this.file, this.advertisement_account_id + '/' + this.image_type + '/' + this.file.name);
    await this.timeout(2000);
    this.getImages();
    this.show_spinner = false;
    $('#imagePreviewModal').modal('hide');
  }

  getImages(){
    if (this.advertisement_account_id > 0){
      this.myblobService.getFiles(this.advertisement_account_id).subscribe((data:any) => {
        console.log('files', data);
        this.account_images = data;

        this.account_images = data.map((x:any) => {
          return 'https://sportzbattle.blob.core.windows.net/advertisements/' + x;
        })

        this.images_desktop = this.account_images.filter((x:any) => { return x.indexOf(this.advertisement_account_id + '/desktop/') > -1});
        this.images_mobile = this.account_images.filter((x:any) => { return x.indexOf(this.advertisement_account_id + '/mobile/') > -1});
        this.images_banner = this.account_images.filter((x:any) => { return x.indexOf(this.advertisement_account_id + '/banner/') > -1});
      })
    } 
  }

  confirmDelete(){
    $('#confirmDeleteModal').modal('show');
  }

  delete(){

    
    //delete all images
    for (let image of this.account_images){
      this.myblobService.deleteBlob(image);
    }

    this.tablesService.DeleteFiltered('advertisement_accounts', 'advertisement_account_id', this.advertisement_account_id).subscribe(() => {
      $('#confirmDeleteModal').modal('hide');
      this.router.navigate(['admin/advertisements-manager']);
    })
    
  }

  timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  preview(image:string){
    this.imagex = image;
    $('#previewImageModal').modal('show');
  }

  save(){
    this.itemx.is_active = this.status == 'Active' ? 1:0;

    if (this.itemx.advertisement_account_id) {
      this.tablesService.UpdateItem('advertisement_accounts', 'advertisement_account_id', this.itemx).subscribe((data: any) => {
        $('#changesSavedModal').modal('show');
        this.has_changed = false;
      })
    }
    else {
      this.tablesService.AddItem('advertisement_accounts', this.itemx).subscribe((data: any) => {
        $('#changesSavedModal').modal('show');
        this.has_changed = false;
      })
    }

  }

  async deleteImage(){
    await lastValueFrom(this.myblobService.deleteBlob(this.imagex));
    await this.timeout(1000);
    $('#previewImageModal').modal('hide');
    this.getImages();
  }

  goBack(){
    this.router.navigate(['admin/advertisements-manager']);
  }

}
