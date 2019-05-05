import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { ManagementAction, DocumentSelected } from "./management.actions";
import { ApiService } from "src/app/core/api.service";

@Injectable()
export class ManagementEffects {

    constructor(private api: ApiService, private actions: Actions) { }

    @Effect()
    loadPages = this.actions.pipe(
        ofType<ManagementAction>('DOCUMENT_SELECTED'),
        mergeMap((action: DocumentSelected) => {
            if (action.payload == 0) return of({ type: 'PAGES_ARRIVED', payload: [] });
            return this.api.getPages(action.payload)
                .pipe(map(data => {
                    return { type: 'PAGES_ARRIVED', payload: data }
                }))
        })
    )
}
