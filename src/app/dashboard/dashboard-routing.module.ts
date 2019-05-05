import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardScreenComponent } from './containers/dashboard-screen/dashboard-screen.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
