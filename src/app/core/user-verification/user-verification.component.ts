import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CommonService } from '../../services/common.service';
import { TablesService } from '../../services/tables.service';
import { MyblobService } from '../../services/myblob.service';

declare var $: any;

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.scss'
})
export class UserVerificationComponent implements OnInit{

  months:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  states:string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
     'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  years:string[] = ['2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', 
    '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', 
    '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', 
    '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', 
    '1936', '1935', '1934', '1933', '1932', '1931', '1930', '1929', '1928', '1927', '1926', '1925', '1924'];
  
  days:string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', 
    '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']

  itemx:any = {
    date_of_birth_month: 'January',
    date_of_birth_day: '1',
    date_of_birth_year: '2006',
    state_of_residence: 'Alabama',
    payment_method: 'venmo'
  };

  token!:string;
  user_id!:number;
  user:any;

  image_type!:string;
  file!:File;
  show_spinner:boolean = false;
  page:string = 'form';

  constructor(
    public commonService: CommonService,
    public tablesService: TablesService,
    public myblobService: MyblobService,
    public router: Router,
    public route: ActivatedRoute
  ){
    this.route.params.subscribe( (params:any) => {
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    var userx = JSON.parse(this.commonService.decrypt('sb2024', this.token));
    this.user_id = userx.user_id;
    this.loadUser();
  }

  clearAlerts(){
    this.itemx.invalid_full_name = '';
    this.itemx.invalid_state_of_residence = '';
    this.itemx.invalid_date_of_birth = '';
    this.itemx.invalid_payment = '';
    this.itemx.invalid_drivers_license = '';
    this.itemx.invalid_selfie = '';
  }

  fileChangeEvent(event: any, type: string) {
    console.log('event', event);
    this.image_type = type;
    //this.image_preview = event.target.result;
    const file = event.target.files[0];
    this.file = file;
    const preview = document.getElementById('image_preview');
    const reader = new FileReader();
   
    if (file) {
      reader.onload = function (e) {
        const img = new Image();
        //img.onload = function() { }
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

  loadUser(){
    this.tablesService.GetFiltered('users','user_id', this.user_id).subscribe((data:any) => {
      this.user = data[0];
    })
  }

  submit(){

    /*
    invalid_state_of_residence
invalid_date_of_birth
invalid_venmo
invalid_drivers_license
invalid_selfie
    */

    if (!this.itemx.full_name) this.itemx.invalid_full_name = 'Please enter a valid full name.';
    if (!this.itemx.state_of_residence) this.itemx.invalid_state_of_residence = 'Please enter a valid state of residence.';
    if (!this.itemx.date_of_birth_day || !this.itemx.date_of_birth_month || !this.itemx.date_of_birth_year) this.itemx.invalid_date_of_birth = 'Please enter a valid date of birth.';
    if (this.itemx.payment_method == 'venmo' && !this.itemx.venmo) this.itemx.invalid_payment = 'Please enter a valid venmo.';
    if (this.itemx.payment_method == 'cashapp' && !this.itemx.venmo) this.itemx.invalid_payment = 'Please enter a valid cashapp.';
    if (!this.itemx.drivers_license) this.itemx.invalid_drivers_license = 'Please upload your drivers license.';
    if (!this.itemx.selfie) this.itemx.invalid_selfie = 'Please enter a valid selfie.';

    if (this.itemx.invalid_full_name || this.itemx.invalid_state_of_residence || this.itemx.invalid_date_of_birth || 
      this.itemx.invalid_venmo || this.itemx.invalid_drivers_license || this.itemx.invalid_selfie) return;

  
    var object = {
      user_id: this.user_id,
      full_name: this.itemx.full_name,
      state_of_residence: this.itemx.state_of_residence,
      date_of_birth: this.itemx.date_of_birth_month + '-' +  this.itemx.date_of_birth_day + '-' + this.itemx.date_of_birth_year,
      payment_method: this.itemx.payment_method,
      venmo: this.itemx.venmo,
      cashapp: this.itemx.cashapp,
      drivers_license: this.itemx.drivers_license,
      selfie: this.itemx.selfie
    }

    this.tablesService.AddItem('user_verifications', object).subscribe(() => {
      this.page = 'thank-you';
    })


  }

  async uploadImage(){

    this.show_spinner = true;

    var filename = this.commonService.generateImageName();
    var extension = this.getFileExtension(this.file.name);

    await this.myblobService.uploadVerificationDocument(this.file, this.user_id + '/' + (extension ? (filename + extension):this.file.name));
    await this.timeout(2000);

    

    if (this.image_type == 'drivers-license') this.itemx.drivers_license = 'https://sportzbattle.blob.core.windows.net/verification-docs/' + this.user_id + '/' + (extension ? (filename + extension):this.file.name);
    else if (this.image_type == 'selfie') this.itemx.selfie = 'https://sportzbattle.blob.core.windows.net/verification-docs/' + this.user_id + '/' + (extension ? (filename + extension):this.file.name);
    //this.getImages();
    this.show_spinner = false;
    $('#imagePreviewModal').modal('hide');
  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

  timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getFileExtension(filenamex:string){
    var filename = filenamex.toLowerCase();
    if (filename.indexOf('.jpg')) return '.jpg';
    else if (filename.indexOf('.jpeg')) return '.jpeg';
    else if (filename.indexOf('.png')) return '.png';
    else return '';
  }



}
