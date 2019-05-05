import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesScreenComponent } from './containers/templates-screen/templates-screen.component';
import { TemplateEditorComponent } from './containers/template-editor/template-editor.component';

const routes: Routes = [
  {
    path: '',
    component: TemplatesScreenComponent,
    children: [
      {
        path: 'create',
        component: TemplateEditorComponent
      },
      {
        path: 'edit/:id',
        component: TemplateEditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
