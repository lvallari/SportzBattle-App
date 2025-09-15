import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  baseurl = environment.baseurl  +'/mailing';
  
  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      //'Accepts': 'application/json',
      //'Content-Type': 'application/json'
    })
  }

  verifyEmail(user:any){
    
    var obj = {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name 
    }

    this.sendMailRequest('verifyEmail',obj).subscribe((data: any) => { 
      console.log('new email for verification has been sent');
    });

  }

  
  passwordReset(user:any, token:string){
    //console.log('mailing.resetPassword');

      var data = {
        user_id: user.user_id,
        email: user.email, 
        link_url: 'https://sportzbattle.azurewebsites.net/password-reset?token=' + token
      }
      
      this.sendMailRequest('passwordReset', data).subscribe((data: any) => { 
        console.log('Password reset has been sent');
      });
  }

  requestInfo(data:any){
    //console.log('mailing.resetPassword');

      var object = {
        user_id: data.user_id,
        email: data.email, 
        verification_link: 'https://sportzbattle.azurewebsites.net/user-verification/' + data.token,
        rank: data.rank,
        prize: data.prize,
        date: data.date
      }
      
      this.sendMailRequest('requestInfo', object).subscribe((data: any) => { 
        console.log('Password reset has been sent');
      });
  }

  tokensAwarded(data:any){
    //console.log('mailing.resetPassword');

      var object = {
        email: data.email,
        username: data.username,
        number_tokens: data.tokens,
        message_number: Math.ceil(Math.random()*3)
      }
      
      this.sendMailRequest('tokensAwarded', object).subscribe((data: any) => { 
        console.log('Tokens awarded email has been sent');
      });
  }

  accountCreated(user:any){
    //console.log('mailing.resetPassword');
      
      var data = {
        user_id: user.user_id,
        first_name: user.first_name,
        email: user.email
      }
      
      this.sendMailRequest('accountCreated',data).subscribe((data: any) => { 
        console.log('Password reset has been sent');
      });
  }

  payoutRequestedConfirmation(user:any){
    //console.log('mailing.resetPassword');
      
      var data = {
        user_id: user.user_id,
        email: user.email,
        username: user.username
      }
      
      this.sendMailRequest('payoutRequestedConfirmation',data).subscribe((data: any) => { 
        console.log('Payout requested confirmation has been sent');
      });
  }

  payoutRequestedNotification(user:any){
    //console.log('mailing.resetPassword');
      
      var data = {
        user_id: user.user_id,
        email: user.email,
        username: user.username
      }
      
      this.sendMailRequest('payoutRequestedNotification',data).subscribe((data: any) => { 
        console.log('Payout requested notification has been sent');
      });
  }
  
  sendMailRequest(type:string,data:any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/' + type, data, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandl),
    ) 
  }
  

  // Error handling
  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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

