import { Injectable } from '@angular/core';
import { TablesService } from './tables.service';
import { CommonService } from './common.service';
//import { MailingService } from './mailing.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as sha512 from 'js-sha512';
import { environment } from './../../environments/environment';
declare var $: any;

declare global {
  interface Window {
      dataLayer:any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any;
  error: any;
  redirectOnLogin: string = '';

  claim_listing_id: number = -1;

  // Base url
  baseurl = environment.baseurl + '/users';

  public _getUser = new BehaviorSubject<any>(undefined);
  public _loginStatus = new BehaviorSubject<any>(undefined);
  public _getNotificationsUpdate = new BehaviorSubject<any>(undefined);

  constructor(
    public tablesService: TablesService,
    public commonService: CommonService,
    //public mailingService: MailingService,
    private http: HttpClient,
    private router: Router
  ) {
    
    var userx = localStorage.getItem('user');
    if (userx) { 
      try { this.user = JSON.parse(userx); }
      catch (e) {
        this.user = undefined;
      }
    }


    this._getUser.next(this.user);
    if (this.user) {
      //pull from database most updated record for the user
      this.tablesService.GetFiltered('users', 'user_id', this.user.user_id).subscribe((data: any) => {
        this.user = data[0];
      })
      
    }
    
  }

  httpOptions = {
    //withCredentials: true,
    headers: new HttpHeaders({
      //'Accepts': 'application/json',
      //'Content-Type': 'application/json'
    })
    
  }

  loginUser(email:string, password:string) {

    var userObj = {
      email: email.toLowerCase(),
      password: sha512.sha512(password)
    }

    this.loginReq(userObj).subscribe((data: any) => {

      console.log('loginReq', data);

      if (data) {
        //if (data.user) {
          this.user = data;

          localStorage.setItem('user', JSON.stringify(this.user));
          this._getUser.next(this.user);

          if (this.redirectOnLogin) {
            console.log('sent navigate command', this.redirectOnLogin);
            //$('#loginModal').modal('hide');
            this.router.navigate([this.redirectOnLogin]);
          }
          //else this.router.navigate(['/admin/profile/' + this.user.id]);
          else {
            if (this.user.account_type == 'player') this.router.navigate(['user-dashboard']);
            else if (this.user.account_type == 'business') this.router.navigate(['business-dashboard']);
            else if (this.user.account_type == 'admin') this.router.navigate(['admin-dashboard']);

            //$('#loginModal').modal('hide');
          }
        //}
        this._loginStatus.next(data);
      }
    });
  }

  loginReq(obj:any): Observable<any> {
    console.log('login', obj);
    return this.http.post<any>(environment.baseurl + '/login', obj, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl.bind(this)),
    )
  }

  logoutUser(){
    this.user = undefined;
    this._getUser.next(this.user);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    console.log('user logged out');
  }


  updateUser(field:string,val:any){
    this.user[field] = val;
    this._getUser.next(this.user);
  }

  updateUserNoBroadCast(field:string,val:any){
    this.user[field] = val;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  getCurrent(){
    
    this.tablesService.GetFiltered('users','id',this.user.id).subscribe((data:any) => {
      this.user = data[0];
      localStorage.setItem('user', JSON.stringify(this.user));
      this._getUser.next(this.user);
    })
    
  }
  
 saveUser(user:any){

  console.log('saveUser', user);

  this.user = user;
  this._getUser.next(this.user);
}

signUpUser(user:any){
  var user_object = {
    name: user.name,
    email: user.email.toLowerCase(),
    password: sha512.sha512(user.password),
    signup_timestamp: Date.now(),
    account_type: user.account_type,
    venue_id: user.venue_id ? user.venue_id:null
  }

  return this.http.post<any>(this.baseurl+'/createUser', user_object, this.httpOptions)
  .pipe(
    retry(0),
    catchError(this.errorHandl),
  )
}

getUserActivity(user_id:number){
  return this.http.get<any>(this.baseurl+'/activity?id=' + user_id, this.httpOptions)
  .pipe(
    retry(0),
    catchError(this.errorHandl),
  )
}

getUserStats(user_id:number){
  return this.http.get<any>(this.baseurl+'/stats?id=' + user_id, this.httpOptions)
  .pipe(
    retry(0),
    catchError(this.errorHandl),
  )
}

getGamesByVenue(venue_id:number){
  return this.http.get<any>(this.baseurl+'/gamesByVenue?id=' + venue_id, this.httpOptions)
  .pipe(
    retry(0),
    catchError(this.errorHandl),
  )
}

getUsersByVenue(venue_id:number){
  return this.http.get<any>(this.baseurl+'/usersByVenue?id=' + venue_id, this.httpOptions)
  .pipe(
    retry(0),
    catchError(this.errorHandl),
  )
}

downloadUsersByVenue(venue_id:number){
  return this.http.get<any>(this.baseurl+'/downloadUsersByVenue?id=' + venue_id, this.httpOptions)
  .pipe(
    retry(0),
    catchError(this.errorHandl),
  )
}

 // Error handling
 errorHandl(error:any) {
   
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
 

}

