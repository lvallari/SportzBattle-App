import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSidemenuComponent } from './user-sidemenu/user-sidemenu.component';
import { DoubleOrNothingPopupComponent } from './double-or-nothing-popup/double-or-nothing-popup.component';
import { DoubleOrNothingFailedPopupComponent } from './double-or-nothing-failed-popup/double-or-nothing-failed-popup.component';
import { BrainiacPopupComponent } from './brainiac-popup/brainiac-popup.component';
import { HitTheCyclePopupComponent } from './hit-the-cycle-popup/hit-the-cycle-popup.component';
import { HighRollerPopupComponent } from './high-roller-popup/high-roller-popup.component';
import { GridionPopupComponent } from './gridion-popup/gridion-popup.component';
import { HardwoodPopupComponent } from './hardwood-popup/hardwood-popup.component';
import { WarriorPopupComponent } from './warrior-popup/warrior-popup.component';
import { OnFirePopupComponent } from './on-fire-popup/on-fire-popup.component';
import { ParkPopupComponent } from './park-popup/park-popup.component';


@NgModule({
  declarations: [
    UserSidemenuComponent,
   OnFirePopupComponent,
   DoubleOrNothingPopupComponent,
   DoubleOrNothingFailedPopupComponent,
   WarriorPopupComponent,
   HardwoodPopupComponent, 
   GridionPopupComponent,
  ParkPopupComponent,
   BrainiacPopupComponent,
   HitTheCyclePopupComponent,
   HighRollerPopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserSidemenuComponent,
    OnFirePopupComponent,
   DoubleOrNothingPopupComponent,
   DoubleOrNothingFailedPopupComponent,
   WarriorPopupComponent,
   HardwoodPopupComponent, 
   GridionPopupComponent,
   ParkPopupComponent,
   BrainiacPopupComponent,
   HitTheCyclePopupComponent,
   HighRollerPopupComponent
    
  ]
})
export class SharedModule { }
