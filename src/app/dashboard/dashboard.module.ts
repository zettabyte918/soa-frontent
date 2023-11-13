import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListComponent } from './authors/list/list.component';
import { EditComponent } from './authors/edit/edit.component';
import { AddComponent } from './authors/add/add.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }