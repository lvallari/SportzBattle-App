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
  gamex:any;

  userServiceSubscription!:Subscription;
  user:any;

  showTooltip!: boolean;

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
      
    });

  }

  loadGames(){
    this.apisService.GetGamesForLobby().subscribe((data:any) => {
      this.games = data;

      this.games.forEach((x:any) => {
        x.game_url  = this.commonService.crypt('sportzbattle','abcd' + x.h2h_game_id)
      })
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

  
}
