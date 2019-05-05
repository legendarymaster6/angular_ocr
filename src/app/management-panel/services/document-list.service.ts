import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../state/management.interfaces';
import { Document } from '../../core/interfaces';
import { ApiService } from 'src/app/core/api.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { formatNumber } from '@angular/common';

@Injectable()
export class DocumentListService {
  
    constructor(private store: Store<AppState>, private api: ApiService, private domSanitizer: DomSanitizer) { }

    loadDocumentList() {
        this.api.getDocuments()
            .subscribe(documents => {
                this.store.dispatch({ type: 'DOCUMENTS_ARRIVED', payload: documents });
            });
    }

    loadDocumentStats() {
        this.api.getDocumentStats()
            .subscribe(documentStats => {
                this.store.dispatch({ type: 'DOCUMENT_STATS_ARRIVED', payload: documentStats });
            });
    }

    getDocumentListVM() {
        return combineLatest(
                this.store.select(state => state.management.documentList),
                this.store.select(state => state.management.selectedTab),
                (documents: Document[], selectedTab) => {
                    return documents
                        .filter(document => selectedTab == 'all' ? true : document.status == 1)
                        .map(document => {
                            return {
                                document_id: document.document_id,
                                name: document.file_name,
                                status: document.status == 0 ? 'in Queue' : 'Processed',
                                size: formatNumber(document.size / 1000, 'en', '1.1-1') + ' Mb',
                                datetime: document.status == 0 ? moment(document.created_at).format('MM.DD.YYYY HH:mm') : moment(document.parsed_at).format('MM.DD.YYYY HH:mm'),
                                extracted: !document.status
                            }
                        });
                }
            );
    }

    getSelectedDocument() {
        return combineLatest(
                this.store.select(state => state.management.documentList),
                this.store.select(state => state.management.selectedId),
                (documents: Document[], selectId: number) => {
                    const document = documents.find((document: Document) => document.document_id == selectId);
                    if (!document) return {};
                    return {
                        document_id: document.document_id,
                        name: document.file_name,
                        import_date: moment(document.created_at).format('MM.DD.YYYY HH:mm'),
                        parse_date: document.parsed_at && moment(document.parsed_at).format('MM.DD.YYYY HH:mm')
                    }
                }
            );
    }

    getSelectedPages() {
        return this.store.select(state => state.management.selectedPages)
            .pipe(map(pages => {
                return pages.map(page => {
                    return {
                        image: this.domSanitizer.bypassSecurityTrustResourceUrl(page.image)
                    }
                })
            }));
    }
}
