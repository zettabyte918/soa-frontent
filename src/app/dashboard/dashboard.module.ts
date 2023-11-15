import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListComponent } from './authors/list/list.component';
import { EditComponent } from './authors/edit/edit.component';
import { AddComponent } from './authors/add/add.component';
import { FormsModule } from '@angular/forms';
import { ArticlesComponent } from './articles/articles.component';
import { FilterPipe } from '../pipes/filter';



@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    EditComponent,
    AddComponent,
    ArticlesComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
