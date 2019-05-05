import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentListService } from '../../services/document-list.service';
import { DocumentTabService } from '../../services/document-tab.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentStats } from '../../state/management.interfaces';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'documents-tab',
  templateUrl: './documents-tab.component.html',
  styleUrls: ['./documents-tab.component.scss']
})
export class DocumentsTabComponent implements OnInit {
  @ViewChild('docDetail') docDetail;

  checked = true;

  documentDetailLeft$: Observable<any>;
  documentList$: Observable<any>;
  documentStats$: Observable<DocumentStats>;
  selectedTab$: Observable<string>;
  selectedDocument$: Observable<any>;
  selectedPages$: Observable<any>;

  // MUSE BE CHANGED
  public uploader: FileUploader = new FileUploader({url: "localhost"});
  docTitle = "Recent Parsered Documents:";
  docDescription = "EasternMedical_invoice.pdf";
  screenStatus: string = "FIRST_SCREEN";
  uploadStatus: string = "NOT_LOADING";

  progress: number = 0;
  inter: any;

  constructor(
    private router: Router, 
    private documentListService: DocumentListService,
    private documentTabService: DocumentTabService) { }

  ngOnInit() {
    this.documentList$ = this.documentListService.getDocumentListVM();
    this.documentStats$ = this.documentTabService.getDocumentStats();
    this.selectedTab$ = this.documentTabService.getSelectedTab();
    this.documentDetailLeft$ = this.documentTabService.getSelectedId().pipe(map(id => id == 0 ? '100%' : '40%'));
    this.selectedDocument$ = this.documentListService.getSelectedDocument();
    this.selectedPages$ = this.documentListService.getSelectedPages();
  }

  onAllSelected(e) {
    this.documentTabService.selectTab('all');
  }

  onProcessedSelected(e) {
    this.documentTabService.selectTab('processed');
  }
  
  onDocRowClick(e, id: number) {
    this.documentTabService.selectId(id);
  }

  onDocRowExtract(id: number) {
    this.router.navigate([`documents/boundaries/${id}`]);
  }

  onDocRowView(id: number) {
    this.router.navigate([`documents/${id}/extracted`]);
  }

  onCloseDocDetail(e) {
    this.documentTabService.selectId(0);
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

  onUploadFinished(e) {
    this.documentListService.loadDocumentList();
    this.documentTabService.selectTab('all');
  }
}
