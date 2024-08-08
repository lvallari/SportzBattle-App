import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSidemenuComponent } from './user-sidemenu/user-sidemenu.component';



@NgModule({
  declarations: [
    UserSidemenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserSidemenuComponent
  ]
})
export class SharedModule { }
