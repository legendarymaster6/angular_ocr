import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss']
})
export class PageSelectorComponent implements OnInit, AfterViewInit {
  @Input('src') src;
  @Input('page_height') page_height: number;
  @Input('start_y') start_y: number;
  @Input('end_y') end_y: number;

  @Output('start_pos') start_pos = new EventEmitter<number>();
  @Output('end_pos') end_pos = new EventEmitter<number>();

  @ViewChild('image')   ;
  @ViewChild('select') selectBoxTag;
  @ViewChild('topDash') topDash;
  @ViewChild('bottomDash') bottomDash;
  selectedOne: string = "";
  startY: number;
  selected = false;

  constructor() { }

  ngOnInit() {
  }

  onSelect(e) {
    this.selected = !this.selected;
    if (this.selected) {
      this.topDash.nativeElement.style.visibility = "hidden";
      this.bottomDash.nativeElement.style.visibility = "hidden";
    } else {
      this.topDash.nativeElement.style.visibility = "visible";
      this.bottomDash.nativeElement.style.visibility = "visible";
    }
  }

  onDragTop(e) {
    if (!e.clientY) return;
    const diff = e.clientY - this.startY;

    this.selectBoxTag.nativeElement.style.top = this.topDash.nativeElement.offsetTop + diff + 'px';
    this.selectBoxTag.nativeElement.style.height = (this.bottomDash.nativeElement.offsetTop - this.topDash.nativeElement.offsetTop - diff) + 'px';
    this.topDash.nativeElement.style.top = this.topDash.nativeElement.offsetTop + diff + 'px';
    
    this.startY = e.clientY;

    this.start_pos.emit(Math.floor(this.selectBoxTag.nativeElement.offsetTop * this.page_height / this.imageTag.nativeElement.height));
  }

  onDragStartTop(e) {
    var clone = this.topDash.nativeElement.cloneNode(true);
    clone.style.display = 'none';
    e.dataTransfer.setDragImage(clone, 0, 0);
    this.startY = e.clientY;
  }

  onDragBottom(e) {
    if (!e.clientY) return;
    const diff = e.clientY - this.startY;

    this.selectBoxTag.nativeElement.style.height = (this.bottomDash.nativeElement.offsetTop + diff - this.topDash.nativeElement.offsetTop)  + 'px';
    this.bottomDash.nativeElement.style.top = this.bottomDash.nativeElement.offsetTop + diff + 'px';
    
    this.startY = e.clientY;

    this.end_pos.emit(Math.floor((this.selectBoxTag.nativeElement.offsetTop + this.selectBoxTag.nativeElement.offsetHeight) * this.page_height / this.imageTag.nativeElement.height));
  }

  onDragStartBottom(e) {
    var clone = this.bottomDash.nativeElement.cloneNode(true);
    clone.style.display = 'none';
    e.dataTransfer.setDragImage(clone, 0, 0);
    this.startY = e.clientY;
  }

  ngAfterViewInit() {
    const $this = this;
    setTimeout(function() {
      let ratio = $this.page_height / $this.imageTag.nativeElement.height;

      $this.selectBoxTag.nativeElement.style.top = $this.start_y / ratio + 'px';
      $this.selectBoxTag.nativeElement.style.height = ($this.end_y - $this.start_y) / ratio + 'px';
      $this.topDash.nativeElement.style.top = $this.start_y / ratio + 'px';
      $this.bottomDash.nativeElement.style.top = $this.end_y / ratio + 'px';
    }, 100);
  }
}


