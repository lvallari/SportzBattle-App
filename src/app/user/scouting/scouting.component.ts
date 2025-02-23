import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { TablesService } from '../../services/tables.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-scouting',
  templateUrl: './scouting.component.html',
  styleUrl: './scouting.component.scss'
})
export class ScoutingComponent {

  user: any;
  userServiceSubscription!: Subscription;

  players: any[] = [];
  players_map!: any[];

  games!:any[];

  data_ready:boolean = false;
  tab:string = 'search';

  daily_start_time: number = this.commonService.getEpochTimeForTodayAtMidnight();
  monthly_start_time: number = this.commonService.getFirstDayOfMonthEpoch();

  itemx:any;

  matchup:any;
  scouts!:any;

  screen_large:boolean = window.innerWidth > 768;

  constructor(
    public userService: UserService,
    public commonService: CommonService,
    public tablesService: TablesService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      if (!currentUser) {
        this.router.navigate(['login']);
        return;
      }
      this.user = currentUser;
     
      if (!this.user.wallet) this.user.wallet = 0;
      this.user.wallet_value = (this.user.wallet / 1000).toFixed(2);
      //console.log('this.user', this.user);
      this.loadData();
      this.loadScouts();

    });
  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe()
  }

  loadData() {

    this.userService.getUserStats(this.user.user_id).subscribe((data:any) => {
      //console.log('stats', data);
      this.user.stats = data;
      this.user.all_time_points = data.all_time_points;
      this.getLevel();
    })
  }

  loadPlayers(){
    this.userService.getAllGames().subscribe((data: any) => {
      this.games = data;
      //console.log('games', this.games, this.user.venue_id);

      this.filterPlayers();
    })
  }

  loadScouts(){
    
    this.userService.getUserScouts(this.user.user_id).subscribe((data:any) => {
      console.log('scouts', data);
      this.scouts = data;

      this.loadPlayers();
    })
    
  }

  filterPlayers() {

    this.data_ready =false;
    var games:any = [];

    games = this.games.filter((x:any) => { return x.user_id != this.user.user_id });
    //games = this.games.filter((x: any) => { return x.timestamp >= this.monthly_start_time }).filter((x:any) => { return x.user_id != this.user.user_id });
    //games = this.games.filter((x: any) => { return x.timestamp >= this.daily_start_time }).filter((x:any) => { return x.user_id != this.user.user_id });

    this.players = [];
    games.forEach((x: any) => {
      //x.date = this.commonService.getDateString(x.timestamp);

      var record = this.players.find((n: any) => { return n.user_id == x.user_id });
      if (!record) this.players.push({
        user_id: x.user_id,
        username: x.username,
        image: x.user_image
      });

    });

    if (this.tab == 'scouting'){
      console.log('this.scouts.scounts',this.scouts.scouts);
        this.players = this.players.filter((n:any) => { return this.scouts.scouts.map((m:any) => { return m.prospect_user_id; }).indexOf(n.user_id) > -1 });
    }
    else if (this.tab == 'scouted-by'){
      this.players = this.players.filter((n:any) => { return this.scouts.prospects.map((m:any) => { return m.scout_user_id; }).indexOf(n.user_id) > -1 });
  }

    this.players.forEach((x: any) => {
      var player_games = games.filter((n: any) => { return n.user_id == x.user_id });
      x.games = player_games.length;
      var points = 0;
      var max_score = 0;
      player_games.forEach((n: any) => { 
        points += (n.score ? n.score : 0);
        if (n.score > max_score) max_score = n.score; 
      });
      x.points = points;
      x.max_score = max_score;

      //determine if its already a scout
      x.scouting = this.scouts.scouts.map((n:any) => { return n.prospect_user_id }).indexOf(x.user_id) > -1;

    });

    //sort by points
    this.players = this.players.sort((a:any,b:any) => { return b.points - a.points});

    if (this.tab == 'search' && !this.players_map) {
      this.players_map = this.players.map((x:any) => { 
        return {
          user_id: x.user_id,
          all_time_points: x.points
        };
      });
      
    }

    this.players.forEach((x:any) => {
      //find record
      //console.log('this.players_map',this.players_map);
      var record = this.players_map.find((n:any) => { return n.user_id == x.user_id});
      if (record) x.all_time_points = record.all_time_points;
    })

    this.assignLevels();


    this.data_ready =true;

  }

  assignLevels(){
    this.tablesService.GetAll('skill_levels').subscribe((data:any) => {
      this.players.forEach((x:any) => {
        this.commonService.assignLevel(x,data);
      })
    })
  }

  getLevel(){
    this.tablesService.GetAll('skill_levels').subscribe((data:any) => {
      this.commonService.assignLevel(this.user, data);
    })
  }

  closeModal(name:string){
    $('#'+ name).modal('hide');
  }

  scoutPlayer(item:any){
    this.itemx = item;
    console.log('this.itemx', this.itemx);
    $('#optionsModal').modal('hide');

    var object = {
      scout_user_id: this.user.user_id,
      prospect_user_id: this.itemx.user_id
    }

    this.tablesService.AddItem('scouting_actions', object).subscribe((data:any) => {
      this.loadScouts();
    })

    $('#scoutNotificationModal').modal('show');
  }

   userMatchUp(user_id:number){
    $('#optionsModal').modal('hide');
    this.userService.getUserStats(user_id).subscribe((data:any) => {
      //console.log('user_stats', data);
      this.matchup = data;
      $('#matchupModal').modal('show');
    })
   }

   removeScout(item:any){
    this.itemx = item;
    $('#confirmDeleteScoutModal').modal('show');
   }

   openOptions(item:any){
    this.itemx = item;
    $('#optionsModal').modal('show');
   }

   deleteScoutingRecord(){

    //find record
    var record = this.scouts.scouts.find((x:any) => { return x.prospect_user_id == this.itemx.user_id && x.scout_user_id == this.user.user_id});

    if (!record) return;

    this.tablesService.DeleteFiltered('scouting_actions', 'scouting_action_id', record.scouting_action_id).subscribe(() => {
      this.loadScouts();
      $('#confirmDeleteScoutModal').modal('hide');
    })
   }

}
