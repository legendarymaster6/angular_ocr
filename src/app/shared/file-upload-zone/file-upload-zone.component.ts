import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'file-upload-zone',
  templateUrl: './file-upload-zone.component.html',
  styleUrls: ['./file-upload-zone.component.scss']
})
export class FileUploadZoneComponent implements OnInit {
  @Input('url') url: string;
  @Output('onUploadFinished') finished = new EventEmitter();

  uploader: FileUploader;
  status: string;

  constructor() {
    this.status = 'NOT_LOADING';
  }

  ngOnInit() {
    this.uploader = new FileUploader({ url: this.url });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.status = 'FINISHED';
      this.finished.emit(null);
    };
  }

  onFileDropped(files: File[]): void {
    this.uploader.uploadAll();
    this.status = 'LOADING';
  }

}
