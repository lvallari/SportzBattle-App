import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyblobService } from '../../services/myblob.service';
import { TablesService } from '../../services/tables.service';
declare var $: any;

@Component({
  selector: 'app-admin-edit-advertisement-account',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-edit-advertisement-account.component.html',
  styleUrl: './admin-edit-advertisement-account.component.scss'
})
export class AdminEditAdvertisementAccountComponent {

  itemx:any = {};
  image_preview:any;
  image_ratio_ok:boolean = false;
  image_type!:string;

  type_text!:string;
  ratio_per_type!:string;
  ratio_ok:boolean = true;

  constructor(
    myblobService: MyblobService
  ){}

  clearAlerts(){

  }

  fileChangeEvent(event: any, type: string) {
    console.log('event', event);
    this.image_type = type;
    //this.image_preview = event.target.result;
    const file = event.target.files[0];
    const preview = document.getElementById('image_preview');
    const reader = new FileReader();
    var thisx = this;
   
    if (file) {
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function() {
          //console.log(img.width, img.height);
          var ratio = img.width / img.height;
          
          if (type == 'full-page-large-screen'){
            thisx.type_text = 'full-page ads on large screens';
            thisx.ratio_per_type = '16:9';
            if (ratio > 1.4 && ratio < 2.0) thisx.ratio_ok = true;
            else thisx.ratio_ok = false;
          }
          else if (type == 'full-page-mobile-screen'){
            thisx.type_text = 'full-page ads on mobile devices';
            thisx.ratio_per_type = '1:2';
            if (ratio > 0.4 && ratio < 0.6) thisx.ratio_ok = true;
            else thisx.ratio_ok = false;
          }
          else if (type == 'banner'){
            thisx.type_text = 'banners';
            thisx.ratio_per_type = '3:1';
            if (ratio > 1.9 && ratio < 4.1) thisx.ratio_ok = true;
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

  uploadImage(){

  }

}
