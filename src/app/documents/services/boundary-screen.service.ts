import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../state/documents.interfaces';
import { Document } from '../../core/interfaces';
import { ApiService } from 'src/app/core/api.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { formatNumber } from '@angular/common';

@Injectable()
export class BoundaryScreenService {
  
    constructor(private store: Store<AppState>, private api: ApiService, private domSanitizer: DomSanitizer) { }

    public selectDocument(id: number) {
        this.store.dispatch({ type: 'DOCUMENTS_DOCUMENT_SELECTED', payload: id });
    }

    public getPages() {
        return this.store.select(state => state.documents.pages)
            .pipe(map(pages => {
                return pages.map(page => {
                    return {
                        image: this.domSanitizer.bypassSecurityTrustResourceUrl(page.image),
                        width: page.width,
                        height: page.height,
                        start_y: page.start_y,
                        end_y: page.end_y,
                    }
                })
            }));
    }

    public getDocument() {
        return this.store.select(state => state.documents.document)
            .pipe(map(document => {
                if (document == null) return null;
                return {
                    document_id: document.document_id,
                    name: document.file_name,
                    size: formatNumber(document.size / 1000, 'en', '1.1-1') + ' Mb',
                }
            }))
    }

    public initialize() {
        this.store.dispatch({ type: 'INITIALIZE', payload: null });
    }

    public saveBoundaries(documentId, boundaries) {
        return this.api.saveBoundaries(documentId, boundaries);
    }
}
