import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParserListService } from '../../services/parser-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'templates-tab',
  templateUrl: './templates-tab.component.html',
  styleUrls: ['./templates-tab.component.scss']
})
export class TemplatesTabComponent implements OnInit {

  parserList$: Observable<any[]>;

  constructor(
    private router: Router,
    private parserListService: ParserListService) { }

  ngOnInit() {
    this.parserList$ = this.parserListService.getParserListVM();
  }

  onEdit(id) {
    this.router.navigate([`templates/edit/${id}`]);
  }


}
