import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
//import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ApisService {


  // Base url
  baseurl = environment.baseurl + '/apis';

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ })
  }

  // GET
  GetGamesForLobby(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getGamesForLobby', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  createGameH2H(data:any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/createGameH2H', data, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

   awardPoints(user_id:number, points:number): Observable<any> {
    return this.http.post<any>(this.baseurl + '/awardPoints', {user_id: user_id, points: points}, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  getH2HGame(game_id:number): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getH2HGame?id=' + game_id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  getUsersByGameH2H(h2h_game_id:number): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getUsersByGameH2h?id=' + h2h_game_id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  getGamesH2HByUser(user_id:number): Observable<any> {
    return this.http.get<any>(this.baseurl + '/getGamesH2HByUser?id=' + user_id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  Quest20PlayerStatus(user_id:number, status:string){
    return this.http.post<any>(this.baseurl + '/quest20PlayerStatus', {user_id: user_id, status: status }, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  getQuest20Players(status:string){
    return this.http.get<any>(this.baseurl + '/getQuest20Players?status=' + status, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  createGameQuest20(){
    return this.http.post<any>(this.baseurl + '/createGameQuest20',{}, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  getGameStats(game_id:number){
    return this.http.get<any>(this.baseurl + '/getGameStats?id=' + game_id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      )
  }

  // Error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log(errorMessage);
    return throwError(errorMessage);
  }
}
