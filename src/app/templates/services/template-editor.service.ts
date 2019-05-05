import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../state/templates.interfaces';
import { Document, Parser } from '../../core/interfaces';
import { ApiService } from 'src/app/core/api.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { formatNumber } from '@angular/common';
import { st, s } from '@angular/core/src/render3';

@Injectable()
export class TemplateEditorService {
  
    constructor(private store: Store<AppState>, private api: ApiService, private domSanitizer: DomSanitizer) { }

    initializeState() {
        this.store.dispatch({ type: 'INITIALIZE', payload: null });
    }

    getSelectedDocument() {
        return this.store.select(state => state.templates.selectedDocument);
    }

    getDocument() {
        return this.store.select(state => state.templates.document);
    }

    loadDocumentList() {
        this.api.getDocuments()
            .subscribe(documents => {
                this.store.dispatch({ type: 'DOCUMENTS_ARRIVED', payload: documents });
            });
    }

    getDocumentSelectList() {
        return this.store.select(state => state.templates.documentList)
            .pipe(map(documents => {
                return documents
                    .map(document => {
                        return {
                            id: document.document_id,
                            name: document.file_name + ' (' + document.document_id + ')'    
                        };
                    });
            }));
    }

    selectDocument(id: number) {
        return this.store.dispatch({ type: 'DOCUMENT_SELECTED', payload: id });
    }

    setIsCreated(isCreated: Boolean) {
        return this.store.dispatch({ type: 'EDITOR_STATUS_CHANGED', payload: isCreated});
    }

    getIsCreated() {
        return this.store.select(state => state.templates.isCreated);
    }

    getPages() {
        return this.store.select(state => state.templates.pages)
            .pipe(map(pages => {
                return pages.map(page => {
                    return {
                        image: this.domSanitizer.bypassSecurityTrustResourceUrl(page.image),
                        width: page.width,
                        height: page.height,
                    }
                })
            }));
    }

    createTemplate(parserName, docId, fields) {
        return this.api.createTemplate({
            name: parserName,
            document_id: docId,
            fields: fields
        });
    }

    saveTemplate(parserId, parserName, docId, fields) {
        return this.api.saveTemplate(
            parserId,
            {
                name: parserName,
                document_id: docId,
                fields: fields
            }
        );
    }

    loadParser(id) {
        return this.api.getParser(id)
            .subscribe((parser: Parser)  => {
                this.store.dispatch({ type: 'PARSER_ARRIVED', payload: parser });
                this.selectDocument(parser.document_id);
            });
    }

    getParser() {
        return this.store.select(state => state.templates.parser);
    }
}
