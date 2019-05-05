import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentListService } from '../../services/document-list.service';
import { ParserListService } from '../../services/parser-list.service';
import { DocumentTabService } from '../../services/document-tab.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'management-screen',
  templateUrl: './management-screen.component.html',
  styleUrls: ['./management-screen.component.scss']
})
export class ManagementScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private documentListService: DocumentListService,
    private parserListService: ParserListService,
    private documentTabService: DocumentTabService) { }

  ngOnInit() {
    this.documentListService.loadDocumentList();
    this.documentListService.loadDocumentStats();
    this.parserListService.loadParserList();
  }

  onUpload() {
    this.documentTabService.selectTab('upload');
  }

  onRefresh() {
    this.documentListService.loadDocumentList();
    this.documentListService.loadDocumentStats();
    this.parserListService.loadParserList();
  }

  onCreateParser() {
    this.router.navigate(['templates/create']);
  }
}
