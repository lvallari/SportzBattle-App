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
