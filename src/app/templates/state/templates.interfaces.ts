import { Document, Page, Parser } from '../../core/interfaces';

export interface TemplatesState {
    document: Document;
    selectedDocument: number;
    documentList: Document[];
    isCreated: Boolean;
    pages: Page[];
    parser: Parser;
}

export interface AppState {
    readonly templates: TemplatesState;
}
