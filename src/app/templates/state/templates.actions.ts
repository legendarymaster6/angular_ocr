import { Document, Page, Parser } from '../../core/interfaces';

export interface DocumentArrived {
    type: 'DOCUMENT_ARRIVED';
    payload: Document;
}

export interface DocumentSelected {
    type: 'DOCUMENT_SELECTED';
    payload: number;
}

export interface DocumentsArrived {
    type: 'DOCUMENTS_ARRIVED';
    payload: Document[];
}

export interface EditorStatusChanged {
    type: 'EDITOR_STATUS_CHANGED';
    payload: Boolean;
}

export interface PagesArrived {
    type: 'PAGES_ARRIVED';
    payload: Page[];
}

export interface ParserArrived {
    type: 'PARSER_ARRIVED';
    payload: Parser;
}

export interface Initialize {
    type: 'INITIALIZE';
    payload: any;
}

export type TemplatesAction = DocumentArrived | DocumentSelected | DocumentsArrived | EditorStatusChanged | PagesArrived | ParserArrived | Initialize;