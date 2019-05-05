import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardScreenComponent } from './containers/dashboard-screen/dashboard-screen.component';
import { TemplateWidgetComponent } from './containers/template-widget/template-widget.component';
import { DocumentWidgetComponent } from './containers/document-widget/document-widget.component';

import { InlineOperationComponent } from './presentations/inline-operation/inline-operation.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  declarations: [
    DashboardScreenComponent, 
    TemplateWidgetComponent, 
    DocumentWidgetComponent, 
    InlineOperationComponent
  ]
})
export class DashboardModule { }
