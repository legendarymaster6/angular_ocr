import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import 'fabric';
import { Router, ActivatedRoute } from '@angular/router';
import { ObserversModule } from '@angular/cdk/observers';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TemplateEditorService } from '../../services/template-editor.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { SimpleDialogComponent } from 'src/app/shared/dialogs/simple-dialog/simple-dialog.component';

declare const fabric: any;

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
  pagenum: number;
}

const color = [
  '#FDD058',
  '#FF825A',
  '#FF6812',
  '#A57A94',
  '#2E9EAF',
  '#2ECFA3',
  '#8EBC8B',
  '#FF82A6',
  '#AD342E'
]
@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {
  canvas:any;
  @ViewChild('innerPage') innerPage;
  @ViewChild('scrollView') scrollView;

  document$: Observable<any>;
  selectedDocument$: Observable<number>;
  documentList$: Observable<any>;
  isCreated$: Observable<Boolean>;
  pages$: Observable<any[]>;
  pageNumbers$: Observable<number[]>;
  parser$: Observable<any>;

  selectedDocId: number;
  selectedField: number;
  selectedBox: Box;
  fields: Box[] = Array(9).fill({ left: 0, top: 0, width: 0, height: 0, pagenum: -1 });
  pages: any[];
  parserName: string;
  parserId: number;
  isCreate: boolean;

  constructor(private router: Router, private templateEditorService: TemplateEditorService,
    public dialog: MatDialog, private route: ActivatedRoute) {
    this.selectedDocument$ = this.templateEditorService.getSelectedDocument();
    this.documentList$ = this.templateEditorService.getDocumentSelectList();
    this.isCreated$ = this.templateEditorService.getIsCreated();
    this.pages$ = this.templateEditorService.getPages();
    this.document$ = this.templateEditorService.getDocument();
    this.pageNumbers$ = this.templateEditorService.getDocument()
      .pipe(map(document => {
        if (document == null) return [];
        return Array(document.page_num).fill(0).map((x,i)=>i+1);
      }))
    this.parser$ = this.templateEditorService.getParser();
  }
  
  updateCoordinates() {
    if (this.selectedField) {
      const marginLeft = this.innerPage.nativeElement.offsetWidth * 0.02;
      let top = this.selectedBox.top;
      let i = 0;
      for (let page of this.pages) {
        i++;
        const pageRatio = this.innerPage.nativeElement.offsetWidth * 0.96 / page.width;
        const realPageHeight = pageRatio * page.height;
        if (top > realPageHeight + 20) {
          top -= realPageHeight + 20;
        } else {
          this.fields[this.selectedField - 1] = {
            left: Math.round((this.selectedBox.left - marginLeft) / pageRatio),
            top: Math.round(top / pageRatio),
            width: Math.round(this.selectedBox.width / pageRatio),
            height: Math.round(this.selectedBox.height / pageRatio),
            pagenum: i,
          };
          console.log(this.fields[this.selectedField - 1]);
          break;
        }
      }

    }
  }

  ngOnInit() {
    this.templateEditorService.initializeState();
    
    this.parserName = '';
    this.selectedField = 0;
    this.selectedBox = { left: 0, top: 0, width: 0, height: 0, pagenum: 0 };
    if (this.router.url == '/templates/create') {
      this.templateEditorService.setIsCreated(true);
      this.isCreate = true;
    } else {
      this.templateEditorService.setIsCreated(false);
      this.isCreate = false;
      this.templateEditorService.loadParser(parseInt(this.route.snapshot.paramMap.get('id')));
    }

    this.selectedDocument$.subscribe(id => {
      if (id == 0) {
        this.templateEditorService.loadDocumentList();
      }
    });

    this.parser$.subscribe(parser => {
      if (!parser) return;
      this.parserName = parser.name;
      this.parserId = parser.parser_id;
      this.selectedDocId = parser.document_id;
      
      // Load fields from model of db
      let model = JSON.parse(parser.model);
      for (let i = 0; i < model.length; i++) {
        this.fields[i] = model[i];
      }
    })

    this.pages$.subscribe(pages => {
      this.pages = pages;
      if (pages.length != 0) {
        const $this = this;
        setTimeout(function() {
          $this.canvas = new fabric.Canvas('canvas', { selection: false });
          $this.canvas.setHeight($this.innerPage.nativeElement.offsetHeight);
          $this.canvas.setWidth($this.innerPage.nativeElement.offsetWidth);

          $this.canvas.on({
            "object:added": (e) => {
              $this.selectedField = color.findIndex(val => val + '80' == e.target.fill) + 1;
              $this.selectedBox.left = Math.floor(e.target.left);
              $this.selectedBox.top = Math.floor(e.target.top);
              $this.selectedBox.width = Math.floor(e.target.width * e.target.scaleX);
              $this.selectedBox.height = Math.floor(e.target.height * e.target.scaleY);
              $this.updateCoordinates();
            },
            "selection:created": (e) => {
              $this.selectedField = color.findIndex(val => val + '80' == e.target.fill) + 1;
              $this.selectedBox.left = Math.floor(e.target.left);
              $this.selectedBox.top = Math.floor(e.target.top);
              $this.selectedBox.width = Math.floor(e.target.width * e.target.scaleX);
              $this.selectedBox.height = Math.floor(e.target.height * e.target.scaleY);
              $this.updateCoordinates();
            },
            "selection:updated": (e) => {
              $this.selectedField = color.findIndex(val => val + '80' == e.target.fill) + 1;
              $this.selectedBox.left = Math.floor(e.target.left);
              $this.selectedBox.top = Math.floor(e.target.top);
              $this.selectedBox.width = Math.floor(e.target.width * e.target.scaleX);
              $this.selectedBox.height = Math.floor(e.target.height * e.target.scaleY);
              $this.updateCoordinates();
            },
            "object:moving": (e) => {
              $this.selectedBox.left = Math.floor(e.target.left);
              $this.selectedBox.top = Math.floor(e.target.top);
              $this.selectedBox.width = Math.floor(e.target.width * e.target.scaleX);
              $this.selectedBox.height = Math.floor(e.target.height * e.target.scaleY);
              $this.updateCoordinates();
            },
            "selection:cleared": (e) => {
              $this.fields[$this.selectedField - 1] = { left: 0, top: 0, width: 0, height: 0, pagenum: -1 };
              $this.selectedField = 0;
              $this.updateCoordinates();
            },
            "object:scaling": (e) => {
              $this.selectedBox.width = Math.floor(e.target.width * e.target.scaleX);
              $this.selectedBox.height = Math.floor(e.target.height * e.target.scaleY);
              $this.updateCoordinates();
            }
          })

          // Create fabric rectangles
          if ($this.isCreate == false) {
            const marginLeft = $this.innerPage.nativeElement.offsetWidth * 0.02;
            for (let i = 0; i < $this.fields.length; i++) {
              if ($this.fields[i].pagenum == -1) continue;

              const page = $this.pages[$this.fields[i].pagenum];
              const pageRatio = $this.innerPage.nativeElement.offsetWidth * 0.96 / page.width;
              const left = $this.fields[i].left * pageRatio + marginLeft;
              const width = $this.fields[i].width * pageRatio;
              const height = $this.fields[i].height * pageRatio;
              let top = $this.fields[i].top * pageRatio;
              for (let j = 0; j < $this.fields[i].pagenum - 1; j++) {
                const realPageHeight = pageRatio * $this.pages[j].height;
                top += realPageHeight;
              }
              
              var rect = new fabric.Rect({
                width: Math.round(width),
                height: Math.round(height),
                top: Math.round(top),
                left: Math.round(left),
                fill: color[i] + '80',
                hasRotatingPoint: false
              });
              $this.canvas.add(rect);  
            }
          }
        }, 100);
      }
    })

  }

  onSelect() {
    this.templateEditorService.selectDocument(this.selectedDocId);
  }

  onPageSelect(page) {
    this.scrollView.nativeElement.scrollTop = (page - 1) * this.innerPage.nativeElement.offsetHeight / 2;
  }

  onSave(e) {
    if (!this.parserName) {
      const dialogRef = this.dialog.open(SimpleDialogComponent, {
        width: '500px',
        data: { title: 'Error', content: 'Please input Parser Name.' }
      });
      return;
    }
    if (this.isCreate) {
      this.templateEditorService.createTemplate(this.parserName, this.selectedDocId, this.fields)
        .subscribe(response => {
          this.templateEditorService.selectDocument(0);
          this.router.navigate(['management/templates']);
        });
    } else {
      this.templateEditorService.saveTemplate(this.parserId, this.parserName, this.selectedDocId, this.fields)
        .subscribe(response => {
          this.templateEditorService.selectDocument(0);
          this.router.navigate(['management/templates']);
        });
    }
  }

  onSelectRect(e, index) {
    if (this.fields[index].pagenum == -1) {
      var rect = new fabric.Rect({
        width: 200,
        height: 100,
        top: 100,
        left: 100,
        fill: color[index] + '80',
        hasRotatingPoint: false
      });
      this.canvas.add(rect);  
    }
  }

  onRemoveSelection(e) {
    this.canvas.remove(this.canvas.getActiveObject());
    this.selectedField = 0;
  }
}
