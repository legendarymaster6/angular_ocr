import { DocumentsAction } from "./documents.actions";
import { Page, Document } from "src/app/core/interfaces";

const selectedId = (prevState: number = 0, action: DocumentsAction): number => {
    switch (action.type) {
        case 'DOCUMENTS_DOCUMENT_SELECTED':
            return action.payload;
        case 'INITIALIZE':
            return 0;
        default:
            return prevState;
    }
};

const pages = (prevState: Page[] = [], action: DocumentsAction): Page[] => {
    switch (action.type) {
        case 'DOCUMENTS_PAGES_ARRIVED':
            return action.payload;
        case 'INITIALIZE':
            return [];
        default:
            return prevState;
    }
};

const document = (prevState: Document = null, action: DocumentsAction): Document => {
    switch (action.type) {
        case 'DOCUMENTS_DOCUMENT_ARRIVED':
            return action.payload;
        case 'INITIALIZE':
            return null;
        default:
            return prevState;
    }
};

export const documentsReducerMap = {
    selectedId,
    pages,
    document
};
