import { Document, Page, Parser } from '../../core/interfaces';

export interface DocumentStats {
    all_count: number;
    processed_count: number;
}

export interface ManagementState {
    documentList: Document[];
    documentStats: DocumentStats;
    selectedTab: string;
    selectedId: number;
    selectedPages: Page[];
    parserList: Parser[];
}

export interface AppState {
    readonly management: ManagementState;
}
