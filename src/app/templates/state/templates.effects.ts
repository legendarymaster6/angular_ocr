import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map, mergeMap, concatMap, switchMap } from "rxjs/operators";
import { of, concat, merge } from "rxjs";
import { TemplatesAction, DocumentSelected } from "./templates.actions";
import { ApiService } from "src/app/core/api.service";

@Injectable()
export class TemplatesEffects {

    constructor(private api: ApiService, private actions: Actions) { }

    @Effect()
    loadPages = this.actions.pipe(
        ofType<TemplatesAction>('DOCUMENT_SELECTED'),
        switchMap((action: DocumentSelected) => {
            if (action.payload == 0) {
                return of({ type: 'PAGES_ARRIVED', payload: [] });
            }
            return merge(
                this.api.getPages(action.payload)
                    .pipe(map(data => {
                        return { type: 'PAGES_ARRIVED', payload: data }
                    })),
                this.api.getDocument(action.payload)
                    .pipe(map(data => {
                        return { type: 'DOCUMENT_ARRIVED', payload: data };
                    }))
            );
        })
    )
}
