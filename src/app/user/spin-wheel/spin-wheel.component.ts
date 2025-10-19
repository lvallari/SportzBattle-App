import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TablesService } from '../../services/tables.service';
import { CommonService } from '../../services/common.service';
declare var $: any;

@Component({
  selector: 'app-spinning-wheel',
  standalone: false,
  templateUrl: './spin-wheel.component.html',
  styleUrls: ['./spin-wheel.component.scss'],
})
export class SpinWheelComponent implements OnInit {
  /** Labels for each slice (8 by default). Length determines slice count. */
  @Input() labels: string[] = [
    '250', '500', '750', '1,000', 'Bankrupcy', '2,000', 'Lose 2,000', '5,000'
  ];

  /** Min/Max full rotations for flair */
  @Input() minSpins = 10;
  @Input() maxSpins = 15;

  /** Emits the selected index after the spin completes */
  @Output() selectionChange = new EventEmitter<number>();

  rotation = 0;            // cumulative rotation in degrees
  spinning = false;        // disables button while spinning
  currentIndex: number | null = null; // last selected index
  private pendingIndex: number | null = null;

  get sliceCount() { return this.labels.length; }
  get sliceAngle(): number {
    return 360 / this.labels.length; // 8 slices => 45deg each
  }

  user: any;
  userServiceSubscription!: Subscription;

  games: any[] = [];
  activity: any[] = [];
  max_score!: number;
  points_all_time!: number;
  points_month!: number;

  stats: any = {};
  badges!: any[];

  number_of_badges!: number;

  main_container: string = 'wheel';

