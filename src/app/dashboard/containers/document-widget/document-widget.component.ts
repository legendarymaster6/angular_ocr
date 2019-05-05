import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

@Component({
  selector: 'document-widget',
  templateUrl: './document-widget.component.html',
  styleUrls: ['./document-widget.component.css']
})
export class DocumentWidgetComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: "localhost"});
  docTitle = "Recent Parsered Documents:";
  docDescription = "EasternMedical_invoice.pdf";
  screenStatus: string = "FIRST_SCREEN";
  uploadStatus: string = "NOT_LOADING";

  progress: number = 0;
  inter: any;

  constructor(private router: Router) { }

  // Continue Button Click
  onContinue(e) {
    this.router.navigate(['documents/extracted']);
  }

  // Recent Document Click Event
  onRecentDocEdit(e) {
    this.router.navigate(['documents/extracted']);
  }

  // File Upload
  onFileDropped(e: File[]): void {
    this.uploadStatus = "LOADING";
    this.onLoading();
  }

  // Progress
  progressFunction() {
    if (this.progress == 100) {
      clearInterval(this.inter);
      this.screenStatus = "UPLOAD_SUCCESS";
      this.uploadStatus = "NOT_LOADING";
    } else {
      this.progress++;
    }
  }

  onLoading() {
    this.progress = 0;
    this.inter = setInterval(() => { this.progressFunction() }, 10);
  }

  ngOnInit() {
  }

}
