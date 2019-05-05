import { Page, Document } from "src/app/core/interfaces";

export interface DocumentsState {
    selectedId: number;
    pages: Page[];
    document: Document;
}

export interface AppState {
    readonly documents: DocumentsState;
}
