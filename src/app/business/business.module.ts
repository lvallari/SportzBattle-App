import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule, routingComponents } from './business-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BusinessDashboardGraphComponent } from './business-dashboard-graph/business-dashboard-graph.component';
import { PlotlyModule } from 'angular-plotly.js';



@NgModule({
  declarations: [
    routingComponents,
    BusinessDashboardGraphComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule, 
    PlotlyModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BusinessModule { }
