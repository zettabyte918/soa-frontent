import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListComponent } from './authors/list/list.component';
import { AddComponent } from './authors/add/add.component';
import { EditComponent } from './authors/edit/edit.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: "authors/list", component: ListComponent },
      { path: "authors/add", component: AddComponent },
      { path: "authors/edit", component: EditComponent },
      { path: "**", redirectTo: "authors/list" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
