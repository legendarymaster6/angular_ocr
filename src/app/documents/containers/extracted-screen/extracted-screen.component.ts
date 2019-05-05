import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { BoundaryScreenService } from '../../services/boundary-screen.service';

@Component({
  selector: 'extracted-screen',
  templateUrl: './extracted-screen.component.html',
  styleUrls: ['./extracted-screen.component.scss']
})
export class ExtractedScreenComponent implements OnInit {
  @ViewChild('infoPanel') infoPanel;

  result$;
  pages$;
  documentId;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private boundaryScreenService: BoundaryScreenService) { }

  onInfoButton(e) {
    this.infoPanel.nativeElement.style.left = this.infoPanel.nativeElement.offsetLeft - this.infoPanel.nativeElement.offsetWidth + 'px';
  }

  onCloseInfoButton(e) {
    this.infoPanel.nativeElement.style.left = this.infoPanel.nativeElement.offsetLeft + this.infoPanel.nativeElement.offsetWidth + 'px';
  }

  ngOnInit() {
    this.documentId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.result$ = this.api.extractData(this.documentId);
    this.pages$ = this.boundaryScreenService.getPages();
  }

}
