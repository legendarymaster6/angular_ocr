import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

@Component({
  selector: 'template-widget',
  templateUrl: './template-widget.component.html',
  styleUrls: ['./template-widget.component.scss'],
})
export class TemplateWidgetComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: "localhost"});
  templateTitle: string = "Recent Parser Templates:";
  templateDescription: string = "Company Name Parser";
  screenStatus: string = "FIRST_SCREEN";
  uploadStatus: string = "NOT_LOADING";

  progress: number = 0;
  inter: any;

  constructor(private router: Router) { }

  // Continue Button Click
  onContinue(e) {
    this.router.navigate(['templates/create']);
  }

  // Recent Template Edit Button
  onRecentParserEdit(e) {
    this.router.navigate(['templates/create']);
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
