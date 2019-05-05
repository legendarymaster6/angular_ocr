import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { ManagementPanelRoutingModule } from './management-panel-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ManagementScreenComponent } from './containers/management-screen/management-screen.component';
import { TemplatesTabComponent } from './containers/templates-tab/templates-tab.component';
import { DocumentsTabComponent } from './containers/documents-tab/documents-tab.component';
import { DocumentDetailComponent } from './presentations/document-detail/document-detail.component';
import { DocumentRowComponent } from './presentations/document-row/document-row.component';
import { managementReducerMap } from './state/management.reducers';
import { ManagementState } from './state/management.interfaces';
import { ManagementService } from './services/management.service';
import { DocumentListService } from './services/document-list.service';
import { DocumentTabService } from './services/document-tab.service';
import { ParserListService } from './services/parser-list.service';
import { EffectsModule } from '@ngrx/effects';
import { ManagementEffects } from './state/management.effects';

export const FEATURE_REDUCER_TOKEN =
  new InjectionToken<ActionReducerMap<ManagementState>>('Feature Reducers');

export function getReducers(): ActionReducerMap<ManagementState> {
  return managementReducerMap;
}
@NgModule({
  imports: [
    CommonModule,
    ManagementPanelRoutingModule,
    SharedModule,
    MatCheckboxModule,
    FormsModule,
    StoreModule.forFeature('management', FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([ManagementEffects])
  ],
  declarations: [
    ManagementScreenComponent, 
    DocumentsTabComponent, 
    TemplatesTabComponent, 
    DocumentDetailComponent, 
    DocumentRowComponent
  ],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useFactory: getReducers
    },
    ManagementService,
    DocumentListService,
    DocumentTabService,
    ParserListService,
    ManagementEffects
  ]
})
export class ManagementPanelModule { }
