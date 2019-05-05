import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoundariesScreenComponent } from './containers/boundaries-screen/boundaries-screen.component';
import { ExtractedScreenComponent } from './containers/extracted-screen/extracted-screen.component';

const routes: Routes = [
  {
    path: 'boundaries/:id',
    component: BoundariesScreenComponent
  },
  {
    path: ':id/extracted',
    component: ExtractedScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
