import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { TemplatesRoutingModule } from './templates-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { TemplatesScreenComponent } from './containers/templates-screen/templates-screen.component';
import { TemplateEditorComponent } from './containers/template-editor/template-editor.component';
import { TemplateEditorService } from './services/template-editor.service';
import { TemplatesState } from './state/templates.interfaces';
import { templatesReducerMap } from './state/templates.reducers';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { TemplatesEffects } from './state/templates.effects';

export const FEATURE_REDUCER_TOKEN =
  new InjectionToken<ActionReducerMap<TemplatesState>>('Feature Reducers');

export function getReducers(): ActionReducerMap<TemplatesState> {
  return templatesReducerMap;
}
@NgModule({
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatDialogModule,
    StoreModule.forFeature('templates', FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([TemplatesEffects]),
    FormsModule
  ],
  declarations: [
    TemplatesScreenComponent, 
    TemplateEditorComponent
  ],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useFactory: getReducers
    },
    TemplateEditorService,
  ]
})
export class TemplatesModule { }
