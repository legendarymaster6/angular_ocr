import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementScreenComponent } from './containers/management-screen/management-screen.component';
import { DocumentsTabComponent } from './containers/documents-tab/documents-tab.component';
import { TemplatesTabComponent } from './containers/templates-tab/templates-tab.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'documents'
  },
  {
    path: '',
    component: ManagementScreenComponent,
    children: [
      {
        path: 'documents',
        component: DocumentsTabComponent
      },
      {
        path: 'templates',
        component: TemplatesTabComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementPanelRoutingModule { }
