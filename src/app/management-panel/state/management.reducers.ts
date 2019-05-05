import { DocumentStats } from './management.interfaces';
import { Document, Page, Parser } from '../../core/interfaces';
import { ManagementAction } from './management.actions';

const documentList = (prevState: Document[] = [], action: ManagementAction): Document[] => {
    switch (action.type) {
        case 'DOCUMENTS_ARRIVED':
            return action.payload;
        default:
            return prevState;
    }
};

const documentStats = (prevState: DocumentStats = { all_count: 0, processed_count: 0 }, action: ManagementAction): DocumentStats => {
    switch (action.type) {
        case 'DOCUMENT_STATS_ARRIVED':
            return action.payload;
        default:
            return prevState;
    }
};

const selectedTab = (prevState: string = 'all', action: ManagementAction): string => {
    switch (action.type) {
        case 'TAB_SELECTED':
            return action.payload;
        default:
            return prevState;
    }
};

const selectedId = (prevState: number = 0, action: ManagementAction): number => {
    switch (action.type) {
        case 'DOCUMENT_SELECTED':
            return action.payload;
        default:
            return prevState;
    }
};

const parserList = (prevState: Parser[] = [], action: ManagementAction): Parser[] => {
    switch (action.type) {
        case 'PARSERS_ARRIVED':
            return action.payload;
        default:
            return prevState;
    }
};

const selectedPages = (prevState: Page[] = [], action: ManagementAction): Page[] => {
    switch (action.type) {
        case 'PAGES_ARRIVED':
            return action.payload;
        default:
            return prevState;
    }
};

export const managementReducerMap = {
    documentList,
    documentStats,
    selectedTab,
    selectedId,
    parserList,
    selectedPages
};
