import { DocumentStats } from './management.interfaces';
import { Document, Page, Parser } from '../../core/interfaces';

export interface DocumentsArrived {
    type: 'DOCUMENTS_ARRIVED';
    payload: Document[];
}

export interface DocumentStatsArrived {
    type: 'DOCUMENT_STATS_ARRIVED';
    payload: DocumentStats;
}

export interface TabSelected {
    type: 'TAB_SELECTED';
    payload: string;
}

export interface DocumentSelected {
    type: 'DOCUMENT_SELECTED';
    payload: number;
}

export interface ParsersArrived {
    type: 'PARSERS_ARRIVED';
    payload: Parser[];
}

export interface PagesArrived {
    type: 'PAGES_ARRIVED';
    payload: Page[];
}

export type ManagementAction = DocumentsArrived | DocumentStatsArrived | TabSelected | DocumentSelected | ParsersArrived | PagesArrived;