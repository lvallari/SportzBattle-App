import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule, routingComponents } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AdminSidemenuComponent } from './admin-sidemenu/admin-sidemenu.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    routingComponents,
    AdminSidemenuComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    DpDatePickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
