import { Page, Document } from "src/app/core/interfaces";

export interface DocumentSelected {
    type: 'DOCUMENTS_DOCUMENT_SELECTED';
    payload: number;
}

export interface PagesArrived {
    type: 'DOCUMENTS_PAGES_ARRIVED';
    payload: Page[];
}

export interface DocumentArrived {
    type: 'DOCUMENTS_DOCUMENT_ARRIVED';
    payload: Document;
}

export interface Initialize {
    type: 'INITIALIZE',
    payload: any,
}

export type DocumentsAction = DocumentSelected | PagesArrived | DocumentArrived | Initialize;
