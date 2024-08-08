import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TablesService } from '../../services/tables.service';
import { CommonService } from '../../services/common.service';
import { MyblobService } from '../../services/myblob.service';
import {Router, ActivatedRoute} from "@angular/router";
import { CommonModule, DOCUMENT } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  user:any;

  user_name: string = '';
  user_email: string = '';
  user_zipcode: string = '';
  user_phone: string = '';
  password_current: string = '';
  password_new: string = '';
  password_new_confirm: string = '';

  invalid_user_name: string = '';
  invalid_user_email: string = '';
  invalid_user_phone: string = '';
  invalid_user_zipcode: string = '';

  invalid_password_current: string = '';
  invalid_password_new: string = '';
  invalid_password_new_confirm: string = '';

  email_verification_code_failed: boolean = false;

  email_change_step: number = 0;
  phone_change_step: number = 0;

  digit_1e: string = '';
  digit_2e: string = '';
  digit_3e: string = '';
  digit_4e: string = '';
  digit_5e: string = '';
  digit_6e: string = '';

  digit_1p: string = '';
  digit_2p: string = '';
  digit_3p: string = '';
  digit_4p: string = '';
  digit_5p: string = '';
  digit_6p: string = '';

  digits: string = '';

  location: any = {};
  profile_image_filename: string = '';
  cropper_active: boolean = false;

  delete_confirm: string = '';

  notify_via_sms!: boolean;
  //sas:string = '?sv=2022-11-02&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2026-12-10T06:36:08Z&st=2023-12-09T22:36:08Z&spr=https,http&sig=g8AgoAqT%2Bz5DandKuO%2FX3YmeBy7s3eRL%2F9MWzGGRGY8%3D';
  
  image_is_preview:boolean = false;

  constructor(
    public userService: UserService,
    public tablesService: TablesService,
    //public verificationsService: VerificationsService,
    //public mailingService: MailingService,
    //public twilioService: TwilioService,
    //public apisService: ApisService,
    public commonService: CommonService,
    public myblobService: MyblobService,
    //public navigationService: NavigationService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {

    this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;

      console.log('this.user', this.user);
      
      if (this.user){
        if (this.user.sign_up_date) this.user.sign_up_date_humanized = this.commonService.getDate(this.user.sign_up_date);
        this.notify_via_sms = this.user.notify_by_sms;

        this.user_zipcode = this.user.location_zipcode;
        this.location = {
          city: this.user.location_city,
          state: this.user.location_state
        }
      }
    });

    this.myblobService._profileImageUploaded.subscribe((filename) => {
      if (filename) {
        console.log('filename----', filename);
        this.user.image = 'https://sportzbattle.blob.core.windows.net/users/' + filename;
        this.saveUserObjectInMemory();
      }
    })

  }

  showEditName(){
    this.user_name = this.user.username;
    $('#editNameModal').modal('show');
  }

  showEditEmail(){
    this.clearDigits();
    this.email_change_step = 1;
    this.user_email = this.user.email;
    $('#editEmailModal').modal('show');
  }

  showEditPhone(){
    this.clearDigits();
    this.phone_change_step = 1;
    this.user_phone = '';
    $('#editPhoneModal').modal('show');
  }

  showEditLocation(){
    console.log('this.user', this.user);
    this.user_zipcode = this.user.location_zipcode;
    this.location.city = this.user.location_city;
    this.location.state = this.user.location_state;
    $('#editLocationModal').modal('show');
  }

  showEditPassword(){
    $('#editPasswordModal').modal('show');
  }

  saveName(){
    console.log('save name');
    if (!this.user_name){
      this.invalid_user_name = 'Please enter a valid name';
      return;
    }

    var user_object = {
      user_id: this.user.user_id,
      username: this.user_name
    }

    this.tablesService.UpdateItem('users', 'user_id',user_object).subscribe(() => {
      this.user.username = this.user_name;
      $('#editNameModal').modal('hide');
      this.saveUserObjectInMemory();
    });
  }

  clearAlerts(){
    this.invalid_user_name = '';
    this.invalid_user_email = '';
    this.invalid_user_phone = '';
    this.invalid_user_zipcode = '';

    this.invalid_password_current = '';
    this.invalid_password_new = '';
    this.invalid_password_new_confirm = '';
  }

  saveUserObjectInMemory(){
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  verifyEmail(){

    if (!this.user_email) this.invalid_user_email = 'Please enter a valid email';
    else {
      var emailPatternMatch = this.user_email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
      if (!emailPatternMatch) this.invalid_user_email = 'Please enter a valid email';
    }

    if (this.invalid_user_email) return;

    //this.mailingService.verifyEmail(this.user.id, this.user_email);
    this.email_change_step = 2;
  }

  evalAccessCodeEmail(digit:number){
    if (digit == 1){
      if (this.digit_1e.length == 1) {
        var elem = this.document.getElementById("digit_2e");
        if (elem) elem.focus();
      }
    }
    else if (digit == 2){
      if (this.digit_2e.length == 1) {
        var elem = this.document.getElementById("digit_3e");
        if (elem) elem.focus();
      }
    }
    else if (digit == 3){
      if (this.digit_3e.length == 1) {
        var elem = this.document.getElementById("digit_4e");
        if (elem) elem.focus();
      }
    }
    else if (digit == 4){
      if (this.digit_4e.length == 1) {
        var elem = this.document.getElementById("digit_5e");
        if (elem) elem.focus();
      }
    }
    else if (digit == 5){
      if (this.digit_5e.length == 1) {
        var elem = this.document.getElementById("digit_6e");
        if (elem) elem.focus();
      }
    }
    else if (digit == 6){
      //if (this.digit_6.length == 1) document.getElementById("digit_2").focus();
    }

    this.email_verification_code_failed = false;
  }

  
  submitEmailVerificationCode(){
    /*
    var code = this.digits ? this.digits: (this.digit_1e + this.digit_2e + this.digit_3e + this.digit_4e + this.digit_5e + this.digit_6e);  
    this.verificationsService.verifyEmail(this.user.id, code).subscribe((data:any) => {
      if (data.result == true) {
        //code verification success
        console.log('success!');
        $('#editEmailModal').modal('hide');
        this.emailVerificationSuccess();
      }
      else {
        //code verification failed
        this.email_verification_code_failed = true;
        console.log('failed!');
      }
    });
    */
  }

  emailVerificationSuccess(){
    /*
    $('#emailVerificationSuccessModal').modal('show');

    var user_object = {
      id: this.user.id,
      email_has_been_verified: true,
      email: this.user_email
    }

    this.user.email_has_been_verified = true;
    this.userService.updateUser('email_has_been_verified',true);

    this.tablesService.UpdateItem('users', user_object).subscribe();
    */
  }

  sendPhoneCode(){
    /*

    if (!this.user_phone) this.invalid_user_phone = 'Please enter a valid phone number';
    else {
      var phonePatternMatch = this.user_phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/);
      if (!phonePatternMatch) this.invalid_user_phone = 'Please enter a valid phone';
    }

    if (this.invalid_user_phone) return;

    //check that phone number hasnot been used
    this.tablesService.GetFilteredX('users','phone',this.user_phone.replace(/[a-zA-Z\s\(\)\-\.:]/g, ''),'id').subscribe((data:any) => {
      if (data.length > 0) this.invalid_user_phone = 'This number is being used on a different account';
      else {
        this.twilioService.confirmPhoneNumber(this.user.id, this.user_phone,);
        this.phone_change_step = 2;
      }
    })
    */
  }

  evalAccessCodePhone(digit:number){
    if (digit == 1){
      if (this.digit_1p.length == 1) {
        var elem = this.document.getElementById("digit_2p");
        if (elem) elem.focus();
      }
    }
    else if (digit == 2){
      if (this.digit_2p.length == 1) {
        var elem = this.document.getElementById("digit_3p");
        if (elem) elem.focus();
      }
    }
    else if (digit == 3){
      if (this.digit_3p.length == 1) {
        var elem = this.document.getElementById("digit_4p");
        if (elem) elem.focus();
      }
    }
    else if (digit == 4){
      if (this.digit_4p.length == 1) {
        var elem = this.document.getElementById("digit_5p");
        if (elem) elem.focus();
      }
    }
    else if (digit == 5){
      if (this.digit_5p.length == 1) {
        var elem = this.document.getElementById("digit_6p");
        if (elem) elem.focus();
      }
    }
    else if (digit == 6){
      //if (this.digit_6.length == 1) document.getElementById("digit_2").focus();
    }

    this.email_verification_code_failed = false;
  }

  confirmPhoneCode(){
    /*
    var code = this.digits ? this.digits: (this.digit_1p + this.digit_2p + this.digit_3p + this.digit_4p + this.digit_5p + this.digit_6p);  
    this.verificationsService.verifyPhone(this.user.id, code).subscribe((data:any) => {
      if (data.result == true) {
        //code verification success
        console.log('success!');
        $('#editPhoneModal').modal('hide');
        this.phoneVerificationSuccess();
      }
      else {
        //code verification failed
        console.log('failed!');
      }
    });
    */
  }

  phoneVerificationSuccess(){
    /*
    $('#phoneVerificationSuccessModal').modal('show');

    var user_object = {
      id: this.user.id,
      phone_has_been_verified: true,
      phone: this.user_phone.replace(/[a-zA-Z\s\(\)\-\.:]/g, '')
    }

    this.user.phone_has_been_verified = true;
    this.userService.updateUser('phone_has_been_verified',true);

    this.tablesService.UpdateItem('users', user_object).subscribe();
*/
  }

  evalZipCode(){
    /*
    if (this.user_zipcode){
      var zipcodePatternMatch = this.user_zipcode.match(/^\d{5}/);
      if (zipcodePatternMatch){
        this.apisService.getCityFromZip(this.user_zipcode).subscribe((data:any) => {
          console.log('zip data', data);
         this.location.city = data.city;
         this.location.state = data.state;
         this.location.lat = data.lat;
         this.location.lng = data.lng;
      })
      }
    }
    */
  }

  saveZipCode() {

    if (!this.user_zipcode) this.invalid_user_zipcode = 'Please enter a valid zip code';
    else {
      var zipcodePatternMatch = this.user_zipcode.match(/^\d{5}/);
      if (!zipcodePatternMatch) this.invalid_user_zipcode = 'Please enter a valid zip code';
    }

    if (this.invalid_user_zipcode) return;

    if (this.location) {
      
      var user_object = {
        user_id: this.user.user_id,
        location_zipcode: this.user_zipcode,
        location_city: this.location.city,
        location_state: this.location.state,
        location_lat: this.location.lat,
        location_lng: this.location.lng
      }

      this.user.location_zipcode = this.user_zipcode;

      this.tablesService.UpdateItem('users', 'user_id',user_object).subscribe(() => {
        $('#editLocationModal').modal('hide');
      })
    }

  }

  savePassword(){ 
    /*
    console.log('this.password_current', this.password_current);
    
    if (!this.password_current) this.invalid_password_current = 'Please enter your current password';
    else if (sha512.sha512(this.password_current) != this.user.password) this.invalid_password_current = 'Incorrect password';

    if (this.invalid_password_current) return;

    if (!this.password_new) this.invalid_password_new = 'Please enter a valid password';
    else if (this.password_new.length < 8) this.invalid_password_new = 'Password must be at least 8 characters';

    if (this.invalid_password_new) return;

    if (!this.password_new_confirm) this.invalid_password_new_confirm = 'Please confirm your password';
    else if (this.password_new != this.password_new_confirm) this.invalid_password_new_confirm = 'Passwords do not match';

    if (this.invalid_password_new_confirm) return;

    var user_object = {
      id: this.user.id,
      password: sha512.sha512(this.password_new)
    }

    this.tablesService.UpdateItem('users', user_object).subscribe(() => {
      $('#editPasswordModal').modal('hide');
      $('#changePasswordSuccessModal').modal('show');

    })
    */
  }

  
  editProfileImage(){
    console.log('------------------------');
    $('#profileImageModal').modal('show');
  }

  
  saveProfileImage(base64:Event) {

    console.log('save profile image');
    
    this.profile_image_filename = this.commonService.generateImageName() + '.jpeg';
    //this.myblobService.setContainer('users');
    var thisx = this;
    this.commonService.resizeImage(base64,200,0.75,this.profile_image_filename).then(function(x:any){
      thisx.user.image = x.base64;
      thisx.image_is_preview = true;
      thisx.myblobService.uploadProfileImageBlob(x.base64, thisx.user.user_id + '/' + x.filename);

      var user_object = {
        user_id: thisx.user.user_id,
        image:  'https://sportzbattle.blob.core.windows.net/users/' + thisx.user.user_id +'/' + thisx.profile_image_filename
      }
  
      thisx.tablesService.UpdateItem('users', 'user_id',user_object).subscribe((data: any) => {
        //this.hasChangedPlatform = false;
      });
    });
    
    /*
    this.myblobService.uploadProfileImageBlob(base64, this.user.id + '/' + this.profile_image_filename);
    this.user.image = base64;

    var user_object = {
      id: this.user.id,
      image:  'https://bizbby.blob.core.windows.net/users/' + this.user.id +'/' + this.profile_image_filename
    }

    this.tablesService.UpdateItem('users', user_object).subscribe((data: any) => {
      //this.hasChangedPlatform = false;
    });
    */
  }

clearDigits(){
  this.digit_1e = '';
  this.digit_2e = '';
  this.digit_3e = '';
  this.digit_4e = '';
  this.digit_5e = '';
  this.digit_6e = '';

  this.digit_1p = '';
  this.digit_2p = '';
  this.digit_3p = '';
  this.digit_4p = '';
  this.digit_5p = '';
  this.digit_6p = '';
}
  
  setCropperActive(value:any){
    this.cropper_active = value;
  }
  

  

  goBack(){
    //this.navigationService.goBack();
  }

  logout(){
   this.userService.logoutUser();
  }

  closeModal(name:string){
    $('#' + name).modal('hide');
  }

  confirmDelete(){
    //TODO
    $('#confirmDeleteModal').modal('show');
  }

  
  deleteAccount(){
    /*
    if (this.delete_confirm != 'DELETE') return;
    else {
      console.log('account deleted...');
      
      //delete user account
      forkJoin([
        this.tablesService.DeleteItem('users', this.user.id),
        this.tablesService.DeleteFiltered('listings','user_id', this.user.id)
      ])
      .subscribe(() => {
        $('#confirmDeleteModal').modal('hide');
        this.userService.logoutUser();
      });
      
    }
    */
  }
  

  goto(route:string){
    this.router.navigate([route]);
  }

  notifyViaSMS(){
    setTimeout(() => {
      var user_object = {
        user_id: this.user.user_id,
        notify_by_sms: this.notify_via_sms
      }

      this.user.notify_by_sms = this.notify_via_sms;
  
      this.tablesService.UpdateItem('users', 'user_id',user_object).subscribe();
    },200);
  }


}
