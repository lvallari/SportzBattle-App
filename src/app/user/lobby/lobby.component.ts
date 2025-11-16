import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { ApisService } from '../../services/apis.service';
import { lastValueFrom, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
declare var $: any;

@Component({
  selector: 'app-lobby',
  standalone: false,
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnInit {

  games:any[] = [];
  invitations:any[] = [];
  users:any[] = [];
  users_o:any[] = [];
  gamex:any;

  userServiceSubscription!:Subscription;
  user:any;

  showTooltip!: boolean;
  max_users:number = 10;

  query:string = '';
  invitations_to_user:any[] = [];

  is_small:boolean = window.innerWidth <= 768;
  loading_games:boolean = false;

  constructor(
    public apisService: ApisService,
    public tablesService: TablesService,
    public userService: UserService,
    public commonService: CommonService,
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
      this.loadUsers();
      
    });

  }

  loadGames(){
    this.loading_games = true;
    this.apisService.GetGamesForLobby().subscribe((data:any) => {
      this.games = data;

      this.games.forEach((x:any) => {
        x.game_url  = this.commonService.crypt('sportzbattle','abcd' + x.h2h_game_id)
      })
      console.log('this.games', this.games);
      this.loadInvitationsToUser();

      this.loading_games = false;

    })
  }

  loadUsers(){
    this.tablesService.GetAll('users').subscribe((data:any) => {
      this.users = data.filter((x:any) => { return x.account_type == 'player' && x.user_id != this.user.user_id});
      this.users_o = JSON.parse(JSON.stringify(this.users));
      this.loadInvitationsByUser();
    })
  }

  loadInvitationsByUser(){
    this.tablesService.GetFiltered('h2h_games_invitations','host_user_id',this.user.user_id).subscribe((data:any) => {
      this.invitations = data;
      console.log('this.invitations', this.invitations);
      /*
      this.users.forEach((x:any) => {
        var record = this.invitations.find((n:any) => { return n.invitee_user_id == x.user_id && this.gamex.h2h_game_id == n.h2h_game_id});
        x.has_been_invited = record ? true:false;
      })
      */
    })
  }

  loadInvitationsToUser(){
    this.tablesService.GetFiltered('h2h_games_invitations','invitee_user_id',this.user.user_id).subscribe((data:any) => {
      this.invitations_to_user = data;

      this.games.forEach((x:any) => {
        var record = this.invitations_to_user.find((n:any) => { return n.h2h_game_id == x.h2h_game_id;});
        x.user_has_invitation = record ? true:false;
      })

    })
  }

  closeModal(name:string){
    $('#' + name).modal('hide');
  }

  showCreateGameModal(){
    this.gamex = {
      bet_mode: 'points'
    };
    $('#createGameModal').modal('show');
  }

  showInviteModal(item:any){
    this.gamex = item;

    this.users.forEach((x:any) => {
        var record = this.invitations.find((n:any) => { return n.invitee_user_id == x.user_id && this.gamex.h2h_game_id == n.h2h_game_id});
        x.has_been_invited = record ? true:false;
      })

    $('#inviteModal').modal('show');
  }

  createGame(){
    this.gamex.created_by_user_id = this.user.user_id;
    this.apisService.createGameH2H(this.gamex).subscribe(() => {
      $('#createGameModal').modal('hide');
      this.loadGames();
    })
  }

  async goPlay(item:any){
    console.log('goPlay');

    var books = await lastValueFrom(this.tablesService.GetFiltered('books','h2h_game_id', item.h2h_game_id));
    var book = books.find((x:any) => { return x.user_id == this.user.user_id });

    if (book){
      $('#alreadyPlayedModal').modal('show');
      return;
    }
    //if user is not host of game, check credit
    if (true || (item.created_by_user_id != this.user.user_id)){
      if (item.bet_mode == 'points'){
        if (this.user.points >= item.amount){
          this.router.navigate(['user/playh2h/'+ item.h2h_game_id]);
        }
        else this.showNotEnoughPointsOrTokens();
      }
      else if (item.bet_mode == 'tokens'){
        if (this.user.wallet >= item.amount){
          this.router.navigate(['user/playh2h/'+ item.h2h_game_id]);
        }
        else this.showNotEnoughPointsOrTokens();
      }
    }
  }

  showNotEnoughPointsOrTokens(){
    $('#notEnoughPointsOrTokensModal').modal('show');
  }

  showSharePopUp(item:any){
    this.gamex = item;
  }

  copyToClipboard(){
     var copyText = document.getElementById("link") as HTMLInputElement;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    var selection = window.getSelection();
    if (selection) selection.removeAllRanges();

    this.showTooltip = true;
    setTimeout(() => {
      this.showTooltip = false;
      $('#shareModal').modal('hide');
      //google analytics
      //this.googleAnalytics.eventEmitter('userActivity','linkCopied',this.user.id,'');
    }, 1500);
  }

  showShareModal(item:any){
    this.gamex = item;
    $('#shareModal').modal('show');
  }

  filterPlayers(){
    if (this.query.length < 2) this.users = this.users_o;
    else{
      var query = this.query.toLowerCase();
      this.users = this.users_o.filter((x:any) => {
        return x.username.toLowerCase().indexOf(query) > -1;
      })
    }
  }

  inviteUser(item:any){
    item.has_been_invited = true;
     
    var object = {
      h2h_game_id: this.gamex.h2h_game_id,
      invitee_user_id: item.user_id,
      host_user_id: this.user.user_id
    }

    this.tablesService.AddItem('h2h_games_invitations',object).subscribe();
  }

  
}
