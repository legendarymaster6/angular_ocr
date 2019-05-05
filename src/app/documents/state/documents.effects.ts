import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { of, merge } from "rxjs";
import { DocumentsAction, DocumentSelected } from "./documents.actions";
import { ApiService } from "src/app/core/api.service";

@Injectable()
export class DocumentsEffects {

    constructor(private api: ApiService, private actions: Actions) { }

    @Effect()
    loadPages = this.actions.pipe(
        ofType<DocumentsAction>('DOCUMENTS_DOCUMENT_SELECTED'),
        switchMap((action: DocumentSelected) => {
            if (action.payload == 0) return of({ type: 'DOCUMENTS_PAGES_ARRIVED', payload: [] });
            return merge(
                this.api.getPages(action.payload)
                    .pipe(map(data => {
                        return { type: 'DOCUMENTS_PAGES_ARRIVED', payload: data }
                    })),
                this.api.getDocument(action.payload)
                    .pipe(map(data => {
                        return { type: 'DOCUMENTS_DOCUMENT_ARRIVED', payload: data };
                    }))
            );
        })
    )
}
