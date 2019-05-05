import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'document-row',
  templateUrl: './document-row.component.html',
  styleUrls: ['./document-row.component.scss']
})
export class DocumentRowComponent implements OnInit {
  @Input('name') name: string;
  @Input('status') status: string;
  @Input('size') size: string;
  @Input('datetime') datetime: string;
  @Input('extracted') extracted: boolean;
  @Output('extract') extract = new EventEmitter();
  @Output('check') check = new EventEmitter<boolean>();
  @Output('view') view = new EventEmitter();

  constructor() { }

  onExtract(e) {
    e.stopPropagation();
    e.preventDefault();
    this.extract.emit(null);
  }

  onView(e) {
    e.stopPropagation();
    e.preventDefault();
    this.view.emit(null);
  }

  ngOnInit() {

  }

}
