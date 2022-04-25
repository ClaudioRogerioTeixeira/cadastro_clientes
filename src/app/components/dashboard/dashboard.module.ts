import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';1

import { DashboardComponent } from './dashboard.component';

import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    CoreModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
