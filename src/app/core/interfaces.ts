export interface Document {
    document_id: number;
    file_name: string;
    identifier: string;
    page_num: number;
    status: number;
    size: number;
    created_at: string;
    parsed_at: string;
}

export interface Page {
    image: string;
    width: number;
    height: number;
    start_y: number;
    end_y: number;
}

export interface Parser {
    parser_id: number;
    document_id: number;
    name: string;
}
