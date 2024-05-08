import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SocketioService {

  private socket!: Socket;
  public _getMessage = new BehaviorSubject<any>(undefined);

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket = io(environment.baseurl);  // Connect to the Socket.IO server

    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    this.socket.on('message', (data) => {
      console.log('message', data);
      this._getMessage.next(data);
      //subscriber.next(data);
    });

  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  /*
  public onMessage(): Observable<string> {  // Specify return type as Observable<string>
    return new Observable<string>((subscriber) => {
      this.socket.on('message', (data) => {
        console.log('message', data);
        subscriber.next(data);
      });
    });
  }
  */
}