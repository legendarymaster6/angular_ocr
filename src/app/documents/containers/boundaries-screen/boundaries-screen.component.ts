import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoundaryScreenService } from '../../services/boundary-screen.service';
import { Observable } from 'rxjs';

interface Boundary {
  start_y: number,
  end_y: number,
}

@Component({
  selector: 'boundaries-screen',
  templateUrl: './boundaries-screen.component.html',
  styleUrls: ['./boundaries-screen.component.scss']
})
export class BoundariesScreenComponent implements OnInit {
  pages$: Observable<any[]>;
  document$: Observable<any>;

  boundaries: Boundary[];
  documentId: number;
  boundary_changed: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boundaryScreenService: BoundaryScreenService) {
  }

  ngOnInit() {
    this.boundaryScreenService.initialize();
    this.pages$ = this.boundaryScreenService.getPages();
    this.document$ = this.boundaryScreenService.getDocument();
    this.boundaryScreenService.selectDocument(parseInt(this.route.snapshot.paramMap.get('id')));

    this.pages$.subscribe(pages => {
      if (pages.length == 0) return;
      this.boundaries = [];
      for (let page of pages) {
        this.boundaries.push({start_y: page.start_y, end_y: page.end_y});
      }
      console.log(this.boundaries);
    });

    this.document$.subscribe(document => {
      if (document == null) return;
      this.documentId = document.document_id;
      console.log(this.documentId);
    });
    
    this.boundary_changed = false;
   }

  onExtract(e) {
    if (this.boundary_changed) {
      this.boundaryScreenService.saveBoundaries(this.documentId, this.boundaries).subscribe((response: any) => {
        if (response.status == 'err') {
          alert('err');
          return;
        }
        this.router.navigate([`documents/${this.documentId}/extracted`]);
      });
    } else {
      this.router.navigate([`documents/${this.documentId}/extracted`]);
    }
  }

  onStartPos(start_y, index) {
    this.boundary_changed = true;
    this.boundaries[index].start_y = start_y;
  }

  onEndPos(end_y, index) {
    this.boundary_changed = true;
    this.boundaries[index].end_y = end_y;
  }

  onSave(e) {
    if (this.boundary_changed) {
      this.boundaryScreenService.saveBoundaries(this.documentId, this.boundaries).subscribe((response: any) => {
        if (response.status == 'err') {
          alert('err');
          return;
        }
        this.router.navigate(['management/documents']);
      });  
    } else {
      this.router.navigate(['management/documents']);
    }
  }
}
