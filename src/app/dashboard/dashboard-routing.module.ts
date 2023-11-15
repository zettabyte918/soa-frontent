import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListComponent } from './authors/list/list.component';
import { AddComponent } from './authors/add/add.component';
import { EditComponent } from './authors/edit/edit.component';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: "authors", component: ListComponent },
      { path: "articles", component: ArticlesComponent },
      { path: "**", redirectTo: "authors" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
