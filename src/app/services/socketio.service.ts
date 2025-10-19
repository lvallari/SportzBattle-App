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
  public _getMessage20quest = new BehaviorSubject<any>(undefined);

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
      //console.log('socket message', data);
      this._getMessage.next(data);
      this._getMessage.next(undefined);
      //subscriber.next(data);
    });

    this.socket.on('message-20quest', (data) => {
      console.log('socket message-20quest', data);
      this._getMessage20quest.next(data);
      this._getMessage20quest.next(undefined);
      //subscriber.next(data);
    });

  }

  sendMessage(message: string): void {
    this.socket.emit('ping', message);
  }

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
    
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