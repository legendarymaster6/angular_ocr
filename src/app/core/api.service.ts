import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASEURL = 'http://localhost:3000';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    getDocuments() {
        return this.http.get(`${BASEURL}/documents`);
    }

    getDocumentStats() {
        return this.http.get(`${BASEURL}/documents/get_stats`);
    }

    getParsers() {
        return this.http.get(`${BASEURL}/parsers`);
    }

    getParser(id) {
        return this.http.get(`${BASEURL}/parsers/${id}`);
    }

    getPages(document_id) {
        return this.http.get(`${BASEURL}/documents/${document_id}/get_pages`);
    }

    getDocument(id: number) {
        return this.http.get(`${BASEURL}/documents/${id}`);
    }

    createTemplate(data) {
        return this.http.post(`${BASEURL}/parsers`, data);
    }

    saveTemplate(parser_id, data) {
        return this.http.post(`${BASEURL}/parsers/${parser_id}`, data);
    }

    saveBoundaries(document_id, data) {
        return this.http.post(`${BASEURL}/documents/${document_id}/save_boundaries`, data);
    }

    extractData(document_id) {
        return this.http.get(`${BASEURL}/documents/${document_id}/extract_data`);
    }
}
