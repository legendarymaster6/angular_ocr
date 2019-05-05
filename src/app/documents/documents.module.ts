import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PageSelectorComponent } from './presentations/page-selector/page-selector.component';
import { ExtractedScreenComponent } from './containers/extracted-screen/extracted-screen.component';
import { BoundariesScreenComponent } from './containers/boundaries-screen/boundaries-screen.component';
import { DocumentsState } from './state/documents.interfaces';
import { documentsReducerMap } from './state/documents.reducers';
import { BoundaryScreenService } from './services/boundary-screen.service';
import { DocumentsEffects } from './state/documents.effects';
import { EffectsModule } from '@ngrx/effects';

export const FEATURE_REDUCER_TOKEN =
  new InjectionToken<ActionReducerMap<DocumentsState>>('Feature Reducers');

export function getReducers(): ActionReducerMap<DocumentsState> {
  return documentsReducerMap;
}

@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
    MatCheckboxModule,
    StoreModule.forFeature('documents', FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([DocumentsEffects]),
  ],
  declarations: [
    BoundariesScreenComponent, 
    PageSelectorComponent, 
    ExtractedScreenComponent
  ],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useFactory: getReducers
    },
    BoundaryScreenService
  ]
})
export class DocumentsModule { }
