import { TemplatesAction } from "./templates.actions";
import { Document, Page, Parser } from '../../core/interfaces';

const document = (prevState: Document = null, action: TemplatesAction): Document => {
    switch (action.type) {
        case 'DOCUMENT_ARRIVED':
            return action.payload;
        case 'INITIALIZE':
            return null;
        default:
            return prevState;
    }
};

const selectedDocument = (prevState: number = 0, action: TemplatesAction): number => {
    switch (action.type) {
        case 'DOCUMENT_SELECTED':
            return action.payload;
        case 'INITIALIZE':
            return 0;
        default:
            return prevState;
    }
};

const documentList = (prevState: Document[] = [], action: TemplatesAction): Document[] => {
    switch (action.type) {
        case 'DOCUMENTS_ARRIVED':
            return action.payload;
        case 'INITIALIZE':
            return [];
        default:
            return prevState;
    }
};

const isCreated = (prevState: Boolean = true, action: TemplatesAction): Boolean => {
    switch (action.type) {
        case 'EDITOR_STATUS_CHANGED':
            return action.payload;
        case 'INITIALIZE':
            return true;
        default:
            return prevState;
    }
};

const pages = (prevState: Page[] = [], action: TemplatesAction): Page[] => {
    switch (action.type) {
        case 'PAGES_ARRIVED':
            return action.payload;
        case 'INITIALIZE':
            return [];
        default:
            return prevState;
    }
};

const parser = (prevState: Parser = null, action: TemplatesAction): Parser => {
    switch (action.type) {
        case 'PARSER_ARRIVED':
            return action.payload;
        case 'INITIALIZE':
            return null;
        default:
            return prevState;
    }
};

export const templatesReducerMap = {
    document,
    selectedDocument,
    documentList,
    isCreated,
    pages,
    parser
};
