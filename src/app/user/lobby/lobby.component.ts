import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { ApisService } from '../../services/apis.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-lobby',
  standalone: false,
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnInit {

  games:any[] = [];
  gamex:any;

  userServiceSubscription!:Subscription;
  user:any;

  constructor(
    public apisService: ApisService,
    public tablesService: TablesService,
    public userService: UserService,
    private router:Router
  ){}

  ngOnInit(): void {

    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser) {
        this.router.navigate(['login']);
        return;
      }
      this.user = currentUser;
      this.loadGames(); 
      
    });

  }

  loadGames(){
    this.apisService.GetGamesForLobby().subscribe((data:any) => {
      this.games = data;
      console.log('this.games', this.games);
    })
  }

  closeModal(name:string){
    $('#' + name).modal('hide');
  }

  showCreateGameModal(){
    this.gamex = {};
    $('#createGameModal').modal('show');
  }

  createGame(){
    this.gamex.created_by_user_id = this.user.user_id;
    this.apisService.createGameH2H(this.gamex).subscribe(() => {
      $('#createGameModal').modal('hide');
      this.loadGames();
    })
  }

}