  constructor(
    public userService: UserService,
    public tablesService: TablesService,
    public commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userServiceSubscription = this.userService._getUser.subscribe((currentUser) => {
      this.user = currentUser;
      if (!this.user.wallet) this.user.wallet = 0;
      this.user.wallet_value = (this.user.wallet / 100).toFixed(2);
      //console.log('this.user', this.user);
      this.getData();
      //this.getH2HGames();

    });
  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) this.userServiceSubscription.unsubscribe();
  }


  spin(targetIndex?: number) {
    if (this.spinning) return;
    this.spinning = true;
    this.currentIndex = null;

    const idx = (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex < this.sliceCount)
      ? targetIndex
      : this.randInt(0, this.sliceCount - 1);

    this.pendingIndex = idx;

    // Center of the chosen slice measured clockwise from +X (3 o'clock)
    const angleCenter = idx * this.sliceAngle + this.sliceAngle / 2;

    // We want that center at the top (north = 90°)
    const rotationToTop = 90 - angleCenter;

    const spins = this.randInt(this.minSpins, this.maxSpins);
    const delta = this.norm(rotationToTop - this.norm(this.rotation)) + spins * 360;

    this.rotation += delta; // CSS transition handles the animation
  }

  // Fired from template on the rotating element
  onTransitionEnd(ev: TransitionEvent) {
    if (ev.propertyName !== 'transform') return; // ignore unrelated transitions
    this.spinning = false;
    if (this.pendingIndex != null) {
      this.currentIndex = this.pendingIndex;
      this.selectionChange.emit(this.currentIndex);
      this.pendingIndex = null;

      console.log('111');
      setTimeout(() => {
        console.log('222');
        this.main_container = 'prize';


        if (this.currentIndex && this.labels[this.currentIndex] == 'Bankrupcy') {
          console.log('bankrupcy');

          this.userService.recordSpunTheWheel(this.user.user_id).subscribe((data: any) => {

            var timestamp_wheel_spin = data.timestamp_wheel_spin;

            //award tokens
            var user_object = {
              user_id: this.user.user_id,
              wallet: 0,
              timestamp_wheel_spin: timestamp_wheel_spin
            }

            console.log('user_object',user_object);

            this.tablesService.UpdateItem('users', 'user_id', user_object).subscribe((data: any) => {
              this.userService.updateUserNoBroadCast('wallet', user_object.wallet);
              this.userService.updateUserNoBroadCast('timestamp_wheel_spin', user_object.timestamp_wheel_spin);
            });

          });

        }

        else if (this.currentIndex && this.labels[this.currentIndex] == 'Lose 2,000') {
          console.log('lose 2000');
          var wallet = this.user.wallet - 2000;
          if (wallet < 0) wallet = 0;

          this.userService.recordSpunTheWheel(this.user.user_id).subscribe((data: any) => {

            var timestamp_wheel_spin = data.timestamp_wheel_spin;

            //award tokens
            var user_object = {
              user_id: this.user.user_id,
              wallet: wallet,
              timestamp_wheel_spin: timestamp_wheel_spin
            }

            console.log('user_object',user_object);

            this.tablesService.UpdateItem('users', 'user_id', user_object).subscribe((data: any) => {
              this.userService.updateUserNoBroadCast('wallet', user_object.wallet);
              this.userService.updateUserNoBroadCast('timestamp_wheel_spin', user_object.timestamp_wheel_spin);
            })

          });
        }

        else {
          if (this.currentIndex) {
            var walletx = this.user.wallet += Number(this.labels[this.currentIndex].replace(',', ''));

            this.userService.recordSpunTheWheel(this.user.user_id).subscribe((data: any) => {

              var timestamp_wheel_spin = data.timestamp_wheel_spin;

              //award tokens
              var user_objectx = {
                user_id: this.user.user_id,
                wallet: walletx,
                timestamp_wheel_spin: timestamp_wheel_spin
              }

              console.log('user_objectx',user_objectx);

              this.tablesService.UpdateItem('users', 'user_id', user_objectx).subscribe((data: any) => {
                this.userService.updateUserNoBroadCast('wallet', user_objectx.wallet);
                this.userService.updateUserNoBroadCast('timestamp_wheel_spin', user_objectx.timestamp_wheel_spin);
              });

            });

          }

        }
      }, 2000);
    }
  }



  private randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  private norm(d: number) { return ((d % 360) + 360) % 360; }

  gotoWallet() {
    this.router.navigate(['user/wallet']);
  }

  goPlay() {
    $('#gameTypeModal').modal('hide');
    this.router.navigate(['user/loop-specs']);
  }

  getLevel() {
    this.tablesService.GetAll('skill_levels').subscribe((data: any) => {
      this.commonService.assignLevel(this.user, data);
    })
  }

  closeModal(name: string) {
    $('#' + name).modal('hide');
  }

  getData() {

    this.userService.getUserStats(this.user.user_id).subscribe((data: any) => {
      //console.log('stats', data);
      this.stats = data;
      this.user.all_time_points = this.user.points;//data.all_time_points; //this.user.points;

      console.log('this.user', this.user);
      this.getLevel();
    })


    this.userService.getUserActivity(this.user.user_id).subscribe((data: any) => {
      var user_data = data;
      //console.log('user_data', user_data);
      this.activity = user_data;

      //organize by games
      this.games = [];
      user_data.forEach((x: any) => {
        var gamex = this.games.find((n: any) => { return n.game_id == x.game_id });
        if (!gamex) {
          var game_object = {
            game_id: x.game_id,
            timestamp: x.timestamp,
            score: x.score
          }

          this.games.push(game_object);
        }
      });

      //this.max_score = 0;
      //this.points_month = 0;
      //this.points_all_time = 0;
      this.games.forEach((x: any) => {
        x.date = this.commonService.getDateString(x.timestamp);
        //x.is_this_month = this.commonService.isThisMonth(x.date);
        //if (x.is_this_month == true) this.points_month += x.score;
        //this.points_all_time += x.score;
        //if (x.score){
        //if (x.score > this.max_score) this.max_score = x.score;
        //}
      });

      //this.calculateStats();

      //console.log('this.games', this.games);
    });

    /*
    this.tablesService.GetFiltered('user_badges','user_id', this.user.user_id).subscribe((data:any) => {
      var badges = data;
      this.number_of_badges = badges.length;
      //group and count
      this.badges = [];
      badges.forEach((x:any) => {
        //check that is not already added
        var record = this.badges.find((n:any) => n.badge_name == x.badge_name);
        if (!record){
          var object = {
            badge_name: x.badge_name,
            badge_icon: x.badge_icon,
            count: badges.filter((n:any) => { return n.badge_name == x.badge_name }).length
          }
          this.badges.push(object);
        }
      })
      console.log('badges', this.badges);

    });
    */

  }

  gotoDashboard() {
    this.router.navigate(['user/user-dashboard']);
  }

}