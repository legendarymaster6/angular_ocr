import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PageSelectorComponent } from 'src/app/documents/presentations/page-selector/page-selector.component';

@Component({
  selector: 'document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  @Input('data') data;
  @Input('pages$') pages$;
  @Output('close') close = new EventEmitter();
  selectedTab = "Parsed Data";

  constructor() { 
    // this.isLoading$ = this.pages$.map(data => !data);
  }

  onClose(e) {
    this.close.emit(null);
  }

  ngOnInit() {
  }

}
