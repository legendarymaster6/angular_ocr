import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'management',
    loadChildren: './management-panel/management-panel.module#ManagementPanelModule'
  },
  {
    path: 'templates',
    loadChildren: './templates/templates.module#TemplatesModule'
  },
  {
    path: 'documents',
    loadChildren: './documents/documents.module#DocumentsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
