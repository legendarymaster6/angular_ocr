import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadZoneComponent } from './file-upload-zone/file-upload-zone.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FileUploadModule } from 'ng2-file-upload';
import { SimpleDialogComponent } from './dialogs/simple-dialog/simple-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgCircleProgressModule,
    FileUploadModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [HeaderComponent, FileUploadZoneComponent, SimpleDialogComponent],
  exports: [HeaderComponent, FileUploadZoneComponent, SimpleDialogComponent],
  entryComponents: [SimpleDialogComponent]
})
export class SharedModule { }
