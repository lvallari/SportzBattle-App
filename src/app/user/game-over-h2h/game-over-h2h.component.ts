import { Component, Input, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over-h2h',
  standalone: false,
  templateUrl: './game-over-h2h.component.html',
  styleUrl: './game-over-h2h.component.scss'
})
export class GameOverH2hComponent implements OnInit{

  @Input() h2h_game_id!:number;
  @Input() score!:number;
  @Input() user!:any;

  books!:any[];
  user_position!:number;

  constructor(
    public apisService: ApisService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.apisService.getUsersByGameH2H(this.h2h_game_id).subscribe((data:any) => {
      this.books = data;

      //sort by higher score
      this.books = this.books.sort((a:any, b:any) => { return b.score - a.score;});

      this.books.forEach((x:any, i:number) => { 
        x.position = i+1;
      });

      //find user position
      var record = this.books.find((x:any) => { return x.user_id == this.user.user_id });
      if (record) this.user_position = record.position;

    })
  }

  gotoLobby(){
    this.router.navigate(['user/lobby']);
  }

}
