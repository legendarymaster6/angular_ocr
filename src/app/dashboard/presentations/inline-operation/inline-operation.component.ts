import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'inline-operation',
  templateUrl: './inline-operation.component.html',
  styleUrls: ['./inline-operation.component.scss']
})
export class InlineOperationComponent {
  @Input('title') title: String;
  @Input('description') description: String;
  @Output('edit') edit = new EventEmitter();
  @Output('copy') copy = new EventEmitter();
  @Output('delete') delete = new EventEmitter();

  constructor() { }

  onEdit(e) {
    this.edit.emit(null);
  }

  onCopy(e) {
    this.copy.emit(null);
  }

  onDelete(e) {
    this.delete.emit(null);
  }
}
